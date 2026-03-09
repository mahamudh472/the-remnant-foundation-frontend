"use client"

import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Calendar,
  BookOpen,
  Users,
  FileText,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ASSIGNMENTS = [
  {
    title: "Bible Verse Analysis — Genesis 1:1-10",
    grade: "Grade 5",
    course: "Exploring the Bible",
    type: "Written",
    dueDate: "Dec 15, 2024",
    submissions: 32,
    total: 50,
    status: "Active" as const,
  },
  {
    title: "Research Paper: History of the Early Church",
    grade: "Grade 8",
    course: "Faith and Modern Science",
    type: "Research",
    dueDate: "Dec 20, 2024",
    submissions: 18,
    total: 35,
    status: "Active" as const,
  },
  {
    title: "Group Project: Modern Worship Analysis",
    grade: "Grade 6",
    course: "Worship & Praise",
    type: "Group Project",
    dueDate: "Dec 10, 2024",
    submissions: 15,
    total: 15,
    status: "Completed" as const,
  },
  {
    title: "Reflection Journal: Sermon on the Mount",
    grade: "Grade 4",
    course: "Christian Ethics",
    type: "Journal",
    dueDate: "Jan 5, 2025",
    submissions: 0,
    total: 42,
    status: "Upcoming" as const,
  },
  {
    title: "Multiple Choice Quiz: Old Testament Overview",
    grade: "Grade 7",
    course: "Exploring the Bible",
    type: "Quiz",
    dueDate: "Dec 8, 2024",
    submissions: 28,
    total: 28,
    status: "Completed" as const,
  },
  {
    title: "Essay: Faith in Contemporary Society",
    grade: "Grade 9",
    course: "Christian Ethics",
    type: "Essay",
    dueDate: "Dec 22, 2024",
    submissions: 5,
    total: 30,
    status: "Active" as const,
  },
]

const GRADE_OPTIONS = [
  "All Grades",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
]
const STATUS_OPTIONS = ["All Status", "Active", "Upcoming", "Completed"]

export default function TeacherAssignmentsPage() {
  const [gradeFilter, setGradeFilter] = React.useState("All Grades")
  const [statusFilter, setStatusFilter] = React.useState("All Status")
  const [search, setSearch] = React.useState("")

  const filtered = ASSIGNMENTS.filter((a) => {
    if (gradeFilter !== "All Grades" && a.grade !== gradeFilter) return false
    if (statusFilter !== "All Status" && a.status !== statusFilter) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()))
      return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">Assignments</h2>
        <Link
          href="/teacher/assignments/add"
          className="rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
        >
          + Add Assignment
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {GRADE_OPTIONS.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments..."
            className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>

      {/* Assignment Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((assignment) => (
          <Card
            key={assignment.title}
            className="border-gray-100 shadow-none transition-shadow hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="line-clamp-2 text-sm leading-snug font-bold text-[#1D1D1D]">
                  {assignment.title}
                </h3>
                <Badge
                  className={cn(
                    "ml-2 shrink-0 text-[10px]",
                    assignment.status === "Active"
                      ? "bg-[#EBF7F9] text-[#4CC0D8]"
                      : assignment.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                  )}
                >
                  {assignment.status}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-[#666666]">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  <span>{assignment.grade}</span>
                  <span className="text-[#9CA3AF]">•</span>
                  <BookOpen className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  <span>{assignment.course}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  <span>{assignment.type}</span>
                  <span className="text-[#9CA3AF]">•</span>
                  <Calendar className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  <span>Due: {assignment.dueDate}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="font-semibold text-[#1D1D1D]">
                      {assignment.submissions}
                    </span>
                    <span className="text-[#9CA3AF]">
                      / {assignment.total} submissions
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#4CC0D8] transition-all"
                      style={{
                        width: `${(assignment.submissions / assignment.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
                  View Details
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <FileText className="mx-auto h-12 w-12 text-[#9CA3AF]" />
          <p className="mt-3 text-sm text-[#666666]">
            No assignments found matching your filters.
          </p>
        </div>
      )}
    </div>
  )
}
