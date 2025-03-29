"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, ThumbsUp, ThumbsDown, Share2, ArrowLeft } from "lucide-react"
import { playableGamesData } from "@/data/games"

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
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userRated, setUserRated] = useState(false)

  const game = playableGamesData.find((game) => game.id === params.id)

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

  const handleLike = () => {
    if (!userRated) {
      setLikes(likes + 1)
      setUserRated(true)
    }
  }

  const handleDislike = () => {
    if (!userRated) {
      setDislikes(dislikes + 1)
      setUserRated(true)
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
          </div>

          {/* Game iframe container with dynamic sizing */}
          <div
            className={`mb-8 transition-all duration-300 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden ${
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

          {/* Game actions */}
          <div className="flex flex-wrap gap-4 mb-8">
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
            <Button variant="outline" size="sm" className="gap-2 ml-auto" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

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

