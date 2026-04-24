import { apiRequest } from "@/lib/api/client"

// --- Dashboard Stats ---
export interface AgeGroupCount {
  age_group: string
  label: string
  count: number
}

export interface AdminDashboardStats {
  total_students: number
  total_teachers: number
  total_courses: number
  total_revenue: string
  user_count: number
  age_group: string
  age_group_counts: AgeGroupCount[]
}

export interface GetAdminDashboardParams {
  age_group?: string
}

export function getAdminDashboardStats(accessToken: string, params: GetAdminDashboardParams = {}) {
  const urlParams = new URLSearchParams()
  if (params.age_group) urlParams.append("age_group", params.age_group)

  const query = urlParams.toString()
  const endpoint = query ? `admin-dashboard/?${query}` : "admin-dashboard/"

  return apiRequest<AdminDashboardStats>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

// --- Events ---
export interface AdminEvent {
  id: number
  name: string
  event_date: string
  event_time: string
  zoom_link: string
  description: string
  created_by?: string
  created_at: string
  updated_at?: string
}

export interface CreateEventPayload {
  name: string
  event_date: string
  event_time: string
  zoom_link: string
  description: string
}

export interface CreateEventResponse {
  message: string
  event: AdminEvent
}

export interface AdminEventsResponse {
  count: number
  next: string | null
  previous: string | null
  results: AdminEvent[]
}

export interface GetAdminEventsParams {
  search?: string
  page?: number
  page_size?: number
}

export function createAdminEvent(accessToken: string, payload: CreateEventPayload) {
  return apiRequest<CreateEventResponse>("admin-dashboard/events/create/", {
    method: "POST",
    body: payload,
    token: accessToken,
  })
}

export function getAdminEvents(accessToken: string, params: GetAdminEventsParams = {}) {
  const urlParams = new URLSearchParams()
  if (params.search) urlParams.append("search", params.search)
  if (params.page) urlParams.append("page", String(params.page))
  if (params.page_size) urlParams.append("page_size", String(params.page_size))

  const query = urlParams.toString()
  const endpoint = query ? `admin-dashboard/events/?${query}` : "admin-dashboard/events/"

  return apiRequest<AdminEventsResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

// --- Courses ---
export interface PendingCourse {
  id: number
  title: string
  description: string
  status: string
  price: string
  teacher_id: number
  teacher_name: string
  program_id: number
  program_name: string
  category_id: number
  category_name: string
  age_group: string
  age_group_label: string
}

export interface PendingCoursesResponse {
  count: number
  next: string | null
  previous: string | null
  results: PendingCourse[]
}

export interface GetPendingCoursesParams {
  age_group?: string
  program?: string
  page?: number
  page_size?: number
}

export interface CourseApprovalResponse {
  message: string
  course: PendingCourse
}

export interface CourseRejectionPayload {
  rejection_reason: string
}

export function getPendingCourses(accessToken: string, params: GetPendingCoursesParams = {}) {
  const urlParams = new URLSearchParams()
  if (params.age_group) urlParams.append("age_group", params.age_group)
  if (params.program) urlParams.append("program", params.program)
  if (params.page) urlParams.append("page", String(params.page))
  if (params.page_size) urlParams.append("page_size", String(params.page_size))

  const query = urlParams.toString()
  const endpoint = query ? `admin-dashboard/courses/pending/?${query}` : "admin-dashboard/courses/pending/"

  return apiRequest<PendingCoursesResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function approveCourse(accessToken: string, courseId: number | string) {
  return apiRequest<CourseApprovalResponse>(`admin-dashboard/courses/${courseId}/approve/`, {
    method: "POST",
    body: {},
    token: accessToken,
  })
}

export function rejectCourse(accessToken: string, courseId: number | string, payload: CourseRejectionPayload) {
  return apiRequest<CourseApprovalResponse>(`admin-dashboard/courses/${courseId}/reject/`, {
    method: "POST",
    body: payload,
    token: accessToken,
  })
}

// --- Teacher Applications ---
export interface TeacherApplicationSummary {
  id: number
  full_name: string
  email: string
  profile_photo: string | null
  educational_background: string
}

export interface TeacherApplicationDetail extends TeacherApplicationSummary {
  phone_number: string
  teaching_experience: string
  expertise: string[]
  preferred_age_group: string
  preferred_teaching_mode: string
}

export interface TeacherApplicationsResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeacherApplicationSummary[]
}

export interface GetTeacherApplicationsParams {
  search?: string
  status?: "pending" | "approved" | "rejected"
  page?: number
  page_size?: number
}

export interface TeacherApplicationActionResponse {
  message: string
  application: TeacherApplicationSummary
}

export interface TeacherApplicationRejectionPayload {
  rejection_reason: string
}

export function getTeacherApplications(accessToken: string, params: GetTeacherApplicationsParams = {}) {
  const urlParams = new URLSearchParams()
  if (params.search) urlParams.append("search", params.search)
  if (params.status) urlParams.append("status", params.status)
  if (params.page) urlParams.append("page", String(params.page))
  if (params.page_size) urlParams.append("page_size", String(params.page_size))

  const query = urlParams.toString()
  const endpoint = query ? `admin-dashboard/teacher-applications/?${query}` : "admin-dashboard/teacher-applications/"

  return apiRequest<TeacherApplicationsResponse>(endpoint, {
    method: "GET",
    token: accessToken,
  })
}

export function getTeacherApplicationDetails(accessToken: string, applicationId: number | string) {
  return apiRequest<{ application: TeacherApplicationDetail }>(`admin-dashboard/teacher-applications/${applicationId}/`, {
    method: "GET",
    token: accessToken,
  })
}

export function approveTeacherApplication(accessToken: string, applicationId: number | string) {
  return apiRequest<TeacherApplicationActionResponse>(`admin-dashboard/teacher-applications/${applicationId}/approve/`, {
    method: "POST",
    body: {},
    token: accessToken,
  })
}

export function rejectTeacherApplication(accessToken: string, applicationId: number | string, payload: TeacherApplicationRejectionPayload) {
  return apiRequest<TeacherApplicationActionResponse>(`admin-dashboard/teacher-applications/${applicationId}/reject/`, {
    method: "POST",
    body: payload,
    token: accessToken,
  })
}
