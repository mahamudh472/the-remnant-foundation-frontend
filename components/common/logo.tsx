import Image from "next/image"
import Link from "next/link"

export default function Logo({
  single,
  className,
}: {
  single?: boolean
  className?: string
}) {
  if (single) {
    return (
      <div className={`px-2 py-4 ${className}`}>
        <Link href="/" className="flex shrink-0 items-center gap-2 bg-white w-8 rounded-full">
          <Image src="/assets/logo.png" alt="Logo" width={32} height={32} />
        </Link>
      </div>
    )
  }
  return (
    <div className={`px-2 py-4 ${className}`}>
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image src="/assets/logo.png" alt="Logo" width={32} height={32} />
        <span className="text-lg font-bold tracking-tight">Remnant</span>
      </Link>
    </div>
  )
}
