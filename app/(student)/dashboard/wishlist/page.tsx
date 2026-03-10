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

const COURSES = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: [
    "Healthy Lifestyle & Habits",
    "Faith & Career Direction",
    "Preparing for Marriage",
  ][i % 3],
  instructor: ["Rafael Miller", "Nancy Duarte", "James Kagan"][i % 3],
  category: ["Finance & Life", "Faith & Purpose", "Relationships"][i % 3],
  rating: 4.8,
  reviews: 110,
  image: `/assets/pngs/After Log in , Before Enrolled/all course/${(i % 3) + 1}.png`,
  featured: i % 3 === 0,
}))

export default function WishlistPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">Wishlist&apos;s</h2>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course) => (
          <Card
            key={course.id}
            className="group overflow-hidden border-gray-100 shadow-none transition-shadow hover:shadow-md"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10" />
              {course.featured && (
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
                      src="/assets/pngs/Profile.png"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-xs text-[#666666]">
                    {course.instructor}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="border-0 bg-[#F8F9FC] text-[10px] font-medium text-[#666666]"
                >
                  {course.category}
                </Badge>
              </div>
              <h3 className="mb-2 text-sm font-bold text-[#1D1D1D]">
                {course.title}
              </h3>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-xs font-semibold text-[#1D1D1D]">
                    {course.rating}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">
                    ({course.reviews} Reviews)
                  </span>
                </div>
                <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
                  <ShoppingCart className="h-3.5 w-3.5" />
                </button>
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-1 rounded-md bg-[#4CC0D8] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
              >
                Start Now <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  )
}
