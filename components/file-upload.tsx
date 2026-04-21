"use client"

import {
  AlertCircleIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileUpIcon,
  HeadphonesIcon,
  ImageIcon,
  VideoIcon,
  XIcon,
} from "lucide-react"

import { formatBytes, useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"

interface MultipleFileUploaderProps {
  onFilesChange?: (files: File[]) => void
  maxSize?: number
  maxFiles?: number
  multiple?: boolean
  accept?: string
  title?: string
  subtitle?: string
  ariaLabel?: string
}

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type
  const fileName = file.file instanceof File ? file.file.name : file.file.name

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileTextIcon className="size-4 opacity-60" />
  }
  if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <FileArchiveIcon className="size-4 opacity-60" />
  }
  if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <FileSpreadsheetIcon className="size-4 opacity-60" />
  }
  if (fileType.includes("video/")) {
    return <VideoIcon className="size-4 opacity-60" />
  }
  if (fileType.includes("audio/")) {
    return <HeadphonesIcon className="size-4 opacity-60" />
  }
  if (fileType.startsWith("image/")) {
    return <ImageIcon className="size-4 opacity-60" />
  }
  return <FileIcon className="size-4 opacity-60" />
}

export default function MultipleFileUploader({
  onFilesChange,
  maxSize = 100 * 1024 * 1024,
  maxFiles = 10,
  multiple = true,
  accept = "*",
  title = "Upload files",
  subtitle = "Drag & drop or click to browse",
  ariaLabel,
}: MultipleFileUploaderProps) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    multiple,
    accept,
    onFilesChange: (nextFiles) => {
      const selectedFiles = nextFiles
        .map((item) => item.file)
        .filter((item): item is File => item instanceof File)

      onFilesChange?.(selectedFiles)
    },
  })

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-input p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
        data-dragging={isDragging || undefined}
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={-1}
      >
        <input
          {...getInputProps()}
          aria-label={ariaLabel ?? "Upload files"}
          className="sr-only"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            aria-hidden="true"
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
          >
            <FileUpIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">{title}</p>
          <p className="mb-2 text-xs text-muted-foreground">{subtitle}</p>
          <div className="flex flex-wrap justify-center gap-1 text-xs text-muted-foreground/70">
            <span>{accept === "*" ? "All files" : accept}</span>
            <span>·</span>
            <span>
              Max {multiple ? maxFiles : 1} file{multiple ? "s" : ""}
            </span>
            <span>·</span>
            <span>Up to {formatBytes(maxSize)}</span>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
              key={file.id}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex size-10 shrink-0 items-center justify-center rounded border">
                  {getFileIcon(file)}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium">
                    {file.file instanceof File
                      ? file.file.name
                      : file.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(
                      file.file instanceof File
                        ? file.file.size
                        : file.file.size
                    )}
                  </p>
                </div>
              </div>

              <Button
                aria-label="Remove file"
                className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                onClick={() => removeFile(file.id)}
                size="icon"
                variant="ghost"
              >
                <XIcon aria-hidden="true" className="size-4" />
              </Button>
            </div>
          ))}

          {files.length > 1 && (
            <div>
              <Button onClick={clearFiles} size="sm" variant="outline">
                Remove all files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
