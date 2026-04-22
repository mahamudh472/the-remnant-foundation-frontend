"use client"

import React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import EventsCalendar from "./events-calendar"
import { Card, CardAction } from "@/components/ui/card"
import { useEventsByDateQuery, useJoinEventMutation } from "@/hooks/api/use-public"
import { format } from "date-fns"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api/client"
import { Loader2, MapPin, Clock, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const dateStr = format(selectedDate, "yyyy-MM-dd")

  const { data: eventsData, isLoading } = useEventsByDateQuery(dateStr)
  const joinEventMutation = useJoinEventMutation()

  const handleJoinEvent = async (eventId: number) => {
    try {
      const response = await joinEventMutation.mutateAsync(eventId)
      toast.success(response.message)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to join event"))
    }
  }

  const events = eventsData?.results ?? []

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center md:items-start">
            {/* Calendar Section */}
            <div className="flex justify-center lg:justify-start">
              <EventsCalendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
            </div>

            {/* Event Cards Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#1D1D1D]">
                  Events for {format(selectedDate, "MMMM d, yyyy")}
                </h2>
                <span className="text-sm text-[#9CA3AF]">{events.length} Events found</span>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-[#4CC0D8]" />
                  <p className="text-[#666666]">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-6 bg-gray-50 rounded-lg text-center space-y-4 border border-dashed border-gray-200">
                  <CalendarIcon className="h-12 w-12 text-[#9CA3AF]" />
                  <div className="space-y-1">
                    <p className="font-bold text-[#1D1D1D]">No events scheduled</p>
                    <p className="text-sm text-[#666666]">There are no events on this date. Try selecting another date on the calendar.</p>
                  </div>
                </div>
              ) : (
                events.map((event) => (
                  <Card key={event.id} className="bg-[#EBF7F9]/80 p-8 space-y-6 group transition-all border-none hover:bg-[#EBF7F9] hover:shadow-lg hover:shadow-[#4CC0D8]/5">
                    <div className="flex gap-4 items-start">
                      <div className="space-y-4 w-full">
                        <h3 className="text-xl font-bold text-[#1D1D1D] group-hover:text-[#4CC0D8] transition-colors">
                          {event.name}
                        </h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                            <Clock className="h-3.5 w-3.5 text-[#4CC0D8]" />
                            <span>{event.event_time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                            <MapPin className="h-3.5 w-3.5 text-[#4CC0D8]" />
                            <span>Online (Zoom)</span>
                          </div>
                        </div>
                        <p className="text-sm text-[#666666] leading-relaxed">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <Button
                            onClick={() => handleJoinEvent(event.id)}
                            disabled={joinEventMutation.isPending}
                          >
                            {joinEventMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : "Join Event"}
                          </Button>
                          {event.zoom_link && (
                            <a
                              href={event.zoom_link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-[#4CC0D8] hover:underline"
                            >
                              Zoom Link
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
