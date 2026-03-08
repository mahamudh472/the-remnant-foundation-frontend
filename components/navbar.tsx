"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Programs", href: "/programs", hasDropdown: false },
  { name: "People", href: "#", hasDropdown: true },
  { name: "Partnership", href: "#", hasDropdown: true },
  { name: "Courses", href: "#", hasDropdown: true },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="The Remnant Foundation Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold tracking-tight text-[#1D1D1D]">
            The <span className="text-[#4CC0D8]">Remnant</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-[#666666] transition-colors hover:text-[#4CC0D8]"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/login">
            <Button variant="outline" className="h-10 border-[#4CC0D8] text-[#4CC0D8] hover:bg-[#F3FBFC] hover:text-[#3AB0C8] px-6">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="h-10 bg-[#4CC0D8] text-white hover:bg-[#3AB0C8] px-6">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#666666] hover:text-[#4CC0D8]"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white p-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-[#666666] hover:text-[#4CC0D8]"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-[#4CC0D8] text-[#4CC0D8]">
                  Login
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#4CC0D8] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
