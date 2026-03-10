"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Save, Plus, Trash2, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  id: number
  type: "MCQ" | "Multiple Select" | "Written"
  text: string
  options: [string, string, string, string]
  correctAnswers: boolean[] // 4 booleans
  explanation: string
}

interface FormData {
  // Step 1
  title: string
  quizType: string
  instructions: string
  // Step 2
  gradeAgeGroup: string
  program: string
  course: string
  // Step 3
  passingScore: string
  attemptsAllowed: string
  timeLimit: string
  randomize: boolean
  // Step 4
  questions: Question[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GRADE_OPTIONS = [
  "All Grades",
  "Kids (5–10)",
  "Junior (11–13)",
  "Teen (14–18)",
  "Young Adults (19–25)",
  "Adults (18+)",
]

const PROGRAMS_BY_GRADE: Record<string, string[]> = {
  "Kids (5–10)": ["Children Ministry", "Sunday School"],
  "Junior (11–13)": ["Youth Ministry", "Bible Club"],
  "Teen (14–18)": ["Teen Church", "Youth Ministry"],
  "Young Adults (19–25)": ["Discipleship", "Young Adults Ministry"],
  "Adults (18+)": ["Discipleship", "Adults Ministry", "Christian Living"],
}

const COURSES_BY_PROGRAM: Record<string, string[]> = {
  "Children Ministry": ["Bible Stories for Kids", "Prayer Basics"],
  "Sunday School": ["Christian Values", "Old Testament Overview"],
  "Youth Ministry": ["New Testament Basics", "Worship & Praise"],
  "Bible Club": ["Proverbs Study", "Psalms for Youth"],
  "Teen Church": ["Christian Worldview", "Faith & Culture"],
  Discipleship: ["Foundation of Faith", "Christian Living", "Prayer & Fasting"],
  "Adults Ministry": ["Theology Basics", "Christian Growth"],
  "Christian Living": ["Everyday Faith", "Living the Word"],
  "Young Adults Ministry": ["Identity in Christ", "Purpose & Calling"],
}

const QUESTION_TYPES = ["MCQ", "Multiple Select", "Written"]

const STEPS = [
  { label: "Quiz Info" },
  { label: "Assign To" },
  { label: "Settings" },
  { label: "Questions" },
]

const BLANK_QUESTION = (): Question => ({
  id: Date.now(),
  type: "MCQ",
  text: "",
  options: ["", "", "", ""],
  correctAnswers: [false, false, false, false],
  explanation: "",
})

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1
        const done = stepNum < current
        const active = stepNum === current
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  done || active
                    ? "bg-[#4CC0D8] text-white"
                    : "border-2 border-gray-200 bg-white text-[#9CA3AF]"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : stepNum}
              </div>
              <span
                className={`text-sm font-medium ${
                  active
                    ? "text-[#4CC0D8]"
                    : done
                      ? "text-[#1D1D1D]"
                      : "text-[#9CA3AF]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`mx-3 h-[2px] w-12 transition-colors ${
                  stepNum < current ? "bg-[#4CC0D8]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Quiz Info ─────────────────────────────────────────────────────────

function StepQuizInfo({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF]"

  return (
    <div>
      <h3 className="text-lg font-bold text-[#1D1D1D]">Quiz Information</h3>
      <p className="mt-1 mb-6 text-sm text-[#9CA3AF]">
        Provide basic details about the quiz
      </p>
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Quiz Title <span className="text-[#4CC0D8]">*</span>
          </label>
          <input
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Course cascade filtering ensures proper"
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Quiz Type <span className="text-[#4CC0D8]">*</span>
          </label>
          <div className="relative">
            <select
              value={data.quizType}
              onChange={(e) => onChange({ quizType: e.target.value })}
              className={`${inputCls} appearance-none pr-10`}
            >
              <option value="">All Grades</option>
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Short Instruction <span className="text-[#4CC0D8]">*</span>
          </label>
          <textarea
            rows={4}
            value={data.instructions}
            onChange={(e) => onChange({ instructions: e.target.value })}
            placeholder="Provide instructions for students taking this quiz..."
            className={inputCls}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: Assign To ─────────────────────────────────────────────────────────

function StepAssignTo({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF] appearance-none pr-10"

  const programs = PROGRAMS_BY_GRADE[data.gradeAgeGroup] ?? []
  const courses = COURSES_BY_PROGRAM[data.program] ?? []

  const showPreview = data.gradeAgeGroup && data.program && data.course

  return (
    <div>
      <h3 className="text-lg font-bold text-[#1D1D1D]">Assign Quiz To</h3>
      <p className="mt-1 mb-6 text-sm text-[#9CA3AF]">
        Select the target audience for this quiz
      </p>
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Grade / Age Group <span className="text-[#4CC0D8]">*</span>
          </label>
          <div className="relative">
            <select
              value={data.gradeAgeGroup}
              onChange={(e) =>
                onChange({
                  gradeAgeGroup: e.target.value,
                  program: "",
                  course: "",
                })
              }
              className={inputCls}
            >
              <option value="">Select Grade / age group</option>
              {GRADE_OPTIONS.filter((g) => g !== "All Grades").map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Program <span className="text-[#4CC0D8]">*</span>
          </label>
          <div className="relative">
            <select
              value={data.program}
              disabled={!data.gradeAgeGroup}
              onChange={(e) =>
                onChange({ program: e.target.value, course: "" })
              }
              className={`${inputCls} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-[#9CA3AF]`}
            >
              <option value="">Select program</option>
              {programs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Course <span className="text-[#4CC0D8]">*</span>
          </label>
          <div className="relative">
            <select
              value={data.course}
              disabled={!data.program}
              onChange={(e) => onChange({ course: e.target.value })}
              className={`${inputCls} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-[#9CA3AF]`}
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          </div>
        </div>

        {showPreview && (
          <div className="rounded-xl bg-[#EBF7F9] px-4 py-3 text-sm text-[#4CC0D8]">
            <span className="font-semibold">Quiz will be assigned to: </span>
            {data.gradeAgeGroup} → {data.program} → {data.course}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 3: Settings ──────────────────────────────────────────────────────────

function StepSettings({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF]"

  return (
    <div>
      <h3 className="text-lg font-bold text-[#1D1D1D]">Quiz Settings</h3>
      <p className="mt-1 mb-6 text-sm text-[#9CA3AF]">
        Configure quiz rules and behavior
      </p>
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Passing Score (%) <span className="text-[#4CC0D8]">*</span>
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={data.passingScore}
            onChange={(e) => onChange({ passingScore: e.target.value })}
            placeholder="70"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Minimum score required to pass (0–100)
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Attempts Allowed <span className="text-[#4CC0D8]">*</span>
          </label>
          <input
            type="number"
            min={1}
            value={data.attemptsAllowed}
            onChange={(e) => onChange({ attemptsAllowed: e.target.value })}
            placeholder="3"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Number of times a student can retake the quiz
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            min={1}
            value={data.timeLimit}
            onChange={(e) => onChange({ timeLimit: e.target.value })}
            placeholder="30"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Optional: Leave empty for no time limit
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#F8F9FC] px-4 py-4">
          <div>
            <p className="text-sm font-semibold text-[#1D1D1D]">
              Randomize Questions
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Show questions in random order
            </p>
          </div>
          <Switch
            checked={data.randomize}
            onCheckedChange={(v) => onChange({ randomize: v })}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: Questions ─────────────────────────────────────────────────────────

function StepQuestions({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  const [draft, setDraft] = useState<Question>(BLANK_QUESTION())

  function updateDraft(patch: Partial<Question>) {
    setDraft((prev) => ({ ...prev, ...patch }))
  }

  function updateDraftOption(idx: number, value: string) {
    const options = [...draft.options] as [string, string, string, string]
    options[idx] = value
    setDraft((prev) => ({ ...prev, options }))
  }

  function toggleCorrect(idx: number) {
    const correctAnswers = [...draft.correctAnswers]
    if (draft.type === "MCQ") {
      // single-select: only one can be correct
      correctAnswers.fill(false)
      correctAnswers[idx] = true
    } else {
      correctAnswers[idx] = !correctAnswers[idx]
    }
    setDraft((prev) => ({ ...prev, correctAnswers }))
  }

  function addQuestion() {
    if (!draft.text.trim()) return
    onChange({ questions: [...data.questions, { ...draft, id: Date.now() }] })
    setDraft(BLANK_QUESTION())
  }

  function deleteQuestion(id: number) {
    onChange({ questions: data.questions.filter((q) => q.id !== id) })
  }

  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF]"

  const optionLabels = ["A", "B", "C", "D"]

  return (
    <div>
      <h3 className="text-lg font-bold text-[#1D1D1D]">Questions</h3>
      <p className="mt-1 mb-6 text-sm text-[#9CA3AF]">
        Add questions to your quiz
      </p>

      {/* Added questions list */}
      {data.questions.length > 0 && (
        <div className="mb-5 space-y-2">
          {data.questions.map((q, idx) => (
            <div
              key={q.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[#EBF7F9] px-2 py-0.5 text-xs font-semibold text-[#4CC0D8]">
                  {q.type}
                </span>
                <span className="max-w-sm truncate text-sm text-[#1D1D1D]">
                  Question {idx + 1}: {q.text || "(no text)"}
                </span>
              </div>
              <button
                onClick={() => deleteQuestion(q.id)}
                className="ml-3 shrink-0 text-red-400 transition-colors hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add new question form */}
      <div className="rounded-xl border border-gray-100 p-5">
        <h4 className="mb-4 text-sm font-bold text-[#1D1D1D]">
          Add New Question
        </h4>
        <div className="space-y-4">
          {/* Question Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#666666]">
              Question Type
            </label>
            <div className="relative">
              <select
                value={draft.type}
                onChange={(e) =>
                  updateDraft({
                    type: e.target.value as Question["type"],
                    correctAnswers: [false, false, false, false],
                  })
                }
                className={`${inputCls} appearance-none pr-10`}
              >
                {QUESTION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#666666]">
              Question Text <span className="text-[#4CC0D8]">*</span>
            </label>
            <textarea
              rows={3}
              value={draft.text}
              onChange={(e) => updateDraft({ text: e.target.value })}
              placeholder="Enter your question..."
              className={inputCls}
            />
          </div>

          {/* Options (MCQ / Multiple Select) */}
          {draft.type !== "Written" && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#666666]">
                  Options <span className="text-[#4CC0D8]">*</span>
                </label>
                <div className="space-y-2">
                  {draft.options.map((opt, i) => (
                    <input
                      key={i}
                      value={opt}
                      onChange={(e) => updateDraftOption(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className={inputCls}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#666666]">
                  Correct Answer <span className="text-[#4CC0D8]">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  {optionLabels.map((label, i) => (
                    <label
                      key={label}
                      className="flex cursor-pointer items-center gap-1.5 text-sm text-[#666666]"
                    >
                      <input
                        type={draft.type === "MCQ" ? "radio" : "checkbox"}
                        name="correct"
                        checked={draft.correctAnswers[i]}
                        onChange={() => toggleCorrect(i)}
                        className="accent-[#4CC0D8]"
                      />
                      Option {label}:
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Explanation */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#666666]">
              Explanation (Optional)
            </label>
            <textarea
              rows={3}
              value={draft.explanation}
              onChange={(e) => updateDraft({ explanation: e.target.value })}
              placeholder="Explain why this is the correct answer..."
              className={inputCls}
            />
          </div>

          <button
            onClick={addQuestion}
            className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!draft.text.trim()}
          >
            <Plus className="h-4 w-4" />
            Add Question
          </button>
        </div>
      </div>

      {data.questions.length === 0 && (
        <p className="mt-5 text-center text-sm text-[#9CA3AF]">
          No questions added yet. Add your first question above.
        </p>
      )}
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AddQuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    title: "",
    quizType: "",
    instructions: "",
    gradeAgeGroup: "",
    program: "",
    course: "",
    passingScore: "",
    attemptsAllowed: "",
    timeLimit: "",
    randomize: true,
    questions: [],
  })

  function update(patch: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const isLast = step === STEPS.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1D1D1D]">Quiz Management</h2>
          <p className="mt-0.5 text-sm text-[#9CA3AF]">
            Filter and manage your quizzes
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
          <Save className="h-4 w-4" />
          Save Draft
        </button>
      </div>

      {/* Step indicator */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <StepIndicator current={step} />
        </CardContent>
      </Card>

      {/* Step content */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          {step === 1 && <StepQuizInfo data={form} onChange={update} />}
          {step === 2 && <StepAssignTo data={form} onChange={update} />}
          {step === 3 && <StepSettings data={form} onChange={update} />}
          {step === 4 && <StepQuestions data={form} onChange={update} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/teacher/quiz"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
        >
          Cancel
        </Link>
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
            >
              ‹ Previous
            </button>
          )}
          <button
            onClick={() => {
              if (isLast) {
                router.push("/teacher/quiz")
              } else {
                setStep((s) => s + 1)
              }
            }}
            className="flex items-center gap-1 rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            {isLast ? "Publish" : "Next"} ›
          </button>
        </div>
      </div>
    </div>
  )
}
