"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const STUDENT = {
  firstName: "Emma",
  lastName: "Johnson",
  username: "emma.j2024",
  email: "emma.johnson@email.com",
  phone: "+1 (555) 123-4567",
  gender: "Female",
  dob: "2/3/2026",
  age: "0 years",
  about:
    "Passionate about science and mathematics. Love exploring new concepts and working on group projects. Aspiring to pursue",
  image: "/assets/pngs/For web/instructor-1.png",
}

const COURSE_PROGRESS = [
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "90%",
    quiz: "88%",
    liveClasses: "90%",
  },
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "56%",
    quiz: "88%",
    liveClasses: "56%",
  },
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "80%",
    quiz: "88%",
    liveClasses: "80%",
  },
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "45%",
    quiz: "88%",
    liveClasses: "45%",
  },
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "56%",
    quiz: "88%",
    liveClasses: "56%",
  },
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "80%",
    quiz: "88%",
    liveClasses: "80%",
  },
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "90%",
    quiz: "88%",
    liveClasses: "90%",
  },
  {
    name: "Healthy Lifestyle & Habits",
    classProgress: "45%",
    quiz: "88%",
    liveClasses: "45%",
  },
]

export default function StudentDetailPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">My Profile</h2>

      {/* Avatar */}
      <div className="relative inline-block">
        <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={STUDENT.image}
            alt={STUDENT.firstName}
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
                {STUDENT.firstName}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Last Name</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {STUDENT.lastName}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Username</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {STUDENT.username}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Email</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {STUDENT.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Phone Number</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {STUDENT.phone}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Gender</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {STUDENT.gender}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Date of Birth</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {STUDENT.dob}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Age</p>
              <p className="text-sm font-medium text-[#1D1D1D]">
                {STUDENT.age}
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
            {STUDENT.about}
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
              {COURSE_PROGRESS.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-[#666666]">{row.name}</td>
                  <td className="px-4 py-3 text-center text-[#666666]">
                    {row.classProgress}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-[#4CC0D8]">
                      {row.quiz}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-[#666666]">
                    {row.liveClasses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
