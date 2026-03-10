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

const BASIC_INFO = [
  { label: "First Name", value: "Emma" },
  { label: "Last Name", value: "Johnson" },
  { label: "Student ID", value: "223455" },
  { label: "Email", value: "emma.johnson@email.com" },
  { label: "Phone Number", value: "+1 (555) 123-4567" },
  { label: "Gender", value: "Female" },
  { label: "Date of Birth", value: "2/3/2026" },
  { label: "Age", value: "0 years" },
]

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
    classProgress: "50%",
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

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* My Profile Header */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1D1D1D]">My Profile</h2>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
              <Pencil className="h-4 w-4" />
            </button>
          </div>

          {/* Avatar */}
          <div className="relative mb-6 h-20 w-20">
            <Image
              src="/assets/pngs/Profile.png"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-2 border-gray-100 object-cover"
            />
            <button className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#4CC0D8] text-white">
              <Pencil className="h-3 w-3" />
            </button>
          </div>

          {/* Basic Information */}
          <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {BASIC_INFO.map((field) => (
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
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1D1D1D]">
              About Student
            </h3>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-[#666666]">
            Passionate about science and mathematics. Love exploring new
            concepts and working on group projects. Aspiring to pursue
          </p>
        </CardContent>
      </Card>

      {/* Course Progress Table */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <div className="overflow-hidden rounded-xl border border-gray-100">
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
                {COURSE_PROGRESS.map((course, i) => (
                  <TableRow key={i} className="border-gray-50">
                    <TableCell className="py-3 text-sm text-[#666666]">
                      {course.name}
                    </TableCell>
                    <TableCell className="py-3 text-center text-sm text-[#666666]">
                      {course.classProgress}
                    </TableCell>
                    <TableCell className="py-3 text-center text-sm text-[#666666]">
                      {course.quiz}
                    </TableCell>
                    <TableCell className="py-3 text-center text-sm text-[#666666]">
                      {course.liveClasses}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Account & Security */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
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
    </div>
  )
}
