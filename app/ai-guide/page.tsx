"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Home,
  Library,
  History,
  Plus,
  MoreHorizontal,
  Paperclip,
  Camera,
  Mic,
  Send,
  ChevronLeft,
  Share2,
  Command,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Volume2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const RECENT_CHATS = [
  "Write a Shakespearean sonnet about a cat that...",
  "If cereal commercials were directed by Christo...",
  "Renewable Energy Trends",
  "Describe a medieval jousting tournament whe...",
  "What would a job interview be like if aliens wer...",
  "Generate a rap battle between a sentient toaste...",
  "What if oxygen was actually a hallucinogen, and...",
  "Pitch a reality TV show where ghosts haunt infl..."
]

export default function AIGuidePage() {
  const [mode, setMode] = React.useState<"initial" | "chat" | "voice">("initial")
  const [chatInput, setChatInput] = React.useState("")
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  const handleStartChat = () => setMode("chat")
  const handleStartVoice = () => setMode("voice")

  return (
    <div className="flex h-screen bg-white overflow-hidden text-[#1D1D1D] font-sans">

      {/* Sidebar */}
      <aside className={cn(
        "bg-[#F8F9FC] border-r border-gray-100 transition-all duration-300 flex flex-col shrink-0",
        isSidebarOpen ? "w-[280px]" : "w-0 -ml-[280px] md:ml-0 md:w-20"
      )}>
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/assets/logo.png" alt="Logo" width={32} height={32} />
            {isSidebarOpen && <span className="font-bold text-lg tracking-tight">Remnant</span>}
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-[#9CA3AF]"
          >
            <ChevronLeft className={cn("h-5 w-5 transition-transform", !isSidebarOpen && "rotate-180")} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder={isSidebarOpen ? "Search for chats..." : ""}
              className="w-full h-10 pl-10 pr-4 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] transition-all"
            />
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {[
            { name: "Home", icon: Home, shortcut: "H" },
            { name: "Library", icon: Library, shortcut: "T" },
            { name: "History", icon: History, shortcut: "G" },
          ].map((item) => (
            <button key={item.name} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group">
              <item.icon className="h-5 w-5 text-[#666666] group-hover:text-[#4CC0D8]" />
              {isSidebarOpen && (
                <>
                  <span className="text-sm font-bold text-[#666666] group-hover:text-[#1D1D1D] flex-1 text-left">{item.name}</span>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-[#9CA3AF]">
                    <Command className="h-2 w-2" /> {item.shortcut}
                  </div>
                </>
              )}
            </button>
          ))}

          {/* Recent Chats */}
          {isSidebarOpen && (
            <div className="pt-8 px-3 space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Recent Chats</h3>
              <div className="space-y-1">
                {RECENT_CHATS.map((chat, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#666666] hover:bg-white hover:shadow-sm truncate flex items-center justify-between group",
                      idx === 2 && "bg-white shadow-sm border border-gray-50 text-[#1D1D1D]"
                    )}
                  >
                    <span className="truncate flex-1">{chat}</span>
                    {idx === 2 && <MoreHorizontal className="h-3 w-3 text-[#9CA3AF]" />}
                  </button>
                ))}
              </div>
              <button className="text-[10px] font-bold text-[#4CC0D8] hover:underline px-2">View All →</button>
            </div>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
           <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white transition-all group">
             <Image src="/assets/pngs/Profile.png" alt="User" width={32} height={32} className="rounded-full shadow-sm" />
             {isSidebarOpen && (
               <>
                 <span className="text-sm font-bold text-[#1D1D1D] flex-1 text-left">Mosabbir</span>
                 <div className="flex flex-col gap-0.5">
                   <div className="h-1 w-1 rounded-full bg-gray-300" />
                   <div className="h-1 w-1 rounded-full bg-gray-300" />
                 </div>
               </>
             )}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">

        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-50 shrink-0">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 rounded-lg text-[#9CA3AF]">
              <Share2 className="h-5 w-5" />
            </button>
            <Button className="bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white h-9 px-4 rounded-lg font-bold flex items-center gap-2 text-sm shadow-sm transition-all active:scale-95">
              <Plus className="h-4 w-4" /> New Chat
            </Button>
          </div>

          <div className="bg-[#F8F9FC] rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-3 border border-gray-100">
             <span className="text-xs font-bold text-[#1D1D1D]">Mosabbir</span>
             <Image src="/assets/pngs/Profile.png" alt="User" width={32} height={32} className="rounded-full border border-white" />
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center justify-center p-6 relative">

          {mode === "initial" && (
            <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-4">
                <h2 className="text-4xl font-extrabold flex items-center justify-center gap-3">
                  <span role="img" aria-label="wave">👋</span> Hi Mosabbir!
                </h2>
                <p className="text-5xl font-extrabold text-[#1D1D1D] leading-tight">What do you want to <br /> learn today?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                <button
                  onClick={handleStartChat}
                  className="bg-white border border-[#4CC0D8]/20 p-8 rounded-[2.5rem] text-left space-y-24 hover:shadow-2xl hover:shadow-[#4CC0D8]/10 transition-all group"
                >
                  <div className="h-10 w-10 rounded-full bg-[#EBF7F9] flex items-center justify-center">
                    <div className="h-5 w-5 text-[#4CC0D8]">
                      <SparklesIcon />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#666666] leading-relaxed group-hover:text-[#1D1D1D] transition-colors">
                    Chat now and receive <br /> instant guidance through <br /> text.
                  </p>
                </button>

                <button
                  onClick={handleStartVoice}
                  className="bg-[#F8F9FC] p-8 rounded-[2.5rem] text-left space-y-24 hover:shadow-2xl hover:shadow-[#4CC0D8]/10 transition-all group"
                >
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <div className="h-5 w-5 text-[#4CC0D8]">
                      <SparklesIcon />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#666666] leading-relaxed group-hover:text-[#1D1D1D] transition-colors">
                    Talk in real time and get <br /> guidance through voice.
                  </p>
                </button>
              </div>
            </div>
          )}

          {mode === "chat" && (
            <div className="w-full max-w-4xl flex flex-col h-full animate-in fade-in duration-500">
               {/* Illustration Area */}
               <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="relative h-64 w-64 md:h-80 md:w-80">
                    <Image
                      src="/assets/pngs/ai-character.png"
                      alt="AI Guide"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
               </div>

               {/* Message Display (Last Response) */}
               <div className="mb-8 p-8 rounded-[2rem] bg-[#F8F9FC] border border-gray-50 flex gap-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <p className="text-sm text-[#1D1D1D] leading-relaxed">
                      Of course! I'd be happy to help with your presentation on renewable energy trends. According to recent data, residential solar panel installations increased by 27% in the last year alone, with the average home system now costing 34% less than five years ago. The most significant growth has been in suburban areas where installation costs have become more affordable due to local incentives and improved technology. Would you like me to provide more specific statistics for different regions or focus on particular aspects of residential solar adoption?
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                       <button className="p-1.5 hover:bg-gray-200 rounded text-[#9CA3AF] transition-all"><ThumbsUp className="h-4 w-4" /></button>
                       <button className="p-1.5 hover:bg-gray-200 rounded text-[#9CA3AF] transition-all"><ThumbsDown className="h-4 w-4" /></button>
                       <button className="p-1.5 hover:bg-gray-200 rounded text-[#9CA3AF] transition-all"><Copy className="h-4 w-4" /></button>
                       <button className="p-1.5 hover:bg-gray-200 rounded text-[#9CA3AF] transition-all ml-auto"><Volume2 className="h-4 w-4" /></button>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {mode === "voice" && (
            <div className="w-full max-w-2xl flex flex-col h-full items-center justify-center animate-in zoom-in-95 duration-500">
               <h3 className="text-3xl font-bold text-[#1D1D1D] mb-12">Talk in real time and get guidance through voice.</h3>
               <div className="relative h-80 w-80 mb-20">
                  <div className="absolute inset-0 rounded-full bg-[#4CC0D8]/5 animate-ping" />
                  <div className="absolute inset-4 rounded-full bg-[#4CC0D8]/10" />
                  <Image
                    src="/assets/pngs/ai-character.png"
                    alt="AI Guide"
                    fill
                    className="object-contain relative z-10"
                  />
               </div>

               {/* Waveform Visualization Mock */}
               <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-2xl shadow-[#4CC0D8]/10 space-y-6">
                  <div className="flex items-end justify-center gap-1.5 h-16">
                     {[20, 40, 60, 30, 80, 50, 90, 40, 70, 40, 60, 30, 85, 45, 75, 55, 65, 35, 95, 50, 40, 60, 30].map((h, i) => (
                       <div key={i} className="w-1 bg-[#4CC0D8]/20 rounded-full animate-wave" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                     ))}
                     {[60, 30, 80, 50, 90, 40].map((h, i) => (
                       <div key={i} className="w-1 bg-[#1D1D1D] rounded-full animate-wave" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                     ))}
                     {[20, 40, 60, 30, 80, 50, 90, 40, 70, 40, 60, 30, 85, 45, 75, 55, 65, 35, 95, 50].map((h, i) => (
                       <div key={i} className="w-1 bg-[#4CC0D8]/20 rounded-full animate-wave" style={{ height: `${h}%`, animationDelay: `${(i + 30) * 0.1}s` }} />
                     ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#9CA3AF] tracking-widest uppercase">
                     <span>5</span>
                     <span>01:00</span>
                     <span>01:15</span>
                     <span>01:30</span>
                     <span>01:45</span>
                     <span>02:00</span>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Input Bar */}
        <div className="p-6 shrink-0 flex justify-center">
          <div className="w-full max-w-4xl bg-[#F8F9FC] border border-gray-100 rounded-[2rem] p-4 flex flex-col gap-4 shadow-sm">
             <textarea
               placeholder="Ask me a question..."
               value={chatInput}
               onChange={(e) => setChatInput(e.target.value)}
               className="w-full h-24 bg-transparent border-none outline-none resize-none text-sm placeholder:text-[#9CA3AF] px-4 pt-2"
             />
             <div className="flex items-center justify-between px-4 pb-2">
                <div className="flex items-center gap-4">
                   <button className="p-2 hover:bg-white rounded-lg text-[#666666] transition-all"><Paperclip className="h-5 w-5" /></button>
                   <button className="p-2 hover:bg-white rounded-lg text-[#666666] transition-all"><Camera className="h-5 w-5" /></button>
                   <button
                     onClick={() => setMode(mode === "voice" ? "chat" : "voice")}
                     className={cn("p-2 rounded-lg transition-all", mode === "voice" ? "bg-[#4CC0D8] text-white" : "hover:bg-white text-[#666666]")}
                   >
                     <Mic className="h-5 w-5" />
                   </button>
                </div>
                <button
                  disabled={!chatInput.trim()}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center rounded-xl transition-all shadow-lg",
                    chatInput.trim() ? "bg-[#4CC0D8] text-white shadow-[#4CC0D8]/20" : "bg-white text-[#E5E7EB] shadow-none"
                  )}
                >
                   <Send className="h-5 w-5" />
                </button>
             </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        .animate-wave {
          animation: wave 1.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
