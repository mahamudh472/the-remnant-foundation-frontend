"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Upload, X, Loader2 } from "lucide-react"
import { useTeacherCoursesQuery, useSendFollowUpMutation } from "@/hooks/api/use-teachers"
import { useTeacherStudentsQuery } from "@/hooks/api/use-students"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api/client"

// ─── Types ─────────────────────────────────────────────────────────────────────

interface SendFollowUpFormData {
  course_id: number | null
  student_ids: number[]
  subject: string
  message: string
  attachment: File | null
}

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
  data: SendFollowUpFormData
  onChange: (patch: Partial<SendFollowUpFormData>) => void
}) {
  const { data: coursesData, isLoading } = useTeacherCoursesQuery()
  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF]"

  const selectedCourse = coursesData?.results.find(c => c.id === data.course_id)

  return (
    <div>
      <h3 className="mb-1 font-bold text-[#1D1D1D]">Sent To</h3>
      <p className="mb-5 text-sm text-[#9CA3AF]">
        Select the target course for this follow-up
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1D1D1D]">
            Select Course <span className="text-red-400">*</span>
          </label>
          {isLoading ? (
            <div className="flex h-12 w-full items-center justify-center rounded-lg border border-gray-100 bg-gray-50/50">
              <Loader2 className="h-5 w-5 animate-spin text-[#4CC0D8]" />
            </div>
          ) : (
            <select
              value={data.course_id || ""}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : null
                onChange({ course_id: val, student_ids: [] })
              }}
              className={inputCls}
            >
              <option value="">Select a course</option>
              {coursesData?.results.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedCourse && (
          <div className="rounded-xl bg-[#EBF7F9] px-4 py-3 text-sm text-[#4CC0D8]">
            <span className="font-semibold">Target course: </span>
            {selectedCourse.title} ({selectedCourse.lessons_count} Lessons)
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
  data: SendFollowUpFormData
  onChange: (patch: Partial<SendFollowUpFormData>) => void
}) {
  const { data: studentsData, isLoading } = useTeacherStudentsQuery({
    course_id: data.course_id || undefined,
    page_size: 100,
  })

  function toggleStudent(id: number) {
    const selected = data.student_ids.includes(id)
      ? data.student_ids.filter((s) => s !== id)
      : [...data.student_ids, id]
    onChange({ student_ids: selected })
  }

  function toggleAll() {
    if (!studentsData?.results) return
    if (data.student_ids.length === studentsData.results.length) {
      onChange({ student_ids: [] })
    } else {
      onChange({ student_ids: studentsData.results.map(s => s.id) })
    }
  }

  if (!data.course_id) {
    return (
      <div className="py-10 text-center text-[#9CA3AF]">
        Please select a course first.
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-1 font-bold text-[#1D1D1D]">Select Students</h3>
      <p className="mb-5 text-sm text-[#9CA3AF]">
        Choose which students to send the follow-up message
      </p>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#4CC0D8]" />
        </div>
      ) : studentsData?.results.length === 0 ? (
        <div className="py-10 text-center text-[#9CA3AF]">
          No students enrolled in this course yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={
                        data.student_ids.length > 0 &&
                        data.student_ids.length === studentsData?.results.length
                      }
                      onChange={toggleAll}
                      className="accent-[#4CC0D8]"
                    />
                    <span className="text-xs font-semibold text-[#9CA3AF]">
                      Student Name
                    </span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#9CA3AF]">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#9CA3AF]">
                  Enrolled At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {studentsData?.results.map((s) => {
                const checked = data.student_ids.includes(s.id)
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
                    <td className="px-4 py-3 text-[#9CA3AF]">{s.location || "—"}</td>
                    <td className="px-4 py-3 text-[#9CA3AF]">
                      {new Date(s.first_enrolled_at).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Step 3: Write Message ─────────────────────────────────────────────────────

function StepWriteMessage({
  data,
  onChange,
}: {
  data: SendFollowUpFormData
  onChange: (patch: Partial<SendFollowUpFormData>) => void
}) {
  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] placeholder:text-[#9CA3AF]"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange({ attachment: file })
  }

  return (
    <div>
      <h3 className="mb-1 font-bold text-[#1D1D1D]">Follow-Up Message</h3>
      <p className="mb-5 text-sm text-[#9CA3AF]">
        Write your message to selected students
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
          {!data.attachment ? (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-8 text-center transition-colors hover:border-[#4CC0D8]">
              <Upload className="mb-2 h-5 w-5 text-[#9CA3AF]" />
              <p className="text-xs text-[#9CA3AF]">Max file size 10MB</p>
              <label className="mt-1 cursor-pointer text-xs font-semibold text-[#4CC0D8] hover:underline">
                Browse files
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-[#4CC0D8] bg-[#EBF7F9] px-4 py-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <Upload className="h-4 w-4 shrink-0 text-[#4CC0D8]" />
                <span className="truncate text-sm font-medium text-[#4CC0D8]">
                  {data.attachment.name}
                </span>
                <span className="text-xs text-[#4CC0D8]/70">
                  ({(data.attachment.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={() => onChange({ attachment: null })}
                className="rounded-full p-1 transition-colors hover:bg-[#D7F1F7]"
              >
                <X className="h-4 w-4 text-[#4CC0D8]" />
              </button>
            </div>
          )}
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
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const STEP_LABELS = ["one", "two", "three"]

export default function SendFollowUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<SendFollowUpFormData>({
    course_id: null,
    student_ids: [],
    subject: "",
    message: "",
    attachment: null,
  })

  const sendMutation = useSendFollowUpMutation()

  function update(patch: Partial<SendFollowUpFormData>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const handleStartFollowUp = async () => {
    if (!form.course_id || form.student_ids.length === 0 || !form.subject || !form.message) {
      toast.error("Please fill all required fields and select at least one student.")
      return
    }

    try {
      await sendMutation.mutateAsync({
        course_id: form.course_id,
        student_ids: form.student_ids,
        subject: form.subject,
        message: form.message,
        attachment: form.attachment,
      })
      toast.success("Follow-up successfully initiated.")
      router.push("/teacher/follow-up")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to send follow-up"))
    }
  }

  const canGoNext = () => {
    if (step === 1) return !!form.course_id
    if (step === 2) return form.student_ids.length > 0
    return true
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Title */}
      <div className="mb-1">
        <h2 className="text-xl font-bold text-[#1D1D1D]">Send Follow-Up</h2>
        <p className="text-sm text-[#9CA3AF]">
          Step {STEP_LABELS[step - 1]} of {STEPS.length}
        </p>
      </div>

      {/* Step indicator */}
      <div className="my-6">
        <StepIndicator current={step} />
      </div>

      {/* Step content */}
      <div className="mb-8 min-h-[300px]">
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
            disabled={!canGoNext() || sendMutation.isPending}
            onClick={() => {
              if (step < STEPS.length) {
                setStep((s) => s + 1)
              } else {
                handleStartFollowUp()
              }
            }}
            className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {step === STEPS.length ? (sendMutation.isPending ? "Sending..." : "Start Follow-up") : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  )
}
