"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useResolvedParams } from "@/hooks/use-resolved-params"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Star,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import { useTeacherDetailsQuery } from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"
import fallback from "@/assets/pngs/avatar-fallback.png"
import { shimmerBlur } from "@/lib/image-shimmer"
import CourseCard from "@/components/common/course-card"

export default function InstructorDetailPage() {
  const params = useResolvedParams<{ slug: string }>()
  const slug = params?.slug
  const teacherId = Number(slug)
  const { data, isLoading, isError, error } = useTeacherDetailsQuery(
    Number.isFinite(teacherId) ? teacherId : undefined
  )

  const teacher = data?.teacher
  const educations = data?.educations || []
  const experiences = data?.experiences || []
  const certifications = data?.certifications || []
  const contacts = data?.contact_details || []
  const socialLinks = data?.social_links || []
  const topCourses = data?.top_courses || []

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
                <div className="space-y-8">
                  <div className="h-72 animate-pulse rounded-3xl bg-gray-100" />
                  <div className="h-40 animate-pulse rounded-3xl bg-gray-100" />
                  <div className="h-40 animate-pulse rounded-3xl bg-gray-100" />
                </div>
                <div className="space-y-8">
                  <div className="h-40 animate-pulse rounded-3xl bg-gray-100" />
                  <div className="h-56 animate-pulse rounded-3xl bg-gray-100" />
                </div>
              </div>
            ) : isError ? (
              <div className="py-24 text-center text-red-500">
                {getApiErrorMessage(error, "Failed to load teacher details.")}
              </div>
            ) : !teacher ? (
              <div className="py-24 text-center text-gray-500">
                Teacher not found.
              </div>
            ) : (
              <div className="flex flex-col gap-12 lg:flex-row">
                {/* Left Column: Profile & Details */}
                <div className="flex-1 space-y-12">
                  {/* Top Profile Card */}
                  <div className="flex flex-col items-start gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row">
                    <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl">
                      <Image
                        src={teacher.avatar || fallback}
                        alt={teacher.name}
                        fill
                        placeholder="blur"
                        blurDataURL={shimmerBlur(160, 160)}
                        className="object-cover"
                      />
                      <button className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-sm">
                        <Plus className="h-4 w-4 text-[#FF9D00]" />
                      </button>
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold text-[#1D1D1D]">
                            {teacher.name}
                          </h2>
                          <div className="flex gap-4">
                            {socialLinks.length === 0 ? (
                              <Linkedin className="h-4 w-4 text-[#666666]" />
                            ) : (
                              socialLinks.slice(0, 4).map((link) => (
                                <Link
                                  key={`${link.platform}-${link.value}`}
                                  href={link.value}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#666666] hover:text-[#4CC0D8]"
                                  aria-label={link.label || link.platform}
                                >
                                  {renderSocialIcon(link.platform)}
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-medium text-[#666666]">
                            {teacher.profession || "Instructor"}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-current text-[#FF9D00]" />
                            <span className="text-xs font-bold text-[#1D1D1D]">
                              {teacher.avg_rating} ({teacher.total_reviews}{" "}
                              Reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-[#666666]">
                        {teacher.bio || "No bio added yet."}
                      </p>
                      <div className="flex gap-12">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#1D1D1D]">
                            {teacher.total_lessons}+ Lesson
                          </p>
                          <p className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase">
                            Lessons
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#1D1D1D]">
                            {teacher.total_students} Students
                          </p>
                          <p className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase">
                            Students
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About Me */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#1D1D1D]">
                      About Me
                    </h3>
                    <p className="text-sm leading-relaxed text-[#666666]">
                      {teacher.bio || "No biography available yet."}
                    </p>
                  </div>

                  {/* Education */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-[#1D1D1D]">
                      Education
                    </h3>
                    {educations.length === 0 ? (
                      <p className="text-sm text-[#666666]">
                        No education records available.
                      </p>
                    ) : (
                      <div className="relative space-y-10 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-[2px] before:bg-gray-100">
                        {educations.map((item, idx) => (
                          <div key={idx} className="relative space-y-2 pl-10">
                            <div className="absolute top-1 left-0 z-10 h-4 w-4 rounded-full border-2 border-[#4CC0D8] bg-white" />
                            <h4 className="font-bold text-[#1D1D1D]">
                              {item.degree}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-[#666666]">
                              <span>{item.institution}</span>
                              <span className="h-[1px] w-4 bg-gray-300" />
                              <span>
                                ({item.start_year} -{" "}
                                {item.end_year ?? "Present"})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-[#1D1D1D]">
                      Experience
                    </h3>
                    {experiences.length === 0 ? (
                      <p className="text-sm text-[#666666]">
                        No experience records available.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {experiences.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-4 rounded-2xl border border-gray-100 p-5"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                              <MapPin className="h-5 w-5 text-[#9CA3AF]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-bold text-[#1D1D1D]">
                                {item.job_title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                <span>{item.organization}</span>
                                <span>
                                  ({item.start_year} -{" "}
                                  {item.is_current
                                    ? "Present"
                                    : (item.end_year ?? "Present")}
                                  )
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Courses */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#1D1D1D]">
                        Courses
                      </h3>
                      <div className="flex gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-[#666666] transition-all hover:bg-[#FF9D00] hover:text-white">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-[#666666] transition-all hover:bg-[#FF9D00] hover:text-white">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {topCourses.map((course, idx) => (
                        <CourseCard key={idx} {...course} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="w-full space-y-8 lg:w-80">
                  {/* Certifications Card */}
                  <div className="space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-[#1D1D1D]">
                      Certifications
                    </h3>
                    {certifications.length === 0 ? (
                      <p className="text-sm text-[#666666]">
                        No certifications added.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {certifications.slice(0, 8).map((certification) => (
                          <div key={certification.id}>
                            <h1>{certification.title}</h1>
                            <h1>{certification.issued_by}</h1>
                            <h1>{certification.issued_year}</h1>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contact Details Card */}
                  <div className="space-y-8 rounded-3xl border border-gray-100 bg-[#fcfdfe] p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-[#1D1D1D]">
                      Contact Details
                    </h3>
                    {contacts.length === 0 ? (
                      <p className="text-sm text-[#666666]">
                        No contact details added.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {contacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="group flex cursor-pointer gap-4"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-[#4CC0D8] transition-all group-hover:bg-[#4CC0D8] group-hover:text-white">
                              {renderContactIcon(contact.contact_type)}
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-[#1D1D1D]">
                                {contact.label || contact.type_label}
                              </p>
                              <p className="text-xs break-all text-[#666666]">
                                {contact.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function renderContactIcon(type: string) {
  const normalizedType = type.toLowerCase()

  if (normalizedType.includes("email")) {
    return <Mail className="h-5 w-5" />
  }

  if (normalizedType.includes("phone")) {
    return <Phone className="h-5 w-5" />
  }

  return <MapPin className="h-5 w-5" />
}

function renderSocialIcon(platform: string) {
  const normalizedPlatform = platform.toLowerCase()

  if (normalizedPlatform.includes("facebook")) {
    return <Facebook className="h-4 w-4" />
  }

  if (
    normalizedPlatform.includes("twitter") ||
    normalizedPlatform.includes("x")
  ) {
    return <Twitter className="h-4 w-4" />
  }

  if (normalizedPlatform.includes("youtube")) {
    return <Youtube className="h-4 w-4" />
  }

  return <Linkedin className="h-4 w-4" />
}
