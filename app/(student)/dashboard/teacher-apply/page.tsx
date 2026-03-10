"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const EXPERTISE_OPTIONS = [
  "Bible Study",
  "Discipleship",
  "Evangelism",
  "Youth Mentoring",
]
const AGE_GROUPS = ["Kids", "Teens", "Adults"]
const TEACHING_MODES = ["Online", "Live Classes"]

const REQUIREMENTS = [
  "Age 18+",
  "At least 1 completed course",
  "Admin approval required",
]

export default function TeacherApplyPage() {
  const router = useRouter()
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([
    "Discipleship",
    "Youth Mentoring",
  ])
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>(["Teens"])
  const [selectedMode, setSelectedMode] = useState<string[]>(["Online"])

  function toggleItem(
    list: string[],
    item: string,
    setter: (v: string[]) => void
  ) {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/dashboard/teacher-apply/success")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-gray-100 bg-gray-200">
          <Image
            src="/assets/pngs/Profile.png"
            alt="Profile"
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1D1D1D]">
            Apply as a Teacher
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Share your knowledge and guide students on their learning journey.
          </p>
        </div>
      </div>

      {/* Eligibility Requirements */}
      <Card className="border-green-200 bg-green-50/50 shadow-none">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h3 className="text-sm font-bold text-[#1D1D1D]">
              Eligibility Requirements
            </h3>
          </div>
          <div className="ml-7 space-y-2">
            {REQUIREMENTS.map((req) => (
              <div
                key={req}
                className="flex items-center gap-2 text-sm text-[#666666]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                {req}
              </div>
            ))}
          </div>
          <p className="mt-3 ml-7 text-xs text-green-600">
            You meet all the requirements. Please proceed with your application.
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="John Doe"
                className="h-11 rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                className="h-11 rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Phone Number (optional)
              </label>
              <Input
                placeholder="+31 23 03 03"
                className="h-11 rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Profile Photo
              </label>
              <div className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#9CA3AF] transition-colors hover:border-[#4CC0D8]/30">
                <Upload className="h-4 w-4" />
                Choose file
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Background & Experience */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Background & Experience
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Educational Background
              </label>
              <Input
                placeholder="Bachelor's in Theology, Seminary studies..."
                className="h-11 rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Teaching / Ministry Experience
              </label>
              <Textarea
                placeholder="Share your relevant teaching or ministry experience..."
                className="min-h-24 resize-none rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Area of Expertise
              </label>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleItem(selectedExpertise, item, setSelectedExpertise)
                    }
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      selectedExpertise.includes(item)
                        ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                        : "border-gray-200 bg-white text-[#666666] hover:border-[#4CC0D8]"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Teaching Preference */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Teaching Preference
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Preferred Age Group
              </label>
              <div className="flex flex-wrap gap-2">
                {AGE_GROUPS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleItem(selectedAgeGroup, item, setSelectedAgeGroup)
                    }
                    className={cn(
                      "rounded-full border px-5 py-1.5 text-sm font-medium transition-colors",
                      selectedAgeGroup.includes(item)
                        ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                        : "border-gray-200 bg-white text-[#666666] hover:border-[#4CC0D8]"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Mode of Teaching
              </label>
              <div className="flex flex-wrap gap-2">
                {TEACHING_MODES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleItem(selectedMode, item, setSelectedMode)
                    }
                    className={cn(
                      "rounded-full border px-5 py-1.5 text-sm font-medium transition-colors",
                      selectedMode.includes(item)
                        ? "border-[#4CC0D8] bg-[#4CC0D8] text-white"
                        : "border-gray-200 bg-white text-[#666666] hover:border-[#4CC0D8]"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Motivation */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">Motivation</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1D1D1D]">
              Why do you want to become a teacher?
            </label>
            <Textarea
              placeholder="Share your passion and purpose for teaching. What drives you to guide others in their learning journey?"
              className="min-h-28 resize-none rounded-xl border-gray-200"
            />
            <p className="text-right text-xs text-[#9CA3AF]">
              Express yourself authentically - this helps us understand your
              calling.
              <span className="ml-2">0 / 300 words</span>
            </p>
          </div>
        </section>

        <Separator />

        {/* Documents */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">
            Documents (Optional)
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Certificates / Documents
              </label>
              <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center transition-colors hover:border-[#4CC0D8]/30">
                <Upload className="mx-auto mb-3 h-8 w-8 text-[#9CA3AF]" />
                <p className="text-sm text-[#666666]">
                  Drag & drop files here, or click to browse
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-[#666666] transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
                >
                  Choose files
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D1D1D]">
                Recommendation Letter (optional)
              </label>
              <div className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#9CA3AF] transition-colors hover:border-[#4CC0D8]/30">
                <Upload className="h-4 w-4" />
                Choose file
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Agreement */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-[#1D1D1D]">Agreement</h3>
          <Card className="border-[#F59E0B]/20 bg-[#FFF8E8] shadow-none">
            <CardContent className="p-5">
              <p className="text-sm leading-relaxed text-[#666666]">
                I agree to follow the foundation&apos;s values and teaching
                guidelines. I understand that my role as a teacher comes with
                the responsibility to uphold integrity, respect, and commitment
                to student growth.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#4CC0D8] py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4CC0D8]/20 transition-colors hover:bg-[#3AB0C8]"
        >
          Submit Application
        </button>
        <p className="text-center text-xs text-[#9CA3AF]">
          Your application will be reviewed by the admin team.
        </p>
      </form>
    </div>
  )
}
