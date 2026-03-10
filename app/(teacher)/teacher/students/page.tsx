"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  MapPin,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STUDENTS = [
  {
    name: "Ronald Richard",
    slug: "ronald-richard",
    location: "Newyork",
    joinDate: "22 Aug 2025",
    courses: 10,
    image: "/assets/pngs/student.png",
  },
  {
    name: "Mona Nancy",
    slug: "mona-nancy",
    location: "Los Angeles",
    joinDate: "15 Jul 2025",
    courses: 8,
    image: "/assets/pngs/student.png",
  },
  {
    name: "Patrick Alleman",
    slug: "patrick-alleman",
    location: "Alabama",
    joinDate: "18 Jun 2025",
    courses: 12,
    image: "/assets/pngs/student.png",
  },
  {
    name: "Olive Paxson",
    slug: "olive-paxson",
    location: "Brisbane",
    joinDate: "03 May 2025",
    courses: 7,
    image: "/assets/pngs/student.png",
  },
  {
    name: "Chris Thomas",
    slug: "chris-thomas",
    location: "Newyork",
    joinDate: "14 Apr 2025",
    courses: 4,
    image: "/assets/pngs/student.png",
  },
  {
    name: "Joyce Perron",
    slug: "joyce-perron",
    location: "Ontario",
    joinDate: "17 Mar 2025",
    courses: 6,
    image: "/assets/pngs/student.png",
  },
]

export default function TeacherStudentsPage() {
  const [search, setSearch] = React.useState("")

  const filtered = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">Students</h2>
        <div className="relative w-56">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((student) => (
          <Link key={student.slug} href={`/teacher/students/${student.slug}`}>
            <Card className="overflow-hidden border-gray-100 p-0 shadow-none transition-shadow hover:shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={student.image}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-[#1D1D1D]">
                  {student.name}
                </h3>
                <div className="mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#4CC0D8]" />
                  <span className="text-xs text-[#4CC0D8]">
                    {student.location}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-[#666666]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#F59E0B]" />
                    <span>{student.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-[#F59E0B]" />
                    <span>
                      {student.courses.toString().padStart(2, "0")} Courses
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-[#9CA3AF]">Page 1 of 2</p>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                page === 1
                  ? "bg-[#F59E0B] text-white"
                  : "border border-gray-200 text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
              )}
            >
              {page}
            </button>
          ))}
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#9CA3AF] hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
