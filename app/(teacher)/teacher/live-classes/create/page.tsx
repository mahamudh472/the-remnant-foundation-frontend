"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  Users,
  Video,
  CheckCircle,
  ChevronLeft,
} from "lucide-react"

// ─── Data ────────────────────────────────────────────────────────────────────

const DURATIONS = [
  "30 Minutes",
  "45 Minutes",
  "60 Minutes",
  "90 Minutes",
  "120 Minutes",
]

const GRADE_OPTIONS = ["Kids", "Teens", "Adult"]

const PROGRAMS_BY_GRADE: Record<string, string[]> = {
  Kids: ["Bible Studies Program", "Spiritual Formation"],
  Teens: ["Bible Studies Program", "Spiritual Formation"],
  Adult: ["Bible Studies Program", "Spiritual Formation"],
}

const COURSES_BY_PROGRAM: Record<string, string[]> = {
  "Bible Studies Program": [
    "Introduction to Old Testament",
    "Spiritual Formation",
  ],
  "Spiritual Formation": [
    "Introduction to Old Testament",
    "Spiritual Formation",
  ],
}

const PLATFORMS = [
  {
    id: "zoom",
    name: "Zoom",
    description:
      "Meeting link will be auto-generated. Students will receive invitation via email.",
  },
]

const STEPS = ["Basic Info", "Assign Students", "Platform", "Confirm"]

const STEP_ICONS = [CalendarDays, Users, Video, CheckCircle]

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  title: string
  description: string
  date: string
  hour: string
  minute: string
  ampm: "AM" | "PM"
  duration: string
  grade: string
  program: string
  course: string
  platform: string
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-0">
      {STEPS.map((label, i) => {
        const Icon = STEP_ICONS[i]
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex min-w-[80px] flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                  done
                    ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                    : active
                      ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                      : "border-gray-200 bg-white text-gray-400"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                  active
                    ? "text-[#4CC0D8]"
                    : done
                      ? "text-[#4CC0D8]"
                      : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mb-5 h-0.5 w-10 transition-colors ${
                  i < current ? "bg-[#4CC0D8]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Basic Info ───────────────────────────────────────────────────────

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
  onNext: () => void
}) {
  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  )
  const minutes = ["00", "15", "30", "45"]

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF7F9]">
          <CalendarDays className="h-5 w-5 text-[#4CC0D8]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#1D1D1D]">Basic Information</h3>
          <p className="text-sm text-[#9CA3AF]">
            Enter the details for your live class
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Class Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Introduction to Old Testament: Genesis"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1D1D1D] placeholder-[#9CA3AF] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Short Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief description of what will be covered in this class"
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1D1D1D] placeholder-[#9CA3AF] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
          />
        </div>

        {/* Date */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Start Time <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={data.hour}
              onChange={(e) => onChange({ hour: e.target.value })}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
            >
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <select
              value={data.minute}
              onChange={(e) => onChange({ minute: e.target.value })}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
            >
              {minutes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <select
              value={data.ampm}
              onChange={(e) =>
                onChange({ ampm: e.target.value as "AM" | "PM" })
              }
              className="w-20 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Duration (minutes) <span className="text-red-500">*</span>
          </label>
          <select
            value={data.duration}
            onChange={(e) => onChange({ duration: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
          >
            <option value="">Select Duration</option>
            {DURATIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Nav */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/teacher/live-classes"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          onClick={onNext}
          disabled={!data.title || !data.date || !data.duration}
          className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8] disabled:opacity-40"
        >
          Next: Assign Students →
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: Assign Students ──────────────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const programs = data.grade ? (PROGRAMS_BY_GRADE[data.grade] ?? []) : []
  const courses = data.program ? (COURSES_BY_PROGRAM[data.program] ?? []) : []

  const studentsCount = data.course ? 18 : 0

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF7F9]">
          <Users className="h-5 w-5 text-[#4CC0D8]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#1D1D1D]">Assign Students</h3>
          <p className="text-sm text-[#9CA3AF]">
            Select grade, program, and course to automatically assign students
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Grade */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Grade / Age Group <span className="text-red-500">*</span>
          </label>
          <select
            value={data.grade}
            onChange={(e) =>
              onChange({ grade: e.target.value, program: "", course: "" })
            }
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8]"
          >
            <option value="">Select Age</option>
            {GRADE_OPTIONS.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Program */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Program <span className="text-red-500">*</span>
          </label>
          <select
            value={data.program}
            onChange={(e) => onChange({ program: e.target.value, course: "" })}
            disabled={!data.grade}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8] disabled:bg-gray-50 disabled:text-[#9CA3AF]"
          >
            <option value="">Select Program</option>
            {programs.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          {!data.grade && (
            <p className="mt-1 text-xs text-[#9CA3AF]">Select a grade first</p>
          )}
        </div>

        {/* Course */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1D1D1D]">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            value={data.course}
            onChange={(e) => onChange({ course: e.target.value })}
            disabled={!data.program}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] focus:ring-1 focus:ring-[#4CC0D8] disabled:bg-gray-50 disabled:text-[#9CA3AF]"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {!data.program && (
            <p className="mt-1 text-xs text-[#9CA3AF]">
              Select grade and program first
            </p>
          )}
        </div>

        {/* Students preview */}
        {data.course && (
          <div className="rounded-lg bg-[#EBF7F9] px-4 py-3 text-sm font-medium text-[#4CC0D8]">
            Students assigned: {studentsCount} students enrolled in{" "}
            <span className="font-semibold">{data.course}</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/teacher/live-classes"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
        >
          Cancel
        </Link>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={onNext}
            disabled={!data.grade || !data.program || !data.course}
            className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8] disabled:opacity-40"
          >
            Next: Platform →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Platform ─────────────────────────────────────────────────────────

function Step3({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF7F9]">
          <Video className="h-5 w-5 text-[#4CC0D8]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#1D1D1D]">Platform Selection</h3>
          <p className="text-sm text-[#9CA3AF]">
            Choose your preferred live class platform
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {PLATFORMS.map((p) => {
          const selected = data.platform === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange({ platform: p.id })}
              className={`flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-colors ${
                selected
                  ? "border-[#4CC0D8] bg-[#EBF7F9]"
                  : "border-gray-200 bg-white hover:border-[#4CC0D8]/50"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  selected ? "bg-[#4CC0D8]" : "bg-gray-100"
                }`}
              >
                <Video
                  className={`h-5 w-5 ${
                    selected ? "text-white" : "text-gray-400"
                  }`}
                />
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    selected ? "text-[#4CC0D8]" : "text-[#1D1D1D]"
                  }`}
                >
                  {p.name}
                </p>
                <p className="mt-0.5 text-sm text-[#666666]">{p.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Nav */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.platform}
          className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8] disabled:opacity-40"
        >
          Next: Review & Schedule →
        </button>
      </div>
    </div>
  )
}

// ─── Step 4: Review & Confirm ─────────────────────────────────────────────────

function Step4({
  data,
  onBack,
  onSubmit,
}: {
  data: FormData
  onBack: () => void
  onSubmit: () => void
}) {
  const platform = PLATFORMS.find((p) => p.id === data.platform)
  const timeStr = `${data.hour}:${data.minute} ${data.ampm}`

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF7F9]">
          <CheckCircle className="h-5 w-5 text-[#4CC0D8]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#1D1D1D]">Review & Confirm</h3>
          <p className="text-sm text-[#9CA3AF]">
            Please review your live class details before scheduling
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Class details */}
        <div className="rounded-xl border border-gray-100 p-5">
          <p className="mb-3 text-xs font-semibold tracking-wide text-[#9CA3AF] uppercase">
            Class Details
          </p>
          <dl className="space-y-2 text-sm">
            <Row label="Title" value={data.title} />
            <Row label="Description" value={data.description || "—"} />
            <Row
              label="Date & Time"
              value={data.date ? `${data.date} at ${timeStr}` : "—"}
            />
            <Row label="Duration" value={data.duration || "—"} />
          </dl>
        </div>

        {/* Student assignment */}
        <div className="rounded-xl border border-gray-100 p-5">
          <p className="mb-3 text-xs font-semibold tracking-wide text-[#9CA3AF] uppercase">
            Student Assignment
          </p>
          <dl className="space-y-2 text-sm">
            <Row label="Grade / Age Group" value={data.grade || "—"} />
            <Row label="Program" value={data.program || "—"} />
            <Row label="Course" value={data.course || "—"} />
          </dl>
        </div>

        {/* Platform */}
        <div className="rounded-xl border border-gray-100 p-5">
          <p className="mb-3 text-xs font-semibold tracking-wide text-[#9CA3AF] uppercase">
            Platform
          </p>
          <dl className="text-sm">
            <Row label="Platform" value={platform?.name ?? "—"} />
          </dl>
        </div>
      </div>

      {/* Nav */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex gap-3">
          <Link
            href="/teacher/live-classes"
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            onClick={onSubmit}
            className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            Schedule Class
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-36 shrink-0 text-[#9CA3AF]">{label}</dt>
      <dd className="font-medium text-[#1D1D1D]">{value}</dd>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateLiveClassPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    hour: "09",
    minute: "00",
    ampm: "AM",
    duration: "",
    grade: "",
    program: "",
    course: "",
    platform: "zoom",
  })

  const patch = (p: Partial<FormData>) => setForm((f) => ({ ...f, ...p }))

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/teacher/live-classes"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 text-[#666666]" />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-[#1D1D1D]">
              Create Live Class
            </h2>
            <p className="text-sm text-[#9CA3AF]">
              Set up a new live teaching session
            </p>
          </div>
        </div>
      </div>

      {/* Wizard card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <StepIndicator current={step} />

        {step === 0 && (
          <Step1 data={form} onChange={patch} onNext={() => setStep(1)} />
        )}
        {step === 1 && (
          <Step2
            data={form}
            onChange={patch}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <Step3
            data={form}
            onChange={patch}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step4
            data={form}
            onBack={() => setStep(2)}
            onSubmit={() => router.push("/teacher/live-classes")}
          />
        )}
      </div>
    </div>
  )
}
