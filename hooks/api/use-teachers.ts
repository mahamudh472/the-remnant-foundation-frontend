import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  getTeacherAssignments,
  getTeacherCourses,
  getTeacherDashboard,
  getTeacherDetails,
  getTeachers,
  type GetTeacherAssignmentsParams,
  type GetTeacherCoursesParams,
  type GetTeachersParams,
  type TeacherCoursesFilter,
} from "@/lib/api/teachers"
import { useAuthStore } from "@/lib/store/auth-store"

export type { TeacherCoursesFilter }

export const teachersKeys = {
  all: ["teachers"] as const,
  list: (params: GetTeachersParams) => ["teachers", "list", params] as const,
  detail: (teacherId: number | string) =>
    ["teachers", "detail", teacherId] as const,
  dashboard: (accessToken: string | null) =>
    ["teachers", "dashboard", accessToken] as const,
  courses: (params: GetTeacherCoursesParams, accessToken: string | null) =>
    ["teachers", "courses", accessToken, params] as const,
  assignments: (
    params: GetTeacherAssignmentsParams,
    accessToken: string | null
  ) => ["teachers", "assignments", accessToken, params] as const,
}

export function useTeachersQuery(params: GetTeachersParams = {}) {
  return useQuery({
    queryKey: teachersKeys.list(params),
    queryFn: () => getTeachers(params),
    placeholderData: keepPreviousData,
  })
}

export function useTeacherDetailsQuery(teacherId?: number) {
  return useQuery({
    queryKey: teachersKeys.detail(teacherId ?? "unknown"),
    queryFn: () => {
      if (!teacherId) {
        throw new Error("Missing teacher id")
      }

      return getTeacherDetails(teacherId)
    },
    enabled: Boolean(teacherId),
  })
}

export function useTeacherDashboardQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.dashboard(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherDashboard(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}

export function useTeacherCoursesQuery(params: GetTeacherCoursesParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.courses(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherCourses(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}

export function useTeacherCoursesCountByFilterQuery(
  filter: TeacherCoursesFilter
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.courses(
      { page: 1, page_size: 1, filter },
      accessToken
    ),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherCourses(accessToken, { page: 1, page_size: 1, filter })
    },
    enabled: Boolean(accessToken),
  })
}

export function useTeacherAssignmentsQuery(
  params: GetTeacherAssignmentsParams = {}
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.assignments(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherAssignments(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}
