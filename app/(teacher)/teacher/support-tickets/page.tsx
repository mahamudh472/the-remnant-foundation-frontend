"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Paperclip,
  Calendar,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────────

type TicketStatus = "On Hold" | "In Progress" | "Completed"
type TabKey = "my-tickets" | "knowledgebase" | "announcement"
type FilterKey = "ALL" | "ON HOLD" | "IN PROGRESS" | "COMPLETED"

interface Comment {
  id: number
  author: string
  isYou: boolean
  text: string
  time: string
}

interface Ticket {
  id: string
  subject: string
  status: TicketStatus
  lastUpdate: string
  support: string
  comments: Comment[]
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const REQUEST_TYPES = [
  "Technical Issue",
  "Course Access Problem",
  "Assignment Issue",
  "Grading Query",
  "Account / Login Problem",
  "Other",
]

const DUMMY_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Albert",
    isYou: false,
    text: "Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance.",
    time: "13 Hours Ago",
  },
  {
    id: 2,
    author: "You",
    isYou: true,
    text: "Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance.",
    time: "11 Hours Ago",
  },
  {
    id: 3,
    author: "Albert",
    isYou: false,
    text: "Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance.",
    time: "13 Hours Ago",
  },
  {
    id: 4,
    author: "You",
    isYou: true,
    text: "Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance Students To Stay Consistent, Improves Learning Discipline, And Allows Teachers To Monitor Performance And Provide Proper Guidance.",
    time: "15 Hours Ago",
  },
]

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "7685",
    subject: "Problem Starting Campaign",
    status: "On Hold",
    lastUpdate: "Jan 10, 2026",
    support: "Karl",
    comments: [],
  },
  {
    id: "3410",
    subject: "Fund Not Received",
    status: "On Hold",
    lastUpdate: "31 Jan, 2026",
    support: "Albert",
    comments: DUMMY_COMMENTS,
  },
  {
    id: "3410",
    subject: "Fund Not Received",
    status: "In Progress",
    lastUpdate: "31 Jan, 2026",
    support: "Albert",
    comments: [],
  },
  {
    id: "3410",
    subject: "Fund Not Received",
    status: "On Hold",
    lastUpdate: "31 Jan, 2026",
    support: "Albert",
    comments: [],
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_DOT: Record<TicketStatus, string> = {
  "On Hold": "bg-[#4CC0D8]",
  "In Progress": "bg-green-500",
  Completed: "bg-gray-400",
}

function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return (
    <div
      className={`flex h-${size} w-${size} shrink-0 items-center justify-center rounded-full bg-[#4CC0D8] text-xs font-bold text-white`}
    >
      {initials}
    </div>
  )
}

// ─── Ticket Row ────────────────────────────────────────────────────────────────

function TicketRow({ ticket }: { ticket: Ticket }) {
  const [open, setOpen] = useState(
    ticket.comments.length > 0 &&
      ticket.id === "3410" &&
      ticket.status === "On Hold" &&
      ticket.comments.length > 0
  )
  const [reply, setReply] = useState("")

  return (
    <>
      <tr
        className="cursor-pointer border-b border-gray-100 hover:bg-[#F8F9FC]"
        onClick={() => setOpen((v) => !v)}
      >
        <td className="px-4 py-3 text-sm text-[#9CA3AF]">{ticket.id}</td>
        <td className="px-4 py-3 text-sm font-medium text-[#1D1D1D]">
          {ticket.subject}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${STATUS_DOT[ticket.status]}`}
            />
            <span className="text-sm text-[#666666]">{ticket.status}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-[#9CA3AF]">
          {ticket.lastUpdate}
        </td>
        <td className="px-4 py-3 text-sm text-[#666666]">{ticket.support}</td>
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
            {/* Reply composer */}
            <div className="mb-4 flex gap-3">
              <Avatar name="You" />
              <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <textarea
                  rows={3}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write post Here"
                  className="w-full resize-none px-4 py-3 text-sm text-[#1D1D1D] outline-none placeholder:text-[#9CA3AF]"
                />
                <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <span>.jpg .gif .jpeg .txt .pdf</span>
                    <button className="text-[#9CA3AF] hover:text-[#4CC0D8]">
                      <Paperclip className="h-4 w-4" />
                      <input type="file" className="hidden" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-semibold text-[#666666] hover:bg-gray-50">
                      Save Draft
                    </button>
                    <button className="rounded-lg bg-[#4CC0D8] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#3AB0C8]">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment thread */}
            {ticket.comments.length > 0 && (
              <div className="space-y-4 pl-11">
                {ticket.comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <Avatar name={c.isYou ? "You" : c.author} />
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#1D1D1D]">
                          {c.author}
                        </span>
                        <span className="text-xs text-[#9CA3AF]">{c.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#666666]">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Create Ticket Form ────────────────────────────────────────────────────────

function CreateTicketForm() {
  const [form, setForm] = useState({
    requestType: "",
    searchRef: "",
    studentName: "",
    ticketNumber: "",
    reason: "",
    date: "",
    courseId: "",
    remarks: "",
  })

  const inputCls =
    "w-full border-b border-gray-200 pb-1.5 pt-0.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF] bg-transparent"

  return (
    <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="mb-1 font-bold text-[#1D1D1D]">Create New Ticket</h3>
      <p className="mb-5 text-xs text-[#9CA3AF]">
        Fill up all the information now, then open support tickets
      </p>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Request Type */}
        <div>
          <p className="mb-1 text-xs text-[#9CA3AF]">Select Request Type*</p>
          <div className="relative">
            <select
              value={form.requestType}
              onChange={(e) =>
                setForm((p) => ({ ...p, requestType: e.target.value }))
              }
              className={`${inputCls} appearance-none pr-5`}
            >
              <option value="">Select type</option>
              {REQUEST_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1 right-0 h-3.5 w-3.5 text-[#9CA3AF]" />
          </div>
        </div>

        {/* Student Name */}
        <div>
          <p className="mb-1 text-xs text-[#9CA3AF]">Student Name</p>
          <input
            value={form.studentName}
            onChange={(e) =>
              setForm((p) => ({ ...p, studentName: e.target.value }))
            }
            placeholder="Rahul Hossein"
            className={inputCls}
          />
        </div>

        {/* Reason */}
        <div>
          <p className="mb-1 text-xs text-[#9CA3AF]">Choose Issue Reason</p>
          <div className="relative">
            <select
              value={form.reason}
              onChange={(e) =>
                setForm((p) => ({ ...p, reason: e.target.value }))
              }
              className={`${inputCls} appearance-none pr-5`}
            >
              <option value="">Select reason</option>
              <option>Access Denied</option>
              <option>Grade Dispute</option>
              <option>Video Not Loading</option>
              <option>Other</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1 right-0 h-3.5 w-3.5 text-[#9CA3AF]" />
          </div>
        </div>

        {/* Course ID */}
        <div>
          <p className="mb-1 text-xs text-[#9CA3AF]">Course ID</p>
          <input
            value={form.courseId}
            onChange={(e) =>
              setForm((p) => ({ ...p, courseId: e.target.value }))
            }
            placeholder="BG730"
            className={inputCls}
          />
        </div>

        {/* Remarks */}
        <div>
          <p className="mb-1 text-xs text-[#9CA3AF]">Remarks (Optional)</p>
          <input
            value={form.remarks}
            onChange={(e) =>
              setForm((p) => ({ ...p, remarks: e.target.value }))
            }
            placeholder="Write your remarks"
            className={inputCls}
          />
        </div>
      </div>

      <button className="mt-6 rounded-lg bg-[#4CC0D8] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
        Submit Ticket
      </button>
    </div>
  )
}

// ─── Help Panel ────────────────────────────────────────────────────────────────

const FILTERS: FilterKey[] = ["ALL", "ON HOLD", "IN PROGRESS", "COMPLETED"]

const FILTER_TO_STATUS: Partial<Record<FilterKey, TicketStatus>> = {
  "ON HOLD": "On Hold",
  "IN PROGRESS": "In Progress",
  COMPLETED: "Completed",
}

function HelpPanel() {
  const [tab, setTab] = useState<TabKey>("my-tickets")
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL")

  const filtered = INITIAL_TICKETS.filter((t) => {
    const matchSearch =
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.id.includes(search)
    const matchFilter =
      activeFilter === "ALL" || t.status === FILTER_TO_STATUS[activeFilter]
    return matchSearch && matchFilter
  })

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Tabs */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <h3 className="mr-4 text-lg">Help</h3>
          {(["my-tickets", "knowledgebase", "announcement"] as TabKey[]).map(
            (t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                  tab === t
                    ? "text-[#1D1D1D]"
                    : "text-[#9CA3AF] hover:text-[#666666]"
                }`}
              >
                {t === "my-tickets"
                  ? "My Tickets"
                  : t === "knowledgebase"
                    ? "Knowledgebase"
                    : "Announcement"}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find tickets"
              className="rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            />
          </div>
          <span className="text-xs text-[#9CA3AF]">
            {filtered.length} Tickets Available
          </span>
          <button className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
            <Plus className="h-4 w-4" />
            Add New Tickets
          </button>
        </div>
      </div>

      {tab === "my-tickets" && (
        <>
          {/* Filter checkboxes */}
          <div className="mb-4 flex items-center gap-5">
            {FILTERS.map((f) => (
              <label
                key={f}
                className="flex cursor-pointer items-center gap-1.5"
              >
                <input
                  type="checkbox"
                  checked={activeFilter === f}
                  onChange={() => setActiveFilter(f)}
                  className="accent-[#4CC0D8]"
                />
                <span className="text-xs font-medium text-[#666666]">{f}</span>
              </label>
            ))}
          </div>

          {/* Table */}
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
                {filtered.map((t, i) => (
                  <TicketRow key={`${t.id}-${i}`} ticket={t} />
                ))}
                {filtered.length === 0 && (
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
        </>
      )}

      {tab === "knowledgebase" && (
        <div className="py-10 text-center text-sm text-[#9CA3AF]">
          Knowledgebase coming soon.
        </div>
      )}
      {tab === "announcement" && (
        <div className="py-10 text-center text-sm text-[#9CA3AF]">
          No announcements yet.
        </div>
      )}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function SupportTicketsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#1D1D1D]">Support Tickets</h2>
      <CreateTicketForm />
      <HelpPanel />
    </div>
  )
}
