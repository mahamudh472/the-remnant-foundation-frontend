"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowLeftRight, ChevronRight } from "lucide-react"
import { useAuthStore } from "@/lib/store/auth-store"
import { Button } from "./ui/button"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/profile": "My Profile",
  "/dashboard/enrolled-courses": "Enrolled Courses",
  "/dashboard/live-classes": "Live Classes",
  "/dashboard/certificates": "My Certificates",
  "/dashboard/wishlist": "Wishlist",
  "/dashboard/quiz-attempts": "My Quiz Attempts",
  "/dashboard/order-history": "Order History",
  "/dashboard/teacher-apply": "Teacher Apply",
  "/dashboard/support-tickets": "Support Tickets",
  "/teacher": "Dashboard",
  "/teacher/profile": "My Profile",
  "/teacher/courses": "Courses",
  "/teacher/courses/add": "Add Course",
  "/teacher/assignments": "Assignments",
  "/teacher/assignments/add": "Add Assignment",
  "/teacher/students": "Students",
  "/teacher/quiz": "Quiz",
  "/teacher/certificates": "Certificates",
  "/teacher/follow-up": "Follow-Up",
  "/teacher/support-tickets": "Support Tickets",
  "/teacher/live-classes": "Live Classes",
  "/teacher/live-classes/create": "Create Live Classes",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, switchRole } = useAuthStore()

  //   const isTeacher = user?.role === "teacher"
  const isTeacher = pathname.startsWith("/teacher")

  const handleSwitch = () => {
    switchRole()
    router.push(pathname === "/teacher" ? "/dashboard" : "/teacher")
  }

  // Find the best matching title
  const baseRoute = Object.keys(PAGE_TITLES)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.startsWith(route))

  const title = baseRoute ? PAGE_TITLES[baseRoute] : "Dashboard"

  return (
    <div className="flex items-center justify-between pt-4">
      <nav className="flex items-center text-sm">
        <Link
          href="/"
          className="font-bold text-[#1D1D1D] hover:text-[#4CC0D8]"
        >
          Home
        </Link>
        <ChevronRight height={16} />
        <span className="text-gray-500">{title}</span>
      </nav>

      <div className="flex items-center gap-3 rounded-2xl bg-primary/10 px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-sm font-medium text-[#1D1D1D]">
            {isTeacher ? "Teacher" : "Student"}
          </span>
        </div>
        <span className="text-gray-300">|</span>
        <Button
          onClick={handleSwitch}
          variant={"ghost"}
          className="text-gray-500"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Switch to {isTeacher ? "Student" : "Teacher"}
        </Button>
      </div>
    </div>
  )
}
