"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, LogOut, ChevronRight } from "lucide-react"
import {
  useStudentProfileQuery,
  useUpdateStudentProfileMutation,
} from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import fallback from "@/assets/pngs/avatar-fallback.png"
import { EditStudentProfileModal } from "@/components/student/profile-edit-modals"
import React from "react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { data, isLoading, isError, error } = useStudentProfileQuery()
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const avatarInputRef = React.useRef<HTMLInputElement>(null)
  const updateProfileMutation = useUpdateStudentProfileMutation()

  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || ""
  const avatarUrl = data?.avatar
    ? data.avatar.startsWith("http")
      ? data.avatar
      : mediaUrl + data.avatar
    : null

  async function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      await updateProfileMutation.mutateAsync({ avatar: file })
      toast.success("Profile picture updated successfully")
    } catch (mutationError) {
      toast.error(
        getApiErrorMessage(mutationError, "Failed to update profile picture")
      )
    } finally {
      event.target.value = ""
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-56 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-56 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-16 text-center text-red-500">
        {getApiErrorMessage(error, "Failed to load profile.")}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="py-16 text-center text-gray-500">
        No profile data found.
      </div>
    )
  }

  const basicInfo = [
    { label: "First Name", value: data.first_name || "-" },
    { label: "Last Name", value: data.last_name || "-" },
    { label: "Student ID", value: data.student_id || "-" },
    { label: "Grade Level", value: data.grade_level || "-" },
    { label: "Email", value: data.email || "-" },
    { label: "Phone Number", value: data.phone_number || "-" },
    { label: "Gender", value: data.gender || "-" },
    { label: "Date of Birth", value: formatDate(data.date_of_birth) },
    { label: "Age", value: data.age === null ? "-" : `${data.age} years` },
  ]

  return (
    <div className="space-y-8">
      {/* My Profile Header */}
      <Card className="border-gray-100 shadow-none">
        <CardContent>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1D1D1D]">My Profile</h2>
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>

          {/* Avatar */}
          <div className="relative mb-6 h-20 w-20">
            <Image
              src={avatarUrl || fallback}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-2 border-gray-100 object-cover"
            />
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              aria-label="Upload profile picture"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              aria-label="Upload profile picture"
              onClick={() => avatarInputRef.current?.click()}
              disabled={updateProfileMutation.isPending}
              className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#4CC0D8] text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </div>

          {/* Basic Information */}
          <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {basicInfo.map((field) => (
              <div key={field.label}>
                <p className="mb-1 text-xs text-[#9CA3AF]">{field.label}</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* About Student */}
      <Card className="border-gray-100 shadow-none">
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1D1D1D]">
              About Student
            </h3>
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-[#666666]">
            {data.bio || "No bio provided yet."}
          </p>
        </CardContent>
      </Card>

      {/* Course Progress Table */}
      <Card className="border-gray-100 p-0 shadow-none">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8F9FC] hover:bg-[#F8F9FC]">
                  <TableHead className="py-3 text-xs font-bold text-[#1D1D1D]">
                    Course Name
                  </TableHead>
                  <TableHead className="py-3 text-center text-xs font-bold text-[#1D1D1D]">
                    Class Progress
                  </TableHead>
                  <TableHead className="py-3 text-center text-xs font-bold text-[#1D1D1D]">
                    Quiz
                  </TableHead>
                  <TableHead className="py-3 text-center text-xs font-bold text-[#1D1D1D]">
                    Live Classes
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.performances.length === 0 ? (
                  <TableRow className="border-gray-50">
                    <TableCell
                      colSpan={4}
                      className="py-10 text-center text-sm text-[#9CA3AF]"
                    >
                      No performance records available.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.performances.map((course) => (
                    <TableRow key={course.course} className="border-gray-50">
                      <TableCell className="py-3 text-sm text-[#666666]">
                        {course.course_name}
                      </TableCell>
                      <TableCell className="py-3 text-center text-sm text-[#666666]">
                        {course.class_progress}%
                      </TableCell>
                      <TableCell className="py-3 text-center text-sm text-[#666666]">
                        {course.quiz_average}%
                      </TableCell>
                      <TableCell className="py-3 text-center text-sm text-[#666666]">
                        {course.live_class_attendance}%
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Account & Security */}
      <Card className="border-gray-100 shadow-none">
        <CardContent>
          <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
            Account & Security
          </h3>
          <Separator className="mb-4" />
          <button className="group flex w-full items-center justify-between rounded-xl p-3 transition-colors hover:bg-red-50">
            <div className="flex items-center gap-3">
              <LogOut className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">Logout</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#9CA3AF] transition-colors group-hover:text-red-500" />
          </button>
        </CardContent>
      </Card>
      {/* Modals */}
      {data && (
        <EditStudentProfileModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          profile={data}
        />
      )}
    </div>
  )
}

function formatDate(dateString: string | null) {
  if (!dateString) {
    return "-"
  }

  const parsedDate = new Date(dateString)

  if (Number.isNaN(parsedDate.getTime())) {
    return "-"
  }

  return parsedDate.toLocaleDateString("en-US")
}
