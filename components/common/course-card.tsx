import { cn } from "@/lib/utils"
import { BookOpen, ChevronRight, FileText, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import fallback from "@/assets/pngs/thumbnail-fallback.png"
import avatarFallback from "@/assets/pngs/avatar-fallback.png"

interface CourseCardProps {
  id: number | string
  title: string
  description?: string | null
  thumbnail?: string | null
  teacher_name?: string | null
  teacher_avatar?: string | null
  category_name?: string | null
  category?: string | null
  stars?: number
  review_count?: number
  modules_count?: number
  lessons_count?: number
  price?: string | number | null
  viewType?: "grid" | "list"
}

function formatPrice(price: CourseCardProps["price"]) {
  if (price === "0.00" || price === "0" || price === 0 || price === null) {
    return "Free"
  }

  return `$${price ?? "0.00"}`
}

export default function CourseCard({
  id,
  title,
  description,
  thumbnail,
  teacher_name,
  teacher_avatar,
  category_name,
  category,
  stars,
  review_count,
  modules_count,
  lessons_count,
  price,
  viewType = "grid",
}: CourseCardProps) {
  if (viewType === "list") {
    return (
      <Link
        href={`/courses/${id}`}
        className="group grid grid-cols-1 items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-[#F8F9FC] md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-100">
            <Image
              src={thumbnail || fallback}
              alt={title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 space-y-1">
            <p className="truncate text-[10px] tracking-wide text-[#9CA3AF]">
              {teacher_name || "Instructor"} •{" "}
              {category_name || category || "-"}
            </p>
            <h3 className="truncate text-sm text-[#1D1D1D] transition-colors group-hover:text-[#4CC0D8]">
              {title}
            </h3>
            <p className="line-clamp-1 text-xs text-[#6B7280]">
              {description || "No description provided"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1D1D1D] md:justify-center">
          <Star className="h-3.5 w-3.5 fill-current text-[#FF9D00]" />
          <span>{stars || 0}</span>
          <span className="text-[#9CA3AF]">({review_count || 0})</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-medium text-[#6B7280] md:justify-center">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-[#9CA3AF]" />
            {modules_count || 0} modules
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-[#9CA3AF]" />
            {lessons_count || 0} lessons
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 md:justify-end">
          <span className="text-base font-extrabold text-[#4CC0D8]">
            {formatPrice(price)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#1D1D1D] px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#4CC0D8]">
            View
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/courses/${id}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-2xl hover:shadow-[#4CC0D8]/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail || fallback}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col justify-between space-y-4 p-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[10px] ">
            <Image
              src={teacher_avatar || avatarFallback}
              alt={teacher_name || "Instructor"}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-[#1D1D1D]">
              {teacher_name || "Instructor"}
            </span>
            <span className="ml-auto text-[#9CA3AF]">
              {category_name || category}
            </span>
          </div>
          <h3 className="line-clamp-2 h-10 leading-tight font-extrabold text-[#1D1D1D] transition-colors group-hover:text-[#4CC0D8]">
            {title}
          </h3>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[#1D1D1D]">
            <Star className="h-3.5 w-3.5 fill-current text-[#FF9D00]" />
            <span>
              {stars || 0} ({review_count || 0} Reviews)
            </span>
            <div className="ml-auto flex items-center gap-3 text-[10px] font-medium text-[#9CA3AF] uppercase">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> {modules_count || 0} Mod
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> {lessons_count || 0} Les
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-50 pt-4">
            <span className="text-xl font-extrabold text-[#4CC0D8]">
              {formatPrice(price)}
            </span>
            <span className="flex items-center gap-2 rounded-lg bg-[#1D1D1D] px-4 py-2 text-[10px] font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#4CC0D8]">
              View Course <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
