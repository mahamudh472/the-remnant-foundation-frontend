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
  BookOpen,
  Users,
  Star,
  Award,
  Plus,
  Save,
  X,
} from "lucide-react"

const EDUCATION = [
  {
    degree: "M.Div, Theology",
    school: "Grace Theological Seminary",
    year: "2015 – 2018",
  },
  {
    degree: "B.A. Religious Studies",
    school: "Covenant University",
    year: "2011 – 2015",
  },
]

const EXPERIENCE = [
  {
    role: "Lead Instructor",
    org: "Remnant Foundation",
    year: "2020 – Present",
  },
  {
    role: "Teaching Assistant",
    org: "Grace Theological Seminary",
    year: "2017 – 2020",
  },
]

const TEACHING_STATS = [
  { label: "Total Courses", value: 12, icon: BookOpen, color: "#4CC0D8" },
  { label: "Total Students", value: 241, icon: Users, color: "#F59E0B" },
  { label: "Average Rating", value: "4.7", icon: Star, color: "#10B981" },
  { label: "Certifications", value: 5, icon: Award, color: "#8B5CF6" },
]

const CERTIFICATIONS = [
  "Certified Biblical Educator (CBE)",
  "Advanced Theological Teaching Certificate",
  "Child & Youth Ministry Specialist",
]

export default function TeacherProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false)

  if (isEditing) {
    return <EditMode onCancel={() => setIsEditing(false)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">My Profile</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* Basic Info */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Basic Information</h3>
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/assets/pngs/Profile.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-[#9CA3AF]">Full Name</p>
                <p className="text-sm font-medium text-[#1D1D1D]">MosabbiR</p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF]">Phone Number</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  +1 800 555 0199
                </p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF]">Email</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  mosabbir@remnant.org
                </p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF]">Title / Position</p>
                <p className="text-sm font-medium text-[#1D1D1D]">
                  Lead Instructor
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-[#9CA3AF]">Bio</p>
                <p className="text-sm text-[#666666]">
                  Passionate theology teacher with 5+ years of experience in
                  faith-based education. Dedicated to helping students grow in
                  their understanding of scripture and its application in modern
                  life.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education Timeline */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Education</h3>
          <div className="relative space-y-6 pl-6">
            <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-[#4CC0D8]/20" />
            {EDUCATION.map((item) => (
              <div key={item.degree} className="relative">
                <div className="absolute top-1 -left-6 h-3.5 w-3.5 rounded-full border-2 border-[#4CC0D8] bg-white" />
                <p className="text-sm font-semibold text-[#1D1D1D]">
                  {item.degree}
                </p>
                <p className="text-xs text-[#666666]">{item.school}</p>
                <p className="text-xs text-[#9CA3AF]">{item.year}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Timeline */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Experience</h3>
          <div className="relative space-y-6 pl-6">
            <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-[#F59E0B]/20" />
            {EXPERIENCE.map((item) => (
              <div key={item.role} className="relative">
                <div className="absolute top-1 -left-6 h-3.5 w-3.5 rounded-full border-2 border-[#F59E0B] bg-white" />
                <p className="text-sm font-semibold text-[#1D1D1D]">
                  {item.role}
                </p>
                <p className="text-xs text-[#666666]">{item.org}</p>
                <p className="text-xs text-[#9CA3AF]">{item.year}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teaching Overview */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Teaching Overview</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {TEACHING_STATS.map((stat) => (
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

      {/* Certifications */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((cert) => (
              <Badge
                key={cert}
                variant="secondary"
                className="bg-[#EBF7F9] px-3 py-1 text-xs font-medium text-[#4CC0D8]"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Details */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Contact Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#666666]">
                123 Faith Avenue, Springfield, IL
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#666666]">+1 800 555 0199</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#666666]">
                mosabbir@remnant.org
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#666666]">
                www.remnantfoundation.org
              </span>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="mb-3 text-xs font-semibold text-[#9CA3AF]">
              Social Links
            </p>
            <div className="flex gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#666666] transition-colors hover:bg-[#EBF7F9] hover:text-[#4CC0D8]">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#666666] transition-colors hover:bg-[#EBF7F9] hover:text-[#4CC0D8]">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#666666] transition-colors hover:bg-[#EBF7F9] hover:text-[#4CC0D8]">
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Edit Mode                                                          */
/* ------------------------------------------------------------------ */

function EditMode({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1D1D1D]">Edit Profile</h2>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg bg-[#4CC0D8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Basic Info Edit */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Basic Information</h3>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/assets/pngs/Profile.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <button className="rounded-lg border border-[#4CC0D8] px-4 py-2 text-sm font-semibold text-[#4CC0D8] transition-colors hover:bg-[#EBF7F9]">
              Change Photo
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="MosabbiR"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Phone Number
              </label>
              <input
                type="text"
                defaultValue="+1 800 555 0199"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Email
              </label>
              <input
                type="email"
                defaultValue="mosabbir@remnant.org"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Title / Position
              </label>
              <input
                type="text"
                defaultValue="Lead Instructor"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Bio
              </label>
              <textarea
                defaultValue="Passionate theology teacher with 5+ years of experience in faith-based education."
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education Edit */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-[#1D1D1D]">Education</h3>
            <button className="flex items-center gap-1 text-sm font-semibold text-[#4CC0D8] hover:underline">
              <Plus className="h-4 w-4" />
              Add Education
            </button>
          </div>
          <div className="space-y-4">
            {EDUCATION.map((item) => (
              <div
                key={item.degree}
                className="grid gap-4 rounded-xl border border-gray-100 p-4 sm:grid-cols-3"
              >
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Degree
                  </label>
                  <input
                    type="text"
                    defaultValue={item.degree}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    School
                  </label>
                  <input
                    type="text"
                    defaultValue={item.school}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Year
                  </label>
                  <input
                    type="text"
                    defaultValue={item.year}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Edit */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-[#1D1D1D]">Experience</h3>
            <button className="flex items-center gap-1 text-sm font-semibold text-[#4CC0D8] hover:underline">
              <Plus className="h-4 w-4" />
              Add Experience
            </button>
          </div>
          <div className="space-y-4">
            {EXPERIENCE.map((item) => (
              <div
                key={item.role}
                className="grid gap-4 rounded-xl border border-gray-100 p-4 sm:grid-cols-3"
              >
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue={item.role}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Organization
                  </label>
                  <input
                    type="text"
                    defaultValue={item.org}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#666666]">
                    Year
                  </label>
                  <input
                    type="text"
                    defaultValue={item.year}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications Edit */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-[#1D1D1D]">Certifications</h3>
            <button className="flex items-center gap-1 text-sm font-semibold text-[#4CC0D8] hover:underline">
              <Plus className="h-4 w-4" />
              Add Certificate
            </button>
          </div>
          <div className="space-y-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
              >
                <input
                  type="text"
                  defaultValue={cert}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
                />
                <button className="text-red-400 hover:text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Edit */}
      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 font-bold text-[#1D1D1D]">Contact Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Address
              </label>
              <input
                type="text"
                defaultValue="123 Faith Avenue, Springfield, IL"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Website
              </label>
              <input
                type="url"
                defaultValue="www.remnantfoundation.org"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Facebook
              </label>
              <input
                type="url"
                placeholder="https://facebook.com/..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Twitter
              </label>
              <input
                type="url"
                placeholder="https://twitter.com/..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                LinkedIn
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
