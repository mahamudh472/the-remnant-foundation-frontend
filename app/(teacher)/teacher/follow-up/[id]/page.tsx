"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Mail, Paperclip, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTeacherFollowUpDetailsQuery } from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"

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

function getProgressColor(progress: number) {
  if (progress >= 70) {
    return "#4CC0D8"
  }

  if (progress >= 40) {
    return "#F59E0B"
  }

  return "#EF4444"
}

export default function FollowUpDetailPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params?.id)

  const { data, isLoading, isError, error } = useTeacherFollowUpDetailsQuery(
    Number.isFinite(id) ? id : undefined
  )

  if (isLoading) {
    return (
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6">
        <div className="h-8 w-56 animate-pulse rounded bg-gray-100" />
        <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-56 animate-pulse rounded-xl bg-gray-100" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-500">
        {getApiErrorMessage(error, "Failed to load follow-up details")}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-[#666666]">
        Follow-up message not found.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Back + title */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/teacher/follow-up"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-lg font-bold text-[#1D1D1D]">{data.subject}</h2>
            <p className="text-xs text-[#9CA3AF]">Follow-up message details</p>
          </div>
        </div>
        <Badge className={`text-xs ${getStatusBadgeClasses(data.status)}`}>
          {formatStatusLabel(data.status)}
        </Badge>
      </div>

      {/* Message Information */}
      <div className="mb-5 rounded-xl border border-gray-100 p-5">
        <h3 className="mb-4 font-bold text-[#1D1D1D]">Message Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
            <div>
              <p className="text-xs text-[#9CA3AF]">Sent Date & Time</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {formatDateTime(data.sent_at)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
            <div>
              <p className="text-xs text-[#9CA3AF]">Recipients</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {data.recipients_count} students
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
            <div>
              <p className="text-xs text-[#9CA3AF]">Course</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {data.course_title}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#9CA3AF]">Grade / Program</p>
            <p className="text-sm font-medium text-[#1D1D1D]">
              {data.course_age_group} · {data.program_name}
            </p>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="mb-5 rounded-xl border border-gray-100 p-5">
        <h3 className="mb-4 font-bold text-[#1D1D1D]">Message Content</h3>
        <div className="rounded-xl bg-[#F8F9FC] p-5">
          <p className="mb-2 text-xs text-[#9CA3AF]">Subject</p>
          <p className="mb-4 font-semibold text-[#1D1D1D]">{data.subject}</p>
          <p className="mb-4 text-sm text-[#666666]">{data.message}</p>
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <Paperclip className="h-3.5 w-3.5" />
            {data.has_attachment && data.attachment_url ? (
              <Link
                href={data.attachment_url}
                target="_blank"
                rel="noreferrer"
                className="text-[#4CC0D8] hover:text-[#3AB0C8]"
              >
                View attachment
              </Link>
            ) : (
              <span>No attachment</span>
            )}
          </div>
        </div>
      </div>

      {/* Recipients */}
      <div className="rounded-xl border border-gray-100 p-5">
        <h3 className="mb-4 font-bold text-[#1D1D1D]">
          Recipients ({data.recipients.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                  Student Name
                </th>
                <th className="pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                  Email
                </th>
                <th className="pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                  Progress
                </th>
                <th className="pb-3 text-left text-xs font-semibold text-[#9CA3AF]">
                  Last Follow-Up
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recipients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#9CA3AF]">
                    No recipients found.
                  </td>
                </tr>
              ) : (
                data.recipients.map((recipient) => (
                  <tr key={recipient.student_id}>
                    <td className="py-3 font-medium text-[#1D1D1D]">
                      {recipient.name}
                    </td>
                    <td className="py-3 text-[#9CA3AF]">{recipient.email}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${recipient.progress}%`,
                              backgroundColor: getProgressColor(
                                recipient.progress
                              ),
                            }}
                          />
                        </div>
                        <span className="text-xs text-[#666666]">
                          {recipient.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-[#9CA3AF]">
                      {recipient.last_follow_up_at
                        ? formatDateTime(recipient.last_follow_up_at)
                        : "Never"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
