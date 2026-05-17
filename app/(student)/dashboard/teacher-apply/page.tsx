"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { BadgeCheck, CheckCircle2, CircleX, Loader2 } from "lucide-react"
import {
  useStudentTeacherApplicationEligibilityQuery,
  useSubmitStudentTeacherApplicationMutation,
} from "@/hooks/api/use-students"
import { ApiError, getApiErrorMessage } from "@/lib/api/client"
import type { StudentTeacherApplication } from "@/lib/api/students"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"
import ImageUploader from "@/components/image-upload"
import MultipleFileUploader from "@/components/file-upload"
import { Button } from "@/components/ui/button"

const AGE_GROUP_FALLBACK_OPTIONS = [
  { value: "kids", label: "Kids" },
  { value: "teens", label: "Teens" },
  { value: "adults", label: "Adults" },
]

const TEACHING_MODE_FALLBACK_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "live_classes", label: "Live Classes" },
]

const EMPTY_EXPERTISE_OPTIONS: { id: number; name: string }[] = []

const FIELD_KEYS = [
  "full_name",
  "email",
  "phone_number",
  "profile_photo",
  "educational_background",
  "teaching_experience",
  "motivation",
  "preferred_age_group",
  "preferred_teaching_mode",
  "agreement_accepted",
  "expertise_ids",
  "certificate_documents",
  "recommendation_letter",
  "other_documents",
  "error",
] as const

type FieldKey = (typeof FIELD_KEYS)[number]

interface TeacherApplyFormState {
  fullName: string
  email: string
  phoneNumber: string
  profilePhoto: File | null
  educationalBackground: string
  teachingExperience: string
  motivation: string
  preferredAgeGroup: string
  preferredTeachingMode: string
  agreementAccepted: boolean
  certificateDocuments: File[]
  recommendationLetter: File | null
  otherDocuments: File[]
}

function getFirstErrorMessage(value: unknown) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value
  }

  if (Array.isArray(value)) {
    const firstString = value.find(
      (entry) => typeof entry === "string" && entry.trim().length > 0
    )

    if (typeof firstString === "string") {
      return firstString
    }
  }

  return null
}

function getFieldErrors(error: unknown) {
  const nextErrors: Partial<Record<FieldKey, string>> = {}

  if (
    !(error instanceof ApiError) ||
    !error.data ||
    typeof error.data !== "object" ||
    Array.isArray(error.data)
  ) {
    return nextErrors
  }

  const payload = error.data as Record<string, unknown>

  for (const key of FIELD_KEYS) {
    if (key === "error") {
      continue
    }

    const message = getFirstErrorMessage(payload[key])

    if (message) {
      nextErrors[key] = message
    }
  }

  const generalMessage =
    getFirstErrorMessage(payload.error) ??
    getFirstErrorMessage(payload.non_field_errors)

  if (generalMessage) {
    nextErrors.error = generalMessage
  }

  return nextErrors
}

function formatApplicationStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getApplicationStatusBadgeClass(status: string) {
  switch (status) {
    case "approved":
      return "border-0 bg-green-600/10 text-green-700"
    case "rejected":
      return "border-0 bg-red-600/10 text-red-700"
    default:
      return "border-0 bg-amber-600/10 text-amber-700"
  }
}

function formatSubmittedDate(dateString: string) {
  return dateString.includes("T")
    ? `${dateString.slice(0, 10)} ${dateString.slice(11, 16)}`
    : dateString
}

function ApplicationSummary({
  application,
  title,
}: {
  application: StudentTeacherApplication
  title: string
}) {
  return (
    <Card className="border-gray-200 bg-white/80 shadow-none">
      <CardContent>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-[#1D1D1D] mb-4">{title}</h3>
          <Badge
            className={cn(
              "px-2.5 py-1 text-xs font-semibold",
              getApplicationStatusBadgeClass(application.status)
            )}
          >
            {formatApplicationStatus(application.status)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs text-[#666666] sm:grid-cols-2">
          <p>
            <span className="font-semibold text-[#1D1D1D]">Submitted:</span>{" "}
            {formatSubmittedDate(application.submitted_at)}
          </p>
          <p>
            <span className="font-semibold text-[#1D1D1D]">Email:</span>{" "}
            {application.email}
          </p>
          <p className="sm:col-span-2">
            <span className="font-semibold text-[#1D1D1D]">Expertise:</span>{" "}
            {application.expertise.length > 0
              ? application.expertise.map((item) => item.name).join(", ")
              : "Not provided"}
          </p>
          {application.status === "rejected" &&
            application.rejection_reason.trim().length > 0 && (
              <p className="text-red-600 sm:col-span-2">
                <span className="font-semibold">Reason:</span>{" "}
                {application.rejection_reason}
              </p>
            )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function TeacherApplyPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const eligibilityQuery = useStudentTeacherApplicationEligibilityQuery()
  const submitTeacherApplicationMutation =
    useSubmitStudentTeacherApplicationMutation()

  const [selectedExpertise, setSelectedExpertise] = useState<number[]>([])
  const [formState, setFormState] = useState<TeacherApplyFormState>(() => ({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phoneNumber: "",
    profilePhoto: null,
    educationalBackground: "",
    teachingExperience: "",
    motivation: "",
    preferredAgeGroup: "",
    preferredTeachingMode: "",
    agreementAccepted: false,
    certificateDocuments: [],
    recommendationLetter: null,
    otherDocuments: [],
  }))
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, string>>
  >({})

  const fieldOptions = eligibilityQuery.data?.field_options
  const eligibility = eligibilityQuery.data?.eligibility
  const latestApplication = eligibilityQuery.data?.latest_application

  const ageGroupOptions =
    fieldOptions && fieldOptions.preferred_age_groups.length > 0
      ? fieldOptions.preferred_age_groups
      : AGE_GROUP_FALLBACK_OPTIONS

  const teachingModeOptions =
    fieldOptions && fieldOptions.preferred_teaching_modes.length > 0
      ? fieldOptions.preferred_teaching_modes
      : TEACHING_MODE_FALLBACK_OPTIONS

  const expertiseOptions = fieldOptions?.expertise ?? EMPTY_EXPERTISE_OPTIONS

  const defaultSelectedExpertiseIds = useMemo(() => {
    if (latestApplication && latestApplication.expertise.length > 0) {
      return latestApplication.expertise.map((item) => item.id)
    }

    if (expertiseOptions.length > 0) {
      return [expertiseOptions[0].id]
    }

    return []
  }, [expertiseOptions, latestApplication])

  const activeSelectedExpertise =
    selectedExpertise.length > 0
      ? selectedExpertise
      : defaultSelectedExpertiseIds

  const selectedAgeGroup =
    formState.preferredAgeGroup ||
    latestApplication?.preferred_age_group ||
    ageGroupOptions[0]?.value ||
    ""

  const selectedTeachingMode =
    formState.preferredTeachingMode ||
    latestApplication?.preferred_teaching_mode ||
    teachingModeOptions[0]?.value ||
    ""

  const documentTypeLabels = useMemo(() => {
    const documentTypes = fieldOptions?.document_types ?? []

    const getDocumentLabel = (value: string, fallback: string) =>
      documentTypes.find((item) => item.value === value)?.label ?? fallback

    return {
      certificate: getDocumentLabel("certificate", "Certificate / Document"),
      recommendationLetter: getDocumentLabel(
        "recommendation_letter",
        "Recommendation Letter"
      ),
      other: getDocumentLabel("other", "Other Supporting Documents"),
    }
  }, [fieldOptions])

  const eligibilityItems = useMemo(() => {
    if (!eligibility) {
      return []
    }

    return [
      {
        label: `Age ${eligibility.minimum_age ?? 18}+`,
        passed: eligibility.is_age_eligible,
        details:
          typeof eligibility.age === "number"
            ? `Current age: ${eligibility.age}`
            : null,
      },
      {
        label: `At least ${eligibility.minimum_completed_courses ?? 1} completed course`,
        passed: eligibility.has_completed_course,
        details:
          typeof eligibility.completed_courses === "number"
            ? `Completed courses: ${eligibility.completed_courses}`
            : null,
      },
      {
        label: "Not already an active teacher",
        passed: !eligibility.is_teacher_active,
        details: null,
      },
    ]
  }, [eligibility])

  const motivationWordCount = formState.motivation.trim().length
    ? formState.motivation.trim().split(/\s+/).length
    : 0

  function updateField<K extends keyof TeacherApplyFormState>(
    key: K,
    value: TeacherApplyFormState[K]
  ) {
    setFormState((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function toggleExpertise(expertiseId: number) {
    setSelectedExpertise((previous) => {
      const baseSelection =
        previous.length > 0 ? previous : defaultSelectedExpertiseIds

      return baseSelection.includes(expertiseId)
        ? baseSelection.filter((id) => id !== expertiseId)
        : [...baseSelection, expertiseId]
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setFieldErrors({})

    if (activeSelectedExpertise.length === 0) {
      setFieldErrors({ expertise_ids: "Select at least one expertise area." })
      return
    }

    if (!selectedAgeGroup || !selectedTeachingMode) {
      setFieldErrors({
        preferred_age_group: !selectedAgeGroup
          ? "Select a preferred age group."
          : undefined,
        preferred_teaching_mode: !selectedTeachingMode
          ? "Select a preferred teaching mode."
          : undefined,
      })
      return
    }

    if (!formState.agreementAccepted) {
      setFieldErrors({
        agreement_accepted: "You must accept the agreement before submitting.",
      })
      return
    }

    if (eligibility && !eligibility.can_apply) {
      toast.error("You are not currently eligible to apply as a teacher.")
      return
    }

    try {
      const response = await submitTeacherApplicationMutation.mutateAsync({
        full_name: formState.fullName,
        email: formState.email,
        phone_number: formState.phoneNumber || undefined,
        profile_photo: formState.profilePhoto,
        educational_background: formState.educationalBackground,
        teaching_experience: formState.teachingExperience,
        motivation: formState.motivation,
        preferred_age_group: selectedAgeGroup,
        preferred_teaching_mode: selectedTeachingMode,
        agreement_accepted: formState.agreementAccepted,
        expertise_ids: activeSelectedExpertise,
        certificate_documents: formState.certificateDocuments,
        recommendation_letter: formState.recommendationLetter,
        other_documents: formState.otherDocuments,
      })

      toast.success(
        response.message || "Teacher application submitted successfully."
      )
      router.push("/dashboard/teacher-apply/success")
    } catch (error) {
      const parsedErrors = getFieldErrors(error)

      if (Object.keys(parsedErrors).length > 0) {
        setFieldErrors(parsedErrors)
      }

      toast.error(
        getApiErrorMessage(error, "Failed to submit teacher application.")
      )
    }
  }

  if (eligibilityQuery.isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-36 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-72 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    )
  }

  if (eligibilityQuery.isError || !eligibility) {
    return (
      <Card className="border-red-100 bg-red-50/60 shadow-none">
        <CardContent className="space-y-3 p-6">
          <h2 className="text-base font-bold text-[#1D1D1D]">
            Unable to load teacher application status
          </h2>
          <p className="text-sm text-red-600">
            {getApiErrorMessage(
              eligibilityQuery.error,
              "Failed to load application eligibility."
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              eligibilityQuery.refetch()
            }}
            className="inline-flex rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-300"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    )
  }

  if (eligibility.is_teacher_active) {
    return (
      <div className="space-y-4">
        <Card className="border-green-200 bg-green-50/70 shadow-none">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <BadgeCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1D1D1D]">
                  You are a verified teacher
                </h2>
                <p className="text-sm text-[#666666]">
                  Your teacher profile is active. You do not need to submit a
                  new application.
                </p>
              </div>
            </div>

            <Badge className="border-0 bg-green-600/10 px-3 py-1 text-xs font-semibold text-green-700">
              Verified Teacher
            </Badge>
          </CardContent>
        </Card>

        {latestApplication && (
          <ApplicationSummary
            application={latestApplication}
            title="Latest Teacher Application"
          />
        )}
      </div>
    )
  }

  const isSubmitDisabled =
    submitTeacherApplicationMutation.isPending || !eligibility.can_apply

  return (
    <div className="space-y-8">
      {latestApplication && (
        <ApplicationSummary
          application={latestApplication}
          title="Latest Application Status"
        />
      )}

      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#1D1D1D]">
            Apply as a Teacher
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Share your knowledge and guide students on their learning journey.
          </p>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h3 className="text-sm font-bold text-[#1D1D1D]">
              Eligibility Requirements
            </h3>
          </div>

          <div className="ml-7 space-y-2">
            {eligibilityItems.map((item) => (
              <div key={item.label} className="space-y-0.5">
                <div
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    item.passed ? "text-[#666666]" : "text-red-600"
                  )}
                >
                  {item.passed ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <CircleX className="h-4 w-4 shrink-0 text-red-500" />
                  )}
                  {item.label}
                </div>

                {item.details && (
                  <p className="ml-6 text-xs text-[#9CA3AF]">{item.details}</p>
                )}
              </div>
            ))}
          </div>

          {eligibility.can_apply ? (
            <p className="mt-3 ml-7 text-xs text-green-600">
              You meet all the requirements. Please proceed with your
              application.
            </p>
          ) : (
            <p className="mt-3 ml-7 text-xs text-red-600">
              You are not currently eligible to apply as a teacher.
            </p>
          )}

          {fieldErrors.error && (
            <p className="mt-2 ml-7 text-xs text-red-600">
              {fieldErrors.error}
            </p>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Basic Information
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1D1D1D]">
              Profile Photo
            </label>
            <ImageUploader
              ariaLabel="Upload profile photo"
              onFileChange={(file) => {
                updateField("profilePhoto", file)
              }}
            />
            {fieldErrors.profile_photo && (
              <p className="text-xs text-red-600">
                {fieldErrors.profile_photo}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={formState.fullName}
                onChange={(event) => {
                  updateField("fullName", event.target.value)
                }}
                placeholder="John Doe"
                required
                aria-invalid={Boolean(fieldErrors.full_name)}
                className="h-11 rounded-xl border-gray-200"
              />
              {fieldErrors.full_name && (
                <p className="text-xs text-red-600">{fieldErrors.full_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={formState.email}
                onChange={(event) => {
                  updateField("email", event.target.value)
                }}
                placeholder="john.doe@example.com"
                required
                aria-invalid={Boolean(fieldErrors.email)}
                className="h-11 rounded-xl border-gray-200"
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Phone Number
              </label>
              <Input
                value={formState.phoneNumber}
                onChange={(event) => {
                  updateField("phoneNumber", event.target.value)
                }}
                placeholder="+15551234567"
                aria-invalid={Boolean(fieldErrors.phone_number)}
                className="h-11 rounded-xl border-gray-200"
              />
              {fieldErrors.phone_number && (
                <p className="text-xs text-red-600">
                  {fieldErrors.phone_number}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Background & Experience
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Educational Background <span className="text-red-500">*</span>
              </label>
              <Input
                value={formState.educationalBackground}
                onChange={(event) => {
                  updateField("educationalBackground", event.target.value)
                }}
                placeholder="Bachelor in Theology"
                required
                aria-invalid={Boolean(fieldErrors.educational_background)}
                className="h-11 rounded-xl border-gray-200"
              />
              {fieldErrors.educational_background && (
                <p className="text-xs text-red-600">
                  {fieldErrors.educational_background}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Teaching / Ministry Experience
                <span className="text-red-500"> *</span>
              </label>
              <Textarea
                value={formState.teachingExperience}
                onChange={(event) => {
                  updateField("teachingExperience", event.target.value)
                }}
                placeholder="5 years of mentoring youth classes."
                required
                aria-invalid={Boolean(fieldErrors.teaching_experience)}
                className="min-h-24 resize-none rounded-xl border-gray-200"
              />
              {fieldErrors.teaching_experience && (
                <p className="text-xs text-red-600">
                  {fieldErrors.teaching_experience}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Teaching Preference
          </h3>

          <div className="flex justify-between gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Preferred Age Group <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {ageGroupOptions.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      updateField("preferredAgeGroup", item.value)
                    }}
                    className={cn(
                      "rounded-full border px-5 py-1.5 text-sm font-medium transition-colors",
                      selectedAgeGroup === item.value
                        ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                        : "border-gray-200 bg-white text-[#666666] hover:border-[#4CC0D8]"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {fieldErrors.preferred_age_group && (
                <p className="text-xs text-red-600">
                  {fieldErrors.preferred_age_group}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Area of Expertise <span className="text-red-500">*</span>
              </label>
              {expertiseOptions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {expertiseOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        toggleExpertise(item.id)
                      }}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        activeSelectedExpertise.includes(item.id)
                          ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                          : "border-gray-200 bg-white text-[#666666] hover:border-[#4CC0D8]"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-red-600">
                  Expertise options are not available right now. Please try
                  again.
                </p>
              )}
              {fieldErrors.expertise_ids && (
                <p className="text-xs text-red-600">
                  {fieldErrors.expertise_ids}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Mode of Teaching <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {teachingModeOptions.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      updateField("preferredTeachingMode", item.value)
                    }}
                    className={cn(
                      "rounded-full border px-5 py-1.5 text-sm font-medium transition-colors",
                      selectedTeachingMode === item.value
                        ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                        : "border-gray-200 bg-white text-[#666666] hover:border-[#4CC0D8]"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {fieldErrors.preferred_teaching_mode && (
                <p className="text-xs text-red-600">
                  {fieldErrors.preferred_teaching_mode}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">Motivation</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1D1D1D]">
              Why do you want to become a teacher?
              <span className="text-red-500"> *</span>
            </label>
            <Textarea
              value={formState.motivation}
              onChange={(event) => {
                updateField("motivation", event.target.value)
              }}
              placeholder="I want to support learners with practical and spiritual guidance."
              required
              aria-invalid={Boolean(fieldErrors.motivation)}
              className="min-h-28 resize-none rounded-xl border-gray-200"
            />
            {fieldErrors.motivation && (
              <p className="text-xs text-red-600">{fieldErrors.motivation}</p>
            )}
            <p className="text-right text-xs text-[#9CA3AF]">
              <span>{motivationWordCount} / 300 words</span>
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Documents (Optional)
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                {documentTypeLabels.certificate}
              </label>
              <MultipleFileUploader
                ariaLabel="Upload certificate documents"
                onFilesChange={(files) => {
                  updateField("certificateDocuments", files)
                }}
                title={documentTypeLabels.certificate}
                subtitle="Drag and drop one or more files"
              />
              {fieldErrors.certificate_documents && (
                <p className="text-xs text-red-600">
                  {fieldErrors.certificate_documents}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                {documentTypeLabels.recommendationLetter}
              </label>
              <MultipleFileUploader
                ariaLabel="Upload recommendation letter"
                maxFiles={1}
                multiple={false}
                onFilesChange={(files) => {
                  updateField("recommendationLetter", files[0] ?? null)
                }}
                title={documentTypeLabels.recommendationLetter}
              />
              {fieldErrors.recommendation_letter && (
                <p className="text-xs text-red-600">
                  {fieldErrors.recommendation_letter}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                {documentTypeLabels.other}
              </label>
              <MultipleFileUploader
                ariaLabel="Upload other supporting documents"
                onFilesChange={(files) => {
                  updateField("otherDocuments", files)
                }}
                title={documentTypeLabels.other}
                subtitle="Drag and drop one or more files"
              />
              {fieldErrors.other_documents && (
                <p className="text-xs text-red-600">
                  {fieldErrors.other_documents}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">Agreement</h3>
          <Card className="bg-yellow-50">
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-[#666666]">
                I agree to follow the foundation&apos;s values and teaching
                guidelines. I understand that my role as a teacher comes with
                the responsibility to uphold integrity, respect, and commitment
                to student growth.
              </p>

              <label className="flex cursor-pointer items-center justify-center gap-3">
                <Checkbox
                  checked={formState.agreementAccepted}
                  onCheckedChange={(checked) => {
                    updateField("agreementAccepted", checked === true)
                  }}
                  aria-invalid={Boolean(fieldErrors.agreement_accepted)}
                />
                <span className="text-sm text-[#1D1D1D]">
                  I accept the agreement terms
                </span>
              </label>

              {fieldErrors.agreement_accepted && (
                <p className="text-xs text-red-600">
                  {fieldErrors.agreement_accepted}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn("flex h-12 w-full items-center justify-center")}
        >
          {submitTeacherApplicationMutation.isPending && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {submitTeacherApplicationMutation.isPending
            ? "Submitting..."
            : "Submit Application"}
        </Button>

        <p className="text-center text-xs text-[#9CA3AF]">
          Your application will be reviewed by the admin team.
        </p>
      </form>
    </div>
  )
}
