"use client"

import * as React from "react"

import { NavChats } from "@/components/nav-chats"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  SquarePen,
} from "lucide-react"
import Logo from "./common/logo"
import { useCreateConversationMutation } from "@/hooks/api/use-ai"
import { useRouter } from "next/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const createConversation = useCreateConversationMutation()

  const data = {
    navMain: [
      {
        title: "New Chat",
        url: "/chat",
        icon: <SquarePen />,
        onClick: async () => {
          try {
            const newConv = await createConversation.mutateAsync("Hello Dear, How can I help you today?")
            router.push(`/chat?id=${newConv.conversation_id}`)
          } catch (error) {
            console.error("Failed to create conversation:", error)
            router.push("/chat")
          }
        }
      }
    ],
  }

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <Logo />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavChats />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
