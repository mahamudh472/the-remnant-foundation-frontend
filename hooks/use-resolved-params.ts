import { useParams, usePathname } from "next/navigation"

export function useResolvedParams<T extends Record<string, string>>(): T {
  const params = useParams() as T
  const pathname = usePathname()

  if (!pathname) {
    return params
  }

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) {
    return params
  }

  let lastSegment = segments[segments.length - 1]
  try {
    lastSegment = decodeURIComponent(lastSegment)
  } catch (e) {
    // Fallback if URL decoding fails
  }

  const paramKeys = Object.keys(params || {})
  if (paramKeys.length > 0) {
    const overriddenParams = { ...params }
    for (const key of paramKeys) {
      overriddenParams[key as keyof T] = lastSegment as any
    }
    return overriddenParams
  }

  return params
}
