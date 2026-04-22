"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  TeacherEducation,
  TeacherExperience,
  TeacherProfileData,
  TeacherProfileCertification,
  TeacherContactDetailPayload,
} from "@/lib/api/teachers"
import {
  useUpdateTeacherProfileMutation,
  useAddTeacherEducationMutation,
  useUpdateTeacherEducationMutation,
  useAddTeacherExperienceMutation,
  useUpdateTeacherExperienceMutation,
  useAddTeacherCertificationMutation,
  useAddTeacherContactDetailMutation,
} from "@/hooks/api/use-teachers"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api/client"
import ImageUploader from "@/components/image-upload"

// ─── Basic Info Modal ─────────────────────────────────────────────────────────

interface EditBasicInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: TeacherProfileData
}

export function EditBasicInfoModal({
  open,
  onOpenChange,
  profile,
}: EditBasicInfoModalProps) {
  const updateMutation = useUpdateTeacherProfileMutation()
  const [formData, setFormData] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    display_name: profile.display_name,
    bio: profile.bio || "",
    address: profile.address || "",
    phone_number: profile.phone_number || "",
    username: profile.username || "",
    date_of_birth: profile.date_of_birth || "",
    age: profile.age || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateMutation.mutateAsync(formData)
      toast.success("Profile updated successfully")
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update profile"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Basic Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1D]">First Name</label>
              <Input
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1D]">Last Name</label>
              <Input
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Display Name</label>
            <Input
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Username</label>
            <Input
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1D]">Phone Number</label>
              <Input
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1D]">Age</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Education Modal ──────────────────────────────────────────────────────────

interface EducationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  education?: TeacherEducation
}

export function EducationModal({
  open,
  onOpenChange,
  education,
}: EducationModalProps) {
  const addMutation = useAddTeacherEducationMutation()
  const updateMutation = useUpdateTeacherEducationMutation()
  const isEditing = !!education

  const [formData, setFormData] = useState({
    degree: education?.degree || "",
    institution: education?.institution || "",
    start_year: education?.start_year || new Date().getFullYear(),
    end_year: education?.end_year || null,
    description: education?.description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: education.id, payload: formData })
        toast.success("Education record updated")
      } else {
        await addMutation.mutateAsync(formData)
        toast.success("Education record added")
      }
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save education record"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Education" : "Add Education"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Degree</label>
            <Input
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g. B.Sc. in Computer Science"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Institution</label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="e.g. Stanford University"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1D]">Start Year</label>
              <Input
                type="number"
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1D]">End Year</label>
              <Input
                type="number"
                value={formData.end_year || ""}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value ? Number(e.target.value) : null })}
                placeholder="Leave blank for Present"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending}>
              {addMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Experience Modal ─────────────────────────────────────────────────────────

interface ExperienceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  experience?: TeacherExperience
}

export function ExperienceModal({
  open,
  onOpenChange,
  experience,
}: ExperienceModalProps) {
  const addMutation = useAddTeacherExperienceMutation()
  const updateMutation = useUpdateTeacherExperienceMutation()
  const isEditing = !!experience

  const [formData, setFormData] = useState({
    job_title: experience?.job_title || "",
    organization: experience?.organization || "",
    start_year: experience?.start_year || new Date().getFullYear(),
    end_year: experience?.end_year || null,
    is_current: experience?.is_current || false,
    description: experience?.description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: experience.id, payload: formData })
        toast.success("Experience record updated")
      } else {
        await addMutation.mutateAsync(formData)
        toast.success("Experience record added")
      }
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save experience record"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Experience" : "Add Experience"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Job Title</label>
            <Input
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              placeholder="e.g. Senior Instructor"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Organization</label>
            <Input
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="e.g. Remnant Foundation"
              required
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="is_current"
              checked={formData.is_current}
              onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_year: e.target.checked ? null : formData.end_year })}
              className="h-4 w-4 rounded border-gray-300 text-[#4CC0D8] focus:ring-[#4CC0D8]"
            />
            <label htmlFor="is_current" className="text-xs font-medium text-[#666666]">
              I am currently working in this role
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1D]">Start Year</label>
              <Input
                type="number"
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: Number(e.target.value) })}
                required
              />
            </div>
            {!formData.is_current && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1D1D1D]">End Year</label>
                <Input
                  type="number"
                  value={formData.end_year || ""}
                  onChange={(e) => setFormData({ ...formData, end_year: Number(e.target.value) })}
                  required
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending}>
              {addMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Certification Modal ──────────────────────────────────────────────────────

interface CertificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CertificationModal({ open, onOpenChange }: CertificationModalProps) {
  const addMutation = useAddTeacherCertificationMutation()
  const [formData, setFormData] = useState({
    title: "",
    issued_by: "",
    issued_year: new Date().getFullYear(),
    file: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.file) {
      toast.error("Please upload a certification file")
      return
    }

    try {
      await addMutation.mutateAsync({
        title: formData.title,
        issued_by: formData.issued_by,
        issued_year: formData.issued_year,
        file: formData.file,
      })
      toast.success("Certification added successfully")
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to upload certification"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-full">
        <DialogHeader>
          <DialogTitle>Add Certification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Certification Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Advanced Teaching Certificate"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Issued By</label>
            <Input
              value={formData.issued_by}
              onChange={(e) => setFormData({ ...formData, issued_by: e.target.value })}
              placeholder="e.g. University of Dhaka"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Issued Year</label>
            <Input
              type="number"
              value={formData.issued_year}
              onChange={(e) => setFormData({ ...formData, issued_year: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Certificate File</label>
            <ImageUploader
              onFileChange={(file) => setFormData({ ...formData, file })}
              maxSizeMB={5}
              ariaLabel="Upload certificate"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addMutation.isPending}>
              {addMutation.isPending ? "Uploading..." : "Save Certification"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Contact Detail Modal ─────────────────────────────────────────────────────

const CONTACT_TYPES = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "address", label: "Address" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
]

interface ContactDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactDetailModal({ open, onOpenChange }: ContactDetailModalProps) {
  const addMutation = useAddTeacherContactDetailMutation()
  const [formData, setFormData] = useState<TeacherContactDetailPayload>({
    contact_type: "linkedin",
    label: "LinkedIn",
    value: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addMutation.mutateAsync(formData)
      toast.success("Contact detail added")
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to add contact detail"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Contact Detail</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Contact Type</label>
            <select
              value={formData.contact_type}
              onChange={(e) => {
                const type = e.target.value
                const option = CONTACT_TYPES.find(o => o.value === type)
                setFormData({ ...formData, contact_type: type, label: option?.label || "" })
              }}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {CONTACT_TYPES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Label</label>
            <Input
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g. Professional Email"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1D1D1D]">Value</label>
            <Input
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="e.g. teacher@example.com or url"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addMutation.isPending}>
              {addMutation.isPending ? "Adding..." : "Add Contact"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
