"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  Plus,
  Trash2,
  Upload,
  Check,
  GripVertical,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  "Course Info",
  "Age & Access",
  "Content",
  "Quiz & Assessment",
  "Certificate",
  "Review & Publish",
] as const

export default function AddCoursePage() {
  const [currentStep, setCurrentStep] = React.useState(0)

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0))

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-lg font-bold text-[#1D1D1D]">Add New Course</h2>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((step, i) => (
          <React.Fragment key={step}>
            <button
              onClick={() => setCurrentStep(i)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all",
                i === currentStep
                  ? "bg-[#4CC0D8] text-white"
                  : i < currentStep
                    ? "bg-[#EBF7F9] text-[#4CC0D8]"
                    : "bg-[#F8F9FC] text-[#9CA3AF]"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                  i === currentStep
                    ? "bg-white/20 text-white"
                    : i < currentStep
                      ? "bg-[#4CC0D8] text-white"
                      : "bg-gray-200 text-[#9CA3AF]"
                )}
              >
                {i < currentStep ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{step}</span>
            </button>
            {i < STEPS.length - 1 && (
              <ChevronRight className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && <StepCourseInfo />}
      {currentStep === 1 && <StepAgeAccess />}
      {currentStep === 2 && <StepContent />}
      {currentStep === 3 && <StepQuiz />}
      {currentStep === 4 && <StepCertificate />}
      {currentStep === 5 && <StepReview />}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
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
            className="rounded-lg bg-[#4CC0D8] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            Next Step
          </button>
        ) : (
          <button className="rounded-lg bg-[#10B981] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#059669]">
            Publish Course
          </button>
        )}
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
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Category
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>Select Category</option>
              <option>Bible Studies</option>
              <option>Theology</option>
              <option>History</option>
              <option>Ethics</option>
              <option>Music & Worship</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Level
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Language
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
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
              Short Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief overview of the course..."
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
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Intro Video URL
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            />
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
  const [selectedAge, setSelectedAge] = React.useState("All Ages")
  const ages = [
    "All Ages",
    "Kids (6-12)",
    "Teens (13-18)",
    "Young Adults (19-25)",
    "Adults (26+)",
  ]

  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-5 p-6">
        <h3 className="font-bold text-[#1D1D1D]">Age Group & Access</h3>

        <div>
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
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#666666]">
            Course Visibility
          </label>
          <select className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]">
            <option>Public - Anyone can enroll</option>
            <option>Private - Invite only</option>
            <option>Password Protected</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#666666]">
            Prerequisites
          </label>
          <textarea
            rows={3}
            placeholder="Any courses or knowledge required before enrollment..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>

        <div className="rounded-xl bg-[#FFF5E0] p-4">
          <p className="text-xs text-[#B45309]">
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
      title: "Module 1: Introduction",
      lessons: [
        {
          id: 1,
          title: "Welcome & Overview",
          type: "Video",
          duration: "10 min",
        },
        { id: 2, title: "Course Objectives", type: "Text", duration: "5 min" },
      ],
    },
    {
      id: 2,
      title: "Module 2: Core Concepts",
      lessons: [
        {
          id: 3,
          title: "Understanding Scripture",
          type: "Video",
          duration: "25 min",
        },
      ],
    },
  ])

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Module ${prev.length + 1}: New Module`,
        lessons: [],
      },
    ])
  }

  const addLesson = (moduleId: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                {
                  id: Date.now(),
                  title: "New Lesson",
                  type: "Video",
                  duration: "0 min",
                },
              ],
            }
          : m
      )
    )
  }

  const removeModule = (moduleId: number) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1D1D1D]">Course Content</h3>
        <button
          onClick={addModule}
          className="flex items-center gap-1 text-sm font-semibold text-[#4CC0D8] hover:underline"
        >
          <Plus className="h-4 w-4" />
          Add Module
        </button>
      </div>

      {modules.map((mod) => (
        <Card key={mod.id} className="border-gray-100 shadow-none">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  defaultValue={mod.title}
                  className="border-none bg-transparent text-sm font-bold text-[#1D1D1D] outline-none focus:underline"
                />
              </div>
              <button
                onClick={() => removeModule(mod.id)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 pl-6">
              {mod.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-3.5 w-3.5 text-[#9CA3AF]" />
                    <span className="text-sm text-[#1D1D1D]">
                      {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-[#F8F9FC] px-2 py-0.5 text-xs text-[#9CA3AF]">
                      {lesson.type}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      {lesson.duration}
                    </span>
                    <button className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => addLesson(mod.id)}
                className="flex items-center gap-1 py-2 text-xs font-semibold text-[#4CC0D8] hover:underline"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Lesson
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
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
          <button onClick={() => setQuizEnabled(!quizEnabled)}>
            {quizEnabled ? (
              <ToggleRight className="h-8 w-8 text-[#4CC0D8]" />
            ) : (
              <ToggleLeft className="h-8 w-8 text-[#9CA3AF]" />
            )}
          </button>
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
              <button onClick={() => setCertQuiz(!certQuiz)}>
                {certQuiz ? (
                  <ToggleRight className="h-8 w-8 text-[#4CC0D8]" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-[#9CA3AF]" />
                )}
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 5: Certificate                                                */
/* ------------------------------------------------------------------ */
function StepCertificate() {
  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-5 p-6">
        <h3 className="font-bold text-[#1D1D1D]">Certificate Settings</h3>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Certificate Title
          </label>
          <input
            type="text"
            defaultValue="Certificate of Completion"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Certificate Template
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["Classic", "Modern", "Elegant"].map((template, i) => (
              <button
                key={template}
                className={cn(
                  "flex h-32 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-all",
                  i === 0
                    ? "border-[#4CC0D8] bg-[#EBF7F9] text-[#4CC0D8]"
                    : "border-gray-200 bg-[#F8F9FC] text-[#666666] hover:border-[#4CC0D8]"
                )}
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Custom Logo
          </label>
          <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-[#F8F9FC] transition-colors hover:border-[#4CC0D8]">
            <div className="text-center">
              <Upload className="mx-auto h-6 w-6 text-[#9CA3AF]" />
              <p className="mt-1 text-xs text-[#9CA3AF]">Upload logo</p>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#666666]">
            Signature Name
          </label>
          <input
            type="text"
            placeholder="Instructor name for signature"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
          />
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 6: Review & Publish                                           */
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
    {
      title: "Certificate",
      items: [
        { label: "Template", value: "Classic" },
        { label: "Certificate Title", value: "Certificate of Completion" },
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
