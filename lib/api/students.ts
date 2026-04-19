import { apiRequest } from "@/lib/api/client"

export interface TeacherStudentListItem {
  id: number
  student_id: string
  name: string
  avatar: string | null
  location: string | null
  first_enrolled_at: string
  total_courses: number
}

export interface TeacherStudentsResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherStudentListItem[]
}

export interface GetTeacherStudentsParams {
  page?: number
  page_size?: number
  search?: string
}

export interface TeacherStudentProfile {
  id: number
  student_id: string
  first_name: string
  last_name: string
  username: string | null
  email: string
  phone_number: string | null
  date_of_birth: string | null
  age: number | null
  gender: string | null
  avatar: string | null
  about_student: string | null
}

export interface StudentCoursePerformance {
  course_name: string
  class_progress: number
  quiz: number
  live_classes: number
}

export interface TeacherStudentDetailsResponse {
  student: TeacherStudentProfile
  course_performance: StudentCoursePerformance[]
}

export interface StudentProfilePerformance {
  course: number
  course_name: string
  class_progress: number
  quiz_average: number
  live_class_attendance: number
  updated_at: string
}

export interface StudentProfileResponse {
  id: number
  student_id: string
  first_name: string
  last_name: string
  bio: string | null
  grade_level: string | null
  email: string
  phone_number: string | null
  date_of_birth: string | null
  age: number | null
  gender: string | null
  avatar: string | null
  performances: StudentProfilePerformance[]
}

export interface StudentDashboardFeaturedQuiz {
  course_id: number
  course_title: string
  answered: string
  action_label: string
}

export interface StudentDashboardCard {
  key: string
  label: string
  value: number
}

export interface StudentDashboardRecentCourse {
  course_id: number
  course_title: string
  course_thumbnail: string | null
  teacher_name: string
  teacher_avatar: string | null
  category_name: string
  program_name: string
  class_progress: number
  stars: number
  review_count: number
}

export interface StudentDashboardInvoice {
  course: string
  id: string
  amount: string
}

export interface StudentDashboardQuiz {
  course_id: number
  course_title: string
  correct_answer: string
  score: number
  date: string
}

export interface StudentDashboardResponse {
  featured_quiz: StudentDashboardFeaturedQuiz | null
  cards: StudentDashboardCard[]
  recently_enrolled_courses: StudentDashboardRecentCourse[]
  recent_invoices: StudentDashboardInvoice[]
  latest_quizzes: StudentDashboardQuiz[]
}

export type StudentEnrolledStatus = "enrolled" | "active" | "completed"

export interface GetStudentEnrolledCoursesParams {
  status?: StudentEnrolledStatus
  page?: number
  page_size?: number
}

export interface StudentEnrolledCourseItem {
  course_id: number
  course_title: string
  course_thumbnail: string | null
  teacher_name: string
  teacher_avatar: string | null
  category_name: string
  program_name: string
  class_progress: number
  stars: number
  review_count: number
}

export interface StudentEnrolledCoursesResponse {
  count: number
  next: string | null
  previous: string | null
  results: StudentEnrolledCourseItem[]
  enrolled_count: number
  active_count: number
  completed_count: number
}

export interface StudentWishlistItem {
  course_id: number
  course_title: string
  course_thumbnail: string | null
  teacher_name: string
  teacher_avatar: string | null
  category_name: string
  program_name: string
  added_at: string
}

export interface GetStudentLiveClassesParams {
  page?: number
  page_size?: number
}

export interface StudentUpcomingLiveClassItem {
  id: number
  title: string
  short_description: string
  course_id: number
  course_name: string
  teacher_name: string
  age_group: string
  date: string
  start_time: string
  duration_minutes: number
  registered_students_count: number
  reserve_spot_url: string
}

export interface StudentPastLiveClassItem {
  id: number
  course_name: string
  teacher_name: string
  record_link: string | null
  date: string
  start_time: string
}

export interface StudentUpcomingLiveClassesResponse {
  count: number
  next: string | null
  previous: string | null
  results: StudentUpcomingLiveClassItem[]
}

export interface StudentPastLiveClassesResponse {
  count: number
  next: string | null
  previous: string | null
  results: StudentPastLiveClassItem[]
}

export function getTeacherStudents(
  accessToken: string,
  params: GetTeacherStudentsParams = {}
) {
  const normalizedParams: GetTeacherStudentsParams = {
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
  const endpoint = query ? `teacher/students/?${query}` : "teacher/students/"

  return apiRequest<TeacherStudentsResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getTeacherStudentDetails(
  studentId: number,
  accessToken: string
) {
  return apiRequest<TeacherStudentDetailsResponse>(
    `teacher/students/${studentId}/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export function getStudentProfile(accessToken: string) {
  return apiRequest<StudentProfileResponse>("student/profile/", {
    method: "GET",
    token: accessToken,
  })
}

export function getStudentDashboard(accessToken: string) {
  return apiRequest<StudentDashboardResponse>("student/dashboard/", {
    method: "GET",
    token: accessToken,
  })
}

export function getStudentEnrolledCourses(
  accessToken: string,
  params: GetStudentEnrolledCoursesParams = {}
) {
  const normalizedParams: GetStudentEnrolledCoursesParams = {
    status: params.status,
    page: params.page,
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
  const endpoint = query
    ? `student/enrolled-courses/?${query}`
    : "student/enrolled-courses/"

  return apiRequest<StudentEnrolledCoursesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getStudentWishlist(accessToken: string) {
  return apiRequest<StudentWishlistItem[]>("student/wishlist/", {
    method: "GET",
    token: accessToken,
  })
}

export function getStudentUpcomingLiveClasses(
  accessToken: string,
  params: GetStudentLiveClassesParams = {}
) {
  const normalizedParams: GetStudentLiveClassesParams = {
    page: params.page,
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
  const endpoint = query
    ? `student/live-classes/upcoming/?${query}`
    : "student/live-classes/upcoming/"

  return apiRequest<StudentUpcomingLiveClassesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getStudentPastLiveClasses(
  accessToken: string,
  params: GetStudentLiveClassesParams = {}
) {
  const normalizedParams: GetStudentLiveClassesParams = {
    page: params.page,
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
  const endpoint = query
    ? `student/live-classes/past/?${query}`
    : "student/live-classes/past/"

  return apiRequest<StudentPastLiveClassesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}
