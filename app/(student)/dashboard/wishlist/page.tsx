"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStudentWishlistQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import EnrolledCard from "@/components/common/enrolled-course-card"

export default function WishlistPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError, error } = useStudentWishlistQuery()

  const wishlist = data || []
  const pageSize = 9
  const totalPages = Math.ceil(wishlist.length / pageSize)
  const paginatedCourses = wishlist.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">Wishlist&apos;s</h2>

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="h-80 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="py-16 text-center text-red-500">
          {getApiErrorMessage(error, "Failed to load wishlist.")}
        </div>
      ) : paginatedCourses.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCourses.map((course, index) => (
            <EnrolledCard
              key={course.course_id}
              course={course}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-[#9CA3AF]">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "h-9 w-9 rounded-lg text-sm font-semibold transition-colors",
                  currentPage === page
                    ? "bg-[#4CC0D8] text-white"
                    : "border border-gray-200 text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
