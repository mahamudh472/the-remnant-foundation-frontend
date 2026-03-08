"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  User,
  Bell,
  LogOut,
  Settings,
  LayoutDashboard,
  BookOpen,
  Users,
  Compass,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const PUBLIC_NAV_ITEMS = [
  { name: "Home", href: "/", icon: Compass, hasDropdown: false },
  { name: "Programs", href: "/programs", icon: BookOpen, hasDropdown: true },
  { name: "events", href: "/events", icon: Users, hasDropdown: false },
  {
    name: "Partnership",
    href: "/partnership",
    icon: LayoutDashboard,
    hasDropdown: true,
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

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(true) // Simulating logged in state
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100/50 bg-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="The Remnant Foundation Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold tracking-tight text-[#1D1D1D]">
              Remnant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {(isLoggedIn ? AUTH_NAV_ITEMS : PUBLIC_NAV_ITEMS).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-bold transition-colors hover:text-[#4CC0D8]",
                  pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-[#4CC0D8]"
                    : "text-[#1D1D1D]"
                )}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <div className="hidden items-center gap-4 sm:flex">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-bold text-[#1D1D1D] hover:bg-transparent hover:text-[#4CC0D8]"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="h-10 rounded-lg bg-[#4CC0D8] px-6 font-bold text-white shadow-lg shadow-[#4CC0D8]/20 hover:bg-[#3AB0C8]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Cart */}
                <button className="relative rounded-xl p-2.5 text-[#1D1D1D] transition-all hover:bg-gray-50">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#4CC0D8] text-[10px] font-bold text-white">
                    1
                  </span>
                </button>

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
                        Mosabbir
                      </p>
                      <p className="text-[10px] font-medium text-[#9CA3AF]">
                        Student
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
                      {AUTH_NAV_ITEMS.map((item) => (
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
                      <button className="group flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-bold text-red-500 transition-colors hover:bg-red-50">
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
                onClick={() => setIsOpen(!isOpen)}
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
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-xl px-3 py-4 text-base font-bold transition-all",
                  pathname === item.href
                    ? "bg-[#EBF7F9] text-[#4CC0D8]"
                    : "text-[#1D1D1D] hover:bg-gray-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-between">
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  )}
                </div>
              </Link>
            ))}
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
