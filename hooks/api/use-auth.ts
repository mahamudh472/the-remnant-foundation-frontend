"use client"

import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  changePassword,
  checkOtp,
  getMe,
  getProfile,
  login,
  logout as logoutRequest,
  passwordReset,
  passwordResetConfirm,
  register,
  resendOtp,
  verifyEmail,
  type AccountProfile,
  type ChangePasswordPayload,
  type CheckOtpPayload,
  type LoginPayload,
  type PasswordResetConfirmPayload,
  type PasswordResetPayload,
  type RegisterPayload,
  type ResendOtpPayload,
  type VerifyEmailPayload,
} from "@/lib/api/auth"
import { useAuthStore, type User } from "@/lib/store/auth-store"

const DEFAULT_AVATAR = "/assets/pngs/avatar-fallback.png"

function profileQueryKey(accessToken: string | null) {
  return ["auth", "profile", accessToken] as const
}

function resolveRole(profile: AccountProfile): User["role"] {
  const groupNames = profile.groups
    .map((group) => (typeof group === "string" ? group : group?.name))
    .filter((value): value is string => Boolean(value))
    .map((value) => value.toLowerCase())

  if (
    profile.is_staff ||
    profile.is_superuser ||
    groupNames.includes("teacher")
  ) {
    return "teacher"
  }

  return "student"
}

function buildFallbackUser(email: string): User {
  return {
    id: email,
    name: email.split("@")[0] || "User",
    email,
    role: "student",
    avatar: DEFAULT_AVATAR,
  }
}

export function mapProfileToUser(profile: AccountProfile): User {
  return {
    id: String(profile.id),
    name: profile.full_name?.trim() || profile.email.split("@")[0] || "User",
    email: profile.email,
    role: resolveRole(profile),
    avatar: profile.avatar || DEFAULT_AVATAR,
  }
}

export function useAuthProfileQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const setUser = useAuthStore((state) => state.setUser)

  const profileQuery = useQuery({
    queryKey: profileQueryKey(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getProfile(accessToken)
    },
    enabled: Boolean(accessToken),
    staleTime: 5 * 60_000,
  })

  useEffect(() => {
    if (profileQuery.data) {
      setUser(mapProfileToUser(profileQuery.data))
    }
  }, [profileQuery.data, setUser])

  return profileQuery
}

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const setTokens = useAuthStore((state) => state.setTokens)
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: async (tokens, variables) => {
      setTokens(tokens)

      try {
        const profile = await queryClient.fetchQuery({
          queryKey: profileQueryKey(tokens.access),
          queryFn: () => getProfile(tokens.access),
        })
        setUser(mapProfileToUser(profile))
      } catch {
        setUser(buildFallbackUser(variables.email))
      }
    },
  })
}

export function useRegisterMutation() {
  const setPendingEmail = useAuthStore((state) => state.setPendingEmail)

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (_response, variables) => {
      setPendingEmail(variables.email)
    },
  })
}

export function useGetMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: ["auth", "me", accessToken] as const,
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getMe(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}

export function useVerifyEmailMutation() {
  const clearPendingEmail = useAuthStore((state) => state.clearPendingEmail)

  return useMutation({
    mutationFn: (payload: VerifyEmailPayload) => verifyEmail(payload),
    onSuccess: () => {
      clearPendingEmail()
    },
  })
}

export function useForgotPasswordMutation() {
  const setPendingEmail = useAuthStore((state) => state.setPendingEmail)

  return useMutation({
    mutationFn: (payload: PasswordResetPayload) => passwordReset(payload),
    onSuccess: (_response, variables) => {
      setPendingEmail(variables.email)
    },
  })
}

export function useResendOtpMutation() {
  return useMutation({
    mutationFn: (payload: ResendOtpPayload) => resendOtp(payload),
  })
}

export function useCheckOtpMutation() {
  return useMutation({
    mutationFn: (payload: CheckOtpPayload) => checkOtp(payload),
  })
}

export function usePasswordResetConfirmMutation() {
  return useMutation({
    mutationFn: (payload: PasswordResetConfirmPayload) =>
      passwordResetConfirm(payload),
  })
}

export function useChangePasswordMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return changePassword(payload, accessToken)
    },
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state) => state.accessToken)
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const clearAuth = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: async () => {
      if (!accessToken || !refreshToken) return null

      return logoutRequest({ refresh_token: refreshToken }, accessToken)
    },
    onSettled: () => {
      clearAuth()
      queryClient.removeQueries({ queryKey: ["auth"] })
    },
  })
}
