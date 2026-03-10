"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  BookOpen,
  ClipboardList,
  Users,
  HelpCircle,
  Award,
  MessageSquare,
  Headphones,
  LogOut,
} from "lucide-react"
import { useAuthStore } from "@/lib/store/auth-store"

const MENU_ITEMS = [
  { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  { name: "My Profile", href: "/teacher/profile", icon: User },
  { name: "Courses", href: "/teacher/courses", icon: BookOpen },
  { name: "Assignments", href: "/teacher/assignments", icon: ClipboardList },
  { name: "Students", href: "/teacher/students", icon: Users },
  { name: "Quiz", href: "/teacher/quiz", icon: HelpCircle },
  { name: "Certificates", href: "/teacher/certificates", icon: Award },
  { name: "Follow-Up", href: "/teacher/follow-up", icon: MessageSquare },
  {
    name: "Support Tickets",
    href: "/teacher/support-tickets",
    icon: Headphones,
  },
]

export function TeacherSidebar() {
  const pathname = usePathname()
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 text-sm font-bold text-[#1D1D1D]">Main Menu</h3>
      <nav className="space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive =
            item.href === "/teacher"
              ? pathname === "/teacher"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-[#EBF7F9] text-[#4CC0D8]"
                  : "hover:bg-[#F8F9FC] hover:text-[#4CC0D8]"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  isActive ? "text-[#4CC0D8]" : "text-[#9CA3AF]"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 border-t border-gray-100 pt-6">
        {/* <h3 className="mb-4 text-sm font-bold text-[#1D1D1D]">
          Account Settings
        </h3> */}
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
