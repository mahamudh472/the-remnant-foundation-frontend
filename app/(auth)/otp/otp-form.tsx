"use client"

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getApiErrorMessage } from "@/lib/api/client"
import {
  useCheckOtpMutation,
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "@/hooks/api/use-auth"
import { useAuthStore } from "@/lib/store/auth-store"
import { toast } from "sonner"

const OTP_LENGTH = 4

export function OtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [resendCooldown, setResendCooldown] = useState(0)
  const [source, setSource] = useState<string | null>(null)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const router = useRouter()
  const pendingEmail = useAuthStore((state) => state.pendingEmail)
  const otpFlow = useAuthStore((state) => state.otpFlow)
  const setOtpFlow = useAuthStore((state) => state.setOtpFlow)
  const setVerifiedResetOtp = useAuthStore((state) => state.setVerifiedResetOtp)
  const verifyMutation = useVerifyEmailMutation()
  const checkOtpMutation = useCheckOtpMutation()
  const resendMutation = useResendOtpMutation()
  const flow =
    source === "forgot-password" || source === "register"
      ? source
      : otpFlow || "register"

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSource(params.get("from"))
  }, [])

  useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = window.setTimeout(() => {
      setResendCooldown((previous) => Math.max(previous - 1, 0))
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [resendCooldown])

  const focusAt = (index: number) => {
    if (index >= 0 && index < OTP_LENGTH) {
      inputsRef.current[index]?.focus()
    }
  }

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    if (digit && index < OTP_LENGTH - 1) focusAt(index + 1)
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp]
        next[index] = ""
        setOtp(next)
      } else {
        focusAt(index - 1)
      }
    } else if (e.key === "ArrowLeft") {
      focusAt(index - 1)
    } else if (e.key === "ArrowRight") {
      focusAt(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
    const next = [...otp]
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i]
    }
    setOtp(next)
    focusAt(Math.min(pasted.length, OTP_LENGTH - 1))
  }

  const handleResend = async () => {
    if (!pendingEmail) return

    try {
      await resendMutation.mutateAsync({ email: pendingEmail })
      setResendCooldown(60)
      toast.success("OTP resent successfully")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to resend OTP"))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join("")
    if (code.length < OTP_LENGTH || !pendingEmail) return

    try {
      if (flow === "forgot-password") {
        await checkOtpMutation.mutateAsync({ email: pendingEmail, otp: code })
        setVerifiedResetOtp(code)
        setOtpFlow("forgot-password")
        toast.success("OTP verified successfully")
        router.push("/forgot-password?step=reset")
      } else {
        await verifyMutation.mutateAsync({ email: pendingEmail, otp: code })
        setOtpFlow(null)
        setVerifiedResetOtp(null)
        toast.success("Email verified successfully")
        router.push("/login")
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to verify OTP"))
    }
  }

  const isComplete = otp.every((d) => d !== "")
  const isVerifying =
    flow === "forgot-password"
      ? checkOtpMutation.isPending
      : verifyMutation.isPending

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
          {flow === "forgot-password" ? "Verify OTP" : "Verify your Email"}
        </h1>
        <p className="text-sm text-[#666666]">
          {pendingEmail
            ? `We sent a ${OTP_LENGTH}-digit code to ${pendingEmail}. Enter it below to continue.`
            : "Start from registration or forgot password to continue."}
        </p>
      </div>

      {/* OTP inputs */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="h-14 w-12 rounded-lg border border-[#E5E7EB] bg-white text-center text-xl font-bold text-[#1D1D1D] transition-all focus:border-[#4CC0D8] focus:ring-2 focus:ring-[#4CC0D8]/20 focus:outline-none data-[filled=true]:border-[#4CC0D8]"
              data-filled={digit !== "" ? "true" : "false"}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={!isComplete || isVerifying || !pendingEmail}
          className="h-11 w-full rounded bg-[#4CC0D8] font-semibold text-white hover:bg-[#3AB0C8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </Button>
      </form>

      {/* Resend */}
      <p className="text-center text-sm text-[#666666]">
        Didn&apos;t receive a code?{" "}
        {resendCooldown > 0 ? (
          <span className="font-medium text-[#9CA3AF]">
            Resend in {resendCooldown}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendMutation.isPending || !pendingEmail}
            className="font-medium text-[#4CC0D8] hover:underline disabled:text-[#9CA3AF] disabled:no-underline"
          >
            {resendMutation.isPending ? "Resending..." : "Resend code"}
          </button>
        )}
      </p>

      {/* Back link */}
      <Link
        href={flow === "forgot-password" ? "/forgot-password" : "/login"}
        className="flex items-center justify-center gap-2 text-sm font-medium text-[#666666] hover:text-[#1D1D1D]"
      >
        <ArrowLeft className="h-4 w-4" />
        {flow === "forgot-password"
          ? "Back to Forgot Password"
          : "Back to Login"}
      </Link>
    </div>
  )
}
