import { Button } from "../ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function BottomCta() {
  return (
    <section className="bg-[#1D1D1D] py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Be Part of a Generation Being{" "}
          <span className="text-[#4CC0D8]">Spiritually Renewed</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
          The next generation is waiting. Join the Reform movement and help us
          build a generation anchored in faith, purpose, and transformation.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="p-6">
            <Link href="/signup">Sign Up — It&apos;s Free</Link>
          </Button>
          <Button asChild variant="outline" className="p-6">
            <Link href="/programs">
              Explore Other Programs <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
