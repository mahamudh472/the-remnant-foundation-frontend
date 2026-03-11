"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function EventsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
      <Calendar
        className="rounded-md border p-6 md:h-120"
        mode="single"
        onSelect={setDate}
        selected={date}
      />
  );
}
