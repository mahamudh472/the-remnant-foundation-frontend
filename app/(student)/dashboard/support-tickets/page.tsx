"use client"

import React from "react"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Paperclip,
  Plus,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import {
  useCreateSupportReplyMutation,
  useCreateSupportTicketMutation,
  useSupportRequestTypesQuery,
  useSupportTicketDetailQuery,
  useSupportTicketMessagesQuery,
  useSupportTicketsQuery,
  type SupportTicketStatus,
} from "@/hooks/api/use-support"
import { getApiErrorMessage } from "@/lib/api/client"
import { useAuthStore } from "@/lib/store/auth-store"
import type {
  SupportAttachment,
  SupportTicketMessage,
  SupportTicketSummary,
} from "@/lib/api/support"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TabKey = "my-tickets" | "knowledgebase" | "announcement"
type FilterKey = "ALL" | "ON_HOLD" | "IN_PROGRESS" | "COMPLETED"

const TICKET_PAGE_SIZE = 6
const MESSAGE_PAGE_SIZE = 20

const FILTERS: FilterKey[] = ["ALL", "ON_HOLD", "IN_PROGRESS", "COMPLETED"]

const FILTER_TO_STATUS: Partial<Record<FilterKey, SupportTicketStatus>> = {
  ON_HOLD: "ON_HOLD",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
}

const STATUS_DOT: Record<SupportTicketStatus, string> = {
  ON_HOLD: "bg-[#4CC0D8]",
  IN_PROGRESS: "bg-green-500",
  COMPLETED: "bg-gray-400",
}

function formatDate(dateValue: string, withTime = false) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return dateValue
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(withTime
      ? {
          hour: "numeric",
          minute: "2-digit",
        }
      : {}),
  }).format(date)
}

function formatStatusLabel(status: SupportTicketStatus) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

function resolveAttachmentUrl(filePath: string) {
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    return filePath
  }

  try {
    const origin = new URL(apiUrl).origin
    const normalizedPath = filePath.startsWith("/") ? filePath : `/${filePath}`
    return `${origin}${normalizedPath}`
  } catch {
    return filePath
  }
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4CC0D8] text-xs font-bold text-white">
      {initials || "U"}
    </div>
  )
}

function AttachmentLinks({
  attachments,
}: {
  attachments: SupportAttachment[]
}) {
  if (attachments.length === 0) {
    return null
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {attachments.map((attachment, index) => (
        <a
          key={attachment.id}
          href={resolveAttachmentUrl(attachment.file)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-[#4CC0D8] hover:text-[#3AB0C8]"
        >
          <Paperclip className="h-3 w-3" />
          Attachment {index + 1}
        </a>
      ))}
    </div>
  )
}

function TicketThreadMessage({
  message,
  isYou,
}: {
  message: SupportTicketMessage
  isYou: boolean
}) {
  const authorLabel = isYou ? "You" : message.sender_email

  return (
    <div className="flex gap-3">
      <Avatar name={authorLabel} />
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#1D1D1D]">
            {authorLabel}
          </span>
          <span className="text-xs text-[#9CA3AF]">
            {formatDate(message.created_at, true)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-[#666666]">
          {message.message}
        </p>
        <AttachmentLinks attachments={message.attachments} />
      </div>
    </div>
  )
}

function TicketRow({ ticket }: { ticket: SupportTicketSummary }) {
  const [open, setOpen] = React.useState(false)
  const [reply, setReply] = React.useState("")
  const [replyFiles, setReplyFiles] = React.useState<File[]>([])
  const [replyInputKey, setReplyInputKey] = React.useState(0)

  const currentUser = useAuthStore((state) => state.user)
  const detailQuery = useSupportTicketDetailQuery(ticket.ticket_id, open)
  const messagesQuery = useSupportTicketMessagesQuery(
    ticket.ticket_id,
    {
      page: 1,
      page_size: MESSAGE_PAGE_SIZE,
    },
    open
  )
  const createReplyMutation = useCreateSupportReplyMutation()

  const threadMessages =
    messagesQuery.data?.results ?? detailQuery.data?.messages ?? []

  async function onPostReply() {
    const trimmedReply = reply.trim()

    if (!trimmedReply && replyFiles.length === 0) {
      return
    }

    try {
      await createReplyMutation.mutateAsync({
        ticketId: ticket.ticket_id,
        message: trimmedReply || undefined,
        attachments: replyFiles.length > 0 ? replyFiles : undefined,
      })

      setReply("")
      setReplyFiles([])
      setReplyInputKey((key) => key + 1)
    } catch {
      // Error state is shown via mutation error UI below.
    }
  }

  return (
    <>
      <tr
        className="cursor-pointer border-b border-gray-100 hover:bg-[#F8F9FC]"
        onClick={() => setOpen((value) => !value)}
      >
        <td className="px-4 py-3 text-sm text-[#9CA3AF]">{ticket.ticket_id}</td>
        <td className="px-4 py-3 text-sm font-medium text-[#1D1D1D]">
          {ticket.subject}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${STATUS_DOT[ticket.status]}`}
            />
            <span className="text-sm text-[#666666]">
              {formatStatusLabel(ticket.status)}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-[#9CA3AF]">
          {formatDate(ticket.last_update, true)}
        </td>
        <td className="px-4 py-3 text-sm text-[#666666]">
          {ticket.responding_admin || "Unassigned"}
        </td>
        <td className="px-4 py-3 text-right">
          {open ? (
            <ChevronUp className="ml-auto h-4 w-4 text-[#9CA3AF]" />
          ) : (
            <ChevronDown className="ml-auto h-4 w-4 text-[#9CA3AF]" />
          )}
        </td>
      </tr>

      {open && (
        <tr>
          <td
            colSpan={6}
            className="border-b border-gray-100 bg-[#F8F9FC] px-4 py-4"
          >
            {detailQuery.data && (
              <div className="mb-3 flex flex-wrap gap-4 rounded-xl bg-white px-4 py-3 text-xs text-[#666666]">
                <span>
                  <span className="text-[#9CA3AF]">Request Type:</span>{" "}
                  {detailQuery.data.request_type_name}
                </span>
                <span>
                  <span className="text-[#9CA3AF]">Issue Reason:</span>{" "}
                  {detailQuery.data.issue_reason_name}
                </span>
                <span>
                  <span className="text-[#9CA3AF]">Updated:</span>{" "}
                  {formatDate(detailQuery.data.updated_at, true)}
                </span>
              </div>
            )}

            <div className="mb-4 flex gap-3">
              <Avatar name="You" />
              <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <textarea
                  rows={3}
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Write your reply"
                  className="w-full resize-none px-4 py-3 text-sm text-[#1D1D1D] outline-none placeholder:text-[#9CA3AF]"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <span>.jpg .gif .jpeg .txt .pdf</span>
                    <label className="cursor-pointer text-[#9CA3AF] hover:text-[#4CC0D8]">
                      <Paperclip className="h-4 w-4" />
                      <input
                        key={replyInputKey}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(event) => {
                          const files = Array.from(event.target.files ?? [])

                          if (files.length === 0) {
                            return
                          }

                          setReplyFiles((current) => [...current, ...files])
                        }}
                      />
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="brandOutline"
                      size="sm"
                      onClick={() => {
                        setReply("")
                        setReplyFiles([])
                        setReplyInputKey((key) => key + 1)
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      type="button"
                      variant="brand"
                      size="sm"
                      onClick={onPostReply}
                      disabled={
                        createReplyMutation.isPending ||
                        (reply.trim().length === 0 && replyFiles.length === 0)
                      }
                    >
                      {createReplyMutation.isPending ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>

                {replyFiles.length > 0 && (
                  <div className="border-t border-gray-100 px-3 py-2 text-xs text-[#666666]">
                    {replyFiles.map((file) => file.name).join(", ")}
                  </div>
                )}
              </div>
            </div>

            {createReplyMutation.isError && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-500">
                {getApiErrorMessage(
                  createReplyMutation.error,
                  "Failed to post reply"
                )}
              </div>
            )}

            {detailQuery.isError && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-500">
                {getApiErrorMessage(
                  detailQuery.error,
                  "Failed to load ticket details"
                )}
              </div>
            )}

            {messagesQuery.isError && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-500">
                {getApiErrorMessage(
                  messagesQuery.error,
                  "Failed to load ticket messages"
                )}
              </div>
            )}

            {(detailQuery.isLoading || messagesQuery.isLoading) && (
              <div className="space-y-3 pl-11">
                {[1, 2].map((skeleton) => (
                  <div
                    key={skeleton}
                    className="h-16 animate-pulse rounded-xl bg-white"
                  />
                ))}
              </div>
            )}

            {!detailQuery.isLoading && !messagesQuery.isLoading && (
              <div className="space-y-4 pl-11">
                {threadMessages.length === 0 ? (
                  <p className="text-sm text-[#9CA3AF]">No messages yet.</p>
                ) : (
                  threadMessages.map((message) => (
                    <TicketThreadMessage
                      key={message.id}
                      message={message}
                      isYou={
                        currentUser?.email?.toLowerCase() ===
                        message.sender_email.toLowerCase()
                      }
                    />
                  ))
                )}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  )
}

function CreateTicketForm() {
  const [form, setForm] = React.useState({
    subject: "",
    requestTypeId: "",
    issueReasonId: "",
    courseId: "",
    remarks: "",
  })
  const [files, setFiles] = React.useState<File[]>([])
  const [formMessage, setFormMessage] = React.useState<string | null>(null)
  const [fileInputKey, setFileInputKey] = React.useState(0)

  const requestTypesQuery = useSupportRequestTypesQuery()
  const createTicketMutation = useCreateSupportTicketMutation()

  const requestTypes =
    requestTypesQuery.data?.filter((requestType) => requestType.is_active) ?? []

  const selectedRequestType = requestTypes.find(
    (requestType) => String(requestType.id) === form.requestTypeId
  )

  const issueReasons =
    selectedRequestType?.issue_reasons.filter((reason) => reason.is_active) ??
    []

  const inputCls =
    "w-full border-b border-gray-200 pb-1.5 pt-0.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF] bg-transparent"

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormMessage(null)

    if (!form.subject.trim() || !form.requestTypeId || !form.issueReasonId) {
      setFormMessage("Subject, request type, and issue reason are required.")
      return
    }

    const parsedCourseId =
      form.courseId.trim().length > 0 ? Number(form.courseId.trim()) : undefined

    if (form.courseId.trim().length > 0 && Number.isNaN(parsedCourseId)) {
      setFormMessage("Course ID must be a valid number.")
      return
    }

    try {
      const response = await createTicketMutation.mutateAsync({
        subject: form.subject.trim(),
        request_type: Number(form.requestTypeId),
        issue_reason: Number(form.issueReasonId),
        course_id: parsedCourseId,
        remarks: form.remarks.trim() || undefined,
        attachments: files.length > 0 ? files : undefined,
      })

      setForm({
        subject: "",
        requestTypeId: "",
        issueReasonId: "",
        courseId: "",
        remarks: "",
      })
      setFiles([])
      setFileInputKey((key) => key + 1)
      setFormMessage(response.message)
    } catch (error) {
      setFormMessage(
        getApiErrorMessage(error, "Failed to create support ticket")
      )
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-4">
        <form id="create-ticket-form" onSubmit={onSubmit}>
          <h3 className="mb-1 font-bold text-[#1D1D1D]">Create New Ticket</h3>
          <p className="mb-5 text-xs text-[#9CA3AF]">
            Fill up all required fields and submit your support request.
          </p>

          {requestTypesQuery.isError && (
            <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-500">
              {getApiErrorMessage(
                requestTypesQuery.error,
                "Failed to load request types"
              )}
            </div>
          )}

          {formMessage && (
            <div
              className={`mb-4 rounded-xl border p-3 text-xs ${
                createTicketMutation.isError
                  ? "border-red-100 bg-red-50 text-red-500"
                  : "border-green-100 bg-green-50 text-green-600"
              }`}
            >
              {formMessage}
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">Subject*</p>
              <input
                value={form.subject}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, subject: event.target.value }))
                }
                placeholder="Payment issue for enrolled course"
                className={inputCls}
                required
              />
            </div>

            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">
                Select Request Type*
              </p>
              <div className="relative">
                <select
                  value={form.requestTypeId}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      requestTypeId: event.target.value,
                      issueReasonId: "",
                    }))
                  }
                  className={`${inputCls} appearance-none pr-5`}
                  required
                  disabled={requestTypesQuery.isLoading}
                >
                  <option value="">
                    {requestTypesQuery.isLoading ? "Loading..." : "Select type"}
                  </option>
                  {requestTypes.map((requestType) => (
                    <option key={requestType.id} value={String(requestType.id)}>
                      {requestType.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1 right-0 h-3.5 w-3.5 text-[#9CA3AF]" />
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">
                Choose Issue Reason*
              </p>
              <div className="relative">
                <select
                  value={form.issueReasonId}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      issueReasonId: event.target.value,
                    }))
                  }
                  className={`${inputCls} appearance-none pr-5`}
                  required
                  disabled={!selectedRequestType}
                >
                  <option value="">
                    {selectedRequestType
                      ? "Select reason"
                      : "Select request type first"}
                  </option>
                  {issueReasons.map((issueReason) => (
                    <option key={issueReason.id} value={String(issueReason.id)}>
                      {issueReason.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1 right-0 h-3.5 w-3.5 text-[#9CA3AF]" />
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">Course ID</p>
              <input
                value={form.courseId}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, courseId: event.target.value }))
                }
                placeholder="10"
                className={inputCls}
                inputMode="numeric"
              />
            </div>

            <div className="col-span-full">
              <p className="mb-1 text-xs text-[#9CA3AF]">Remarks</p>
              <textarea
                value={form.remarks}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, remarks: event.target.value }))
                }
                placeholder="Need help with enrollment."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                rows={3}
              />
            </div>

            {/* <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">Attachments</p>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#666666] hover:bg-gray-50">
                <Paperclip className="h-3.5 w-3.5" />
                Add Files
                <input
                  key={fileInputKey}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(event) => {
                    const selectedFiles = Array.from(event.target.files ?? [])

                    if (selectedFiles.length === 0) {
                      return
                    }

                    setFiles((current) => [...current, ...selectedFiles])
                  }}
                />
              </label>
              {files.length > 0 && (
                <p className="mt-2 text-xs text-[#666666]">
                  {files.map((file) => file.name).join(", ")}
                </p>
              )}
            </div> */}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="submit"
              variant="brand"
              className="px-6"
              disabled={createTicketMutation.isPending}
            >
              {createTicketMutation.isPending
                ? "Submitting..."
                : "Submit Ticket"}
            </Button>
            {files.length > 0 && (
              <Button
                type="button"
                variant="brandOutline"
                onClick={() => {
                  setFiles([])
                  setFileInputKey((key) => key + 1)
                }}
              >
                Clear Files
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function HelpPanel() {
  const [tab, setTab] = React.useState<TabKey>("my-tickets")
  const [search, setSearch] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("ALL")
  const [page, setPage] = React.useState(1)

  const debouncedSearch = useDebounce(search, 400)

  const ticketsQuery = useSupportTicketsQuery(
    {
      page,
      page_size: TICKET_PAGE_SIZE,
      status: FILTER_TO_STATUS[activeFilter],
      search: debouncedSearch || undefined,
    },
    tab === "my-tickets"
  )

  const tickets = ticketsQuery.data?.results ?? []
  const count = ticketsQuery.data?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(count / TICKET_PAGE_SIZE))

  React.useEffect(() => {
    setPage(1)
  }, [debouncedSearch, activeFilter])

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-4">
        <Tabs defaultValue="my-tickets" className="w-full">
          {/* TAB HEADER */}
          <TabsList
            variant="line"
            className="mb-4 w-full justify-start gap-6 bg-transparent"
          >
            <TabsTrigger
              value="my-tickets"
              className="px-0 data-[state=active]:text-[#4CC0D8] data-[state=active]:after:bg-[#4CC0D8]"
            >
              My Tickets
            </TabsTrigger>
            <TabsTrigger
              value="knowledgebase"
              className="px-0 data-[state=active]:text-[#4CC0D8] data-[state=active]:after:bg-[#4CC0D8]"
            >
              Knowledgebase
            </TabsTrigger>
            <TabsTrigger
              value="announcement"
              className="px-0 data-[state=active]:text-[#4CC0D8] data-[state=active]:after:bg-[#4CC0D8]"
            >
              Announcement
            </TabsTrigger>
            <span className="text-xs text-[#9CA3AF]">
              {count} Tickets Available
            </span>
          </TabsList>

          {/* TAB 1 */}
          <TabsContent value="my-tickets">
            <div className="mb-4 flex flex-wrap items-center gap-5 px-4">
              {FILTERS.map((filter) => (
                <label
                  key={filter}
                  className="flex cursor-pointer items-center gap-1.5"
                >
                  <Checkbox
                    checked={activeFilter === filter}
                    onCheckedChange={() => setActiveFilter(filter)}
                  />
                  <span className="text-xs font-medium text-[#666666]">
                    {filter === "ALL" ? "ALL" : filter.replace("_", " ")}
                  </span>
                </label>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                      Ticket ID
                    </th>
                    <th className="px-4 pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                      Subject
                    </th>
                    <th className="px-4 pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                      Status
                    </th>
                    <th className="px-4 pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                      Last Update
                    </th>
                    <th className="px-4 pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                      Support
                    </th>
                    <th className="px-4 pb-3" />
                  </tr>
                </thead>

                <tbody>
                  {ticketsQuery.isLoading && (
                    <tr>
                      <td colSpan={6} className="px-4 py-6">
                        <div className="h-10 animate-pulse rounded-xl bg-gray-100" />
                      </td>
                    </tr>
                  )}

                  {ticketsQuery.isError && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-sm text-red-500"
                      >
                        {getApiErrorMessage(
                          ticketsQuery.error,
                          "Failed to load tickets"
                        )}
                      </td>
                    </tr>
                  )}

                  {!ticketsQuery.isLoading &&
                    !ticketsQuery.isError &&
                    tickets.map((ticket) => (
                      <TicketRow key={ticket.ticket_id} ticket={ticket} />
                    ))}

                  {!ticketsQuery.isLoading &&
                    !ticketsQuery.isError &&
                    tickets.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-10 text-center text-sm text-[#9CA3AF]"
                        >
                          No tickets found.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!ticketsQuery.isLoading &&
              !ticketsQuery.isError &&
              tickets.length > 0 &&
              totalPages > 1 && (
                <div className="mt-5 flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="brandOutline"
                    size="icon-sm"
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <Button
                        key={pageNumber}
                        type="button"
                        variant={pageNumber === page ? "brand" : "brandOutline"}
                        size="icon-sm"
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    )
                  )}

                  <Button
                    type="button"
                    variant="brandOutline"
                    size="icon-sm"
                    onClick={() =>
                      setPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
          </TabsContent>

          {/* TAB 2 */}
          <TabsContent value="knowledgebase">
            <div className="py-10 text-center text-sm text-[#9CA3AF]">
              Knowledgebase coming soon.
            </div>
          </TabsContent>

          {/* TAB 3 */}
          <TabsContent value="announcement">
            <div className="py-10 text-center text-sm text-[#9CA3AF]">
              No announcements yet.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function SupportTicketsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#1D1D1D]">Support Tickets</h2>
      <CreateTicketForm />
      <HelpPanel />
    </div>
  )
}
