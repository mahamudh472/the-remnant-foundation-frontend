"use client"

import React from "react"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  Paperclip,
  Upload,
  X,
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
  useStudentAssignmentDetailQuery,
  useSubmitStudentAssignmentMutation,
} from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import { toast } from "sonner"

type AssignmentSubmitModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignmentId: number | null
  assignmentTitle?: string | null
  courseId?: number
  moduleId?: number
}

function formatDate(dateValue: string) {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return dateValue
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export default function AssignmentSubmitModal({
  open,
  onOpenChange,
  assignmentId,
  assignmentTitle,
  courseId,
  moduleId,
}: AssignmentSubmitModalProps) {
  const [submissionFile, setSubmissionFile] =
    React.useState<File | null>(null)
  const [submissionText, setSubmissionText] = React.useState("")
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const assignmentQuery = useStudentAssignmentDetailQuery(
    assignmentId ?? undefined,
    Boolean(open && assignmentId)
  )

  const submitMutation = useSubmitStudentAssignmentMutation()

  // Reset state when modal closes or assignment changes
  React.useEffect(() => {
    if (!open) {
      setSubmissionFile(null)
      setSubmissionText("")
      setSubmitSuccess(false)
    }
  }, [open, assignmentId])

  const assignment = assignmentQuery.data
  const isAlreadyComplete = assignment?.complete ?? false

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSubmissionFile(file)
    // Reset so the same file can be re-selected if removed
    event.target.value = ""
  }

  const handleRemoveFile = () => {
    setSubmissionFile(null)
  }

  const handleSubmit = async () => {
    if (!assignmentId || !assignment) return

    const needsFile = assignment.allow_file_submission
    const needsText = assignment.allow_text_answer

    if (needsFile && !submissionFile) {
      toast.error("Please attach a file before submitting.")
      return
    }

    try {
      const response = await submitMutation.mutateAsync({
        assignmentId,
        submissionFile,
        submissionText,
        courseId,
        moduleId,
      })
      setSubmitSuccess(true)
      toast.success(response.message)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to submit assignment."))
    }
  }

  const canSubmit =
    !submitMutation.isPending &&
    !isAlreadyComplete &&
    !submitSuccess &&
    !assignmentQuery.isLoading &&
    !assignmentQuery.isError

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 right-0 left-auto h-svh w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-none p-0 data-[state=closed]:zoom-out-100 data-[state=closed]:slide-out-to-right-full data-[state=open]:zoom-in-100 data-[state=open]:slide-in-from-right-full [&>button]:hidden">
        <div className="flex h-full w-1/2 mx-auto flex-col bg-white">
          {/* Header */}
          <div className="border-b border-gray-100 px-5 py-4 sm:px-7">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-[#4CC0D8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <DialogTitle className="text-2xl font-bold text-[#1D1D1D]">
              {assignment?.title || assignmentTitle || "Assignment"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-[#666666]">
              {assignment?.short_description || "Submit your assignment below."}
            </DialogDescription>

            {assignment && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2.5 py-1">
                  <FileText className="h-3.5 w-3.5" />
                  {assignment.assignment_type_label}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2.5 py-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Due: {formatDate(assignment.due_date)}
                </span>
                <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1">
                  {assignment.total_marks} marks
                </span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 space-y-6">
            {assignmentQuery.isLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map((skeleton) => (
                  <div
                    key={skeleton}
                    className="h-20 animate-pulse rounded-xl bg-gray-100"
                  />
                ))}
              </div>
            )}

            {assignmentQuery.isError && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
                {getApiErrorMessage(
                  assignmentQuery.error,
                  "Failed to load assignment details."
                )}
              </div>
            )}

            {/* Success banner */}
            {(submitSuccess || isAlreadyComplete) && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <div>
                  <p className="font-semibold text-emerald-800">
                    {isAlreadyComplete && !submitSuccess
                      ? "Already submitted"
                      : "Submitted successfully!"}
                  </p>
                  <p className="text-sm text-emerald-700">
                    {assignment?.submission_file
                      ? "File submission received."
                      : ""}
                    {assignment?.submission_text
                      ? " Text answer recorded."
                      : ""}
                  </p>
                </div>
              </div>
            )}

            {assignment && !assignmentQuery.isLoading && (
              <>
                {/* Description */}
                {assignment.content_description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#1D1D1D]">
                      Description
                    </h3>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#666666]">
                      {assignment.content_description}
                    </p>
                  </div>
                )}

                {/* Attachment */}
                {assignment.attachment && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#1D1D1D]">
                      Attachment
                    </h3>
                    <a
                      href={assignment.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#D1E9F0] bg-[#F0FAFD] px-3 py-2 text-sm font-medium text-[#4CC0D8] transition-colors hover:bg-[#E2F5FA]"
                    >
                      <Paperclip className="h-4 w-4" />
                      View attachment
                    </a>
                  </div>
                )}

                {/* File submission */}
                {assignment.allow_file_submission &&
                  !isAlreadyComplete &&
                  !submitSuccess && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-[#1D1D1D]">
                        Upload file{" "}
                        <span className="text-red-400">*</span>
                      </h3>

                      {submissionFile ? (
                        <div className="flex items-center gap-3 rounded-xl border border-[#D1E9F0] bg-[#F0FAFD] px-4 py-3">
                          <FileText className="h-5 w-5 shrink-0 text-[#4CC0D8]" />
                          <span className="min-w-0 flex-1 truncate text-sm text-[#1D1D1D]">
                            {submissionFile.name}
                          </span>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="shrink-0 text-[#9CA3AF] transition-colors hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[#D1E9F0] bg-[#F8FDFE] px-4 py-8 text-center transition-colors hover:border-[#4CC0D8] hover:bg-[#F0FAFD]"
                        >
                          <Upload className="h-8 w-8 text-[#9CA3AF]" />
                          <span className="text-sm font-medium text-[#666666]">
                            Click to upload a file
                          </span>
                          <span className="text-xs text-[#9CA3AF]">
                            PDF, DOC, DOCX, images, and more
                          </span>
                        </button>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}

                {/* Already-submitted file link */}
                {isAlreadyComplete && assignment.submission_file && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#1D1D1D]">
                      Submitted file
                    </h3>
                    <a
                      href={assignment.submission_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#D1E9F0] bg-[#F0FAFD] px-3 py-2 text-sm font-medium text-[#4CC0D8] transition-colors hover:bg-[#E2F5FA]"
                    >
                      <Paperclip className="h-4 w-4" />
                      View submitted file
                    </a>
                  </div>
                )}

                {/* Text answer */}
                {assignment.allow_text_answer &&
                  !isAlreadyComplete &&
                  !submitSuccess && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-[#1D1D1D]">
                        Text answer{" "}
                        {!assignment.allow_file_submission && (
                          <span className="text-red-400">*</span>
                        )}
                      </h3>
                      <textarea
                        rows={6}
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Write your answer here..."
                        disabled={submitMutation.isPending}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8] disabled:bg-gray-50"
                      />
                    </div>
                  )}

                {/* Already-submitted text */}
                {isAlreadyComplete && assignment.submission_text && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#1D1D1D]">
                      Submitted answer
                    </h3>
                    <p className="whitespace-pre-wrap rounded-xl border border-gray-100 bg-[#F8F9FC] p-4 text-sm text-[#666666]">
                      {assignment.submission_text}
                    </p>
                  </div>
                )}

                {assignment.completed_at && (
                  <p className="text-xs text-[#9CA3AF]">
                    Completed on{" "}
                    {formatDate(assignment.completed_at)}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                {assignment && (
                  <Badge
                    className={
                      isAlreadyComplete || submitSuccess
                        ? "border-0 bg-emerald-50 text-emerald-700"
                        : "border-0 bg-[#F8F9FC] text-[#666666]"
                    }
                  >
                    {isAlreadyComplete || submitSuccess
                      ? "Complete"
                      : "Pending"}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="brandOutline"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>

                {!isAlreadyComplete && !submitSuccess && (
                  <Button
                    type="button"
                    variant="brand"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    {submitMutation.isPending
                      ? "Submitting..."
                      : "Submit Assignment"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
