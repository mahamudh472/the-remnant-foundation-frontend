"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  ArrowRight,
  Play,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useStudentWishlistQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"

export default function WishlistPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError, error } = useStudentWishlistQuery()

  const wishlist = data || []
  const pageSize = 9
  const totalPages = Math.ceil(wishlist.length / pageSize)
  const paginatedCourses = wishlist.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">Wishlist&apos;s</h2>

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="h-80 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="py-16 text-center text-red-500">
          {getApiErrorMessage(error, "Failed to load wishlist.")}
        </div>
      ) : paginatedCourses.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCourses.map((course, index) => (
            <Card
              key={`${course.course_id}-${course.added_at}`}
              className="group overflow-hidden border-gray-100 shadow-none transition-shadow hover:shadow-md"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={
                    course.course_thumbnail ||
                    "/assets/pngs/web course image.png"
                  }
                  alt={course.course_title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
                {index === 0 && (
                  <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F59E0B]">
                    <Star className="h-4 w-4 fill-white text-white" />
                  </div>
                )}
                <button className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <Play className="ml-0.5 h-4 w-4 text-[#4CC0D8]" />
                </button>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src={
                          course.teacher_avatar || "/assets/pngs/Profile.png"
                        }
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 object-cover"
                      />
                    </div>
                    <span className="text-xs text-[#666666]">
                      {course.teacher_name}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="border-0 bg-[#F8F9FC] text-[10px] font-medium text-[#666666]"
                  >
                    {course.category_name}
                  </Badge>
                </div>
                <h3 className="mb-2 text-sm font-bold text-[#1D1D1D]">
                  {course.course_title}
                </h3>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs text-[#9CA3AF]">
                    Program: {course.program_name}
                  </p>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
                    <ShoppingCart className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Link
                  href={`/courses/${course.course_id}`}
                  className="inline-flex items-center gap-1 rounded-md bg-[#4CC0D8] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
                >
                  Start Now <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-[#9CA3AF]">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "h-9 w-9 rounded-lg text-sm font-semibold transition-colors",
                  currentPage === page
                    ? "bg-[#4CC0D8] text-white"
                    : "border border-gray-200 text-[#666666] hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#9CA3AF] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
