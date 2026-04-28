import { proxy } from "@/lib/proxy"

export { proxy as middleware }

export const config = {
  matcher: ["/dashboard/:path*", "/teacher/:path*", "/chat/:path*"],
}
