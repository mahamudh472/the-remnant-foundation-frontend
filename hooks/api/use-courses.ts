import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import {
  createCourseAssignment,
  createCourseQuiz,
  createCourse,
  getCourseAgeGroupChoiceOptions,
  getCourseCategoryOptions,
  getCourseProgramOptions,
  getCourses,
  updateCourseStep,
  type CourseChoiceOptionsResponse,
  type CreateCourseAssignmentPayload,
  type CreateCourseQuizPayload,
  type CreateCoursePayload,
  type GetCoursesParams,
  type UpdateCourseStepPayload,
} from "@/lib/api/courses"
import { useAuthStore } from "@/lib/store/auth-store"

export const coursesKeys = {
  all: ["courses"] as const,
  list: (params: GetCoursesParams) => ["courses", "list", params] as const,
  categoryOptions: () => ["courses", "category-options"] as const,
  programOptions: () => ["courses", "program-options"] as const,
  ageGroupChoiceOptions: () => ["courses", "age-group-choice-option"] as const,
}

export function useCoursesQuery(params: GetCoursesParams = {}) {
  return useQuery({
    queryKey: coursesKeys.list(params),
    queryFn: () => getCourses(params),
    placeholderData: keepPreviousData,
  })
}

export function useCourseCategoryOptionsQuery() {
  return useQuery<CourseChoiceOptionsResponse<number>>({
    queryKey: coursesKeys.categoryOptions(),
    queryFn: () => getCourseCategoryOptions(),
    staleTime: 5 * 60_000,
  })
}

export function useCourseProgramOptionsQuery() {
  return useQuery<CourseChoiceOptionsResponse<number>>({
    queryKey: coursesKeys.programOptions(),
    queryFn: () => getCourseProgramOptions(),
    staleTime: 5 * 60_000,
  })
}

export function useCourseAgeGroupChoiceOptionsQuery() {
  return useQuery<CourseChoiceOptionsResponse<string>>({
    queryKey: coursesKeys.ageGroupChoiceOptions(),
    queryFn: () => getCourseAgeGroupChoiceOptions(),
    staleTime: 5 * 60_000,
  })
}

export function useCreateCourseMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCoursePayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return createCourse(accessToken, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers", "courses"] })
      queryClient.invalidateQueries({ queryKey: ["teachers", "dashboard"] })
      queryClient.invalidateQueries({ queryKey: coursesKeys.all })
    },
  })
}

export function useCreateCourseQuizMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useMutation({
    mutationFn: (payload: CreateCourseQuizPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return createCourseQuiz(accessToken, payload)
    },
  })
}

export function useCreateCourseAssignmentMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useMutation({
    mutationFn: (payload: CreateCourseAssignmentPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return createCourseAssignment(accessToken, payload)
    },
  })
}

export interface UpdateCourseStepMutationPayload {
  courseId: number
  payload: UpdateCourseStepPayload
}

export function useUpdateCourseStepMutation() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId, payload }: UpdateCourseStepMutationPayload) => {
      if (!accessToken) {
        throw new Error("Missing access token")
      }

      return updateCourseStep(accessToken, courseId, payload)
    },
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["teachers", "courses"] })
      queryClient.invalidateQueries({ queryKey: ["teachers", "dashboard"] })
      queryClient.invalidateQueries({
        queryKey: ["courses", variables.courseId],
      })
    },
  })
}
