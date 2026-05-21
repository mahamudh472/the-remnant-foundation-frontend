"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Eye, EyeClosed } from "lucide-react"
import { useRouter } from "next/navigation"
import { getApiErrorMessage } from "@/lib/api/client"
import {
  useGoogleSignInUrlMutation,
  useRegisterMutation,
} from "@/hooks/api/use-auth"
import { useAuthStore } from "@/lib/store/auth-store"
import { toast } from "sonner"

const GOOGLE_STATE_STORAGE_KEY = "google-auth-state"

export function CreateAccountForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const registerMutation = useRegisterMutation()
  const setOtpFlow = useAuthStore((state) => state.setOtpFlow)
  const setVerifiedResetOtp = useAuthStore((state) => state.setVerifiedResetOtp)
  const googleSignInUrlMutation = useGoogleSignInUrlMutation()

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await registerMutation.mutateAsync({
        full_name: fullName,
        email,
        password,
      })
      setOtpFlow("register")
      setVerifiedResetOtp(null)
      toast.success("OTP sent to your email")
      router.push("/otp?from=register")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to create account"))
    }
  }

    const handleGoogleSignIn = async () => {
      try {
        const response = await googleSignInUrlMutation.mutateAsync()

        // Store the state in sessionStorage for the callback
        sessionStorage.setItem(GOOGLE_STATE_STORAGE_KEY, response.state)

        // Also store redirectTo if it exists
        const redirectToParam = new URLSearchParams(window.location.search).get(
          "redirectTo"
        )
        if (redirectToParam) {
          sessionStorage.setItem("google-auth-redirect", redirectToParam)
        }

        // Redirect to Google's OAuth URL
        window.location.href = response.url
      } catch (error) {
        toast.error(
          getApiErrorMessage(error, "Failed to initiate Google sign-in")
        )
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
          Create an account
        </h1>
      </div>

      {/* Google Signup */}
      <Button
        type="button"
        variant="outline"
        disabled={googleSignInUrlMutation.isPending}
        className="flex h-11 w-full hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleGoogleSignIn}
      >
        {googleSignInUrlMutation.isPending ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#4CC0D8]"></div>
            <span className="font-medium text-[#1D1D1D]">Signing in...</span>
          </>
        ) : (
          <>
            <Image
              src="/assets/svgs/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              priority
            />
            <span className="font-medium text-[#1D1D1D]">
              Sign up with Google
            </span>
          </>
        )}
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
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
        >
          {registerMutation.isPending ? "Creating account..." : "Sign up"}
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
