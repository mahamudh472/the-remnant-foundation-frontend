import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Loader2, Pencil, Trash2 } from "lucide-react"
interface MyCourseCardCourse {
  id: number
  title: string
  image: string
  instructor: string
  lessons: number
  time: string
  price: number
}

interface MyCourseCardProps {
  course: MyCourseCardCourse
  onDelete?: (courseId: number) => void
  isDeleting?: boolean
}

export default function MyCourseCard({
  course,
  onDelete,
  isDeleting = false,
}: MyCourseCardProps) {

  return (
    <Card
      key={course.title}
      className="group overflow-hidden border-gray-100 p-0 shadow-none"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-[#1D1D1D]">
          {course.title}
        </h3>
        <p className="text-xs text-[#9CA3AF]">by {course.instructor}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-[#1D1D1D]">
              {course.lessons} Lessons
            </span>
          </div>

          <div>
            <span className="text-xs text-[#9CA3AF]">{course.time}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-[#4CC0D8]">
            {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onDelete?.(course.id)
              }}
              disabled={isDeleting}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]">
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
