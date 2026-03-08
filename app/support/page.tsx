"use client"

import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  Lock,
  ShieldCheck,
  CreditCard,
  Users,
  BookOpen,
  HelpCircle,
  Award,
  TrendingUp,
  MessageSquare,
  LifeBuoy
} from "lucide-react"
import { cn } from "@/lib/utils"

const HELP_SECTIONS = [
  {
    title: "Account & Access Help",
    items: [
      {
        icon: Lock,
        title: "Reset Password",
        steps: [
          "Go to the login page and click 'Forgot Password'",
          "Enter your email address",
          "Check your email for the reset link",
          "Create a new password (minimum 8 characters)",
          "Password reset links expire in 24 hours."
        ]
      },
      {
        icon: ShieldCheck,
        title: "Multi-Factor Authentication Help",
        content: "Enable MFA: Go to Settings > Security > Enable MFA. Lost access to authenticator app? Contact support with your account details. Backup codes are provided during setup - keep them safe. MFA is required for Admin and Guardian accounts."
      },
      {
        icon: CreditCard,
        title: "Subscription & Access Explanation",
        content: "Free Access: First 3 lessons per course, limited quizzes, no certificates. Premium Access: Full course library, all quizzes, certificates (Coming Soon). Partner Access: For organizations sponsoring group learning. Upgrade anytime from your dashboard."
      },
      {
        icon: Users,
        title: "Guardian Approval Help",
        content: "Users under 18 require guardian approval. Guardian receives approval email within 1 hour of registration. Approval typically takes 1-2 business days. Check spam folder if email not received. Contact support if approval is delayed beyond 3 days."
      }
    ]
  },
  {
    title: "Courses & Learning Help",
    items: [
      {
        icon: BookOpen,
        title: "How to Enroll in a Course",
        steps: [
          "Browse courses from your dashboard",
          "Click on a course to view details",
          "Click 'Enroll Now' button",
          "Free users: Access first 3 lessons",
          "Premium users: Full access to all lessons"
        ]
      },
      {
        icon: HelpCircle,
        title: "Quiz Not Showing / Failed Attempt",
        content: "Quiz not appearing: Complete the lesson video first (watch 80%). Failed quiz: Review lesson content and try again. Default attempts: 3 per quiz. View correct answers after all attempts used. Passing score: Usually 70% (check quiz instructions)."
      },
      {
        icon: Award,
        title: "Certificate Not Generated",
        content: "Certificates require: All lessons completed + All quizzes passed. Check your progress: Dashboard > Course > View Progress. Missing lessons? Complete any locked lessons first. Failed quizzes? Retake to achieve passing score. Still no certificate after 24 hours? Contact support."
      },
      {
        icon: TrendingUp,
        title: "Progress Not Updating",
        content: "Video progress: Must watch 80% minimum to mark complete. Quiz progress: Submit answers to save progress. Try refreshing the page. Clear browser cache if issue persists. Progress syncs automatically - may take 1-2 minutes."
      }
    ]
  }
]

export default function SupportHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#666666] transition-colors hover:text-[#4CC0D8]"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-16 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[#1D1D1D] tracking-tight">Support Documentation</h1>
            <p className="text-[#666666] text-lg">Solutions for login, subscription, and course related issues</p>
          </div>

          {/* Help Sections */}
          <div className="space-y-24">
            {HELP_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-12">
                <h2 className="text-2xl font-bold text-[#1D1D1D] border-b border-gray-100 pb-4">{section.title}</h2>
                <div className="space-y-12">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="shrink-0 h-10 w-10 rounded-xl bg-[#EBF7F9] text-[#4CC0D8] flex items-center justify-center transition-transform group-hover:scale-110">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#1D1D1D]">{item.title}</h3>
                        {item.steps ? (
                          <ol className="list-decimal list-outside ml-4 space-y-2">
                            {item.steps.map((step, sIdx) => (
                              <li key={sIdx} className="text-sm text-[#666666] leading-relaxed pl-2">{step}</li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-sm text-[#666666] leading-relaxed max-w-2xl">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Tips */}
            <div className="bg-[#f8fcfd] rounded-3xl p-8 md:p-12 border border-[#4CC0D8]/10 space-y-8">
              <h2 className="text-xl font-bold text-[#1D1D1D] flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-[#4CC0D8]" />
                Quick Tips
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Lessons unlock sequentially - complete in order",
                  "Watch videos to at least 80% for progress to save",
                  "Quizzes appear after lesson completion",
                  "Certificates generate automatically when course is 100% complete",
                  "Use 'Resume' button to continue where you left off"
                ].map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[#666666] leading-relaxed">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#4CC0D8] mt-2 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-20 text-center space-y-12 border-t border-gray-100">
              <p className="text-sm font-medium text-[#666666]">Still need assistance?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/support/faq">
                  <Button variant="outline" className="h-12 border-gray-200 text-[#1D1D1D] px-10 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    View FAQs
                  </Button>
                </Link>
                <Link href="/support/contact">
                  <Button className="h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white px-10 rounded-xl font-bold shadow-lg shadow-[#4CC0D8]/20 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
