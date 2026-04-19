import { BookOpenIcon, Check, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import fallback from "@/assets/pngs/avatar-fallback.png"

export default function TeacherCard(inst: any) {
  return (
    <Link
      key={inst.id}
      href={`/instructors/${inst.id}`}
      className="group space-y-6 rounded-2xl border border-gray-50 bg-white p-6 transition-all hover:shadow-2xl hover:shadow-[#4CC0D8]/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={inst.avatar || fallback}
          alt={inst.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#1D1D1D] opacity-0 transition-opacity group-hover:opacity-100">
          <Check className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-current text-[#FF9D00]" />
          <span className="text-xs font-bold text-[#1D1D1D]">
            {inst.avg_rating || 0} ({inst.total_reviews || 0} Reviews)
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1D1D1D] transition-colors group-hover:text-[#4CC0D8]">
            {inst.name}
          </h3>
          <p className="text-xs text-[#666666]">
            {inst.profession || "Instructor"}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF9D00]">
            <BookOpenIcon className="h-3.5 w-3.5" />
            <span className="uppercase">{inst.total_courses || 0} Course</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#9CA3AF]">
            <Star className="h-3.5 w-3.5 text-[#FF9D00]" />
            <span className="uppercase">{inst.avg_rating || 0} Stars</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
