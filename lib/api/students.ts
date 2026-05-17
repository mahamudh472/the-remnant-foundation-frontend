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
  course_id?: number
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

export interface StudentEnrollCourseResponse {
  message: string
  enrollment: StudentEnrolledCourseItem
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

export interface StudentWishlistAddResponse {
  message: string
  wishlist: StudentWishlistItem
}

export interface StudentWishlistRemoveResponse {
  message: string
}

export interface StudentCertificateItem {
  certificate_id: number
  course_id: number
  course_name: string
  date: string
  marks: number
  out_of: number
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

export interface StudentCourseModuleItem {
  module_id: number
  module_name: string
}

export interface StudentCourseModulesResponse {
  progress_percentage: number
  modules: StudentCourseModuleItem[]
}

export interface StudentModuleLessonItem {
  lesson_id: number
  title: string
  description: string
  video_url: string | null
  complete: boolean
}

export interface StudentModuleQuizItem {
  quiz_id: number
  title: string
  complete: boolean
}

export interface StudentModuleAssignmentItem {
  assignment_id: number
  title: string
  complete: boolean
}

export interface StudentModuleContentResponse {
  lessons: StudentModuleLessonItem[]
  quizzes: StudentModuleQuizItem[]
  assignments: StudentModuleAssignmentItem[]
}

export type StudentQuizQuestionType = "mcq" | "multiple_select" | "short_answer"

export interface StudentQuizQuestionItem {
  question_id: number
  question_type: StudentQuizQuestionType
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  order: number
}

export interface StudentQuizQuestionsResponse {
  quiz_id: number
  title: string
  short_instruction: string
  passing_score: number
  attempts_allowed: number
  time_limit_minutes: number
  questions: StudentQuizQuestionItem[]
}

export interface StudentQuizSubmitAnswer {
  question_id: number
  selected_options?: string[]
  answer_text?: string
}

export interface StudentQuizSubmitPayload {
  answers: StudentQuizSubmitAnswer[]
}

export interface StudentQuizSubmitResponse {
  message: string
  attempt_id: number
  attempt_number: number
  quiz_id: number
  score_percentage: number
  passing_score: number
  passed: boolean
  total_questions: number
  answered_questions: number
  correct_answers: number
  incorrect_answers: number
  unanswered_questions: number
  submitted_at: string
  first_completed_at: string | null
}

export interface StudentCompleteLessonResponse {
  message: string
  lesson_id: number
  complete: boolean
  progress_percentage: number
  completed_at: string | null
}

export interface StudentTeacherApplicationEligibility {
  age?: number | null
  minimum_age?: number | null
  is_age_eligible: boolean
  completed_courses?: number
  minimum_completed_courses?: number
  has_completed_course: boolean
  is_teacher_active: boolean
  can_apply: boolean
}

export interface StudentTeacherApplicationFieldOption {
  value: string
  label: string
}

export interface StudentTeacherApplicationEligibilityResponse {
  eligibility: StudentTeacherApplicationEligibility
  field_options: {
    preferred_age_groups: StudentTeacherApplicationFieldOption[]
    preferred_teaching_modes: StudentTeacherApplicationFieldOption[]
    document_types: StudentTeacherApplicationFieldOption[]
    expertise: StudentTeacherApplicationExpertise[]
  }
  latest_application: StudentTeacherApplication | null
}

export interface StudentTeacherApplicationExpertise {
  id: number
  name: string
}

export interface StudentTeacherApplicationDocument {
  id: number
  document_type: string
  file: string
  uploaded_at: string
}

export interface StudentTeacherApplication {
  id: number
  full_name: string
  email: string
  phone_number: string
  profile_photo: string | null
  educational_background: string
  teaching_experience: string
  motivation: string
  preferred_age_group: string
  preferred_teaching_mode: string
  agreement_accepted: boolean
  status: string
  rejection_reason: string
  submitted_at: string
  reviewed_at: string | null
  expertise: StudentTeacherApplicationExpertise[]
  documents: StudentTeacherApplicationDocument[]
}

export interface SubmitStudentTeacherApplicationPayload {
  full_name: string
  email: string
  phone_number?: string
  profile_photo?: File | null
  educational_background: string
  teaching_experience: string
  motivation: string
  preferred_age_group: string
  preferred_teaching_mode: string
  agreement_accepted: boolean
  expertise_ids: number[]
  certificate_documents?: File[]
  recommendation_letter?: File | null
  other_documents?: File[]
}

export interface SubmitStudentTeacherApplicationResponse {
  message: string
  application: StudentTeacherApplication
}

function appendStudentTeacherApplicationFormData(
  formData: FormData,
  payload: SubmitStudentTeacherApplicationPayload
) {
  formData.append("full_name", payload.full_name.trim())
  formData.append("email", payload.email.trim())
  formData.append("phone_number", payload.phone_number?.trim() ?? "")
  formData.append(
    "educational_background",
    payload.educational_background.trim()
  )
  formData.append("teaching_experience", payload.teaching_experience.trim())
  formData.append("motivation", payload.motivation.trim())
  formData.append("preferred_age_group", payload.preferred_age_group)
  formData.append("preferred_teaching_mode", payload.preferred_teaching_mode)
  formData.append("agreement_accepted", String(payload.agreement_accepted))

  payload.expertise_ids.forEach((expertiseId) => {
    formData.append("expertise_ids", String(expertiseId))
  })

  if (payload.profile_photo) {
    formData.append("profile_photo", payload.profile_photo)
  }

  payload.certificate_documents?.forEach((file) => {
    formData.append("certificate_documents", file)
  })

  if (payload.recommendation_letter) {
    formData.append("recommendation_letter", payload.recommendation_letter)
  }

  payload.other_documents?.forEach((file) => {
    formData.append("other_documents", file)
  })
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

export interface UpdateStudentProfilePayload {
  first_name?: string
  last_name?: string
  bio?: string
  grade_level?: string
  age_group?: string
  phone_number?: string
  age?: number
  gender?: string
  avatar?: File | null
}

export function updateStudentProfile(
  accessToken: string,
  payload: UpdateStudentProfilePayload
) {
  const hasAvatarUpload = payload.avatar instanceof File

  if (hasAvatarUpload) {
    const formData = new FormData()

    if (payload.first_name !== undefined) {
      formData.append("first_name", payload.first_name)
    }

    if (payload.last_name !== undefined) {
      formData.append("last_name", payload.last_name)
    }

    if (payload.bio !== undefined) {
      formData.append("bio", payload.bio)
    }

    if (payload.grade_level !== undefined) {
      formData.append("grade_level", payload.grade_level)
    }

    if (payload.age_group !== undefined) {
      formData.append("age_group", payload.age_group)
    }

    if (payload.phone_number !== undefined) {
      formData.append("phone_number", payload.phone_number)
    }

    if (payload.age !== undefined) {
      formData.append("age", String(payload.age))
    }

    if (payload.gender !== undefined) {
      formData.append("gender", payload.gender)
    }

    if (payload.avatar instanceof File) {
      formData.append("avatar", payload.avatar)
    }

    return apiRequest<StudentProfileResponse>("student/profile/", {
      method: "PATCH",
      body: formData,
      token: accessToken,
    })
  }

  return apiRequest<StudentProfileResponse>("student/profile/", {
    method: "PATCH",
    body: payload,
    token: accessToken,
  })
}

export function getStudentDashboard(accessToken: string) {
  return apiRequest<StudentDashboardResponse>("student/dashboard/", {
    method: "GET",
    token: accessToken,
  })
}

export function getStudentTeacherApplicationEligibility(accessToken: string) {
  return apiRequest<StudentTeacherApplicationEligibilityResponse>(
    "student/teacher-application/",
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export function submitStudentTeacherApplication(
  accessToken: string,
  payload: SubmitStudentTeacherApplicationPayload
) {
  const formData = new FormData()
  appendStudentTeacherApplicationFormData(formData, payload)

  return apiRequest<SubmitStudentTeacherApplicationResponse>(
    "student/teacher-application/",
    {
      method: "POST",
      token: accessToken,
      body: formData,
    }
  )
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

export function getStudentCertificates(accessToken: string) {
  return apiRequest<StudentCertificateItem[]>("student/certificates/", {
    method: "GET",
    token: accessToken,
  })
}

export function addStudentWishlistCourse(
  accessToken: string,
  courseId: number
) {
  return apiRequest<StudentWishlistAddResponse>(
    `student/wishlist/${courseId}/add/`,
    {
      method: "POST",
      token: accessToken,
    }
  )
}

export function removeStudentWishlistCourse(
  accessToken: string,
  courseId: number
) {
  return apiRequest<StudentWishlistRemoveResponse>(
    `student/wishlist/${courseId}/remove/`,
    {
      method: "DELETE",
      token: accessToken,
    }
  )
}

export function enrollStudentCourse(accessToken: string, courseId: number) {
  return apiRequest<StudentEnrollCourseResponse>(
    `student/enrolled-courses/${courseId}/enroll/`,
    {
      method: "POST",
      token: accessToken,
    }
  )
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

export function getStudentCourseModules(accessToken: string, courseId: number) {
  return apiRequest<StudentCourseModulesResponse>(
    `student/enrolled-courses/${courseId}/modules/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export function getStudentModuleContent(accessToken: string, moduleId: number) {
  return apiRequest<StudentModuleContentResponse>(
    `student/modules/${moduleId}/content/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export function getStudentQuizQuestions(accessToken: string, quizId: number) {
  return apiRequest<StudentQuizQuestionsResponse>(
    `student/quizzes/${quizId}/questions/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export function submitStudentQuiz(
  accessToken: string,
  quizId: number,
  payload: StudentQuizSubmitPayload
) {
  return apiRequest<StudentQuizSubmitResponse>(
    `student/quizzes/${quizId}/submit/`,
    {
      method: "POST",
      token: accessToken,
      body: payload,
    }
  )
}

export function completeStudentLesson(accessToken: string, lessonId: number) {
  return apiRequest<StudentCompleteLessonResponse>(
    `student/lessons/${lessonId}/complete/`,
    {
      method: "POST",
      token: accessToken,
    }
  )
}

export interface StudentQuizAttemptListItem {
  attempt_id: number
  quiz_id: number
  quiz_name: string
  questions_count: number
  attempts_count: number
  latest_attempt_at: string
}

export interface StudentQuizAttemptQuestion {
  question_id: number
  question_type: StudentQuizQuestionType
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  submitted_selected_options: string[]
  submitted_answer_text: string
  is_answered: boolean
  is_correct: boolean
  correct_options: string[]
  correct_short_answer: string
  explanation: string
  order: number
}

export interface StudentQuizAttemptDetail {
  attempt_id: number
  attempt_number: number
  quiz_id: number
  quiz_name: string
  score_percentage: number
  passing_score: number
  passed: boolean
  total_questions: number
  answered_questions: number
  correct_answers: number
  incorrect_answers: number
  unanswered_questions: number
  submitted_at: string
  questions: StudentQuizAttemptQuestion[]
}

export function getStudentQuizAttempts(accessToken: string) {
  return apiRequest<StudentQuizAttemptListItem[]>("student/quiz-attempts/", {
    method: "GET",
    token: accessToken,
  })
}

export function getStudentQuizAttemptDetail(
  accessToken: string,
  attemptId: number
) {
  return apiRequest<StudentQuizAttemptDetail>(
    `student/quiz-attempts/${attemptId}/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export interface StudentAssignmentDetail {
  assignment_id: number
  title: string
  short_description: string
  assignment_type: string
  assignment_type_label: string
  due_date: string
  content_description: string
  attachment: string | null
  allow_file_submission: boolean
  allow_text_answer: boolean
  total_marks: number
  complete: boolean
  submission_text: string
  submission_file: string | null
  completed_at: string | null
}

export interface StudentAssignmentSubmitResponse {
  message: string
  assignment_id: number
  complete: boolean
  submission_text: string
  submission_file: string | null
  completed_at: string | null
}

export function getStudentAssignmentDetails(
  accessToken: string,
  assignmentId: number
) {
  return apiRequest<StudentAssignmentDetail>(
    `student/assignments/${assignmentId}/details/`,
    {
      method: "GET",
      token: accessToken,
    }
  )
}

export function submitStudentAssignment(
  accessToken: string,
  assignmentId: number,
  submissionFile?: File | null,
  submissionText?: string
) {
  const formData = new FormData()

  if (submissionFile) {
    formData.append("submission_file", submissionFile)
  }

  if (submissionText?.trim()) {
    formData.append("submission_text", submissionText.trim())
  }

  return apiRequest<StudentAssignmentSubmitResponse>(
    `student/assignments/${assignmentId}/submit/`,
    {
      method: "POST",
      token: accessToken,
      body: formData,
    }
  )
}
