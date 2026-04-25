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
import { MoreHorizontalIcon, StarOffIcon, LinkIcon, ArrowUpRightIcon, Trash2Icon } from "lucide-react"
import { useConversationsQuery } from "@/hooks/api/use-ai"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export function NavChats() {
  const { isMobile } = useSidebar()
  const {
    data: infiniteData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useConversationsQuery()

  const conversations = infiniteData?.pages.flatMap((page) => page.items) || []

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden pb-20">
      <SidebarGroupLabel>Recent chats</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <SidebarMenuItem key={i}>
              <div className="px-2 py-1.5">
                <Skeleton className="h-4 w-full bg-sidebar-accent" />
              </div>
            </SidebarMenuItem>
          ))
        ) : (
          conversations.map((item) => (
            <SidebarMenuItem key={item.conversation_id}>
              <SidebarMenuButton asChild>
                <Link href={`/chat?id=${item.conversation_id}`} title={item.title}>
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
                  <DropdownMenuItem>
                    <ArrowUpRightIcon className="text-sidebar-foreground/70" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2Icon className="text-sidebar-foreground/70" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        )}
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
