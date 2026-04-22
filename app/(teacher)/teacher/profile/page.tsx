"use client"

import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Pencil,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  BookOpen,
  Users,
  ClipboardList,
  Video,
  Award,
  Paperclip,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react"
import {
  useTeacherProfileQuery,
  useDeleteTeacherEducationMutation,
  useDeleteTeacherExperienceMutation,
  useDeleteTeacherCertificationMutation,
} from "@/hooks/api/use-teachers"
import { getApiErrorMessage } from "@/lib/api/client"
import {
  EditBasicInfoModal,
  EducationModal,
  ExperienceModal,
  CertificationModal,
  ContactDetailModal,
} from "@/components/teacher/profile-edit-modals"
import { TeacherEducation, TeacherExperience } from "@/lib/api/teachers"
import { toast } from "sonner"

import fallback from "@/assets/pngs/avatar-fallback.png"

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatYear(
  start: number,
  end: number | null,
  isCurrent?: boolean
): string {
  return `${start} – ${isCurrent || end === null ? "Present" : end}`
}

const CONTACT_ICON_MAP: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4 text-[#9CA3AF]" />,
  phone: <Phone className="h-4 w-4 text-[#9CA3AF]" />,
  address: <MapPin className="h-4 w-4 text-[#9CA3AF]" />,
  website: <Globe className="h-4 w-4 text-[#9CA3AF]" />,
  linkedin: <Linkedin className="h-4 w-4 text-[#9CA3AF]" />,
}

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
}

// ─── skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <Card className="border-gray-100 shadow-none">
      <CardContent className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
      </CardContent>
    </Card>
  )
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function TeacherProfilePage() {
  const profileQuery = useTeacherProfileQuery()
  const deleteEducation = useDeleteTeacherEducationMutation()
  const deleteExperience = useDeleteTeacherExperienceMutation()
  const deleteCertification = useDeleteTeacherCertificationMutation()

  const [basicInfoOpen, setBasicInfoOpen] = React.useState(false)
  const [eduModal, setEduModal] = React.useState<{
    open: boolean
    data?: TeacherEducation
  }>({ open: false })
  const [expModal, setExpModal] = React.useState<{
    open: boolean
    data?: TeacherExperience
  }>({ open: false })
  const [certModalOpen, setCertModalOpen] = React.useState(false)
  const [contactModalOpen, setContactModalOpen] = React.useState(false)

  const data = profileQuery.data
  const profile = data?.profile
  const avatar = profile?.profile_photo
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || ""
  const avatarUrl = avatar
    ? avatar.startsWith("http")
      ? avatar
      : mediaUrl + avatar
    : fallback
  const overview = data?.teaching_overview

  const teachingStats = overview
    ? [
        {
          label: "Courses Teaching",
          value: overview.courses_teaching,
          icon: BookOpen,
          color: "#4CC0D8",
        },
        {
          label: "Active Students",
          value: overview.active_students,
          icon: Users,
          color: "#F59E0B",
        },
        {
          label: "Assignments Created",
          value: overview.assignments_created,
          icon: ClipboardList,
          color: "#10B981",
        },
        {
          label: "Live Classes",
          value: overview.live_classes_conducted,
          icon: Video,
          color: "#8B5CF6",
        },
      ]
    : []

  const handleDeleteEducation = async (id: number) => {
   //  if (!confirm("Are you sure you want to delete this education record?")) return
    try {
      await deleteEducation.mutateAsync(id)
      toast.success("Education record deleted")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete education"))
    }
  }

  const handleDeleteExperience = async (id: number) => {
   //  if (!confirm("Are you sure you want to delete this experience record?")) return
    try {
      await deleteExperience.mutateAsync(id)
      toast.success("Experience record deleted")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete experience"))
    }
  }

  const handleDeleteCertification = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certification?")) return
    try {
      await deleteCertification.mutateAsync(id)
      toast.success("Certification deleted")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete certification"))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">My Profile</h2>
      </div>

      {/* Error */}
      {profileQuery.isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {getApiErrorMessage(profileQuery.error, "Failed to load profile.")}
        </div>
      )}

      {/* Loading skeleton */}
      {profileQuery.isLoading && (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}

      {/* Basic Info */}
      {!profileQuery.isLoading && profile && (
        <Card className="border-gray-100 shadow-none">
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#1D1D1D]">Basic Information</h3>
              <button
                onClick={() => setBasicInfoOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 text-[#666666] transition-colors hover:bg-gray-50 hover:text-[#4CC0D8]"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col items-start gap-6 sm:flex-row">
              {/* Avatar */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-gray-200">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={profile.display_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#9CA3AF]">
                    {profile.first_name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-[#9CA3AF]">Display Name</p>
                  <p className="text-sm font-medium text-[#1D1D1D]">
                    {profile.display_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF]">Username</p>
                  <p className="text-sm font-medium text-[#1D1D1D]">
                    {profile.username ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF]">Email</p>
                  <p className="text-sm font-medium text-[#1D1D1D]">
                    {profile.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF]">Phone Number</p>
                  <p className="text-sm font-medium text-[#1D1D1D]">
                    {profile.phone_number ?? "—"}
                  </p>
                </div>
                {profile.address && (
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Address</p>
                    <p className="text-sm font-medium text-[#1D1D1D]">
                      {profile.address}
                    </p>
                  </div>
                )}
                {profile.age !== null && (
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Age</p>
                    <p className="text-sm font-medium text-[#1D1D1D]">
                      {profile.age}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2 sm:col-span-2">
                  <Badge
                    className={
                      profile.is_teacher_active
                        ? "border-0 bg-emerald-50 text-emerald-700"
                        : "border-0 bg-gray-100 text-gray-600"
                    }
                  >
                    {profile.is_teacher_active ? "Active" : "Inactive"}
                  </Badge>
                  <Badge className="border-0 bg-[#F3F4F6] capitalize text-[#6B7280]">
                    {profile.approval_status}
                  </Badge>
                </div>
                {profile.bio && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-[#9CA3AF]">Bio</p>
                    <p className="text-sm text-[#666666]">{profile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {!profileQuery.isLoading && data && (
        <Card className="border-gray-100 shadow-none">
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#1D1D1D]">Education</h3>
              <button
                onClick={() => setEduModal({ open: true })}
                className="flex items-center gap-1 text-xs font-semibold text-[#4CC0D8] hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </button>
            </div>
            {data.educations.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No education records.</p>
            ) : (
              <div className="relative space-y-6 pl-6">
                <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-[#4CC0D8]/20" />
                {data.educations.map((item) => (
                  <div key={item.id} className="group relative">
                    <div className="absolute top-1 -left-6 h-3.5 w-3.5 rounded-full border-2 border-[#4CC0D8] bg-white" />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#1D1D1D]">
                          {item.degree}
                        </p>
                        <p className="text-xs text-[#666666]">{item.institution}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          {formatYear(item.start_year, item.end_year)}
                        </p>
                        {item.description && (
                          <p className="mt-1 text-xs text-[#9CA3AF]">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => setEduModal({ open: true, data: item })}
                          className="rounded p-1 text-[#666666] hover:bg-gray-100 hover:text-[#4CC0D8]"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(item.id)}
                          className="rounded p-1 text-[#666666] hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {!profileQuery.isLoading && data && (
        <Card className="border-gray-100 shadow-none">
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#1D1D1D]">Experience</h3>
              <button
                onClick={() => setExpModal({ open: true })}
                className="flex items-center gap-1 text-xs font-semibold text-[#4CC0D8] hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add Experience
              </button>
            </div>
            {data.experiences.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No experience records.</p>
            ) : (
              <div className="relative space-y-6 pl-6">
                <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-[#F59E0B]/20" />
                {data.experiences.map((item) => (
                  <div key={item.id} className="group relative">
                    <div className="absolute top-1 -left-6 h-3.5 w-3.5 rounded-full border-2 border-[#F59E0B] bg-white" />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#1D1D1D]">
                          {item.job_title}
                        </p>
                        <p className="text-xs text-[#666666]">{item.organization}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          {formatYear(item.start_year, item.end_year, item.is_current)}
                        </p>
                        {item.description && (
                          <p className="mt-1 text-xs text-[#9CA3AF]">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => setExpModal({ open: true, data: item })}
                          className="rounded p-1 text-[#666666] hover:bg-gray-100 hover:text-[#4CC0D8]"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(item.id)}
                          className="rounded p-1 text-[#666666] hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Teaching Overview */}
      {!profileQuery.isLoading && teachingStats.length > 0 && (
        <Card className="border-gray-100 shadow-none">
          <CardContent>
            <h3 className="mb-4 font-bold text-[#1D1D1D]">
              Teaching Overview
            </h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {teachingStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: stat.color + "15" }}
                  >
                    <stat.icon
                      className="h-5 w-5"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1D1D1D]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {!profileQuery.isLoading && data && (
        <Card className="border-gray-100 shadow-none">
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#1D1D1D]">Certifications</h3>
              <button
                onClick={() => setCertModalOpen(true)}
                className="flex items-center gap-1 text-xs font-semibold text-[#4CC0D8] hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add Certification
              </button>
            </div>
            {data.certifications.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No certifications.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="group relative">
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#D1E9F0] bg-[#EBF7F9] px-3 py-1.5 text-xs font-medium text-[#4CC0D8] transition-colors hover:bg-[#D7F1F7]"
                    >
                      <Paperclip className="h-3.5 w-3.5" />
                      {cert.title}
                      <span className="text-[#9CA3AF]">· {cert.issued_year}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                    <button
                      onClick={() => handleDeleteCertification(cert.id)}
                      className="absolute -top-2 -right-2 hidden h-5 w-5 items-center justify-center rounded-full bg-white text-red-500 shadow-sm border border-red-100 group-hover:flex hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Contact Details & Social Links */}
      {!profileQuery.isLoading && data && (
        <Card className="border-gray-100 shadow-none">
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#1D1D1D]">Contact Details</h3>
              <button
                onClick={() => setContactModalOpen(true)}
                className="flex items-center gap-1 text-xs font-semibold text-[#4CC0D8] hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add Contact
              </button>
            </div>

            {/* Primary contacts */}
            {data.contact_details.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {data.contact_details.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3">
                    {CONTACT_ICON_MAP[contact.contact_type] ?? (
                      <Award className="h-4 w-4 text-[#9CA3AF]" />
                    )}
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#9CA3AF]">
                        {contact.type_label}
                      </p>
                      <p className="truncate text-sm text-[#666666]">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#9CA3AF]">
                No contact details available.
              </p>
            )}

            {/* Fallback from profile fields */}
            {data.contact_details.length === 0 && profile && (
              <div className="grid gap-3 sm:grid-cols-2">
                {profile.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-sm text-[#666666]">
                      {profile.email}
                    </span>
                  </div>
                )}
                {profile.phone_number && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-sm text-[#666666]">
                      {profile.phone_number}
                    </span>
                  </div>
                )}
                {profile.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-sm text-[#666666]">
                      {profile.address}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Social Links */}
            {data.social_links.length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-4">
                <p className="mb-3 text-xs font-semibold text-[#9CA3AF]">
                  Social Links
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.social_links.map((link) => (
                    <a
                      key={link.platform}
                      href={link.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#666666] transition-colors hover:bg-[#EBF7F9] hover:text-[#4CC0D8]"
                    >
                      {SOCIAL_ICON_MAP[link.platform] ?? (
                        <Globe className="h-4 w-4" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {profile && (
        <EditBasicInfoModal
          open={basicInfoOpen}
          onOpenChange={setBasicInfoOpen}
          profile={profile}
        />
      )}

      <EducationModal
        open={eduModal.open}
        onOpenChange={(open) => setEduModal({ open, data: open ? eduModal.data : undefined })}
        education={eduModal.data}
      />

      <ExperienceModal
        open={expModal.open}
        onOpenChange={(open) => setExpModal({ open, data: open ? expModal.data : undefined })}
        experience={expModal.data}
      />

      <CertificationModal
        open={certModalOpen}
        onOpenChange={setCertModalOpen}
      />

      <ContactDetailModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </div>
  )
}
