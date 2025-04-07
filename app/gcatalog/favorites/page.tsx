"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { gamesData, playableGamesData } from "@/data/games"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShareFavorites from "@/components/share-favorites"

export default function FavoritesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 md:px-6 py-12 md:py-20 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  // Get favorite games
  const favoriteGames = gamesData.filter((game) => user.favorites.includes(game.id))
  const favoritePlayables = playableGamesData.filter((game) => user.favorites.includes(game.id))
  const allFavorites = [...favoriteGames, ...favoritePlayables]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="mb-0">Your Favorites</h1>

            {allFavorites.length > 0 && (
              <div className="mt-4 md:mt-0">
                <ShareFavorites />
              </div>
            )}
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                All ({allFavorites.length})
              </TabsTrigger>
              <TabsTrigger value="games" onClick={() => setActiveTab("games")}>
                Games ({favoriteGames.length})
              </TabsTrigger>
              <TabsTrigger value="playables" onClick={() => setActiveTab("playables")}>
                Playables ({favoritePlayables.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {allFavorites.length === 0 ? (
                <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <h2 className="text-xl mb-2">No favorites yet</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Browse games and click the heart icon to add them to your favorites
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link
                      href="/games"
                      className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
                    >
                      Browse Games
                    </Link>
                    <Link
                      href="/play"
                      className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Play Games
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allFavorites.map((game) => (
                    <FavoriteGameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="games">
              {favoriteGames.length === 0 ? (
                <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <h2 className="text-xl mb-2">No favorite games yet</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Browse games and click the heart icon to add them to your favorites
                  </p>
                  <Link
                    href="/games"
                    className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
                  >
                    Browse Games
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteGames.map((game) => (
                    <FavoriteGameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="playables">
              {favoritePlayables.length === 0 ? (
                <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <h2 className="text-xl mb-2">No favorite playable games yet</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Browse playable games and click the heart icon to add them to your favorites
                  </p>
                  <Link
                    href="/play"
                    className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
                  >
                    Play Games
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoritePlayables.map((game) => (
                    <FavoriteGameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function FavoriteGameCard({ game }: { game: any }) {
  const { removeFavorite } = useAuth()
  const isPlayable = "category" in game

  const handleRemoveFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await removeFavorite(game.id)
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        {isPlayable ? (
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <div className="text-4xl">{game.title[0]}</div>
          </div>
        ) : (
          <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover lazy-image" />
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="mb-0">{game.title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRemoveFavorite}
              className="p-1 rounded-full text-red-500"
              aria-label="Remove from favorites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">{isPlayable ? game.description : game.description}</p>

        {isPlayable ? (
          <div className="flex justify-between items-center">
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
              {game.category}
            </span>
            <Link href={`/play/${game.id}`} className="text-sm font-medium">
              Play Now →
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {game.genres.slice(0, 3).map((genre: string) => (
              <span
                key={genre}
                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md"
              >
                {genre}
              </span>
            ))}
            <Link href={`/games/${game.id}`} className="text-sm font-medium">
              View Details →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

