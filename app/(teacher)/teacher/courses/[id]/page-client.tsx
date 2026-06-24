"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Plus,
  Trash2,
  Check,
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import AssignmentManagementModal from "@/components/teacher/assignment-management-modal"
import QuizManagementModal from "@/components/teacher/quiz-management-modal"
import ImageUploader from "@/components/image-upload"
import { getApiErrorMessage } from "@/lib/api/client"
import {
  useCourseAgeGroupChoiceOptionsQuery,
  useCourseCategoryOptionsQuery,
  useCourseDetailsQuery,
  useCourseProgramOptionsQuery,
  useCreateCourseMutation,
  useUpdateCourseStepMutation,
} from "@/hooks/api/use-courses"
import { toast } from "sonner"
import RichTextEditor from "@/components/common/rich-text-editor"
import { isRichTextEmpty, normalizeRichText } from "@/lib/rich-text"

const STEPS = [
  { key: "course_info", label: "Course Info", subtitle: "Basic details" },
  { key: "content", label: "Content", subtitle: "Modules & lessons" },
  { key: "review", label: "Review", subtitle: "Submit course" },
] as const

interface SelectOption {
  label: string
  value: string
}

const VISIBILITY_OPTIONS: SelectOption[] = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
]

const LEVEL_OPTIONS: SelectOption[] = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
]

const LANGUAGE_OPTIONS: SelectOption[] = [
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "Spanish", value: "Spanish" },
]

interface CourseInfoFormValues {
  title: string
  description: string
  categoryId: string
  programId: string
  ageGroup: string
  visibility: string
  price: string
  level: string
  language: string
}

interface LessonFormValues {
  id: number
  title: string
  videoLink: string
  description: string
  quizIds: number[]
  assignmentIds: number[]
}

interface ModuleFormValues {
  id: number
  title: string
  description: string
  open: boolean
  lessons: LessonFormValues[]
}

const DEFAULT_COURSE_INFO: CourseInfoFormValues = {
  title: "",
  description: "",
  categoryId: "",
  programId: "",
  ageGroup: "",
  visibility: VISIBILITY_OPTIONS[0]?.value ?? "public",
  price: "50.00",
  level: LEVEL_OPTIONS[0]?.value ?? "beginner",
  language: LANGUAGE_OPTIONS[0]?.value ?? "English",
}

function nextEntityId() {
  return Date.now() + Math.floor(Math.random() * 10_000)
}

function createDefaultLesson(): LessonFormValues {
  return {
    id: nextEntityId(),
    title: "",
    videoLink: "",
    description: "",
    quizIds: [],
    assignmentIds: [],
  }
}

function createDefaultModule(index: number): ModuleFormValues {
  return {
    id: nextEntityId(),
    title: `Module ${index} Title`,
    description: "",
    open: true,
    lessons: [createDefaultLesson()],
  }
}

function normalizePriceValue(value: string) {
  const parsed = Number(value)

  if (!Number.isFinite(parsed)) {
    return value
  }

  return parsed.toFixed(2)
}

function resolveOptionLabel(options: SelectOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value
}

function formatStatusLabel(status: string | null) {
  if (!status) {
    return "-"
  }

  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

function transformApiToModules(apiModules: any[]): ModuleFormValues[] {
  return apiModules.map((m) => ({
    id: nextEntityId(),
    title: m.title,
    description: m.description,
    open: true,
    lessons: (m.lessons || []).map((l: any) => ({
      id: nextEntityId(),
      title: l.title,
      videoLink: l.video_url || "",
      description: l.content || "",
      quizIds: l.quiz_ids || [],
      assignmentIds: l.assignment_ids || [],
    })),
  }))
}

export default function AddCoursePage() {
  const params = useParams()
  const router = useRouter()
  const initialCourseId =
    params?.id && params.id !== "new" ? Number(params.id) : null

  const [currentStep, setCurrentStep] = React.useState(0)
  const [courseId, setCourseId] = React.useState<number | null>(initialCourseId)
  const [courseStatus, setCourseStatus] = React.useState<string | null>(null)
  const [apiMessage, setApiMessage] = React.useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null)
  const [courseInfo, setCourseInfo] =
    React.useState<CourseInfoFormValues>(DEFAULT_COURSE_INFO)
  const [modules, setModules] = React.useState<ModuleFormValues[]>([
    createDefaultModule(1),
  ])

  const isEditMode = !!courseId

  const courseDetailsQuery = useCourseDetailsQuery(courseId, {
    enabled: !!courseId,
  })

  const createCourseMutation = useCreateCourseMutation()
  const updateCourseStepMutation = useUpdateCourseStepMutation()

  const categoryOptionsQuery = useCourseCategoryOptionsQuery()
  const programOptionsQuery = useCourseProgramOptionsQuery()
  const ageGroupOptionsQuery = useCourseAgeGroupChoiceOptionsQuery()

  React.useEffect(() => {
    if (!courseDetailsQuery.data) return
    // Prevent overwriting if user has already started editing
    // Only preload if we are in edit mode and the form is currently empty/default
    if (
      courseId &&
      (courseInfo.title !== "" ||
        modules.length > 1 ||
        (modules[0] && modules[0].lessons.length > 1))
    ) {
      // If we already have data, we might want to skip, but usually we want to load it once.
      // The user said: if (courseId && modules.length > 1) return // prevent overwrite
      if (
        modules.length > 1 ||
        modules[0]?.lessons.length > 1 ||
        courseInfo.title !== ""
      )
        return
    }

    const course = courseDetailsQuery.data as any

    setCourseInfo({
      title: course.title || "",
      description: course.description || "",
      categoryId: String(course.category_id || course.category || ""),
      programId: String(course.program_id || course.program || ""),
      ageGroup: course.age_group || "",
      visibility: course.visibility || VISIBILITY_OPTIONS[0]?.value || "public",
      price: course.price || "50.00",
      level: course.level || LEVEL_OPTIONS[0]?.value || "beginner",
      language: course.language || LANGUAGE_OPTIONS[0]?.value || "English",
    })

    if (course.modules && course.modules.length > 0) {
      setModules(transformApiToModules(course.modules))
    }

    setCourseStatus(course.status)
  }, [courseDetailsQuery.data, courseId])

  const categoryOptions = React.useMemo<SelectOption[]>(
    () =>
      (categoryOptionsQuery.data?.items ?? []).map((item) => ({
        label: item.value,
        value: String(item.key),
      })),
    [categoryOptionsQuery.data]
  )

  const programOptions = React.useMemo<SelectOption[]>(
    () =>
      (programOptionsQuery.data?.items ?? []).map((item) => ({
        label: item.value,
        value: String(item.key),
      })),
    [programOptionsQuery.data]
  )

  const ageGroupOptions = React.useMemo<SelectOption[]>(
    () =>
      (ageGroupOptionsQuery.data?.items ?? []).map((item) => ({
        label: item.value,
        value: String(item.key),
      })),
    [ageGroupOptionsQuery.data]
  )

  const optionsLoading =
    categoryOptionsQuery.isLoading ||
    programOptionsQuery.isLoading ||
    ageGroupOptionsQuery.isLoading

  const optionsErrorMessage = categoryOptionsQuery.isError
    ? getApiErrorMessage(
        categoryOptionsQuery.error,
        "Unable to load category options"
      )
    : programOptionsQuery.isError
      ? getApiErrorMessage(
          programOptionsQuery.error,
          "Unable to load program options"
        )
      : ageGroupOptionsQuery.isError
        ? getApiErrorMessage(
            ageGroupOptionsQuery.error,
            "Unable to load age group options"
          )
        : null

  const isSubmitting =
    createCourseMutation.isPending || updateCourseStepMutation.isPending
  const isLastStep = currentStep === STEPS.length - 1

  React.useEffect(() => {
    setCourseInfo((previous) => {
      let hasChanges = false
      const next = { ...previous }

      const isCategoryValid = categoryOptions.some(
        (option) => option.value === next.categoryId
      )
      const isProgramValid = programOptions.some(
        (option) => option.value === next.programId
      )
      const isAgeGroupValid = ageGroupOptions.some(
        (option) => option.value === next.ageGroup
      )

      if (!isCategoryValid && categoryOptions.length > 0) {
        next.categoryId = categoryOptions[0].value
        hasChanges = true
      }

      if (!isProgramValid && programOptions.length > 0) {
        next.programId = programOptions[0].value
        hasChanges = true
      }

      if (!isAgeGroupValid && ageGroupOptions.length > 0) {
        next.ageGroup = ageGroupOptions[0].value
        hasChanges = true
      }

      return hasChanges ? next : previous
    })
  }, [ageGroupOptions, categoryOptions, programOptions])

  const goNext = () =>
    setCurrentStep((step) => Math.min(step + 1, STEPS.length - 1))
  const goPrev = () => setCurrentStep((step) => Math.max(step - 1, 0))

  const updateCourseInfoField = React.useCallback(
    (field: keyof CourseInfoFormValues, value: string) => {
      setCourseInfo((previous) => ({ ...previous, [field]: value }))
    },
    []
  )

  const validateCourseInfo = React.useCallback(() => {
    if (!courseInfo.title.trim()) {
      return "Course title is required"
    }

    if (isRichTextEmpty(courseInfo.description)) {
      return "Short description is required"
    }

    if (!courseInfo.categoryId) {
      return "Category is required"
    }

    if (!courseInfo.programId) {
      return "Program is required"
    }

    if (!courseInfo.ageGroup) {
      return "Age group is required"
    }

    if (!courseInfo.visibility) {
      return "Visibility is required"
    }

    if (!courseInfo.price.trim()) {
      return "Price is required"
    }

    const categoryId = Number.parseInt(courseInfo.categoryId, 10)
    const programId = Number.parseInt(courseInfo.programId, 10)

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      return "Category value is invalid"
    }

    if (!Number.isFinite(programId) || programId <= 0) {
      return "Program value is invalid"
    }

    return null
  }, [courseInfo])

  function showApiError(error: unknown, fallbackMessage: string) {
    const message = getApiErrorMessage(error, fallbackMessage)
    setApiMessage(message)
    toast.error(message)
  }

  async function submitCourseInfo(advanceToNextStep: boolean) {
    const validationError = validateCourseInfo()

    if (validationError) {
      setApiMessage(validationError)
      toast.error(validationError)
      return
    }

    const categoryId = Number.parseInt(courseInfo.categoryId, 10)
    const programId = Number.parseInt(courseInfo.programId, 10)

    try {
      if (!courseId) {
        const createResponse = await createCourseMutation.mutateAsync({
          title: courseInfo.title.trim(),
          description: normalizeRichText(courseInfo.description),
          category_id: categoryId,
          program_id: programId,
          age_group: courseInfo.ageGroup,
          visibility: courseInfo.visibility,
          price: normalizePriceValue(courseInfo.price),
          thumbnail: thumbnailFile ?? undefined,
        })

        setCourseId(createResponse.course.id)
        setCourseStatus(createResponse.course.status)

        const successMessage =
          createResponse.message || "Course created and submitted for review"

        setApiMessage(successMessage)
        toast.success(successMessage)

        if (advanceToNextStep) {
          goNext()
        }

        return
      }

      const courseInfoResponse = await updateCourseStepMutation.mutateAsync({
        courseId,
        payload: {
          step: "course_info",
          payload: {
            title: courseInfo.title.trim(),
            description: normalizeRichText(courseInfo.description),
            category_id: categoryId,
            program_id: programId,
            price: normalizePriceValue(courseInfo.price),
            level: courseInfo.level,
            language: courseInfo.language,
            age_group: courseInfo.ageGroup,
            visibility: courseInfo.visibility,
            thumbnail: thumbnailFile ?? undefined,
          },
          save_as_draft: true,
          publish: false,
        },
      })

      setCourseStatus(courseInfoResponse.course.status)

      const successMessage = courseInfoResponse.message || "Draft saved"

      setApiMessage(successMessage)
      toast.success(successMessage)

      if (advanceToNextStep) {
        goNext()
      }
    } catch (error) {
      showApiError(error, "Unable to save course information")
    }
  }

  function buildContentPayload() {
    return {
      modules: modules.map((courseModule, courseModuleIndex) => ({
        title: courseModule.title.trim() || `Module ${courseModuleIndex + 1}`,
        description: normalizeRichText(courseModule.description),
        order: courseModuleIndex,
        lessons: courseModule.lessons.map((lessonItem, lessonIndex) => ({
          title: lessonItem.title.trim() || `Lesson ${lessonIndex + 1}`,
          content: normalizeRichText(lessonItem.description),
          video_url: lessonItem.videoLink.trim(),
          offline_download_enabled: false,
          quiz_ids: lessonItem.quizIds,
          assignment_ids: lessonItem.assignmentIds,
          order: lessonIndex,
        })),
      })),
    }
  }

  async function submitContent(advanceToNextStep: boolean) {
    if (!courseId) {
      const message = "Create the course first from Course Info step"
      setApiMessage(message)
      toast.error(message)
      return
    }

    try {
      const response = await updateCourseStepMutation.mutateAsync({
        courseId,
        payload: {
          step: "content",
          payload: buildContentPayload(),
          save_as_draft: true,
          publish: false,
        },
      })

      setCourseStatus(response.course.status)

      const successMessage = response.message || "Content saved"
      setApiMessage(successMessage)
      toast.success(successMessage)

      if (advanceToNextStep) {
        goNext()
      }
    } catch (error) {
      showApiError(error, "Unable to save course content")
    }
  }

  async function saveReviewDraft() {
    if (!courseId) {
      const message = "Create the course first from Course Info step"
      setApiMessage(message)
      toast.error(message)
      return
    }

    try {
      const response = await updateCourseStepMutation.mutateAsync({
        courseId,
        payload: {
          step: "review",
          payload: {},
          save_as_draft: true,
          publish: false,
        },
      })

      setCourseStatus(response.course.status)

      const successMessage = response.message || "Draft progress saved"
      setApiMessage(successMessage)
      toast.success(successMessage)
    } catch (error) {
      showApiError(error, "Unable to save review draft")
    }
  }

  async function handleNextStep() {
    if (isSubmitting || isLastStep) {
      return
    }

    if (currentStep === 0) {
      await submitCourseInfo(true)
      return
    }

    if (currentStep === 1) {
      await submitContent(true)
      return
    }
  }

  async function handleSaveDraft() {
    if (isSubmitting) {
      return
    }

    if (currentStep === 0) {
      await submitCourseInfo(false)
      return
    }

    if (currentStep === 1) {
      await submitContent(false)
      return
    }

    await saveReviewDraft()
  }

  async function handlePublishCourse() {
    if (!courseId) {
      const message = "Create and save the course before publishing"
      setApiMessage(message)
      toast.error(message)
      return
    }

    try {
      const response = await updateCourseStepMutation.mutateAsync({
        courseId,
        payload: {
          step: "review",
          payload: {},
          publish: true,
        },
      })

      setCourseStatus(response.course.status)

      const successMessage = response.message || "Course submitted for review"
      setApiMessage(successMessage)
      toast.success(successMessage)
      router.push(`/teacher/courses`)
    } catch (error) {
      showApiError(error, "Unable to publish course")
    }
  }

  if (courseId && courseDetailsQuery.isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#4CC0D8]" />
        <p className="text-sm font-medium text-[#666666]">
          Loading course details...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-[#1D1D1D]">
          {isEditMode ? "Edit Course" : "Create New Course"}
        </h3>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          {isEditMode
            ? "Update your course information and content"
            : "Follow the steps to set up your course"}
        </p>
      </div>

      {(courseId || apiMessage) && (
        <div className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
          {courseId && (
            <p className="text-xs text-[#666666]">
              Course ID: <span className="font-semibold">{courseId}</span> |
              Status:{" "}
              <span className="font-semibold">
                {formatStatusLabel(courseStatus)}
              </span>
            </p>
          )}
          {apiMessage && <p className="text-xs text-[#4CC0D8]">{apiMessage}</p>}
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        {STEPS.map((step, index) => {
          const stepLocked = !courseId && index > 0

          return (
            <React.Fragment key={step.key}>
              <button
                type="button"
                onClick={() => setCurrentStep(index)}
                disabled={stepLocked || isSubmitting}
                className={cn(
                  "flex flex-col items-center gap-2",
                  stepLocked && "cursor-not-allowed opacity-70"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all",
                    index === currentStep
                      ? "bg-[#4CC0D8] text-white shadow-[0_0_0_4px_rgba(76,192,216,0.2)]"
                      : index < currentStep
                        ? "bg-[#4CC0D8] text-white"
                        : "bg-[#E5E7EB] text-[#9CA3AF]"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      index <= currentStep ? "text-[#1D1D1D]" : "text-[#9CA3AF]"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">{step.subtitle}</p>
                </div>
              </button>

              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 -mt-8 h-[2px] flex-1",
                    index < currentStep ? "bg-[#4CC0D8]" : "bg-[#E5E7EB]"
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {currentStep === 0 && (
        <StepCourseInfo
          values={courseInfo}
          onFieldChange={updateCourseInfoField}
          thumbnailFile={thumbnailFile}
          onThumbnailChange={setThumbnailFile}
          categoryOptions={categoryOptions}
          programOptions={programOptions}
          ageGroupOptions={ageGroupOptions}
          optionsLoading={optionsLoading}
          optionsErrorMessage={optionsErrorMessage}
        />
      )}
      {currentStep === 1 && (
        <StepContent modules={modules} onModulesChange={setModules} />
      )}
      {currentStep === 2 && (
        <StepReview
          courseId={courseId}
          courseStatus={courseStatus}
          courseInfo={courseInfo}
          modules={modules}
          categoryOptions={categoryOptions}
          programOptions={programOptions}
          ageGroupOptions={ageGroupOptions}
        />
      )}

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentStep === 0 || isSubmitting}
          className="flex items-center gap-1 text-sm font-medium text-[#666666] transition-colors hover:text-[#1D1D1D] disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Previous
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Draft"}
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Next Step"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublishCourse}
              disabled={isSubmitting || !courseId}
              className="rounded-lg bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Publishing..." : "Publish Course"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

interface StepCourseInfoProps {
  values: CourseInfoFormValues
  onFieldChange: (field: keyof CourseInfoFormValues, value: string) => void
  thumbnailFile: File | null
  onThumbnailChange: (file: File | null) => void
  categoryOptions: SelectOption[]
  programOptions: SelectOption[]
  ageGroupOptions: SelectOption[]
  optionsLoading: boolean
  optionsErrorMessage: string | null
}

function StepCourseInfo({
  values,
  onFieldChange,
  thumbnailFile,
  onThumbnailChange,
  categoryOptions,
  programOptions,
  ageGroupOptions,
  optionsLoading,
  optionsErrorMessage,
}: StepCourseInfoProps) {
  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-5">
        <h3 className="font-bold text-[#1D1D1D]">Course Information</h3>

        {optionsErrorMessage && (
          <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
            {optionsErrorMessage}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Course Title
            </label>
            <input
              type="text"
              value={values.title}
              onChange={(event) => onFieldChange("title", event.target.value)}
              placeholder="e.g. Exploring the Bible: An Introduction"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Short Description
            </label>
            <RichTextEditor
              value={values.description}
              onChange={(value) => onFieldChange("description", value)}
              placeholder="Brief overview of the course..."
              minHeightClassName="min-h-[110px]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Category
            </label>
            <select
              value={values.categoryId}
              onChange={(event) =>
                onFieldChange("categoryId", event.target.value)
              }
              disabled={optionsLoading || categoryOptions.length === 0}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            >
              {categoryOptions.length === 0 ? (
                <option value="">
                  {optionsLoading ? "Loading categories..." : "No categories"}
                </option>
              ) : (
                categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Program
            </label>
            <select
              value={values.programId}
              onChange={(event) =>
                onFieldChange("programId", event.target.value)
              }
              disabled={optionsLoading || programOptions.length === 0}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            >
              {programOptions.length === 0 ? (
                <option value="">
                  {optionsLoading ? "Loading programs..." : "No programs"}
                </option>
              ) : (
                programOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Age Group
            </label>
            <select
              value={values.ageGroup}
              onChange={(event) =>
                onFieldChange("ageGroup", event.target.value)
              }
              disabled={optionsLoading || ageGroupOptions.length === 0}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            >
              {ageGroupOptions.length === 0 ? (
                <option value="">
                  {optionsLoading ? "Loading age groups..." : "No age groups"}
                </option>
              ) : (
                ageGroupOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Visibility
            </label>
            <select
              value={values.visibility}
              onChange={(event) =>
                onFieldChange("visibility", event.target.value)
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            >
              {VISIBILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Price ($)
            </label>
            <input
              type="number"
              value={values.price}
              onChange={(event) => onFieldChange("price", event.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Level
            </label>
            <select
              value={values.level}
              onChange={(event) => onFieldChange("level", event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            >
              {LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Language
            </label>
            <select
              value={values.language}
              onChange={(event) =>
                onFieldChange("language", event.target.value)
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#666666]">
              Course Thumbnail
            </label>
            <ImageUploader
              initialFile={thumbnailFile}
              onFileChange={onThumbnailChange}
              maxSizeMB={1}
              ariaLabel="Upload course thumbnail"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StepContentProps {
  modules: ModuleFormValues[]
  onModulesChange: React.Dispatch<React.SetStateAction<ModuleFormValues[]>>
}

function StepContent({ modules, onModulesChange }: StepContentProps) {
  const [quizModalOpen, setQuizModalOpen] = React.useState(false)
  const [assignmentModalOpen, setAssignmentModalOpen] = React.useState(false)
  const [activeLessonTarget, setActiveLessonTarget] = React.useState<{
    moduleId: number
    lessonId: number
  } | null>(null)

  const attachEntityToLesson = (
    field: "quizIds" | "assignmentIds",
    entityId: number
  ) => {
    if (!activeLessonTarget) {
      return
    }

    onModulesChange((previous) =>
      previous.map((courseModule) =>
        courseModule.id === activeLessonTarget.moduleId
          ? {
              ...courseModule,
              lessons: courseModule.lessons.map((lessonItem) =>
                lessonItem.id === activeLessonTarget.lessonId
                  ? {
                      ...lessonItem,
                      [field]: lessonItem[field].includes(entityId)
                        ? lessonItem[field]
                        : [...lessonItem[field], entityId],
                    }
                  : lessonItem
              ),
            }
          : courseModule
      )
    )
  }

  const openQuizModalForLesson = (moduleId: number, lessonId: number) => {
    setActiveLessonTarget({ moduleId, lessonId })
    setQuizModalOpen(true)
  }

  const openAssignmentModalForLesson = (moduleId: number, lessonId: number) => {
    setActiveLessonTarget({ moduleId, lessonId })
    setAssignmentModalOpen(true)
  }

  const toggleModule = (courseModuleId: number) => {
    onModulesChange((previous) =>
      previous.map((courseModule) =>
        courseModule.id === courseModuleId
          ? { ...courseModule, open: !courseModule.open }
          : courseModule
      )
    )
  }

  const updateModuleField = (
    courseModuleId: number,
    field: keyof Pick<ModuleFormValues, "title" | "description">,
    value: string
  ) => {
    onModulesChange((previous) =>
      previous.map((courseModule) =>
        courseModule.id === courseModuleId
          ? { ...courseModule, [field]: value }
          : courseModule
      )
    )
  }

  const addModule = () => {
    onModulesChange((previous) => [
      ...previous,
      createDefaultModule(previous.length + 1),
    ])
  }

  const removeModule = (courseModuleId: number) => {
    onModulesChange((previous) =>
      previous.filter((courseModule) => courseModule.id !== courseModuleId)
    )
  }

  const addLesson = (courseModuleId: number) => {
    onModulesChange((previous) =>
      previous.map((courseModule) =>
        courseModule.id === courseModuleId
          ? {
              ...courseModule,
              open: true,
              lessons: [...courseModule.lessons, createDefaultLesson()],
            }
          : courseModule
      )
    )
  }

  const removeLesson = (courseModuleId: number, lessonId: number) => {
    onModulesChange((previous) =>
      previous.map((courseModule) =>
        courseModule.id === courseModuleId
          ? {
              ...courseModule,
              lessons: courseModule.lessons.filter(
                (lessonItem) => lessonItem.id !== lessonId
              ),
            }
          : courseModule
      )
    )
  }

  const updateLessonField = (
    courseModuleId: number,
    lessonId: number,
    field: keyof Pick<LessonFormValues, "title" | "videoLink" | "description">,
    value: string
  ) => {
    onModulesChange((previous) =>
      previous.map((courseModule) =>
        courseModule.id === courseModuleId
          ? {
              ...courseModule,
              lessons: courseModule.lessons.map((lessonItem) =>
                lessonItem.id === lessonId
                  ? { ...lessonItem, [field]: value }
                  : lessonItem
              ),
            }
          : courseModule
      )
    )
  }

  return (
    <div className="space-y-4">
      {modules.map((courseModule) => (
        <Card
          key={courseModule.id}
          className="overflow-hidden border-gray-200 shadow-none"
        >
          <CardContent className="p-0">
            <div className="flex items-center gap-3 px-4 py-4">
              <button
                type="button"
                onClick={() => toggleModule(courseModule.id)}
                className="text-[#9CA3AF] transition-transform"
              >
                {courseModule.open ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>

              <input
                type="text"
                value={courseModule.title}
                onChange={(event) =>
                  updateModuleField(
                    courseModule.id,
                    "title",
                    event.target.value
                  )
                }
                placeholder="Type module title..."
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#4CC0D8]"
              />

              <span className="rounded-lg border border-gray-200 px-3 py-2 text-xs whitespace-nowrap text-[#9CA3AF]">
                {courseModule.lessons.length} lessons
              </span>

              <button
                type="button"
                onClick={() => removeModule(courseModule.id)}
                className="rounded-lg bg-red-50 p-2 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {courseModule.open && (
              <div className="space-y-4 p-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Module Description
                  </label>
                  <textarea
                    rows={2}
                    value={courseModule.description}
                    onChange={(event) =>
                      updateModuleField(
                        courseModule.id,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Type module description..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                </div>

                {courseModule.lessons.map((lessonItem) => (
                  <div
                    key={lessonItem.id}
                    className="space-y-3 rounded-xl border border-gray-100 bg-[#FAFBFC] p-4"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto_auto_auto]">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#666666]">
                          Lesson Title
                        </label>
                        <input
                          type="text"
                          value={lessonItem.title}
                          onChange={(event) =>
                            updateLessonField(
                              courseModule.id,
                              lessonItem.id,
                              "title",
                              event.target.value
                            )
                          }
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
                          value={lessonItem.videoLink}
                          onChange={(event) =>
                            updateLessonField(
                              courseModule.id,
                              lessonItem.id,
                              "videoLink",
                              event.target.value
                            )
                          }
                          placeholder="Paste video link"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#666666]">
                          Quiz
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            openQuizModalForLesson(
                              courseModule.id,
                              lessonItem.id
                            )
                          }
                          className="flex items-center gap-1.5 rounded-lg bg-[#4CC0D8] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add Quiz
                        </button>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#666666]">
                          Assignment
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            openAssignmentModalForLesson(
                              courseModule.id,
                              lessonItem.id
                            )
                          }
                          className="flex items-center gap-1.5 rounded-lg bg-[#4CC0D8] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add Assignment
                        </button>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() =>
                            removeLesson(courseModule.id, lessonItem.id)
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7280]">
                      <span>
                        Quiz IDs:{" "}
                        {lessonItem.quizIds.length > 0
                          ? lessonItem.quizIds.join(", ")
                          : "none"}
                      </span>
                      <span>
                        Assignment IDs:{" "}
                        {lessonItem.assignmentIds.length > 0
                          ? lessonItem.assignmentIds.join(", ")
                          : "none"}
                      </span>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#666666]">
                        Lesson Description
                      </label>
                      <RichTextEditor
                        value={lessonItem.description}
                        onChange={(value) =>
                          updateLessonField(
                            courseModule.id,
                            lessonItem.id,
                            "description",
                            value
                          )
                        }
                        placeholder="Type lesson description..."
                        minHeightClassName="min-h-[130px]"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() => addLesson(courseModule.id)}
                  className="flex w-full items-center justify-end"
                  variant="ghost"
                >
                  <Plus className="h-4 w-4" />
                  Add Lesson
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        onClick={addModule}
        variant="ghost"
        className="flex w-full items-center justify-end"
      >
        <Plus className="h-4 w-4" />
        Add Module
      </Button>

      <QuizManagementModal
        open={quizModalOpen}
        onOpenChange={(open) => {
          setQuizModalOpen(open)

          if (!open) {
            setActiveLessonTarget(null)
          }
        }}
        onCreated={(quizId) => attachEntityToLesson("quizIds", quizId)}
      />

      <AssignmentManagementModal
        open={assignmentModalOpen}
        onOpenChange={(open) => {
          setAssignmentModalOpen(open)

          if (!open) {
            setActiveLessonTarget(null)
          }
        }}
        onCreated={(assignmentId) =>
          attachEntityToLesson("assignmentIds", assignmentId)
        }
      />
    </div>
  )
}

interface StepReviewProps {
  courseId: number | null
  courseStatus: string | null
  courseInfo: CourseInfoFormValues
  modules: ModuleFormValues[]
  categoryOptions: SelectOption[]
  programOptions: SelectOption[]
  ageGroupOptions: SelectOption[]
}

function StepReview({
  courseId,
  courseStatus,
  courseInfo,
  modules,
  categoryOptions,
  programOptions,
  ageGroupOptions,
}: StepReviewProps) {
  const totalLessons = modules.reduce(
    (count, courseModule) => count + courseModule.lessons.length,
    0
  )

  const sections = [
    {
      title: "Course Info",
      items: [
        { label: "Title", value: courseInfo.title || "-" },
        {
          label: "Category",
          value: resolveOptionLabel(categoryOptions, courseInfo.categoryId),
        },
        {
          label: "Program",
          value: resolveOptionLabel(programOptions, courseInfo.programId),
        },
        {
          label: "Age Group",
          value: resolveOptionLabel(ageGroupOptions, courseInfo.ageGroup),
        },
        {
          label: "Visibility",
          value: resolveOptionLabel(VISIBILITY_OPTIONS, courseInfo.visibility),
        },
        {
          label: "Price",
          value: courseInfo.price
            ? `$${normalizePriceValue(courseInfo.price)}`
            : "-",
        },
        {
          label: "Level",
          value: resolveOptionLabel(LEVEL_OPTIONS, courseInfo.level),
        },
        {
          label: "Language",
          value: resolveOptionLabel(LANGUAGE_OPTIONS, courseInfo.language),
        },
      ],
    },
    {
      title: "Content",
      items: [
        { label: "Modules", value: String(modules.length) },
        { label: "Total Lessons", value: String(totalLessons) },
      ],
    },
    {
      title: "Workflow",
      items: [
        {
          label: "Course ID",
          value: courseId ? String(courseId) : "Not created yet",
        },
        { label: "Status", value: formatStatusLabel(courseStatus) },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-[#1D1D1D]">Review Your Course</h3>
      <p className="text-sm text-[#666666]">
        Please review all details and submit for admin review.
      </p>

      {sections.map((section) => (
        <Card key={section.title} className="border-gray-100 shadow-none">
          <CardContent className="p-4">
            <h4 className="mb-3 text-sm font-bold text-[#1D1D1D]">
              {section.title}
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between gap-4">
                  <span className="text-xs text-[#9CA3AF]">{item.label}</span>
                  <span className="text-right text-xs font-medium text-[#1D1D1D]">
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
          <strong>Ready to submit!</strong> Publishing from this step will call
          the review endpoint and move the course through admin approval.
        </p>
      </div>
    </div>
  )
}
