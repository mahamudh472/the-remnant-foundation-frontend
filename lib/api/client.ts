import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth/cookies"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
const AUTH_STORAGE_KEY = "remnant-auth-store"
const TOKEN_REFRESH_PATH = "accounts/token/refresh"
const NGROK_SKIP_BROWSER_WARNING_HEADER = {
  "ngrok-skip-browser-warning": "1",
}
const AUTH_ROUTE_PREFIXES = [
  "/login",
  "/signup",
  "/create-account",
  "/forgot-password",
  "/otp",
]

interface PersistedAuthEnvelope {
  state?: Record<string, unknown>
  version?: number
}

interface RefreshedTokens {
  access: string
  refresh?: string
}

interface RequestExecutionResult {
  response: Response
  data: unknown
}

let refreshTokensPromise: Promise<RefreshedTokens | null> | null = null

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown
  token?: string | null
  baseUrl?: string
}

function buildUrl(path: string, baseUrl?: string) {
  const base = baseUrl || API_BASE_URL

  if (!base) {
    throw new Error(
      `Missing ${baseUrl ? "custom base URL" : "NEXT_PUBLIC_API_URL"} environment variable`
    )
  }

  const normalizedPath = path.replace(/^\//, "")
  return `${base.replace(/\/$/, "")}/${normalizedPath}`
}

function normalizeApiPath(path: string) {
  return path.replace(/^\/+/, "").replace(/\/+$/, "")
}

function isTokenRefreshPath(path: string) {
  return normalizeApiPath(path) === TOKEN_REFRESH_PATH
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    return response.json()
  }

  const text = await response.text()
  return text || null
}

function getMessageFromPayload(data: unknown, fallback: string) {
  if (!data) return fallback
  if (typeof data === "string") return data

  if (typeof data === "object") {
    const maybeError = data as {
      message?: string
      detail?: string
      error?: string
      non_field_errors?: string[]
      [key: string]: unknown
    }

    if (maybeError.message) return maybeError.message
    if (maybeError.detail) return maybeError.detail
    if (maybeError.error) return maybeError.error
    if (
      Array.isArray(maybeError.non_field_errors) &&
      maybeError.non_field_errors.length > 0
    ) {
      return maybeError.non_field_errors[0]
    }

    for (const value of Object.values(maybeError)) {
      if (typeof value === "string" && value.trim().length > 0) {
        return value
      }

      if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === "string"
      ) {
        return value[0]
      }
    }
  }

  return fallback
}

function buildApiError(
  response: Response,
  data: unknown,
  fallback = "Request failed"
) {
  return new ApiError(
    getMessageFromPayload(data, fallback),
    response.status,
    data
  )
}

function readPersistedAuthEnvelope() {
  if (typeof window === "undefined") return null

  try {
    const serialized = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!serialized) return null

    const parsed = JSON.parse(serialized)
    if (!isObjectRecord(parsed)) return null

    return parsed as PersistedAuthEnvelope
  } catch {
    return null
  }
}

function getPersistedAuthToken(key: "accessToken" | "refreshToken") {
  const persisted = readPersistedAuthEnvelope()
  const value = persisted?.state?.[key]

  if (typeof value === "string" && value.trim().length > 0) {
    return value
  }

  return null
}

function getPreferredAccessToken(token: string | null | undefined) {
  if (typeof token === "string" && token.trim().length > 0) {
    return token
  }

  const persistedAccessToken = getPersistedAuthToken("accessToken")
  return persistedAccessToken ?? null
}

function persistRefreshedTokens(tokens: RefreshedTokens) {
  if (typeof window === "undefined") return

  try {
    const persisted = readPersistedAuthEnvelope()
    const previousState =
      persisted && isObjectRecord(persisted.state) ? persisted.state : {}
    const existingRefreshToken =
      typeof previousState.refreshToken === "string"
        ? previousState.refreshToken
        : null

    const nextState = {
      ...previousState,
      accessToken: tokens.access,
      refreshToken: tokens.refresh ?? existingRefreshToken,
      isLoggedIn: true,
    }

    const nextPersisted: PersistedAuthEnvelope = {
      ...(persisted ?? {}),
      version:
        persisted && typeof persisted.version === "number"
          ? persisted.version
          : 0,
      state: nextState,
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextPersisted))
    setAuthTokenCookie(tokens.access)
  } catch {
    // Ignore localStorage persistence errors.
  }
}

function clearPersistedAuthState() {
  if (typeof window === "undefined") return

  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Ignore localStorage cleanup errors.
  }

  clearAuthTokenCookie()
}

async function syncInMemoryAuthState(tokens: RefreshedTokens) {
  if (typeof window === "undefined") return

  try {
    const { useAuthStore } = await import("@/lib/store/auth-store")
    useAuthStore.setState((state) => ({
      accessToken: tokens.access,
      refreshToken: tokens.refresh ?? state.refreshToken,
      isLoggedIn: true,
    }))
  } catch {
    // Ignore in-memory auth sync errors.
  }
}

async function clearInMemoryAuthState() {
  if (typeof window === "undefined") return

  try {
    const { useAuthStore } = await import("@/lib/store/auth-store")
    useAuthStore.getState().logout()
  } catch {
    // Ignore in-memory auth cleanup errors.
  }
}

function redirectToLogin() {
  if (typeof window === "undefined") return

  const loginUrl = new URL("/login", window.location.origin)
  const currentPath = `${window.location.pathname}${window.location.search}`

  if (
    currentPath.startsWith("/") &&
    !currentPath.startsWith("//") &&
    !AUTH_ROUTE_PREFIXES.some(
      (prefix) =>
        currentPath === prefix ||
        currentPath.startsWith(`${prefix}/`) ||
        currentPath.startsWith(`${prefix}?`)
    )
  ) {
    loginUrl.searchParams.set("redirectTo", currentPath)
  }

  window.location.replace(loginUrl.toString())
}

async function invalidateAuthAndRedirectToLogin() {
  clearPersistedAuthState()
  await clearInMemoryAuthState()
  redirectToLogin()
}

async function getRefreshTokenForRefresh() {
  const persistedRefreshToken = getPersistedAuthToken("refreshToken")
  if (persistedRefreshToken) return persistedRefreshToken

  if (typeof window === "undefined") return null

  try {
    const { useAuthStore } = await import("@/lib/store/auth-store")
    return useAuthStore.getState().refreshToken
  } catch {
    return null
  }
}

async function refreshAccessToken() {
  if (typeof window === "undefined") return null

  if (refreshTokensPromise) {
    return refreshTokensPromise
  }

  refreshTokensPromise = (async () => {
    const refreshToken = await getRefreshTokenForRefresh()
    if (!refreshToken) {
      await invalidateAuthAndRedirectToLogin()
      return null
    }

    try {
      const response = await fetch(buildUrl(`${TOKEN_REFRESH_PATH}/`), {
        method: "POST",
        headers: {
          //   ...NGROK_SKIP_BROWSER_WARNING_HEADER,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      const data = await parseResponseBody(response)

      if (!response.ok) {
        await invalidateAuthAndRedirectToLogin()
        return null
      }

      if (!isObjectRecord(data) || typeof data.access !== "string") {
        await invalidateAuthAndRedirectToLogin()
        return null
      }

      const refreshedTokens: RefreshedTokens = {
        access: data.access,
        refresh: typeof data.refresh === "string" ? data.refresh : undefined,
      }

      persistRefreshedTokens(refreshedTokens)
      await syncInMemoryAuthState(refreshedTokens)

      return refreshedTokens
    } catch {
      await invalidateAuthAndRedirectToLogin()
      return null
    }
  })().finally(() => {
    refreshTokensPromise = null
  })

  return refreshTokensPromise
}

async function executeRequest(
  path: string,
  { body, headers, baseUrl, ...init }: ApiRequestOptions,
  token: string | null
): Promise<RequestExecutionResult> {
  const requestHeaders = new Headers({
    //  ...NGROK_SKIP_BROWSER_WARNING_HEADER,
    ...(headers ?? {}),
  })

  const isFormDataBody =
    typeof FormData !== "undefined" && body instanceof FormData
  const isUrlSearchParamsBody =
    typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json")
  }

  const shouldSerializeJson =
    body !== undefined &&
    body !== null &&
    typeof body !== "string" &&
    !isFormDataBody &&
    !isUrlSearchParamsBody

  if (shouldSerializeJson && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json")
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(buildUrl(path, baseUrl), {
    ...init,
    headers: requestHeaders,
    body:
      body === undefined || body === null
        ? undefined
        : shouldSerializeJson
          ? JSON.stringify(body)
          : (body as BodyInit),
  })

  const data = await parseResponseBody(response)
  return { response, data }
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
) {
  if (error instanceof ApiError) return error.message
  if (error instanceof Error) return error.message
  return fallback
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
) {
  const tokenProvided = Object.prototype.hasOwnProperty.call(options, "token")
  const effectiveToken = tokenProvided
    ? getPreferredAccessToken(options.token)
    : null

  const initialResult = await executeRequest(path, options, effectiveToken)

  if (initialResult.response.ok) {
    return initialResult.data as T
  }

  if (
    initialResult.response.status === 401 &&
    tokenProvided &&
    effectiveToken &&
    !isTokenRefreshPath(path)
  ) {
    const refreshedTokens = await refreshAccessToken()

    if (refreshedTokens?.access) {
      const retryResult = await executeRequest(
        path,
        options,
        refreshedTokens.access
      )

      if (retryResult.response.ok) {
        return retryResult.data as T
      }

      throw buildApiError(retryResult.response, retryResult.data)
    }

    if (typeof window !== "undefined") {
      return new Promise<T>(() => {})
    }
  }

  throw buildApiError(initialResult.response, initialResult.data)
}
