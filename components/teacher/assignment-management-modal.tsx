"use client"

import React from "react"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useCreateCourseAssignmentMutation } from "@/hooks/api/use-courses"
import { getApiErrorMessage } from "@/lib/api/client"
import type { CourseAssignmentType } from "@/lib/api/courses"
import { toast } from "sonner"

type AssignmentManagementModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: (assignmentId: number) => void
}

const STEP_LABELS = ["Basic Info", "Content", "Evaluation", "Review"] as const

const ASSIGNMENT_TYPES: Array<{ value: CourseAssignmentType; label: string }> =
  [
    { value: "homework", label: "Homework" },
    { value: "project", label: "Project" },
    { value: "essay", label: "Essay" },
    { value: "presentation", label: "Presentation" },
    { value: "worksheet", label: "Worksheet" },
    { value: "other", label: "Other" },
  ]

function toPositiveInt(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }

  return parsed
}

function formatDisplayDate(value: string) {
  if (!value) {
    return "-"
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleDateString("en-US")
}

export default function AssignmentManagementModal({
  open,
  onOpenChange,
  onCreated,
}: AssignmentManagementModalProps) {
  const createCourseAssignmentMutation = useCreateCourseAssignmentMutation()

  const [currentStep, setCurrentStep] = React.useState(0)

  const [assignmentTitle, setAssignmentTitle] = React.useState("")
  const [shortDescription, setShortDescription] = React.useState("")
  const [assignmentType, setAssignmentType] =
    React.useState<CourseAssignmentType>(ASSIGNMENT_TYPES[0].value)
  const [dueDate, setDueDate] = React.useState("")

  const [contentDescription, setContentDescription] = React.useState("")
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null)
  const [allowFileSubmission, setAllowFileSubmission] = React.useState(true)
  const [allowTextAnswer, setAllowTextAnswer] = React.useState(true)

  const [totalMarks, setTotalMarks] = React.useState("100")
  const [evaluationNotes, setEvaluationNotes] = React.useState("")

  const isSubmitting = createCourseAssignmentMutation.isPending

  const goPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
  const goNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, STEP_LABELS.length - 1))

  const resetForm = () => {
    setCurrentStep(0)
    setAssignmentTitle("")
    setShortDescription("")
    setAssignmentType(ASSIGNMENT_TYPES[0].value)
    setDueDate("")
    setContentDescription("")
    setUploadedFile(null)
    setAllowFileSubmission(true)
    setAllowTextAnswer(true)
    setTotalMarks("100")
    setEvaluationNotes("")
  }

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen)

    if (!nextOpen) {
      resetForm()
    }
  }

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null

    if (selectedFile) {
      setUploadedFile(selectedFile)
    }

    event.target.value = ""
  }

  const removeUploadedFile = () => setUploadedFile(null)

  const assignmentTypeLabel =
    ASSIGNMENT_TYPES.find((option) => option.value === assignmentType)?.label ||
    assignmentType

  const summary = [
    { label: "Title", value: assignmentTitle || "-" },
    { label: "Due Date", value: formatDisplayDate(dueDate) },
    { label: "Type", value: assignmentTypeLabel || "-" },
    { label: "File", value: uploadedFile?.name || "None" },
    { label: "Total Marks", value: totalMarks || "-" },
  ]

  async function submitAssignment() {
    if (!assignmentTitle.trim()) {
      toast.error("Assignment title is required")
      return
    }

    if (!shortDescription.trim()) {
      toast.error("Short description is required")
      return
    }

    if (!dueDate) {
      toast.error("Due date is required")
      return
    }

    if (!contentDescription.trim()) {
      toast.error("Content description is required")
      return
    }

    try {
      const response = await createCourseAssignmentMutation.mutateAsync({
        lesson_id: null,
        title: assignmentTitle.trim(),
        short_description: shortDescription.trim(),
        assignment_type: assignmentType,
        due_date: dueDate,
        content_description:
          `${contentDescription.trim()}\n${evaluationNotes.trim()}`.trim(),
        attachment: uploadedFile ?? undefined,
        allow_file_submission: allowFileSubmission,
        allow_text_answer: allowTextAnswer,
        total_marks: toPositiveInt(totalMarks, 100),
      })

      toast.success(response.message || "Assignment created successfully")
      onCreated?.(response.assignment.id)
      handleClose(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to create assignment"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="h-[90svh] w-[min(96vw,900px)] max-w-none overflow-hidden rounded-2xl border border-gray-200 bg-white p-0">
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-6 sm:p-8">
            <div>
              <DialogTitle className="text-2xl font-semibold text-[#1D1D1D]">
                Create New Assignment
              </DialogTitle>
              <DialogDescription className="text-xs text-[#9CA3AF]">
                Create an assignment and attach it to the selected lesson
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
                          "mx-3 h-[1px] min-w-10 flex-1",
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
                    Assignment Details
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Add basic information about the assignment
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Assignment Title *
                  </label>
                  <input
                    type="text"
                    value={assignmentTitle}
                    onChange={(event) => setAssignmentTitle(event.target.value)}
                    placeholder="e.g. Bible Chapter Summary"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Short Description *
                  </label>
                  <textarea
                    rows={4}
                    value={shortDescription}
                    onChange={(event) =>
                      setShortDescription(event.target.value)
                    }
                    placeholder="Brief instructions for students..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Assignment Type *
                    </label>
                    <select
                      value={assignmentType}
                      onChange={(event) =>
                        setAssignmentType(
                          event.target.value as CourseAssignmentType
                        )
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                    >
                      {ASSIGNMENT_TYPES.map((typeOption) => (
                        <option key={typeOption.value} value={typeOption.value}>
                          {typeOption.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#666666]">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                    />
                  </div>
                </div>
              </section>
            )}

            {currentStep === 1 && (
              <section className="space-y-4 rounded-xl border border-gray-100 p-4">
                <div>
                  <h4 className="font-semibold text-[#1D1D1D]">
                    Assignment Content
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Add description and files for students
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Short Description
                  </label>
                  <textarea
                    rows={4}
                    value={contentDescription}
                    onChange={(event) =>
                      setContentDescription(event.target.value)
                    }
                    placeholder="Brief overview of what students will learn..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    File Upload (PDF / Image / Doc)
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-200 bg-[#F8F9FC] p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-[#9CA3AF]" />
                    <p className="mt-2 text-xs text-[#666666]">
                      Drag and drop files here, or click to browse
                    </p>
                    <label
                      htmlFor="assignment-files"
                      className="mt-3 inline-flex cursor-pointer items-center rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-[#666666]"
                    >
                      Choose Files
                    </label>
                    <input
                      id="assignment-files"
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                      className="hidden"
                      onChange={onSelectFile}
                    />
                  </div>
                </div>

                {uploadedFile && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-[#EBF8FC] px-3 py-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-[#6B7280]" />
                        <span className="truncate text-xs text-[#1D1D1D]">
                          {uploadedFile.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeUploadedFile}
                        className="text-[#9CA3AF] transition-colors hover:text-[#6B7280]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                <Card className="border-gray-100 shadow-none">
                  <CardContent className="space-y-3 p-4">
                    <h5 className="text-sm font-semibold text-[#1D1D1D]">
                      Submission Options
                    </h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="allow-file-submission"
                          checked={allowFileSubmission}
                          onCheckedChange={(checked) =>
                            setAllowFileSubmission(Boolean(checked))
                          }
                        />
                        <Label htmlFor="allow-file-submission">
                          Allow File Submission
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="allow-text-answer"
                          checked={allowTextAnswer}
                          onCheckedChange={(checked) =>
                            setAllowTextAnswer(Boolean(checked))
                          }
                        />
                        <Label htmlFor="allow-text-answer">
                          Allow Text Answer
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {currentStep === 2 && (
              <section className="space-y-4 rounded-xl border border-gray-100 p-4">
                <div>
                  <h4 className="font-semibold text-[#1D1D1D]">Evaluation</h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Define marks and evaluation notes
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Total Marks *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalMarks}
                    onChange={(event) => setTotalMarks(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Evaluation Notes
                  </label>
                  <textarea
                    rows={3}
                    value={evaluationNotes}
                    onChange={(event) => setEvaluationNotes(event.target.value)}
                    placeholder="Optional rubric or grading notes..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#2BA9D3]"
                  />
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="space-y-4 rounded-xl border border-gray-100 p-4">
                <div>
                  <h4 className="font-semibold text-[#1D1D1D]">
                    Review and Publish
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Review assignment details before publishing
                  </p>
                </div>

                <Card className="border-gray-100 shadow-none">
                  <CardContent className="space-y-3 p-4">
                    <h5 className="text-sm font-semibold text-[#1D1D1D]">
                      Assignment Summary
                    </h5>
                    {summary.map((summaryItem) => (
                      <div
                        key={summaryItem.label}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-[#9CA3AF]">
                          {summaryItem.label}:
                        </span>
                        <span className="font-medium text-[#1D1D1D]">
                          {summaryItem.value}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-gray-100 shadow-none">
                  <CardContent className="space-y-2 p-4">
                    <h5 className="text-sm font-semibold text-[#1D1D1D]">
                      Publish Checklist
                    </h5>
                    {[
                      "All required fields completed",
                      "Description added",
                      "Files attached (optional)",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#2BA9D3]" />
                        <span className="text-[#666666]">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="rounded-lg bg-[#EBF8FC] px-3 py-2 text-xs text-[#2BA9D3]">
                  Ready to publish! Your assignment is complete and ready for
                  students.
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
                  onClick={submitAssignment}
                  disabled={isSubmitting}
                  className="rounded-lg bg-[#2BA9D3] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1997C1]"
                >
                  {isSubmitting ? "Publishing..." : "Publish Assignment"}
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
