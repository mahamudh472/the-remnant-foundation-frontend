import { create } from "zustand"

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher"
  avatar: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export type OtpFlow = "register" | "forgot-password" | null

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  pendingEmail: string | null
  otpFlow: OtpFlow
  verifiedResetOtp: string | null
  isLoggedIn: boolean
  setTokens: (tokens: AuthTokens) => void
  setUser: (user: User | null) => void
  setPendingEmail: (email: string) => void
  setOtpFlow: (flow: OtpFlow) => void
  setVerifiedResetOtp: (otp: string | null) => void
  clearPendingEmail: () => void
  logout: () => void
  switchRole: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  pendingEmail: null,
  otpFlow: null,
  verifiedResetOtp: null,
  isLoggedIn: false,
  setTokens: ({ access, refresh }) => {
    set({
      accessToken: access,
      refreshToken: refresh,
      isLoggedIn: Boolean(access),
    })
  },
  setUser: (user) => {
    set({ user })
  },
  setPendingEmail: (email) => {
    set({ pendingEmail: email })
  },
  setOtpFlow: (flow) => {
    set({ otpFlow: flow })
  },
  setVerifiedResetOtp: (otp) => {
    set({ verifiedResetOtp: otp })
  },
  clearPendingEmail: () => {
    set({ pendingEmail: null })
  },
  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      pendingEmail: null,
      otpFlow: null,
      verifiedResetOtp: null,
      isLoggedIn: false,
    })
  },
  switchRole: () => {
    set((state) => {
      if (!state.user) return state
      return {
        user: {
          ...state.user,
          role: state.user.role === "student" ? "teacher" : "student",
        },
      }
    })
  },
}))
