"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Clock,
  RotateCcw,
  Percent,
  Shuffle,
  Pencil,
  Save,
  Plus,
  Check,
  Trash2,
  X,
} from "lucide-react"

type QuestionType = "MCQ" | "Written"
type QuizStatus = "Published" | "Draft" | "Closed"

interface Question {
  id: number
  type: QuestionType
  text: string
  options: string[]
  correctAnswer: string
  note: string | null
}

interface QuizData {
  title: string
  subtitle: string
  gradeAgeGroup: string
  program: string
  course: string
  status: QuizStatus
  instructions: string
  settings: {
    passingScore: string
    attempts: number
    timeLimit: string
    randomize: boolean
  }
  security: {
    disableCopyPaste: boolean
    tabSwitchWarning: boolean
    autoSubmitOnExit: boolean
  }
  questions: Question[]
}

const INITIAL_QUIZ: QuizData = {
  title: "abc",
  subtitle: "Course Quiz",
  gradeAgeGroup: "Adults (18+)",
  program: "Discipleship",
  course: "Foundation of Faith",
  status: "Published",
  instructions:
    "What is the main purpose of a Learning Management System (LMS)?",
  settings: {
    passingScore: "70%",
    attempts: 10,
    timeLimit: "30m",
    randomize: true,
  },
  security: {
    disableCopyPaste: true,
    tabSwitchWarning: true,
    autoSubmitOnExit: true,
  },
  questions: [
    {
      id: 1,
      type: "MCQ",
      text: "What is the main purpose of a Learning Management System (LMS)?",
      options: [
        "To play games",
        "To manage and deliver learning content",
        "To create social media posts",
        "To sell products",
      ],
      correctAnswer: "To manage and deliver learning content",
      note: "Lorem ipsum dolor sit amet consectetur. In auctor suspendesee pulvinar rhoncus morbi ipsum natoque cursus mi. Cursus posuere morbi ut ultrices semper purus dictum. Netus vel habitasss amet auctor at arcu ullamcorper lacus.",
    },
    {
      id: 2,
      type: "MCQ",
      text: "What is the main purpose of a Learning Management System (LMS)?",
      options: [
        "To play games",
        "To manage and deliver learning content",
        "To create social media posts",
        "To sell products",
      ],
      correctAnswer: "To manage and deliver learning content",
      note: "Lorem ipsum dolor sit amet consectetur. In auctor suspendesee pulvinar rhoncus morbi ipsum natoque cursus mi. Cursus posuere morbi ut ultrices semper purus dictum. Netus vel habitasss amet auctor at arcu ullamcorper lacus.",
    },
    {
      id: 3,
      type: "Written",
      text: "Explain why progress tracking is important for students in an online learning platform",
      options: [],
      correctAnswer:
        "Progress tracking is important because it helps students understand how much they have learned and what they need to complete next. It motivates students to stay consistent, improves learning discipline, and allows teachers to monitor performance and provide proper guidance.",
      note: null,
    },
  ],
}

export default function QuizDetailPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [quiz, setQuiz] = useState<QuizData>(INITIAL_QUIZ)

  function updateField<K extends keyof QuizData>(key: K, value: QuizData[K]) {
    setQuiz((prev) => ({ ...prev, [key]: value }))
  }

  function updateSetting<K extends keyof QuizData["settings"]>(
    key: K,
    value: QuizData["settings"][K]
  ) {
    setQuiz((prev) => ({
      ...prev,
      settings: { ...prev.settings, [key]: value },
    }))
  }

  function toggleSecurity(key: keyof QuizData["security"]) {
    setQuiz((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: !prev.security[key] },
    }))
  }

  function updateQuestion(id: number, patch: Partial<Question>) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, ...patch } : q
      ),
    }))
  }

  function updateOption(qId: number, optIdx: number, value: string) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id !== qId) return q
        const options = [...q.options]
        const wasCorrect = options[optIdx] === q.correctAnswer
        options[optIdx] = value
        return {
          ...q,
          options,
          correctAnswer: wasCorrect ? value : q.correctAnswer,
        }
      }),
    }))
  }

  function addOption(qId: number) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === qId ? { ...q, options: [...q.options, ""] } : q
      ),
    }))
  }

  function removeOption(qId: number, optIdx: number) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id !== qId) return q
        const options = q.options.filter((_, i) => i !== optIdx)
        return {
          ...q,
          options,
          correctAnswer:
            q.options[optIdx] === q.correctAnswer ? "" : q.correctAnswer,
        }
      }),
    }))
  }

  function addQuestion() {
    const nextId = Math.max(0, ...quiz.questions.map((q) => q.id)) + 1
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: nextId,
          type: "MCQ",
          text: "",
          options: ["", ""],
          correctAnswer: "",
          note: null,
        },
      ],
    }))
  }

  function deleteQuestion(id: number) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
  }

  const inputCls =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1D1D1D]">Quiz Management</h2>
          <p className="mt-0.5 text-sm text-[#9CA3AF]">
            Create manage and track student quizzes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          <Link
            href="/teacher/quiz/add"
            className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            <Plus className="h-4 w-4" />
            Add Quiz
          </Link>
        </div>
      </div>

      {/* Back + Edit row */}
      <div className="flex items-center justify-between">
        <Link
          href="/teacher/quiz"
          className="flex items-center gap-2 text-sm text-[#666666] transition-colors hover:text-[#4CC0D8]"
        >
          <ArrowLeft className="h-4 w-4" />
          <div>
            {isEditing ? (
              <input
                value={quiz.title}
                onChange={(e) => updateField("title", e.target.value)}
                onClick={(e) => e.preventDefault()}
                className="border-b border-[#4CC0D8] bg-transparent font-semibold text-[#1D1D1D] outline-none"
              />
            ) : (
              <p className="font-semibold text-[#1D1D1D]">{quiz.title}</p>
            )}
            <p className="text-xs text-[#9CA3AF]">{quiz.subtitle}</p>
          </div>
        </Link>
        <button
          onClick={() => setIsEditing((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-[#4CC0D8] transition-colors hover:text-[#3AB0C8]"
        >
          <Pencil className="h-3.5 w-3.5" />
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {/* Quiz Information */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Quiz Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">Grade / Age Group</p>
              {isEditing ? (
                <input
                  value={quiz.gradeAgeGroup}
                  onChange={(e) => updateField("gradeAgeGroup", e.target.value)}
                  className={inputCls}
                />
              ) : (
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {quiz.gradeAgeGroup}
                </p>
              )}
            </div>
            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">Program</p>
              {isEditing ? (
                <input
                  value={quiz.program}
                  onChange={(e) => updateField("program", e.target.value)}
                  className={inputCls}
                />
              ) : (
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {quiz.program}
                </p>
              )}
            </div>
            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">Course</p>
              {isEditing ? (
                <input
                  value={quiz.course}
                  onChange={(e) => updateField("course", e.target.value)}
                  className={inputCls}
                />
              ) : (
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {quiz.course}
                </p>
              )}
            </div>
            <div>
              <p className="mb-1 text-xs text-[#9CA3AF]">Status</p>
              {isEditing ? (
                <select
                  value={quiz.status}
                  onChange={(e) =>
                    updateField("status", e.target.value as QuizStatus)
                  }
                  className={inputCls}
                >
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Closed</option>
                </select>
              ) : (
                <Badge className="bg-[#EBF7F9] text-xs text-[#4CC0D8]">
                  {quiz.status}
                </Badge>
              )}
            </div>
            <div className="sm:col-span-2">
              <p className="mb-1 text-xs text-[#9CA3AF]">Instructions</p>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={quiz.instructions}
                  onChange={(e) => updateField("instructions", e.target.value)}
                  className={inputCls}
                />
              ) : (
                <p className="text-sm text-[#666666]">{quiz.instructions}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Settings */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Quiz Settings</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-[#F8F9FC] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-[#9CA3AF]">
                <Percent className="h-3.5 w-3.5 text-[#4CC0D8]" />
                Passing Score
              </div>
              {isEditing ? (
                <input
                  value={quiz.settings.passingScore}
                  onChange={(e) =>
                    updateSetting("passingScore", e.target.value)
                  }
                  className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm font-bold text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                />
              ) : (
                <p className="text-lg font-bold text-[#1D1D1D]">
                  {quiz.settings.passingScore}
                </p>
              )}
            </div>
            <div className="rounded-xl bg-[#F8F9FC] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-[#9CA3AF]">
                <RotateCcw className="h-3.5 w-3.5 text-[#4CC0D8]" />
                Attempts
              </div>
              {isEditing ? (
                <input
                  type="number"
                  min={1}
                  value={quiz.settings.attempts}
                  onChange={(e) =>
                    updateSetting("attempts", Number(e.target.value))
                  }
                  className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm font-bold text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                />
              ) : (
                <p className="text-lg font-bold text-[#1D1D1D]">
                  {quiz.settings.attempts}
                </p>
              )}
            </div>
            <div className="rounded-xl bg-[#F8F9FC] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-[#9CA3AF]">
                <Clock className="h-3.5 w-3.5 text-[#4CC0D8]" />
                Time Limit
              </div>
              {isEditing ? (
                <input
                  value={quiz.settings.timeLimit}
                  onChange={(e) => updateSetting("timeLimit", e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm font-bold text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                />
              ) : (
                <p className="text-lg font-bold text-[#1D1D1D]">
                  {quiz.settings.timeLimit}
                </p>
              )}
            </div>
            <div className="rounded-xl bg-[#F8F9FC] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-[#9CA3AF]">
                <Shuffle className="h-3.5 w-3.5 text-[#4CC0D8]" />
                Randomize
              </div>
              {isEditing ? (
                <button
                  onClick={() =>
                    updateSetting("randomize", !quiz.settings.randomize)
                  }
                  className={`text-sm font-bold transition-colors ${quiz.settings.randomize ? "text-[#4CC0D8]" : "text-[#9CA3AF]"}`}
                >
                  {quiz.settings.randomize ? "Yes" : "No"}
                </button>
              ) : (
                <p className="text-lg font-bold text-[#1D1D1D]">
                  {quiz.settings.randomize ? "Yes" : "No"}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Security Settings</h3>
          <div className="divide-y divide-gray-50">
            {(
              [
                { key: "disableCopyPaste", label: "Disable Copy-Paste" },
                { key: "tabSwitchWarning", label: "Tab Switch Warning" },
                { key: "autoSubmitOnExit", label: "Auto-Submit on Exit" },
              ] as { key: keyof QuizData["security"]; label: string }[]
            ).map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between py-3">
                <span className="text-sm text-[#666666]">{label}</span>
                {isEditing ? (
                  <button
                    onClick={() => toggleSecurity(key)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      quiz.security[key]
                        ? "bg-[#EBF7F9] text-[#4CC0D8]"
                        : "bg-gray-100 text-[#9CA3AF]"
                    }`}
                  >
                    {quiz.security[key] ? "Enabled" : "Disabled"}
                  </button>
                ) : (
                  <span
                    className={`text-sm font-medium ${quiz.security[key] ? "text-[#4CC0D8]" : "text-[#9CA3AF]"}`}
                  >
                    {quiz.security[key] ? "Enabled" : "Disabled"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-5 font-bold text-[#1D1D1D]">
            Questions ({quiz.questions.length})
          </h3>
          <div className="space-y-6">
            {quiz.questions.map((q, idx) => (
              <div key={q.id} className="rounded-xl border border-gray-100 p-5">
                {/* Question header */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4CC0D8] text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    {isEditing ? (
                      <select
                        value={q.type}
                        onChange={(e) =>
                          updateQuestion(q.id, {
                            type: e.target.value as QuestionType,
                            options: e.target.value === "MCQ" ? ["", ""] : [],
                            correctAnswer: "",
                          })
                        }
                        className="rounded-md border border-[#4CC0D8] bg-[#EBF7F9] px-2 py-0.5 text-xs font-semibold text-[#4CC0D8] outline-none"
                      >
                        <option value="MCQ">MCQ</option>
                        <option value="Written">Written</option>
                      </select>
                    ) : (
                      <Badge className="bg-[#EBF7F9] text-xs text-[#4CC0D8]">
                        {q.type}
                      </Badge>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="text-red-400 transition-colors hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Question text */}
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={q.text}
                    onChange={(e) =>
                      updateQuestion(q.id, { text: e.target.value })
                    }
                    placeholder="Enter question..."
                    className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                ) : (
                  <p className="mb-4 text-sm font-medium text-[#1D1D1D]">
                    {q.text}
                  </p>
                )}

                {/* MCQ options */}
                {q.type === "MCQ" && (
                  <div className="mb-4 space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = opt === q.correctAnswer && opt !== ""
                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                            isCorrect
                              ? "bg-[#EBF7F9] text-[#4CC0D8]"
                              : "text-[#666666]"
                          }`}
                        >
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                title="Mark as correct"
                                onClick={() =>
                                  updateQuestion(q.id, { correctAnswer: opt })
                                }
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                  isCorrect
                                    ? "border-[#4CC0D8] bg-[#4CC0D8]"
                                    : "border-gray-300"
                                }`}
                              >
                                {isCorrect && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                )}
                              </button>
                              <input
                                value={opt}
                                onChange={(e) =>
                                  updateOption(q.id, optIdx, e.target.value)
                                }
                                placeholder={`Option ${optIdx + 1}`}
                                className="flex-1 bg-transparent text-sm outline-none"
                              />
                              <button
                                onClick={() => removeOption(q.id, optIdx)}
                                className="text-red-300 transition-colors hover:text-red-500"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              {isCorrect ? (
                                <Check className="h-3.5 w-3.5 shrink-0 text-[#4CC0D8]" />
                              ) : (
                                <span className="h-3.5 w-3.5 shrink-0" />
                              )}
                              {opt}
                            </>
                          )}
                        </div>
                      )
                    })}
                    {isEditing && (
                      <button
                        onClick={() => addOption(q.id)}
                        className="flex items-center gap-1.5 text-xs text-[#4CC0D8] transition-colors hover:text-[#3AB0C8]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Option
                      </button>
                    )}
                  </div>
                )}

                {/* Written answer textarea */}
                {q.type === "Written" && (
                  <div className="mb-4">
                    <textarea
                      rows={4}
                      placeholder="Answer the following question..."
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#666666] outline-none focus:border-[#4CC0D8]"
                      readOnly
                    />
                  </div>
                )}

                {/* Correct answer / note */}
                <div className="rounded-lg bg-[#EBF7F9] px-4 py-3">
                  {isEditing ? (
                    <>
                      <p className="mb-1 text-xs font-semibold text-[#4CC0D8]">
                        ✓ Correct / Model Answer
                      </p>
                      <textarea
                        rows={2}
                        value={q.correctAnswer}
                        onChange={(e) =>
                          updateQuestion(q.id, {
                            correctAnswer: e.target.value,
                          })
                        }
                        placeholder="Correct / model answer..."
                        className="mb-2 w-full rounded border border-[#4CC0D8]/30 bg-white px-2 py-1 text-xs text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                      />
                      <p className="mb-1 text-xs font-semibold text-[#4CC0D8]">
                        Note
                      </p>
                      <textarea
                        rows={2}
                        value={q.note ?? ""}
                        onChange={(e) =>
                          updateQuestion(q.id, { note: e.target.value || null })
                        }
                        placeholder="Optional note..."
                        className="w-full rounded border border-[#4CC0D8]/30 bg-white px-2 py-1 text-xs text-[#9CA3AF] outline-none focus:border-[#4CC0D8]"
                      />
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-[#4CC0D8]">
                        <span className="font-semibold">✓ </span>
                        {q.correctAnswer}
                      </p>
                      {q.note && (
                        <p className="mt-1 text-xs text-[#9CA3AF]">
                          <span className="font-semibold text-[#4CC0D8]">
                            Note:{" "}
                          </span>
                          {q.note}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Question */}
          {isEditing && (
            <button
              onClick={addQuestion}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#4CC0D8] py-3 text-sm font-semibold text-[#4CC0D8] transition-colors hover:bg-[#EBF7F9]"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
