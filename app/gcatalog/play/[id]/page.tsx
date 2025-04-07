"use client"

import type React from "react"

import { useState, useMemo, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, ThumbsUp, ThumbsDown, Share2, ArrowLeft, MessageSquare, Heart } from "lucide-react"
import { playableGamesData } from "@/data/games"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

// Add these imports at the top
import { getUserId } from "@/lib/user-id"
import { getLikes, getDislikes, getUserRating, type Comment } from "@/lib/kv"

// Function to get the correct link for a similar game
const getSimilarGameLink = (game: { id: string; title: string; type: string }) => {
  if (game.type === "playable") {
    return `/play/${game.id}`
  } else {
    return `/games/${game.id}`
  }
}

export default function PlayGame({ params }: { params: { id: string } }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  // Replace the state hooks for likes and dislikes to include data loading
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userRated, setUserRated] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const pointsInterval = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const { user, addPoints, addFavorite, removeFavorite } = useAuth()

  const game = playableGamesData.find((game) => game.id === params.id)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.id])

  // Update useEffect to load data from the server
  useEffect(() => {
    if (!game) return

    const userId = getUserId()

    async function loadRatings() {
      try {
        setIsLoading(true)

        // Get likes and dislikes
        const likesCount = await getLikes(game.id)
        const dislikesCount = await getDislikes(game.id)
        const userRating = await getUserRating(userId, game.id)

        setLikes(likesCount)
        setDislikes(dislikesCount)
        setUserRated(!!userRating)

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading ratings:", error)
        setIsLoading(false)
      }
    }

    async function loadComments() {
      try {
        setCommentsLoading(true)

        const response = await fetch(`/api/comments?contentId=${game.id}`)
        if (response.ok) {
          const data = await response.json()
          setComments(data.comments || [])
        }

        setCommentsLoading(false)
      } catch (error) {
        console.error("Error loading comments:", error)
        setCommentsLoading(false)
      }
    }

    loadRatings()
    loadComments()
  }, [game])

  // Update the points system to ensure points are properly synced
  useEffect(() => {
    // Only start earning points if user is logged in and game is not in fullscreen
    if (user && !isFullscreen) {
      // Clear any existing interval
      if (pointsInterval.current) {
        clearInterval(pointsInterval.current)
      }

      // Set up points earning (1 point per second)
      let localPointsEarned = 0
      pointsInterval.current = setInterval(() => {
        localPointsEarned += 1
        setPointsEarned((prev) => prev + 1)

        // Every 5 seconds, update the user's points in the database
        if (localPointsEarned % 5 === 0) {
          addPoints(5)
          console.log("Points added:", 5)
        }
      }, 1000)

      return () => {
        if (pointsInterval.current) {
          clearInterval(pointsInterval.current)
          // Add any remaining points
          if (localPointsEarned % 5 > 0) {
            const remainingPoints = localPointsEarned % 5
            addPoints(remainingPoints)
            console.log("Remaining points added:", remainingPoints)
          }
        }
      }
    }
  }, [user, isFullscreen, addPoints])

  // Use useMemo to calculate styles instead of useState + useEffect
  const { iframeContainerStyle, iframeStyle } = useMemo(() => {
    if (!game || isFullscreen) {
      return { iframeContainerStyle: {}, iframeStyle: {} }
    }

    const containerStyle: any = {}
    const frameStyle: any = {}

    // Set width based on preference
    if (game.preferredWidth === "small") {
      containerStyle.maxWidth = "500px"
      containerStyle.margin = "0 auto"
    } else if (game.preferredWidth === "medium") {
      containerStyle.maxWidth = "700px"
      containerStyle.margin = "0 auto"
    } else if (game.preferredWidth === "large") {
      containerStyle.maxWidth = "1000px"
      containerStyle.margin = "0 auto"
    }

    // Set aspect ratio or specific dimensions
    if (game.iframeHeight && game.iframeWidth) {
      // Use specific dimensions if provided
      containerStyle.height = `${game.iframeHeight}px`
      containerStyle.width = `${game.iframeWidth}px`
      containerStyle.maxWidth = "100%"

      // Make container responsive
      containerStyle.position = "relative"
      frameStyle.position = "absolute"
      frameStyle.top = 0
      frameStyle.left = 0
      frameStyle.width = "100%"
      frameStyle.height = "100%"
    } else {
      // Use aspect ratio if dimensions not provided
      if (game.aspectRatio === "square") {
        containerStyle.aspectRatio = "1/1"
      } else if (game.aspectRatio === "portrait") {
        containerStyle.aspectRatio = "2/3"
      } else {
        // Default to widescreen
        containerStyle.aspectRatio = "16/9"
      }
    }

    // Add padding if specified
    if (game.iframePadding) {
      containerStyle.padding = "12px"
    }

    // Add border styling
    containerStyle.border = "1px solid rgba(var(--primary), 0.2)"
    containerStyle.borderRadius = "0.5rem"
    containerStyle.overflow = "hidden"

    return { iframeContainerStyle: containerStyle, iframeStyle: frameStyle }
  }, [game, isFullscreen])

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-4">Game Not Found</h1>
            <p className="mb-8">The game you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/play"
              className="px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
            >
              Back to Games
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Check if user is favorited
  const isFavorite = user ? user.favorites.includes(game.id) : false

  // Handle favorite toggle
  const handleToggleFavorite = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (isFavorite) {
      await removeFavorite(game.id)
    } else {
      await addFavorite(game.id)
    }
  }

  // Replace handleLike function
  const handleLike = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!userRated && game) {
      const userId = getUserId()

      try {
        const response = await fetch("/api/ratings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "like",
            contentId: game.id,
            userId,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setLikes(data.count)
          setUserRated(true)
        }
      } catch (error) {
        console.error("Error liking game:", error)
      }
    }
  }

  // Replace handleDislike function
  const handleDislike = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!userRated && game) {
      const userId = getUserId()

      try {
        const response = await fetch("/api/ratings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "dislike",
            contentId: game.id,
            userId,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setDislikes(data.count)
          setUserRated(true)
        }
      } catch (error) {
        console.error("Error disliking game:", error)
      }
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: game.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleSimilarGameClick = (gameLink: string) => {
    router.push(gameLink)
  }

  // Replace handleSubmitComment function
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!newComment.trim() || !game) return

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: game.id,
          user: user.username,
          text: newComment,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
        setNewComment("")
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  // Replace handleLikeComment function
  const handleLikeComment = async (commentId: string) => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!game) return

    try {
      const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: game.id,
          commentId: commentId,
          action: "like",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      }
    } catch (error) {
      console.error("Error liking comment:", error)
    }
  }

  // Replace handleDislikeComment function
  const handleDislikeComment = async (commentId: string) => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!game) return

    try {
      const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: game.id,
          commentId: commentId,
          action: "dislike",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      }
    } catch (error) {
      console.error("Error disliking comment:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link
              href="/play"
              className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Games
            </Link>
          </div>

          <h1 className="mb-4">{game.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
              {game.category}
            </span>
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
              {game.difficulty} Difficulty
            </span>
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
              {game.releaseYear}
            </span>

            {user && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200 text-xs rounded-md flex items-center gap-1">
                <span>+{pointsEarned} points earned</span>
              </span>
            )}
          </div>

          {/* Game iframe container with dynamic sizing */}
          <div
            className={`mb-8 transition-all duration-300 ${
              isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-zinc-900 p-4 border-0 rounded-none" : ""
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </Button>
            </div>

            <div
              className={`${isFullscreen ? "h-[calc(100%-60px)]" : ""} relative`}
              style={isFullscreen ? {} : iframeContainerStyle}
            >
              <iframe
                src={game.iframeUrl}
                title={game.title}
                className={`${isFullscreen ? "w-full h-full" : ""} border-0`}
                style={isFullscreen ? {} : iframeStyle}
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Login prompt modal */}
          {showLoginPrompt && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Login Required</h3>
                <p className="mb-6">
                  You need to be logged in to use this feature. Would you like to login or create an account?
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => {
                      setShowLoginPrompt(false)
                      router.push("/auth")
                    }}
                  >
                    Login / Signup
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowLoginPrompt(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Game actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 ${userRated && user ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleLike}
              disabled={userRated && !!user}
            >
              <ThumbsUp className="w-4 h-4" />
              Like {likes > 0 && `(${likes})`}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 ${userRated && user ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleDislike}
              disabled={userRated && !!user}
            >
              <ThumbsDown className="w-4 h-4" />
              Dislike {dislikes > 0 && `(${dislikes})`}
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowComments(!showComments)}>
              <MessageSquare className="w-4 h-4" />
              Comments {comments.length > 0 && `(${comments.length})`}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 ${isFavorite ? "text-red-500" : ""}`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Favorited" : "Favorite"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 ml-auto" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Comments section */}
          {showComments && (
            <div className="mb-8 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Comments</h3>

              {commentsLoading ? (
                <div className="text-center py-4">
                  <p className="text-zinc-500 dark:text-zinc-400">Loading comments...</p>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-zinc-500 dark:text-zinc-400">No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{comment.user}</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {new Date(comment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLikeComment(comment.id)}
                            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                          >
                            <ThumbsUp className="w-3 h-3" /> {comment.likes}
                          </button>
                          <button
                            onClick={() => handleDislikeComment(comment.id)}
                            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                          >
                            <ThumbsDown className="w-3 h-3" /> {comment.dislikes}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-1">
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
                    rows={3}
                    required
                    placeholder={user ? "Write your comment..." : "Login to comment"}
                    disabled={!user}
                  />
                </div>
                <Button type="submit" disabled={!user}>
                  {user ? "Post Comment" : "Login to Comment"}
                </Button>
              </form>
            </div>
          )}

          {/* Game details */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">About This Game</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">{game.longDescription}</p>

              <h3 className="text-lg font-medium mb-2">How to Play</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">{game.controls}</p>
            </div>

            <div>
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Game Details</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Developer</span>
                    <span className="font-medium">{game.developer}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Release Year</span>
                    <span className="font-medium">{game.releaseYear}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Category</span>
                    <span className="font-medium">{game.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Difficulty</span>
                    <span className="font-medium">{game.difficulty}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Rating</span>
                    <span className="font-medium">{game.rating}/5</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Similar games */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Similar Games You Might Enjoy</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {game.similarGames.map((similarGame) => (
                <Link
                  key={similarGame.id}
                  href={getSimilarGameLink(similarGame)}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow no-underline"
                  scroll={true}
                  onClick={() => handleSimilarGameClick(getSimilarGameLink(similarGame))}
                >
                  <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <span className="text-2xl font-bold text-zinc-400">{similarGame.title[0]}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base mb-1">{similarGame.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Similar game</p>
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                        {similarGame.type === "playable" ? "Playable" : "Game"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

