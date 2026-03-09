"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Pencil, Plus, Save, ChevronDown } from "lucide-react"

const QUIZZES = [
  {
    title: "Introduction to Bible Stories",
    grade: "Children (6–12)",
    course: "Old Testament Stories",
    questions: 10,
    passingScore: "70%",
    status: "Published" as const,
  },
  {
    title: "Introduction to Bible Stories",
    grade: "Children (6–12)",
    course: "Old Testament Stories",
    questions: 10,
    passingScore: "70%",
    status: "Published" as const,
  },
  {
    title: "Introduction to Bible Stories",
    grade: "Children (6–12)",
    course: "Old Testament Stories",
    questions: 10,
    passingScore: "70%",
    status: "Published" as const,
  },
  {
    title: "Introduction to Bible Stories",
    grade: "Children (6–12)",
    course: "Old Testament Stories",
    questions: 10,
    passingScore: "70%",
    status: "Published" as const,
  },
  {
    title: "Introduction to Bible Stories",
    grade: "Children (6–12)",
    course: "Old Testament Stories",
    questions: 10,
    passingScore: "70%",
    status: "Published" as const,
  },
  {
    title: "Introduction to Bible Stories",
    grade: "Children (6–12)",
    course: "Old Testament Stories",
    questions: 10,
    passingScore: "70%",
    status: "Published" as const,
  },
]

const GRADE_OPTIONS = [
  "All Grades",
  "Children (6–12)",
  "Teen (14–18)",
  "Adults (26+)",
]
const PROGRAM_OPTIONS = ["All Programs", "Bible Studies", "Theology", "Ethics"]

export default function TeacherQuizPage() {
  const [gradeFilter, setGradeFilter] = React.useState("All Grades")
  const [programFilter, setProgramFilter] = React.useState("All Programs")
  const [search, setSearch] = React.useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1D1D1D]">All Quizzes</h2>
          <p className="text-sm text-[#666666]">
            Filter and manage your quizzes
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#1D1D1D] transition-colors hover:bg-gray-50">
            <Plus className="h-4 w-4" />
            Add Quiz
          </button>
        </div>
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
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {PROGRAM_OPTIONS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
            <option>Course Category</option>
            <option>Bible Studies</option>
            <option>Theology</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
            <option>Course Category</option>
            <option>Section A</option>
            <option>Section B</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quizzes..."
            className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUIZZES.map((quiz, i) => (
          <Card
            key={i}
            className="overflow-hidden border-gray-100 p-0 shadow-none"
          >
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-bold text-[#1D1D1D]">
                  {quiz.title}
                </h3>
              </div>
              <Badge className="mb-3 bg-emerald-50 text-xs text-emerald-600">
                {quiz.status}
              </Badge>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Grade:</span>
                  <span className="text-[#1D1D1D]">{quiz.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Course:</span>
                  <span className="text-[#1D1D1D]">{quiz.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Questions:</span>
                  <span className="text-[#1D1D1D]">{quiz.questions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Passing Score:</span>
                  <span className="text-[#1D1D1D]">{quiz.passingScore}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#4CC0D8] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
