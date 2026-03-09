"use client"

import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Check,
  Upload,
  Search,
  X,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = ["Basic Info", "Assign to", "Content", "Evaluation", "Review"] as const

export default function AddAssignmentPage() {
  const [currentStep, setCurrentStep] = React.useState(0)

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0))

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/teacher/assignments"
        className="inline-flex items-center gap-2 text-sm text-[#666666] transition-colors hover:text-[#4CC0D8]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Assignments
      </Link>

      <div>
        <h2 className="text-2xl font-bold text-[#1D1D1D]">
          Create New Assignment
        </h2>
        <p className="mt-1 text-sm text-[#666666]">
          Follow the steps to set up your Assignments
        </p>
      </div>

      {/* Step Indicator — circular with connecting lines */}
      <div className="flex items-center justify-center gap-0 py-4">
        {STEPS.map((step, i) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => setCurrentStep(i)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all",
                  i < currentStep
                    ? "bg-[#4CC0D8] text-white"
                    : i === currentStep
                      ? "bg-[#4CC0D8] text-white"
                      : "bg-gray-200 text-[#9CA3AF]"
                )}
              >
                {i < currentStep ? <Check className="h-5 w-5" /> : i + 1}
              </button>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  i <= currentStep ? "text-[#4CC0D8]" : "text-[#9CA3AF]"
                )}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mb-6 h-0.5 w-12 sm:w-20",
                  i < currentStep ? "bg-[#4CC0D8]" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && <StepBasicInfo />}
      {currentStep === 1 && <StepAssignTo />}
      {currentStep === 2 && <StepContent />}
      {currentStep === 3 && <StepEvaluation />}
      {currentStep === 4 && <StepReview />}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-300">
          Save Draft
        </button>
        <div className="flex gap-3">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50 disabled:opacity-40"
          >
            Previous
          </button>
          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              className="rounded-lg bg-[#F59E0B] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#D97706]"
            >
              Next Step
            </button>
          ) : (
            <button className="rounded-lg bg-[#F59E0B] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#D97706]">
              Publish Assignment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 1: Basic Info                                                  */
/* ------------------------------------------------------------------ */
function StepBasicInfo() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#1D1D1D]">
          Assignment Basic Info
        </h3>
        <p className="text-sm text-[#666666]">
          Add basic details about your assignment
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Assignment Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Bible Verse Analysis"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Assignment Type *
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>Select type</option>
              <option>Written</option>
              <option>Project</option>
              <option>Research</option>
              <option>Essay</option>
              <option>Journal</option>
              <option>Quiz</option>
              <option>Group Project</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Due Date *
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Grade *
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>Select grade</option>
              <option>Children (6–12)</option>
              <option>Junior (11–13)</option>
              <option>Teen (14–18)</option>
              <option>Young Adults (19–25)</option>
              <option>Adults (26+)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Visibility
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 2: Assign To                                                   */
/* ------------------------------------------------------------------ */
function StepAssignTo() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#1D1D1D]">Assign To</h3>
        <p className="text-sm text-[#666666]">
          Select which course this assignment belongs to
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[#666666]">
          Search Course *
        </label>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search assignments.."
            className="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-9 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 3: Content                                                     */
/* ------------------------------------------------------------------ */
function StepContent() {
  const [files, setFiles] = React.useState(["problem-solving-concept-with-books.jpg"])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#1D1D1D]">
          Assignment Content
        </h3>
        <p className="text-sm text-[#666666]">
          Add description and files for students
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[#666666]">
          Short Description
        </label>
        <textarea
          rows={4}
          placeholder="Brief overview of what students will learn..."
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[#666666]">
          File Upload (PDF / Image / Doc) *
        </label>
        <div className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-[#F8F9FC] transition-colors hover:border-[#4CC0D8]">
          <Upload className="h-8 w-8 text-[#9CA3AF]" />
          <p className="mt-2 text-xs text-[#666666]">
            Drag & drop files here, or click to browse
          </p>
          <button className="mt-2 rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-[#666666]">
            Choose Files
          </button>
        </div>
      </div>

      {/* Uploaded files */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-[#FFF5E0] px-4 py-2.5"
            >
              <span className="text-xs text-[#666666]">{file}</span>
              <button
                onClick={() => setFiles((f) => f.filter((_, idx) => idx !== i))}
                className="text-[#9CA3AF] hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submission Options */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-4">
          <h4 className="mb-3 text-sm font-bold text-[#1D1D1D]">
            Submission Options
          </h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm text-[#666666]">
              Allow File Submission
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-[#4CC0D8]"
              />
            </label>
            <label className="flex items-center justify-between text-sm text-[#666666]">
              Allow Text Answer
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-[#4CC0D8]"
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 4: Evaluation                                                  */
/* ------------------------------------------------------------------ */
function StepEvaluation() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#1D1D1D]">
          Assignment Content
        </h3>
        <p className="text-sm text-[#666666]">
          Add description and files for students
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[#666666]">
          Total Marks *
        </label>
        <input
          type="number"
          defaultValue={100}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 5: Review & Publish                                            */
/* ------------------------------------------------------------------ */
function StepReview() {
  const summary = [
    { label: "Title:", value: "The beginning" },
    { label: "Due Date:", value: "2026-02-03" },
    { label: "Grade:", value: "Junior (11–13)" },
    { label: "Course:", value: "New Testament Stories" },
    { label: "Total Marks:", value: "100" },
    { label: "Visibility:", value: "Published" },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#1D1D1D]">
          Review & Publish
        </h3>
        <p className="text-sm text-[#666666]">
          Review assignment details before publishing
        </p>
      </div>

      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-5">
          <h4 className="mb-4 text-sm font-bold text-[#1D1D1D]">
            Assignment Summary
          </h4>
          <div className="space-y-3">
            {summary.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-[#666666]">{item.label}</span>
                <span className="font-medium text-[#1D1D1D]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Publish Checklist */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-5">
          <h4 className="mb-3 text-sm font-bold text-[#1D1D1D]">
            Publish Checklist
          </h4>
          <div className="space-y-2">
            {[
              "All required fields completed",
              "Description added (recommended)",
              "Files attached (optional)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#4CC0D8]" />
                <span className="text-[#666666]">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-[#EBF7F9] p-4">
        <p className="text-xs text-[#4CC0D8]">
          <strong className="text-[#F59E0B]">Ready to publish!</strong> Your
          assignment is complete and ready for students.
        </p>
      </div>
    </div>
  )
}
