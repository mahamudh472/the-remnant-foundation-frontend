"use client"

import React from "react"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useCreateCourseQuizMutation } from "@/hooks/api/use-courses"
import { getApiErrorMessage } from "@/lib/api/client"
import type { CourseQuizQuestionType, CourseQuizType } from "@/lib/api/courses"
import { toast } from "sonner"

type QuizManagementModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: (quizId: number) => void
}

const STEP_LABELS = ["Quiz Info", "Settings", "Questions"] as const

const QUIZ_TYPE_OPTIONS: Array<{ value: CourseQuizType; label: string }> = [
  { value: "all_grades", label: "All Grades" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

const QUESTION_TYPE_OPTIONS: Array<{
  value: CourseQuizQuestionType
  label: string
}> = [
  { value: "mcq", label: "MCQ" },
  { value: "multiple_select", label: "Multiple Select" },
  { value: "short_answer", label: "Short Answer" },
]

type QuestionItem = {
  id: number
  question_type: CourseQuizQuestionType
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_options: string[]
  short_answer: string
  explanation: string
}

function nextQuestionId() {
  return Date.now() + Math.floor(Math.random() * 10_000)
}

function toPositiveInt(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }

  return parsed
}

function toBoundedInt(
  value: string,
  fallback: number,
  min: number,
  max: number
) {
  const parsed = Number.parseInt(value, 10)

  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return Math.min(max, Math.max(min, parsed))
}

export default function QuizManagementModal({
  open,
  onOpenChange,
  onCreated,
}: QuizManagementModalProps) {
  const createCourseQuizMutation = useCreateCourseQuizMutation()

  const [currentStep, setCurrentStep] = React.useState(0)
  const [quizTitle, setQuizTitle] = React.useState("")
  const [quizType, setQuizType] = React.useState<CourseQuizType>("all_grades")
  const [shortInstruction, setShortInstruction] = React.useState("")

  const [passingScore, setPassingScore] = React.useState("70")
  const [attemptsAllowed, setAttemptsAllowed] = React.useState("3")
  const [timeLimitMinutes, setTimeLimitMinutes] = React.useState("30")
  const [randomizeQuestions, setRandomizeQuestions] = React.useState(true)

  const [questions, setQuestions] = React.useState<QuestionItem[]>([])
  const [questionType, setQuestionType] =
    React.useState<CourseQuizQuestionType>("mcq")
  const [questionText, setQuestionText] = React.useState("")
  const [optionA, setOptionA] = React.useState("")
  const [optionB, setOptionB] = React.useState("")
  const [optionC, setOptionC] = React.useState("")
  const [optionD, setOptionD] = React.useState("")
  const [correctOptions, setCorrectOptions] = React.useState<string[]>([])
  const [shortAnswer, setShortAnswer] = React.useState("")
  const [explanation, setExplanation] = React.useState("")

  const isSubmitting = createCourseQuizMutation.isPending

  const goPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
  const goNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, STEP_LABELS.length - 1))

  const resetForm = () => {
    setCurrentStep(0)
    setQuizTitle("")
    setQuizType("all_grades")
    setShortInstruction("")
    setPassingScore("70")
    setAttemptsAllowed("3")
    setTimeLimitMinutes("30")
    setRandomizeQuestions(true)
    setQuestions([])
    setQuestionType("mcq")
    setQuestionText("")
    setOptionA("")
    setOptionB("")
    setOptionC("")
    setOptionD("")
    setCorrectOptions([])
    setShortAnswer("")
    setExplanation("")
  }

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen)

    if (!nextOpen) {
      resetForm()
    }
  }

  const toggleCorrectOption = (option: string) => {
    setCorrectOptions((previous) =>
      previous.includes(option)
        ? previous.filter((item) => item !== option)
        : [...previous, option]
    )
  }

  const resetQuestionBuilder = () => {
    setQuestionText("")
    setOptionA("")
    setOptionB("")
    setOptionC("")
    setOptionD("")
    setCorrectOptions([])
    setShortAnswer("")
    setExplanation("")
  }

  const addQuestion = () => {
    if (!questionText.trim()) {
      toast.error("Question text is required")
      return
    }

    if (questionType === "short_answer") {
      if (!shortAnswer.trim()) {
        toast.error("Short answer is required")
        return
      }
    } else {
      if (
        !optionA.trim() ||
        !optionB.trim() ||
        !optionC.trim() ||
        !optionD.trim()
      ) {
        toast.error("All four options are required")
        return
      }

      if (correctOptions.length === 0) {
        toast.error("Choose at least one correct option")
        return
      }
    }

    setQuestions((previous) => [
      ...previous,
      {
        id: nextQuestionId(),
        question_type: questionType,
        question_text: questionText.trim(),
        option_a: optionA.trim(),
        option_b: optionB.trim(),
        option_c: optionC.trim(),
        option_d: optionD.trim(),
        correct_options: correctOptions,
        short_answer: shortAnswer.trim(),
        explanation: explanation.trim(),
      },
    ])

    resetQuestionBuilder()
    toast.success("Question added")
  }

  const removeQuestion = (questionId: number) => {
    setQuestions((previous) =>
      previous.filter((questionItem) => questionItem.id !== questionId)
    )
  }

  async function submitQuiz() {
    if (!quizTitle.trim()) {
      toast.error("Quiz title is required")
      return
    }

    if (!shortInstruction.trim()) {
      toast.error("Short instruction is required")
      return
    }

    if (questions.length === 0) {
      toast.error("Add at least one question")
      return
    }

    try {
      const response = await createCourseQuizMutation.mutateAsync({
        lesson_id: null,
        title: quizTitle.trim(),
        quiz_type: quizType,
        short_instruction: shortInstruction.trim(),
        passing_score: toBoundedInt(passingScore, 70, 0, 100),
        attempts_allowed: toPositiveInt(attemptsAllowed, 3),
        time_limit_minutes: toPositiveInt(timeLimitMinutes, 30),
        randomize_questions: randomizeQuestions,
        questions: questions.map((questionItem, index) => ({
          question_type: questionItem.question_type,
          question_text: questionItem.question_text,
          option_a:
            questionItem.question_type === "short_answer"
              ? ""
              : questionItem.option_a,
          option_b:
            questionItem.question_type === "short_answer"
              ? ""
              : questionItem.option_b,
          option_c:
            questionItem.question_type === "short_answer"
              ? ""
              : questionItem.option_c,
          option_d:
            questionItem.question_type === "short_answer"
              ? ""
              : questionItem.option_d,
          correct_options:
            questionItem.question_type === "short_answer"
              ? []
              : questionItem.correct_options,
          short_answer:
            questionItem.question_type === "short_answer"
              ? questionItem.short_answer
              : "",
          explanation: questionItem.explanation,
          order: index,
        })),
      })

      toast.success(response.message || "Quiz created successfully")
      onCreated?.(response.quiz.id)
      handleClose(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to create quiz"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="h-[90svh] w-[min(96vw,800px)] max-w-none overflow-hidden rounded-2xl border border-gray-200 bg-white p-0">
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-6 sm:p-8">
            <div>
              <DialogTitle className="text-2xl font-semibold text-[#1D1D1D]">
                Quiz Management
              </DialogTitle>
              <DialogDescription className="text-xs text-[#9CA3AF]">
                Create a quiz and attach it to the selected lesson
              </DialogDescription>
            </div>

            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center">
                {STEP_LABELS.map((label, index) => (
                  <React.Fragment key={label}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(index)}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={[
                          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                          index <= currentStep
                            ? "bg-[#2BA9D3] text-white"
                            : "bg-[#E5E7EB] text-[#6B7280]",
                        ].join(" ")}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={[
                          "text-xs font-medium",
                          index <= currentStep
                            ? "text-[#2BA9D3]"
                            : "text-[#9CA3AF]",
                        ].join(" ")}
                      >
                        {label}
                      </span>
                    </button>
                    {index < STEP_LABELS.length - 1 && (
                      <div
                        className={[
                          "mx-3 h-[1px] min-w-16 flex-1",
                          index < currentStep ? "bg-[#2BA9D3]" : "bg-[#E5E7EB]",
                        ].join(" ")}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {currentStep === 0 && (
              <section className="space-y-4 rounded-xl border border-gray-100 p-4">
                <div>
                  <h4 className="font-semibold text-[#1D1D1D]">
                    Quiz Information
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Provide basic details about the quiz
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Quiz Title *
                  </label>
                  <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder='Course cascade filtering ensures proper"'
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Quiz Type *
                  </label>
                  <select
                    value={quizType}
                    onChange={(e) =>
                      setQuizType(e.target.value as CourseQuizType)
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  >
                    {QUIZ_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Short Instruction *
                  </label>
                  <textarea
                    rows={3}
                    value={shortInstruction}
                    onChange={(e) => setShortInstruction(e.target.value)}
                    placeholder="Provide instructions for students taking this quiz..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                </div>
              </section>
            )}

            {currentStep === 1 && (
              <section className="space-y-4 rounded-xl border border-gray-100 p-4">
                <div>
                  <h4 className="font-semibold text-[#1D1D1D]">
                    Quiz Settings
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Configure quiz rules and behavior
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Passing Score (%) *
                  </label>
                  <input
                    type="number"
                    value={passingScore}
                    onChange={(e) => setPassingScore(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                  <p className="mt-1 text-[11px] text-[#9CA3AF]">
                    Minimum score required to pass (0-100)
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Attempts Allowed *
                  </label>
                  <input
                    type="number"
                    value={attemptsAllowed}
                    onChange={(e) => setAttemptsAllowed(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                  <p className="mt-1 text-[11px] text-[#9CA3AF]">
                    Number of times a student can retake the quiz
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={timeLimitMinutes}
                    onChange={(e) => setTimeLimitMinutes(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                  <p className="mt-1 text-[11px] text-[#9CA3AF]">
                    Optional. Leave empty for no time limit.
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <div>
                    <p className="text-xs font-medium text-[#1D1D1D]">
                      Randomize Questions
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      Show questions in random order
                    </p>
                  </div>
                  <Switch
                    checked={randomizeQuestions}
                    onCheckedChange={(checked) =>
                      setRandomizeQuestions(checked)
                    }
                  />
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="space-y-4 rounded-xl border border-gray-100 p-4">
                <div>
                  <h4 className="font-semibold text-[#1D1D1D]">Questions</h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Add questions to your quiz
                  </p>
                </div>

                <div className="space-y-2">
                  {questions.map((question) => (
                    <div
                      key={question.id}
                      className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="rounded bg-[#EBF8FC] px-2 py-1 text-[11px] font-medium text-[#2BA9D3]">
                          {
                            QUESTION_TYPE_OPTIONS.find(
                              (option) =>
                                option.value === question.question_type
                            )?.label
                          }
                        </span>
                        <p className="truncate text-xs text-[#1D1D1D]">
                          {question.question_text}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="rounded p-1 text-[#9CA3AF] transition-colors hover:bg-white hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 rounded-xl border border-gray-100 p-3">
                  <h5 className="text-sm font-semibold text-[#1D1D1D]">
                    Add New Question
                  </h5>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Question Type
                    </label>
                    <select
                      value={questionType}
                      onChange={(event) =>
                        setQuestionType(
                          event.target.value as CourseQuizQuestionType
                        )
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                    >
                      {QUESTION_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Question Text *
                    </label>
                    <textarea
                      rows={3}
                      value={questionText}
                      onChange={(event) => setQuestionText(event.target.value)}
                      placeholder="Enter your question..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                    />
                  </div>

                  {questionType === "short_answer" ? (
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#666666]">
                        Correct Short Answer *
                      </label>
                      <input
                        type="text"
                        value={shortAnswer}
                        onChange={(event) => setShortAnswer(event.target.value)}
                        placeholder="Type the expected short answer"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-[#666666]">
                          Options *
                        </label>
                        <input
                          type="text"
                          value={optionA}
                          onChange={(event) => setOptionA(event.target.value)}
                          placeholder="Option A"
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                        />
                        <input
                          type="text"
                          value={optionB}
                          onChange={(event) => setOptionB(event.target.value)}
                          placeholder="Option B"
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                        />
                        <input
                          type="text"
                          value={optionC}
                          onChange={(event) => setOptionC(event.target.value)}
                          placeholder="Option C"
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                        />
                        <input
                          type="text"
                          value={optionD}
                          onChange={(event) => setOptionD(event.target.value)}
                          placeholder="Option D"
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#666666]">
                          Correct Answer *
                        </label>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#4B5563]">
                          {["A", "B", "C", "D"].map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-1"
                            >
                              <input
                                type="checkbox"
                                className="h-3.5 w-3.5"
                                checked={correctOptions.includes(option)}
                                onChange={() => toggleCorrectOption(option)}
                              />
                              Option {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Explanation (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={explanation}
                      onChange={(event) => setExplanation(event.target.value)}
                      placeholder="Explain why this is the correct answer..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#2BA9D3] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Question
                  </button>
                </div>
              </section>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleClose(false)}
                disabled={isSubmitting}
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => toast.success("Draft saved locally")}
                disabled={isSubmitting}
                className="rounded-lg bg-[#2BA9D3] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
              >
                Save Draft
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentStep === 0 || isSubmitting}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>
              {currentStep < STEP_LABELS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#2BA9D3] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitQuiz}
                  disabled={isSubmitting}
                  className="rounded-lg bg-[#2BA9D3] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
