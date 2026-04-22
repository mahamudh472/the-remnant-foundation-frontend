"use client"

import React from "react"
import Image from "next/image"
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react"

import { useFileUpload } from "@/hooks/use-file-upload"

interface ImageUploaderProps {
  onFileChange?: (file: File | null) => void
  maxSizeMB?: number
  ariaLabel?: string
  initialFile?: File | null
}

export default function ImageUploader({
  onFileChange,
  maxSizeMB = 5,
  ariaLabel,
  initialFile,
}: ImageUploaderProps) {
  const maxSize = maxSizeMB * 1024 * 1024

  const initialFiles = React.useMemo(() => {
    if (!initialFile) return []
    const url = URL.createObjectURL(initialFile)
    return [
      {
        file: initialFile,
        id: "initial",
        url,
      },
    ]
  }, [initialFile])

  // Clean up object URLs when re-memoizing or unmounting
  React.useEffect(() => {
    return () => {
      for (const f of initialFiles) {
        URL.revokeObjectURL(f.url)
      }
    }
  }, [initialFiles])

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
    initialFiles,
    onFilesChange: (nextFiles) => {
      const firstFile = nextFiles[0]?.file
      onFileChange?.(firstFile instanceof File ? firstFile : null)
    },
  })

  const previewUrl = files[0]?.preview || null

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-input p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
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
            aria-label={ariaLabel ?? "Upload image"}
            className="sr-only"
          />
          {previewUrl ? (
            <div className="absolute inset-0">
              <Image
                alt={files[0]?.file?.name || "Uploaded image"}
                className="size-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={previewUrl}
                unoptimized
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                aria-hidden="true"
                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              >
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Drop your image here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
        {previewUrl && files[0] && (
          <div className="absolute top-4 right-4">
            <button
              aria-label="Remove image"
              className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onClick={() => removeFile(files[0].id)}
              type="button"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
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
    </div>
  )
}
