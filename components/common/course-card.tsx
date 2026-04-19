import { cn } from "@/lib/utils";
import { BookOpen, ChevronRight, FileText, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fallback from "@/assets/pngs/avatar-fallback.png";

export default function CourseCard(course: any, viewType: "grid" | "list" = "grid") {
  return (
    <Link
      key={course.id}
      href={`/courses/${course.id}`} // Or slug, if slug is available
      className={cn(
        "group overflow-hidden rounded-2xl border border-gray-50 bg-white transition-all hover:shadow-2xl hover:shadow-[#4CC0D8]/5",
        viewType === "list" && "flex flex-row"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          viewType === "grid" ? "aspect-[4/3]" : "aspect-[4/3] w-1/3"
        )}
      >
        <Image
          src={course.thumbnail || fallback}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#9CA3AF] transition-colors hover:text-[#FF9D00]">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div
        className={cn(
          "flex flex-col justify-between space-y-4 p-6",
          viewType === "list" && "flex-1"
        )}
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase">
            <Image
              src={course.teacher_avatar || fallback}
              alt={course.teacher_name || "Instructor"}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-[#1D1D1D]">{course.teacher_name}</span>
            <span className="ml-auto text-[#9CA3AF]">
              {course.category_name || course.category}
            </span>
          </div>
          <h3 className="line-clamp-2 h-10 leading-tight font-extrabold text-[#1D1D1D] transition-colors group-hover:text-[#4CC0D8]">
            {course.title}
          </h3>
          {viewType === "list" && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-500">
              {course.description}
            </p>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center gap-1.5 text-xs font-bold text-[#1D1D1D]">
            <Star className="h-3.5 w-3.5 fill-current text-[#FF9D00]" />
            <span>
              {course.stars || 0} ({course.review_count || 0} Reviews)
            </span>
            <div className="ml-auto flex items-center gap-3 text-[10px] font-medium text-[#9CA3AF] uppercase">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> {course.modules_count || 0} Mod
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> {course.lessons_count || 0} Les
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-50 pt-4">
            <span className="text-xl font-extrabold text-[#4CC0D8]">
              {course.price === "0.00" || course.price === "0"
                ? "Free"
                : `$${course.price}`}
            </span>
            <button className="flex items-center gap-2 rounded-lg bg-[#1D1D1D] px-4 py-2 text-[10px] font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#4CC0D8]">
              View Course <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
