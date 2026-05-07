"use client"

import { Suspense, useEffect, useState } from "react"
import AiInput from "@/components/ai-chat/chat"
import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useMessagesQuery } from "@/hooks/api/use-ai"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export default function Page() {
  const [conversationId, setConversationId] = useState<number | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const idFromUrl = params.get("id")
    setConversationId(idFromUrl ? Number(idFromUrl) : null)
  }, [])

  const { data: messagesData } = useMessagesQuery(conversationId)
  const title = messagesData?.conversation?.title || "New Chat"

  return (
    <Suspense fallback={<div className="p-6">Loading chat...</div>}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1 font-semibold">
                      {title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-3">
              <NavActions />
            </div>
          </header>
          <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-10">
            <AiInput />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  )
}
