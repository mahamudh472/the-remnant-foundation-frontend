"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function CreateAccountForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement create account logic
    console.log("Create Account:", { fullName, email, password })
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

      {/* Title */}
      <div className="space-y-2 text-center">
        <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1D]">
          Create a account
        </h1>
        <p className="text-sm text-[#666666]">
          See what is going on with your business
        </p>
      </div>

      {/* Google Signup */}
      <Button
        variant="outline"
        className="flex h-11 w-full items-center justify-center gap-2 border-[#E5E7EB] transition-colors hover:bg-gray-50"
        onClick={() => console.log("Google signup")}
      >
        <Image
          src="/assets/svgs/google.svg"
          alt="Login Illustration"
          width={20}
          height={20}
          priority
        />
        <span className="font-medium text-[#1D1D1D]">Sign up with Google</span>
      </Button>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#E5E7EB]"></span>
        </div>
        <div className="relative flex justify-center text-[11px] font-medium tracking-widest uppercase">
          <span className="bg-white px-4 text-[#9CA3AF]">
            or sign up with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-[#1D1D1D]"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11 w-full rounded border border-[#E5E7EB] bg-white px-4 py-2 text-sm placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4CC0D8] focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

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

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#1D1D1D]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded border border-[#E5E7EB] bg-white px-4 py-2 text-sm transition-all placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4CC0D8] focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]"
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
        >
          Sign up
        </Button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-[#666666]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#4CC0D8] hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  )
}
