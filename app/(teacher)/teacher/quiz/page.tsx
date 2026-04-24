"use client"

import React from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Plus,
  Save,
  Search,
} from "lucide-react"
import QuizCard from "@/components/teacher/quiz-card"
import { getApiErrorMessage } from "@/lib/api/client"
import { useTeacherQuizzesQuery } from "@/hooks/api/use-teachers"
import { useDebounce } from "@/hooks/use-debounce"
import type { TeacherQuizOrdering } from "@/lib/api/teachers"

const PAGE_SIZE = 6
const ALL = "all"

const ORDER_OPTIONS: { label: string; value: TeacherQuizOrdering }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Title A-Z", value: "title_az" },
  { label: "Title Z-A", value: "title_za" },
]

export default function TeacherQuizPage() {
  const [gradeFilter, setGradeFilter] = React.useState(ALL)
  const [programFilter, setProgramFilter] = React.useState(ALL)
  const [categoryFilter, setCategoryFilter] = React.useState(ALL)
  const [quizTypeFilter, setQuizTypeFilter] = React.useState(ALL)
  const [statusFilter, setStatusFilter] = React.useState(ALL)
  const [ordering, setOrdering] = React.useState<TeacherQuizOrdering>("newest")
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(1)

  const debouncedSearch = useDebounce(search, 400)

  const quizzesQuery = useTeacherQuizzesQuery({
    page,
    page_size: PAGE_SIZE,
    search: debouncedSearch || undefined,
    grade: gradeFilter === ALL ? undefined : gradeFilter,
    program: programFilter === ALL ? undefined : programFilter,
    category: categoryFilter === ALL ? undefined : categoryFilter,
    quiz_type: quizTypeFilter === ALL ? undefined : quizTypeFilter,
    status: statusFilter === ALL ? undefined : statusFilter,
    ordering,
  })

  const results = quizzesQuery.data?.results ?? []
  const count = quizzesQuery.data?.count ?? 0
  const filters = quizzesQuery.data?.filters
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  const gradeOptions = [
    { value: ALL, label: "All Grades" },
    ...(filters?.grades ?? []),
  ]
  const programOptions = [
    { id: ALL, name: "All Programs" },
    ...(filters?.programs ?? []),
  ]
  const categoryOptions = [
    { id: ALL, name: "All Categories" },
    ...(filters?.categories ?? []),
  ]
  const quizTypeOptions = [
    { value: ALL, label: "All Quiz Types" },
    ...(filters?.quiz_types ?? []),
  ]
  const statusOptions = [
    { value: ALL, label: "All Status" },
    ...(filters?.course_statuses ?? []),
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1D1D1D]">All Quizzes</h2>
          <p className="text-sm text-[#666666]">
            Filter and manage your quizzes
          </p>
        </div>
        {/* <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          <Link
            href="/teacher/quiz/add"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#1D1D1D] transition-colors hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
            Add Quiz
          </Link>
        </div> */}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={gradeFilter}
            onChange={(e) => {
              setGradeFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {gradeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select
            value={programFilter}
            onChange={(e) => {
              setProgramFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {programOptions.map((option) => (
              <option key={String(option.id)} value={String(option.id)}>
                {option.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {categoryOptions.map((option) => (
              <option key={String(option.id)} value={String(option.id)}>
                {option.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select
            value={quizTypeFilter}
            onChange={(e) => {
              setQuizTypeFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {quizTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select
            value={ordering}
            onChange={(e) => {
              setOrdering(e.target.value as TeacherQuizOrdering)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {ORDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search quizzes..."
            className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>

      {quizzesQuery.isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(quizzesQuery.error, "Failed to load quizzes")}
        </div>
      )}

      {quizzesQuery.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="h-56 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={{
                id: quiz.id || 0,
                title: quiz.title || "Untitled Quiz",
                grade: quiz.grade?.label || "-",
                course: quiz.course_name || "-",
                program: quiz.program_name || "-",
                category: quiz.category_name || "-",
                questionsCount: quiz.questions_count || 0,
                passingScore: quiz.passing_score || 0,
                status: quiz.status || "draft",
              }}
            />
          ))}
        </div>
      )}

      {!quizzesQuery.isLoading && results.length === 0 && (
        <div className="py-16 text-center">
          <FileText className="mx-auto h-12 w-12 text-[#9CA3AF]" />
          <p className="mt-3 text-sm text-[#666666]">
            No quizzes found matching your filters.
          </p>
        </div>
      )}

      {!quizzesQuery.isLoading && results.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
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
