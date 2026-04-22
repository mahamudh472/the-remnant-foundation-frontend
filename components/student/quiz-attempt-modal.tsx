"use client"

import React from "react"
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock3,
  RotateCcw,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  useStudentQuizQuestionsQuery,
  useSubmitStudentQuizMutation,
} from "@/hooks/api/use-students"
import type {
  StudentQuizQuestionItem,
  StudentQuizSubmitResponse,
} from "@/lib/api/students"
import { getApiErrorMessage } from "@/lib/api/client"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type QuizAttemptModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  quizId: number | null
  quizTitle?: string | null
  courseId?: number
  moduleId?: number
}

type QuestionAnswerState = {
  selectedOptions: string[]
  answerText: string
}

const OPTION_KEYS = ["A", "B", "C", "D"] as const

function getQuestionOptions(question: StudentQuizQuestionItem) {
  const optionValues = [
    question.option_a,
    question.option_b,
    question.option_c,
    question.option_d,
  ]

  return OPTION_KEYS.map((key, index) => ({
    key,
    value: optionValues[index]?.trim() ?? "",
  })).filter((option) => option.value.length > 0)
}

export default function QuizAttemptModal({
  open,
  onOpenChange,
  quizId,
  quizTitle,
  courseId,
  moduleId,
}: QuizAttemptModalProps) {
  const [answersByQuestionId, setAnswersByQuestionId] = React.useState<
    Record<number, QuestionAnswerState>
  >({})
  const [submitResult, setSubmitResult] =
    React.useState<StudentQuizSubmitResponse | null>(null)

  const quizQuestionsQuery = useStudentQuizQuestionsQuery(
    quizId ?? undefined,
    Boolean(open && quizId)
  )

  const submitQuizMutation = useSubmitStudentQuizMutation()

  React.useEffect(() => {
    if (!open) {
      setAnswersByQuestionId({})
      setSubmitResult(null)
    }
  }, [open, quizId])

  const quizData = quizQuestionsQuery.data
  const questions = React.useMemo(
    () =>
      [...(quizData?.questions ?? [])].sort(
        (left, right) => left.order - right.order
      ),
    [quizData?.questions]
  )

  const answeredQuestionCount = React.useMemo(() => {
    return questions.reduce((count, questionItem) => {
      const answerState = answersByQuestionId[questionItem.question_id]

      if (!answerState) {
        return count
      }

      if (questionItem.question_type === "short_answer") {
        return answerState.answerText.trim().length > 0 ? count + 1 : count
      }

      return answerState.selectedOptions.length > 0 ? count + 1 : count
    }, 0)
  }, [answersByQuestionId, questions])

  const isSubmitted = Boolean(submitResult)

  const updateShortAnswer = (questionId: number, value: string) => {
    setAnswersByQuestionId((previous) => ({
      ...previous,
      [questionId]: {
        selectedOptions: previous[questionId]?.selectedOptions ?? [],
        answerText: value,
      },
    }))
  }

  const selectSingleOption = (questionId: number, optionKey: string) => {
    setAnswersByQuestionId((previous) => ({
      ...previous,
      [questionId]: {
        selectedOptions: [optionKey],
        answerText: previous[questionId]?.answerText ?? "",
      },
    }))
  }

  const toggleMultipleOption = (questionId: number, optionKey: string) => {
    setAnswersByQuestionId((previous) => {
      const current = previous[questionId] ?? {
        selectedOptions: [],
        answerText: "",
      }

      const selectedOptions = current.selectedOptions.includes(optionKey)
        ? current.selectedOptions.filter((item) => item !== optionKey)
        : [...current.selectedOptions, optionKey]

      return {
        ...previous,
        [questionId]: {
          ...current,
          selectedOptions,
        },
      }
    })
  }

  const handleRetry = () => {
    setAnswersByQuestionId({})
    setSubmitResult(null)
  }

  const handleSubmitQuiz = async () => {
    if (!quizId || !quizData) {
      return
    }

    const answers = questions.flatMap((questionItem) => {
      const answerState = answersByQuestionId[questionItem.question_id]

      if (!answerState) {
        return []
      }

      if (questionItem.question_type === "short_answer") {
        const answerText = answerState.answerText.trim()

        if (!answerText) {
          return []
        }

        return [
          {
            question_id: questionItem.question_id,
            answer_text: answerText,
          },
        ]
      }

      if (answerState.selectedOptions.length === 0) {
        return []
      }

      return [
        {
          question_id: questionItem.question_id,
          selected_options: answerState.selectedOptions,
        },
      ]
    })

    if (answers.length === 0) {
      toast.error("Answer at least one question before submitting.")
      return
    }

    try {
      const response = await submitQuizMutation.mutateAsync({
        quizId,
        payload: { answers },
        courseId,
        moduleId,
      })

      setSubmitResult(response)
      toast.success(response.message)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to submit quiz."))
    }
  }

  const attemptsAllowed = quizData?.attempts_allowed ?? null
  const attemptsUsed = submitResult?.attempt_number ?? null
  const hasAttemptsRemaining =
    attemptsAllowed !== null &&
    attemptsUsed !== null &&
    attemptsUsed < attemptsAllowed

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 right-0 left-auto h-svh w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-none p-0 data-[state=closed]:zoom-out-100 data-[state=closed]:slide-out-to-right-full data-[state=open]:zoom-in-100 data-[state=open]:slide-in-from-right-full [&>button]:hidden">
        <div className="flex h-full flex-col w-1/2 mx-auto bg-white">
          <div className="border-b border-gray-100 px-5 py-4 sm:px-7">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => onOpenChange(false)}
              className="border-none shadow-none text-primary absolute left-5 top-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <DialogTitle className="text-2xl font-bold text-[#1D1D1D]">
              {quizData?.title || quizTitle || "Assess Your Knowledge"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-[#666666]">
              {quizData?.short_instruction || "Answer all questions."}
            </DialogDescription>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2.5 py-1">
                <Clock3 className="h-3.5 w-3.5" />
                {quizData?.time_limit_minutes ?? "-"} min
              </span>
              <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1">
                Passing score: {quizData?.passing_score ?? "-"}%
              </span>
              <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1">
                Attempts: {attemptsAllowed ?? "-"}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
            {quizQuestionsQuery.isLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map((skeleton) => (
                  <div
                    key={skeleton}
                    className="h-28 animate-pulse rounded-xl bg-gray-100"
                  />
                ))}
              </div>
            )}

            {quizQuestionsQuery.isError && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
                {getApiErrorMessage(
                  quizQuestionsQuery.error,
                  "Failed to load quiz questions."
                )}
              </div>
            )}

            {!quizQuestionsQuery.isLoading &&
              !quizQuestionsQuery.isError &&
              submitResult && (
                <div
                  className={cn(
                    "mb-6 rounded-xl border px-4 py-3",
                    submitResult.passed
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-red-200 bg-red-50"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold text-[#1D1D1D]">
                        Your grade: {submitResult.score_percentage}%
                      </p>
                      <p className="text-xs text-[#666666]">
                        Attempt {submitResult.attempt_number}
                        {attemptsAllowed ? ` of ${attemptsAllowed}` : ""} ·{" "}
                        {submitResult.passed ? "Passed" : "Not passed"}
                      </p>
                    </div>

                    {hasAttemptsRemaining && (
                      <Button
                        type="button"
                        variant="brand"
                        size="sm"
                        onClick={handleRetry}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Retry
                      </Button>
                    )}
                  </div>

                  <div className="mt-3 grid gap-2 text-xs text-[#555555] sm:grid-cols-2 lg:grid-cols-3">
                    <p>Total questions: {submitResult.total_questions}</p>
                    <p>Answered: {submitResult.answered_questions}</p>
                    <p>Correct: {submitResult.correct_answers}</p>
                    <p>Incorrect: {submitResult.incorrect_answers}</p>
                    <p>Unanswered: {submitResult.unanswered_questions}</p>
                    <p>Passing score: {submitResult.passing_score}%</p>
                  </div>
                </div>
              )}

            {!quizQuestionsQuery.isLoading &&
              !quizQuestionsQuery.isError &&
              questions.length === 0 && (
                <div className="rounded-xl border border-gray-100 bg-[#F8F9FC] p-4 text-sm text-[#666666]">
                  No questions available for this quiz yet.
                </div>
              )}

            <div className="space-y-6">
              {questions.map((questionItem, index) => {
                const answerState = answersByQuestionId[
                  questionItem.question_id
                ] ?? {
                  selectedOptions: [],
                  answerText: "",
                }

                const questionOptions = getQuestionOptions(questionItem)
                const isShortAnswer =
                  questionItem.question_type === "short_answer"
                const isMultipleSelect =
                  questionItem.question_type === "multiple_select"

                return (
                  <section
                    key={questionItem.question_id}
                    className="space-y-4 rounded-xl border border-gray-100 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold text-[#1D1D1D]">
                        {index + 1}. {questionItem.question_text}
                      </h3>
                      <Badge className="border-0 bg-[#EEF2FF] text-[#4B5563]">
                        1 point
                      </Badge>
                    </div>

                    {isShortAnswer ? (
                      <textarea
                        rows={4}
                        value={answerState.answerText}
                        onChange={(event) =>
                          updateShortAnswer(
                            questionItem.question_id,
                            event.target.value
                          )
                        }
                        disabled={isSubmitted || submitQuizMutation.isPending}
                        placeholder="Type your answer..."
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] disabled:bg-gray-50"
                      />
                    ) : (
                      <div className="space-y-2">
                        {questionOptions.map((optionItem) => {
                          const selected = answerState.selectedOptions.includes(
                            optionItem.key
                          )

                          return (
                            <button
                              key={optionItem.key}
                              type="button"
                              onClick={() => {
                                if (
                                  isSubmitted ||
                                  submitQuizMutation.isPending
                                ) {
                                  return
                                }

                                if (isMultipleSelect) {
                                  toggleMultipleOption(
                                    questionItem.question_id,
                                    optionItem.key
                                  )
                                  return
                                }

                                selectSingleOption(
                                  questionItem.question_id,
                                  optionItem.key
                                )
                              }}
                              className={cn(
                                "flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                                selected
                                  ? "border-[#4CC0D8] bg-[#ECF9FC]"
                                  : "border-gray-200 bg-white hover:bg-[#F8FAFC]",
                                (isSubmitted || submitQuizMutation.isPending) &&
                                  "cursor-not-allowed opacity-80"
                              )}
                            >
                              {selected ? (
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4CC0D8]" />
                              ) : (
                                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
                              )}
                              <span className="font-semibold text-[#4B5563]">
                                {optionItem.key}.
                              </span>
                              <span className="text-[#1D1D1D]">
                                {optionItem.value}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </section>
                )
              })}
            </div>
          </div>

        </div>
          <div className="border-t border-gray-100 bg-white px-5 py-4 sm:px-7 absolute bottom-0 w-full">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#666666]">
                {answeredQuestionCount} / {questions.length} answered
              </p>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="brandOutline"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>

                <Button
                  type="button"
                  variant="brand"
                  onClick={handleSubmitQuiz}
                  disabled={
                    submitQuizMutation.isPending ||
                    quizQuestionsQuery.isLoading ||
                    quizQuestionsQuery.isError ||
                    questions.length === 0 ||
                    isSubmitted
                  }
                >
                  {submitQuizMutation.isPending
                    ? "Submitting..."
                    : "Submit Quiz"}
                </Button>
              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  )
}
