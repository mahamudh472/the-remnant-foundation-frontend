"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Users,
  GraduationCap,
  MoreVertical,
  Star,
} from "lucide-react"

const STATS = [
  {
    label: "Enrolled Courses",
    value: 957,
    icon: BookOpen,
    color: "#4CC0D8",
    bg: "#EBF7F9",
  },
  {
    label: "Active Courses",
    value: 19,
    icon: PlayCircle,
    color: "#F59E0B",
    bg: "#FFF5E0",
  },
  {
    label: "Completed Courses",
    value: 79,
    icon: CheckCircle2,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Total Students",
    value: 241,
    icon: Users,
    color: "#8B5CF6",
    bg: "#F3EEFF",
  },
  {
    label: "Total Courses",
    value: 72,
    icon: GraduationCap,
    color: "#EC4899",
    bg: "#FFF0F7",
  },
]

const POPULAR_COURSES = [
  {
    title: "Exploring the Bible: An Introduction",
    instructor: "Sarah Williams",
    rating: 4.5,
    reviews: 451,
    price: 50.0,
    image: "/assets/pngs/For web/course-1.png",
    tag: "Featured",
  },
  {
    title: "Faith and Modern Science",
    instructor: "Dr. James Carter",
    rating: 4.7,
    reviews: 320,
    price: 65.0,
    image: "/assets/pngs/For web/course-2.png",
    tag: "Best Seller",
  },
  {
    title: "Christian Ethics in Today's World",
    instructor: "Pastor David Lee",
    rating: 4.3,
    reviews: 289,
    price: 45.0,
    image: "/assets/pngs/For web/course-3.png",
    tag: "New",
  },
  {
    title: "History of the Reformation",
    instructor: "Prof. Mary Johnson",
    rating: 4.6,
    reviews: 198,
    price: 55.0,
    image: "/assets/pngs/For web/course-4.png",
    tag: "Featured",
  },
]

const RECENT_COURSES = [
  {
    title: "Exploring The Bible",
    category: "Bible Studies",
    lessons: 22,
    enrolled: 50,
    status: "Published",
  },
  {
    title: "Faith and Modern Science",
    category: "Theology",
    lessons: 18,
    enrolled: 35,
    status: "Published",
  },
  {
    title: "Christian Ethics",
    category: "Ethics",
    lessons: 15,
    enrolled: 0,
    status: "Pending",
  },
  {
    title: "History of the Reformation",
    category: "History",
    lessons: 20,
    enrolled: 42,
    status: "Published",
  },
  {
    title: "Worship & Praise",
    category: "Music",
    lessons: 10,
    enrolled: 0,
    status: "Draft",
  },
]

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_COURSES.map((course) => (
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
                <span className="absolute top-2 left-2 rounded bg-[#4CC0D8] px-2 py-0.5 text-xs font-semibold text-white">
                  {course.tag}
                </span>
              </div>
              <CardContent className="space-y-2 p-4">
                <h3 className="line-clamp-2 text-sm font-bold text-[#1D1D1D]">
                  {course.title}
                </h3>
                <p className="text-xs text-[#9CA3AF]">{course.instructor}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-xs font-medium text-[#1D1D1D]">
                    {course.rating}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">
                    ({course.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-[#4CC0D8]">
                    ${course.price.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
                      Re-Edit
                    </button>
                    <button className="rounded-lg bg-[#4CC0D8] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#3AB0C8]">
                      Watch Now
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
                {RECENT_COURSES.map((course) => (
                  <tr
                    key={course.title}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-[#1D1D1D]">
                      {course.title}
                    </td>
                    <td className="px-4 py-3 text-[#666666]">
                      {course.category}
                    </td>
                    <td className="px-4 py-3 text-[#666666]">
                      {course.lessons}
                    </td>
                    <td className="px-4 py-3 text-[#666666]">
                      {course.enrolled}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          course.status === "Published"
                            ? "bg-emerald-50 text-emerald-600"
                            : course.status === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-gray-100 text-gray-500"
                        }`}
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
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
