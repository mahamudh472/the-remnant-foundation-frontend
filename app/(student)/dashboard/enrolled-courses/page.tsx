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
            <Card
              key={course.course_id}
              className="group overflow-hidden border-gray-100 shadow-none transition-shadow hover:shadow-md"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={
                    course.course_thumbnail ||
                    "/assets/pngs/web course image.png"
                  }
                  alt={course.course_title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
                {index === 0 && (
                  <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F59E0B]">
                    <Star className="h-4 w-4 fill-white text-white" />
                  </div>
                )}
                <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white">
                  <Heart className="h-4 w-4 text-[#9CA3AF]" />
                </button>
                <button className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <Play className="ml-0.5 h-4 w-4 text-[#4CC0D8]" />
                </button>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src={
                          course.teacher_avatar || "/assets/pngs/Profile.png"
                        }
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 object-cover"
                      />
                    </div>
                    <span className="text-xs text-[#666666]">
                      {course.teacher_name}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="border-0 bg-[#F8F9FC] text-[10px] font-medium text-[#666666]"
                  >
                    {course.category_name}
                  </Badge>
                </div>
                <h3 className="mb-2 text-sm font-bold text-[#1D1D1D]">
                  {course.course_title}
                </h3>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-xs font-semibold text-[#1D1D1D]">
                      {course.stars}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      ({course.review_count} Reviews)
                    </span>
                  </div>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
                    <ShoppingCart className="h-3.5 w-3.5" />
                  </button>
                </div>
                {/* Progress bar */}
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#4CC0D8] transition-all"
                    style={{ width: `${course.class_progress}%` }}
                  />
                </div>
                <Link
                  href={`/courses/${course.course_id}`}
                  className="inline-flex items-center gap-1 rounded-md bg-[#4CC0D8] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
                >
                  Start Now <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
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
