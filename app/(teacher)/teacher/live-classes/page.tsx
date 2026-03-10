"use client"

import Link from "next/link"
import { Plus, Video, Clock, Users, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import StatCard from "@/components/common/stat-card"

type ClassStatus = "Upcoming" | "Live" | "Completed" | "Cancelled"

interface LiveClass {
  id: string
  title: string
  course: string
  grade: string
  date: string
  time: string
  duration: string
  students: number
  platform: string
  status: ClassStatus
}

const STATUS_STYLE: Record<ClassStatus, string> = {
  Upcoming: "bg-[#EBF7F9] text-[#4CC0D8]",
  Live: "bg-green-100 text-green-600",
  Completed: "bg-gray-100 text-gray-500",
  Cancelled: "bg-red-100 text-red-500",
}

const CLASSES: LiveClass[] = [
  {
    id: "1",
    title: "Introduction to Old Testament: Genesis",
    course: "Old Testament Stories",
    grade: "Children (6–12)",
    date: "2026-03-15",
    time: "10:00 AM",
    duration: "60 minutes",
    students: 18,
    platform: "Zoom",
    status: "Upcoming",
  },
  {
    id: "2",
    title: "Prayer & Fasting — Session 3",
    course: "Foundation of Faith",
    grade: "Adults (18+)",
    date: "2026-03-12",
    time: "7:00 PM",
    duration: "45 minutes",
    students: 24,
    platform: "Zoom",
    status: "Upcoming",
  },
  {
    id: "3",
    title: "New Testament Basics — Week 2",
    course: "New Testament Basics",
    grade: "Teen (14–18)",
    date: "2026-03-10",
    time: "5:00 PM",
    duration: "30 minutes",
    students: 12,
    platform: "Zoom",
    status: "Completed",
  },
  {
    id: "4",
    title: "Christian Values Q&A",
    course: "Christian Values",
    grade: "Kids (5–10)",
    date: "2026-03-08",
    time: "11:00 AM",
    duration: "30 minutes",
    students: 9,
    platform: "Zoom",
    status: "Completed",
  },
]

export default function LiveClassesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1D1D1D]">Live Classes</h2>
          <p className="mt-0.5 text-sm text-[#9CA3AF]">
            Schedule and manage your live teaching sessions
          </p>
        </div>
        <Link
          href="/teacher/live-classes/create"
          className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
        >
          <Plus className="h-4 w-4" />
          Create Live Class
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Classes", value: CLASSES.length, color: "#4CC0D8" },
          {
            label: "Upcoming",
            value: CLASSES.filter((c) => c.status === "Upcoming").length,
            color: "#4CC0D8",
          },
          {
            label: "Completed",
            value: CLASSES.filter((c) => c.status === "Completed").length,
            color: "#666666",
          },
          {
            label: "Total Students",
            value: CLASSES.reduce((s, c) => s + c.students, 0),
            color: "#F59E0B",
          },
        ].map((stat) => (
            <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Class cards */}
      <div className="space-y-4">
        {CLASSES.map((cls) => (
          <Card key={cls.id} className="border-gray-100 shadow-none">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF7F9]">
                    <Video className="h-5 w-5 text-[#4CC0D8]" />
                  </div>
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[#1D1D1D]">
                        {cls.title}
                      </p>
                      <Badge className={`text-xs ${STATUS_STYLE[cls.status]}`}>
                        {cls.status}
                      </Badge>
                    </div>
                    <p className="mb-3 text-sm text-[#9CA3AF]">
                      {cls.course} · {cls.grade}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#666666]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#4CC0D8]" />
                        {cls.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#4CC0D8]" />
                        {cls.time} · {cls.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-[#4CC0D8]" />
                        {cls.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="h-3.5 w-3.5 text-[#4CC0D8]" />
                        {cls.platform}
                      </span>
                    </div>
                  </div>
                </div>
                {cls.status === "Upcoming" && (
                  <Link
                    href={`/teacher/live-classes/create`}
                    className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#666666] transition-colors hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
