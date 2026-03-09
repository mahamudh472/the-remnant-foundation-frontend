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

const STAT_CARDS = [
  {
    label: "Active Courses",
    value: 12,
    icon: BookOpen,
    color: "#4CC0D8",
    bg: "#EBF7F9",
  },
  {
    label: "Pending Courses",
    value: 3,
    icon: Clock,
    color: "#F59E0B",
    bg: "#FFF5E0",
  },
  {
    label: "Draft Courses",
    value: 5,
    icon: FileText,
    color: "#8B5CF6",
    bg: "#F3EEFF",
  },
  {
    label: "Free Courses",
    value: 4,
    icon: Gift,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Paid Courses",
    value: 8,
    icon: DollarSign,
    color: "#EC4899",
    bg: "#FFF0F7",
  },
]

const TABS = ["Publish", "Pending", "Draft", "Inactive"] as const

const COURSES = [
  {
    title: "Exploring the Bible: An Introduction",
    instructor: "MosabbiR",
    rating: 4.5,
    reviews: 451,
    price: 50.0,
    image: "/assets/pngs/For web/course-1.png",
    status: "Publish" as const,
  },
  {
    title: "Faith and Modern Science",
    instructor: "MosabbiR",
    rating: 4.7,
    reviews: 320,
    price: 65.0,
    image: "/assets/pngs/For web/course-2.png",
    status: "Publish" as const,
  },
  {
    title: "Christian Ethics in Today's World",
    instructor: "MosabbiR",
    rating: 4.3,
    reviews: 289,
    price: 45.0,
    image: "/assets/pngs/For web/course-3.png",
    status: "Pending" as const,
  },
  {
    title: "History of the Reformation",
    instructor: "MosabbiR",
    rating: 4.6,
    reviews: 198,
    price: 55.0,
    image: "/assets/pngs/For web/course-4.png",
    status: "Publish" as const,
  },
  {
    title: "Youth Ministry Essentials",
    instructor: "MosabbiR",
    rating: 0,
    reviews: 0,
    price: 0,
    image: "/assets/pngs/For web/course-1.png",
    status: "Draft" as const,
  },
  {
    title: "Worship & Praise Leadership",
    instructor: "MosabbiR",
    rating: 4.1,
    reviews: 150,
    price: 35.0,
    image: "/assets/pngs/For web/course-2.png",
    status: "Publish" as const,
  },
  {
    title: "Advanced Hermeneutics",
    instructor: "MosabbiR",
    rating: 0,
    reviews: 0,
    price: 40.0,
    image: "/assets/pngs/For web/course-3.png",
    status: "Pending" as const,
  },
  {
    title: "Church Leadership Foundations",
    instructor: "MosabbiR",
    rating: 4.4,
    reviews: 220,
    price: 60.0,
    image: "/assets/pngs/For web/course-4.png",
    status: "Inactive" as const,
  },
]

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
          <Card key={stat.label} className="border-gray-100 py-0 shadow-none">
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-lg font-bold text-[#1D1D1D]">{stat.value}</p>
                <p className="text-xs text-[#9CA3AF]">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
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
          <Card
            key={course.title}
            className="group overflow-hidden border-gray-100 p-0 shadow-none"
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="space-y-2 p-4">
              <h3 className="line-clamp-2 text-sm font-bold text-[#1D1D1D]">
                {course.title}
              </h3>
              <p className="text-xs text-[#9CA3AF]">by {course.instructor}</p>
              {course.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-xs font-medium text-[#1D1D1D]">
                    {course.rating}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">
                    ({course.reviews})
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-bold text-[#4CC0D8]">
                  {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
                </span>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  )
}
