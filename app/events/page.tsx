"use client"

import React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Video, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EventsPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 1, 1)) // Feb 2026

  const days = ["S", "M", "T", "W", "T", "F", "S"]

  // Feb 2026 starts on Sunday (S=0)
  const feb2026 = Array.from({ length: 28 }, (_, i) => i + 1)
  const prevMonthDays = [30, 31]
  const nextMonthDays = [1, 2, 3]

  const activeDays = [4, 5, 6, 7, 8, 9, 10, 16, 24]
  const selectedDay = 24

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1D]">Exciting Events Await You</h1>
            <p className="text-[#666666]">
              Join us for a range of engaging events, where knowledge meets inspiration, and every moment sparks new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Calendar Section */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-10 space-y-12">
               <div className="flex items-center justify-between">
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 hover:border-[#4CC0D8] transition-all">
                     <ChevronLeft className="h-5 w-5 text-[#1D1D1D]" />
                  </button>
                  <h2 className="text-3xl font-extrabold text-[#1D1D1D]">February 2026</h2>
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 hover:border-[#4CC0D8] transition-all">
                     <ChevronRight className="h-5 w-5 text-[#1D1D1D]" />
                  </button>
               </div>

               <div className="grid grid-cols-7 gap-2 md:gap-4 text-center">
                  {days.map((d) => (
                    <div key={d} className="text-xs font-bold text-[#9CA3AF] uppercase mb-4">{d}</div>
                  ))}

                  {prevMonthDays.map((d) => (
                    <div key={`p-${d}`} className="h-12 md:h-16 flex items-center justify-center text-lg font-bold text-[#9CA3AF] opacity-50">{d}</div>
                  ))}

                  {feb2026.map((d) => {
                    const isActive = activeDays.includes(d)
                    const isSelected = d === selectedDay
                    const isBlueRange = d >= 6 && d <= 10
                    const isToday = d === 24

                    return (
                      <div
                        key={d}
                        className={cn(
                          "h-12 md:h-16 flex items-center justify-center text-lg font-bold rounded-xl md:rounded-2xl transition-all cursor-pointer",
                          isSelected ? "bg-[#0070F3] text-white shadow-lg" :
                          isActive ? "text-[#0070F3] border border-[#0070F3]/10" : "text-[#1D1D1D] hover:bg-gray-50",
                          isBlueRange && !isSelected && "bg-[#EBF3FF] text-[#0070F3] border-0",
                          d === 4 || d === 5 ? "bg-[#EBF3FF] text-[#0070F3] border-0" : ""
                        )}
                      >
                        {d}
                      </div>
                    )
                  })}

                  {nextMonthDays.map((d) => (
                    <div key={`n-${d}`} className="h-12 md:h-16 flex items-center justify-center text-lg font-bold text-[#9CA3AF] opacity-50">{d}</div>
                  ))}
               </div>
            </div>

            {/* Event Cards Section */}
            <div className="space-y-6">
               {[
                 {
                   title: "AI for the Future: Unlocking New Possibilities",
                   time: "March 10, 2026 | 3:00 PM - 5:00 PM (GMT)",
                   platform: "Online (Zoom)",
                   desc: "Join us for an exclusive online event where we dive deep into the potential of AI and its transformative impact across industries."
                 },
                 {
                   title: "The Future of AI in Healthcare",
                   time: "March 12, 2026 | 10:00 AM - 12:00 PM (GMT)",
                   platform: "Online (Zoom)",
                   desc: "From diagnostics to patient care, AI is transforming the way we approach medicine. Join us for a comprehensive session featuring top healthcare professionals."
                 },
                 {
                   title: "Data Security: Navigating the Challenges",
                   time: "March 18, 2026 | 3:00 PM - 5:00 PM (GMT)",
                   platform: "Online (Zoom)",
                   desc: "Join us for an exclusive online event where we dive deep into the potential of AI and its transformative impact across industries."
                 }
               ].map((event, idx) => (
                 <div key={idx} className="bg-[#EBF7F9]/80 rounded-3xl p-8 border border-[#4CC0D8]/10 space-y-6 group hover:bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex gap-4 items-start">
                       <div className="h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#4CC0D8] shrink-0">
                          <CalendarIcon className="h-5 w-5" />
                       </div>
                       <div className="space-y-4">
                          <h3 className="text-xl font-bold text-[#1D1D1D] group-hover:text-[#4CC0D8] transition-colors">{event.title}</h3>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                                <span>{event.time}</span>
                             </div>
                             <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                <Video className="h-3.5 w-3.5 text-[#4CC0D8]" />
                                <span>{event.platform}</span>
                             </div>
                          </div>
                          <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                            {event.desc} <span className="text-[#4CC0D8] font-bold cursor-pointer hover:underline">See More</span>
                          </p>
                       </div>
                    </div>
                    <Button className="w-full h-11 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-xl font-bold shadow-lg shadow-[#4CC0D8]/10">
                       Join Event
                    </Button>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
