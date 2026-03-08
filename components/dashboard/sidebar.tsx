"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  BookOpen,
  Video,
  Award,
  Heart,
  ClipboardList,
  ShoppingBag,
  GraduationCap,
  Headphones,
  LogOut,
} from "lucide-react"

const MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  {
    name: "Enrolled Courses",
    href: "/dashboard/enrolled-courses",
    icon: BookOpen,
  },
  { name: "Live Classes", href: "/dashboard/live-classes", icon: Video },
  { name: "My Certificates", href: "/dashboard/certificates", icon: Award },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  {
    name: "My Quiz Attempts",
    href: "/dashboard/quiz-attempts",
    icon: ClipboardList,
  },
  {
    name: "Order History",
    href: "/dashboard/order-history",
    icon: ShoppingBag,
  },
  {
    name: "Teacher Apply",
    href: "/dashboard/teacher-apply",
    icon: GraduationCap,
  },
  {
    name: "Support Tickets",
    href: "/dashboard/support-tickets",
    icon: Headphones,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 text-sm font-bold text-[#1D1D1D]">Main Menu</h3>
      <nav className="space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-[#EBF7F9] text-[#4CC0D8]"
                  : "text-[#666666] hover:bg-[#F8F9FC] hover:text-[#4CC0D8]"
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
        <h3 className="mb-4 text-sm font-bold text-[#1D1D1D]">
          Account Settings
        </h3>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
