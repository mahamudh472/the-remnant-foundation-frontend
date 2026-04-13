"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { getApiErrorMessage } from "@/lib/api/client"
import {
  useForgotPasswordMutation,
  usePasswordResetConfirmMutation,
} from "@/hooks/api/use-auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"
import { toast } from "sonner"

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export function ForgotPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pendingEmail = useAuthStore((state) => state.pendingEmail)
  const otpFlow = useAuthStore((state) => state.otpFlow)
  const verifiedResetOtp = useAuthStore((state) => state.verifiedResetOtp)
  const setOtpFlow = useAuthStore((state) => state.setOtpFlow)
  const setVerifiedResetOtp = useAuthStore((state) => state.setVerifiedResetOtp)
  const clearPendingEmail = useAuthStore((state) => state.clearPendingEmail)

  const [email, setEmail] = useState(pendingEmail ?? "")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const isResetStep = searchParams.get("step") === "reset"
  const canResetPassword =
    isResetStep &&
    otpFlow === "forgot-password" &&
    Boolean(pendingEmail) &&
    Boolean(verifiedResetOtp)

  const forgotPasswordMutation = useForgotPasswordMutation()
  const resetPasswordMutation = usePasswordResetConfirmMutation()

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    try {
      await forgotPasswordMutation.mutateAsync({ email })
      setOtpFlow("forgot-password")
      setVerifiedResetOtp(null)
      toast.success("OTP sent to your email")
      router.push("/otp?from=forgot-password")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to send OTP"))
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!PASSWORD_RULE.test(newPassword)) {
      const message =
        "Password must be at least 8 characters and include uppercase, lowercase, and a number."
      setFormError(message)
      toast.error(message)
      return
    }

    if (newPassword !== confirmPassword) {
      const message = "New password and confirm password must match."
      setFormError(message)
      toast.error(message)
      return
    }

    if (!pendingEmail || !verifiedResetOtp) {
      const message = "Please verify your OTP again before resetting password."
      setFormError(message)
      toast.error(message)
      return
    }

    try {
      await resetPasswordMutation.mutateAsync({
        email: pendingEmail,
        otp: verifiedResetOtp,
        new_password: newPassword,
      })
      setVerifiedResetOtp(null)
      setOtpFlow(null)
      clearPendingEmail()
      toast.success("Password reset successful")
      router.push("/login")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to reset password"))
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

      {isResetStep ? (
        canResetPassword ? (
          <>
            <div className="space-y-2">
              <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1D]">
                Reset Password
              </h1>
              <p className="text-sm text-[#666666]">
                Set a new password for{" "}
                <span className="font-semibold text-[#1D1D1D]">
                  {pendingEmail}
                </span>
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="new-password"
                  className="mb-2 block text-sm font-medium text-[#1D1D1D]"
                >
                  New password
                </label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-11 rounded border-[#E5E7EB] bg-white px-4 py-2 pr-11 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#4CC0D8] focus-visible:ring-1 focus-visible:ring-[#4CC0D8]/40"
                    placeholder="Enter new password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowNewPassword((value) => !value)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-[#9CA3AF] hover:bg-transparent hover:text-[#4CC0D8]"
                    aria-label={
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-[#1D1D1D]"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 rounded border-[#E5E7EB] bg-white px-4 py-2 pr-11 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#4CC0D8] focus-visible:ring-1 focus-visible:ring-[#4CC0D8]/40"
                    placeholder="Confirm new password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-[#9CA3AF] hover:bg-transparent hover:text-[#4CC0D8]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-[#666666]">
                  Must be at least 8 characters with uppercase, lowercase, and a
                  number.
                </p>
              </div>

              {formError && (
                <p className="text-sm font-medium text-red-500">{formError}</p>
              )}

              <Button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
              >
                {resetPasswordMutation.isPending
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1D]">
                OTP verification required
              </h1>
              <p className="text-sm text-[#666666]">
                Please request an OTP and verify it first before resetting your
                password.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
            >
              Start again
            </Button>
          </div>
        )
      ) : (
        <>
          <div className="space-y-2 text-center">
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1D]">
              Forgot Password?
            </h1>
            <p className="text-sm text-[#666666]">
              No worries! Enter your email and we&apos;ll send you an OTP.
            </p>
          </div>

          <form onSubmit={handleRequestOtp} className="space-y-6">
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
              disabled={forgotPasswordMutation.isPending}
              className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8]"
            >
              {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
            </Button>

            {formError && (
              <p className="text-sm font-medium text-red-500">{formError}</p>
            )}
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
