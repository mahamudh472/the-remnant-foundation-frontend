import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import {
  createSupportTicket,
  createSupportTicketReply,
  getSupportRequestTypes,
  getSupportTicketDetails,
  getSupportTicketMessages,
  getSupportTickets,
  adminCreateIssueReason,
  adminCreateRequestType,
  adminGetTickets,
  adminUpdateTicketStatus,
  type AdminCreateIssueReasonPayload,
  type AdminCreateRequestTypePayload,
  type AdminUpdateTicketStatusPayload,
  type CreateSupportTicketPayload,
  type CreateSupportTicketReplyPayload,
  type GetSupportTicketMessagesParams,
  type GetSupportTicketsParams,
  type SupportTicketStatus,
} from "@/lib/api/support"
import { useAuthStore } from "@/lib/store/auth-store"

export type { SupportTicketStatus }

export const supportKeys = {
  all: ["support"] as const,
  requestTypes: (accessToken: string | null) =>
    ["support", "request-types", accessToken] as const,
  tickets: (params: GetSupportTicketsParams, accessToken: string | null) =>
    ["support", "tickets", accessToken, params] as const,
  ticketDetail: (ticketId: string, accessToken: string | null) =>
    ["support", "ticket-detail", accessToken, ticketId] as const,
  ticketMessages: (
    ticketId: string,
    params: GetSupportTicketMessagesParams,
    accessToken: string | null
  ) => ["support", "ticket-messages", accessToken, ticketId, params] as const,
  adminTickets: (accessToken: string | null) =>
    ["support", "admin", "tickets", accessToken] as const,
}

export function useSupportRequestTypesQuery(enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: supportKeys.requestTypes(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getSupportRequestTypes(accessToken)
    },
    enabled: Boolean(accessToken) && enabled,
  })
}

export function useSupportTicketsQuery(
  params: GetSupportTicketsParams = {},
  enabled = true
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: supportKeys.tickets(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getSupportTickets(accessToken, params)
    },
    enabled: Boolean(accessToken) && enabled,
    placeholderData: keepPreviousData,
  })
}

export function useSupportTicketDetailQuery(ticketId?: string, enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: supportKeys.ticketDetail(ticketId ?? "unknown", accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      if (!ticketId) {
        throw new Error("Missing ticket id")
      }

      return getSupportTicketDetails(accessToken, ticketId)
    },
    enabled: Boolean(accessToken && ticketId) && enabled,
  })
}

export function useSupportTicketMessagesQuery(
  ticketId?: string,
  params: GetSupportTicketMessagesParams = {},
  enabled = true
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: supportKeys.ticketMessages(
      ticketId ?? "unknown",
      params,
      accessToken
    ),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      if (!ticketId) {
        throw new Error("Missing ticket id")
      }

      return getSupportTicketMessages(accessToken, ticketId, params)
    },
    enabled: Boolean(accessToken && ticketId) && enabled,
    placeholderData: keepPreviousData,
  })
}

export function useCreateSupportTicketMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateSupportTicketPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return createSupportTicket(accessToken, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["support", "tickets", accessToken],
      })
    },
  })
}

export interface CreateSupportReplyMutationPayload extends CreateSupportTicketReplyPayload {
  ticketId: string
}

export function useCreateSupportReplyMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      ticketId,
      ...payload
    }: CreateSupportReplyMutationPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return createSupportTicketReply(accessToken, ticketId, payload)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: supportKeys.ticketDetail(variables.ticketId, accessToken),
      })
      queryClient.invalidateQueries({
        queryKey: [
          "support",
          "ticket-messages",
          accessToken,
          variables.ticketId,
        ],
      })
      queryClient.invalidateQueries({
        queryKey: ["support", "tickets", accessToken],
      })
    },
  })
}

export function useAdminTicketsQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: supportKeys.adminTickets(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return adminGetTickets(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}

export function useAdminCreateRequestTypeMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AdminCreateRequestTypePayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return adminCreateRequestType(accessToken, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["support", "request-types"],
      })
    },
  })
}

export function useAdminCreateIssueReasonMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AdminCreateIssueReasonPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return adminCreateIssueReason(accessToken, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["support", "request-types"],
      })
    },
  })
}

export function useAdminUpdateTicketStatusMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      ticketId,
      ...payload
    }: AdminUpdateTicketStatusPayload & { ticketId: string }) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return adminUpdateTicketStatus(accessToken, ticketId, payload)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["support", "admin", "tickets", accessToken],
      })
      queryClient.invalidateQueries({
        queryKey: supportKeys.ticketDetail(variables.ticketId, accessToken),
      })
    },
  })
}
