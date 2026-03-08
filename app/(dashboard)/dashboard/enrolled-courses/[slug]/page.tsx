"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, ChevronDown, ChevronUp, Clock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const MODULES = [
  {
    title: "Preparing for Marriage",
    subtitle: "Number of Lessons : 06",
    lessons: [
      {
        title: "Preparing for Marriage | Lesson 1",
        duration: "3:12",
        progress: 28,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Lesson 2",
        duration: "5:45",
        progress: 28,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Lesson 3",
        duration: "4:30",
        progress: 28,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Lesson 4",
        duration: "6:15",
        progress: 28,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Lesson 5",
        duration: "3:50",
        progress: 28,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Lesson 6",
        duration: "7:20",
        progress: 28,
        completed: false,
      },
    ],
  },
  {
    title: "Preparing for Marriage",
    subtitle: "Number of Quizzes : 05",
    lessons: [
      {
        title: "Preparing for Marriage | Module 1",
        duration: "3:12",
        progress: 0,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Module 1",
        duration: "5:22",
        progress: 0,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Module 1",
        duration: "4:15",
        progress: 0,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Module 1",
        duration: "6:30",
        progress: 0,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Module 1",
        duration: "3:45",
        progress: 0,
        completed: false,
      },
      {
        title: "Preparing for Marriage | Module 1",
        duration: "7:10",
        progress: 0,
        completed: false,
      },
    ],
  },
]

export default function CoursePlayerPage() {
  const [activeTab, setActiveTab] = useState<"description" | "review">(
    "description"
  )
  const [expandedModule, setExpandedModule] = useState(0)

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
          {/* Video Player */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900">
            <Image
              src="/assets/pngs/After Log in , Before Enrolled/all course/1.png"
              alt="Course Video"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-colors hover:bg-white">
                <Play className="ml-1 h-7 w-7 text-[#4CC0D8]" />
              </button>
            </div>
            {/* Video progress bar */}
            <div className="absolute right-0 bottom-0 left-0 h-1 bg-white/20">
              <div className="h-full w-1/3 bg-[#4CC0D8]" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-[#1D1D1D]">
            Preparing for Marriage | Episode 2
          </h2>

          {/* Description / Review Tabs */}
          <div className="flex gap-6 border-b border-gray-100">
            {(["description", "review"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "border-b-2 pb-3 text-sm font-semibold capitalize transition-colors",
                  activeTab === tab
                    ? "border-[#4CC0D8] text-[#1D1D1D]"
                    : "border-transparent text-[#9CA3AF] hover:text-[#666666]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" ? (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#1D1D1D]">
                Course descriptions
              </h3>
              <p className="text-sm leading-relaxed text-[#666666]">
                Vue (pronounced /vjuː/, like view) is a progressive framework
                for building user interfaces. Unlike other monolithic
                frameworks, Vue is designed from the ground up to be
                incrementally adoptable. The core library is focused on the view
                layer only, and is easy to pick up and integrate with other
                libraries or existing projects. On the other hand, Vue is also
                perfectly capable of powering sophisticated Single-Page
                Applications when used in combination with modern tooling and
                supporting libraries.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#666666]">No reviews yet.</p>
            </div>
          )}
        </div>

        {/* Course Playlists Sidebar */}
        <div className="w-full shrink-0 xl:w-80">
          <Card className="sticky top-24 border-gray-100 shadow-none">
            <CardContent className="p-5">
              <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
                Course Playlists
              </h3>
              <div className="space-y-4">
                {MODULES.map((module, moduleIdx) => (
                  <div key={moduleIdx} className="space-y-2">
                    {/* Module lessons */}
                    {module.lessons.map((lesson, lessonIdx) => (
                      <div
                        key={lessonIdx}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-colors",
                          lessonIdx === 0 && moduleIdx === 0
                            ? "bg-[#EBF7F9]"
                            : "hover:bg-[#F8F9FC]"
                        )}
                      >
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                          <Image
                            src="/assets/pngs/After Log in , Before Enrolled/all course/1.png"
                            alt=""
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-[#1D1D1D]">
                            {lesson.title}
                          </p>
                          <p className="text-[10px] text-[#9CA3AF]">
                            {lesson.duration}
                          </p>
                        </div>
                        {lesson.progress > 0 ? (
                          <Badge className="shrink-0 border-0 bg-[#4CC0D8]/10 text-[10px] text-[#4CC0D8]">
                            {lesson.progress}%
                          </Badge>
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
                        )}
                      </div>
                    ))}

                    {/* Module header (between sections) */}
                    {moduleIdx < MODULES.length - 1 && (
                      <div className="pt-3 pb-1">
                        <p className="text-xs font-bold text-[#1D1D1D]">
                          {MODULES[moduleIdx + 1].title}
                        </p>
                        <p className="text-[10px] text-[#9CA3AF]">
                          {MODULES[moduleIdx + 1].subtitle}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
