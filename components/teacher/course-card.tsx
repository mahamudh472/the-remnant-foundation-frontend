import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Pencil, Star } from "lucide-react"
import { shimmerBlur } from "@/lib/image-shimmer"
import { POPULAR_COURSES } from "@/constants/teacher"

function CourseCard({ course }: { course: (typeof POPULAR_COURSES)[0] }) {
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
          placeholder="blur"
          blurDataURL={shimmerBlur(700, 475)}
        />
        <span className="absolute top-2 left-2 rounded bg-[#4CC0D8] px-2 py-0.5 text-xs font-semibold text-white">
          {course.tag}
        </span>
      </div>
      <CardContent className="space-y-2 px-4 pb-4">
        <h3 className="line-clamp-2 text-sm font-bold text-[#1D1D1D]">
          {course.title.length > 3
            ? `${course.title.substring(0, 40)}...`
            : course.title}
        </h3>
        <p className="text-xs text-[#9CA3AF]">{course.instructor}</p>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="text-xs font-medium text-[#1D1D1D]">
            {course.rating}
          </span>
          <span className="text-xs text-[#9CA3AF]">({course.reviews})</span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <Button variant="outline" size="sm">
            <Pencil />
          </Button>
          <Button size="sm">Watch Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
