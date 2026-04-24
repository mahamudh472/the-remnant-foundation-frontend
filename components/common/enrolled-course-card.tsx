import React from "react"
import { Card, CardContent } from "../ui/card"
import { ArrowRight, Heart, Loader2, Play, Star } from "lucide-react"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"
import { toast } from "sonner"
import {
  useAddStudentWishlistMutation,
  useRemoveStudentWishlistMutation,
  useStudentWishlistQuery,
} from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"
import { cn } from "@/lib/utils"

import thumbnailFallback from "@/assets/pngs/thumbnail-fallback.png"
import avatarFallback from "@/assets/pngs/avatar-fallback.png"

export default function EnrolledCard({
  course,
  index,
}: {
  course: any
  index: number
}) {
  const { data: wishlist = [] } = useStudentWishlistQuery()
  const addWishlistMutation = useAddStudentWishlistMutation()
  const removeWishlistMutation = useRemoveStudentWishlistMutation()

  const courseId = Number(course.course_id)
  const isWishlisted = wishlist.some((item) => item.course_id === courseId)
  const isAddingThisCourse =
    addWishlistMutation.isPending && addWishlistMutation.variables === courseId
  const isRemovingThisCourse =
    removeWishlistMutation.isPending &&
    removeWishlistMutation.variables === courseId
  const isWishlistUpdating = isAddingThisCourse || isRemovingThisCourse

  const avatar = course.teacher_avatar || avatarFallback

  async function handleToggleWishlist(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()
    event.stopPropagation()

    if (!Number.isFinite(courseId)) {
      toast.error("Invalid course id")
      return
    }

    try {
      if (isWishlisted) {
        const response = await removeWishlistMutation.mutateAsync(courseId)
        toast.success(response.message || "Course removed from wishlist")
      } else {
        const response = await addWishlistMutation.mutateAsync(courseId)
        toast.success(response.message || "Course added to wishlist")
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update wishlist."))
    }
  }

  return (
    <Card
      key={course.course_id}
      className="group overflow-hidden border-gray-100 py-0 pb-4 shadow-none transition-shadow hover:shadow-md"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={course.course_thumbnail || thumbnailFallback}
          alt={course.course_title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10" />

        <button
          onClick={handleToggleWishlist}
          disabled={isWishlistUpdating}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlistUpdating ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#9CA3AF]" />
          ) : (
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted
                  ? "fill-[#EF4444] text-[#EF4444]"
                  : "text-[#9CA3AF]"
              )}
            />
          )}
        </button>
        <button className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          <Play className="ml-0.5 h-4 w-4 text-[#4CC0D8]" />
        </button>
      </div>
      <CardContent className="px-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 overflow-hidden rounded-full bg-gray-200">
              <Image
                src={avatar}
                alt={course.teacher_name}
                width={20}
                height={20}
                className="h-5 w-5 object-cover"
              />
            </div>
            <span className="text-xs text-[#666666]">
              {course.teacher_name}
            </span>
          </div>
          <Badge
            variant="secondary"
            className="border-0 bg-[#F8F9FC] text-[10px] font-medium text-[#666666]"
          >
            {course.category_name}
          </Badge>
        </div>
        <h3 className="mb-2 text-sm font-bold text-[#1D1D1D]">
          {course.course_title}
        </h3>

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="text-xs font-semibold text-[#1D1D1D]">
              {course.stars}
            </span>
            <span className="text-xs text-[#9CA3AF]">
              ({course.review_count ?? 0} Reviews)
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#4CC0D8] transition-all"
            style={{ width: `${course.class_progress}%` }}
          />
        </div>
        <Link href={`/dashboard/enrolled-courses/${course.course_id}`}>
          <Button className="w-full">
            Start Now <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
