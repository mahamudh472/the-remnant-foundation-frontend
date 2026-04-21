"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Search,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Filter,
  Check,
  ChevronDown,
  BookOpen,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCoursesQuery } from "@/hooks/api/use-courses"
import { useDebounce } from "@/hooks/use-debounce"
import CourseCard from "@/components/common/course-card"
import { Separator } from "@/components/ui/separator"

const CATEGORIES = [
  { id: "1", name: "Spiritual" },
  { id: "2", name: "Foundations of Faith" },
  { id: "3", name: "Bible Study" },
  { id: "4", name: "Spiritual Growth" },
  { id: "5", name: "Discipleship" },
  { id: "6", name: "Christian Living" },
  { id: "7", name: "Kids" },
]

const TEACHERS = [
  { id: "1", name: "Teacher One", count: 10 },
  { id: "2", name: "Hinata Hyuga", count: 5 },
  { id: "3", name: "John Doe", count: 3 },
  { id: "4", name: "Nicole Brown", count: 0 },
]

const PRICE_TYPES = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
]

export default function CoursesPage() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  // Filters State
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [priceType, setPriceType] = useState<"all" | "free" | "paid">("all")
  const [minRating, setMinRating] = useState<number | null>(null)
  const [ordering, setOrdering] = useState<"newest" | "oldest" | "top">("newest")

  const { data, isLoading, isError } = useCoursesQuery({
    page,
    page_size: 1,
    search: debouncedSearch || undefined,
    category: selectedCategories.length > 0 ? selectedCategories.join(",") : undefined,
    teacher: selectedTeachers.length > 0 ? selectedTeachers.join(",") : undefined,
    price_type: priceType,
    min_rating: minRating || undefined,
    ordering,
  })

  const courses = data?.results || []
  const totalCount = data?.count || 0
  const totalPages = Math.ceil(totalCount / 9)

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
    setPage(1)
  }

  const toggleTeacher = (id: string) => {
    setSelectedTeachers(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
    setPage(1)
  }

  const handlePriceTypeChange = (val: "all" | "free" | "paid") => {
    setPriceType(val)
    setPage(1)
  }

  const handleRatingChange = (val: number) => {
    setMinRating(prev => prev === val ? null : val)
    setPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTeachers([])
    setPriceType("all")
    setMinRating(null)
    setSearch("")
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left Sidebar: Filters */}
              <div className="w-full lg:w-64 space-y-10 shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#1D1D1D] flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filters
                  </h2>
                  <button onClick={clearFilters} className="text-sm font-bold text-[#FF9D00]">Clear</button>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1D1D1D]">Categories</h3>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="space-y-3">
                    {CATEGORIES.map((cat) => {
                      const isChecked = selectedCategories.includes(cat.id)
                      return (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
                            onChange={() => toggleCategory(cat.id)}
                          />
                          <div className={cn(
                            "h-5 w-5 rounded border flex items-center justify-center transition-all",
                            isChecked ? "bg-[#4CC0D8] border-[#4CC0D8]" : "border-gray-200 group-hover:border-[#4CC0D8]"
                          )}>
                            {isChecked && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className={cn(
                            "text-sm font-medium transition-colors",
                            isChecked ? "text-[#1D1D1D]" : "text-[#666666] group-hover:text-[#4CC0D8]"
                          )}>
                            {cat.name}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Instructors Filter */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Instructors</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {TEACHERS.map((inst) => {
                        const isChecked = selectedTeachers.includes(inst.id)
                        return (
                          <label key={inst.id} className="flex items-center gap-3 cursor-pointer group">
                             <input
                               type="checkbox"
                               className="hidden"
                               checked={isChecked}
                               onChange={() => toggleTeacher(inst.id)}
                             />
                             <div className={cn(
                               "h-5 w-5 rounded border flex items-center justify-center transition-all",
                               isChecked ? "bg-[#4CC0D8] border-[#4CC0D8]" : "border-gray-200 group-hover:border-[#4CC0D8]"
                             )}>
                               {isChecked && <Check className="h-3 w-3 text-white" />}
                             </div>
                             <span className="text-sm font-medium text-[#666666]">{inst.name} ({inst.count})</span>
                          </label>
                        )
                      })}
                   </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Price</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {PRICE_TYPES.map((p) => {
                        const isChecked = priceType === p.value
                        return (
                          <label key={p.value} className="flex items-center gap-3 cursor-pointer group">
                             <input
                               type="radio"
                               name="price"
                               className="hidden"
                               checked={isChecked}
                               onChange={() => handlePriceTypeChange(p.value as "all" | "free" | "paid")}
                             />
                             <div className={cn(
                               "h-5 w-5 rounded-full border flex items-center justify-center transition-all",
                               isChecked ? "border-[#4CC0D8]" : "border-gray-200 group-hover:border-[#4CC0D8]"
                             )}>
                               {isChecked && <div className="h-2.5 w-2.5 rounded-full bg-[#4CC0D8]" />}
                             </div>
                             <span className="text-sm font-medium text-[#666666]">{p.label}</span>
                          </label>
                        )
                      })}
                   </div>
                </div>

                {/* Reviews Filter */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Reviews</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const isChecked = minRating === star
                        return (
                          <label key={star} className="flex items-center gap-3 cursor-pointer group">
                             <input
                               type="checkbox"
                               className="hidden"
                               checked={isChecked}
                               onChange={() => handleRatingChange(star)}
                             />
                             <div className={cn(
                               "h-5 w-5 rounded border flex items-center justify-center transition-all",
                               isChecked ? "bg-[#4CC0D8] border-[#4CC0D8]" : "border-gray-200 group-hover:border-[#4CC0D8]"
                             )}>
                               {isChecked && <Check className="h-3 w-3 text-white" />}
                             </div>
                             <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={cn("h-3 w-3", i < star ? "text-[#FF9D00] fill-current" : "text-gray-200")} />
                                ))}
                             </div>
                          </label>
                        )
                      })}
                   </div>
                </div>
              </div>

              {/* <Separator orientation="vertical" className="hidden lg:block" /> */}

              {/* Course Grid Area */}
              <div className="flex-1 space-y-8">
                 {/* Top Controls */}
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-50">
                    <p className="text-sm font-medium text-[#666666]">
                      {isLoading ? (
                        "Loading..."
                      ) : (
                        `Showing ${courses.length > 0 ? (page - 1) * 9 + 1 : 0}-${Math.min(page * 9, totalCount)} of ${totalCount} results`
                      )}
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="flex border border-gray-100 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setViewType("grid")}
                            className={cn("p-2 transition-colors", viewType === "grid" ? "bg-[#4CC0D8] text-white" : "bg-white text-[#666666] hover:bg-gray-50")}
                          >
                             <Grid className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setViewType("list")}
                            className={cn("p-2 transition-colors", viewType === "list" ? "bg-[#4CC0D8] text-white" : "bg-white text-[#666666] hover:bg-gray-50")}
                          >
                             <List className="h-4 w-4" />
                          </button>
                       </div>
                       <select
                         className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] appearance-none cursor-pointer"
                         value={ordering}
                         onChange={(e) => {
                           setOrdering(e.target.value as "newest" | "oldest" | "top")
                           setPage(1)
                         }}
                       >
                          <option value="newest">Newly Published</option>
                          <option value="oldest">Oldest</option>
                          <option value="top">Top Rated</option>
                       </select>
                       <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                          <input
                            type="text"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value)
                              setPage(1)
                            }}
                            className="h-10 pl-10 pr-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#4CC0D8]"
                          />
                       </div>
                    </div>
                 </div>

                 {/* Course Grid */}
                 {isLoading ? (
                   <div className={cn("grid gap-6", viewType === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                     {[1, 2, 3, 4, 5, 6].map(i => (
                       <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-80"></div>
                     ))}
                   </div>
                 ) : isError ? (
                   <div className="py-20 text-center text-red-500">Failed to load courses. Please try again.</div>
                 ) : courses.length === 0 ? (
                   <div className="py-20 text-center text-gray-500">No courses found matching your criteria.</div>
                 ) : (
                   <div className={cn("grid gap-6", viewType === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                      {courses.map((course) => (
                           <CourseCard key={course.id} {...course} viewType={viewType} />
                      ))}
                   </div>
                 )}

                 {/* Pagination */}
                 {totalPages > 1 && (
                   <div className="pt-12 flex items-center justify-between border-t border-gray-100">
                      <p className="text-sm font-medium text-[#666666]">Page {page} of {totalPages}</p>
                      <div className="flex gap-2">
                         <button
                           onClick={() => setPage(p => Math.max(1, p - 1))}
                           disabled={page === 1}
                           className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 text-[#666666] hover:border-[#4CC0D8] disabled:opacity-50 disabled:hover:border-gray-100"
                         >
                            <ChevronLeft className="h-4 w-4" />
                         </button>

                         {[...Array(totalPages)].map((_, idx) => {
                           const pageNum = idx + 1
                           // Simple pagination display logic to prevent too many buttons
                           if (
                             pageNum === 1 ||
                             pageNum === totalPages ||
                             (pageNum >= page - 1 && pageNum <= page + 1)
                           ) {
                             return (
                               <button
                                 key={pageNum}
                                 onClick={() => setPage(pageNum)}
                                 className={cn(
                                   "h-10 w-10 flex items-center justify-center rounded-full font-bold text-sm transition-colors",
                                   page === pageNum
                                     ? "bg-[#FF9D00] text-white"
                                     : "bg-[#f8f9fc] text-[#666666] hover:bg-gray-100"
                                 )}
                               >
                                 {pageNum}
                               </button>
                             )
                           } else if (
                             (pageNum === page - 2 && page > 3) ||
                             (pageNum === page + 2 && page < totalPages - 2)
                           ) {
                             return <span key={pageNum} className="flex items-end justify-center w-4 text-gray-400">...</span>
                           }
                           return null
                         })}

                         <button
                           onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                           disabled={page === totalPages}
                           className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 text-[#666666] hover:border-[#4CC0D8] disabled:opacity-50 disabled:hover:border-gray-100"
                         >
                            <ChevronRight className="h-4 w-4" />
                         </button>
                      </div>
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
