import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getConversations,
  createConversation,
  getConversationMessages,
  sendMessage,
  type SendMessagePayload,
} from "@/lib/api/ai"
import { useAuthStore } from "@/lib/store/auth-store"

export const aiKeys = {
  all: ["ai"] as const,
  conversations: () => ["ai", "conversations"] as const,
  messages: (conversationId: number) =>
    ["ai", "conversations", conversationId, "messages"] as const,
}

export function useConversationsQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useInfiniteQuery({
    queryKey: aiKeys.conversations(),
    queryFn: ({ pageParam = 1 }) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }
      return getConversations(accessToken, pageParam)
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next ? lastPage.pagination.page + 1 : undefined
    },
    initialPageParam: 1,
    enabled: !!accessToken,
  })
}

export function useCreateConversationMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (message: string) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }
      return createConversation(accessToken, message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiKeys.conversations() })
    },
  })
}

export function useMessagesQuery(conversationId: number | null) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: aiKeys.messages(conversationId || 0),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }
      if (!conversationId) {
        throw new Error("Missing conversation id")
      }
      return getConversationMessages(accessToken, conversationId)
    },
    enabled: !!accessToken && !!conversationId,
  })
}

export function useSendMessageMutation(conversationId: number | null) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }
      if (!conversationId) {
        throw new Error("Missing conversation id")
      }
      return sendMessage(accessToken, conversationId, payload)
    },
    onSuccess: () => {
      if (conversationId) {
        queryClient.invalidateQueries({
          queryKey: aiKeys.messages(conversationId),
        })
      }
    },
  })
}
