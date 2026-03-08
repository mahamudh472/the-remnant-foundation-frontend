"use client"

import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQ_CATEGORIES = [
  {
    title: "Account & Login",
    items: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page. Enter your email and follow the instructions sent to your inbox. Password reset links expire in 24 hours.",
      },
      {
        q: "Why is my account pending approval?",
        a: "Users under 18 require guardian approval. Our team typically reviews and approves accounts within 1-2 business days.",
      },
      {
        q: "How do I enable Multi-Factor Authentication?",
        a: "Go to Settings > Security > Enable MFA. You will need a compatible authenticator app like Google Authenticator or Authy.",
      },
    ],
  },
  {
    title: "Courses & Progress",
    items: [
      {
        q: "How do I enroll in a course?",
        a: "Browse the Course Catalog, click on a course you're interested in, and click the 'Enroll Now' button. Many courses offer the first few lessons for free.",
      },
      {
        q: "Why can't I access a lesson?",
        a: "Lessons often unlock sequentially. Ensure you have completed all previous lessons and quizzes in the course track.",
      },
      {
        q: "How is my progress tracked?",
        a: "Progress is automatically saved as you watch videos (80% minimum) and submit quiz answers. You can view your completion percentage on your dashboard.",
      },
    ],
  },
  {
    title: "Quizzes & Certificates",
    items: [
      {
        q: "What is the passing score for quizzes?",
        a: "The passing score for most quizzes is 70%. Be sure to read the specific instructions at the start of each quiz.",
      },
      {
        q: "How many times can I retake a quiz?",
        a: "Most quizzes allow up to 3 attempts. If you fail after 3 attempts, you may need to reach out to course support for a reset.",
      },
      {
        q: "When do I receive my certificate?",
        a: "Certificates are automatically generated and available for download once you have completed 100% of the course content and passed all required quizzes.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({
    "Account & Login-0": true,
  })

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/support"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#666666] transition-colors hover:text-[#4CC0D8]"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Support
          </Link>

          {/* Header */}
          <div className="mb-16 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">Frequently Asked Questions</h1>
            <p className="text-[#666666]">Find quick answers to common questions</p>
          </div>

          {/* Categories */}
          <div className="space-y-16">
            {FAQ_CATEGORIES.map((category) => (
              <div key={category.title} className="space-y-6">
                <h2 className="text-xl font-bold text-[#1D1D1D]">{category.title}</h2>
                <div className="space-y-4">
                  {category.items.map((item, idx) => {
                    const isOpen = openItems[`${category.title}-${idx}`]
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "rounded-xl border transition-all overflow-hidden",
                          isOpen ? "border-[#4CC0D8] bg-[#f8fcfd]" : "border-gray-100 bg-white hover:border-[#4CC0D8]/50"
                        )}
                      >
                        <button
                          onClick={() => toggleItem(category.title, idx)}
                          className="flex w-full items-center justify-between p-5 text-left md:p-6"
                        >
                          <span className={cn("font-semibold transition-colors", isOpen ? "text-[#4CC0D8]" : "text-[#1D1D1D]")}>
                            {item.q}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-[#4CC0D8]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-[#9CA3AF]" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 md:px-6 md:pb-6 animate-in slide-in-from-top-1">
                            <p className="text-sm leading-relaxed text-[#666666]">{item.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center space-y-8">
            <p className="text-sm font-medium text-[#666666]">Still need help? Contact our support team</p>
            <Link href="/support/contact">
              <Button className="h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white px-10 rounded-xl font-bold shadow-lg shadow-[#4CC0D8]/20">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
