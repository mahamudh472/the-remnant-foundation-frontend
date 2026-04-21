import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import { BookOpen, Calendar, MapPin } from "lucide-react"
import { formatDisplayDate } from "@/lib/utils"
import fallback from "@/assets/pngs/avatar-fallback.png"

export default function StudentCard(student: any) {
  return (
    <Link key={student.id} href={`/teacher/students/${student.id}`}>
      <Card className="overflow-hidden border-gray-100 p-0 shadow-none transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={student.avatar || fallback}
            alt={student.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-bold text-[#1D1D1D]">{student.name}</h3>
          <div className="mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#4CC0D8]" />
            <span className="text-xs text-[#4CC0D8]">
              {student.location || "N/A"}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-[#666666]">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-[#F59E0B]" />
              <span>{formatDisplayDate(student.first_enrolled_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-[#F59E0B]" />
              <span>
                {student.total_courses.toString().padStart(2, "0")} Courses
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
