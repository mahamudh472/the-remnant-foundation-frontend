import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  ArrowRight,
  Play,
  Heart,
  Download,
} from "lucide-react"
import StatCard from "@/components/common/stat-card"

const STATS = [
  { label: "Enrolled Courses", value: "12" },
  { label: "Active Courses", value: "03" },
  { label: "Completed Courses", value: "10" },
  { label: "Quiz Progress", value: "80%" },
  { label: "Rating Progress", value: "4.9" },
]

const RECENT_COURSES = [
  {
    title: "Healthy Lifestyle & Habits",
    instructor: "Rafael Miller",
    category: "Finance & Life",
    rating: 4.8,
    reviews: 110,
    image: "/assets/pngs/After Log in , Before Enrolled/all course/1.png",
    featured: true,
  },
  {
    title: "Faith & Career Direction",
    instructor: "Nancy Duarte",
    category: "Faith & Purpose",
    rating: 4.8,
    reviews: 110,
    image: "/assets/pngs/After Log in , Before Enrolled/all course/2.png",
  },
  {
    title: "Preparing for Marriage",
    instructor: "James Kagan",
    category: "Relationships",
    rating: 4.8,
    reviews: 110,
    image: "/assets/pngs/After Log in , Before Enrolled/all course/3.png",
  },
]

const INVOICES = [
  { course: "Healthy Lifestyle & Habits", id: "#INV001", amount: "$200" },
  { course: "Faith & Career Direction", id: "#INV002", amount: "$310" },
  { course: "Preparing for Marriage", id: "#INV003", amount: "$270" },
  { course: "Healthy Lifestyle & Habits", id: "#INV004", amount: "$180" },
  { course: "Faith & Career Direction", id: "#INV005", amount: "$220" },
]

const QUIZZES = [
  {
    course: "Faith & Career Direction",
    correct: "15/22",
    date: "15 Jan 2025",
    score: 95,
  },
  {
    course: "Healthy Lifestyle & Habits",
    correct: "18/22",
    date: "04 Jan 2025",
    score: 95,
  },
  {
    course: "Faith & Career Direction",
    correct: "25/30",
    date: "26 Dec 2024",
    score: 80,
  },
  {
    course: "Healthy Lifestyle & Habits",
    correct: "15/20",
    date: "10 Dec 2024",
    score: 65,
  },
  {
    course: "Faith & Career Direction",
    correct: "12/20",
    date: "27 Nov 2024",
    score: 20,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Quiz Banner */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-[#1D1D1D]">
              Quiz : Build Responsive Real World
            </h3>
            <p className="mt-1 text-sm text-[#9CA3AF]">Answered : 15/22</p>
          </div>
          <Link
            href="#"
            className="rounded-lg bg-[#4CC0D8] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#3AB0C8]"
          >
            Continue Quiz
          </Link>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Recently Enrolled Courses */}
      <div>
        <h2 className="mb-5 text-lg font-bold text-[#1D1D1D]">
          Recently Enrolled Courses
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RECENT_COURSES.map((course) => (
            <Card
              key={course.title}
              className="group overflow-hidden border-gray-100 shadow-none transition-shadow hover:shadow-md"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
                {course.featured && (
                  <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F59E0B]">
                    <Star className="h-4 w-4 fill-white text-white" />
                  </div>
                )}
                <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white">
                  <Heart className="h-4 w-4 text-[#9CA3AF]" />
                </button>
                <button className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <Play className="ml-0.5 h-4 w-4 text-[#4CC0D8]" />
                </button>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src="/assets/pngs/Profile.png"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-xs text-[#666666]">
                      {course.instructor}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="border-0 bg-[#F8F9FC] text-[10px] font-medium text-[#666666]"
                  >
                    {course.category}
                  </Badge>
                </div>
                <h3 className="mb-2 text-sm font-bold text-[#1D1D1D]">
                  {course.title}
                </h3>
                <div className="mb-3 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-xs font-semibold text-[#1D1D1D]">
                    {course.rating}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">
                    ({course.reviews} Reviews)
                  </span>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 rounded-md bg-[#4CC0D8] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
                >
                  Start Now <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Invoices & Quizzes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Invoices */}
        <Card className="border-gray-100 shadow-none">
          <CardContent className="p-5">
            <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
              Recent Invoices
            </h3>
            <div className="space-y-4">
              {INVOICES.map((inv, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1D]">
                      {inv.course}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {inv.id} · Amount :{" "}
                      <span className="font-semibold text-[#4CC0D8]">
                        {inv.amount}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="border-0 bg-green-100 text-[10px] font-semibold text-green-700">
                      Paid
                    </Badge>
                    <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Quizzes */}
        <Card className="border-gray-100 shadow-none">
          <CardContent className="p-5">
            <h3 className="mb-4 text-base font-bold text-[#1D1D1D]">
              Latest Quizes
            </h3>
            <div className="space-y-4">
              {QUIZZES.map((quiz, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1D]">
                      {quiz.course}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      Correct Answer : {quiz.correct} · Date : {quiz.date}
                    </p>
                  </div>
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: `conic-gradient(${quiz.score >= 80 ? "#22C55E" : quiz.score >= 50 ? "#F59E0B" : "#EF4444"} ${quiz.score * 3.6}deg, #F3F4F6 0deg)`,
                    }}
                  >
                    <div className="absolute inset-1 flex items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1D1D1D]">
                      {quiz.score}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
