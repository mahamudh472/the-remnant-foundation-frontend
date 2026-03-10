import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-10 overflow-hidden rounded-[3rem] bg-[#f8f9fc] p-12 text-center md:p-20">
          <div className="relative z-10 space-y-6">
            <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-bold text-[#1D1D1D] md:text-5xl">
              Join ambitious professionals and unlock your dream career today
            </h2>
            <p className="mx-auto max-w-xl text-[#666666]">
              A multi-faceted platform designed to help people from around the
              world to learn, connect, and thrive.
            </p>
          </div>
          <div className="relative z-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-14 rounded-xl bg-[#C776EA] px-10 font-bold text-white shadow-lg shadow-[#C776EA]/20 hover:bg-[#B665D9]"
            >
              <Link href="/signup">Start Learning</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-14 rounded-xl border-[#4CC0D8] px-10 font-bold text-[#4CC0D8] hover:bg-[#4CC0D8]/5"
            >
              <Link href="/signup">Connect as Teacher</Link>
            </Button>
          </div>
          <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C776EA]/5 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-[#4CC0D8]/5 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
