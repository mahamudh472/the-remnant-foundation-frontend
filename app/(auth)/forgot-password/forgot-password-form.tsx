"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: call reset-password API
    setSubmitted(true)
  }

  return (
    <div className="w-full max-w-[400px] space-y-8">
      {/* Logo */}
      <div className="mb-10 flex justify-center">
        <Image
          src="/assets/logo.png"
          alt="The Remnant Foundation Logo"
          width={60}
          height={60}
          priority
        />
      </div>

      {submitted ? (
        /* ── Success state ── */
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF7F9]">
              <CheckCircle2 className="h-8 w-8 text-[#4CC0D8]" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1D]">
              Check your inbox
            </h1>
            <p className="text-sm text-[#666666]">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-semibold text-[#1D1D1D]">{email}</span>.
              Follow the instructions in the email to reset your password.
            </p>
          </div>
          <Button
            asChild
            className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
          >
            <Link href="/login">Back to Login</Link>
          </Button>
          <p className="text-sm text-[#666666]">
            Didn&apos;t receive the email?{" "}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="font-medium text-[#4CC0D8] hover:underline"
            >
              Try again
            </button>
          </p>
        </div>
      ) : (
        /* ── Form state ── */
        <>
          <div className="space-y-2 text-center">
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1D]">
              Forgot Password?
            </h1>
            <p className="text-sm text-[#666666]">
              No worries! Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#1D1D1D]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded border border-[#E5E7EB] bg-white px-4 py-2 text-sm placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4CC0D8] focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
            >
              Send Reset Link
            </Button>
          </form>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-[#666666] hover:text-[#1D1D1D]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </>
      )}
    </div>
  )
}
