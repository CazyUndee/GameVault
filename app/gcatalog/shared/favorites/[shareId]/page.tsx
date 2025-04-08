"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { gamesData, playableGamesData } from "@/data/games"

export default function SharedFavoritesPage({ params }: { params: { shareId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [shareData, setShareData] = useState<any>(null)
  const [favoriteGames, setFavoriteGames] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadShareData = () => {
      try {
        setIsLoading(true)

        // Get share data from localStorage
        const sharesJson = localStorage.getItem("shares") || "{}"
        const shares = JSON.parse(sharesJson)

        if (!shares[params.shareId]) {
          setError("This shared list doesn't exist or has expired.")
          setIsLoading(false)
          return
        }

        setShareData(shares[params.shareId])

        // Get favorite games
        const favorites = shares[params.shareId].favorites || []
        const games = favorites
          .map((id: string) => {
            // Check if it's a regular game
            const game = gamesData.find((g) => g.id === id)
            if (game) return { ...game, type: "game" }

            // Check if it's a playable game
            const playable = playableGamesData.find((g) => g.id === id)
            if (playable) return { ...playable, type: "playable" }

            return null
          })
          .filter(Boolean)

        setFavoriteGames(games)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading share data:", error)
        setError("An error occurred while loading the shared list.")
        setIsLoading(false)
      }
    }

    loadShareData()
  }, [params.shareId])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p>Loading shared favorites...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h2 className="text-xl mb-2">Error</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">{error}</p>
              <Link
                href="/"
                className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
              >
                Go Home
              </Link>
            </div>
          ) : (
            <>
              <h1 className="mb-4">{shareData.username}'s Favorite Games</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                This is a list of {shareData.username}'s favorite games, shared with you.
              </p>

              {favoriteGames.length === 0 ? (
                <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <h2 className="text-xl mb-2">No favorites yet</h2>
                  <p className="text-zinc-600 dark:text-zinc-400">This user hasn't added any favorites yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteGames.map((game) => (
                    <div
                      key={game.id}
                      className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video relative">
                        {game.type === "playable" ? (
                          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <div className="text-4xl">{game.title[0]}</div>
                          </div>
                        ) : (
                          <Image
                            src={game.image || "/placeholder.svg"}
                            alt={game.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="mb-0">{game.title}</h3>
                          {game.type === "game" && (
                            <div className="px-2 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium rounded-md">
                              {game.rating}/10
                            </div>
                          )}
                          {game.type === "playable" && (
                            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                              {game.category}
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">{game.description}</p>

                        {game.type === "game" && game.genres && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {game.genres.slice(0, 3).map((genre: string) => (
                              <span
                                key={genre}
                                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <Link
                            href={game.type === "playable" ? `/play/${game.id}` : `/games/${game.id}`}
                            className="text-sm font-medium"
                          >
                            {game.type === "playable" ? "Play Now" : "View Details"} →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
                >
                  Explore GameVaultX
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
