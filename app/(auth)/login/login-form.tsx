"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getApiErrorMessage } from "@/lib/api/client"
import { useLoginMutation } from "@/hooks/api/use-auth"
import { toast } from "sonner"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const loginMutation = useLoginMutation()

  const AUTH_ROUTE_PREFIXES = [
    "/login",
    "/signup",
    "/create-account",
    "/forgot-password",
    "/otp",
  ]

  const isAllowedRedirectPath = (path: string) => {
    if (!path.startsWith("/") || path.startsWith("//")) {
      return false
    }

    return !AUTH_ROUTE_PREFIXES.some(
      (prefix) =>
        path === prefix ||
        path.startsWith(`${prefix}/`) ||
        path.startsWith(`${prefix}?`)
    )
  }

  const getPostLoginRedirectPath = () => {
    if (typeof window === "undefined") {
      return "/dashboard"
    }

    const redirectToParam = new URLSearchParams(window.location.search).get(
      "redirectTo"
    )

    if (redirectToParam && isAllowedRedirectPath(redirectToParam)) {
      return redirectToParam
    }

    return "/dashboard"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await loginMutation.mutateAsync({ email, password })
      toast.success("Logged in successfully")
      router.push(getPostLoginRedirectPath())
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to log in"))
    }
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
          Login to your Account
        </h1>
        <p className="text-sm text-[#666666]">
          See what is going on with your business
        </p>
      </div>

      {/* Google Login */}
      <Button
        variant="outline"
        className="flex h-11 w-full items-center justify-center gap-2 border-[#E5E7EB] transition-colors hover:bg-gray-50"
        onClick={() => console.log("Google login")}
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
            or sign in with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#1D1D1D]"
            >
              Email
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

        <div className="flex items-center justify-between">
          <label className="group flex cursor-pointer items-center gap-2">
            <div className="relative flex items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="h-5 w-5 rounded border border-[#E5E7EB] bg-white transition-all peer-checked:border-[#4CC0D8] peer-checked:bg-[#4CC0D8]"></div>
              <svg
                className="absolute left-0.5 h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm text-[#666666]">Remember Me</span>
          </label>
          <Link
            href="/forgot-password"
            title="Forgot Password?"
            className="text-sm text-[#4CC0D8] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Sign up link */}
      <p className="text-center text-sm text-[#666666]">
        New Registration?{" "}
        <Link
          href="/create-account"
          className="font-medium text-[#4CC0D8] hover:underline"
        >
          Create account here
        </Link>
      </p>
    </div>
  )
}
