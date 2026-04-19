import { apiRequest } from "@/lib/api/client"

export interface TeacherListItem {
  id: number
  name: string
  avatar: string | null
  profession: string | null
  total_courses: number
  total_reviews: number
  avg_rating: number
}

export interface TeachersListResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherListItem[]
}

export interface GetTeachersParams {
  page?: number
  page_size?: number
  search?: string
  filter?: "newest" | "oldest" | "top"
}

export interface TeacherPublicProfile {
  id: number
  name: string
  avatar: string | null
  profession: string | null
  total_courses: number
  total_reviews: number
  avg_rating: number
  bio: string | null
  total_students: number
  total_lessons: number
}

export interface TeacherEducation {
  id: number
  degree: string
  institution: string
  start_year: number
  end_year: number | null
  description: string
  created_at: string
  updated_at: string
}

export interface TeacherExperience {
  id: number
  job_title: string
  organization: string
  start_year: number
  end_year: number | null
  description: string
  is_current: boolean
  created_at: string
  updated_at: string
}

export interface TeacherCertification {
  id: number
  name?: string
  title?: string
  issuer?: string
  year?: number
  image?: string | null
  created_at?: string
  updated_at?: string
}

export interface TeacherContactDetail {
  id: number
  contact_type: string
  type_label: string
  label: string
  value: string
  created_at: string
  updated_at: string
}

export interface TeacherSocialLink {
  platform: string
  label: string
  value: string
}

export interface TeacherTopCourse {
  id: number
  status: string
  title: string
  description: string
  thumbnail: string | null
  category_name: string
  program_name: string
  price: string
  teacher_name: string
  teacher_avatar: string | null
  lessons_count: number
  review_count: number
  stars: number
  students_count: number
}

export interface TeacherDetailsResponse {
  teacher: TeacherPublicProfile
  educations: TeacherEducation[]
  experiences: TeacherExperience[]
  certifications: TeacherCertification[]
  contact_details: TeacherContactDetail[]
  social_links: TeacherSocialLink[]
  top_courses: TeacherTopCourse[]
}

export interface TeacherDashboardCard {
  key: string
  label: string
  value: number
}

export interface TeacherDashboardCourse {
  id: number
  status: string
  title: string
  description: string
  thumbnail: string | null
  category_name: string
  program_name: string
  price: string
  teacher_name: string
  teacher_avatar: string | null
  lessons_count: number
  review_count: number
  stars: number
  students_count: number
}

export interface TeacherDashboardResponse {
  cards: TeacherDashboardCard[]
  most_popular_courses: TeacherDashboardCourse[]
  recently_added_courses: TeacherDashboardCourse[]
}

export type TeacherCoursesFilter = "publish" | "pending" | "draft" | "inactive"

export interface GetTeacherCoursesParams {
  page?: number
  page_size?: number
  filter?: TeacherCoursesFilter
}

export interface TeacherCourseListItem {
  id: number
  thumbnail: string | null
  title: string
  lessons_count: number
  price: string
}

export interface TeacherCoursesResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherCourseListItem[]
}

export type TeacherAssignmentStatus =
  | "draft"
  | "pending"
  | "published"
  | "paused"

export type TeacherAssignmentType =
  | "homework"
  | "project"
  | "essay"
  | "presentation"
  | "worksheet"
  | "other"

export type TeacherAssignmentOrdering =
  | "newest"
  | "oldest"
  | "title_az"
  | "title_za"

export interface TeacherAssignmentGradeOption {
  value: string
  label: string
}

export interface TeacherAssignmentCourseOption {
  id: number
  name: string
}

export interface TeacherAssignmentStatusOption {
  value: TeacherAssignmentStatus
  label: string
}

export interface TeacherAssignmentTypeOption {
  value: TeacherAssignmentType
  label: string
}

export interface TeacherAssignmentListItem {
  id: number
  title: string
  assignment_type: TeacherAssignmentType
  assignment_type_label: string
  status: TeacherAssignmentStatus
  grade: TeacherAssignmentGradeOption
  course_id: number
  course_name: string
  due_date: string
  created_at: string
  updated_at: string
}

export interface TeacherAssignmentsFilters {
  grades: TeacherAssignmentGradeOption[]
  courses: TeacherAssignmentCourseOption[]
  statuses: TeacherAssignmentStatusOption[]
  assignment_types: TeacherAssignmentTypeOption[]
}

export interface TeacherAssignmentsResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherAssignmentListItem[]
  filters: TeacherAssignmentsFilters
}

export interface GetTeacherAssignmentsParams {
  page?: number
  page_size?: number
  search?: string
  grade?: string
  course?: string
  status?: string
  assignment_type?: string
  ordering?: TeacherAssignmentOrdering
}

export function getTeachers(params: GetTeachersParams = {}) {
  const normalizedParams: GetTeachersParams = {
    ...params,
    page_size:
      params.page_size === undefined
        ? undefined
        : Math.max(1, Math.min(params.page_size, 100)),
  }

  const urlParams = new URLSearchParams()

  for (const [key, value] of Object.entries(normalizedParams)) {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value))
    }
  }

  const query = urlParams.toString()
  const endpoint = query ? `teacher/list/?${query}` : "teacher/list/"

  return apiRequest<TeachersListResponse>(endpoint, {
    method: "GET",
  })
}

export function getTeacherDetails(teacherId: number | string) {
  return apiRequest<TeacherDetailsResponse>(`teacher/${teacherId}/details/`, {
    method: "GET",
  })
}

export function getTeacherDashboard(accessToken: string) {
  return apiRequest<TeacherDashboardResponse>("teacher/dashboard/", {
    method: "GET",
    token: accessToken,
  })
}

export function getTeacherCourses(
  accessToken: string,
  params: GetTeacherCoursesParams = {}
) {
  const normalizedParams: GetTeacherCoursesParams = {
    page: params.page,
    filter: params.filter,
    page_size:
      params.page_size === undefined
        ? undefined
        : Math.max(1, Math.min(params.page_size, 100)),
  }

  const urlParams = new URLSearchParams()

  for (const [key, value] of Object.entries(normalizedParams)) {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value))
    }
  }

  const query = urlParams.toString()
  const endpoint = query ? `teacher/courses/?${query}` : "teacher/courses/"

  return apiRequest<TeacherCoursesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getTeacherAssignments(
  accessToken: string,
  params: GetTeacherAssignmentsParams = {}
) {
  const normalizedParams: GetTeacherAssignmentsParams = {
    page: params.page,
    search: params.search,
    grade: params.grade,
    course: params.course,
    status: params.status,
    assignment_type: params.assignment_type,
    ordering: params.ordering,
    page_size:
      params.page_size === undefined
        ? undefined
        : Math.max(1, Math.min(params.page_size, 50)),
  }

  const urlParams = new URLSearchParams()

  for (const [key, value] of Object.entries(normalizedParams)) {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value))
    }
  }

  const query = urlParams.toString()
  const endpoint = query
    ? `courses/assignments/?${query}`
    : "courses/assignments/"

  return apiRequest<TeacherAssignmentsResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}
