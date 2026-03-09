"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"
import { useAuthStore } from "@/lib/store/auth-store"

export function ProfileBanner() {
  const { user, switchRole } = useAuthStore()
  const router = useRouter()

  const handleSwitch = () => {
    switchRole()
    router.push("/teacher")
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFF5E0] via-[#E8F8FB] to-[#E0F4FF] p-6 sm:p-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
        <div className="relative">
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg sm:h-24 sm:w-24">
            <Image
              src={user?.avatar ?? "/assets/pngs/Profile.png"}
              alt="Profile"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute right-1 bottom-1 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
        </div>
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#1D1D1D]">
              {user?.name ?? "User"}
            </h2>
            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-[#9CA3AF] transition-colors hover:text-[#4CC0D8]">
              <Pencil className="h-3 w-3" />
            </button>
          </div>
          <p className="text-sm text-[#666666] capitalize">
            {user?.role ?? "Student"}
          </p>
        </div>
        <div className="sm:ml-auto">
          <button
            onClick={handleSwitch}
            className="rounded-lg bg-[#F59E0B] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#D97706]"
          >
            Switch to Teacher
          </button>
        </div>
      </div>
    </div>
  )
}
