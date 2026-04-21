"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Clock, RotateCcw } from "lucide-react"
import { useStudentQuizAttemptsQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export default function QuizAttemptsPage() {
  const { data, isLoading, isError, error } = useStudentQuizAttemptsQuery()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#1D1D1D]">My Quiz Attempts</h2>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Review your past quiz performance
        </p>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(error, "Failed to load quiz attempts")}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="h-20 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <>
          {(!data || data.length === 0) && !isError && (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-[#9CA3AF]" />
              <p className="mt-3 text-sm text-[#666666]">
                No quiz attempts yet.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {(data ?? []).map((attempt) => (
              <Card
                key={attempt.attempt_id}
                className="border-gray-100 shadow-none transition-shadow hover:shadow-md"
              >
                <CardContent className="flex items-center justify-between p-5">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[#1D1D1D]">
                      {attempt.quiz_name}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                        <BookOpen className="h-3.5 w-3.5" />
                        {String(attempt.questions_count).padStart(2, "0")}{" "}
                        Questions
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                        <RotateCcw className="h-3.5 w-3.5" />
                        {attempt.attempts_count}{" "}
                        {attempt.attempts_count === 1 ? "Attempt" : "Attempts"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(attempt.latest_attempt_at)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/quiz-attempts/${attempt.attempt_id}`}
                    className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4CC0D8] text-white transition-colors hover:bg-[#3AB0C8]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
