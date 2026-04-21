"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Trophy,
  AlertTriangle,
} from "lucide-react"
import { useStudentQuizAttemptDetailQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import { cn } from "@/lib/utils"
import type { StudentQuizAttemptQuestion } from "@/lib/api/students"

function formatDateTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

function OptionLabel({ letter, text, status }: {
  letter: string
  text: string
  status: "correct" | "wrong" | "neutral"
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border p-3.5",
        status === "correct" && "border-emerald-200 bg-emerald-50",
        status === "wrong" && "border-red-200 bg-red-50",
        status === "neutral" && "border-gray-200 bg-white"
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          status === "correct" && "bg-emerald-500 text-white",
          status === "wrong" && "bg-red-400 text-white",
          status === "neutral" && "bg-gray-200 text-[#666666]"
        )}
      >
        {letter}
      </span>
      <p
        className={cn(
          "text-sm leading-relaxed",
          status === "correct" && "font-medium text-emerald-800",
          status === "wrong" && "text-red-700",
          status === "neutral" && "text-[#444444]"
        )}
      >
        {text}
      </p>
    </div>
  )
}

function QuestionCard({
  question,
  index,
}: {
  question: StudentQuizAttemptQuestion
  index: number
}) {
  const optionLetters = ["A", "B", "C", "D"] as const
  const optionTexts: Record<string, string> = {
    A: question.option_a,
    B: question.option_b,
    C: question.option_c,
    D: question.option_d,
  }

  const isShortAnswer = question.question_type === "short_answer"

  const getOptionStatus = (
    letter: string
  ): "correct" | "wrong" | "neutral" => {
    const isCorrect = question.correct_options.includes(letter)
    const wasSelected = question.submitted_selected_options.includes(letter)

    if (isCorrect) return "correct"
    if (wasSelected && !isCorrect) return "wrong"
    return "neutral"
  }

  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-4 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#9CA3AF]">
              Q{String(index + 1).padStart(2, "0")}
            </span>
            <Badge
              className={cn(
                "border-0 text-[10px] font-semibold uppercase tracking-wide",
                question.is_correct
                  ? "bg-emerald-100 text-emerald-700"
                  : question.is_answered
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-500"
              )}
            >
              {question.is_correct
                ? "Correct"
                : question.is_answered
                  ? "Incorrect"
                  : "Unanswered"}
            </Badge>
          </div>
          {question.is_correct ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
          ) : question.is_answered ? (
            <XCircle className="h-5 w-5 shrink-0 text-red-400" />
          ) : (
            <MinusCircle className="h-5 w-5 shrink-0 text-gray-400" />
          )}
        </div>

        {/* Question text */}
        <p className="text-sm font-semibold leading-relaxed text-[#1D1D1D]">
          {question.question_text}
        </p>

        {/* Options for MCQ / multiple_select */}
        {!isShortAnswer && (
          <div className="space-y-2">
            {optionLetters.map((letter) => {
              const text = optionTexts[letter]
              if (!text) return null
              return (
                <OptionLabel
                  key={letter}
                  letter={letter}
                  text={text}
                  status={getOptionStatus(letter)}
                />
              )
            })}
          </div>
        )}

        {/* Short answer */}
        {isShortAnswer && (
          <div className="space-y-2">
            {question.submitted_answer_text && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs font-semibold text-[#9CA3AF]">
                  Your answer
                </p>
                <p className="mt-1 text-sm text-[#1D1D1D]">
                  {question.submitted_answer_text}
                </p>
              </div>
            )}
            {question.correct_short_answer && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs font-semibold text-emerald-600">
                  Correct answer
                </p>
                <p className="mt-1 text-sm text-emerald-800">
                  {question.correct_short_answer}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Explanation */}
        {question.explanation && (
          <div className="rounded-xl border border-[#4CC0D8]/20 bg-[#EBF7F9] p-3">
            <p className="text-xs font-semibold text-[#4CC0D8]">Explanation</p>
            <p className="mt-1 text-xs leading-relaxed text-[#555555]">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function QuizAttemptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const attemptId = Number(slug)

  const { data, isLoading, isError, error } =
    useStudentQuizAttemptDetailQuery(
      Number.isNaN(attemptId) ? undefined : attemptId
    )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
        {[1, 2, 3].map((s) => (
          <div key={s} className="h-48 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (isError) {
    const message = getApiErrorMessage(error, "Failed to load quiz attempt")
    return (
      <div className="space-y-4">
        <Link
          href="/dashboard/quiz-attempts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#666666] hover:text-[#4CC0D8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quiz Attempts
        </Link>
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {message}
        </div>
      </div>
    )
  }

  if (!data) return null

  const scoreColor =
    data.passed ? "text-emerald-600" : "text-red-500"

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard/quiz-attempts"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#666666] transition-colors hover:text-[#4CC0D8]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Quiz Attempts
      </Link>

      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#1D1D1D]">{data.quiz_name}</h2>
        <p className="mt-0.5 text-sm text-[#9CA3AF]">
          Attempt #{data.attempt_number} &middot;{" "}
          {formatDateTime(data.submitted_at)}
        </p>
      </div>

      {/* Score summary card */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center gap-6">
            {/* Score circle */}
            <div className="flex flex-col items-center">
              <span className={cn("text-4xl font-bold", scoreColor)}>
                {data.score_percentage}%
              </span>
              <span className="mt-0.5 text-xs text-[#9CA3AF]">Score</span>
            </div>

            <div className="h-12 w-px bg-gray-100" />

            {/* Pass/fail badge */}
            <div className="flex items-center gap-2">
              {data.passed ? (
                <Trophy className="h-5 w-5 text-emerald-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              )}
              <div>
                <p
                  className={cn(
                    "text-sm font-bold",
                    data.passed ? "text-emerald-600" : "text-red-500"
                  )}
                >
                  {data.passed ? "Passed" : "Not Passed"}
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  Passing score: {data.passing_score}%
                </p>
              </div>
            </div>

            <div className="h-12 w-px bg-gray-100" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-4">
              <Stat label="Total" value={data.total_questions} />
              <Stat
                label="Correct"
                value={data.correct_answers}
                color="text-emerald-600"
              />
              <Stat
                label="Incorrect"
                value={data.incorrect_answers}
                color="text-red-500"
              />
              <Stat
                label="Unanswered"
                value={data.unanswered_questions}
                color="text-gray-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#1D1D1D]">Question Review</h3>
        {data.questions.map((q, i) => (
          <QuestionCard key={q.question_id} question={q} index={i} />
        ))}
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  color = "text-[#1D1D1D]",
}: {
  label: string
  value: number
  color?: string
}) {
  return (
    <div>
      <p className={cn("text-base font-bold", color)}>{value}</p>
      <p className="text-xs text-[#9CA3AF]">{label}</p>
    </div>
  )
}
