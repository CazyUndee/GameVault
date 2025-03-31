"use client"

import { useState } from "react"
import { Share2, Copy, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function ShareFavorites() {
  const [isSharing, setIsSharing] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const { shareFavorites } = useAuth()

  const handleShare = async () => {
    setIsSharing(true)
    setError("")

    try {
      const result = await shareFavorites()

      if (result.success) {
        setShareUrl(result.shareUrl)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Error sharing favorites:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    setShareUrl("")
    setError("")
  }

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleShare}
        disabled={isSharing}
      >
        <Share2 className="w-4 h-4" />
        {isSharing ? "Generating link..." : "Share Favorites"}
      </Button>

      {shareUrl && (
        <div className="mt-4 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Share Link</h4>
            <button
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              onClick={handleClose}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800"
            />
            <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-1">
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Anyone with this link can view your favorites list.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

