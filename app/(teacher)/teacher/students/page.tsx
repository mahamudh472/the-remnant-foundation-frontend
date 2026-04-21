"use client"

import { useState } from "react"
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useTeacherStudentsQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import StudentCard from "@/components/common/student-card"

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
               <StudentCard key={student.id} {...student} />
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
