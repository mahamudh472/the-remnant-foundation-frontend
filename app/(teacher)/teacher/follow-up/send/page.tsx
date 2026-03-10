"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Upload } from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Student {
  id: string
  name: string
  email: string
  progress: number
  progressColor: string
  lastFollowUp: string | null
}

interface FormData {
  grade: string
  program: string
  course: string
  selectedStudents: string[]
  subject: string
  message: string
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const STUDENTS: Student[] = [
  {
    id: "1",
    name: "Noah Davis",
    email: "olivia.b@email.com",
    progress: 25,
    progressColor: "#EF4444",
    lastFollowUp: null,
  },
  {
    id: "2",
    name: "Olivia Brown",
    email: "olivia.b@email.com",
    progress: 88,
    progressColor: "#4CC0D8",
    lastFollowUp: "2026-02-01",
  },
]

// ─── Step Indicator ────────────────────────────────────────────────────────────

const STEPS = ["Select Target", "Select Students", "Write Message"]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((label, idx) => {
        const num = idx + 1
        const done = num < current
        const active = num === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  done || active
                    ? "bg-[#4CC0D8] text-white"
                    : "border-2 border-gray-200 bg-white text-[#9CA3AF]"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : num}
              </div>
              <span
                className={`text-sm font-medium ${
                  active
                    ? "text-[#1D1D1D]"
                    : done
                      ? "text-[#1D1D1D]"
                      : "text-[#9CA3AF]"
                }`}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`mx-4 h-[2px] w-16 transition-colors ${
                  num < current ? "bg-[#4CC0D8]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Select Target ─────────────────────────────────────────────────────

function StepSelectTarget({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF]"

  const showPreview = data.grade && data.program && data.course

  return (
    <div>
      <h3 className="mb-1 font-bold text-[#1D1D1D]">Sent To</h3>
      <p className="mb-5 text-sm text-[#9CA3AF]">
        Select the target audience for this follow-up
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Grade / Age Group <span className="text-red-400">*</span>
          </label>
          <input
            value={data.grade}
            onChange={(e) => onChange({ grade: e.target.value })}
            placeholder="Enter Grade / Age Group"
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Program <span className="text-red-400">*</span>
          </label>
          <input
            value={data.program}
            onChange={(e) => onChange({ program: e.target.value })}
            placeholder="Enter Program"
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Course <span className="text-red-400">*</span>
          </label>
          <input
            value={data.course}
            onChange={(e) => onChange({ course: e.target.value })}
            placeholder="Enter course"
            className={inputCls}
          />
        </div>

        {showPreview && (
          <div className="rounded-xl bg-[#EBF7F9] px-4 py-3 text-sm text-[#4CC0D8]">
            <span className="font-semibold">Target audience: </span>
            {data.grade} → {data.program} → {data.course}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 2: Select Students ───────────────────────────────────────────────────

function StepSelectStudents({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  function toggleStudent(id: string) {
    const selected = data.selectedStudents.includes(id)
      ? data.selectedStudents.filter((s) => s !== id)
      : [...data.selectedStudents, id]
    onChange({ selectedStudents: selected })
  }

  return (
    <div>
      <h3 className="mb-1 font-bold text-[#1D1D1D]">Select Students</h3>
      <p className="mb-5 text-sm text-[#9CA3AF]">
        Choose which students to send the follow-up message
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#9CA3AF]">
                Student Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#9CA3AF]">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#9CA3AF]">
                Progress
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#9CA3AF]">
                Last Follow-Up
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {STUDENTS.map((s) => {
              const checked = data.selectedStudents.includes(s.id)
              return (
                <tr
                  key={s.id}
                  onClick={() => toggleStudent(s.id)}
                  className={`cursor-pointer transition-colors ${
                    checked ? "bg-[#FFF8EC]" : "hover:bg-[#F8F9FC]"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="accent-[#4CC0D8]"
                      />
                      <span className="font-medium text-[#1D1D1D]">
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#9CA3AF]">{s.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.progress}%`,
                            backgroundColor: s.progressColor,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#666666]">
                        {s.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#9CA3AF]">
                    {s.lastFollowUp ?? "Never"}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Step 3: Write Message ─────────────────────────────────────────────────────

function StepWriteMessage({
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
      <h3 className="mb-1 font-bold text-[#1D1D1D]">Follow-Up Message</h3>
      <p className="mb-5 text-sm text-[#9CA3AF]">
        Write your message to selected student
      </p>

      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Subject <span className="text-red-400">*</span>
          </label>
          <input
            value={data.subject}
            onChange={(e) => onChange({ subject: e.target.value })}
            placeholder="Keep up the great work!"
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={6}
            value={data.message}
            onChange={(e) => onChange({ message: e.target.value })}
            placeholder="Write your message here..."
            className={inputCls}
          />
        </div>

        {/* Attachment */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Add Attachment
          </label>
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-8 text-center transition-colors hover:border-[#4CC0D8]">
            <Upload className="mb-2 h-5 w-5 text-[#9CA3AF]" />
            <p className="text-xs text-[#9CA3AF]">Drag and drop files here</p>
            <p className="text-xs text-[#9CA3AF]">or</p>
            <label className="mt-1 cursor-pointer text-xs font-semibold text-[#4CC0D8] hover:underline">
              Browse files
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Important notice */}
        <div className="rounded-xl border border-[#F59E0B]/30 bg-[#FFF8EC] px-4 py-3 text-sm">
          <span className="font-semibold text-[#F59E0B]">
            Important Notice{" "}
          </span>
          <span className="text-[#666666]">
            This is a one-way message. Students cannot reply. This message will
            be sent via email only.
          </span>
        </div>

        {/* Preview */}
        <div>
          <p className="mb-2 text-sm font-semibold text-[#1D1D1D]">
            Message Preview
          </p>
          <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-[#F8F9FC] text-sm">
            {[
              data.subject || "(No Subject)",
              data.message || "(No message)",
              data.message || "(No message)",
              "(No Attachment)",
            ].map((line, i) => (
              <div key={i} className="px-4 py-3 text-[#9CA3AF]">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const STEP_LABELS = ["one", "two", "three"]

export default function SendFollowUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    grade: "",
    program: "",
    course: "",
    selectedStudents: [],
    subject: "",
    message: "",
  })

  function update(patch: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Title */}
      <div className="mb-1">
        <h2 className="text-xl font-bold text-[#1D1D1D]">Send Follow-Up</h2>
        <p className="text-sm text-[#9CA3AF]">
          Step {STEP_LABELS[step - 1]} of {STEPS.length}
        </p>
        <p className="text-sm text-[#9CA3AF]">Select Target</p>
      </div>

      {/* Step indicator */}
      <div className="my-6">
        <StepIndicator current={step} />
      </div>

      {/* Step content */}
      <div className="mb-8">
        {step === 1 && <StepSelectTarget data={form} onChange={update} />}
        {step === 2 && <StepSelectStudents data={form} onChange={update} />}
        {step === 3 && <StepWriteMessage data={form} onChange={update} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/teacher/follow-up"
          className="text-sm font-semibold text-[#666666] transition-colors hover:text-[#1D1D1D]"
        >
          Cancel
        </Link>
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => {
              if (step < STEPS.length) {
                setStep((s) => s + 1)
              } else {
                router.push("/teacher/follow-up")
              }
            }}
            className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            {step === STEPS.length ? "Start Follow-up" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  )
}
