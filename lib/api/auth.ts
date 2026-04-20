import { apiRequest } from "@/lib/api/client"

export interface AuthMessageResponse {
  message: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  refresh: string
  access: string
}

export interface LogoutPayload {
  refresh_token: string
}

export interface RefreshTokenPayload {
  refresh: string
}

export interface RefreshTokenResponse {
  access: string
  refresh?: string
}

export interface RegisterPayload {
  full_name: string
  email: string
  password: string
}

export interface VerifyEmailPayload {
  email: string
  otp: string
}

export interface PasswordResetPayload {
  email: string
}

export interface ResendOtpPayload {
  email: string
}

export interface CheckOtpPayload {
  email: string
  otp: string
}

export interface PasswordResetConfirmPayload {
  email: string
  otp: string
  new_password: string
}

export interface ChangePasswordPayload {
  old_password: string
  new_password: string
  confirm_password: string
}

export interface AccountProfile {
  id: string
  email: string
  username: string | null
  full_name: string | null
  phone_number: string | null
  avatar: string | null
  gender: string | null
  age: number | null
  date_of_birth: string | null
  joined_at: string
  last_login: string | null
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  groups: Array<string | { name?: string }>
  user_permissions: Array<string | { name?: string }>
}

export interface AccountMe {
  full_name: string
  avatar: string | null
  email: string
}

export interface UpdateProfilePayload {
  full_name?: string
  phone_number?: string
}

export function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>("accounts/login/", {
    method: "POST",
    body: payload,
  })
}

export function logout(payload: LogoutPayload, accessToken: string) {
  return apiRequest<AuthMessageResponse>("accounts/logout/", {
    method: "POST",
    body: payload,
    token: accessToken,
  })
}

export function getMe(accessToken: string) {
  return apiRequest<AccountMe>("accounts/me/", {
    method: "GET",
    token: accessToken,
    cache: "no-store",
  })
}

export function refreshToken(payload: RefreshTokenPayload) {
  return apiRequest<RefreshTokenResponse>("accounts/token/refresh/", {
    method: "POST",
    body: payload,
  })
}

export function register(payload: RegisterPayload) {
  return apiRequest<AuthMessageResponse>("accounts/register/", {
    method: "POST",
    body: payload,
  })
}

export function verifyEmail(payload: VerifyEmailPayload) {
  return apiRequest<AuthMessageResponse>("accounts/verify-email/", {
    method: "POST",
    body: payload,
  })
}

export function passwordReset(payload: PasswordResetPayload) {
  return apiRequest<AuthMessageResponse>("accounts/password-reset/", {
    method: "POST",
    body: payload,
  })
}

export function resendOtp(payload: ResendOtpPayload) {
  return apiRequest<AuthMessageResponse>("accounts/resend-otp/", {
    method: "POST",
    body: payload,
  })
}

export function checkOtp(payload: CheckOtpPayload) {
  return apiRequest<AuthMessageResponse>("accounts/check-otp/", {
    method: "POST",
    body: payload,
  })
}

export function passwordResetConfirm(payload: PasswordResetConfirmPayload) {
  return apiRequest<AuthMessageResponse>("accounts/password-reset-confirm/", {
    method: "POST",
    body: payload,
  })
}

export function changePassword(
  payload: ChangePasswordPayload,
  accessToken: string
) {
  return apiRequest<AuthMessageResponse>("accounts/change-password/", {
    method: "POST",
    body: payload,
    token: accessToken,
  })
}

export function getProfile(accessToken: string) {
  return apiRequest<AccountProfile>("accounts/profile/", {
    method: "GET",
    token: accessToken,
    cache: "no-store",
  })
}

export function updateProfile(
  payload: UpdateProfilePayload,
  accessToken: string
) {
  return apiRequest<AccountProfile>("accounts/profile/update/", {
    method: "PATCH",
    body: payload,
    token: accessToken,
  })
}
