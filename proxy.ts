import { proxy } from "@/lib/proxy"

export { proxy }
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/teacher/:path*",
    "/chat/:path*",
    "/login",
    "/login/:path*",
    "/signup",
    "/signup/:path*",
  ],
}
