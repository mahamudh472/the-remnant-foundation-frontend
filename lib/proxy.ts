import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { AUTH_TOKEN_COOKIE_NAME } from "@/lib/auth/constants"

const LOGIN_PATH = "/login"
const PROTECTED_PATH_PREFIXES = ["/dashboard", "/teacher", "/ai-guide"]

function isProtectedPath(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function buildLoginRedirect(request: NextRequest) {
  const loginUrl = new URL(LOGIN_PATH, request.url)
  const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`

  loginUrl.searchParams.set("redirectTo", redirectTo)
  return NextResponse.redirect(loginUrl)
}

export function proxy(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value

  if (!token) {
    return buildLoginRedirect(request)
  }

  return NextResponse.next()
}

export const proxyConfig = {
  matcher: ["/dashboard/:path*", "/teacher/:path*", "/ai-guide/:path*"],
}

export const config = {
  matcher: ["/dashboard/:path*", "/teacher/:path*", "/ai-guide/:path*"],
}
