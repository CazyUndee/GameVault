"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { gamesData } from "@/data/games"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const decodedCategory = decodeURIComponent(params.category)
  const [games, setGames] = useState(gamesData)
  const [sortBy, setSortBy] = useState("newest")

  // Filter games by category
  useEffect(() => {
    const filteredGames = gamesData.filter((game) =>
      game.genres.some((genre) => genre.toLowerCase() === decodedCategory.toLowerCase()),
    )

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filteredGames.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        break
      case "oldest":
        filteredGames.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
        break
      case "a-z":
        filteredGames.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "z-a":
        filteredGames.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "rating-high":
        filteredGames.sort((a, b) => b.rating - a.rating)
        break
      case "rating-low":
        filteredGames.sort((a, b) => a.rating - b.rating)
        break
    }

    setGames(filteredGames)
  }, [decodedCategory, sortBy])

  // Format category name for display
  const formattedCategory = decodedCategory
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              href="/categories"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              ← Back to Categories
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="mb-0">{formattedCategory} Games</h1>

            <div className="flex items-center gap-4">
              <select
                className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="rating-high">Highest Rated</option>
                <option value="rating-low">Lowest Rated</option>
              </select>
            </div>
          </div>

          {games.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl mb-2">No games found</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Try a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2">{game.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">{game.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {game.genres.map((genre) => (
                        <span
                          key={genre}
                          className={`px-2 py-1 text-xs rounded-md ${
                            genre.toLowerCase() === decodedCategory.toLowerCase()
                              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Link href={`/games/${game.id}`} className="text-sm font-medium">
                        View Details →
                      </Link>
                      <div className="px-2 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium rounded-md">
                        {game.rating}/10
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

