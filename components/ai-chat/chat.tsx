"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"
import {
  Mic,
  Paperclip,
  Plus,
  Search,
  Send,
  Sparkle,
  Sparkles,
  User,
  Bot,
  Dot,
  Upload,
  ArrowUp,
} from "lucide-react"
import {
  useMessagesQuery,
  useSendMessageMutation,
  useCreateConversationMutation,
} from "@/hooks/api/use-ai"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import fallback from "@/assets/pngs/avatar-fallback.png"
import { useGetMeQuery } from "@/hooks/api/use-auth"

export default function AiInput() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const idFromUrl = searchParams.get("id")

  const [message, setMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [conversationId, setConversationId] = useState<number | null>(
    idFromUrl ? Number(idFromUrl) : null
  )

  useEffect(() => {
    if (idFromUrl) {
      setConversationId(Number(idFromUrl))
    } else {
      setConversationId(null)
    }
  }, [idFromUrl])

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: me } = useGetMeQuery()
  const { data: messagesData, isLoading: isLoadingMessages } =
    useMessagesQuery(conversationId)

  const sendMessageMutation = useSendMessageMutation(conversationId)
  const createConversationMutation = useCreateConversationMutation()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messagesData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (message.trim()) {
      const content = message.trim()
      setMessage("")
      setIsExpanded(false)

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }

      try {
        let currentId = conversationId
        if (!currentId) {
          const newConv = await createConversationMutation.mutateAsync(content)
          currentId = newConv.conversation_id
          setConversationId(currentId)
          router.push(`/chat?id=${currentId}`)
          return // Exit early as the conversation was created WITH the message
        }

        await sendMessageMutation.mutateAsync({ message: content })
      } catch (error) {
        console.error("Failed to send message:", error)
      }
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    setIsExpanded(e.target.value.length > 100 || e.target.value.includes("\n"))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col justify-between">
      {/* Messages Area */}
      <div className="mb-4 mb-24 flex min-h-0 flex-1 flex-col overflow-hidden">
        {!conversationId ? (
          <div className="flex flex-1 animate-in flex-col items-center justify-center duration-500 fade-in">
            <h1 className="mx-auto mb-8 max-w-2xl px-1 text-center text-3xl leading-9 font-bold text-balance text-pretty whitespace-pre-wrap text-foreground">
              What do you want to learn today?
            </h1>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-4 pr-6" ref={scrollRef}>
            <div className="mx-auto max-w-6xl space-y-8 py-8">
              {messagesData?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex animate-in gap-4 duration-300 slide-in-from-bottom-2",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {msg.role === "user" ? (
                      <Button
                        variant="outline"
                        className="rounded-full border border-primary p-0"
                      >
                        <Image
                          src={me?.avatar || fallback}
                          alt="User Avatar"
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                      </Button>
                    ) : (
                      <Bot className="size-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "rounded-tr-none bg-primary text-primary-foreground"
                        : "rounded-tl-none border border-border bg-muted/50"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {(sendMessageMutation.isPending ||
                createConversationMutation.isPending) && (
                <div className="flex animate-pulse items-center justify-start">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Bot className="size-4" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Dot className="h-24 w-24 animate-pulse" color="#4CC0D8" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>

      <div className="sticky bottom-10 w-full shrink-0 pb-4">
        <form onSubmit={handleSubmit} className="group/composer w-full">
          {/* <input
            ref={fileInputRef}
            type="file"
            multiple
            className="sr-only"
            onChange={(e) => {}}
          /> */}

          <div
            className={cn(
              "mx-auto w-full max-w-2xl cursor-text overflow-clip border border-border bg-white bg-clip-padding p-2.5 shadow-lg transition-[border-radius] duration-200 ease-out dark:bg-muted/50",
              isExpanded
                ? "grid [grid-template-columns:1fr] [grid-template-rows:auto_1fr_auto] rounded-3xl [grid-template-areas:'header'_'primary'_'footer']"
                : "grid [grid-template-columns:auto_1fr_auto] [grid-template-rows:auto_1fr_auto] rounded-3xl [grid-template-areas:'header_header_header'_'leading_primary_trailing'_'._footer_.']"
            )}
          >
            <div
              className={cn(
                "flex min-h-14 items-center overflow-x-hidden px-1.5",
                {
                  "mb-0 px-2 py-1": isExpanded,
                  "-my-2.5": !isExpanded,
                }
              )}
              onClick={() => {
                if (textareaRef.current) {
                  textareaRef.current.focus()
                }
              }}
              style={{ gridArea: "primary" }}
            >
              <div className="max-h-52 flex-1 overflow-auto">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything"
                  className="scrollbar-thin min-h-0 resize-none rounded-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                  rows={2}
                />
              </div>
            </div>

            {/* <div
              className={cn("flex", { hidden: isExpanded })}
              style={{ gridArea: "leading" }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full ring-0 outline-none hover:bg-accent"
                    aria-label="Add attachments"
                  >
                    <Plus className="size-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  className="max-w-xs rounded-2xl p-1.5"
                >
                  <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem
                      className="rounded-md"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="size-5 text-muted-foreground" />
                      Add photos & files
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-md" onClick={() => {}}>
                      <div className="flex items-center gap-2">
                        <Sparkles size={20} className="opacity-60" />
                        Agent mode
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-md" onClick={() => {}}>
                      <Search className="size-5 text-muted-foreground" />
                      Deep Research
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}

            <div
              className="flex items-center gap-2"
              style={{ gridArea: isExpanded ? "footer" : "trailing" }}
            >
              <div className="ms-auto flex items-center gap-1.5">
                {/* <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent"
                  aria-label="Record audio message"
                >
                  <Mic className="size-5 text-muted-foreground" />
                </Button> */}

                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full"
                  disabled={sendMessageMutation.isPending || !message.trim()}
                  aria-label="Send message"
                >
                  <ArrowUp
                    className={cn(
                      "size-5",
                      sendMessageMutation.isPending && "animate-pulse"
                    )}
                  />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
