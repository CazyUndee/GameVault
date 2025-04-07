"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Heart, BookmarkPlus, ShoppingCart, MessageSquare, Reply } from 'lucide-react'
import { gamesData } from "@/data/games"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { getUserId } from "@/lib/user-id"
import { getLikes, getDislikes, getUserRating, type Comment } from "@/lib/kv"
import { Input } from "@/components/ui/input"

// Function to get the correct link for a similar game
const getSimilarGameLink = (game: { id: string; title: string; type: string }) => {
  if (game.type === "playable") {
    return `/gcatalog/play/${game.id}`
  } else {
    return `/gcatalog/games/${game.id}`
  }
}

// Function to generate a shop URL based on the game title and platforms
const getShopUrl = (game: any) => {
  const encodedTitle = encodeURIComponent(game.title)

  // Check if the game is available on PC (Steam)
  if (game.platforms.includes("PC")) {
    return `https://store.steampowered.com/search/?term=${encodedTitle}`
  }

  // Check if the game is available on PlayStation
  if (game.platforms.includes("PlayStation")) {
    return `https://store.playstation.com/en-us/search/${encodedTitle}`
  }

  // Check if the game is available on Xbox
  if (game.platforms.includes("Xbox")) {
    return `https://www.xbox.com/en-US/games/store/search?q=${encodedTitle}`
  }

  // Check if the game is available on Switch
  if (game.platforms.includes("Switch")) {
    return `https://www.nintendo.com/store/search/?q=${encodedTitle}&p=1&cat=gme&sort=df`
  }

  // Default to Steam if no specific platform is found
  return `https://store.steampowered.com/search/?term=${encodedTitle}`
}

export default function GameDetails({ params }: { params: { id: string } }) {
  const game = gamesData.find((game) => game.id === params.id)
  const { user, addFavorite, removeFavorite, addToWishlist, removeFromWishlist } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userRating, setUserRating] = useState<string | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<{ id: string; user: string } | null>(null)
  const [showComments, setShowComments] = useState(false)
  const commentInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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
        const currentUserRating = await getUserRating(userId, game.id)

        setLikes(likesCount)
        setDislikes(dislikesCount)
        setUserRating(currentUserRating)

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading ratings:", error)
        setIsLoading(false)
      }
    }

    async function loadComments() {
      try {
        setCommentsLoading(true)

        const response = await fetch(`/gcatalog/api/comments?contentId=${game.id}`)
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

  // Focus on comment input when replying
  useEffect(() => {
    if (replyTo && commentInputRef.current) {
      commentInputRef.current.focus()
    }
  }, [replyTo])

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-4">Game Not Found</h1>
            <p className="mb-8">The game you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/gcatalog/games"
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

  // Get the shop URL for this game
  const shopUrl = getShopUrl(game)

  // Check if user is favorited
  const isFavorite = user ? user.favorites.includes(game.id) : false
  const isWishlisted = user ? user.wishlist.includes(game.id) : false

  // Handle like
  const handleLike = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    const userId = getUserId()

    try {
      const response = await fetch("/gcatalog/api/ratings", {
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
        setLikes(data.likes)
        setDislikes(data.dislikes)
        setUserRating(data.userRating)
      }
    } catch (error) {
      console.error("Error liking game:", error)
    }
  }

  // Handle dislike
  const handleDislike = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    const userId = getUserId()

    try {
      const response = await fetch("/gcatalog/api/ratings", {
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
        setLikes(data.likes)
        setDislikes(data.dislikes)
        setUserRating(data.userRating)
      }
    } catch (error) {
      console.error("Error disliking game:", error)
    }
  }

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

  // Handle wishlist toggle
  const handleToggleWishlist = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (isWishlisted) {
      await removeFromWishlist(game.id)
    } else {
      await addToWishlist(game.id)
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

  // Handle submit comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!newComment.trim() || !game) return

    try {
      const response = await fetch("/gcatalog/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: game.id,
          user: user.username,
          text: replyTo ? `@${replyTo.user} ${newComment}` : newComment,
          parentId: replyTo?.id,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
        setNewComment("")
        setReplyTo(null)
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  // Handle comment rating
  const handleCommentRating = async (commentId: string, action: string) => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!game) return

    const userId = getUserId()

    try {
      const response = await fetch("/gcatalog/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: game.id,
          commentId,
          userId,
          action,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      }
    } catch (error) {
      console.error("Error rating comment:", error)
    }
  }

  // Handle reply to comment
  const handleReplyToComment = (commentId: string, username: string) => {
    setReplyTo({ id: commentId, user: username })
    setShowComments(true)

    // Scroll to comment form
    setTimeout(() => {
      commentInputRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  // Cancel reply
  const handleCancelReply = () => {
    setReplyTo(null)
  }

  // Render comments recursively
  const renderComments = (comments: Comment[], level = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} className={`comment ${level > 0 ? "ml-6 mt-3" : "mt-4"}`}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-medium">{comment.user}</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{new Date(comment.date).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCommentRating(comment.id, userRating === "like" ? "unlike" : "like")}
              className={`flex items-center gap-1 text-xs ${
                comment.userRating === "like"
                  ? "text-blue-500"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <ThumbsUp className="w-3 h-3" /> {comment.likes}
            </button>
            <button
              onClick={() => handleCommentRating(comment.id, userRating === "dislike" ? "undislike" : "dislike")}
              className={`flex items-center gap-1 text-xs ${
                comment.userRating === "dislike"
                  ? "text-red-500"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <ThumbsDown className="w-3 h-3" /> {comment.dislikes}
            </button>
            <button
              onClick={() => handleReplyToComment(comment.id, comment.user)}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Reply className="w-3 h-3" /> Reply
            </button>
          </div>
        </div>

        <p className="text-sm">
          {comment.mentions?.map((mention) => (
            <span key={mention} className="text-blue-500">
              @{mention}{" "}
            </span>
          ))}
          {comment.mentions ? comment.text.replace(/@\w+/g, "") : comment.text}
        </p>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 border-l-2 border-zinc-200 dark:border-zinc-700 pl-4">
            {renderComments(comment.replies, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="content-container-wide mx-auto">
          <div className="mb-6">
            <Link
              href="/gcatalog/games"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              ← Back to Games
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                  />
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <h1 className="mb-4">{game.title}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="px-2 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium rounded-md">
                  {game.rating}/10
                </div>
                <div className="text-zinc-500 dark:text-zinc-400">Released: {game.releaseDate}</div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 mb-6">{game.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Developer</h3>
                  <p>{game.developer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Publisher</h3>
                  <p>{game.publisher}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Platforms</h3>
                  <p>{game.platforms.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Price</h3>
                  <p>{game.price}</p>
                </div>
              </div>

              {/* Game actions */}
              <div className="flex flex-wrap gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${userRating === "like" ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" : ""}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Like {likes > 0 && `(${likes})`}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${userRating === "dislike" ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" : ""}`}
                  onClick={handleDislike}
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
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${isWishlisted ? "text-blue-500" : ""}`}
                  onClick={handleToggleWishlist}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>

              <a href={shopUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Game
                </Button>
              </a>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-4">About</h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p>{game.longDescription}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-4">Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {game.screenshots.map((screenshot, index) => (
                <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    alt={`${game.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
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
                <div className="space-y-4 mb-6">{renderComments(comments)}</div>
              )}

              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-1">
                    {replyTo ? `Reply to @${replyTo.user}` : "Your Comment"}
                  </label>

                  {replyTo && (
                    <div className="flex justify-between items-center mb-2 p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-md">
                      <span className="text-sm">
                        Replying to <span className="font-medium">@{replyTo.user}</span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelReply}
                        className="h-6 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  <Input
                    id="comment"
                    ref={commentInputRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full"
                    required
                    placeholder={user ? "Write your comment..." : "Login to comment"}
                    disabled={!user}
                  />
                </div>
                <Button type="submit" disabled={!user}>
                  {user ? (replyTo ? "Post Reply" : "Post Comment") : "Login to Comment"}
                </Button>
              </form>
            </div>
          )}

          {/* Similar games */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Similar Games You Might Enjoy</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {game.similarGames.map((similarGame) => (
                <Link
                  key={similarGame.id}
                  href={getSimilarGameLink(similarGame)}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow no-underline"
                  scroll={true}
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

          {game.systemRequirements && (
            <div>
              <h2 className="mb-4">System Requirements</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                  <h3 className="mb-4">Minimum</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">OS:</span>
                      <span>{game.systemRequirements.minimum.os}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Processor:</span>
                      <span>{game.systemRequirements.minimum.processor}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Memory:</span>
                      <span>{game.systemRequirements.minimum.memory}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Graphics:</span>
                      <span>{game.systemRequirements.minimum.graphics}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Storage:</span>
                      <span>{game.systemRequirements.minimum.storage}</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                  <h3 className="mb-4">Recommended</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">OS:</span>
                      <span>{game.systemRequirements.recommended.os}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Processor:</span>
                      <span>{game.systemRequirements.recommended.processor}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Memory:</span>
                      <span>{game.systemRequirements.recommended.memory}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Graphics:</span>
                      <span>{game.systemRequirements.recommended.graphics}</span>
                    </li>
                    <li className="flex">
                      <span className="w-24 text-zinc-500 dark:text-zinc-400">Storage:</span>
                      <span>{game.systemRequirements.recommended.storage}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Login prompt modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Login Required</h3>
            <p className="mb-6">

