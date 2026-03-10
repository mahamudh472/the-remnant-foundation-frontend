"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type QuestionType = "fill-blank" | "multiple-choice"

interface FillBlankQuestion {
  type: "fill-blank"
  question: string
  blanks: string[]
}

interface MultipleChoiceQuestion {
  type: "multiple-choice"
  question: string
  options: {
    text: string
    explanation: string
    isCorrect: boolean
    isWrong: boolean
  }[]
}

type Question = FillBlankQuestion | MultipleChoiceQuestion

const QUESTIONS: Question[] = [
  {
    type: "fill-blank",
    question: "Which word is the noun in: The tall boy smiled.",
    blanks: ["smiled", "boy", "the", "tall"],
  },
  {
    type: "multiple-choice",
    question: "Why do communities plant more mangroves?",
    options: [
      {
        text: "To protect the coast and the environment.",
        explanation: "Why not: the text doesn't mention furniture.",
        isCorrect: false,
        isWrong: false,
      },
      {
        text: "Communities will be safer.",
        explanation: "Why not: They provide homes and help animals survive.",
        isCorrect: false,
        isWrong: false,
      },
      {
        text: "More storms will stop.",
        explanation: "Why not: They grow along coastlines, not deserts.",
        isCorrect: false,
        isWrong: true,
      },
      {
        text: "Communities will be safer.",
        explanation: "Why not: They provide homes and help animals survive.",
        isCorrect: false,
        isWrong: false,
      },
      {
        text: "To protect the coast and the environment.",
        explanation: "Why not: the text doesn't mention furniture.",
        isCorrect: false,
        isWrong: true,
      },
      {
        text: "Communities will be safer.",
        explanation: "Why not: They provide homes and help animals survive.",
        isCorrect: false,
        isWrong: false,
      },
      {
        text: "More storms will stop.",
        explanation: "Why not: They grow along coastlines, not deserts.",
        isCorrect: false,
        isWrong: true,
      },
      {
        text: "Communities will be safer.",
        explanation: "This: provide homes and help animals survive.",
        isCorrect: false,
        isWrong: false,
      },
      {
        text: "Communities will be safer.",
        explanation: "Why not: They provide homes and help animals survive.",
        isCorrect: false,
        isWrong: false,
      },
      {
        text: "Communities will be safer.",
        explanation: "Why not: They provide homes and help animals survive.",
        isCorrect: false,
        isWrong: false,
      },
    ],
  },
]

export default function QuizDetailPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const totalQuestions = 10

  const question = QUESTIONS[currentQuestion] ?? QUESTIONS[0]

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">My Quiz Attempts</h2>

      <Card className="border-gray-100 shadow-none">
        <CardContent className="space-y-6 p-6">
          {/* Quiz progress badge */}
          <Badge className="rounded-lg border-0 bg-[#4CC0D8] px-4 py-1.5 text-xs font-semibold text-white">
            Quiz: {String(currentQuestion + 1).padStart(2, "0")} /{" "}
            {totalQuestions}
          </Badge>

          {/* Question */}
          {question.type === "fill-blank" ? (
            <FillBlankView question={question} />
          ) : (
            <MultipleChoiceView question={question} />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/quiz-attempts"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
              >
                <ArrowLeft className="h-4 w-4" />
                Switch new Quiz
              </Link>
              {currentQuestion > 0 && (
                <button
                  onClick={() => setCurrentQuestion(0)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restart
                </button>
              )}
            </div>
            <button
              onClick={() =>
                setCurrentQuestion((prev) =>
                  prev < QUESTIONS.length - 1 ? prev + 1 : prev
                )
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FillBlankView({ question }: { question: FillBlankQuestion }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#1D1D1D]">
          Question {String(1).padStart(2, "0")}
        </h3>
        <p className="mt-1 text-sm text-[#666666]">{question.question}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {question.blanks.map((blank, i) => (
          <Input
            key={i}
            defaultValue={blank}
            readOnly
            className="h-12 rounded-xl border-gray-200 bg-white px-4 text-sm text-[#1D1D1D]"
          />
        ))}
      </div>
    </div>
  )
}

function MultipleChoiceView({
  question,
}: {
  question: MultipleChoiceQuestion
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-[#1D1D1D]">
        {question.question}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border p-4 transition-colors",
              option.isWrong
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-white hover:border-[#4CC0D8]/30"
            )}
          >
            <p className="text-sm font-semibold text-[#1D1D1D]">
              {option.text}
            </p>
            <p
              className={cn(
                "mt-1 text-xs",
                option.isWrong ? "text-red-500" : "text-[#9CA3AF]"
              )}
            >
              {option.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
