import { apiRequest } from "./client"

export interface FAQ {
  id: number
  question: string
  answer: string
}

export interface FAQCategory {
  id: number
  name: string
  faqs: FAQ[]
}

export interface ContactPayload {
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
}

export interface ContactResponse {
  id: number
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export interface EventEntity {
  id: number
  name: string
  event_date: string
  event_time: string
  zoom_link: string
  description: string
}

export interface EventsByDateResponse {
  date: string
  count: number
  results: EventEntity[]
}

export interface AvailableDatesResponse {
  month: number
  year: number
  dates: string[]
}

export interface JoinEventResponse {
  message: string
  participation: {
    id: number
    event_id: number
    user_id: string
    user_email: string
    joined_at: string
  }
}

/**
 * Public FAQs
 */
export function getFAQs() {
  return apiRequest<FAQCategory[]>("faqs/", {
    method: "GET",
  })
}

/**
 * Contact form submission
 */
export function submitContact(payload: ContactPayload) {
  return apiRequest<ContactResponse>("contact/", {
    method: "POST",
    body: payload,
  })
}

/**
 * Events for a specific date
 */
export function getEventsByDate(date: string) {
  return apiRequest<EventsByDateResponse>(`events/by-date/?date=${date}`, {
    method: "GET",
  })
}

/**
 * Available event dates for a month/year
 */
export function getAvailableEventDates(month: number, year: number) {
  return apiRequest<AvailableDatesResponse>(
    `events/available-dates/?month=${month}&year=${year}`,
    {
      method: "GET",
    }
  )
}

/**
 * Join an event
 */
export function joinEvent(accessToken: string, eventId: number) {
  return apiRequest<JoinEventResponse>(`events/${eventId}/join/`, {
    method: "POST",
    token: accessToken,
  })
}
