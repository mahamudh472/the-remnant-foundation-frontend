"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  ArrowRight,
  Play,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  useStudentEnrolledCoursesQuery,
  type StudentEnrolledStatus,
} from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import EnrolledCard from "@/components/common/enrolled-course-card"

export default function EnrolledCoursesPage() {
  const [activeTab, setActiveTab] = useState<StudentEnrolledStatus>("enrolled")
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError, error } = useStudentEnrolledCoursesQuery({
    status: activeTab,
    page: currentPage,
    page_size: 9,
  })

  const courses = data?.results || []
  const totalCount = data?.count || 0
  const totalPages = Math.ceil(totalCount / 9)

  const tabs = [
    {
      name: "enrolled" as const,
      label: "Enrolled",
      count: data?.enrolled_count ?? 0,
    },
    {
      name: "active" as const,
      label: "Active",
      count: data?.active_count ?? 0,
    },
    {
      name: "completed" as const,
      label: "Completed",
      count: data?.completed_count ?? 0,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with tabs */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-lg font-bold text-[#1D1D1D]">Enrolled Courses</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name)
                setCurrentPage(1)
              }}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === tab.name
                  ? "bg-[#4CC0D8] text-white"
                  : "bg-[#F8F9FC] text-[#666666] hover:bg-gray-100"
              )}
            >
              {tab.label} ({String(tab.count).padStart(2, "0")})
            </button>
          ))}
        </div>
      </div>

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
          {getApiErrorMessage(error, "Failed to load enrolled courses.")}
        </div>
      ) : courses.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No courses found for this status.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
               <EnrolledCard key={course.course_id} course={course} index={index} />
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
