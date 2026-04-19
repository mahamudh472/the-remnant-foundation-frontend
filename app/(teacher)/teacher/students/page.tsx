"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  MapPin,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useTeacherStudentsQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading, isError, error } = useTeacherStudentsQuery({
    page,
    page_size: 9,
    search: debouncedSearch || undefined,
  })

  const students = data?.results || []
  const totalCount = data?.count || 0
  const totalPages = Math.ceil(totalCount / 9)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">Students</h2>
        <div className="relative w-56">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search"
            className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>

      {/* Student Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="h-72 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="py-16 text-center text-red-500">
          {getApiErrorMessage(error, "Failed to load students.")}
        </div>
      ) : students.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No students found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <Link key={student.id} href={`/teacher/students/${student.id}`}>
              <Card className="overflow-hidden border-gray-100 p-0 shadow-none transition-shadow hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={student.avatar || "/assets/pngs/student.png"}
                    alt={student.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-sm font-bold text-[#1D1D1D]">
                    {student.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#4CC0D8]" />
                    <span className="text-xs text-[#4CC0D8]">
                      {student.location || "N/A"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-[#666666]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#F59E0B]" />
                      <span>
                        {formatDisplayDate(student.first_enrolled_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-[#F59E0B]" />
                      <span>
                        {student.total_courses.toString().padStart(2, "0")}{" "}
                        Courses
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-[#9CA3AF]">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-50 disabled:hover:border-gray-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1

              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= page - 1 && pageNumber <= page + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                      pageNumber === page
                        ? "bg-[#F59E0B] text-white"
                        : "border border-gray-200 text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                    )}
                  >
                    {pageNumber}
                  </button>
                )
              }

              if (
                (pageNumber === page - 2 && page > 3) ||
                (pageNumber === page + 2 && page < totalPages - 2)
              ) {
                return (
                  <span
                    key={pageNumber}
                    className="flex w-4 items-end justify-center text-gray-400"
                  >
                    ...
                  </span>
                )
              }

              return null
            })}
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-50 disabled:hover:border-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function formatDisplayDate(date: string) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return "-"
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
