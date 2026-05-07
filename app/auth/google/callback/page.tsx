"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useGoogleCallbackMutation } from "@/hooks/api/use-auth"
import { getApiErrorMessage } from "@/lib/api/client"

const GOOGLE_STATE_STORAGE_KEY = "google-auth-state"
const GOOGLE_REDIRECT_STORAGE_KEY = "google-auth-redirect"

const AUTH_ROUTE_PREFIXES = [
  "/login",
  "/signup",
  "/create-account",
  "/forgot-password",
  "/otp",
]

function isAllowedRedirectPath(path: string) {
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

export default function GoogleCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const googleCallbackMutation = useGoogleCallbackMutation()
  const [isProcessing, setIsProcessing] = useState(true)
  const hasProcessedRef = useRef(false)

  useEffect(() => {
    if (hasProcessedRef.current) {
      return
    }
    hasProcessedRef.current = true

    const handleCallback = async () => {
      try {
        // Extract code from query params
        const code = searchParams.get("code")
        if (!code) {
          toast.error("No authorization code received from Google")
          setIsProcessing(false)
          router.push("/login")
          return
        }

        // Retrieve state from sessionStorage
        const storedState = sessionStorage.getItem(GOOGLE_STATE_STORAGE_KEY)
        if (!storedState) {
          toast.error(
            "Session state expired. Please restart the Google sign-in process."
          )
          setIsProcessing(false)
          router.push("/login")
          return
        }

        // Get stored redirect path if available
        const storedRedirect = sessionStorage.getItem(
          GOOGLE_REDIRECT_STORAGE_KEY
        )

        // Clear the stored values now that we're using them
        sessionStorage.removeItem(GOOGLE_STATE_STORAGE_KEY)
        sessionStorage.removeItem(GOOGLE_REDIRECT_STORAGE_KEY)

        // Call the Google callback API
        const response = await googleCallbackMutation.mutateAsync({
          code,
          state: storedState,
        })

        // Determine redirect path
        const redirectPath =
          storedRedirect && isAllowedRedirectPath(storedRedirect)
            ? storedRedirect
            : "/dashboard"

        if (response.created) {
          toast.success("Welcome! Your account has been created.")
        } else {
          toast.success("Logged in successfully")
        }

        // Redirect to dashboard or the redirectTo parameter
        router.push(redirectPath)
      } catch (error) {
        const errorMessage = getApiErrorMessage(error)

        // Handle specific Google auth error messages
        if (
          errorMessage.includes("State is required") ||
          errorMessage.includes("Invalid state") ||
          errorMessage.includes("State has expired")
        ) {
          toast.error(
            "Session expired. Please restart the Google sign-in process."
          )
          // Clear stored values on state error
          sessionStorage.removeItem(GOOGLE_STATE_STORAGE_KEY)
          sessionStorage.removeItem(GOOGLE_REDIRECT_STORAGE_KEY)
          // Restart flow from login
          setTimeout(() => router.push("/login"), 2000)
        } else if (
          errorMessage.includes("Google account email is not verified")
        ) {
          toast.error(
            "Your Google account email is not verified. Please verify it on your Google account and try again."
          )
          router.push("/login")
        } else if (errorMessage.includes("Google OAuth is not configured")) {
          toast.error("Google login is temporarily unavailable.")
          router.push("/login")
        } else if (errorMessage.includes("502")) {
          toast.error(
            "Google service temporarily unavailable. Please try again."
          )
          router.push("/login")
        } else if (errorMessage.includes("503")) {
          toast.error("Service temporarily unavailable. Please try again.")
          router.push("/login")
        } else {
          toast.error(
            getApiErrorMessage(error, "Failed to complete Google sign-in")
          )
          router.push("/login")
        }

        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [searchParams, googleCallbackMutation, router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#4CC0D8]"></div>
        <p className="text-gray-600">
          {isProcessing ? "Completing sign-in..." : "Redirecting..."}
        </p>
      </div>
    </div>
  )
}
