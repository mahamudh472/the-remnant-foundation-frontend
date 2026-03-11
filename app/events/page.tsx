"use client"

import React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import EventsCalendar from "./events-calendar"
import { Card, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center md:items-start">
            {/* Calendar Section */}
            {/* <Calendar /> */}
            <EventsCalendar />

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
                 <Card key={idx} className="bg-[#EBF7F9]/80 p-8 space-y-6 group transition-all">
                    <div className="flex gap-4 items-start">
                       <div className="space-y-4">
                          <h3 className="text-xl font-bold text-[#1D1D1D] group-hover:text-[#4CC0D8] transition-colors">{event.title}</h3>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                                <span>{event.time}</span>
                             </div>
                          </div>
                          <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                            {event.desc} <span className="text-[#4CC0D8] font-bold cursor-pointer hover:underline">See More</span>
                          </p>

                          <Button className="left-0">Join Event</Button>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
