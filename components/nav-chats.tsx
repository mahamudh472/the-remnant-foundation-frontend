"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  MoreHorizontalIcon,
  StarOffIcon,
  LinkIcon,
  ArrowUpRightIcon,
  Trash2Icon,
} from "lucide-react"
import {
  useConversationsQuery,
  useDeleteConversationMutation,
} from "@/hooks/api/use-ai"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export function NavChats() {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeIdRaw = searchParams.get("id")
  const activeId = activeIdRaw ? Number(activeIdRaw) : null
  const {
    data: infiniteData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useConversationsQuery()
  const { mutate: deleteConversation } = useDeleteConversationMutation()

  const conversations = infiniteData?.pages.flatMap((page) => page.items) || []

  async function handleDelete(conversationId: number) {
    try {
      await deleteConversation(conversationId)
      toast.success("Conversation deleted successfully.")
      router.push("/chat")
    } catch (error) {
      toast.error("Failed to delete conversation. Please try again.")
      console.log(error)
    }
  }

  return (
    <SidebarGroup className="pb-20 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent chats</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <div className="px-2 py-1.5">
                  <Skeleton className="h-4 w-full bg-sidebar-accent" />
                </div>
              </SidebarMenuItem>
            ))
          : conversations.map((item) => (
              <SidebarMenuItem key={item.conversation_id}>
                <SidebarMenuButton
                  asChild
                  isActive={activeId === item.conversation_id}
                >
                  <Link
                    href={`/chat?id=${item.conversation_id}`}
                    title={item.title}
                  >
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      showOnHover
                      className="aria-expanded:bg-sidebar-accent"
                    >
                      <MoreHorizontalIcon />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem
                      onClick={() =>
                        window.open(
                          window.location.origin +
                            `/chat?id=${item.conversation_id}`,
                          "_blank"
                        )
                      }
                    >
                      <ArrowUpRightIcon
                        size={16}
                        className="text-sidebar-foreground/70"
                      />
                      <span>Open in New Tab</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(item.conversation_id)}
                      className="group text-red-500 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
                    >
                      <Trash2Icon
                        size={16}
                        className="text-red-500 group-hover:text-white group-focus:text-white"
                      />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
        {hasNextPage && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              <MoreHorizontalIcon />
              <span>{isFetchingNextPage ? "Loading..." : "More"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
