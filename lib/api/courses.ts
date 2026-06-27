import { apiRequest, type ApiRequestOptions } from "@/lib/api/client"

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

export interface CourseChoiceOption<T extends string | number> {
  key: T
  value: string
}

export interface CourseChoiceOptionsResponse<T extends string | number> {
  items: CourseChoiceOption<T>[]
}

export interface CreateCoursePayload {
  title: string
  description: string
  category_id: number
  program_id: number
  age_group: string
  visibility: string
  price: string
  thumbnail?: File
}

export type CourseQuizType =
  | "all_grades"
  | "beginner"
  | "intermediate"
  | "advanced"

export type CourseQuizQuestionType = "mcq" | "multiple_select" | "short_answer"

export interface CreateCourseQuizQuestionPayload {
  question_type: CourseQuizQuestionType
  question_text: string
  option_a?: string
  option_b?: string
  option_c?: string
  option_d?: string
  correct_options: string[]
  short_answer?: string
  explanation?: string
  order: number
}

export interface CreateCourseQuizPayload {
  lesson_id: number | null
  title: string
  quiz_type: CourseQuizType
  short_instruction: string
  passing_score: number
  attempts_allowed: number
  time_limit_minutes: number
  randomize_questions: boolean
  questions: CreateCourseQuizQuestionPayload[]
}

export interface CourseQuizQuestion {
  id: number
  question_type: CourseQuizQuestionType
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_options: string[]
  short_answer: string
  explanation: string
  order: number
}

export interface CourseQuizEntity {
  id: number
  lesson_id: number | null
  title: string
  quiz_type: CourseQuizType
  short_instruction: string
  passing_score: number
  attempts_allowed: number
  time_limit_minutes: number
  randomize_questions: boolean
  questions: CourseQuizQuestion[]
  created_at: string
  updated_at: string
}

export interface CreateCourseQuizResponse {
  message: string
  quiz: CourseQuizEntity
}

export type CourseAssignmentType =
  | "homework"
  | "project"
  | "essay"
  | "presentation"
  | "worksheet"
  | "other"

export interface CreateCourseAssignmentPayload {
  lesson_id: number | null
  title: string
  short_description: string
  assignment_type: CourseAssignmentType
  due_date: string
  content_description: string
  attachment?: File
  allow_file_submission: boolean
  allow_text_answer: boolean
  total_marks: number
}

export interface CourseAssignmentEntity {
  id: number
  lesson_id: number | null
  title: string
  short_description: string
  assignment_type: CourseAssignmentType
  due_date: string
  content_description: string
  attachment: string | null
  allow_file_submission: boolean
  allow_text_answer: boolean
  total_marks: number
  created_at: string
  updated_at: string
}

export interface CreateCourseAssignmentResponse {
  message: string
  assignment: CourseAssignmentEntity
}

export type CourseUpdateStep =
  | "course_info"
  | "age_access"
  | "content"
  | "quiz"
  | "review"

export interface UpdateCourseStepPayload {
  step: CourseUpdateStep
  payload: Record<string, unknown>
  save_as_draft?: boolean
  publish?: boolean
}

export interface CourseDraftData {
  steps: Record<string, unknown>
  last_step: string
  updated_at: string
}

export interface CourseWorkflowLesson {
  title: string
  content: string
  video_url: string
  offline_download_enabled: boolean
  quiz_ids: number[]
  assignment_ids: number[]
  order: number
}
export interface CourseWorkflowModule {
  title: string
  description: string
  order: number
  lessons: CourseWorkflowLesson[]
}

export interface CourseWorkflowEntity {
  id: number
  status: string
  title: string
  description?: string
  category?: number
  program?: number
  age_group?: string
  visibility?: string
  level?: string
  language?: string
  price?: string
  quizzes_enabled?: boolean
  quiz_time_limit_minutes?: number
  quiz_passing_score?: number
  quiz_max_attempts?: number
  quiz_question_type?: string
  require_quiz_for_certificate?: boolean
  draft_data?: CourseDraftData
  modules_count?: number
  lessons_count?: number
  modules?: CourseWorkflowModule[]
}

export interface CreateCourseResponse {
  message: string
  course: CourseWorkflowEntity
}

export interface UpdateCourseStepResponse {
  message: string
  course: CourseWorkflowEntity
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
    // page_size:
    //   params.page_size === undefined
    //     ? undefined
    //     : Math.max(1, Math.min(params.page_size, 50)),
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

export function createCourse(
  accessToken: string,
  payload: CreateCoursePayload
) {
  const formData = new FormData()

  formData.append("title", payload.title)
  formData.append("description", payload.description)
  formData.append("category_id", String(payload.category_id))
  formData.append("program_id", String(payload.program_id))
  formData.append("age_group", payload.age_group)
  formData.append("visibility", payload.visibility)
  formData.append("price", payload.price)

  if (payload.thumbnail) {
    formData.append("thumbnail", payload.thumbnail)
  }

  return apiRequest<CreateCourseResponse>("courses/create/", {
    method: "POST",
    body: formData,
    token: accessToken,
  })
}

export function getCourseCategoryOptions() {
  return apiRequest<CourseChoiceOptionsResponse<number>>(
    "courses/category-options/",
    {
      method: "GET",
    }
  )
}

export function getCourseProgramOptions() {
  return apiRequest<CourseChoiceOptionsResponse<number>>(
    "courses/program-options/",
    {
      method: "GET",
    }
  )
}

export function getCourseAgeGroupChoiceOptions() {
  return apiRequest<CourseChoiceOptionsResponse<string>>(
    "courses/age-group-choice-option/",
    {
      method: "GET",
    }
  )
}

export function createCourseQuiz(
  accessToken: string,
  payload: CreateCourseQuizPayload
) {
  return apiRequest<CreateCourseQuizResponse>("courses/quizzes/create/", {
    method: "POST",
    body: payload,
    token: accessToken,
  })
}

export function createCourseAssignment(
  accessToken: string,
  payload: CreateCourseAssignmentPayload
) {
  const formData = new FormData()

  formData.append(
    "lesson_id",
    payload.lesson_id === null ? "" : String(payload.lesson_id)
  )
  formData.append("title", payload.title)
  formData.append("short_description", payload.short_description)
  formData.append("assignment_type", payload.assignment_type)
  formData.append("due_date", payload.due_date)
  formData.append("content_description", payload.content_description)
  formData.append(
    "allow_file_submission",
    String(payload.allow_file_submission)
  )
  formData.append("allow_text_answer", String(payload.allow_text_answer))
  formData.append("total_marks", String(payload.total_marks))

  if (payload.attachment) {
    formData.append("attachment", payload.attachment)
  }

  return apiRequest<CreateCourseAssignmentResponse>(
    "courses/assignments/create/",
    {
      method: "POST",
      body: formData,
      token: accessToken,
    }
  )
}

export function updateCourseStep(
  accessToken: string,
  courseId: number | string,
  payload: UpdateCourseStepPayload
) {
  if (payload.step === "course_info" && (payload.payload as any).thumbnail) {
    const formData = new FormData()
    formData.append("step", payload.step)

    const { thumbnail, ...restPayload } = payload.payload as any
    formData.append("payload", JSON.stringify(restPayload))

    if (thumbnail instanceof File) {
      formData.append("thumbnail", thumbnail)
    }

    if (payload.save_as_draft !== undefined) {
      formData.append("save_as_draft", String(payload.save_as_draft))
    }

    if (payload.publish !== undefined) {
      formData.append("publish", String(payload.publish))
    }

    return apiRequest<UpdateCourseStepResponse>(`courses/${courseId}/update/`, {
      method: "PATCH",
      body: formData,
      token: accessToken,
    })
  }

  return apiRequest<UpdateCourseStepResponse>(`courses/${courseId}/update/`, {
    method: "PATCH",
    body: payload,
    token: accessToken,
  })
}

export interface CourseDetailTeacher {
  id: number
  name: string
  headline: string | null
  avatar: string | null
}

export interface CourseDetailPricing {
  currency: string | null
  is_free: boolean
  current_price: number
  original_price: number | null
  discount_percent: number | null
  cta_label: string | null
}

export interface CourseDetailStats {
  lessons_count: number
  modules_count: number
  students_count: number
  review_count: number
  rating: number
  duration_hours: number
}

export interface CourseDetailImages {
  card: string | null
  cover: string | null
}

export interface CourseFeature {
  label: string
  value: string
}

export interface CourseDetailLesson {
  id: number
  title: string
  order: number
}

export interface CourseDetailSection {
  id: number
  title: string
  order: number
  lessons_count: number
  lessons: CourseDetailLesson[]
}

export interface CourseContent {
  total_sections: number
  total_lectures: number
  total_duration: string | null
  sections: CourseDetailSection[]
}

export interface AboutInstructor {
  bio: string
  stats: {
    courses: number
    lessons: number
    students: number
    rating: number
  }
}

export interface CourseDetailResponse {
  id: number
  title: string
  subtitle: string | null
  description: string
  status: string
  level: string
  language: string
  visibility: string
  category_id: number
  category: string
  program_id: number
  program: string
  teacher: CourseDetailTeacher
  pricing: CourseDetailPricing
  stats: CourseDetailStats
  images: CourseDetailImages
  includes: string[] | null
  course_features: CourseFeature[]
  overview: string
  course_content: CourseContent
  about_instructor: AboutInstructor
  is_enrolled?: boolean
  is_owned?: boolean
}

export function getCourseDetails(courseId: number | string, accessToken?: string | null) {
  const options: ApiRequestOptions = {
    method: "GET",
  }
  if (accessToken) {
    options.token = accessToken
  }
  return apiRequest<CourseDetailResponse>(`courses/${courseId}/details/`, options)
}

export function getCourseWorkflow(accessToken: string, courseId: number | string) {
  return apiRequest<CourseWorkflowEntity>(`courses/${courseId}/update/`, {
    method: "GET",
    token: accessToken,
  })
}
