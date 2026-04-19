import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  getStudentEnrolledCourses,
  getStudentDashboard,
  getStudentPastLiveClasses,
  getStudentProfile,
  getStudentUpcomingLiveClasses,
  getStudentWishlist,
  type GetStudentEnrolledCoursesParams,
  type GetStudentLiveClassesParams,
  type StudentEnrolledStatus,
  getTeacherStudentDetails,
  getTeacherStudents,
  type GetTeacherStudentsParams,
} from "@/lib/api/students"
import { useAuthStore } from "@/lib/store/auth-store"

export type { StudentEnrolledStatus }

export const studentsKeys = {
  all: ["students"] as const,
  list: (params: GetTeacherStudentsParams, accessToken: string | null) =>
    ["students", "list", accessToken, params] as const,
  detail: (studentId: number | string, accessToken: string | null) =>
    ["students", "detail", accessToken, studentId] as const,
  profile: (accessToken: string | null) =>
    ["students", "profile", accessToken] as const,
  dashboard: (accessToken: string | null) =>
    ["students", "dashboard", accessToken] as const,
  wishlist: (accessToken: string | null) =>
    ["students", "wishlist", accessToken] as const,
  enrolledCourses: (
    params: GetStudentEnrolledCoursesParams,
    accessToken: string | null
  ) => ["students", "enrolled-courses", accessToken, params] as const,
  upcomingLiveClasses: (
    params: GetStudentLiveClassesParams,
    accessToken: string | null
  ) => ["students", "live-classes", "upcoming", accessToken, params] as const,
  pastLiveClasses: (
    params: GetStudentLiveClassesParams,
    accessToken: string | null
  ) => ["students", "live-classes", "past", accessToken, params] as const,
}

export function useTeacherStudentsQuery(params: GetTeacherStudentsParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.list(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherStudents(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}

export function useTeacherStudentDetailsQuery(studentId?: number) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.detail(studentId ?? "unknown", accessToken),
    queryFn: () => {
      if (!studentId) {
        throw new Error("Missing student id")
      }

      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherStudentDetails(studentId, accessToken)
    },
    enabled: Boolean(accessToken && studentId),
  })
}

export function useStudentProfileQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.profile(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentProfile(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}

export function useStudentDashboardQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.dashboard(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentDashboard(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}

export function useStudentEnrolledCoursesQuery(
  params: GetStudentEnrolledCoursesParams = {}
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.enrolledCourses(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentEnrolledCourses(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}

export function useStudentWishlistQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.wishlist(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentWishlist(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}

export function useStudentUpcomingLiveClassesQuery(
  params: GetStudentLiveClassesParams = {}
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.upcomingLiveClasses(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentUpcomingLiveClasses(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}

export function useStudentPastLiveClassesQuery(
  params: GetStudentLiveClassesParams = {}
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.pastLiveClasses(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentPastLiveClasses(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}
