"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { normalizeRichText } from "@/lib/rich-text"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeightClassName?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Type here...",
  className,
  minHeightClassName = "min-h-[120px]",
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    if (editor.innerHTML !== value) {
      editor.innerHTML = value || ""
    }
  }, [value])

  const emitContent = React.useCallback(() => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    onChange(normalizeRichText(editor.innerHTML))
  }, [onChange])

  const exec = React.useCallback(
    (command: string, commandValue?: string) => {
      const editor = editorRef.current

      if (!editor) {
        return
      }

      editor.focus()
      document.execCommand(command, false, commandValue)
      emitContent()
    },
    [emitContent]
  )

  const insertLink = React.useCallback(() => {
    const url = window.prompt("Enter link URL")

    if (!url) {
      return
    }

    exec("createLink", url)
  }, [exec])

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
        <ToolbarButton label="B" onClick={() => exec("bold")} />
        <ToolbarButton label="I" onClick={() => exec("italic")} />
        <ToolbarButton label="U" onClick={() => exec("underline")} />
        <ToolbarButton
          label="• List"
          onClick={() => exec("insertUnorderedList")}
        />
        <ToolbarButton
          label="1. List"
          onClick={() => exec("insertOrderedList")}
        />
        <ToolbarButton label="Link" onClick={insertLink} />
        <ToolbarButton label="Clear" onClick={() => exec("removeFormat")} />
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitContent}
        onBlur={emitContent}
        data-placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#4CC0D8]",
          minHeightClassName,
          "empty:before:pointer-events-none empty:before:text-[#9CA3AF] empty:before:content-[attr(data-placeholder)]"
        )}
      />
    </div>
  )
}

function ToolbarButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F3F4F6]"
    >
      {label}
    </button>
  )
}
