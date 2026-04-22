import { apiRequest } from "@/lib/api/client"

export interface SupportIssueReason {
  id: number
  name: string
  request_type: number
  is_active: boolean
}

export interface SupportRequestType {
  id: number
  name: string
  is_active: boolean
  issue_reasons: SupportIssueReason[]
}

export type SupportTicketStatus = "ON_HOLD" | "IN_PROGRESS" | "COMPLETED"

export interface SupportTicketSummary {
  ticket_id: string
  subject: string
  status: SupportTicketStatus
  last_update: string
  responding_admin: string | null
}

export interface GetSupportTicketsParams {
  status?: SupportTicketStatus
  search?: string
  page?: number
  page_size?: number
}

export interface SupportTicketsResponse {
  count: number
  next: string | null
  previous: string | null
  results: SupportTicketSummary[]
}

export interface SupportAttachment {
  id: number
  file: string
  uploaded_at: string
}

export interface SupportTicketMessage {
  id: number
  sender: string
  sender_email: string
  message: string
  attachments: SupportAttachment[]
  created_at: string
}

export interface SupportTicketDetails {
  ticket_id: string
  subject: string
  user: string
  user_email: string
  request_type: number
  request_type_name: string
  issue_reason: number
  issue_reason_name: string
  course_id: number | null
  remarks: string
  status: SupportTicketStatus
  created_at: string
  updated_at: string
  attachments: SupportAttachment[]
  messages: SupportTicketMessage[]
}

export interface GetSupportTicketMessagesParams {
  page?: number
  page_size?: number
}

export interface SupportTicketMessagesResponse {
  count: number
  next: string | null
  previous: string | null
  results: SupportTicketMessage[]
}

export interface CreateSupportTicketPayload {
  subject: string
  request_type: number
  issue_reason: number
  course_id?: number
  remarks?: string
  attachments?: File[]
}

export interface CreateSupportTicketResponse {
  message: string
  ticket: SupportTicketSummary
}

export interface CreateSupportTicketReplyPayload {
  message?: string
  attachments?: File[]
}

export interface CreateSupportTicketReplyResponse {
  message: string
  reply: SupportTicketMessage
}

export interface AdminCreateRequestTypePayload {
  name: string
  is_active: boolean
}

export interface AdminCreateRequestTypeResponse {
  message: string
  request_type: {
    id: number
    name: string
    is_active: boolean
  }
}

export interface AdminCreateIssueReasonPayload {
  request_type_id: number
  name: string
  is_active: boolean
}

export interface AdminCreateIssueReasonResponse {
  message: string
  issue_reason: {
    id: number
    request_type_id: number
    name: string
    is_active: boolean
  }
}

export interface AdminTicketListItem {
  ticket_id: string
  subject: string
  user: string
  user_email: string
  request_type: number
  request_type_name: string
  issue_reason: number
  issue_reason_name: string
  course_id: number | null
  remarks: string
  status: SupportTicketStatus
  created_at: string
  updated_at: string
}

export interface AdminUpdateTicketStatusPayload {
  status: SupportTicketStatus
}

export interface AdminUpdateTicketStatusResponse {
  message: string
  ticket: SupportTicketDetails
}

function appendQueryParams(
  params: Record<string, string | number | undefined>,
  maxPageSize = 100
) {
  const urlParams = new URLSearchParams()

  for (const [key, rawValue] of Object.entries(params)) {
    if (rawValue === undefined || rawValue === null || rawValue === "") {
      continue
    }

    if (key === "page_size") {
      const pageSize = Number(rawValue)

      if (Number.isFinite(pageSize)) {
        urlParams.append(
          key,
          String(Math.max(1, Math.min(pageSize, maxPageSize)))
        )
      }

      continue
    }

    urlParams.append(key, String(rawValue))
  }

  return urlParams.toString()
}

function appendTicketFormData(
  formData: FormData,
  payload: CreateSupportTicketPayload
) {
  formData.append("subject", payload.subject)
  formData.append("request_type", String(payload.request_type))
  formData.append("issue_reason", String(payload.issue_reason))

  if (payload.course_id !== undefined) {
    formData.append("course_id", String(payload.course_id))
  }

  if (payload.remarks && payload.remarks.trim().length > 0) {
    formData.append("remarks", payload.remarks.trim())
  }

  payload.attachments?.forEach((file) => {
    formData.append("attachments", file)
  })
}

function appendReplyFormData(
  formData: FormData,
  payload: CreateSupportTicketReplyPayload
) {
  if (payload.message && payload.message.trim().length > 0) {
    formData.append("message", payload.message.trim())
  }

  payload.attachments?.forEach((file) => {
    formData.append("attachments", file)
  })
}

export function getSupportRequestTypes(accessToken: string) {
  return apiRequest<SupportRequestType[]>("support/request-types/", {
    method: "GET",
    token: accessToken,
  })
}

export function createSupportTicket(
  accessToken: string,
  payload: CreateSupportTicketPayload
) {
  const hasAttachments = Boolean(
    payload.attachments && payload.attachments.length > 0
  )

  if (hasAttachments) {
    const formData = new FormData()
    appendTicketFormData(formData, payload)

    return apiRequest<CreateSupportTicketResponse>("support/tickets/create/", {
      method: "POST",
      token: accessToken,
      body: formData,
    })
  }

  const body: Record<string, unknown> = {
    subject: payload.subject,
    request_type: payload.request_type,
    issue_reason: payload.issue_reason,
  }

  if (payload.course_id !== undefined) {
    body.course_id = payload.course_id
  }

  if (payload.remarks && payload.remarks.trim().length > 0) {
    body.remarks = payload.remarks.trim()
  }

  return apiRequest<CreateSupportTicketResponse>("support/tickets/create/", {
    method: "POST",
    token: accessToken,
    body,
  })
}

export function getSupportTickets(
  accessToken: string,
  params: GetSupportTicketsParams = {}
) {
  const query = appendQueryParams({
    status: params.status,
    search: params.search,
    page: params.page,
    page_size: params.page_size,
  })

  const endpoint = query ? `support/tickets/?${query}` : "support/tickets/"

  return apiRequest<SupportTicketsResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getSupportTicketDetails(accessToken: string, ticketId: string) {
  return apiRequest<SupportTicketDetails>(
    `support/tickets/${encodeURIComponent(ticketId)}/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export function createSupportTicketReply(
  accessToken: string,
  ticketId: string,
  payload: CreateSupportTicketReplyPayload
) {
  const hasAttachments = Boolean(
    payload.attachments && payload.attachments.length > 0
  )

  if (hasAttachments) {
    const formData = new FormData()
    appendReplyFormData(formData, payload)

    return apiRequest<CreateSupportTicketReplyResponse>(
      `support/tickets/${encodeURIComponent(ticketId)}/replies/create/`,
      {
        method: "POST",
        token: accessToken,
        body: formData,
      }
    )
  }

  const body: Record<string, unknown> = {}

  if (payload.message && payload.message.trim().length > 0) {
    body.message = payload.message.trim()
  }

  return apiRequest<CreateSupportTicketReplyResponse>(
    `support/tickets/${encodeURIComponent(ticketId)}/replies/create/`,
    {
      method: "POST",
      token: accessToken,
      body,
    }
  )
}

export function getSupportTicketMessages(
  accessToken: string,
  ticketId: string,
  params: GetSupportTicketMessagesParams = {}
) {
  const query = appendQueryParams({
    page: params.page,
    page_size: params.page_size,
  })

  const endpoint = query
    ? `support/tickets/${encodeURIComponent(ticketId)}/messages/?${query}`
    : `support/tickets/${encodeURIComponent(ticketId)}/messages/`

  return apiRequest<SupportTicketMessagesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function adminCreateRequestType(
  accessToken: string,
  payload: AdminCreateRequestTypePayload
) {
  return apiRequest<AdminCreateRequestTypeResponse>(
    "support/admin/request-types/create/",
    {
      method: "POST",
      token: accessToken,
      body: payload,
    }
  )
}

export function adminCreateIssueReason(
  accessToken: string,
  payload: AdminCreateIssueReasonPayload
) {
  return apiRequest<AdminCreateIssueReasonResponse>(
    "support/admin/issue-reasons/create/",
    {
      method: "POST",
      token: accessToken,
      body: payload,
    }
  )
}

export function adminGetTickets(accessToken: string) {
  return apiRequest<AdminTicketListItem[]>("support/admin/tickets/", {
    method: "GET",
    token: accessToken,
  })
}

export function adminUpdateTicketStatus(
  accessToken: string,
  ticketId: string,
  payload: AdminUpdateTicketStatusPayload
) {
  return apiRequest<AdminUpdateTicketStatusResponse>(
    `support/admin/tickets/${encodeURIComponent(ticketId)}/status/update/`,
    {
      method: "PATCH",
      token: accessToken,
      body: payload,
    }
  )
}
