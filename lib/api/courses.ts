import { apiRequest } from "@/lib/api/client"

export interface Course {
  id: number
  status: string
  title: string
  description: string
  thumbnail: string | null
  category_id: number
  category: string
  category_name: string
  program_id: number
  program: string
  program_name: string
  price: string
  teacher_id: number
  teacher_name: string
  teacher_avatar: string | null
  modules_count: number
  lessons_count: number
  stars: number
  review_count: number
  students_count: number
}

export interface CoursesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Course[]
}

export interface GetCoursesParams {
  page?: number
  page_size?: number
  search?: string
  category?: string | number[] | string[]
  teacher?: string | number[] | string[]
  price_type?: "all" | "free" | "paid"
  min_price?: number
  max_price?: number
  min_rating?: number
  max_rating?: number
  ordering?: "newest" | "oldest" | "top"
}

function serializeCommaList(value: string | number[] | string[]) {
  if (Array.isArray(value)) {
    return value.join(",")
  }

  return value
}

export function getCourses(params: GetCoursesParams = {}) {
  const normalizedParams: GetCoursesParams = {
    ...params,
    page_size:
      params.page_size === undefined
        ? undefined
        : Math.max(1, Math.min(params.page_size, 50)),
    category:
      params.category === undefined
        ? undefined
        : serializeCommaList(params.category),
    teacher:
      params.teacher === undefined
        ? undefined
        : serializeCommaList(params.teacher),
  }

  const urlParams = new URLSearchParams()

  for (const [key, value] of Object.entries(normalizedParams)) {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value))
    }
  }

  const query = urlParams.toString()
  const endpoint = query ? `/courses/?${query}` : "/courses/"

  return apiRequest<CoursesResponse>(endpoint, {
    method: "GET",
  })
}
