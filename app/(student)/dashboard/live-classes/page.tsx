"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Users,
  Play,
  Eye,
  ChevronDown,
  ChevronUp,
  Upload,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const UPCOMING_CLASSES = [
  {
    title: "Biblical Stories for Kids",
    instructor: "Sarah Johnson",
    date: "Jun 22, 2026",
    time: "10:00 AM (45 min)",
    registered: 24,
    ageGroup: "5-12 years",
    ageColor: "#F59E0B",
  },
  {
    title: "Teen Discussion: Faith in Modern World",
    instructor: "Mark Williams",
    date: "Jun 23, 2026",
    time: "3:00 PM (60 min)",
    registered: 18,
    ageGroup: "13-18 years",
    ageColor: "#4CC0D8",
  },
  {
    title: "Young Adult Leadership Workshop",
    instructor: "Dr. Emily Chen",
    date: "Jun 24, 2026",
    time: "7:00 PM (90 min)",
    registered: 32,
    ageGroup: "19-25 years",
    ageColor: "#C776EA",
  },
]

const RECORDED_SESSIONS = [
  {
    title: "Understanding Prayer",
    instructor: "Rev. David Brown",
    duration: "52 min",
    views: "1,243",
    date: "Jun 15, 2026",
    thumbnail: "/assets/pngs/After Log in , Before Enrolled/all course/1.png",
    episodes: [
      {
        title: "Understanding Prayer",
        instructor: "Rev. David Brown",
        duration: "52 min",
        views: "1,243",
        date: "Jun 8, 2026",
      },
      {
        title: "Understanding Prayer",
        instructor: "Rev. David Brown",
        duration: "50 min",
        views: "987",
        date: "Jun 1, 2026",
      },
      {
        title: "Understanding Prayer",
        instructor: "Rev. David Brown",
        duration: "55 min",
        views: "1,102",
        date: "May 25, 2026",
      },
      {
        title: "Understanding Prayer",
        instructor: "Rev. David Brown",
        duration: "48 min",
        views: "876",
        date: "May 18, 2026",
      },
    ],
  },
  {
    title: "Understanding Prayer",
    instructor: "Rev. David Brown",
    duration: "52 min",
    views: "1,243",
    date: "Jun 15, 2026",
    thumbnail: "/assets/pngs/After Log in , Before Enrolled/all course/2.png",
    episodes: [],
  },
  {
    title: "Understanding Prayer",
    instructor: "Rev. David Brown",
    duration: "50 min",
    views: "1,243",
    date: "Jun 15, 2026",
    thumbnail: "/assets/pngs/After Log in , Before Enrolled/all course/3.png",
    episodes: [],
  },
]

export default function LiveClassesPage() {
  const [expandedSession, setExpandedSession] = useState<number | null>(0)

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {UPCOMING_CLASSES.map((cls) => (
            <Card
              key={cls.title}
              className="border-gray-100 shadow-none transition-shadow hover:shadow-md"
            >
              <CardContent className="space-y-4 p-5">
                <Badge
                  className="border-0 text-xs font-semibold text-white"
                  style={{ backgroundColor: cls.ageColor }}
                >
                  {cls.ageGroup}
                </Badge>
                <div>
                  <h3 className="text-sm font-bold text-[#1D1D1D]">
                    {cls.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    with {cls.instructor}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#666666]">
                    <Calendar className="h-3.5 w-3.5 text-[#9CA3AF]" />
                    {cls.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#666666]">
                    <Clock className="h-3.5 w-3.5 text-[#9CA3AF]" />
                    {cls.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#666666]">
                    <Users className="h-3.5 w-3.5 text-[#9CA3AF]" />
                    {cls.registered} registered
                  </div>
                </div>
                <button className="w-full rounded-lg bg-[#F59E0B] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#D97706]">
                  Reserve Spot
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recorded Sessions */}
      <section>
        <h2 className="mb-1 text-lg font-bold text-[#1D1D1D]">
          Recorded Sessions
        </h2>
        <p className="mb-6 text-sm text-[#9CA3AF]">
          Catch up on classes you missed
        </p>

        <div className="space-y-4">
          {RECORDED_SESSIONS.map((session, sessionIdx) => (
            <div key={sessionIdx} className="space-y-3">
              {/* Session Header */}
              <Card
                className={cn(
                  "cursor-pointer border-gray-100 shadow-none transition-shadow hover:shadow-md",
                  expandedSession === sessionIdx && "border-[#4CC0D8]/20"
                )}
                onClick={() =>
                  setExpandedSession(
                    expandedSession === sessionIdx ? null : sessionIdx
                  )
                }
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-200">
                    <Image
                      src={session.thumbnail}
                      alt={session.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[#1D1D1D]">
                      {session.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#9CA3AF]">
                      with {session.instructor}
                    </p>
                    <div className="mt-1 flex items-center gap-4">
                      <span className="flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                        <Clock className="h-3 w-3" /> {session.duration}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                        <Eye className="h-3 w-3" /> {session.views} views
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                        <Calendar className="h-3 w-3" /> {session.date}
                      </span>
                    </div>
                  </div>
                  {expandedSession === sessionIdx ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-[#9CA3AF]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#9CA3AF]" />
                  )}
                </CardContent>
              </Card>

              {/* Expanded Episodes */}
              {expandedSession === sessionIdx &&
                session.episodes.length > 0 && (
                  <div className="ml-6 space-y-2">
                    {session.episodes.map((ep, epIdx) => (
                      <Card key={epIdx} className="border-gray-100 shadow-none">
                        <CardContent className="flex items-center gap-3 p-3">
                          <div className="relative h-12 w-18 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                            <Image
                              src={session.thumbnail}
                              alt=""
                              width={72}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Play className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-[#1D1D1D]">
                              {ep.title}
                            </p>
                            <p className="text-[10px] text-[#9CA3AF]">
                              with {ep.instructor}
                            </p>
                            <div className="mt-0.5 flex items-center gap-3">
                              <span className="text-[10px] text-[#9CA3AF]">
                                {ep.duration}
                              </span>
                              <span className="text-[10px] text-[#9CA3AF]">
                                {ep.views} views
                              </span>
                              <span className="text-[10px] text-[#9CA3AF]">
                                {ep.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <button className="rounded-md bg-[#4CC0D8] px-3 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
                              Watch Now
                            </button>
                            <button className="rounded-md border border-gray-200 px-3 py-1 text-[10px] font-semibold text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
                              Assignment
                            </button>
                            <button className="rounded-md bg-[#F59E0B] px-3 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-[#D97706]">
                              Upload Assignment
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
