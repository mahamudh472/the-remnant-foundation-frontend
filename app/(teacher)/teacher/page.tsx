"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MoreVertical, Star } from "lucide-react"
import StatCard from "@/components/common/stat-card"
import { useTeacherDashboardQuery } from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"

import FALLBACK_THUMBNAIL from "@/assets/pngs/thumbnail-fallback.png"

function getStatusBadgeClass(status: string) {
  const normalizedStatus = status.toLowerCase()

  if (normalizedStatus === "published") {
    return "bg-emerald-50 text-emerald-600"
  }

  if (normalizedStatus === "pending") {
    return "bg-amber-50 text-amber-600"
  }

  return "bg-gray-100 text-gray-500"
}

export default function TeacherDashboardPage() {
  const { data, isLoading, isError, error } = useTeacherDashboardQuery()

  const stats =
    data?.cards.map((card) => ({
      label: card.label,
      value: String(card.value),
    })) || []

  const popularCourses = data?.most_popular_courses || []
  const recentCourses = data?.recently_added_courses || []

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {isLoading
          ? [1, 2, 3, 4, 5].map((skeleton) => (
              <div
                key={skeleton}
                className="h-20 animate-pulse rounded-xl bg-gray-100"
              />
            ))
          : stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>

      {isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(error, "Failed to load dashboard")}
        </div>
      )}

      {/* Most Popular Courses */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1D1D1D]">
            Most Popular Courses
          </h2>
          <Link
            href="/teacher/courses"
            className="text-sm font-medium text-[#4CC0D8] hover:underline"
          >
            View All
          </Link>
        </div>
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((skeleton) => (
              <div
                key={skeleton}
                className="h-72 animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        ) : popularCourses.length === 0 ? (
          <div className="rounded-xl border border-gray-100 p-6 text-sm text-[#666666]">
            No popular courses found.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularCourses.map((course) => (
              <Card
                key={course.id}
                className="group overflow-hidden border-gray-100 p-0 shadow-none"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={
                      course.thumbnail && !course.thumbnail.startsWith("http")
                        ? course.thumbnail
                        : FALLBACK_THUMBNAIL
                    }
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 rounded bg-[#4CC0D8] px-2 py-0.5 text-xs font-semibold text-white">
                    Popular
                  </span>
                </div>
                <CardContent className="space-y-2 p-4">
                  <h3 className="line-clamp-2 text-sm font-bold text-[#1D1D1D]">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">
                    {course.teacher_name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-xs font-medium text-[#1D1D1D]">
                      {course.stars.toFixed(1)}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      ({course.review_count})
                    </span>
                  </div>
                  <div className="pt-1 text-xs text-[#666666]">
                    {course.students_count} students
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recently Created Courses */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1D1D1D]">
            Recently Created Courses
          </h2>
          <Link
            href="/teacher/courses"
            className="text-sm font-medium text-[#4CC0D8] hover:underline"
          >
            View All
          </Link>
        </div>
        <Card className="overflow-hidden border-gray-100 p-0 shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8F9FC]">
                  <th className="px-4 py-3 font-semibold text-[#666666]">
                    Course Title
                  </th>
                  <th className="px-4 py-3 font-semibold text-[#666666]">
                    Category
                  </th>
                  <th className="px-4 py-3 font-semibold text-[#666666]">
                    Lessons
                  </th>
                  <th className="px-4 py-3 font-semibold text-[#666666]">
                    Enrolled
                  </th>
                  <th className="px-4 py-3 font-semibold text-[#666666]">
                    Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-[#666666]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-[#9CA3AF]"
                    >
                      Loading recently added courses...
                    </td>
                  </tr>
                ) : recentCourses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-[#9CA3AF]"
                    >
                      No recently created courses found.
                    </td>
                  </tr>
                ) : (
                  recentCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-[#1D1D1D]">
                        {course.title}
                      </td>
                      <td className="px-4 py-3 text-[#666666]">
                        {course.category_name}
                      </td>
                      <td className="px-4 py-3 text-[#666666]">
                        {course.lessons_count}
                      </td>
                      <td className="px-4 py-3 text-[#666666]">
                        {course.students_count}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(course.status)}`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="rounded p-1 text-[#9CA3AF] transition-colors hover:text-[#1D1D1D]">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
