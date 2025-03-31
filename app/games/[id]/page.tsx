"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Heart, BookmarkPlus, ShoppingCart } from "lucide-react"
import { gamesData } from "@/data/games"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

// Function to get the correct link for a similar game
const getSimilarGameLink = (game: { id: string; title: string; type: string }) => {
  if (game.type === "playable") {
    return `/play/${game.id}`
  } else {
    return `/games/${game.id}`
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
  const [userRated, setUserRated] = useState(false)
  const router = useRouter()

  // Check if game is in favorites or wishlist
  const isFavorite = user ? user.favorites.includes(params.id) : false
  const isWishlisted = user ? user.wishlist.includes(params.id) : false

  // Load likes and dislikes
  useEffect(() => {
    if (!game) return

    // Simulate loading likes/dislikes from server
    // In a real app, this would be an API call
    const simulatedLikes = Math.floor(Math.random() * 100) + 10
    const simulatedDislikes = Math.floor(Math.random() * 20) + 1

    setLikes(simulatedLikes)
    setDislikes(simulatedDislikes)
  }, [game])

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-4">Game Not Found</h1>
            <p className="mb-8">The game you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/games"
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

  // Handle like
  const handleLike = () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!userRated) {
      setLikes(likes + 1)
      setUserRated(true)
    }
  }

  // Handle dislike
  const handleDislike = () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!userRated) {
      setDislikes(dislikes + 1)
      setUserRated(true)
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link
              href="/games"
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
                  className={`gap-2 ${userRated ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleLike}
                  disabled={userRated}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Like {likes > 0 && `(${likes})`}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${userRated ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleDislike}
                  disabled={userRated}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Dislike {dislikes > 0 && `(${dislikes})`}
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

          {/* Similar Games Section */}
          <div className="mb-12">
            <h2 className="mb-4">Similar Games You Might Enjoy</h2>
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
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Similar to {game.title}</p>
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                        {similarGame.type === "playable" ? "Playable" : "Game"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-12">
            <h2 className="mb-4">Comments</h2>
            <CommentsSection gameId={game.id} />
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

      <Footer />
    </div>
  )
}

// Create a comments component
interface Comment {
  id: string
  user: string
  text: string
  date: string
  likes: number
  dislikes: number
}

function CommentsSection({ gameId }: { gameId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const router = useRouter()

  // Load comments from the server
  useEffect(() => {
    async function loadComments() {
      try {
        setIsLoading(true)

        const response = await fetch(`/api/comments?contentId=${gameId}`)
        if (response.ok) {
          const data = await response.json()
          setComments(data.comments || [])
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading comments:", error)
        setIsLoading(false)
      }
    }

    loadComments()
  }, [gameId])

  // Replace handleSubmitComment function
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!newComment.trim()) return

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: gameId,
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

    try {
      const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: gameId,
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

    try {
      const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: gameId,
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
    // Rest of the component remains the same
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading comments...</p>
        </div>
      ) : (
        <>
          {comments.length === 0 ? (
            <div className="text-center py-8 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
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

          <form
            onSubmit={handleSubmitComment}
            className="space-y-4 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
          >
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
        </>
      )}

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
    </div>
  )
}

