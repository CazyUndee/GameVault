"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { gamesData } from "@/data/games"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2 } from "lucide-react"

export default function WishlistPage() {
  const { user, isLoading, removeFromWishlist } = useAuth()
  const router = useRouter()
  const [sortBy, setSortBy] = useState("newest")

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

  // Get wishlist games
  const wishlistGames = gamesData.filter((game) => user.wishlist.includes(game.id))

  // Apply sorting
  switch (sortBy) {
    case "newest":
      wishlistGames.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      break
    case "oldest":
      wishlistGames.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
      break
    case "a-z":
      wishlistGames.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "z-a":
      wishlistGames.sort((a, b) => b.title.localeCompare(a.title))
      break
    case "price-high":
      wishlistGames.sort((a, b) => {
        const priceA = Number.parseFloat(a.price.replace(/[^0-9.]/g, ""))
        const priceB = Number.parseFloat(b.price.replace(/[^0-9.]/g, ""))
        return priceB - priceA
      })
      break
    case "price-low":
      wishlistGames.sort((a, b) => {
        const priceA = Number.parseFloat(a.price.replace(/[^0-9.]/g, ""))
        const priceB = Number.parseFloat(b.price.replace(/[^0-9.]/g, ""))
        return priceA - priceB
      })
      break
    case "rating-high":
      wishlistGames.sort((a, b) => b.rating - a.rating)
      break
    case "rating-low":
      wishlistGames.sort((a, b) => a.rating - b.rating)
      break
  }

  const handleRemoveFromWishlist = async (e: React.MouseEvent, gameId: string) => {
    e.preventDefault()
    e.stopPropagation()
    await removeFromWishlist(gameId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8">Your Wishlist</h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              {wishlistGames.length} {wishlistGames.length === 1 ? "game" : "games"} in your wishlist
            </p>

            <select
              className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="rating-high">Highest Rated</option>
              <option value="rating-low">Lowest Rated</option>
            </select>
          </div>

          {wishlistGames.length === 0 ? (
            <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h2 className="text-xl mb-2">Your wishlist is empty</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Browse games and add them to your wishlist to keep track of games you want to buy
              </p>
              <Link
                href="/games"
                className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
              >
                Browse Games
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {wishlistGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="block border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow no-underline"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 aspect-video relative">
                      <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="mb-1">{game.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {game.genres.slice(0, 3).map((genre) => (
                              <span
                                key={genre}
                                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="px-2 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium rounded-md">
                            {game.rating}/10
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            onClick={(e) => handleRemoveFromWishlist(e, game.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">{game.description}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                          Released: {new Date(game.releaseDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="font-bold">{game.price}</div>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ShoppingCart className="h-4 w-4" />
                            <span>Buy Now</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
