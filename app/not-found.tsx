import Link from "next/link"
import { ArrowLeft, Compass, Home } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="relative isolate overflow-hidden">

        <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full p-8 sm:p-12 lg:p-16">
            <h1 className="mt-4 max-w-2xl text-4xl leading-tight font-bold text-[#1D1D1D] sm:text-5xl">
              404 - Page Not Found
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666666] sm:text-lg">
              The page you requested does not exist or may have been moved.
              Use one of the links below to get back to the right place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="h-11 rounded bg-[#4CC0D8] px-6 text-white hover:bg-[#3AB0C8]">
                <Link href="/" className="inline-flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go to Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded border-[#E5E7EB] px-6 text-[#1D1D1D] hover:bg-[#F8F9FC]"
              >
                <Link href="/courses" className="inline-flex items-center gap-2">
                  <Compass className="h-4 w-4" />
                  Browse Courses
                </Link>
              </Button>
            </div>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#666666] transition-colors hover:text-[#1D1D1D]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to safety
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
