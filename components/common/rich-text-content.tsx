"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RichTextContentProps {
  value: string | null | undefined
  emptyText?: string
  className?: string
}

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "code",
  "pre",
])

export default function RichTextContent({
  value,
  emptyText = "",
  className,
}: RichTextContentProps) {
  const safeHtml = React.useMemo(() => sanitizeRichHtml(value || ""), [value])

  if (!safeHtml) {
    return emptyText ? <p className={className}>{emptyText}</p> : null
  }

  return (
    <div
      className={cn(
        "text-sm leading-relaxed text-[#666666] [&_a]:text-[#4CC0D8] [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-gray-200 [&_blockquote]:pl-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-gray-100 [&_pre]:p-2 [&_ul]:list-disc [&_ul]:pl-5",
        className
      )}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}

function sanitizeRichHtml(html: string) {
  if (!html.trim()) {
    return ""
  }

  if (!/[<>]/.test(html)) {
    return escapeHtml(html).replace(/\n/g, "<br>")
  }

  const parser = new DOMParser()
  const parsed = parser.parseFromString(html, "text/html")
  const outputDocument = document.implementation.createHTMLDocument("")
  const outputRoot = outputDocument.createElement("div")

  const sanitizeNode = (node: ChildNode, parent: HTMLElement) => {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(outputDocument.createTextNode(node.textContent || ""))
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return
    }

    const element = node as HTMLElement
    const tag = element.tagName.toLowerCase()

    if (!ALLOWED_TAGS.has(tag)) {
      Array.from(element.childNodes).forEach((childNode) => {
        sanitizeNode(childNode, parent)
      })
      return
    }

    const cleanElement = outputDocument.createElement(tag)

    if (tag === "a") {
      const href = element.getAttribute("href") || ""
      const safeHref = sanitizeHref(href)

      if (safeHref) {
        cleanElement.setAttribute("href", safeHref)
        cleanElement.setAttribute("target", "_blank")
        cleanElement.setAttribute("rel", "noopener noreferrer")
      }
    }

    Array.from(element.childNodes).forEach((childNode) => {
      sanitizeNode(childNode, cleanElement)
    })

    parent.appendChild(cleanElement)
  }

  Array.from(parsed.body.childNodes).forEach((node) => {
    sanitizeNode(node, outputRoot)
  })

  return outputRoot.innerHTML.trim()
}

function sanitizeHref(href: string) {
  const normalized = href.trim()

  if (!normalized) {
    return null
  }

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("mailto:") ||
    normalized.startsWith("tel:") ||
    normalized.startsWith("/") ||
    normalized.startsWith("#")
  ) {
    return normalized
  }

  return null
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
