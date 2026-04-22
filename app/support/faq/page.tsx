"use client"

import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

import { useFAQsQuery } from "@/hooks/api/use-public"

export default function FAQPage() {
  const { data: faqCategories, isLoading } = useFAQsQuery()
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (faqCategories && faqCategories.length > 0) {
      setOpenItems({
        [`${faqCategories[0].name}-0`]: true,
      })
    }
  }, [faqCategories])

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
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-6 w-48 animate-pulse rounded bg-gray-100" />
                    <div className="h-16 animate-pulse rounded-xl bg-gray-50" />
                    <div className="h-16 animate-pulse rounded-xl bg-gray-50" />
                  </div>
                ))}
              </div>
            ) : (
              faqCategories?.map((category) => (
                <div key={category.id} className="space-y-6">
                  <h2 className="text-xl font-bold text-[#1D1D1D]">{category.name}</h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, idx) => {
                      const isOpen = openItems[`${category.name}-${idx}`]
                      return (
                        <div
                          key={faq.id}
                          className={cn(
                            "rounded-xl border transition-all overflow-hidden",
                            isOpen ? "border-[#4CC0D8] bg-[#f8fcfd]" : "border-gray-100 bg-white hover:border-[#4CC0D8]/50"
                          )}
                        >
                          <button
                            onClick={() => toggleItem(category.name, idx)}
                            className="flex w-full items-center justify-between p-5 text-left md:p-6"
                          >
                            <span className={cn("font-semibold transition-colors", isOpen ? "text-[#4CC0D8]" : "text-[#1D1D1D]")}>
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-[#4CC0D8]" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-[#9CA3AF]" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 md:px-6 md:pb-6 animate-in slide-in-from-top-1">
                              <p className="text-sm leading-relaxed text-[#666666]">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
            {!isLoading && (!faqCategories || faqCategories.length === 0) && (
              <div className="text-center py-20 bg-gray-50 rounded-3xl">
                <p className="text-[#666666]">No FAQs available at the moment.</p>
              </div>
            )}
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
