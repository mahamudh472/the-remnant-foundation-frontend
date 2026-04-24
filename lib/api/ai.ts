import { apiRequest } from "@/lib/api/client"

export interface ConversationItem {
  conversation_id: number
  title: string
}

export interface Pagination {
  total: number
  page: number
  page_size: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface ConversationsResponse {
  items: ConversationItem[]
  pagination: Pagination
}

export interface MessageItem {
  id: number
  role: "user" | "assistant"
  content: string
  message_type: string
  created_at: string
  attachments: any[]
}

export interface ConversationDetailResponse {
  conversation: {
    id: number
    profile_id: string
    title: string
    created_at: string
    updated_at: string
  }
  messages: MessageItem[]
  pagination: Pagination
}

export interface SendMessagePayload {
  message: string
}

export interface SendMessageResponse {
  conversation_id: number
  title: string
  message: string
  reply: string
  message_id: number
  user_message: MessageItem
  assistant_message: MessageItem
}

const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL

export function getConversations(accessToken: string) {
  return apiRequest<ConversationsResponse>("conversations/", {
    method: "GET",
    token: accessToken,
    baseUrl: AI_BASE_URL,
  })
}

export function createConversation(accessToken: string, message: string) {
  return apiRequest<ConversationItem & { created_at: string }>("conversations/", {
    method: "POST",
    token: accessToken,
    baseUrl: AI_BASE_URL,
    body: { message },
  })
}

export function getConversationMessages(
  accessToken: string,
  conversationId: number
) {
  return apiRequest<ConversationDetailResponse>(`conversations/${conversationId}/`, {
    method: "GET",
    token: accessToken,
    baseUrl: AI_BASE_URL,
  })
}

export function sendMessage(
  accessToken: string,
  conversationId: number,
  payload: SendMessagePayload
) {
  return apiRequest<SendMessageResponse>(`conversations/${conversationId}/messages/`, {
    method: "POST",
    token: accessToken,
    baseUrl: AI_BASE_URL,
    body: payload,
  })
}
