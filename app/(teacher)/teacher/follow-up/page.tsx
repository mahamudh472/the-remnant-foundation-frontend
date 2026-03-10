"use client"

import Link from "next/link"
import { ArrowLeft, Eye, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const FOLLOW_UPS = [
  {
    id: "1",
    subject: "Keep up the great work!",
    status: "Sent" as const,
    sentAt: "2026-01-28 at 10:30 AM",
    course: "Old Testament Stories",
    grade: "Children (6–12)",
    program: "Bible School",
    sentTo: 2,
    recipients: ["Emma Johnson", "Liam Smith"],
  },
  {
    id: "2",
    subject: "Keep up the great work!",
    status: "Sent" as const,
    sentAt: "2026-01-28 at 10:30 AM",
    course: "Old Testament Stories",
    grade: "Children (6–12)",
    program: "Bible School",
    sentTo: 2,
    recipients: ["Emma Johnson", "Liam Smith"],
  },
  {
    id: "3",
    subject: "Keep up the great work!",
    status: "Sent" as const,
    sentAt: "2026-01-28 at 10:30 AM",
    course: "Old Testament Stories",
    grade: "Children (6–12)",
    program: "Bible School",
    sentTo: 2,
    recipients: ["Emma Johnson", "Liam Smith"],
  },
  {
    id: "4",
    subject: "Keep up the great work!",
    status: "Sent" as const,
    sentAt: "2026-01-28 at 10:30 AM",
    course: "Old Testament Stories",
    grade: "Children (6–12)",
    program: "Bible School",
    sentTo: 2,
    recipients: ["Emma Johnson", "Liam Smith"],
  },
]

export default function FollowUpPage() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Header row inside panel */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/teacher"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
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

      {/* List */}
      <div className="space-y-4">
        {FOLLOW_UPS.map((fu) => (
          <div key={fu.id} className="rounded-xl border border-gray-100 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-[#1D1D1D]">{fu.subject}</p>
                <Badge className="bg-[#EBF7F9] text-xs text-[#4CC0D8]">
                  {fu.status}
                </Badge>
                <span className="text-xs text-[#9CA3AF]">• {fu.sentAt}</span>
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
                <p className="text-xs text-[#9CA3AF]">Course / Grade</p>
                <p className="font-medium text-[#1D1D1D]">{fu.course}</p>
                <p className="text-xs text-[#9CA3AF]">{fu.grade}</p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF]">Program</p>
                <p className="font-medium text-[#1D1D1D]">{fu.program}</p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF]">Sent To</p>
                <p className="font-medium text-[#1D1D1D]">
                  {fu.sentTo} students
                </p>
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs text-[#9CA3AF]">Recipients</p>
              <div className="flex flex-wrap gap-2">
                {fu.recipients.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-[#F8F9FC] px-3 py-1 text-xs font-medium text-[#666666]"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
