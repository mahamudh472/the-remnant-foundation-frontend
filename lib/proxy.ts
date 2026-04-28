import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { AUTH_TOKEN_COOKIE_NAME } from "@/lib/auth/constants"

const LOGIN_PATH = "/login"
const DASHBOARD_PATH = "/dashboard"
const PROTECTED_PATH_PREFIXES = ["/dashboard", "/teacher", "/chat"]
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")

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

function buildDashboardRedirect(request: NextRequest) {
  return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
}

async function canAccessTeacherRoutes(token: string) {
  if (!API_BASE_URL) {
    return false
  }

  try {
    const response = await fetch(`${API_BASE_URL}/accounts/me/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return false
    }

    const data = (await response.json()) as { is_approved_teacher?: boolean }
    return Boolean(data.is_approved_teacher)
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value

  if (!token) {
    return buildLoginRedirect(request)
  }

  if (request.nextUrl.pathname.startsWith("/teacher")) {
    const hasTeacherAccess = await canAccessTeacherRoutes(token)

    if (!hasTeacherAccess) {
      return buildDashboardRedirect(request)
    }
  }

  return NextResponse.next()
}

export const proxyConfig = {
  matcher: ["/dashboard/:path*", "/teacher/:path*", "/chat/:path*"],
}
