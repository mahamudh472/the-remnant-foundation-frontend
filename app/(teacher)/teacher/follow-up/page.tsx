"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Plus,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDebounce } from "@/hooks/use-debounce"
import { useTeacherFollowUpsQuery } from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"

const PAGE_SIZE = 6

function formatDateTime(dateValue: string | null) {
  if (!dateValue) {
    return "-"
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return dateValue
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

function formatStatusLabel(status: string) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function getStatusBadgeClasses(status: string) {
  switch (status) {
    case "sent":
      return "bg-[#EBF7F9] text-[#4CC0D8]"
    case "queued":
      return "bg-[#FFF8EC] text-[#F59E0B]"
    case "failed":
      return "bg-red-100 text-red-500"
    case "draft":
      return "bg-gray-100 text-gray-500"
    default:
      return "bg-gray-100 text-gray-500"
  }
}

export default function FollowUpPage() {
  const [page, setPage] = React.useState(1)
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebounce(search, 400)

  const followUpsQuery = useTeacherFollowUpsQuery({
    page,
    page_size: PAGE_SIZE,
    search: debouncedSearch || undefined,
  })

  const results = followUpsQuery.data?.results ?? []
  const count = followUpsQuery.data?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return (
    <div>
      {/* Header row inside panel */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/teacher"
            className="flex h-8 w-8 items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-lg font-bold text-[#1D1D1D]">
              Follow-Up History
            </h2>
            <p className="text-xs text-[#9CA3AF]">
              View all sent follow-up messages
            </p>
          </div>
        </div>
        <Link
          href="/teacher/follow-up/send"
          className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
        >
          <Plus className="h-4 w-4" />
          Send Follow-Up
        </Link>
      </div>

      <div className="mb-6 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Search follow-ups..."
            className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>

      {followUpsQuery.isError && (
        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(
            followUpsQuery.error,
            "Failed to load follow-up history"
          )}
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {followUpsQuery.isLoading ? (
          [1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="h-44 animate-pulse rounded-xl bg-gray-100"
            />
          ))
        ) : (
          <>
            {results.map((fu) => (
              <div
                key={fu.id}
                className="rounded-xl border border-gray-100 p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-[#1D1D1D]">{fu.subject}</p>
                    <Badge
                      className={`text-xs ${getStatusBadgeClasses(fu.status)}`}
                    >
                      {formatStatusLabel(fu.status)}
                    </Badge>
                    <span className="text-xs text-[#9CA3AF]">
                      • {formatDateTime(fu.sent_at)}
                    </span>
                    {fu.has_attachment && (
                      <span className="rounded-full bg-[#F8F9FC] px-2.5 py-1 text-xs text-[#666666]">
                        Attachment
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/teacher/follow-up/${fu.id}`}
                    className="flex shrink-0 items-center gap-1.5 text-xs text-[#4CC0D8] transition-colors hover:text-[#3AB0C8]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Message
                  </Link>
                </div>

                <div className="mb-3 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Course / Age Group</p>
                    <p className="font-medium text-[#1D1D1D]">
                      {fu.course_title}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {fu.course_age_group}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Program</p>
                    <p className="font-medium text-[#1D1D1D]">
                      {fu.program_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Sent To</p>
                    <p className="font-medium text-[#1D1D1D]">
                      {fu.sent_to} students
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 text-xs text-[#9CA3AF]">Recipients</p>
                  <div className="flex flex-wrap gap-2">
                    {fu.recipient_names.length > 0 ? (
                      fu.recipient_names.map((name) => (
                        <span
                          key={`${fu.id}-${name}`}
                          className="rounded-full bg-[#F8F9FC] px-3 py-1 text-xs font-medium text-[#666666]"
                        >
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#9CA3AF]">
                        No recipients found.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {results.length === 0 && (
              <div className="py-16 text-center">
                <FileText className="mx-auto h-12 w-12 text-[#9CA3AF]" />
                <p className="mt-3 text-sm text-[#666666]">
                  No follow-up history found.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {!followUpsQuery.isLoading && results.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={
                  pageNumber === page
                    ? "flex h-8 w-8 items-center justify-center rounded-lg bg-[#4CC0D8] text-sm font-medium text-white"
                    : "flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                }
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
