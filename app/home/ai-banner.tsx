import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiBanner() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-[2rem] bg-[#4CC0D8] p-8 md:p-12">
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl space-y-4 text-center text-white md:text-left">
              <h2 className="text-3xl font-bold md:text-4xl">
                Empowering Your Journey with AI
              </h2>
              <p className="opacity-90">
                Explore cutting-edge AI technology that transforms your
                experience, offers automation, personalized solutions and
                smarter decision making.
              </p>
              <Button
                asChild
                className="h-12 rounded-full bg-white px-8 font-bold text-[#4CC0D8] hover:bg-white/90"
              >
                <Link href="/ai-guide" className="flex items-center gap-2">
                  Explore AI Spiritual Guide{" "}
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative w-full max-w-xs transition-transform duration-500 group-hover:scale-110 md:max-w-sm">
              <Image
                src="/assets/svgs/for-web/ai guide illus.svg"
                alt="AI Illustration"
                width={400}
                height={400}
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-black/5 blur-2xl" />
        </div>
      </div>
    </section>
  )
}
