const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")

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
}

function buildUrl(path: string) {
  if (!API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable")
  }

  const normalizedPath = path.replace(/^\//, "")
  return `${API_BASE_URL}/${normalizedPath}`
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
  }

  return fallback
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
  { body, token, headers, ...init }: ApiRequestOptions = {}
) {
  const requestHeaders = new Headers(headers)

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json")
  }

  const shouldSerializeJson =
    body !== undefined && body !== null && typeof body !== "string"

  if (shouldSerializeJson && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json")
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers: requestHeaders,
    body:
      body === undefined || body === null
        ? undefined
        : typeof body === "string"
          ? body
          : JSON.stringify(body),
  })

  const data = await parseResponseBody(response)

  if (!response.ok) {
    throw new ApiError(
      getMessageFromPayload(data, "Request failed"),
      response.status,
      data
    )
  }

  return data as T
}
