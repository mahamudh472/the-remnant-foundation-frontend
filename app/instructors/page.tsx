"use client"

import React, { useEffect, useState, type SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Filter,
  Check,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useTeachersQuery } from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import TeacherCard from "@/components/common/teacher-card"

const CATEGORIES = [
  { name: "All Instructor", count: 0 },
  { name: "CSS", count: 2 },
  { name: "Frontend", count: 2 },
  { name: "General", count: 2 },
  { name: "IT & Software", count: 2 },
  { name: "Photography", count: 2 },
  { name: "Programming Language", count: 3 },
  { name: "Technology", count: 2 },
]

export default function InstructorsPage() {
  const [activeCategory, setActiveCategory] = useState("All Instructor")
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [sortFilter, setSortFilter] = useState<"newest" | "oldest" | "top">(
    "newest"
  )
  const debouncedSearch = useDebounce(search, 500)
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useTeachersQuery({
    page,
    page_size: 9,
    search: debouncedSearch || undefined,
    filter: sortFilter,
  })

//   useEffect(() => {
//    if(data?.next) {
//       queryClient.prefetchQuery({
//          queryKey: ["teachers", "list", { page: page + 1, page_size: 9, search: debouncedSearch || undefined, filter: sortFilter }],
//          queryFn: () => fetch(data.next).then(res => res.json())
//       })
//    }
//   })

  const instructors = data?.results || []
  const totalCount = data?.count || 0
  const totalPages = Math.ceil(totalCount / 9)

  const clearFilters = () => {
    setActiveCategory("All Instructor")
    setSortFilter("newest")
    setSearch("")
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="bg-[#F1F7F9] py-16">
          <div className="mx-auto max-w-7xl space-y-4 px-4 text-center">
            <h1 className="text-4xl font-bold text-[#1D1D1D] md:text-5xl">
              All Instructor
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Link href="/" className="text-[#666666]">
                Home
              </Link>
              <span className="h-[2px] w-4 bg-[#FF9D00]" />
              <span className="text-[#1D1D1D]">Instructor Grid</span>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Sidebar Filters */}
              <div className="w-full shrink-0 space-y-10 lg:w-64">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-[#1D1D1D]">
                    <Filter className="h-5 w-5" /> Filters
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm font-bold text-[#FF9D00]"
                  >
                    Clear
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1D1D1D]">Categories</h3>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="space-y-3">
                    {CATEGORIES.map((cat) => (
                      <label
                        key={cat.name}
                        className="group flex cursor-pointer items-center gap-3"
                      >
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded border transition-all",
                            activeCategory === cat.name
                              ? "border-[#4CC0D8] bg-[#4CC0D8]"
                              : "border-gray-200 group-hover:border-[#4CC0D8]"
                          )}
                        >
                          {activeCategory === cat.name && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors",
                            activeCategory === cat.name
                              ? "text-[#1D1D1D]"
                              : "text-[#666666] group-hover:text-[#4CC0D8]"
                          )}
                        >
                          {cat.name} {cat.count > 0 && `(${cat.count})`}
                        </span>
                      </label>
                    ))}
                    <button className="pt-2 text-xs font-bold text-[#4CC0D8]">
                      See More
                    </button>
                  </div>
                </div>

                {/* Instructors Mock */}
                <div className="space-y-6 border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1D1D1D]">Instructors</h3>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="space-y-3">
                    {[
                      "Keny White",
                      "Hinata Hyuga",
                      "John Doe",
                      "Nicole Brown",
                    ].map((name) => (
                      <label
                        key={name}
                        className="group flex cursor-pointer items-center gap-3"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded border border-gray-200" />
                        <span className="text-sm font-medium text-[#666666]">
                          {name} (10)
                        </span>
                      </label>
                    ))}
                    <button className="pt-2 text-xs font-bold text-[#4CC0D8]">
                      See More
                    </button>
                  </div>
                </div>

                {/* Level Mock */}
                <div className="space-y-6 border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1D1D1D]">Level</h3>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="space-y-3">
                    {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                      (level) => (
                        <label
                          key={level}
                          className="group flex cursor-pointer items-center gap-3"
                        >
                          <div className="flex h-5 w-5 items-center justify-center rounded border border-gray-200" />
                          <span className="text-sm font-medium text-[#666666]">
                            {level} (10)
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Grid Content */}
              <div className="flex-1 space-y-8">
                {/* Controls */}
                <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-50 pb-6 md:flex-row">
                  <p className="text-sm font-medium text-[#666666]">
                    {isLoading
                      ? "Loading..."
                      : `Showing ${instructors.length > 0 ? (page - 1) * 9 + 1 : 0}-${Math.min(page * 9, totalCount)} of ${totalCount} results`}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex overflow-hidden rounded-lg border border-gray-100">
                      <button
                        onClick={() => setViewType("grid")}
                        className={cn(
                          "p-2 transition-colors",
                          viewType === "grid"
                            ? "bg-[#4CC0D8] text-white"
                            : "bg-white text-[#666666] hover:bg-gray-50"
                        )}
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewType("list")}
                        className={cn(
                          "p-2 transition-colors",
                          viewType === "list"
                            ? "bg-[#4CC0D8] text-white"
                            : "bg-white text-[#666666] hover:bg-gray-50"
                        )}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                    <select
                      className="h-10 rounded-lg border border-gray-200 px-4 text-sm font-medium focus:ring-1 focus:ring-[#4CC0D8] focus:outline-none"
                      value={sortFilter}
                      onChange={(e) => {
                        setSortFilter(
                          e.target.value as "newest" | "oldest" | "top"
                        )
                        setPage(1)
                      }}
                    >
                      <option value="newest">Newly Published</option>
                      <option value="oldest">Oldest</option>
                      <option value="top">Top Rated</option>
                    </select>
                    <div className="relative">
                      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                      <input
                        type="text"
                        placeholder="Search instructors..."
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value)
                          setPage(1)
                        }}
                        className="h-10 rounded-lg border border-gray-200 pr-4 pl-10 text-sm focus:ring-1 focus:ring-[#4CC0D8] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Instructor Grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                      <div
                        key={skeleton}
                        className="h-80 animate-pulse rounded-2xl bg-gray-100"
                      />
                    ))}
                  </div>
                ) : isError ? (
                  <div className="py-20 text-center text-red-500">
                    {getApiErrorMessage(
                      error,
                      "Failed to load teachers. Please try again."
                    )}
                  </div>
                ) : instructors.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">
                    No instructors found matching your criteria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {instructors.map((inst) => (
                        <TeacherCard key={inst.id} {...inst} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 pt-12">
                    <button
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-[#666666] hover:border-[#4CC0D8] disabled:opacity-50 disabled:hover:border-gray-100"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= page - 1 && pageNumber <= page + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                              page === pageNumber
                                ? "bg-[#FF9D00] text-white"
                                : "bg-[#f8f9fc] text-[#666666] hover:bg-gray-100"
                            )}
                          >
                            {pageNumber}
                          </button>
                        )
                      }

                      if (
                        (pageNumber === page - 2 && page > 3) ||
                        (pageNumber === page + 2 && page < totalPages - 2)
                      ) {
                        return (
                          <span
                            key={pageNumber}
                            className="flex w-4 items-end justify-center text-gray-400"
                          >
                            ...
                          </span>
                        )
                      }

                      return null
                    })}

                    <button
                      onClick={() =>
                        setPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={page === totalPages}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-[#666666] hover:border-[#4CC0D8] disabled:opacity-50 disabled:hover:border-gray-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function BookOpenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
