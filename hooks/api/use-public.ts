import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getFAQs,
  submitContact,
  getEventsByDate,
  getAvailableEventDates,
  joinEvent,
  type ContactPayload,
} from "@/lib/api/public"
import { useAuthStore } from "@/lib/store/auth-store"

export const publicKeys = {
  all: ["public"] as const,
  faqs: () => ["public", "faqs"] as const,
  eventsByDate: (date: string) => ["public", "events", "by-date", date] as const,
  availableDates: (month: number, year: number) =>
    ["public", "events", "available-dates", month, year] as const,
}

export function useFAQsQuery() {
  return useQuery({
    queryKey: publicKeys.faqs(),
    queryFn: getFAQs,
  })
}

export function useContactMutation() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => submitContact(payload),
  })
}

export function useEventsByDateQuery(date: string | undefined) {
  return useQuery({
    queryKey: publicKeys.eventsByDate(date ?? ""),
    queryFn: () => {
      if (!date) throw new Error("Date is required")
      return getEventsByDate(date)
    },
    enabled: !!date,
  })
}

export function useAvailableEventDatesQuery(month: number, year: number) {
  return useQuery({
    queryKey: publicKeys.availableDates(month, year),
    queryFn: () => getAvailableEventDates(month, year),
  })
}

export function useJoinEventMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useMutation({
    mutationFn: (eventId: number) => {
      if (!accessToken) throw new Error("Authentication required")
      return joinEvent(accessToken, eventId)
    },
  })
}
