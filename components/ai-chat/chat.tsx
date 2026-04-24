"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { Mic, Paperclip, Plus, Search, Send, Sparkle, Sparkles, User, Bot } from "lucide-react";
import { useMessagesQuery, useSendMessageMutation, useCreateConversationMutation } from "@/hooks/api/use-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams, useRouter } from "next/navigation";

export default function AiInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idFromUrl = searchParams.get("id");

  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(
    idFromUrl ? Number(idFromUrl) : null
  );

  useEffect(() => {
    if (idFromUrl) {
      setConversationId(Number(idFromUrl));
    } else {
      setConversationId(null);
    }
  }, [idFromUrl]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messagesData, isLoading: isLoadingMessages } = useMessagesQuery(conversationId);
  const sendMessageMutation = useSendMessageMutation(conversationId);
  const createConversationMutation = useCreateConversationMutation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messagesData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      const content = message.trim();
      setMessage("");
      setIsExpanded(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        let currentId = conversationId;
        if (!currentId) {
          const newConv = await createConversationMutation.mutateAsync(content);
          currentId = newConv.conversation_id;
          setConversationId(currentId);
          router.push(`/chat?id=${currentId}`);
          return; // Exit early as the conversation was created WITH the message
        }

        await sendMessageMutation.mutateAsync({ message: content });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    setIsExpanded(e.target.value.length > 100 || e.target.value.includes("\n"));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-120px)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col mb-4">
        {!conversationId ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
             <h1 className="text-balance mb-8 mx-auto max-w-2xl text-center text-3xl font-bold leading-9 text-foreground px-1 text-pretty whitespace-pre-wrap">
               How can I help you today?
             </h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                {[
                  "Plan a trip to Tokyo",
                  "Explain quantum computing",
                  "Write a thank you note",
                  "Help me with coding"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setMessage(suggestion);
                      // Trigger submit manually or just let them click send
                    }}
                    className="p-4 rounded-2xl border border-border bg-muted/30 hover:bg-muted/50 text-left text-sm transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
             </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-4 pr-6" ref={scrollRef}>
            <div className="max-w-3xl mx-auto space-y-8 py-8">
              {messagesData?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-4 animate-in slide-in-from-bottom-2 duration-300",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "size-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted/50 border border-border rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {(sendMessageMutation.isPending || createConversationMutation.isPending) && (
                <div className="flex gap-4 animate-pulse">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Bot className="size-4" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl p-4 bg-muted/50 border border-border rounded-tl-none">
                    <Skeleton className="h-4 w-24 bg-gray-200/50" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>

      <div className="shrink-0 pb-4">
        <form onSubmit={handleSubmit} className="group/composer w-full">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="sr-only"
            onChange={(e) => {}}
          />

          <div
            className={cn(
              "w-full max-w-2xl mx-auto bg-white dark:bg-muted/50 cursor-text overflow-clip bg-clip-padding p-2.5 shadow-lg border border-border transition-[border-radius] duration-200 ease-out",
              isExpanded
                ? "rounded-3xl grid [grid-template-columns:1fr] [grid-template-rows:auto_1fr_auto] [grid-template-areas:'header'_'primary'_'footer']"
                : "rounded-3xl grid [grid-template-columns:auto_1fr_auto] [grid-template-rows:auto_1fr_auto] [grid-template-areas:'header_header_header'_'leading_primary_trailing'_'._footer_.']"
            )}
          >
            <div
              className={cn(
                "flex min-h-14 items-center overflow-x-hidden px-1.5",
                {
                  "px-2 py-1 mb-0": isExpanded,
                  "-my-2.5": !isExpanded,
                }
              )}
              style={{ gridArea: "primary" }}
            >
              <div className="flex-1 overflow-auto max-h-52">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything"
                  className="min-h-0 resize-none rounded-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-thin dark:bg-transparent"
                  rows={1}
                />
              </div>
            </div>

            <div
              className={cn("flex", { hidden: isExpanded })}
              style={{ gridArea: "leading" }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-accent outline-none ring-0"
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
                    <DropdownMenuItem
                      className="rounded-md"
                      onClick={() => {}}
                    >
                      <div className="flex items-center gap-2">
                          <Sparkles size={20} className="opacity-60" />
                        Agent mode
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-md"
                      onClick={() => {}}
                    >
                      <Search className="size-5 text-muted-foreground" />
                      Deep Research
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div
              className="flex items-center gap-2"
              style={{ gridArea: isExpanded ? "footer" : "trailing" }}
            >
              <div className="ms-auto flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent"
                  aria-label="Record audio message"
                >
                  <Mic className="size-5 text-muted-foreground" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-accent relative"
                  aria-label="Audio visualization"
                >
                    <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping" />
                </Button>

                {(message.trim() || sendMessageMutation.isPending) && (
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full"
                    disabled={sendMessageMutation.isPending || !message.trim()}
                    aria-label="Send message"
                  >
                    <Send className={cn("size-5 text-muted-foreground", sendMessageMutation.isPending && "animate-pulse")} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
   );
}
