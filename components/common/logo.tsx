import Image from "next/image"
import Link from "next/link"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`py-4 px-2 ${className}`}>
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image src="/assets/logo.png" alt="Logo" width={32} height={32} />
        <span className="text-lg font-bold tracking-tight">Remnant</span>
      </Link>
    </div>
  )
}
