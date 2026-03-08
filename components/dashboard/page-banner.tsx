"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

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
}

export function PageBanner() {
  const pathname = usePathname()

  // Handle nested routes like /dashboard/enrolled-courses/[slug]
  const baseRoute = Object.keys(PAGE_TITLES)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.startsWith(route))

  const title = baseRoute ? PAGE_TITLES[baseRoute] : "Dashboard"

  // Build breadcrumb from path
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label =
      PAGE_TITLES[href] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    return { label, href }
  })

  return (
    <div className="w-full bg-gradient-to-r from-[#0A2342] to-[#1A4B7A] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <Link
            href="/"
            className="text-gray-300 transition-colors hover:text-white"
          >
            Home
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span className="text-[#F59E0B]">—</span>
              {i === breadcrumbs.length - 1 ? (
                <span className="text-gray-400">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
