import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_TOKEN_COOKIE_NAME,
} from "@/lib/auth/constants"

function getSecureAttribute() {
  if (typeof window === "undefined") return ""
  return window.location.protocol === "https:" ? "; Secure" : ""
}

export function setAuthTokenCookie(token: string) {
  if (typeof document === "undefined") return
  if (!token) return

  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${AUTH_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${getSecureAttribute()}`
}

export function clearAuthTokenCookie() {
  if (typeof document === "undefined") return

  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${getSecureAttribute()}`
}
