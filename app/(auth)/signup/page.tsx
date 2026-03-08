import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 md:p-12">
      <div className="grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left side - Illustration and Text */}
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="relative w-full max-w-[480px]">
            <Image
              src="/assets/svgs/for-web/monitor progress illus.svg"
              alt="Monitor Progress Illustration"
              width={500}
              height={500}
              className="h-auto w-full drop-shadow-sm"
              priority
            />
          </div>
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-[#1D1D1D]">Did you know?</h2>
            <p className="text-base leading-relaxed text-[#666666]">
              Regardless of who you are, monitoring your progress is more
              critical as The Remnant Foundation results in learning gains.
            </p>
          </div>
        </div>

        {/* Right side - Role Selection */}
        <div className="flex flex-col items-center justify-center space-y-10">
          <div className="flex flex-col items-center space-y-6">
            <Image
              src="/assets/logo.png"
              alt="The Remnant Foundation Logo"
              width={70}
              height={70}
              priority
            />
            <h1 className="max-w-[320px] text-center text-[28px] leading-tight font-bold text-[#1D1D1D] md:text-[32px]">
              Sign up for The Remnant Foundation!
            </h1>
          </div>

          <div className="w-full max-w-[380px] space-y-5">
            <Link href="/create-account?role=learner" className="block">
              <Button
                variant="outline"
                className="group flex h-[72px] w-full items-center justify-between rounded-xl border-[#E5E7EB] px-8 transition-all duration-300 hover:border-[#4CC0D8] hover:bg-[#F3FBFC]"
              >
                <span className="text-lg font-semibold text-[#4CC0D8] group-hover:text-[#3AB0C8]">
                  I'm a learner
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-colors group-hover:bg-[#4CC0D8]/10">
                  <ChevronRight className="h-6 w-6 transform text-[#4CC0D8] transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </Link>

            <Link href="/create-account?role=teacher" className="block">
              <Button
                variant="outline"
                className="group flex h-[72px] w-full items-center justify-between rounded-xl border-[#E5E7EB] px-8 transition-all duration-300 hover:border-[#4CC0D8] hover:bg-[#F3FBFC]"
              >
                <span className="text-lg font-semibold text-[#4CC0D8] group-hover:text-[#3AB0C8]">
                  I'm a teacher
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-colors group-hover:bg-[#4CC0D8]/10">
                  <ChevronRight className="h-6 w-6 transform text-[#4CC0D8] transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </Link>
          </div>

          <p className="text-sm text-[#666666]">
            Already have a The Remnant Foundation account? -
            <Link
              href="/login"
              className="ml-1 font-bold text-[#4CC0D8] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
