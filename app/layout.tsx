import { Geist_Mono, Inter, Urbanist } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "School - Remnant Foundation",
  description:
    "A modern learning platform for spiritual growth and connection. Explore courses, live classes, and a vibrant community to deepen your faith and understanding.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "light antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        urbanist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="bottom-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
