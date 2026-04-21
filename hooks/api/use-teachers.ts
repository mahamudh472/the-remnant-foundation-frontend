import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import {
  deleteTeacherCourse,
  getTeacherAssignments,
  getTeacherCourses,
  getTeacherDashboard,
  getTeacherDetails,
  getTeacherFollowUpDetails,
  getTeacherFollowUps,
  getTeacherLiveClasses,
  getTeachers,
  getTeacherQuizzes,
  getTeacherProfile,
  type GetTeacherAssignmentsParams,
  type GetTeacherCoursesParams,
  type GetTeacherFollowUpsParams,
  type GetTeacherLiveClassesParams,
  type GetTeacherQuizzesParams,
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
  profile: (accessToken: string | null) =>
    ["teachers", "profile", accessToken] as const,
  courses: (params: GetTeacherCoursesParams, accessToken: string | null) =>
    ["teachers", "courses", accessToken, params] as const,
  assignments: (
    params: GetTeacherAssignmentsParams,
    accessToken: string | null
  ) => ["teachers", "assignments", accessToken, params] as const,
  quizzes: (params: GetTeacherQuizzesParams, accessToken: string | null) =>
    ["teachers", "quizzes", accessToken, params] as const,
  liveClasses: (
    params: GetTeacherLiveClassesParams,
    accessToken: string | null
  ) => ["teachers", "live-classes", accessToken, params] as const,
  followUps: (params: GetTeacherFollowUpsParams, accessToken: string | null) =>
    ["teachers", "follow-ups", accessToken, params] as const,
  followUpDetail: (followUpId: number | string, accessToken: string | null) =>
    ["teachers", "follow-up", accessToken, followUpId] as const,
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

export function useDeleteTeacherCourseMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: number) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return deleteTeacherCourse(accessToken, courseId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers", "courses", accessToken],
      })
      queryClient.invalidateQueries({
        queryKey: teachersKeys.dashboard(accessToken),
      })
    },
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

export function useTeacherQuizzesQuery(params: GetTeacherQuizzesParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.quizzes(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherQuizzes(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}

export function useTeacherLiveClassesQuery(
  params: GetTeacherLiveClassesParams = {}
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.liveClasses(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherLiveClasses(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}

export function useTeacherFollowUpsQuery(
  params: GetTeacherFollowUpsParams = {}
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.followUps(params, accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherFollowUps(accessToken, params)
    },
    enabled: Boolean(accessToken),
    placeholderData: keepPreviousData,
  })
}

export function useTeacherFollowUpDetailsQuery(followUpId?: number) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.followUpDetail(followUpId ?? "unknown", accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      if (!followUpId) {
        throw new Error("Missing follow-up id")
      }

      return getTeacherFollowUpDetails(accessToken, followUpId)
    },
    enabled: Boolean(accessToken && followUpId),
  })
}

export function useTeacherProfileQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: teachersKeys.profile(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getTeacherProfile(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}
