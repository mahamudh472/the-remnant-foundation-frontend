import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { getCourses, type GetCoursesParams } from "@/lib/api/courses"

export const coursesKeys = {
  all: ["courses"] as const,
  list: (params: GetCoursesParams) => ["courses", "list", params] as const,
}

export function useCoursesQuery(params: GetCoursesParams = {}) {
  return useQuery({
    queryKey: coursesKeys.list(params),
    queryFn: () => getCourses(params),
    placeholderData: keepPreviousData,
  })
}
