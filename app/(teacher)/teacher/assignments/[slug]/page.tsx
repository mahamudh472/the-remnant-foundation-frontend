"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Layers,
  BookOpen,
  Users,
  Award,
  FileText,
  Download,
  Check,
} from "lucide-react"

const ASSIGNMENT = {
  title: "Evangelism Project",
  description: "Follow the steps to set up your course",
  dueDate: "20/02/2026",
  status: "Published" as const,
  type: "Project",
  course: "Evangelism Training",
  grade: "Teen (14–18)",
  totalMarks: 100,
  instructions:
    "Read Chapter 5 of the Gospel of John and write a summary highlighting the key themes and messages. Your summary should be at least 500 words and include personal reflections on how the chapter applies to modern life.",
  attachedFiles: [{ name: "Chapter_5_Study_Guide.pdf" }],
  submissionRules: [
    "File submission allowed",
    "Text answer allowed",
    "Submission type: Individual",
  ],
}

const SUBMISSIONS = [
  {
    name: "John Doe",
    initial: "J",
    color: "#4CC0D8",
    submittedOn: "03/02/2025",
    grade: null,
    status: "Grade" as const,
  },
  {
    name: "Sarah Smith",
    initial: "S",
    color: "#F59E0B",
    submittedOn: "02/02/2026",
    grade: "85/100",
    status: "Review" as const,
  },
  {
    name: "Michael Brown",
    initial: "M",
    color: "#10B981",
    submittedOn: null,
    grade: null,
    status: "Pending" as const,
  },
]

export default function AssignmentDetailPage() {
  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/teacher/assignments"
        className="inline-flex items-center gap-2 text-sm text-[#666666] transition-colors hover:text-[#4CC0D8]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Assignments
      </Link>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#1D1D1D]">
          {ASSIGNMENT.title}
        </h2>
        <p className="mt-1 text-sm text-[#666666]">{ASSIGNMENT.description}</p>
      </div>

      {/* Assignment Info Card */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          {/* Header row */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#1D1D1D]">
                {ASSIGNMENT.title}
              </h3>
              <div className="mt-1 flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-[#666666]">
                  <Calendar className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  Due: {ASSIGNMENT.dueDate}
                </div>
                <Badge className="bg-emerald-50 text-xs text-emerald-600">
                  {ASSIGNMENT.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50">
                Edit
              </button>
              <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Layers className="h-4 w-4 text-[#9CA3AF]" />
              <div>
                <p className="text-[10px] text-[#9CA3AF]">Type</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {ASSIGNMENT.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-[#9CA3AF]" />
              <div>
                <p className="text-[10px] text-[#9CA3AF]">Course</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {ASSIGNMENT.course}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-[#9CA3AF]" />
              <div>
                <p className="text-[10px] text-[#9CA3AF]">Grade</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {ASSIGNMENT.grade}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4 text-[#9CA3AF]" />
              <div>
                <p className="text-[10px] text-[#9CA3AF]">Total Marks</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {ASSIGNMENT.totalMarks}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-3 font-bold text-[#1D1D1D]">Instructions</h3>
          <p className="text-sm leading-relaxed text-[#666666]">
            {ASSIGNMENT.instructions}
          </p>
        </CardContent>
      </Card>

      {/* Attached Files */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-3 font-bold text-[#1D1D1D]">Attached Files</h3>
          <div className="space-y-2">
            {ASSIGNMENT.attachedFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-lg bg-[#F8F9FC] px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#9CA3AF]" />
                  <span className="text-sm text-[#666666]">{file.name}</span>
                </div>
                <button className="text-[#4CC0D8] transition-colors hover:text-[#3AB0C8]">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission Rules */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-3 font-bold text-[#1D1D1D]">Submission Rules</h3>
          <ul className="space-y-1.5">
            {ASSIGNMENT.submissionRules.map((rule) => (
              <li key={rule} className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-[#4CC0D8]" />
                <span className="text-[#666666]">{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Student Submissions */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-[#1D1D1D]">Student Submissions</h3>
            <span className="text-xs text-[#9CA3AF]">2 of 3 submitted</span>
          </div>
          <div className="space-y-3">
            {SUBMISSIONS.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: sub.color }}
                  >
                    {sub.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1D]">
                      {sub.name}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {sub.submittedOn
                        ? `Submitted on: ${sub.submittedOn}`
                        : "Not submitted yet"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {sub.grade && (
                    <span className="text-sm font-medium text-[#1D1D1D]">
                      Grade: {sub.grade}
                    </span>
                  )}
                  <button
                    className={`rounded-lg px-4 py-1.5 text-xs font-semibold text-white ${
                      sub.status === "Grade"
                        ? "bg-[#4CC0D8] hover:bg-[#3AB0C8]"
                        : sub.status === "Review"
                          ? "bg-[#4CC0D8] hover:bg-[#3AB0C8]"
                          : "bg-[#F59E0B] hover:bg-[#D97706]"
                    }`}
                  >
                    {sub.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
