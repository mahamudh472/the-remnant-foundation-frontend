"use client"

import React from "react"
import Image from "next/image"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Star,
  Clock,
  Users,
  BarChart,
  ChevronDown,
  Check,
  Play,
  FileText,
  Grid,
  Video,
  PlaySquare,
  Monitor,
  BookOpen,
  Award,
  Share2,
} from "lucide-react"
import { useEnrollStudentCourseMutation } from "@/hooks/api/use-students"
import { useCourseDetailsQuery } from "@/hooks/api/use-courses"
import { getApiErrorMessage } from "@/lib/api/client"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"

import fallback from "@/assets/pngs/thumbnail-fallback.png"
import avatarFallback from "@/assets/pngs/avatar-fallback.png"
import { shimmerBlur } from "@/lib/image-shimmer"
import RichTextContent from "@/components/common/rich-text-content"

export default function CourseDetailsPage() {
  const params = useParams<{ slug: string }>()
  const pathname = usePathname()
  const router = useRouter()
  const accessToken = useAuthStore((state) => state.accessToken)
  const [openSections, setOpenSections] = React.useState<number[]>([])

  const enrollMutation = useEnrollStudentCourseMutation()

  const slugValue = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  const courseId = Number(slugValue)
  const isValidCourseId = Number.isInteger(courseId) && courseId > 0

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useCourseDetailsQuery(courseId, isValidCourseId)

  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4CC0D8] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-red-600">
            <p className="font-bold">Error Loading Course</p>
            <p className="text-sm">
              {getApiErrorMessage(error, "Unable to fetch course details.")}
            </p>
            <Button className="mt-4" onClick={() => router.push("/courses")}>
              Back to Courses
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const courseIncludes = [
    {
      label: "Hours on-demand video",
      value: `${course.stats.duration_hours} hours`,
      icon: PlaySquare,
    },
    { label: "Downloadable resources", value: "All", icon: FileText },
    { label: "Lifetime access", value: "Full", icon: Clock },
    { label: "Mobile and Desktop access", value: "Available", icon: Monitor },
    { label: "Certificate", value: "Completion", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="pb-24">
        {/* Hero Info Bar */}
        <section className="border-b border-gray-100 bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <Card className="relative aspect-video w-full shrink-0 overflow-hidden lg:w-[460px]">
                <Image
                  src={course.images.cover || fallback}
                  alt={course.title}
                  fill
                  placeholder="blur"
                  blurDataURL={shimmerBlur(920, 518)}
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 rounded-lg bg-[#4CC0D8] px-3 py-1 text-[10px] font-bold text-white">
                  {course.level}
                </div>
              </Card>

              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl leading-tight font-extrabold text-[#1D1D1D] md:text-4xl">
                    {course.title}
                  </h1>
                  <RichTextContent
                    value={course?.description}
                    emptyText="No description available"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF]">
                    <FileText className="h-4 w-4 text-[#FF9D00]" />
                    <span className="text-[#1D1D1D] uppercase">
                      {course.stats.lessons_count}+ Lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF]">
                    <Clock className="h-4 w-4 text-[#FF9D00]" />
                    <span className="text-[#1D1D1D] uppercase">
                      {course.stats.duration_hours} hours
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF]">
                    <Users className="h-4 w-4 text-[#FF9D00]" />
                    <span className="text-[#1D1D1D] uppercase">
                      {course.stats.students_count} students enrolled
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#FFD966] px-3 py-1 text-[10px] font-bold text-[#1D1D1D] uppercase">
                    {course.category}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full shadow-sm">
                      <Image
                        src={course.teacher.avatar || avatarFallback}
                        alt={course.teacher.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-[#1D1D1D]">
                        {course.teacher.name}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF] uppercase">
                        Instructor
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFD966]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < Math.floor(course.stats.rating)
                              ? "fill-current"
                              : "text-gray-200"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {course.stats.rating.toFixed(1)} (
                      {course.stats.review_count}+)
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
                      <RichTextContent
                        value={course?.overview}
                        emptyText="No description available"
                      />
                    </div>
                  </div>

                  {/* Course Features / What you'll learn */}
                  <div className="space-y-8">
                    <h4 className="font-bold text-[#1D1D1D]">
                      Course Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {course.course_features.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-[#666666]"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBF7F9]">
                            <Check className="h-3 w-3 text-[#4CC0D8]" />
                          </div>
                          <span className="font-semibold">{item.label}:</span>
                          {item.value}
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
                      {course.course_content.total_lectures} Lectures •{" "}
                      {course.course_content.total_sections} Sections
                    </p>
                  </div>

                  <div className="space-y-4">
                    {course.course_content.sections.map((section) => (
                      <Card
                        key={section.id}
                        className="overflow-hidden bg-[#f8fcfd] p-0"
                      >
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="flex w-full items-center justify-between p-6 transition-colors"
                        >
                          <span className="font-bold text-[#1D1D1D]">
                            {section.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-[#1D1D1D] transition-transform",
                              openSections.includes(section.id) && "rotate-180"
                            )}
                          />
                        </button>
                        {openSections.includes(section.id) && (
                          <div className="border-t border-gray-100 bg-white p-0">
                            {section.lessons.map((lesson, i) => (
                              <div
                                key={lesson.id}
                                className="group flex cursor-pointer items-center justify-between border-b border-gray-50 p-6 last:border-b-0 hover:bg-gray-50"
                              >
                                <div className="flex items-center gap-4">
                                  <Play className="h-4 w-4 text-[#4CC0D8]" />
                                  <span className="text-sm font-medium text-[#1D1D1D] transition-colors group-hover:text-[#4CC0D8]">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-6">
                                  <span className="text-xs font-bold text-[#4CC0D8]">
                                    Lesson {i + 1}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Instructor */}
                <div className="space-y-10">
                  <h3 className="text-2xl font-bold text-[#1D1D1D]">
                    About the instructor
                  </h3>
                  <div className="flex flex-col items-start gap-8 md:flex-row">
                    <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-3xl">
                      <Image
                        src={course.teacher.avatar || avatarFallback}
                        alt={course.teacher.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-[#1D1D1D]">
                          {course.teacher.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3 w-3 fill-current",
                                i <
                                  Math.floor(
                                    course.about_instructor.stats.rating
                                  )
                                  ? "text-[#FF9D00]"
                                  : "text-gray-200"
                              )}
                            />
                          ))}
                          <span className="ml-1 text-xs font-bold text-[#1D1D1D]">
                            {course.about_instructor.stats.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-[#666666]">
                        {course.teacher.headline || "Course Creator"}
                      </p>
                      <div className="flex flex-wrap gap-6 py-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                          <PlaySquare className="h-4 w-4 text-[#FF9D00]" />
                          <span>
                            {course.about_instructor.stats.courses} Courses
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                          <FileText className="h-4 w-4 text-[#FF9D00]" />
                          <span>
                            {course.about_instructor.stats.lessons} Lessons
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1D]">
                          <Users className="h-4 w-4 text-[#FF9D00]" />
                          <span>
                            {course.about_instructor.stats.students} Students
                          </span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-[#666666]">
                        {course.about_instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post a comment */}
                {/* <div className="space-y-10">
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
                        <Input
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
                </div> */}
              </div>

              {/* Right Side Sidebar */}
              <div className="space-y-10">
                {/* Enrollment Card */}
                <Card>
                  <CardContent className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-extrabold text-[#4CC0D8]">
                          {course.pricing.is_free
                            ? "FREE"
                            : `${course.pricing.currency || "$"}${course.pricing.current_price}`}
                        </p>
                        {course.pricing.original_price && (
                          <>
                            <p className="text-sm text-[#9CA3AF] line-through">
                              ${course.pricing.original_price}
                            </p>
                            <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">
                              {course.pricing.discount_percent}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleEnrollNow}
                      disabled={enrollMutation.isPending}
                      className="h-14 w-full"
                    >
                      {enrollMutation.isPending
                        ? "Enrolling..."
                        : course.pricing.cta_label || "Enroll Now"}
                    </Button>

                    <div className="space-y-6">
                      <h5 className="font-bold text-[#1D1D1D]">Includes</h5>
                      <div className="space-y-4">
                        {courseIncludes.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 text-sm text-[#666666]"
                          >
                            <item.icon className="h-5 w-5 text-[#4CC0D8]" />
                            <div>
                              <span className="mr-1 font-bold text-[#1D1D1D]">
                                {item.value}
                              </span>
                              <span>{item.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 border-t border-gray-50 pt-6">
                      <h5 className="font-bold text-[#1D1D1D]">
                        Course Details
                      </h5>
                      <div className="space-y-4 text-sm font-medium">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Users className="h-4 w-4 text-[#4CC0D8]" />{" "}
                            Enrolled
                          </span>
                          <span className="text-[#1D1D1D]">
                            {course.stats.students_count} students
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Clock className="h-4 w-4 text-[#4CC0D8]" />{" "}
                            Duration
                          </span>
                          <span className="text-[#1D1D1D]">
                            {course.stats.duration_hours} hours
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Grid className="h-4 w-4 text-[#4CC0D8]" /> Modules
                          </span>
                          <span className="text-[#1D1D1D]">
                            {course.stats.modules_count}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <Video className="h-4 w-4 text-[#4CC0D8]" /> Lessons
                          </span>
                          <span className="text-[#1D1D1D]">
                            {course.stats.lessons_count}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3 text-[#666666]">
                            <BarChart className="h-4 w-4 text-[#4CC0D8]" />{" "}
                            Level
                          </span>
                          <span className="text-[#1D1D1D] capitalize">
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
