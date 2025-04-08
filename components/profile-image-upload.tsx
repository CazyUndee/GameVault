"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileImageUploadProps {
  currentImage?: string
  onImageChange: (image: string) => void
}

export default function ProfileImageUpload({ currentImage, onImageChange }: ProfileImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.")
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreviewImage(result)
      onImageChange(result)
    }
    reader.readAsDataURL(file)
    setIsEditing(false)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    onImageChange("")
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {previewImage ? (
            <img src={previewImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
          )}
        </div>

        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="flex items-center gap-1 text-xs"
                onClick={triggerFileInput}
              >
                <Upload className="w-3 h-3" />
                Upload
              </Button>
              {previewImage && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1 text-xs"
                  onClick={handleRemoveImage}
                >
                  <X className="w-3 h-3" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">Click to change profile image</p>
    </div>
  )
}
