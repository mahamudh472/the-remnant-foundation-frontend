import Link from "next/link"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"

type QuizCardData = {
  id: number | string
  title: string
  grade: string
  course: string
  program: string
  category: string
  questionsCount: number
  passingScore: number
  status: string
}

type QuizCardProps = {
  quiz: QuizCardData
}

const STATUS_BADGE_STYLES: Record<string, string> = {
  published: "bg-[#EBF7F9] text-[#4CC0D8]",
  pending: "bg-amber-50 text-amber-600",
  draft: "bg-slate-100 text-slate-600",
  paused: "bg-rose-50 text-rose-600",
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const normalizedStatus = quiz.status.toLowerCase()

  return (
    <Card className="overflow-hidden border-gray-100 p-0 shadow-none transition-shadow hover:shadow-md">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm leading-snug font-bold text-[#1D1D1D]">
            {quiz.title}
          </h3>
          <Badge
            className={cn(
              "shrink-0 text-[10px]",
              STATUS_BADGE_STYLES[normalizedStatus] ??
                "bg-gray-100 text-gray-600"
            )}
          >
            {quiz.status}
          </Badge>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between gap-3">
            <span className="text-[#666666]">Grade:</span>
            <span className="text-right text-[#1D1D1D]">{quiz.grade}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#666666]">Course:</span>
            <span className="text-right text-[#1D1D1D]">{quiz.course}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#666666]">Program:</span>
            <span className="text-right text-[#1D1D1D]">{quiz.program}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#666666]">Category:</span>
            <span className="text-right text-[#1D1D1D]">{quiz.category}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#666666]">Questions:</span>
            <span className="text-right text-[#1D1D1D]">
              {quiz.questionsCount}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#666666]">Passing Score:</span>
            <span className="text-right text-[#1D1D1D]">
              {quiz.passingScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/teacher/quiz/${quiz.id}`}
            className="flex flex-1 items-center justify-center rounded-lg bg-[#4CC0D8] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
