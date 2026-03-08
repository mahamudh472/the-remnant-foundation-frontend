"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
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
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

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

const INSTRUCTORS = [
  {
    id: 1,
    name: "Rolands Granger",
    role: "Developer",
    rating: 4.9,
    reviews: 200,
    lessons: 12,
    time: "169hr 20min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 2,
    name: "Lisa Lopez",
    role: "Finance",
    rating: 4.4,
    reviews: 130,
    lessons: 22,
    time: "15hr 06min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 3,
    name: "Charles Ruiz",
    role: "Cloud Engineer",
    rating: 4.5,
    reviews: 120,
    lessons: 16,
    time: "2hr 25min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 4,
    name: "Rogerina Grogan",
    role: "Vocational",
    rating: 4.6,
    reviews: 180,
    lessons: 6,
    time: "19hr 30min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 5,
    name: "Ivana Tow",
    role: "Corporate Trainer",
    rating: 4.2,
    reviews: 210,
    lessons: 25,
    time: "4hr 20min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 6,
    name: "Kevin Leonard",
    role: "Developer",
    rating: 4.5,
    reviews: 140,
    lessons: 11,
    time: "7hr 10min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 7,
    name: "David Rocco",
    role: "Sports Coach",
    rating: 4.1,
    reviews: 170,
    lessons: 4,
    time: "1hr 30min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 8,
    name: "Jeanette Dulaney",
    role: "Technical Trainer",
    rating: 4.7,
    reviews: 220,
    lessons: 8,
    time: "4hr 35min",
    image: "/assets/pngs/Profile.png"
  },
  {
    id: 9,
    name: "Debran Andrew",
    role: "Health and Wellness",
    rating: 4.3,
    reviews: 190,
    lessons: 10,
    time: "2hr 56min",
    image: "/assets/pngs/Profile.png"
  }
]

export default function InstructorsPage() {
  const [activeCategory, setActiveCategory] = React.useState("All Instructor")
  const [viewType, setViewType] = React.useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="py-16 bg-[#F1F7F9]">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1D]">All Instructor</h1>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
               <Link href="/" className="text-[#666666]">Home</Link>
               <span className="w-4 h-[2px] bg-[#FF9D00]" />
               <span className="text-[#1D1D1D]">Instructor Grid</span>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar Filters */}
              <div className="w-full lg:w-64 space-y-10 shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#1D1D1D] flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filters
                  </h2>
                  <button className="text-sm font-bold text-[#FF9D00]">Clear</button>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1D1D1D]">Categories</h3>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="space-y-3">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.name} className="flex items-center gap-3 cursor-pointer group">
                        <div className={cn(
                          "h-5 w-5 rounded border flex items-center justify-center transition-all",
                          activeCategory === cat.name ? "bg-[#4CC0D8] border-[#4CC0D8]" : "border-gray-200 group-hover:border-[#4CC0D8]"
                        )}>
                          {activeCategory === cat.name && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          activeCategory === cat.name ? "text-[#1D1D1D]" : "text-[#666666] group-hover:text-[#4CC0D8]"
                        )}>
                          {cat.name} {cat.count > 0 && `(${cat.count})`}
                        </span>
                      </label>
                    ))}
                    <button className="text-xs font-bold text-[#4CC0D8] pt-2">See More</button>
                  </div>
                </div>

                {/* Instructors Mock */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Instructors</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {["Keny White", "Hinata Hyuga", "John Doe", "Nicole Brown"].map((name) => (
                         <label key={name} className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border border-gray-200 flex items-center justify-center" />
                            <span className="text-sm font-medium text-[#666666]">{name} (10)</span>
                         </label>
                      ))}
                      <button className="text-xs font-bold text-[#4CC0D8] pt-2">See More</button>
                   </div>
                </div>

                {/* Level Mock */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Level</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                         <label key={level} className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border border-gray-200 flex items-center justify-center" />
                            <span className="text-sm font-medium text-[#666666]">{level} (10)</span>
                         </label>
                      ))}
                   </div>
                </div>
              </div>

              {/* Grid Content */}
              <div className="flex-1 space-y-8">
                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-50">
                  <p className="text-sm font-medium text-[#666666]">Showing 1-9 of 50 results</p>
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
                     <select className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#4CC0D8]">
                        <option>Newly Published</option>
                        <option>Oldest</option>
                        <option>Rating</option>
                     </select>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                        <input
                          type="text"
                          placeholder="Search"
                          className="h-10 pl-10 pr-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#4CC0D8]"
                        />
                     </div>
                  </div>
                </div>

                {/* Instructor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   {INSTRUCTORS.map((inst) => (
                     <Link
                       key={inst.id}
                       href={`/instructors/rolands-granger`}
                       className="bg-white rounded-2xl border border-gray-50 p-6 space-y-6 hover:shadow-2xl hover:shadow-[#4CC0D8]/5 transition-all group"
                     >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                           <Image
                             src={inst.image}
                             alt={inst.name}
                             fill
                             className="object-cover transition-transform duration-500 group-hover:scale-110"
                           />
                           <button className="absolute top-4 left-4 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-[#1D1D1D] opacity-0 group-hover:opacity-100 transition-opacity">
                              <Check className="h-4 w-4" />
                           </button>
                        </div>

                        <div className="space-y-4">
                           <div className="flex items-center gap-1.5">
                              <Star className="h-3.5 w-3.5 text-[#FF9D00] fill-current" />
                              <span className="text-xs font-bold text-[#1D1D1D]">{inst.rating} ({inst.reviews} Reviews)</span>
                           </div>

                           <div className="space-y-1">
                              <h3 className="font-bold text-[#1D1D1D] group-hover:text-[#4CC0D8] transition-colors">{inst.name}</h3>
                              <p className="text-xs text-[#666666]">{inst.role}</p>
                           </div>

                           <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                              <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF9D00]">
                                 <BookOpenIcon className="h-3.5 w-3.5" />
                                 <span className="uppercase">{inst.lessons}+ Lesson</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-[#9CA3AF]">
                                 <Clock className="h-3.5 w-3.5" />
                                 <span className="uppercase">{inst.time}</span>
                              </div>
                           </div>
                        </div>
                     </Link>
                   ))}
                </div>

                {/* Pagination */}
                <div className="pt-12 flex justify-center gap-2">
                   <button className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 text-[#666666] hover:border-[#4CC0D8]">
                      <ChevronLeft className="h-4 w-4" />
                   </button>
                   <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#FF9D00] text-white font-bold text-sm">1</button>
                   <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f8f9fc] text-[#666666] font-bold text-sm hover:bg-gray-100">2</button>
                   <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f8f9fc] text-[#666666] font-bold text-sm hover:bg-gray-100">3</button>
                   <button className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 text-[#666666] hover:border-[#4CC0D8]">
                      <ChevronRight className="h-4 w-4" />
                   </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function BookOpenIcon(props: any) {
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
