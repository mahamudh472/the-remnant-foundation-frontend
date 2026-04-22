"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { useAvailableEventDatesQuery } from "@/hooks/api/use-public"
import { format } from "date-fns"

interface EventsCalendarProps {
  onDateSelect: (date: Date) => void
  selectedDate?: Date
}

export default function EventsCalendar({
  onDateSelect,
  selectedDate,
}: EventsCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const { data: availableDatesData } = useAvailableEventDatesQuery(
    currentMonth.getMonth() + 1,
    currentMonth.getFullYear()
  )

  const availableDates = availableDatesData?.dates ?? []

  return (
    <Calendar
      className="rounded-md border p-6 md:h-128"
      mode="single"
      onSelect={(date) => date && onDateSelect(date)}
      selected={selectedDate}
      onMonthChange={setCurrentMonth}
      modifiers={{
        hasEvent: (date) => availableDates.includes(format(date, "yyyy-MM-dd")),
      }}
      modifiersStyles={{
        hasEvent: {
          fontWeight: "bold",
          color: "#4CC0D8",
          backgroundColor: "rgba(76, 192, 216, 0.1)",
        }
      }}
    />
  )
}
