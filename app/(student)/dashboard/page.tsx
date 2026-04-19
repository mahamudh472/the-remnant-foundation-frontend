"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Play, Heart, Download } from "lucide-react"
import StatCard from "@/components/common/stat-card"
import { useStudentDashboardQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useStudentDashboardQuery()

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-16 text-center text-red-500">
        {getApiErrorMessage(error, "Failed to load dashboard.")}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="py-16 text-center text-gray-500">
        No dashboard data found.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Quiz Banner */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-[#1D1D1D]">
              {data.featured_quiz
                ? `Quiz : ${data.featured_quiz.course_title}`
                : "No Featured Quiz"}
            </h3>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              {data.featured_quiz
                ? `Answered : ${data.featured_quiz.answered}`
                : "No quiz progress yet"}
            </p>
          </div>
          {data.featured_quiz && (
            <Link
              href={`/courses/${data.featured_quiz.course_id}`}
              className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#3AB0C8]"
            >
              {data.featured_quiz.action_label}
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4">
        {data.cards.map((stat) => (
          <StatCard
            key={stat.key}
            stat={{ label: stat.label, value: String(stat.value) }}
          />
        ))}
      </div>

      {/* Recently Enrolled Courses */}
      <div>
        <h2 className="mb-5 text-lg font-bold text-[#1D1D1D]">
          Recently Enrolled Courses
        </h2>
        {data.recently_enrolled_courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center text-[#9CA3AF]">
            No recently enrolled courses.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.recently_enrolled_courses.map((course, index) => (
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
                  <div className="mb-3 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-xs font-semibold text-[#1D1D1D]">
                      {course.stars}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      ({course.review_count} Reviews)
                    </span>
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
      </div>

      {/* Invoices & Quizzes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Invoices */}
        <Card className="border-gray-100 shadow-none">
          <CardContent className="p-5">
            <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
              Recent Invoices
            </h3>
            {data.recent_invoices.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No recent invoices.</p>
            ) : (
              <div className="space-y-4">
                {data.recent_invoices.map((inv, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1D1D1D]">
                        {inv.course}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        {inv.id} · Amount :{" "}
                        <span className="font-semibold text-[#4CC0D8]">
                          {inv.amount}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="border-0 bg-green-100 text-[10px] font-semibold text-green-700">
                        Paid
                      </Badge>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Latest Quizzes */}
        <Card className="border-gray-100 shadow-none">
          <CardContent className="p-5">
            <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
              Latest Quizes
            </h3>
            {data.latest_quizzes.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No quiz attempts yet.</p>
            ) : (
              <div className="space-y-4">
                {data.latest_quizzes.map((quiz, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1D1D1D]">
                        {quiz.course_title}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        Correct Answer : {quiz.correct_answer} · Date :{" "}
                        {formatDisplayDate(quiz.date)}
                      </p>
                    </div>
                    <div
                      className="relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: `conic-gradient(${quiz.score >= 80 ? "#22C55E" : quiz.score >= 50 ? "#F59E0B" : "#EF4444"} ${quiz.score * 3.6}deg, #F3F4F6 0deg)`,
                      }}
                    >
                      <div className="absolute inset-1 flex items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1D1D1D]">
                        {quiz.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
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
