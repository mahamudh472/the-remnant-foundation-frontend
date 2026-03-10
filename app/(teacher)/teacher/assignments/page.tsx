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
import AssigmentCard from "@/components/teacher/assignment-card"

const ASSIGNMENTS = [
  {
    id: "1",
    title: "Bible Verse Analysis — Genesis 1:1-10",
    grade: "Kids (5-10)",
    course: "Bible stories for kids",
    type: "Written",
    dueDate: "Dec 15, 2024",
    submissions: 32,
    total: 50,
    status: "Published" as const,
  },
  {
    id: "2",
    title: "Research Paper: History of the Early Church",
    grade: "Teen (14-18)",
    course: "Bible Studies - Teen",
    type: "Research",
    dueDate: "Dec 20, 2024",
    submissions: 18,
    total: 35,
    status: "Published" as const,
  },
  {
    id: "3",
    title: "Group Project: Modern Worship Analysis",
    grade: "Junior (11-13)",
    course: "Old Testament Studies",
    type: "Group Project",
    dueDate: "Dec 10, 2024",
    submissions: 15,
    total: 15,
    status: "Closed" as const,
  },
  {
    id: "4",
    title: "Reflection Journal: Sermon on the Mount",
    grade: "Kids (5-10)",
    course: "Christian Values",
    type: "Journal",
    dueDate: "Jan 5, 2025",
    submissions: 0,
    total: 42,
    status: "Draft" as const,
  },
  {
    id: "5",
    title: "Multiple Choice Quiz: Old Testament Overview",
    grade: "Junior (11-13)",
    course: "Discipleship 101",
    type: "Quiz",
    dueDate: "Dec 8, 2024",
    submissions: 28,
    total: 28,
    status: "Closed" as const,
  },
  {
    id: "6",
    title: "Essay: Faith in Contemporary Society",
    grade: "Young adults (19-25)",
    course: "Theology Foundations",
    type: "Essay",
    dueDate: "Dec 22, 2024",
    submissions: 5,
    total: 30,
    status: "Published" as const,
  },
]

const GRADE_CATEGORIES = [
  { label: "All Grades", value: "All Grades" },
  { label: "Kids (5-10)", value: "Kids (5-10)" },
  { label: "Junior (11-13)", value: "Junior (11-13)" },
  { label: "Teen (14-18)", value: "Teen (14-18)" },
  { label: "Young adults (19-25)", value: "Young adults (19-25)" },
]

const COURSES_BY_GRADE: Record<string, string[]> = {
  "All Grades": ["All Courses"],
  "Kids (5-10)": [
    "All Courses",
    "Bible stories for kids",
    "Prayer Basics",
    "Christian Values",
  ],
  "Junior (11-13)": [
    "All Courses",
    "Old Testament Studies",
    "New testament Stories",
    "Discipleship 101",
  ],
  "Teen (14-18)": [
    "All Courses",
    "Bible Studies - Teen",
    "Evangelism Training",
    "Youth Leadership",
  ],
  "Young adults (19-25)": [
    "All Courses",
    "Theology Foundations",
    "Ministry Leadership",
    "Biblical Counseling",
  ],
}

const STATUS_OPTIONS = ["All Status", "Draft", "Published", "Closed"]

export default function TeacherAssignmentsPage() {
  const [gradeFilter, setGradeFilter] = React.useState("All Grades")
  const [courseFilter, setCourseFilter] = React.useState("All Courses")
  const [statusFilter, setStatusFilter] = React.useState("All Status")
  const [search, setSearch] = React.useState("")

  const availableCourses = COURSES_BY_GRADE[gradeFilter] ?? ["All Courses"]

  const handleGradeChange = (grade: string) => {
    setGradeFilter(grade)
    setCourseFilter("All Courses")
  }

  const filtered = ASSIGNMENTS.filter((a) => {
    if (gradeFilter !== "All Grades" && a.grade !== gradeFilter) return false
    if (courseFilter !== "All Courses" && a.course !== courseFilter)
      return false
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
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Grade Category *
          </label>
          <select
            value={gradeFilter}
            onChange={(e) => handleGradeChange(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {GRADE_CATEGORIES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 bottom-2.5 h-4 w-4 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Courses
          </label>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {availableCourses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 bottom-2.5 h-4 w-4 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 bottom-2.5 h-4 w-4 text-[#9CA3AF]" />
        </div>

        <div className="relative flex-1">
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Search Assignments
          </label>
          <Search className="absolute top-2/3 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
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
          <AssigmentCard key={assignment.title} assignment={assignment} />
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
