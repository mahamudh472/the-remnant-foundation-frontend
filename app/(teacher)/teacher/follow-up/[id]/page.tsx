"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Users, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MESSAGE = {
  id: "1",
  subject: "Keep up the great work!",
  status: "Sent" as const,
  sentAt: "2026-01-28 at 10:30 AM",
  recipients: 2,
  course: "Old Testament Stories",
  gradeProgram: "Children (6–12) · Bible School",
  body: "Dear students, I noticed great progress in your recent lessons. Keep up the excellent work!",
  disclaimer:
    "This message was sent by your instructor. Replies are not monitored.",
  students: [
    {
      name: "Emma Johnson",
      email: "emma.j@email.com",
      progress: 75,
      progressColor: "#4CC0D8",
      lastFollowUp: "2026-01-28",
    },
    {
      name: "Liam Smith",
      email: "liam.s@email.com",
      progress: 45,
      progressColor: "#F59E0B",
      lastFollowUp: "2026-01-15",
    },
  ],
}

export default function FollowUpDetailPage() {
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
            <h2 className="text-lg font-bold text-[#1D1D1D]">
              {MESSAGE.subject}
            </h2>
            <p className="text-xs text-[#9CA3AF]">Follow-up message details</p>
          </div>
        </div>
        <Badge className="bg-[#EBF7F9] text-xs text-[#4CC0D8]">
          {MESSAGE.status}
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
                {MESSAGE.sentAt}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
            <div>
              <p className="text-xs text-[#9CA3AF]">Recipients</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {MESSAGE.recipients} students
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
            <div>
              <p className="text-xs text-[#9CA3AF]">Course</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {MESSAGE.course}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#9CA3AF]">Grade / Program</p>
            <p className="text-sm font-medium text-[#1D1D1D]">
              {MESSAGE.gradeProgram}
            </p>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="mb-5 rounded-xl border border-gray-100 p-5">
        <h3 className="mb-4 font-bold text-[#1D1D1D]">Message Content</h3>
        <div className="rounded-xl bg-[#F8F9FC] p-5">
          <p className="mb-2 text-xs text-[#9CA3AF]">Subject</p>
          <p className="mb-4 font-semibold text-[#1D1D1D]">{MESSAGE.subject}</p>
          <p className="mb-4 text-sm text-[#666666]">{MESSAGE.body}</p>
          <p className="text-xs text-[#9CA3AF] italic">{MESSAGE.disclaimer}</p>
        </div>
      </div>

      {/* Recipients */}
      <div className="rounded-xl border border-gray-100 p-5">
        <h3 className="mb-4 font-bold text-[#1D1D1D]">
          Recipients ({MESSAGE.students.length})
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
              {MESSAGE.students.map((s) => (
                <tr key={s.name}>
                  <td className="py-3 font-medium text-[#1D1D1D]">{s.name}</td>
                  <td className="py-3 text-[#9CA3AF]">{s.email}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.progress}%`,
                            backgroundColor: s.progressColor,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#666666]">
                        {s.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-[#9CA3AF]">{s.lastFollowUp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
