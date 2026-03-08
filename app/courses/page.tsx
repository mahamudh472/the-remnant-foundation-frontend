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
  ChevronDown,
  BookOpen,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { name: "Foundations of Faith", count: 0 },
  { name: "Bible Study", count: 0 },
  { name: "Spiritual Growth", count: 0 },
  { name: "Discipleship", count: 0 },
  { name: "Christian Living", count: 0, checked: true },
  { name: "Kids Ministry (5-10)", count: 0 },
  { name: "Teen Faith (11-17)", count: 0 },
  { name: "Young Adults (18-25)", count: 0 },
]

const COURSES = [
  {
    id: 1,
    title: "Christian Faith 101",
    instructor: "David Benitez",
    insImage: "/assets/pngs/Profile.png",
    category: "Foundations of Faith",
    rating: 4.8,
    reviews: 110,
    price: 120,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 2,
    title: "Who Is Jesus Christ?",
    instructor: "Ana Reyes",
    insImage: "/assets/pngs/Profile.png",
    category: "Foundations of Faith",
    rating: 4.8,
    reviews: 110,
    price: 140,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 3,
    title: "Christian Values & Ethics",
    instructor: "Andrew Pittle",
    insImage: "/assets/pngs/Profile.png",
    category: "Christian Living",
    rating: 4.8,
    reviews: 110,
    price: 160,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 4,
    title: "Serving in Ministry",
    instructor: "Christy Garner",
    insImage: "/assets/pngs/Profile.png",
    category: "Bible Study",
    rating: 4.8,
    reviews: 110,
    price: 200,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 5,
    title: "Bible Stories for Kids",
    instructor: "Justin",
    insImage: "/assets/pngs/Profile.png",
    category: "Kids Ministry",
    rating: 4.8,
    reviews: 110,
    price: 130,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 6,
    title: "Introduction to bible.3",
    instructor: "Carolyn Hines",
    insImage: "/assets/pngs/Profile.png",
    category: "Bible Study",
    rating: 4.8,
    reviews: 110,
    price: 150,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 7,
    title: "Faith Challenges (7-Day / 30-Day)",
    instructor: "Rafael Miller",
    insImage: "/assets/pngs/Profile.png",
    category: "Special Programs",
    rating: 4.8,
    reviews: 110,
    price: 170,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 8,
    title: "Teen Faith Journey",
    instructor: "Nancy Duarte",
    insImage: "/assets/pngs/Profile.png",
    category: "Teen Faith Journey",
    rating: 4.8,
    reviews: 110,
    price: 110,
    image: "/assets/pngs/web course image.png"
  },
  {
    id: 9,
    title: "Christian Leadership Basics",
    instructor: "James Kagan",
    insImage: "/assets/pngs/Profile.png",
    category: "Character & Values",
    rating: 4.8,
    reviews: 110,
    price: 180,
    image: "/assets/pngs/web course image.png"
  }
]

export default function CoursesPage() {
  const [viewType, setViewType] = React.useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="py-16 bg-[#F1F7F9]">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1D]">All Courses</h1>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
               <Link href="/" className="text-[#666666]">Home</Link>
               <span className="w-4 h-[2px] bg-[#FF9D00]" />
               <span className="text-[#1D1D1D]">Course Grid</span>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left Sidebar: Filters */}
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
                          cat.checked ? "bg-[#4CC0D8] border-[#4CC0D8]" : "border-gray-200 group-hover:border-[#4CC0D8]"
                        )}>
                          {cat.checked && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          cat.checked ? "text-[#1D1D1D]" : "text-[#666666] group-hover:text-[#4CC0D8]"
                        )}>
                          {cat.name}
                        </span>
                      </label>
                    ))}
                    <button className="text-xs font-bold text-[#4CC0D8] pt-2">See More</button>
                  </div>
                </div>

                {/* Instructors Filter */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Instructors</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {[
                        { name: "Keny White", count: 10 },
                        { name: "Hinata Hyuga", count: 5 },
                        { name: "John Doe", count: 3 },
                        { name: "Nicole Brown", count: 0, checked: true }
                      ].map((inst) => (
                        <label key={inst.name} className="flex items-center gap-3 cursor-pointer group">
                           <div className={cn(
                             "h-5 w-5 rounded border flex items-center justify-center transition-all",
                             inst.checked ? "bg-[#4CC0D8] border-[#4CC0D8]" : "border-gray-200 group-hover:border-[#4CC0D8]"
                           )}>
                             {inst.checked && <Check className="h-3 w-3 text-white" />}
                           </div>
                           <span className="text-sm font-medium text-[#666666]">{inst.name} ({inst.count})</span>
                        </label>
                      ))}
                      <button className="text-xs font-bold text-[#4CC0D8] pt-2">See More</button>
                   </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Price</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {["All (10)", "Free (5)", "Paid (3)"].map((p) => (
                        <label key={p} className="flex items-center gap-3 cursor-pointer group">
                           <div className="h-5 w-5 rounded border border-gray-200 flex items-center justify-center" />
                           <span className="text-sm font-medium text-[#666666]">{p}</span>
                        </label>
                      ))}
                   </div>
                </div>

                {/* Reviews Filter */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1D1D1D]">Reviews</h3>
                      <ChevronDown className="h-4 w-4" />
                   </div>
                   <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <label key={star} className="flex items-center gap-3 cursor-pointer group">
                           <div className="h-5 w-5 rounded border border-gray-200" />
                           <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-3 w-3", i < star ? "text-[#FF9D00] fill-current" : "text-gray-200")} />
                              ))}
                           </div>
                        </label>
                      ))}
                   </div>
                </div>
              </div>

              {/* Course Grid Area */}
              <div className="flex-1 space-y-8">
                 {/* Top Controls */}
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
                       <select className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] appearance-none cursor-pointer">
                          <option>Newly Published</option>
                          <option>Oldest</option>
                          <option>Price: Low to High</option>
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

                 {/* Course Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {COURSES.map((course) => (
                      <Link
                        key={course.id}
                        href={`/courses/slug`}
                        className="bg-white rounded-2xl border border-gray-50 overflow-hidden group hover:shadow-2xl hover:shadow-[#4CC0D8]/5 transition-all"
                      >
                         <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={course.image}
                              alt={course.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <button className="absolute top-4 left-4 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-[#9CA3AF] hover:text-[#FF9D00] transition-colors">
                               <Heart className="h-4 w-4" />
                            </button>
                         </div>
                         <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                               <Image src={course.insImage} alt="Inst" width={24} height={24} className="rounded-full" />
                               <span className="text-[#1D1D1D]">{course.instructor}</span>
                               <span className="ml-auto text-[#9CA3AF]">{course.category}</span>
                            </div>
                            <h3 className="font-extrabold text-[#1D1D1D] group-hover:text-[#4CC0D8] transition-colors line-clamp-2 leading-tight h-10">
                               {course.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D1D1D]">
                               <Star className="h-3.5 w-3.5 text-[#FF9D00] fill-current" />
                               <span>{course.rating} ({course.reviews} Reviews)</span>
                               <button className="ml-auto h-5 w-5 rounded border border-gray-100 flex items-center justify-center text-[#9CA3AF]">
                                  <Bookmark className="h-3 w-3" />
                               </button>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                               <span className="text-xl font-extrabold text-[#4CC0D8]">${course.price}</span>
                               <button className="text-[10px] font-bold text-white bg-[#1D1D1D] px-4 py-2 rounded-lg uppercase tracking-wider group-hover:bg-[#4CC0D8] transition-colors flex items-center gap-2">
                                  View Course <ChevronRight className="h-3 w-3" />
                               </button>
                            </div>
                         </div>
                      </Link>
                    ))}
                 </div>

                 {/* Pagination */}
                 <div className="pt-12 flex items-center justify-between border-t border-gray-100">
                    <p className="text-sm font-medium text-[#666666]">Page 1 of 2</p>
                    <div className="flex gap-2">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Heart(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function Bookmark(props: any) {
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}
