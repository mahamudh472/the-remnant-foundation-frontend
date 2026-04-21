import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import {
  addStudentWishlistCourse,
  completeStudentLesson,
  enrollStudentCourse,
  getStudentCertificates,
  getStudentQuizQuestions,
  getStudentCourseModules,
  getStudentEnrolledCourses,
  getStudentDashboard,
  getStudentTeacherApplicationEligibility,
  getStudentModuleContent,
  getStudentPastLiveClasses,
  getStudentProfile,
  getStudentUpcomingLiveClasses,
  getStudentWishlist,
  removeStudentWishlistCourse,
  submitStudentTeacherApplication,
  submitStudentQuiz,
  getStudentQuizAttempts,
  getStudentQuizAttemptDetail,
  type GetStudentEnrolledCoursesParams,
  type GetStudentLiveClassesParams,
  type SubmitStudentTeacherApplicationPayload,
  type StudentQuizSubmitPayload,
  type StudentEnrolledStatus,
  type StudentWishlistItem,
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
  teacherApplicationEligibility: (accessToken: string | null) =>
    ["students", "teacher-application", "eligibility", accessToken] as const,
  certificates: (accessToken: string | null) =>
    ["students", "certificates", accessToken] as const,
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
  courseModules: (courseId: number | string, accessToken: string | null) =>
    ["students", "course-modules", accessToken, courseId] as const,
  moduleContent: (moduleId: number | string, accessToken: string | null) =>
    ["students", "module-content", accessToken, moduleId] as const,
  quizQuestions: (quizId: number | string, accessToken: string | null) =>
    ["students", "quiz-questions", accessToken, quizId] as const,
  quizAttempts: (accessToken: string | null) =>
    ["students", "quiz-attempts", accessToken] as const,
  quizAttemptDetail: (attemptId: number | string, accessToken: string | null) =>
    ["students", "quiz-attempt-detail", accessToken, attemptId] as const,
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

export function useStudentTeacherApplicationEligibilityQuery(enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.teacherApplicationEligibility(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentTeacherApplicationEligibility(accessToken)
    },
    enabled: Boolean(accessToken) && enabled,
  })
}

export function useStudentCertificatesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.certificates(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentCertificates(accessToken)
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

export function useAddStudentWishlistMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: number) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return addStudentWishlistCourse(accessToken, courseId)
    },
    onSuccess: (data) => {
      queryClient.setQueryData<StudentWishlistItem[]>(
        studentsKeys.wishlist(accessToken),
        (current = []) => {
          if (
            current.some((item) => item.course_id === data.wishlist.course_id)
          ) {
            return current
          }

          return [data.wishlist, ...current]
        }
      )
      queryClient.invalidateQueries({
        queryKey: studentsKeys.wishlist(accessToken),
      })
    },
  })
}

export function useRemoveStudentWishlistMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: number) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return removeStudentWishlistCourse(accessToken, courseId)
    },
    onSuccess: (_data, courseId) => {
      queryClient.setQueryData<StudentWishlistItem[]>(
        studentsKeys.wishlist(accessToken),
        (current = []) => current.filter((item) => item.course_id !== courseId)
      )
      queryClient.invalidateQueries({
        queryKey: studentsKeys.wishlist(accessToken),
      })
    },
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

export function useStudentCourseModulesQuery(
  courseId?: number,
  enabled = true
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.courseModules(courseId ?? "unknown", accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      if (!courseId) {
        throw new Error("Missing course id")
      }

      return getStudentCourseModules(accessToken, courseId)
    },
    enabled: Boolean(accessToken && courseId) && enabled,
  })
}

export function useStudentModuleContentQuery(
  moduleId?: number,
  enabled = true
) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.moduleContent(moduleId ?? "unknown", accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      if (!moduleId) {
        throw new Error("Missing module id")
      }

      return getStudentModuleContent(accessToken, moduleId)
    },
    enabled: Boolean(accessToken && moduleId) && enabled,
  })
}

export function useStudentQuizQuestionsQuery(quizId?: number, enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.quizQuestions(quizId ?? "unknown", accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      if (!quizId) {
        throw new Error("Missing quiz id")
      }

      return getStudentQuizQuestions(accessToken, quizId)
    },
    enabled: Boolean(accessToken && quizId) && enabled,
  })
}

export interface CompleteStudentLessonMutationPayload {
  lessonId: number
  courseId: number
  moduleId: number
}

export interface EnrollStudentCourseMutationPayload {
  courseId: number
}

export interface SubmitStudentQuizMutationPayload {
  quizId: number
  payload: StudentQuizSubmitPayload
  courseId?: number
  moduleId?: number
}

export function useCompleteStudentLessonMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId }: CompleteStudentLessonMutationPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return completeStudentLesson(accessToken, lessonId)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: studentsKeys.courseModules(variables.courseId, accessToken),
      })
      queryClient.invalidateQueries({
        queryKey: studentsKeys.moduleContent(variables.moduleId, accessToken),
      })
    },
  })
}

export function useEnrollStudentCourseMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId }: EnrollStudentCourseMutationPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return enrollStudentCourse(accessToken, courseId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students", "enrolled-courses", accessToken],
      })
      queryClient.invalidateQueries({
        queryKey: studentsKeys.dashboard(accessToken),
      })
    },
  })
}

export function useSubmitStudentTeacherApplicationMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SubmitStudentTeacherApplicationPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return submitStudentTeacherApplication(accessToken, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentsKeys.teacherApplicationEligibility(accessToken),
      })
    },
  })
}

export function useSubmitStudentQuizMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ quizId, payload }: SubmitStudentQuizMutationPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return submitStudentQuiz(accessToken, quizId, payload)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: studentsKeys.quizQuestions(variables.quizId, accessToken),
      })

      if (variables.moduleId) {
        queryClient.invalidateQueries({
          queryKey: studentsKeys.moduleContent(variables.moduleId, accessToken),
        })
      }

      if (variables.courseId) {
        queryClient.invalidateQueries({
          queryKey: studentsKeys.courseModules(variables.courseId, accessToken),
        })
      }
    },
  })
}

export function useStudentQuizAttemptsQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.quizAttempts(accessToken),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return getStudentQuizAttempts(accessToken)
    },
    enabled: Boolean(accessToken),
  })
}

export function useStudentQuizAttemptDetailQuery(attemptId?: number) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: studentsKeys.quizAttemptDetail(
      attemptId ?? "unknown",
      accessToken
    ),
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      if (!attemptId) {
        throw new Error("Missing attempt id")
      }

      return getStudentQuizAttemptDetail(accessToken, attemptId)
    },
    enabled: Boolean(accessToken && attemptId),
    retry: (failureCount, error) => {
      if ((error as { status?: number })?.status === 404) return false
      return failureCount < 3
    },
  })
}
