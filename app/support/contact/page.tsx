"use client"

import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ContactSupportPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Support request submitted")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/support"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#666666] transition-colors hover:text-[#4CC0D8]"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Support
          </Link>

          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">Contact Support</h1>
            <p className="text-[#666666]">Fill out the form below and our team will get back to you</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-semibold text-[#1D1D1D]">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    defaultValue="Sarah Thompson"
                    className="w-full h-14 rounded-xl border border-gray-100 bg-[#f3f4f6]/50 px-5 text-[#1D1D1D] font-medium outline-none"
                    readOnly
                  />
                </div>
                <p className="text-[11px] text-[#9CA3AF]">Auto-filled from your account</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#1D1D1D]">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    defaultValue="sarah.thompson@email.com"
                    className="w-full h-14 rounded-xl border border-gray-100 bg-[#f3f4f6]/50 px-5 text-[#1D1D1D] font-medium outline-none"
                    readOnly
                  />
                </div>
                <p className="text-[11px] text-[#9CA3AF]">Auto-filled from your account</p>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-semibold text-[#1D1D1D]">Role</label>
                <select
                  id="role"
                  className="w-full h-14 rounded-xl border border-gray-100 px-5 text-[#666666] outline-none focus:border-[#4CC0D8] transition-all bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled selected>Select Role</option>
                  <option value="learner">Learner</option>
                  <option value="teacher">Teacher</option>
                  <option value="guardian">Guardian</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Issue Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-semibold text-[#1D1D1D]">Issue Category</label>
                <select
                  id="category"
                  className="w-full h-14 rounded-xl border border-gray-100 px-5 text-[#666666] outline-none focus:border-[#4CC0D8] transition-all bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled selected>Select Category</option>
                  <option value="account">Account & Access</option>
                  <option value="course">Course & Progress</option>
                  <option value="payment">Payment & Subscription</option>
                  <option value="technical">Technical Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#1D1D1D]">Message</label>
                <textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  className="w-full h-48 rounded-xl border border-gray-100 p-5 text-[#1D1D1D] outline-none focus:border-[#4CC0D8] transition-all resize-none"
                  required
                ></textarea>
                <p className="text-[11px] text-[#9CA3AF]">Provide as much detail as possible to help us assist you faster</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col-reverse sm:flex-row items-center gap-4 sm:justify-between border-t border-gray-50">
              <Link href="/support">
                <Button variant="outline" className="w-full sm:w-auto h-12 rounded-xl border-gray-200 text-[#666666] px-10 font-bold">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="w-full sm:w-auto h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white px-10 rounded-xl font-bold shadow-lg shadow-[#4CC0D8]/20 flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
