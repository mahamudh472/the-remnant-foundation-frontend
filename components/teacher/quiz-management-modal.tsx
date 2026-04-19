"use client"

import React from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

type QuizManagementModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STEP_LABELS = ["Quiz Info", "Settings", "Questions"] as const

type QuestionItem = {
  id: number
  type: "Multiple Select" | "MCQ"
  text: string
}

export default function QuizManagementModal({
  open,
  onOpenChange,
}: QuizManagementModalProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [quizTitle, setQuizTitle] = React.useState("")
  const [quizType, setQuizType] = React.useState("All Grades")
  const [shortInstruction, setShortInstruction] = React.useState("")

  const [passingScore, setPassingScore] = React.useState("70")
  const [attemptsAllowed, setAttemptsAllowed] = React.useState("3")
  const [timeLimitMinutes, setTimeLimitMinutes] = React.useState("30")
  const [randomizeQuestions, setRandomizeQuestions] = React.useState(true)

  const [questions] = React.useState<QuestionItem[]>([
    {
      id: 1,
      type: "Multiple Select",
      text: "Question 1: Quiz Management Create, manage, and track student quizzes 1 ...",
    },
    {
      id: 2,
      type: "MCQ",
      text: "Question 2: Quiz Management Create, manage, and track student quizzes 2 ...",
    },
  ])

  const goPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
  const goNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, STEP_LABELS.length - 1))

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
    if (!nextOpen) {
      setCurrentStep(0)
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
                Filter and manage your quizzes
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
                    onChange={(e) => setQuizType(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  >
                    <option>All Grades</option>
                    <option>Kids</option>
                    <option>Teen</option>
                    <option>Adults</option>
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
                          {question.type}
                        </span>
                        <p className="truncate text-xs text-[#1D1D1D]">
                          {question.text}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
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
                    <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]">
                      <option>change question type</option>
                      <option>Multiple Select</option>
                      <option>MCQ</option>
                      <option>True/False</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Question Text *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter your question..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[#666666]">
                      Options *
                    </label>
                    {[1, 2, 3, 4].map((option) => (
                      <input
                        key={option}
                        type="text"
                        placeholder={`Option ${option}`}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                      />
                    ))}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Correct Answer *
                    </label>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#4B5563]">
                      {["Option A", "Option B", "Option C", "Option D"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex items-center gap-1"
                          >
                            <input type="checkbox" className="h-3.5 w-3.5" />
                            {option}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Explanation (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Explain why this is the correct answer..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2BA9D3]"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-[#D1D5DB] px-3 py-2 text-xs font-semibold text-white"
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
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#2BA9D3] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
              >
                Save Draft
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>
              {currentStep < STEP_LABELS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#2BA9D3] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleClose(false)}
                  className="rounded-lg bg-[#2BA9D3] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
