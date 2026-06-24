"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useTeacherStudentDetailsQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import fallback from "@/assets/pngs/avatar-fallback.png"

export default function StudentDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const studentId = Number(slug)

  const { data, isLoading, isError, error } = useTeacherStudentDetailsQuery(
    Number.isFinite(studentId) ? studentId : undefined
  )

  const student = data?.student
  const coursePerformance = data?.course_performance || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
        <div className="h-24 w-24 animate-pulse rounded-full bg-gray-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-16 text-center text-red-500">
        {getApiErrorMessage(error, "Failed to load student details.")}
      </div>
    )
  }

  if (!student) {
    return (
      <div className="py-16 text-center text-gray-500">Student not found.</div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">Student Profile</h2>

      {/* Avatar */}
      <div className="relative inline-block">
        <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={student.avatar || fallback}
            alt={
              `${student.first_name} ${student.last_name}`.trim() || "Student"
            }
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute right-0 bottom-0">
          <CheckCircle2 className="h-6 w-6 fill-[#4CC0D8] text-white" />
        </div>
      </div>

      {/* Basic Information */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
            Basic Information
          </h3>
          <div className="grid gap-y-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-[#9CA3AF]">First Name</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {student.first_name || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Last Name</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {student.last_name || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Username</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {student.username || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Email</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {student.email || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Phone Number</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {student.phone_number || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Gender</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {student.gender || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Date of Birth</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {formatDate(student.date_of_birth)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Age</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {student.age === null ? "-" : `${student.age} years`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Student */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-3 text-base font-bold text-[#1D1D1D]">
            About Student
          </h3>
          <p className="text-sm leading-relaxed text-[#666666]">
            {student.about_student || "No about info provided."}
          </p>
        </CardContent>
      </Card>

      {/* Course Progress Table */}
      <Card className="overflow-hidden border-gray-100 p-0 shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 font-semibold text-[#1D1D1D]">
                  Course Name
                </th>
                <th className="px-4 py-3 text-center font-semibold text-[#1D1D1D]">
                  Class Progress
                </th>
                <th className="px-4 py-3 text-center font-semibold text-[#1D1D1D]">
                  Quiz
                </th>
                <th className="px-4 py-3 text-center font-semibold text-[#1D1D1D]">
                  Live Classes
                </th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-[#9CA3AF]"
                  >
                    No course performance data available.
                  </td>
                </tr>
              ) : (
                coursePerformance.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 text-[#666666]">
                      {row.course_name}
                    </td>
                    <td className="px-4 py-3 text-center text-[#666666]">
                      {row.class_progress}%
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-semibold text-[#4CC0D8]">
                        {row.quiz}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-[#666666]">
                      {row.live_classes}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
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
