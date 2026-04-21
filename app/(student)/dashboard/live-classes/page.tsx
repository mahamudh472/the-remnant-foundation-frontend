"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Users,
} from "lucide-react"
import {
  useStudentPastLiveClassesQuery,
  useStudentUpcomingLiveClassesQuery,
} from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"

const PAGE_SIZE = 6

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

function getAgeGroupBadgeClass(ageGroup: string) {
  const normalizedAgeGroup = ageGroup.toLowerCase()

  if (normalizedAgeGroup.includes("5") || normalizedAgeGroup.includes("12")) {
    return "bg-[#F59E0B]"
  }

  if (normalizedAgeGroup.includes("13") || normalizedAgeGroup.includes("18")) {
    return "bg-[#4CC0D8]"
  }

  return "bg-[#C776EA]"
}

export default function LiveClassesPage() {
  const [upcomingPage, setUpcomingPage] = React.useState(1)
  const [pastPage, setPastPage] = React.useState(1)

  const upcomingClassesQuery = useStudentUpcomingLiveClassesQuery({
    page: upcomingPage,
    page_size: PAGE_SIZE,
  })
  const pastClassesQuery = useStudentPastLiveClassesQuery({
    page: pastPage,
    page_size: PAGE_SIZE,
  })

  const upcomingClasses = upcomingClassesQuery.data?.results ?? []
  const upcomingCount = upcomingClassesQuery.data?.count ?? 0
  const upcomingTotalPages = Math.max(1, Math.ceil(upcomingCount / PAGE_SIZE))

  const pastClasses = pastClassesQuery.data?.results ?? []
  const pastCount = pastClassesQuery.data?.count ?? 0
  const pastTotalPages = Math.max(1, Math.ceil(pastCount / PAGE_SIZE))

  return (
    <div className="space-y-10">
      {/* Upcoming Live Classes */}
      <section>
        <h2 className="mb-1 text-lg font-bold text-[#1D1D1D]">
          Upcoming live classes
        </h2>
        <p className="mb-6 text-sm text-[#9CA3AF]">
          Reserve your spot in these live sessions
        </p>

        {upcomingClassesQuery.isError && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
            {getApiErrorMessage(
              upcomingClassesQuery.error,
              "Failed to load upcoming live classes"
            )}
          </div>
        )}

        {upcomingClassesQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="h-64 animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingClasses.map((cls) => (
                <Card
                  key={cls.id}
                  className="border-gray-100 shadow-none transition-shadow hover:shadow-md"
                >
                  <CardContent className="space-y-4 p-5">
                    <Badge
                      className={`border-0 text-xs font-semibold text-white ${getAgeGroupBadgeClass(cls.age_group)}`}
                    >
                      {cls.age_group}
                    </Badge>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1D]">
                        {cls.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#9CA3AF]">
                        {cls.course_name}
                      </p>
                      <p className="mt-1 text-xs text-[#9CA3AF]">
                        with {cls.teacher_name}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#666666]">
                        <Calendar className="h-3.5 w-3.5 text-[#9CA3AF]" />
                        {formatDate(cls.date)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#666666]">
                        <Clock className="h-3.5 w-3.5 text-[#9CA3AF]" />
                        {formatTime(cls.start_time)} ({cls.duration_minutes}{" "}
                        min)
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#666666]">
                        <Users className="h-3.5 w-3.5 text-[#9CA3AF]" />
                        {cls.registered_students_count} registered
                      </div>
                    </div>
                    <Button
                      asChild
                      className="h-10 w-full rounded-lg bg-[#F59E0B] text-sm font-semibold text-white hover:bg-[#D97706]"
                    >
                      <a
                        href={cls.reserve_spot_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Reserve Spot
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {upcomingClasses.length === 0 && (
              <div className="py-12 text-center">
                <Calendar className="mx-auto h-10 w-10 text-[#9CA3AF]" />
                <p className="mt-3 text-sm text-[#666666]">
                  No upcoming live classes found.
                </p>
              </div>
            )}

            {upcomingClasses.length > 0 && upcomingTotalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="brandOutline"
                  size="icon-sm"
                  onClick={() =>
                    setUpcomingPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={upcomingPage === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from(
                  { length: upcomingTotalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    type="button"
                    variant="brandOutline"
                    size="icon-sm"
                    onClick={() => setUpcomingPage(pageNumber)}
                    className={
                      pageNumber === upcomingPage
                        ? "flex h-8 w-8 items-center justify-center rounded-lg bg-[#4CC0D8] text-sm font-medium text-white"
                        : "flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                    }
                  >
                    {pageNumber}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="brandOutline"
                  size="icon-sm"
                  onClick={() =>
                    setUpcomingPage((prev) =>
                      Math.min(upcomingTotalPages, prev + 1)
                    )
                  }
                  disabled={upcomingPage === upcomingTotalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Recorded Sessions */}
      <section>
        <h2 className="mb-1 text-lg font-bold text-[#1D1D1D]">
          Recorded Sessions
        </h2>
        <p className="mb-6 text-sm text-[#9CA3AF]">
          Catch up on classes you missed
        </p>

        {pastClassesQuery.isError && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
            {getApiErrorMessage(
              pastClassesQuery.error,
              "Failed to load recorded sessions"
            )}
          </div>
        )}

        {pastClassesQuery.isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="h-24 animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {pastClasses.map((session) => (
                <Card key={session.id} className="border-gray-100 shadow-none">
                  <CardContent className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#EBF7F9]">
                      <FileText className="h-6 w-6 text-[#4CC0D8]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#1D1D1D]">
                        {session.course_name}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#9CA3AF]">
                        with {session.teacher_name}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(session.date)}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                          <Clock className="h-3.5 w-3.5" />
                          {formatTime(session.start_time)}
                        </span>
                      </div>
                    </div>

                    {session.record_link ? (
                      <Button
                        asChild
                        size="sm"
                        className="h-8 shrink-0 rounded-md bg-[#4CC0D8] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3AB0C8]"
                      >
                        <a
                          href={session.record_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Watch Recording
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    ) : (
                      <span className="text-xs text-[#9CA3AF]">
                        Recording unavailable
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {pastClasses.length === 0 && (
              <div className="py-12 text-center">
                <FileText className="mx-auto h-10 w-10 text-[#9CA3AF]" />
                <p className="mt-3 text-sm text-[#666666]">
                  No recorded sessions found.
                </p>
              </div>
            )}

            {pastClasses.length > 0 && pastTotalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="brandOutline"
                  size="icon-sm"
                  onClick={() => setPastPage((prev) => Math.max(1, prev - 1))}
                  disabled={pastPage === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from(
                  { length: pastTotalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    type="button"
                    variant="brandOutline"
                    size="icon-sm"
                    onClick={() => setPastPage(pageNumber)}
                    className={
                      pageNumber === pastPage
                        ? "flex h-8 w-8 items-center justify-center rounded-lg bg-[#4CC0D8] text-sm font-medium text-white"
                        : "flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                    }
                  >
                    {pageNumber}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="brandOutline"
                  size="icon-sm"
                  onClick={() =>
                    setPastPage((prev) => Math.min(pastTotalPages, prev + 1))
                  }
                  disabled={pastPage === pastTotalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
