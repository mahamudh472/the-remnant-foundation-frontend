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
import { SquarePen } from "lucide-react"
import Logo from "./common/logo"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "New Chat",
        url: "/chat",
        icon: <SquarePen />,
      },
    ],
  }

  return (
    <Sidebar
      className="border-r-0"
      style={
        {
          "--sidebar": "var(--primary)",
          "--sidebar-foreground": "var(--primary-foreground)",
          "--sidebar-accent": "oklch(1 0 0 / 10%)",
          "--sidebar-accent-foreground": "var(--primary-foreground)",
          "--sidebar-border": "oklch(1 0 0 / 10%)",
          "--sidebar-ring": "var(--ring)",
        } as React.CSSProperties
      }
      {...props}
    >
      <SidebarHeader className="border-b border-b-foreground py-2">
        <Logo single />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavChats />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
