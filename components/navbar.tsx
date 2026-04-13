"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DesktopNav } from "@/components/common/desktop-nav"
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Users,
  Compass,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/store/auth-store"
import { useLogoutMutation } from "@/hooks/api/use-auth"

const PUBLIC_NAV_ITEMS = [
  { name: "Home", href: "/", icon: Compass, hasDropdown: false },
  { name: "Programs", href: "/programs", icon: BookOpen, hasDropdown: true },
  { name: "Events", href: "/events", icon: Users, hasDropdown: false },
  {
    name: "Partnership",
    href: "/partnership",
    icon: LayoutDashboard,
    hasDropdown: false,
  },
  { name: "Courses", href: "/courses", icon: BookOpen, hasDropdown: true },
  { name: "Contact", href: "/contact", icon: HelpCircle, hasDropdown: false },
]

const AUTH_NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    hasDropdown: false,
  },
  { name: "All Courses", href: "/courses", icon: BookOpen, hasDropdown: false },
  { name: "Grade", href: "#", icon: Compass, hasDropdown: true },
  {
    name: "Instructors",
    href: "/instructors",
    icon: Users,
    hasDropdown: false,
  },
  { name: "AI Guide", href: "/ai-guide", icon: HelpCircle, hasDropdown: false },
]

const MOBILE_SUB_ITEMS: Record<string, { name: string; href: string }[]> = {
  Programs: [
    { name: "Skills Development School", href: "/programs/skills" },
    { name: "Reform", href: "/programs/reform" },
    { name: "Ignite", href: "/programs/ignite" },
  ],
  Courses: [
    { name: "All Classes", href: "/courses" },
    { name: "Kids (5–10)", href: "/courses?age=kids" },
    { name: "Teen (14–18)", href: "/courses?age=teen" },
    { name: "Young Adults (19–25)", href: "/courses?age=young-adults" },
  ],
}

const TEACHER_NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
    hasDropdown: false,
  },
  {
    name: "Courses",
    href: "/teacher/courses",
    icon: BookOpen,
    hasDropdown: false,
  },
  {
    name: "Live Classes",
    href: "/teacher/live-classes",
    icon: Users,
    hasDropdown: false,
  },
  {
    name: "Student!",
    href: "/teacher/students",
    icon: Compass,
    hasDropdown: false,
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null)
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false)
  const { isLoggedIn, user } = useAuthStore()
  const logoutMutation = useLogoutMutation()
  const pathname = usePathname()
  const isTeacher = user?.role === "teacher"
  const navItems = !isLoggedIn
    ? PUBLIC_NAV_ITEMS
    : isTeacher
      ? TEACHER_NAV_ITEMS
      : AUTH_NAV_ITEMS

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100/50 bg-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="The Remnant Foundation Logo"
              width={20}
              height={20}
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold tracking-tight text-[#1D1D1D]">
              Remnant
            </span>
          </Link>

          {/* Desktop Navigation — public (logged out) */}
          {!isLoggedIn && <DesktopNav />}

          {/* Desktop Navigation — logged in */}
          {isLoggedIn && (
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-[#4CC0D8]",
                    pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                      ? "text-[#4CC0D8]"
                      : "text-[#1D1D1D]"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <div className="hidden items-center gap-4 sm:flex">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="font-semibold text-[#1D1D1D] hover:bg-gray-100"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#4CC0D8] px-4 font-semibold text-white hover:bg-[#3AB0C8]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#F8F9FC] p-1.5 pr-4 transition-all hover:border-[#4CC0D8]/30"
                  >
                    <div className="relative h-9 w-9">
                      <Image
                        src="/assets/pngs/Profile.png"
                        alt="User"
                        width={36}
                        height={36}
                        className="rounded-full border-2 border-white shadow-sm"
                      />
                      <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-400" />
                    </div>
                    <div className="hidden text-left md:block">
                      <p className="text-xs font-bold text-[#1D1D1D]">
                        {user?.name ?? "User"}
                      </p>
                      <p className="text-[10px] font-medium text-[#9CA3AF] capitalize">
                        {user?.role ?? "Student"}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-[#9CA3AF] transition-transform",
                        showProfileDropdown && "rotate-180"
                      )}
                    />
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-4 flex w-60 animate-in flex-col gap-1 rounded-3xl border border-gray-100 bg-white p-3 shadow-2xl ring-1 shadow-gray-200/50 ring-black/5 duration-200 fade-in zoom-in">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-center gap-3 rounded-xl p-3 text-sm font-bold text-[#1D1D1D] transition-colors hover:bg-[#F8F9FC]"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-50 bg-white text-[#9CA3AF] transition-all group-hover:border-[#4CC0D8]/20 group-hover:text-[#4CC0D8]">
                            {item.icon && <item.icon className="h-4 w-4" />}
                          </div>
                          {item.name}
                        </Link>
                      ))}
                      <div className="my-2 h-px bg-gray-50" />
                      <button
                        onClick={() => {
                          logoutMutation.mutate()
                          setShowProfileDropdown(false)
                        }}
                        disabled={logoutMutation.isPending}
                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-50 bg-white text-red-400 transition-all group-hover:bg-red-500 group-hover:text-white">
                          <LogOut className="h-4 w-4" />
                        </div>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                  setExpandedItem(null)
                }}
                className="inline-flex items-center justify-center rounded-xl border border-gray-100 bg-white p-2 text-[#1D1D1D] shadow-sm hover:bg-gray-50"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="animate-in border-t border-gray-100 bg-white/95 backdrop-blur-md duration-300 slide-in-from-top lg:hidden">
          <div className="space-y-1 px-4 py-6">
            {navItems.map((item) => {
              const subItems = MOBILE_SUB_ITEMS[item.name]
              const isExpanded = expandedItem === item.name
              const isActive =
                item.href !== "#" &&
                (pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href)))

              if (item.hasDropdown && subItems) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        setExpandedItem(isExpanded ? null : item.name)
                      }
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-4 text-base font-bold transition-all",
                        isExpanded || isActive
                          ? "bg-[#EBF7F9] text-[#4CC0D8]"
                          : "text-[#1D1D1D] hover:bg-gray-50"
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && (
                      <div className="mt-1 mb-2 ml-3 space-y-0.5 border-l-2 border-[#4CC0D8]/20 pl-3">
                        {subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                              pathname === sub.href
                                ? "text-[#4CC0D8]"
                                : "text-[#666666] hover:text-[#4CC0D8]"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-4 text-base font-bold transition-all",
                    isActive
                      ? "bg-[#EBF7F9] text-[#4CC0D8]"
                      : "text-[#1D1D1D] hover:bg-gray-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            {!isLoggedIn && (
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-xl border-gray-200 font-bold text-[#1D1D1D]"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="h-12 w-full rounded-xl bg-[#4CC0D8] font-bold text-white hover:bg-[#3AB0C8]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
