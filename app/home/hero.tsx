import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-[#1D1D1D] md:text-5xl lg:text-6xl">
              A Modern Learning & <br />
              <span className="text-[#4CC0D8]">Spiritual Growth</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-[#666666] lg:mx-0">
              Learn, grow, and stay spiritually connected—anytime, anywhere.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                className="h-12 rounded-lg bg-[#4CC0D8] px-8 font-semibold text-white shadow-lg shadow-[#4CC0D8]/20 transition-all hover:scale-[1.02] hover:bg-[#3AB0C8]"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-lg border-[#C776EA] px-8 font-semibold text-[#C776EA] hover:bg-[#FDF6FF]"
              >
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 w-full animate-in duration-700 fade-in slide-in-from-right">
              <Image
                src="/assets/svgs/for-web/Home hero illustration.svg"
                alt="Hero Illustration"
                width={800}
                height={600}
                className="h-auto w-full drop-shadow-xl"
                priority
              />
            </div>
            <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 animate-pulse rounded-full bg-[#4CC0D8]/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 -z-10 h-64 w-64 animate-pulse rounded-full bg-[#C776EA]/10 blur-3xl delay-700" />
          </div>
        </div>
      </div>
    </section>
  )
}
