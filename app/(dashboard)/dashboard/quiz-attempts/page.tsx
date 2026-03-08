import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const QUIZZES = [
  {
    id: "preparing-for-marriage",
    course: "Preparing for Marriage",
    questions: 5,
  },
  {
    id: "faith-career-direction-1",
    course: "Faith & Career Direction",
    questions: 10,
  },
  {
    id: "healthy-lifestyle-habits-1",
    course: "Healthy Lifestyle & Habits",
    questions: 8,
  },
  {
    id: "faith-career-direction-2",
    course: "Faith & Career Direction",
    questions: 5,
  },
  {
    id: "faith-career-direction-3",
    course: "Faith & Career Direction",
    questions: 10,
  },
  {
    id: "healthy-lifestyle-habits-2",
    course: "Healthy Lifestyle & Habits",
    questions: 7,
  },
]

export default function QuizAttemptsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">My Quiz Attempts</h2>

      <div className="space-y-3">
        {QUIZZES.map((quiz) => (
          <Card
            key={quiz.id}
            className="border-gray-100 shadow-none transition-shadow hover:shadow-md"
          >
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1D]">
                  {quiz.course}
                </h3>
                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Number of Questions :{" "}
                  {String(quiz.questions).padStart(2, "0")}
                </p>
              </div>
              <Link
                href={`/dashboard/quiz-attempts/${quiz.id}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4CC0D8] text-white transition-colors hover:bg-[#3AB0C8]"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
