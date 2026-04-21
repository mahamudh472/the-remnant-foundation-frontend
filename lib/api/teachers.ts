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

export interface DeleteTeacherCourseResponse {
  message: string
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

export type TeacherQuizType =
  | "all_grades"
  | "beginner"
  | "intermediate"
  | "advanced"

export type TeacherQuizStatus = "draft" | "pending" | "published" | "paused"

export type TeacherQuizOrdering = "newest" | "oldest" | "title_az" | "title_za"

export interface TeacherQuizGradeOption {
  value: string
  label: string
}

export interface TeacherQuizProgramOption {
  id: number
  name: string
}

export interface TeacherQuizCategoryOption {
  id: number
  name: string
}

export interface TeacherQuizTypeOption {
  value: TeacherQuizType
  label: string
}

export interface TeacherQuizStatusOption {
  value: TeacherQuizStatus
  label: string
}

export interface TeacherQuizListItem {
  id: number
  title: string
  quiz_type: TeacherQuizType
  status: TeacherQuizStatus
  grade: TeacherQuizGradeOption
  course_id: number
  course_name: string
  program_id: number
  program: string
  program_name: string
  category_id: number
  category: string
  category_name: string
  questions_count: number
  passing_score: number
  created_at: string
  updated_at: string
}

export interface TeacherQuizzesFilters {
  grades: TeacherQuizGradeOption[]
  programs: TeacherQuizProgramOption[]
  categories: TeacherQuizCategoryOption[]
  quiz_types: TeacherQuizTypeOption[]
  course_statuses: TeacherQuizStatusOption[]
}

export interface TeacherQuizzesResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherQuizListItem[]
  filters: TeacherQuizzesFilters
}

export interface GetTeacherQuizzesParams {
  page?: number
  page_size?: number
  search?: string
  grade?: string
  program?: string
  category?: string
  quiz_type?: string
  status?: string
  ordering?: TeacherQuizOrdering
}

export type TeacherLiveClassStatus = "upcoming" | "live_now" | "completed"

export interface TeacherLiveClassListItem {
  id: number
  title: string
  short_description: string
  date: string
  start_time: string
  duration_minutes: number
  meeting_link: string | null
  record_link: string | null
  course_id: number
  course_title: string
  grade_level: string
  program_name: string
  category_name: string
  enrolled_students_count: number
  meeting_platform: string
  start_datetime: string
  end_datetime: string
  status: TeacherLiveClassStatus
  created_at: string
}

export interface TeacherLiveClassesResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherLiveClassListItem[]
  upcoming_count: number
  live_now_count: number
  completed_count: number
}

export interface GetTeacherLiveClassesParams {
  page?: number
  page_size?: number
  status?: TeacherLiveClassStatus | "upcomimg"
  filter?: TeacherLiveClassStatus | "upcomimg"
}

export type TeacherFollowUpStatus = "sent" | "queued" | "failed" | "draft"

export interface TeacherFollowUpHistoryItem {
  id: number
  subject: string
  status: TeacherFollowUpStatus
  sent_at: string | null
  course_title: string
  course_age_group: string
  program_name: string
  sent_to: number
  recipient_names: string[]
  has_attachment: boolean
}

export interface TeacherFollowUpsResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherFollowUpHistoryItem[]
}

export interface GetTeacherFollowUpsParams {
  page?: number
  page_size?: number
  search?: string
}

export interface TeacherFollowUpRecipient {
  student_id: number
  name: string
  email: string
  progress: number
  last_follow_up_at: string | null
}

export interface TeacherFollowUpDetailResponse {
  id: number
  status: TeacherFollowUpStatus
  sent_at: string | null
  course_title: string
  course_age_group: string
  program_name: string
  recipients_count: number
  subject: string
  message: string
  has_attachment: boolean
  attachment_url: string | null
  recipients: TeacherFollowUpRecipient[]
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
    // page_size:
    //   params.page_size === undefined
    //     ? undefined
    //     : Math.max(1, Math.min(params.page_size, 100)),
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

export function deleteTeacherCourse(accessToken: string, courseId: number) {
  return apiRequest<DeleteTeacherCourseResponse>(
    `courses/${courseId}/delete/`,
    {
      method: "DELETE",
      token: accessToken,
    }
  )
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

export function getTeacherQuizzes(
  accessToken: string,
  params: GetTeacherQuizzesParams = {}
) {
  const normalizedParams: GetTeacherQuizzesParams = {
    page: params.page,
    search: params.search,
    grade: params.grade,
    program: params.program,
    category: params.category,
    quiz_type: params.quiz_type,
    status: params.status,
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
  const endpoint = query ? `courses/quizzes/?${query}` : "courses/quizzes/"

  return apiRequest<TeacherQuizzesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getTeacherLiveClasses(
  accessToken: string,
  params: GetTeacherLiveClassesParams = {}
) {
  const normalizedParams: GetTeacherLiveClassesParams = {
    page: params.page,
    page_size:
      params.page_size === undefined
        ? undefined
        : Math.max(1, Math.min(params.page_size, 100)),
    status: params.status === "upcomimg" ? "upcoming" : params.status,
    filter: params.filter === "upcomimg" ? "upcoming" : params.filter,
  }

  const urlParams = new URLSearchParams()

  for (const [key, value] of Object.entries(normalizedParams)) {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value))
    }
  }

  const query = urlParams.toString()
  const endpoint = query
    ? `teacher/live-classes/?${query}`
    : "teacher/live-classes/"

  return apiRequest<TeacherLiveClassesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getTeacherFollowUps(
  accessToken: string,
  params: GetTeacherFollowUpsParams = {}
) {
  const normalizedParams: GetTeacherFollowUpsParams = {
    page: params.page,
    search: params.search,
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
    ? `teacher/dashboard/follow-ups/?${query}`
    : "teacher/dashboard/follow-ups/"

  return apiRequest<TeacherFollowUpsResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getTeacherFollowUpDetails(
  accessToken: string,
  followUpId: number | string
) {
  return apiRequest<TeacherFollowUpDetailResponse>(
    `teacher/dashboard/follow-ups/${followUpId}/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}
