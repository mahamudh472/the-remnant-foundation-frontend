import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDisplayDate(date: string) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return "-"
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
