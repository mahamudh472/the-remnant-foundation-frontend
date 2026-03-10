"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Plus,
  Trash2,
  Upload,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const STEPS = [
  { label: "Course Info", subtitle: "Basic details" },
  { label: "Age & Access", subtitle: "Visibility rules" },
  { label: "Course Info", subtitle: "Content setup" },
  { label: "Quiz", subtitle: "Assessments" },
  { label: "Review", subtitle: "Course Certificate" },
] as const

export default function AddCoursePage() {
  const [currentStep, setCurrentStep] = React.useState(0)

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-[#1D1D1D]">Create New Course</h3>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Follow the steps to set up your course
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex w-full items-center justify-between">
        {STEPS.map((step, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => setCurrentStep(i)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all",
                  i === currentStep
                    ? "bg-[#4CC0D8] text-white shadow-[0_0_0_4px_rgba(76,192,216,0.2)]"
                    : i < currentStep
                      ? "bg-[#4CC0D8] text-white"
                      : "bg-[#E5E7EB] text-[#9CA3AF]"
                )}
              >
                {i < currentStep ? <Check className="h-5 w-5" /> : i + 1}
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    i <= currentStep ? "text-[#1D1D1D]" : "text-[#9CA3AF]"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs text-[#9CA3AF]">{step.subtitle}</p>
              </div>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 -mt-8 h-[2px] flex-1",
                  i < currentStep ? "bg-[#4CC0D8]" : "bg-[#E5E7EB]"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && <StepCourseInfo />}
      {currentStep === 1 && <StepAgeAccess />}
      {currentStep === 2 && <StepContent />}
      {currentStep === 3 && <StepQuiz />}
      {currentStep === 4 && <StepReview />}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="flex items-center gap-1 text-sm font-medium text-[#666666] transition-colors hover:text-[#1D1D1D] disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Previous
        </button>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50">
            Save Draft
          </button>
          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
            >
              Next Step
            </button>
          ) : (
            <button className="rounded-lg bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#059669]">
              Publish Course
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 1: Course Info                                                */
/* ------------------------------------------------------------------ */
function StepCourseInfo() {
  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-5 p-6">
        <h3 className="font-bold text-[#1D1D1D]">Course Information</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Course Title
            </label>
            <input
              type="text"
              placeholder="e.g. Exploring the Bible: An Introduction"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Short Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief overview of the course..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Category
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>Spiritual</option>
              <option>Educational</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Program
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>Kids</option>
              <option>Teen</option>
              <option>Adults</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Price ($)
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Course Thumbnail
            </label>
            <div className="flex h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-[#F8F9FC] transition-colors hover:border-[#4CC0D8]">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-[#9CA3AF]" />
                <p className="mt-2 text-xs text-[#9CA3AF]">
                  Click to upload or drag & drop
                </p>
                <p className="text-[10px] text-[#9CA3AF]">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 2: Age & Access                                               */
/* ------------------------------------------------------------------ */
function StepAgeAccess() {
  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-5 p-6">
        <h3 className="font-bold text-[#1D1D1D]">Age Group & Access</h3>

        {/* <div>
          <label className="mb-2 block text-xs font-medium text-[#666666]">
            Age Group
          </label>
          <div className="flex flex-wrap gap-2">
            {ages.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedAge === age
                    ? "bg-[#4CC0D8] text-white"
                    : "bg-[#F8F9FC] text-[#666666] hover:bg-[#EBF7F9]"
                )}
              >
                {age}
              </button>
            ))}
          </div>
        </div> */}

        <div>
          <label className="mb-2 block text-xs font-medium text-[#666666]">
            Age Group*
          </label>
          <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
            <option>5-12 Years</option>
            <option>13-18 Years</option>
            <option>19-25 Years</option>
          </select>
        </div>

        <div className="rounded-xl bg-primary/10 p-4">
          <p className="text-xs text-primary">
            <strong>Note:</strong> Selecting an age group helps recommend your
            course to the right audience. Content should be appropriate for the
            selected group.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 3: Content (Modules/Lessons)                                  */
/* ------------------------------------------------------------------ */
function StepContent() {
  const [modules, setModules] = React.useState([
    {
      id: 1,
      title: "Module 1 Title",
      open: false,
      lessons: [] as {
        id: number
        title: string
        videoLink: string
        description: string
      }[],
    },
    {
      id: 2,
      title: "Module 2 Title",
      open: true,
      lessons: [{ id: 1, title: "", videoLink: "", description: "" }],
    },
  ])

  const toggleModule = (moduleId: number) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, open: !m.open } : m))
    )
  }

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `Module ${prev.length + 1} Title`,
        open: true,
        lessons: [],
      },
    ])
  }

  const removeModule = (moduleId: number) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId))
  }

  const addLesson = (moduleId: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              open: true,
              lessons: [
                ...m.lessons,
                { id: Date.now(), title: "", videoLink: "", description: "" },
              ],
            }
          : m
      )
    )
  }

  const removeLesson = (moduleId: number, lessonId: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
          : m
      )
    )
  }

  return (
    <div className="space-y-4">
      {modules.map((mod) => (
        <Card
          key={mod.id}
          className="overflow-hidden border-gray-200 shadow-none"
        >
          <CardContent className="p-0">
            {/* Module Header */}
            <div className="flex items-center gap-3 px-4">
              <button
                onClick={() => toggleModule(mod.id)}
                className="text-[#9CA3AF] transition-transform"
              >
                {mod.open ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>
              <input
                type="text"
                placeholder={"Type module title..."}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#4CC0D8]"
              />
              <div className="flex h-10 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-[#F8F9FC] transition-colors hover:border-[#4CC0D8]">
                <Upload className="h-4 w-4 text-[#9CA3AF]" />
              </div>
              <span className="rounded-lg border border-gray-200 px-3 py-2 text-xs whitespace-nowrap text-[#9CA3AF]">
                {mod.lessons.length} lessons
              </span>
              <button
                onClick={() => removeModule(mod.id)}
                className="rounded-lg bg-red-50 p-2 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Module Body (Lessons) */}
            {mod.open && (
              <div className="space-y-4 p-4">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="space-y-3 rounded-xl border border-gray-100 bg-[#FAFBFC] p-4"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#666666]">
                          Lesson Title
                        </label>
                        <input
                          type="text"
                          placeholder="Type lesson title..."
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#666666]">
                          Video Link
                        </label>
                        <input
                          type="url"
                          placeholder="Past video link"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#666666]">
                          Offline Download
                        </label>
                        <button className="flex items-center gap-1.5 rounded-lg bg-[#4CC0D8] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]">
                          <Plus className="h-3.5 w-3.5" />
                          Add Quiz
                        </button>
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => removeLesson(mod.id, lesson.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#666666]">
                        Lesson Descriptions
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Type lesson description..."
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => addLesson(mod.id)}
                  className="flex w-full items-center justify-end"
                  variant={"ghost"}
                >
                  <Plus className="h-4 w-4" />
                  Add Lesson
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Add Module */}
      <Button
        onClick={addModule}
        variant={"ghost"}
        className="flex w-full items-center justify-end"
      >
        <Plus className="h-4 w-4" />
        Add Module
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 4: Quiz & Assessment                                          */
/* ------------------------------------------------------------------ */
function StepQuiz() {
  const [quizEnabled, setQuizEnabled] = React.useState(true)
  const [certQuiz, setCertQuiz] = React.useState(false)

  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-5 p-6">
        <h3 className="font-bold text-[#1D1D1D]">Quiz & Assessment</h3>

        <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
          <div>
            <p className="text-sm font-semibold text-[#1D1D1D]">
              Enable Quizzes
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Add quizzes at the end of each module
            </p>
          </div>
          {/* <button onClick={() => setQuizEnabled(!quizEnabled)}>
            {quizEnabled ? (
              <ToggleRight className="h-8 w-8 text-[#4CC0D8]" />
            ) : (
              <ToggleLeft className="h-8 w-8 text-[#9CA3AF]" />
            )}
          </button> */}
          <Switch
            checked={quizEnabled}
            onCheckedChange={(checked) => setQuizEnabled(checked)}
          />
        </div>

        {quizEnabled && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#666666]">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  defaultValue={30}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#666666]">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  defaultValue={70}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#666666]">
                  Max Attempts
                </label>
                <input
                  type="number"
                  defaultValue={3}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#666666]">
                  Question Type
                </label>
                <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
                  <option>Multiple Choice</option>
                  <option>Fill in the Blank</option>
                  <option>True/False</option>
                  <option>Mixed</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
              <div>
                <p className="text-sm font-semibold text-[#1D1D1D]">
                  Require Quiz for Certificate
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  Students must pass the quiz to receive a certificate
                </p>
              </div>
              <Switch
                checked={certQuiz}
                onCheckedChange={(checked) => setCertQuiz(checked)}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 5: Review                                                     */
/* ------------------------------------------------------------------ */
function StepReview() {
  const sections = [
    {
      title: "Course Info",
      items: [
        { label: "Title", value: "Exploring the Bible: An Introduction" },
        { label: "Category", value: "Bible Studies" },
        { label: "Level", value: "Beginner" },
        { label: "Language", value: "English" },
        { label: "Price", value: "$50.00" },
      ],
    },
    {
      title: "Age & Access",
      items: [
        { label: "Age Group", value: "All Ages" },
        { label: "Visibility", value: "Public" },
      ],
    },
    {
      title: "Content",
      items: [
        { label: "Modules", value: "2" },
        { label: "Total Lessons", value: "3" },
      ],
    },
    {
      title: "Quiz",
      items: [
        { label: "Quizzes Enabled", value: "Yes" },
        { label: "Passing Score", value: "70%" },
        { label: "Max Attempts", value: "3" },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-[#1D1D1D]">Review Your Course</h3>
      <p className="text-sm text-[#666666]">
        Please review all the details below before publishing your course.
      </p>

      {sections.map((section) => (
        <Card key={section.title} className="border-gray-100 shadow-none">
          <CardContent className="p-4">
            <h4 className="mb-3 text-sm font-bold text-[#1D1D1D]">
              {section.title}
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-xs text-[#9CA3AF]">{item.label}</span>
                  <span className="text-xs font-medium text-[#1D1D1D]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="rounded-xl bg-[#ECFDF5] p-4">
        <p className="text-xs text-emerald-700">
          <strong>Ready to publish!</strong> Once published, your course will be
          visible to students based on the visibility settings you selected.
        </p>
      </div>
    </div>
  )
}
