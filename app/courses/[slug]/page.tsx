"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Star,
  Clock,
  Users,
  Globe,
  BarChart,
  ChevronDown,
  Check,
  Play,
  FileText,
  Lock,
  MessageCircle,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Heart,
  Grid,
  Video,
} from "lucide-react"
import { useEnrollStudentCourseMutation } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function CourseDetailsPage() {
  const params = useParams<{ slug: string }>()
  const pathname = usePathname()
  const router = useRouter()
  const accessToken = useAuthStore((state) => state.accessToken)
  const [activeTab, setActiveTab] = React.useState("Overview")
  const [openSection, setOpenSection] = React.useState("Getting Started")
  const enrollMutation = useEnrollStudentCourseMutation()

  const slugValue = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  const courseId = Number(slugValue)
  const isValidCourseId = Number.isInteger(courseId) && courseId > 0

  const handleEnrollNow = async () => {
    const query =
      typeof window !== "undefined" ? window.location.search || "" : ""
    const redirectTo = `${pathname}${query}`

    if (!accessToken) {
      router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`)
      return
    }

    if (!isValidCourseId) {
      toast.error("Invalid course id")
      return
    }

    try {
      const result = await enrollMutation.mutateAsync({ courseId })
      toast.success(result.message || "Course enrolled successfully")
      router.push(`/dashboard/enrolled-courses/${result.enrollment.course_id}`)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to enroll in course"))
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="pb-24">
        {/* Page Header */}
        <section className="bg-[#F1F7F9] py-16">
          <div className="mx-auto max-w-7xl space-y-4 px-4 text-center">
            <h1 className="text-4xl font-bold text-[#1D1D1D] md:text-5xl">
              Course Detail
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Link href="/" className="text-[#666666]">
                Home
              </Link>
              <span className="h-[2px] w-4 bg-[#FF9D00]" />
              <span className="text-[#1D1D1D]">Course Detail 2</span>
            </div>
          </div>
        </section>

        {/* Hero Info Bar */}
        <section className="border-b border-gray-100 bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-3xl shadow-2xl lg:w-[460px]">
                <Image
                  src="/assets/pngs/web course details Video.png"
                  alt="Course Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                    <Play className="h-8 w-8 fill-[#4CC0D8] text-[#4CC0D8]" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 rounded-lg bg-[#4CC0D8] px-3 py-1 text-[10px] font-bold text-white">
                  2.0
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl leading-tight font-extrabold text-[#1D1D1D] md:text-4xl">
                    Christian Faith 101
                  </h1>
                  <p className="text-sm text-[#666666]">
                    Learn the Foundations of Christianity in a Clear and
                    Practical Way
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF]">
                    <FileText className="h-4 w-4 text-[#FF9D00]" />
                    <span className="text-[#1D1D1D] uppercase">12+ Lesson</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF]">
                    <Clock className="h-4 w-4 text-[#FF9D00]" />
                    <span className="text-[#1D1D1D] uppercase">1hr 30min</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF]">
                    <Users className="h-4 w-4 text-[#FF9D00]" />
                    <span className="text-[#1D1D1D] uppercase">
                      32 students enrolled
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#FFD966] px-3 py-1 text-[10px] font-bold text-[#1D1D1D] uppercase">
                    Best Development
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 pt-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/pngs/Profile.png"
                      alt="Inst"
                      width={40}
                      height={40}
                      className="rounded-full shadow-sm"
                    />
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-[#1D1D1D]">
                        Nicole Brown
                      </p>
                      <p className="text-[10px] text-[#9CA3AF] uppercase">
                        Instructor
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFD966]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      4.0 (20+)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
              {/* Left Side */}
              <div className="space-y-16 lg:col-span-2">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#1D1D1D]">
                      Overview
                    </h3>
                    <div className="space-y-4">
                      <h4 className="font-bold text-[#1D1D1D]">
                        Course Description
                      </h4>
                      <p className="text-sm leading-relaxed text-[#666666]">
                        Christian Faith 101 is a foundational course designed to
                        introduce learners to the core beliefs, values, and
                        practices of Christianity. This course provides a clear
                        and engaging understanding of what faith is, the life
                        and teachings of Jesus Christ, the meaning of salvation,
                        and how faith shapes everyday life. Created for
                        beginners and young learners, the course combines
                        Bible-based teaching, simple explanations, interactive
                        lessons, and spiritual reflection. This course offers a
                        strong spiritual starting point.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h4 className="font-bold text-[#1D1D1D]">
                      What you'll learn
                    </h4>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[
                        "Understand the core beliefs of the Christian faith",
                        "Learn who Jesus Christ is and why He is central to Christianity",
                        "Understand the Bible and its purpose",
                        "Explain salvation, grace and faith in simple terms",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-[#666666]"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBF7F9]">
                            <Check className="h-3 w-3 text-[#4CC0D8]" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <h4 className="font-bold text-[#1D1D1D]">Requirements</h4>
                    <ul className="space-y-3">
                      {[
                        "You will need a copy of Adobe XD 2019 or above. A free trial can be downloaded from Adobe.",
                        "No previous design experience is required",
                        "No previous Adobe XD skills are needed",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-4 text-sm text-[#666666]"
                        >
                          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4CC0D8]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Curriculum */}
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#1D1D1D]">
                      Course Content
                    </h3>
                    <p className="text-xs font-bold tracking-widest text-[#666666] uppercase">
                      92 Lectures • 10:56:11
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Getting Started",
                      "The Staff",
                      "Warehouse Management",
                      "Topic color & icon introduction",
                    ].map((title, idx) => (
                      <div
                        key={idx}
                        className="overflow-hidden rounded-2xl border border-[#4CC0D8]/10 bg-[#f8fcfd]"
                      >
                        <button
                          onClick={() =>
                            setOpenSection(openSection === title ? "" : title)
                          }
                          className="flex w-full items-center justify-between p-6 transition-colors"
                        >
                          <span className="font-bold text-[#1D1D1D]">
                            {title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-[#1D1D1D] transition-transform",
                              openSection === title && "rotate-180"
                            )}
                          />
                        </button>
                        {openSection === title && (
                          <div className="bg-white p-0">
                            {[
                              {
                                title: "Lesson 1: Introduction to Christianity",
                                type: "video",
                                time: "05:14",
                                lock: false,
                                preview: "Preview",
                              },
                              {
                                title: "Lesson 2: What is Faith?",
                                type: "video",
                                time: "09:23",
                                lock: false,
                                preview: "Preview",
                              },
                              {
                                title: "Lesson 3: Jesus Christ",
                                type: "video",
                                time: "12:44",
                                lock: false,
                                preview: "Preview",
                              },
                              {
                                title: "Lesson 4: The Bible",
                                type: "video",
                                time: "07:33",
                                lock: true,
                                preview: "Preview",
                              },
                              {
                                title: "Lesson 5: Salvation & Grace",
                                type: "video",
                                time: "10:15",
                                lock: true,
                                preview: "Preview",
                              },
                            ].map((lesson, i) => (
                              <div
                                key={i}
                                className="group flex cursor-pointer items-center justify-between border-t border-gray-50 p-6 hover:bg-gray-50"
                              >
                                <div className="flex items-center gap-4">
                                  <Play
                                    className={cn(
                                      "h-4 w-4",
                                      lesson.lock
                                        ? "text-[#9CA3AF]"
                                        : "text-[#4CC0D8]"
                                    )}
                                  />
                                  <span className="text-sm font-medium text-[#1D1D1D] transition-colors group-hover:text-[#4CC0D8]">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-6">
                                  <span className="text-xs font-bold text-[#4CC0D8] underline">
                                    {lesson.preview}
                                  </span>
                                  <span className="text-xs text-[#9CA3AF]">
                                    {lesson.time}
                                  </span>
                                  {lesson.lock && (
                                    <Lock className="h-3.5 w-3.5 text-[#9CA3AF]" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructor */}
                <div className="space-y-10">
                  <h3 className="text-2xl font-bold text-[#1D1D1D]">
                    About the instructor
                  </h3>
                  <div className="flex flex-col items-start gap-8 md:flex-row">
                    <Image
                      src="/assets/pngs/Profile.png"
                      alt="Inst"
                      width={100}
                      height={100}
                      className="shrink-0 rounded-3xl"
                    />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-[#1D1D1D]">
                          Nicole Brown
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-current text-[#FF9D00]"
                            />
                          ))}
                          <span className="ml-1 text-xs font-bold text-[#1D1D1D]">
                            4.5
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-[#666666]">
                        Course Creator, Mentor & Spiritual Guide
                      </p>
                      <div className="flex flex-wrap gap-6 py-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                          <PlaySquare className="h-4 w-4 text-[#FF9D00]" />
                          <span>3 Courses</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                          <FileText className="h-4 w-4 text-[#FF9D00]" />
                          <span>12+ Lesson</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                          <Clock className="h-4 w-4 text-[#FF9D00]" />
                          <span>1hr 30min</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                          <Users className="h-4 w-4 text-[#FF9D00]" />
                          <span>230,830+ student enrolled</span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-[#666666]">
                        Expert Biblical Instructor & Spiritual Mentor with 7+
                        Years Experience Guidance of High Quality Work. <br />{" "}
                        <br />
                        Skills: Biblical Teaching & Interpretation, Christian
                        Theology Fundamentals, Faith-Based Mentorship, Spiritual
                        & Doctrinal Guidance, Prayer & Worship Leadership,
                        Church & Compassionate Communication, Home Learning
                        Achievement Seating, Leadership & Team Collaboration,
                        and much more.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post a comment */}
                <div className="space-y-10">
                  <h3 className="text-2xl font-bold text-[#1D1D1D]">
                    Post A comment
                  </h3>
                  <div className="mb-8 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 cursor-pointer text-gray-200 hover:text-[#FF9D00]"
                      />
                    ))}
                  </div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1D1D1D]">
                          Name
                        </label>
                        <input
                          type="text"
                          className="h-12 w-full rounded-xl border border-gray-100 bg-white px-5 focus:ring-1 focus:ring-[#4CC0D8]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1D1D1D]">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="h-12 w-full rounded-xl border border-gray-100 bg-white px-5 focus:ring-1 focus:ring-[#4CC0D8]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#1D1D1D]">
                        Comments
                      </label>
                      <textarea className="h-40 w-full resize-none rounded-xl border border-gray-100 bg-white px-5 py-4 focus:ring-1 focus:ring-[#4CC0D8]" />
                    </div>
                    <Button className="h-12 rounded-xl bg-[#4CC0D8] px-10 font-bold text-white hover:bg-[#3AB0C8]">
                      Submit
                    </Button>
                  </form>
                </div>
              </div>

              {/* Right Side Sidebar */}
              <div className="space-y-10">
                {/* Enrollment Card */}
                <div className="sticky top-24 overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl">
                  <div className="space-y-8 p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-extrabold text-[#4CC0D8]">
                          FREE
                        </p>
                        <p className="text-sm text-[#9CA3AF] line-through">
                          $20.00
                        </p>
                        <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">
                          70% off
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-100 text-sm font-bold text-[#1D1D1D] transition-all hover:bg-gray-50">
                        <Heart className="h-4 w-4" /> Add to wishlist
                      </button>
                      <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-100 text-sm font-bold text-[#1D1D1D] transition-all hover:bg-gray-50">
                        <Share2Icon className="h-4 w-4" /> Share
                      </button>
                    </div>

                    <Button
                      onClick={handleEnrollNow}
                      disabled={enrollMutation.isPending}
                      className="h-14 w-full rounded-xl bg-[#4CC0D8] text-lg font-extrabold text-white shadow-lg shadow-[#4CC0D8]/20 hover:bg-[#3AB0C8]"
                    >
                      {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                    </Button>

                    <div className="space-y-6">
                      <h5 className="font-bold text-[#1D1D1D]">Includes</h5>
                      <div className="space-y-4">
                        {[
                          {
                            label: "1 hours on-demand video",
                            icon: PlaySquare,
                          },
                          {
                            label: "All downloadable resources",
                            icon: FileText,
                          },
                          { label: "Full lifetime access", icon: Clock },
                          {
                            label: "Access on mobile and Desktop",
                            icon: MonitorIcon,
                          },
                          { label: "Assignments", icon: BookOpenIcon },
                          {
                            label: "Certificate of Completion",
                            icon: AwardIcon,
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 text-sm text-[#666666]"
                          >
                            <item.icon className="h-5 w-5 text-red-400" />
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 border-t border-gray-50 pt-6">
                      <h5 className="font-bold text-[#1D1D1D]">
                        Course Features
                      </h5>
                      <div className="space-y-4 text-sm font-medium">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Users className="h-4 w-4 text-[#4CC0D8]" />{" "}
                            Enrolled
                          </span>
                          <span className="text-[#1D1D1D]">32 students</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Clock className="h-4 w-4 text-[#4CC0D8]" />{" "}
                            Duration
                          </span>
                          <span className="text-[#1D1D1D]">20 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Grid className="h-4 w-4 text-[#4CC0D8]" /> Chapters
                          </span>
                          <span className="text-[#1D1D1D]">15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Video className="h-4 w-4 text-[#4CC0D8]" /> Video
                          </span>
                          <span className="text-[#1D1D1D]">12 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <BarChartIcon className="h-4 w-4 text-[#4CC0D8]" />{" "}
                            Level
                          </span>
                          <span className="text-[#1D1D1D]">Beginner</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Share2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  )
}

function MonitorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )
}

function AwardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

function PlaySquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m10 8 5 4-5 4V8z" />
    </svg>
  )
}

function BarChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}

function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
