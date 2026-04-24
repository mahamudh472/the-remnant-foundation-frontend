import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import {
  getAdminDashboardStats,
  getAdminEvents,
  createAdminEvent,
  getPendingCourses,
  approveCourse,
  rejectCourse,
  getTeacherApplications,
  getTeacherApplicationDetails,
  approveTeacherApplication,
  rejectTeacherApplication,
  type GetAdminDashboardParams,
  type GetAdminEventsParams,
  type CreateEventPayload,
  type GetPendingCoursesParams,
  type CourseRejectionPayload,
  type GetTeacherApplicationsParams,
  type TeacherApplicationRejectionPayload,
} from "@/lib/api/admin"
import { useAuthStore } from "@/lib/store/auth-store"

export const adminKeys = {
  all: ["admin"] as const,
  stats: (params: GetAdminDashboardParams) => [...adminKeys.all, "stats", params] as const,
  events: {
    all: [...adminKeys.all, "events"] as const,
    list: (params: GetAdminEventsParams) => [...adminKeys.all, "events", "list", params] as const,
  },
  courses: {
    all: [...adminKeys.all, "courses"] as const,
    pending: (params: GetPendingCoursesParams) => [...adminKeys.all, "courses", "pending", params] as const,
  },
  teacherApplications: {
    all: [...adminKeys.all, "teacher-applications"] as const,
    list: (params: GetTeacherApplicationsParams) => [...adminKeys.all, "teacher-applications", "list", params] as const,
    detail: (id: number | string) => [...adminKeys.all, "teacher-applications", "detail", id] as const,
  },
}

// --- Dashboard Stats ---
export function useAdminDashboardStatsQuery(params: GetAdminDashboardParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: adminKeys.stats(params),
    queryFn: () => {
      if (!accessToken) throw new Error("Missing access token")
      return getAdminDashboardStats(accessToken, params)
    },
    enabled: !!accessToken,
  })
}

// --- Events ---
export function useAdminEventsQuery(params: GetAdminEventsParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: adminKeys.events.list(params),
    queryFn: () => {
      if (!accessToken) throw new Error("Missing access token")
      return getAdminEvents(accessToken, params)
    },
    enabled: !!accessToken,
    placeholderData: keepPreviousData,
  })
}

export function useCreateAdminEventMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => {
      if (!accessToken) throw new Error("Missing access token")
      return createAdminEvent(accessToken, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.events.all })
    },
  })
}

// --- Courses ---
export function usePendingCoursesQuery(params: GetPendingCoursesParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: adminKeys.courses.pending(params),
    queryFn: () => {
      if (!accessToken) throw new Error("Missing access token")
      return getPendingCourses(accessToken, params)
    },
    enabled: !!accessToken,
    placeholderData: keepPreviousData,
  })
}

export function useApproveCourseMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: number | string) => {
      if (!accessToken) throw new Error("Missing access token")
      return approveCourse(accessToken, courseId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.courses.all })
      // Also invalidate general courses if they exist in cache
      queryClient.invalidateQueries({ queryKey: ["courses"] })
    },
  })
}

export function useRejectCourseMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId, payload }: { courseId: number | string, payload: CourseRejectionPayload }) => {
      if (!accessToken) throw new Error("Missing access token")
      return rejectCourse(accessToken, courseId, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.courses.all })
    },
  })
}

// --- Teacher Applications ---
export function useTeacherApplicationsQuery(params: GetTeacherApplicationsParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: adminKeys.teacherApplications.list(params),
    queryFn: () => {
      if (!accessToken) throw new Error("Missing access token")
      return getTeacherApplications(accessToken, params)
    },
    enabled: !!accessToken,
    placeholderData: keepPreviousData,
  })
}

export function useTeacherApplicationDetailsQuery(applicationId: number | string | null) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: adminKeys.teacherApplications.detail(applicationId || "unknown"),
    queryFn: () => {
      if (!accessToken) throw new Error("Missing access token")
      if (!applicationId) throw new Error("Missing application id")
      return getTeacherApplicationDetails(accessToken, applicationId)
    },
    enabled: !!accessToken && !!applicationId,
  })
}

export function useApproveTeacherApplicationMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (applicationId: number | string) => {
      if (!accessToken) throw new Error("Missing access token")
      return approveTeacherApplication(accessToken, applicationId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.teacherApplications.all })
    },
  })
}

export function useRejectTeacherApplicationMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ applicationId, payload }: { applicationId: number | string, payload: TeacherApplicationRejectionPayload }) => {
      if (!accessToken) throw new Error("Missing access token")
      return rejectTeacherApplication(accessToken, applicationId, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.teacherApplications.all })
    },
  })
}
