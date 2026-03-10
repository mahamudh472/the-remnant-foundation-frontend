"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Clock,
  FileText,
  DollarSign,
  Gift,
  Star,
  Trash2,
  Pencil,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import MyCourseCard from "@/components/teacher/my-course-card"
import { COURSES } from "@/constants/teacher"
import StatCard from "@/components/common/stat-card"

const STAT_CARDS = [
  {
    label: "Active Courses",
    value: "12",
  },
  {
    label: "Pending Courses",
    value: "3",
  },
  {
    label: "Draft Courses",
    value: "5",
  },
  {
    label: "Free Courses",
    value: "4",
  },
  {
    label: "Paid Courses",
    value: "8",
  },
]

const TABS = ["Publish", "Pending", "Draft", "Inactive"] as const

export default function TeacherCoursesPage() {
  const [activeTab, setActiveTab] =
    React.useState<(typeof TABS)[number]>("Publish")

  const filtered =
    activeTab === "Publish"
      ? COURSES
      : COURSES.filter((c) => c.status === activeTab)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">My Courses</h2>
        <Link
          href="/teacher/courses/add"
          className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
        >
          <Plus className="h-4 w-4" />
          Add New Course
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {STAT_CARDS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <MyCourseCard key={course.title} course={course} />
        ))}
      </div>

      {/* Pagination */}
      {filtered.length <= 0 ? (
        <p className="text-center text-sm text-[#9CA3AF]">
          No courses found in this category.
        </p>
      ) : (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                page === 1
                  ? "bg-[#4CC0D8] text-white"
                  : "border border-gray-200 text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
              )}
            >
              {page}
            </button>
          ))}
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
