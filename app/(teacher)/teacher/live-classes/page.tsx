"use client"

import React from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Users,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import StatCard from "@/components/common/stat-card"
import { useTeacherLiveClassesQuery } from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"
import { cn } from "@/lib/utils"
import type { TeacherLiveClassStatus } from "@/lib/api/teachers"

const PAGE_SIZE = 6
const ALL_STATUS = "all"
const STATUS_OPTIONS: Array<{
  label: string
  value: TeacherLiveClassStatus | typeof ALL_STATUS
}> = [
  { label: "All Classes", value: ALL_STATUS },
  { label: "Upcoming", value: "upcoming" },
  { label: "Live Now", value: "live_now" },
  { label: "Completed", value: "completed" },
]

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

function formatTime(timeValue: string) {
  const [hours, minutes] = timeValue.split(":").map(Number)

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return timeValue
  }

  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

function getStatusBadgeClasses(status: TeacherLiveClassStatus) {
  switch (status) {
    case "upcoming":
      return "bg-[#EBF7F9] text-[#4CC0D8]"
    case "live_now":
      return "bg-green-100 text-green-600"
    case "completed":
      return "bg-gray-100 text-gray-500"
  }
}

function formatStatusLabel(status: TeacherLiveClassStatus) {
  switch (status) {
    case "upcoming":
      return "Upcoming"
    case "live_now":
      return "Live Now"
    case "completed":
      return "Completed"
  }
}

function PaginationButton({
  className,
  variant = "brandOutline",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant={variant}
      className={cn(
        "h-8 w-8 border-gray-200 transition-colors",
        variant === "brandOutline"
          ? "text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
          : "text-white",
        className
      )}
      {...props}
    />
  )
}

export default function LiveClassesPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = React.useState<
    TeacherLiveClassStatus | typeof ALL_STATUS
  >(ALL_STATUS)
  const [page, setPage] = React.useState(1)

  const liveClassesQuery = useTeacherLiveClassesQuery({
    page,
    page_size: PAGE_SIZE,
    status: statusFilter === ALL_STATUS ? undefined : statusFilter,
    filter: statusFilter === ALL_STATUS ? undefined : statusFilter,
  })

  const results = liveClassesQuery.data?.results ?? []
  const count = liveClassesQuery.data?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))
  const upcomingCount = liveClassesQuery.data?.upcoming_count ?? 0
  const liveNowCount = liveClassesQuery.data?.live_now_count ?? 0
  const completedCount = liveClassesQuery.data?.completed_count ?? 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1D1D1D]">Live Classes</h2>
          <p className="mt-0.5 text-sm text-[#9CA3AF]">
            Schedule and manage your live teaching sessions
          </p>
        </div>
        <Button
          type="button"
          variant="brand"
          size="lg"
          className="px-4"
          onClick={() => router.push("/teacher/live-classes/create")}
        >
          <Plus className="h-4 w-4" />
          Create Live Class
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Classes", value: String(count) },
          { label: "Upcoming", value: String(upcomingCount) },
          { label: "Live Now", value: String(liveNowCount) },
          { label: "Completed", value: String(completedCount) },
        ].map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value as TeacherLiveClassStatus | typeof ALL_STATUS
              )
              setPage(1)
            }}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        </div>
      </div>

      {liveClassesQuery.isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(
            liveClassesQuery.error,
            "Failed to load live classes"
          )}
        </div>
      )}

      {liveClassesQuery.isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="h-32 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((cls) => (
            <Card key={cls.id} className="border-gray-100 shadow-none">
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF7F9]">
                      <Video className="h-5 w-5 text-[#4CC0D8]" />
                    </div>
                    <div>
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-[#1D1D1D]">
                          {cls.title}
                        </p>
                        <Badge
                          className={`text-xs ${getStatusBadgeClasses(cls.status)}`}
                        >
                          {formatStatusLabel(cls.status)}
                        </Badge>
                      </div>
                      <p className="mb-3 text-sm text-[#9CA3AF]">
                        {cls.course_title} · {cls.grade_level}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#666666]">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-[#4CC0D8]" />
                          {formatDate(cls.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#4CC0D8]" />
                          {formatTime(cls.start_time)} · {cls.duration_minutes}{" "}
                          minutes
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-[#4CC0D8]" />
                          {cls.enrolled_students_count} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Video className="h-3.5 w-3.5 text-[#4CC0D8]" />
                          {cls.meeting_platform}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-[#9CA3AF]">
                        {cls.program_name} · {cls.category_name}
                      </p>
                    </div>
                  </div>
                  {(cls.status === "upcoming" || cls.status === "live_now") && (
                    <Button
                      type="button"
                      variant="brandOutline"
                      size="sm"
                      className="px-3"
                      onClick={() =>
                        router.push("/teacher/live-classes/create")
                      }
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {results.length === 0 && (
            <div className="py-16 text-center">
              <Video className="mx-auto h-12 w-12 text-[#9CA3AF]" />
              <p className="mt-3 text-sm text-[#666666]">
                No live classes found for this status.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <PaginationButton
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="text-[#9CA3AF] disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationButton>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <PaginationButton
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    variant={pageNumber === page ? "brand" : "brandOutline"}
                    className={cn(
                      "text-sm font-medium",
                      pageNumber === page
                        ? "border-transparent hover:bg-[#3AB0C8] hover:text-white"
                        : "text-[#666666]"
                    )}
                    aria-current={pageNumber === page ? "page" : undefined}
                    aria-label={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </PaginationButton>
                )
              )}

              <PaginationButton
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
                className="text-[#9CA3AF] disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationButton>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
