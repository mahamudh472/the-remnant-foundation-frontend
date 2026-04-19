"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
} from "lucide-react"
import {
  useCompleteStudentLessonMutation,
  useStudentCourseModulesQuery,
  useStudentModuleContentQuery,
} from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import { cn } from "@/lib/utils"

const LESSON_VIDEO_IDS = [
  "M7lc1UVf-VE",
  "ScMzIvxBSi4",
  "aqz-KE-bpKQ",
  "jNQXAC9IVRw",
  "e-ORhEE9VVg",
]

function getLessonVideoId(lessonId: number) {
  return LESSON_VIDEO_IDS[Math.abs(lessonId) % LESSON_VIDEO_IDS.length]
}

export default function CoursePlayerPage() {
  const params = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState<"description" | "review">(
    "description"
  )
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null)
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null)

  const slugValue = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  const courseId = Number(slugValue)
  const isValidCourseId = Number.isInteger(courseId) && courseId > 0

  const courseModulesQuery = useStudentCourseModulesQuery(
    isValidCourseId ? courseId : undefined,
    isValidCourseId
  )

  const modules = courseModulesQuery.data?.modules ?? []

  const selectedModuleId =
    expandedModuleId !== null &&
    modules.some((moduleItem) => moduleItem.module_id === expandedModuleId)
      ? expandedModuleId
      : (modules[0]?.module_id ?? undefined)

  const moduleContentQuery = useStudentModuleContentQuery(
    selectedModuleId,
    Boolean(isValidCourseId && selectedModuleId)
  )

  const completeLessonMutation = useCompleteStudentLessonMutation()

  const moduleContent = moduleContentQuery.data
  const lessons = moduleContent?.lessons ?? []
  const quizzes = moduleContent?.quizzes ?? []
  const assignments = moduleContent?.assignments ?? []

  const selectedLessonId =
    activeLessonId !== null &&
    lessons.some((lessonItem) => lessonItem.lesson_id === activeLessonId)
      ? activeLessonId
      : (lessons[0]?.lesson_id ?? null)

  const activeLesson =
    lessons.find((lessonItem) => lessonItem.lesson_id === selectedLessonId) ??
    lessons[0] ??
    null

  const courseProgress = Math.max(
    0,
    Math.min(100, courseModulesQuery.data?.progress_percentage ?? 0)
  )

  const activeModuleLabel = (() => {
    const selectedModule = modules.find(
      (moduleItem) => moduleItem.module_id === selectedModuleId
    )
    if (!selectedModule) {
      return "Module"
    }

    const moduleIndex = modules.findIndex(
      (moduleItem) => moduleItem.module_id === selectedModule.module_id
    )

    return moduleIndex >= 0 ? `Module ${moduleIndex + 1}` : "Module"
  })()

  const completeButtonDisabled =
    !activeLesson ||
    activeLesson.complete ||
    !isValidCourseId ||
    !selectedModuleId ||
    completeLessonMutation.isPending

  const completeButtonLabel = activeLesson?.complete
    ? "Completed"
    : completeLessonMutation.isPending
      ? "Marking..."
      : "Mark as Complete"

  const handleMarkLessonComplete = () => {
    if (!activeLesson || !selectedModuleId || !isValidCourseId) {
      return
    }

    completeLessonMutation.mutate({
      lessonId: activeLesson.lesson_id,
      moduleId: selectedModuleId,
      courseId,
    })
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
        <Link
          href="/dashboard"
          className="transition-colors hover:text-[#4CC0D8]"
        >
          Home
        </Link>
        <span>|</span>
        <Link
          href="/dashboard/enrolled-courses"
          className="transition-colors hover:text-[#4CC0D8]"
        >
          Enrolled classes
        </Link>
        <span>|</span>
        <span className="text-[#4CC0D8]">Course Details</span>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        {/* Video & Description Column */}
        <div className="min-w-0 flex-1 space-y-6">
          {!isValidCourseId && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
              Invalid course id.
            </div>
          )}

          {courseModulesQuery.isError && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
              {getApiErrorMessage(
                courseModulesQuery.error,
                "Failed to load course modules"
              )}
            </div>
          )}

          {moduleContentQuery.isError && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
              {getApiErrorMessage(
                moduleContentQuery.error,
                "Failed to load module content"
              )}
            </div>
          )}

          {completeLessonMutation.isError && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
              {getApiErrorMessage(
                completeLessonMutation.error,
                "Failed to mark lesson as complete"
              )}
            </div>
          )}

          {/* Video Player */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-black">
            <div className="aspect-video">
              <iframe
                title={activeLesson?.title ?? "Course lesson"}
                src={`https://www.youtube.com/embed/${getLessonVideoId(activeLesson?.lesson_id ?? 0)}?rel=0&modestbranding=1&iv_load_policy=3`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="space-y-2">
            <Badge className="w-fit border-0 bg-[#4CC0D8]/10 text-[#4CC0D8]">
              {activeModuleLabel}
            </Badge>
            <h2 className="text-lg font-bold text-[#1D1D1D]">
              {activeLesson?.title ?? "Select a lesson"}
            </h2>
            <p className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <Clock className="h-4 w-4" />
              {activeLesson ? `Lesson #${activeLesson.lesson_id}` : "No lesson"}
            </p>
          </div>

          {/* Description / Review Tabs */}
          <div className="flex gap-2 border-b border-gray-100 pb-1">
            {(["description", "review"] as const).map((tab) => (
              <Button
                key={tab}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          {activeTab === "description" ? (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#1D1D1D]">
                Lesson descriptions
              </h3>
              <p className="text-sm leading-relaxed text-[#666666]">
                {activeLesson?.description || "No description available."}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Badge className="border-0 bg-[#F8F9FC] text-[#666666]">
                  {quizzes.length} quizzes
                </Badge>
                <Badge className="border-0 bg-[#F8F9FC] text-[#666666]">
                  {assignments.length} assignments
                </Badge>
                <Button
                  type="button"
                  variant={activeLesson?.complete ? "secondary" : "brand"}
                  onClick={handleMarkLessonComplete}
                  disabled={completeButtonDisabled}
                >
                  {completeButtonLabel}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#666666]">
                Reviews will appear after learners submit lesson feedback.
              </p>
            </div>
          )}
        </div>

        {/* Course Playlists Sidebar */}
        <div className="w-full shrink-0 xl:w-80">
          <Card className="sticky top-24 border-gray-100 shadow-none">
            <CardContent className="p-5">
              <h3 className="text-base font-bold text-[#1D1D1D]">
                Course Playlists
              </h3>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold tracking-[0.04em] text-[#9CA3AF] uppercase">
                    <span>Course Progress</span>
                    <span>{courseProgress}% complete</span>
                  </div>
                  <Progress
                    value={courseProgress}
                    className="h-2 bg-gray-100 [&_[data-slot=progress-indicator]]:bg-[#4CC0D8]"
                  />
                </div>

                {courseModulesQuery.isLoading && (
                  <div className="space-y-2">
                    {[1, 2, 3].map((skeleton) => (
                      <div
                        key={skeleton}
                        className="h-14 animate-pulse rounded-xl bg-gray-100"
                      />
                    ))}
                  </div>
                )}

                {!courseModulesQuery.isLoading && modules.length === 0 && (
                  <p className="text-sm text-[#9CA3AF]">No modules found.</p>
                )}

                {modules.map((moduleItem, moduleIndex) => {
                  const isExpanded = selectedModuleId === moduleItem.module_id

                  return (
                    <div
                      key={moduleItem.module_id}
                      className="overflow-hidden rounded-xl border border-[#E6EEF2]"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setExpandedModuleId((prev) =>
                            prev === moduleItem.module_id
                              ? null
                              : moduleItem.module_id
                          )
                        }}
                        className="h-auto w-full justify-between rounded-none px-3 py-3 text-left hover:bg-[#EEF8FB]"
                      >
                        <div>
                          <p className="text-[10px] font-semibold tracking-[0.05em] text-[#9CA3AF] uppercase">
                            Module {moduleIndex + 1}
                          </p>
                          <p className="text-sm font-semibold text-[#1D1D1D]">
                            {moduleItem.module_name}
                          </p>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-[#4CC0D8]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
                        )}
                      </Button>

                      {isExpanded && (
                        <div className="space-y-1 border-t border-[#E6EEF2] bg-white p-2">
                          {moduleContentQuery.isLoading && (
                            <div className="space-y-2">
                              {[1, 2, 3].map((skeleton) => (
                                <div
                                  key={skeleton}
                                  className="h-10 animate-pulse rounded-lg bg-gray-100"
                                />
                              ))}
                            </div>
                          )}

                          {!moduleContentQuery.isLoading &&
                            moduleContent?.lessons.map((lessonItem) => {
                              const isActive =
                                lessonItem.lesson_id === selectedLessonId

                              return (
                                <Button
                                  key={lessonItem.lesson_id}
                                  type="button"
                                  variant="ghost"
                                  onClick={() => {
                                    setExpandedModuleId(moduleItem.module_id)
                                    setActiveLessonId(lessonItem.lesson_id)
                                  }}
                                  className={cn(
                                    "h-auto w-full justify-start gap-2 rounded-lg px-2.5 py-2 text-left",
                                    isActive
                                      ? "bg-[#EAF9FC] text-[#1D1D1D]"
                                      : "text-[#666666] hover:bg-[#F7F9FB]"
                                  )}
                                >
                                  {lessonItem.complete ? (
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#22C55E]" />
                                  ) : isActive ? (
                                    <Circle className="h-4 w-4 shrink-0 fill-[#4CC0D8] text-[#4CC0D8]" />
                                  ) : (
                                    <Circle className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
                                  )}
                                  <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold">
                                      {lessonItem.title}
                                    </p>
                                    <p className="text-[10px] text-[#9CA3AF]">
                                      Lesson #{lessonItem.lesson_id}
                                    </p>
                                  </div>
                                </Button>
                              )
                            })}

                          {!moduleContentQuery.isLoading &&
                            (moduleContent?.lessons.length ?? 0) === 0 && (
                              <p className="px-1 py-2 text-xs text-[#9CA3AF]">
                                No lessons available in this module.
                              </p>
                            )}

                          {!moduleContentQuery.isLoading &&
                            ((moduleContent?.quizzes.length ?? 0) > 0 ||
                              (moduleContent?.assignments.length ?? 0) > 0) && (
                              <div className="flex flex-wrap gap-2 px-1 pt-2">
                                {(moduleContent?.quizzes.length ?? 0) > 0 && (
                                  <Badge className="border-0 bg-[#F8F9FC] text-[10px] text-[#666666]">
                                    {moduleContent?.quizzes.length ?? 0} quizzes
                                  </Badge>
                                )}
                                {(moduleContent?.assignments.length ?? 0) >
                                  0 && (
                                  <Badge className="border-0 bg-[#F8F9FC] text-[10px] text-[#666666]">
                                    {moduleContent?.assignments.length ?? 0}{" "}
                                    assignments
                                  </Badge>
                                )}
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
