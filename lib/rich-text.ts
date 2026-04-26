export function normalizeRichText(value: string) {
  if (!value) {
    return ""
  }

  return value
    .replace(/\u200B/g, "")
    .replace(/<(p|div)><br\s*\/?><\/(p|div)>/gi, "")
    .replace(/<br\s*\/?>(\s*<br\s*\/?>)*/gi, "<br>")
    .trim()
}

export function stripRichText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function isRichTextEmpty(value: string) {
  return stripRichText(value).length === 0
}
