import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { clearAuthTokenCookie, setAuthTokenCookie } from "../auth/cookies"

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

const initialAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  pendingEmail: null,
  otpFlow: null,
  verifiedResetOtp: null,
  isLoggedIn: false,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialAuthState,
      setTokens: ({ access, refresh }) => {
        setAuthTokenCookie(access)
        set({
          accessToken: access,
          refreshToken: refresh,
          isLoggedIn: Boolean(access),
        })
      },
      setUser: (user) => {
        set((state) => ({ user, isLoggedIn: Boolean(state.accessToken) }))
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
        clearAuthTokenCookie()
        set({
          ...initialAuthState,
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
    }),
    {
      name: "remnant-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        pendingEmail: state.pendingEmail,
        otpFlow: state.otpFlow,
        verifiedResetOtp: state.verifiedResetOtp,
        isLoggedIn: state.isLoggedIn,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AuthState>

        return {
          ...currentState,
          ...persisted,
          isLoggedIn: Boolean(
            persisted.accessToken ?? currentState.accessToken
          ),
        }
      },
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          setAuthTokenCookie(state.accessToken)
          return
        }

        clearAuthTokenCookie()
      },
    }
  )
)
