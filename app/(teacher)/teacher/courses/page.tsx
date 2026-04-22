"use client"

import React from "react"
import Link from "next/link"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import MyCourseCard from "@/components/teacher/my-course-card"
import StatCard from "@/components/common/stat-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  useDeleteTeacherCourseMutation,
  useTeacherCoursesCountByFilterQuery,
  useTeacherCoursesQuery,
  type TeacherCoursesFilter,
} from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"

const TABS = ["Publish", "Pending", "Draft", "Inactive"] as const
const PAGE_SIZE = 9

import thumbnailFallback from "@/assets/pngs/thumbnail-fallback.png"

function toFilter(tab: (typeof TABS)[number]): TeacherCoursesFilter {
  switch (tab) {
    case "Publish":
      return "publish"
    case "Pending":
      return "pending"
    case "Draft":
      return "draft"
    case "Inactive":
      return "inactive"
  }
}

export default function TeacherCoursesPage() {
  const [activeTab, setActiveTab] =
    React.useState<(typeof TABS)[number]>("Publish")
  const [page, setPage] = React.useState(1)
  const [courseToDelete, setCourseToDelete] = React.useState<{
    id: number
    title: string
  } | null>(null)

  const activeFilter = toFilter(activeTab)
  const deleteCourseMutation = useDeleteTeacherCourseMutation()

  const coursesQuery = useTeacherCoursesQuery({
    page,
    // page_size: PAGE_SIZE,
    filter: activeFilter,
  })

  const publishCountQuery = useTeacherCoursesCountByFilterQuery("publish")
  const pendingCountQuery = useTeacherCoursesCountByFilterQuery("pending")
  const draftCountQuery = useTeacherCoursesCountByFilterQuery("draft")
  const inactiveCountQuery = useTeacherCoursesCountByFilterQuery("inactive")

  const results = coursesQuery.data?.results || []
  const totalCount = coursesQuery.data?.count || 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const freeCoursesOnPage = results.filter(
    (course) => Number.parseFloat(course.price) <= 0
  ).length
  const paidCoursesOnPage = results.length - freeCoursesOnPage

  const statCards = [
    {
      label: "Published Courses",
      value: String(publishCountQuery.data?.count ?? 0),
    },
    {
      label: "Pending Courses",
      value: String(pendingCountQuery.data?.count ?? 0),
    },
    {
      label: "Draft Courses",
      value: String(draftCountQuery.data?.count ?? 0),
    },
    {
      label: "Inactive Courses",
      value: String(inactiveCountQuery.data?.count ?? 0),
    },
    {
      label: "Total Courses",
      value: String(
        (publishCountQuery.data?.count ?? 0) +
          (pendingCountQuery.data?.count ?? 0) +
          (draftCountQuery.data?.count ?? 0) +
          (inactiveCountQuery.data?.count ?? 0)
      ),
    },
  ]

  const onTabChange = (tab: (typeof TABS)[number]) => {
    setActiveTab(tab)
    setPage(1)
  }

  const handleRequestDeleteCourse = (courseId: number, courseTitle: string) => {
    if (deleteCourseMutation.isPending) {
      return
    }

    setCourseToDelete({ id: courseId, title: courseTitle })
  }

  const handleConfirmDeleteCourse = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    if (!courseToDelete || deleteCourseMutation.isPending) {
      return
    }

    try {
      const response = await deleteCourseMutation.mutateAsync(courseToDelete.id)
      toast.success(response.message || "Course deleted successfully")
      setCourseToDelete(null)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete course"))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">My Courses</h2>
        <Link
          href="/teacher/courses/new"
          className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
        >
          <Plus className="h-4 w-4" />
          Add New Course
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {coursesQuery.isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(coursesQuery.error, "Failed to load courses")}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors",
              activeTab === tab
                ? "border-[#4CC0D8] text-[#4CC0D8]"
                : "border-transparent text-[#666666] hover:text-[#1D1D1D]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {coursesQuery.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="h-80 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-center text-sm text-[#9CA3AF]">
          No courses found in this category.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((course) => {
              const isDeletingCourse =
                deleteCourseMutation.isPending &&
                deleteCourseMutation.variables === course.id

              return (
                <MyCourseCard
                  key={course.id}
                  course={{
                    id: course.id,
                    title: course.title,
                    image: course.thumbnail || thumbnailFallback.src,
                    instructor: "You",
                    lessons: course.lessons_count,
                    time: "",
                    price: Number.parseFloat(course.price),
                  }}
                  onDelete={(courseId) => {
                    handleRequestDeleteCourse(courseId, course.title)
                  }}
                  isDeleting={isDeletingCourse}
                />
              )
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>
              Showing {results.length} of {totalCount} ({activeTab})
            </span>
            <span>
              Free on page: {freeCoursesOnPage}, Paid on page:{" "}
              {paidCoursesOnPage}
            </span>
          </div>
        </>
      )}

      {/* Pagination */}
      {!coursesQuery.isLoading && results.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  pageNumber === page
                    ? "bg-[#4CC0D8] text-white"
                    : "border border-gray-200 text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                )}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <AlertDialog
        open={Boolean(courseToDelete)}
        onOpenChange={(open) => {
          if (!open && !deleteCourseMutation.isPending) {
            setCourseToDelete(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              {courseToDelete ? ` \"${courseToDelete.title}\"` : " this course"}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteCourseMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteCourseMutation.isPending}
              onClick={handleConfirmDeleteCourse}
            >
              {deleteCourseMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
