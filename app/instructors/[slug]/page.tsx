"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Star,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function InstructorDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="py-16 bg-[#F1F7F9]">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1D]">Instructor Detail</h1>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
               <Link href="/" className="text-[#666666]">Home</Link>
               <span className="w-4 h-[2px] bg-[#FF9D00]" />
               <span className="text-[#1D1D1D]">Instructor Detail</span>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Left Column: Profile & Details */}
              <div className="flex-1 space-y-12">

                 {/* Top Profile Card */}
                 <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-start shadow-sm">
                    <div className="relative h-40 w-40 rounded-2xl overflow-hidden shrink-0">
                       <Image
                         src="/assets/pngs/Profile.png"
                         alt="Rolands Granger"
                         fill
                         className="object-cover"
                       />
                       <button className="absolute top-2 left-2 h-6 w-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                          <Plus className="h-4 w-4 text-[#FF9D00]" />
                       </button>
                    </div>
                    <div className="space-y-6 flex-1">
                       <div className="space-y-2">
                          <div className="flex items-center justify-between">
                             <h2 className="text-2xl font-bold text-[#1D1D1D]">Rolands Granger</h2>
                             <div className="flex gap-4">
                                <Facebook className="h-4 w-4 text-[#666666] hover:text-[#4CC0D8] cursor-pointer" />
                                <Twitter className="h-4 w-4 text-[#666666] hover:text-[#4CC0D8] cursor-pointer" />
                                <Youtube className="h-4 w-4 text-[#666666] hover:text-[#4CC0D8] cursor-pointer" />
                                <Linkedin className="h-4 w-4 text-[#666666] hover:text-[#4CC0D8] cursor-pointer" />
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <p className="text-sm font-medium text-[#666666]">Developer</p>
                             <div className="flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5 text-[#FF9D00] fill-current" />
                                <span className="text-xs font-bold text-[#1D1D1D]">4.9 (200 Reviews)</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-sm text-[#666666] leading-relaxed">
                         I am a web developer with a vast array of knowledge in many different front end and back end languages, responsive frameworks, databases, and best code practices. I am a web developer with a vast array of knowledge in many different front end and back end languages, responsive frameworks, databases, and best code practices.
                       </p>
                       <div className="flex gap-12">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-[#1D1D1D]">12+ Lesson</p>
                             <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">Lessons</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-[#1D1D1D]">50 Students</p>
                             <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">Students</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* About Me */}
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#1D1D1D]">About Me</h3>
                    <p className="text-sm text-[#666666] leading-relaxed">
                       Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No shortcuts. Even if the client is being careless. Some quick example text to build on the card title and bulk the card's content Moltin gives you platform.
                    </p>
                    <button className="text-sm font-bold text-[#FF9D00] hover:underline">Read More</button>
                 </div>

                 {/* Education */}
                 <div className="space-y-8">
                    <h3 className="text-xl font-bold text-[#1D1D1D]">Education</h3>
                    <div className="space-y-10 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                       {[
                         { title: "BCA - Bachelor of Computer Applications", school: "International University", years: "2004 - 2010" },
                         { title: "MCA - Master of Computer Application", school: "International University", years: "2010 - 2012" },
                         { title: "Design Communication Visual", school: "International University", years: "2012-2015" }
                       ].map((item, idx) => (
                         <div key={idx} className="relative pl-10 space-y-2">
                            <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-white border-2 border-[#4CC0D8] z-10" />
                            <h4 className="font-bold text-[#1D1D1D]">{item.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-[#666666]">
                               <span>{item.school}</span>
                               <span className="w-4 h-[1px] bg-gray-300" />
                               <span>({item.years})</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Experience */}
                 <div className="space-y-8">
                    <h3 className="text-xl font-bold text-[#1D1D1D]">Experience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {[
                         { title: "Healthy Lifestyle & Habits", company: "Creative Agency", years: "2013 - 2016" },
                         { title: "Project Manager", company: "Jobey Technology Pvt.Ltd", years: "Present" }
                       ].map((item, idx) => (
                         <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-gray-100 items-start">
                            <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                               <MapPin className="h-5 w-5 text-[#9CA3AF]" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="font-bold text-[#1D1D1D]">{item.title}</h4>
                               <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                  <span>{item.company}</span>
                                  <span>({item.years})</span>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Courses */}
                 <div className="space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-bold text-[#1D1D1D]">Courses</h3>
                       <div className="flex gap-2">
                          <button className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-[#666666] hover:bg-[#FF9D00] hover:text-white transition-all">
                             <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-[#666666] hover:bg-[#FF9D00] hover:text-white transition-all">
                             <ChevronRight className="h-4 w-4" />
                          </button>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {[
                         { title: "Healthy Lifestyle & Habits", rating: 4.1, reviews: 140, price: 170, category: "Finance & Life" },
                         { title: "Faith & Career Direction", rating: 4.3, reviews: 90, price: 110, category: "Faith & Purpose" },
                         { title: "Preparing for M...", rating: 4.8, reviews: 110, price: 180, category: "Kids & Young" }
                       ].map((course, idx) => (
                         <div key={idx} className="bg-white rounded-2xl border border-gray-50 overflow-hidden group hover:shadow-xl transition-all">
                            <div className="relative aspect-video">
                               <Image
                                 src="/assets/pngs/web course image.png"
                                 alt={course.title}
                                 fill
                                 className="object-cover"
                               />
                               <button className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center">
                                  <Star className="h-4 w-4 text-[#FF9D00]" />
                               </button>
                            </div>
                            <div className="p-4 space-y-4">
                               <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#9CA3AF]">
                                  <Image src="/assets/pngs/Profile.png" alt="Inst" width={20} height={20} className="rounded-full" />
                                  <span>Rafael Miller</span>
                                  <span className="ml-auto text-[#4CC0D8]">{course.category}</span>
                               </div>
                               <h4 className="text-sm font-bold text-[#1D1D1D] group-hover:text-[#4CC0D8] transition-colors truncate">{course.title}</h4>
                               <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                                  <Star className="h-3 w-3 text-[#FF9D00] fill-current" />
                                  <span>{course.rating} ({course.reviews} Reviews)</span>
                               </div>
                               <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                  <span className="text-sm font-bold text-[#4CC0D8]">${course.price}</span>
                                  <Link href={`/courses/slug`} className="text-[10px] font-bold text-white bg-[#1D1D1D] px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-[#4CC0D8] transition-colors">
                                     View Course
                                  </Link>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="w-full lg:w-80 space-y-8">

                 {/* Certifications Card */}
                 <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-8 shadow-sm">
                    <h3 className="text-lg font-bold text-[#1D1D1D]">Certifications</h3>
                    <div className="grid grid-cols-4 gap-4">
                       {[1, 2, 3, 4].map((i) => (
                         <div key={i} className="aspect-square bg-[#F1F7F9] rounded-full border-2 border-white shadow-sm flex items-center justify-center p-2">
                            <Image src="/assets/logo.png" alt="Cert" width={24} height={24} />
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Contact Details Card */}
                 <div className="bg-[#fcfdfe] rounded-3xl border border-gray-100 p-8 space-y-8 shadow-sm">
                    <h3 className="text-lg font-bold text-[#1D1D1D]">Contact Details</h3>
                    <div className="space-y-6">
                       <div className="flex gap-4 group cursor-pointer">
                          <div className="h-10 w-10 rounded-xl bg-white text-[#4CC0D8] border border-gray-100 flex items-center justify-center group-hover:bg-[#4CC0D8] group-hover:text-white transition-all">
                             <Mail className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-xs font-bold text-[#1D1D1D]">Email</p>
                             <p className="text-xs text-[#666666]">jennywilson@example.com</p>
                          </div>
                       </div>
                       <div className="flex gap-4 group cursor-pointer">
                          <div className="h-10 w-10 rounded-xl bg-white text-[#4CC0D8] border border-gray-100 flex items-center justify-center group-hover:bg-[#4CC0D8] group-hover:text-white transition-all">
                             <MapPin className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-xs font-bold text-[#1D1D1D]">Address</p>
                             <p className="text-xs text-[#666666]">877 Ferry Street, Huntsville, Alabama</p>
                          </div>
                       </div>
                       <div className="flex gap-4 group cursor-pointer">
                          <div className="h-10 w-10 rounded-xl bg-white text-[#4CC0D8] border border-gray-100 flex items-center justify-center group-hover:bg-[#4CC0D8] group-hover:text-white transition-all">
                             <Phone className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-xs font-bold text-[#1D1D1D]">Phone</p>
                             <p className="text-xs text-[#666666]">+1 (452) 123-6789</p>
                          </div>
                       </div>
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
