"use client"

import React from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
} from "lucide-react"
import AssigmentCard from "@/components/teacher/assignment-card"
import { useDebounce } from "@/hooks/use-debounce"
import { useTeacherAssignmentsQuery } from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"
import type { TeacherAssignmentOrdering } from "@/lib/api/teachers"

const PAGE_SIZE = 6

const ALL_GRADES = "all"
const ALL_COURSES = "all"
const ALL_STATUS = "all"
const ALL_TYPES = "all"

const ORDER_OPTIONS: { label: string; value: TeacherAssignmentOrdering }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Title A-Z", value: "title_az" },
  { label: "Title Z-A", value: "title_za" },
]

function toTitleCase(text: string) {
  return text
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function formatDate(dateValue: string) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return dateValue
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export default function TeacherAssignmentsPage() {
  const [gradeFilter, setGradeFilter] = React.useState(ALL_GRADES)
  const [courseFilter, setCourseFilter] = React.useState(ALL_COURSES)
  const [statusFilter, setStatusFilter] = React.useState(ALL_STATUS)
  const [assignmentTypeFilter, setAssignmentTypeFilter] =
    React.useState(ALL_TYPES)
  const [ordering, setOrdering] =
    React.useState<TeacherAssignmentOrdering>("newest")
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(1)

  const debouncedSearch = useDebounce(search, 400)

  const assignmentsQuery = useTeacherAssignmentsQuery({
    page,
    page_size: PAGE_SIZE,
    search: debouncedSearch || undefined,
    grade: gradeFilter === ALL_GRADES ? undefined : gradeFilter,
    course: courseFilter === ALL_COURSES ? undefined : courseFilter,
    status: statusFilter === ALL_STATUS ? undefined : statusFilter,
    assignment_type:
      assignmentTypeFilter === ALL_TYPES ? undefined : assignmentTypeFilter,
    ordering,
  })

  const results = assignmentsQuery.data?.results ?? []
  const count = assignmentsQuery.data?.count ?? 0
  const filters = assignmentsQuery.data?.filters
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  const gradeOptions = [
    { value: ALL_GRADES, label: "All Grades" },
    ...(filters?.grades ?? []),
  ]

  const courseOptions = [
    { id: ALL_COURSES, name: "All Courses" },
    ...(filters?.courses ?? []),
  ]

  const statusOptions = [
    { value: ALL_STATUS, label: "All Status" },
    ...(filters?.statuses ?? []),
  ]

  const assignmentTypeOptions = [
    { value: ALL_TYPES, label: "All Types" },
    ...(filters?.assignment_types ?? []),
  ]

  const onGradeChange = (value: string) => {
    setGradeFilter(value)
    setCourseFilter(ALL_COURSES)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">Assignments</h2>
        {/* <Link
          href="/teacher/assignments/add"
          className="rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
        >
          + Add Assignment
        </Link> */}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Grade Category *
          </label>
          <select
            value={gradeFilter}
            onChange={(e) => onGradeChange(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {gradeOptions.map((g) => (
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
            onChange={(e) => {
              setCourseFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {courseOptions.map((c) => (
              <option key={String(c.id)} value={String(c.id)}>
                {c.name}
              </option>
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
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 bottom-2.5 h-4 w-4 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Assignment Type
          </label>
          <select
            value={assignmentTypeFilter}
            onChange={(e) => {
              setAssignmentTypeFilter(e.target.value)
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {assignmentTypeOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 bottom-2.5 h-4 w-4 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Sort By
          </label>
          <select
            value={ordering}
            onChange={(e) => {
              setOrdering(e.target.value as TeacherAssignmentOrdering)
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
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search assignments..."
            className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>

      {assignmentsQuery.isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(
            assignmentsQuery.error,
            "Failed to load assignments"
          )}
        </div>
      )}

      {/* Assignment Cards */}
      {assignmentsQuery.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="h-44 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((assignment) => (
            <AssigmentCard
              key={assignment.id}
              assignment={{
                id: assignment.id,
                title: assignment.title,
                grade: assignment.grade?.label,
                course: assignment.course_name,
                type: assignment.assignment_type_label,
                dueDate: formatDate(assignment.due_date),
                status: toTitleCase(assignment.status),
              }}
            />
          ))}
        </div>
      )}

      {!assignmentsQuery.isLoading && results.length === 0 && (
        <div className="py-16 text-center">
          <FileText className="mx-auto h-12 w-12 text-[#9CA3AF]" />
          <p className="mt-3 text-sm text-[#666666]">
            No assignments found matching your filters.
          </p>
        </div>
      )}

      {!assignmentsQuery.isLoading && results.length > 0 && totalPages > 1 && (
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
