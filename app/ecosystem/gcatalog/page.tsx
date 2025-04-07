"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { gamesData, playableGamesData } from "@/data/games"
import { useAuth } from "@/contexts/auth-context"
import { ChevronLeft, ChevronRight, Lock, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GCatalogPage() {
  const { user } = useAuth()
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [currentPlayableIndex, setCurrentPlayableIndex] = useState(0)
  const [currentSpecialIndex, setCurrentSpecialIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(4)

  const featuredScrollRef = useRef<HTMLDivElement>(null)
  const playableScrollRef = useRef<HTMLDivElement>(null)
  const specialScrollRef = useRef<HTMLDivElement>(null)

  // Update visible items based on screen width
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3)
      } else {
        setVisibleItems(4)
      }
    }

    updateVisibleItems()
    window.addEventListener("resize", updateVisibleItems)
    return () => window.removeEventListener("resize", updateVisibleItems)
  }, [])

  // Add scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el)
    })

    // Add staggered animation to items
    document.querySelectorAll(".stagger-container").forEach((container) => {
      const items = container.querySelectorAll(".stagger-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("revealed")
        }, index * 100)
      })
    })

    return () => {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [currentFeaturedIndex, currentPlayableIndex, currentSpecialIndex])

  // Get top rated games for featured section
  const featuredGames = [...gamesData].sort((a, b) => b.rating - a.rating).slice(0, 12)

  // Get all unique genres from games
  const allGenres = Array.from(new Set(gamesData.flatMap((game) => game.genres)))

  // Count games for each genre
  const categoryCounts = allGenres.reduce(
    (acc, genre) => {
      acc[genre] = gamesData.filter((game) => game.genres.includes(genre)).length
      return acc
    },
    {} as Record<string, number>,
  )

  // Get top categories by count
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }))

  // Special games that unlock at different point levels
  const specialGames = [
    {
      id: "special1",
      title: "Elite Racer",
      description: "A high-speed racing game with stunning graphics",
      image: "/placeholder.svg?height=300&width=500",
      pointsRequired: 300,
    },
    {
      id: "special2",
      title: "Cosmic Explorer",
      description: "Explore the vastness of space in this adventure game",
      image: "/placeholder.svg?height=300&width=500",
      pointsRequired: 300,
    },
    {
      id: "special3",
      title: "Dungeon Master",
      description: "Create and conquer dungeons in this strategy game",
      image: "/placeholder.svg?height=300&width=500",
      pointsRequired: 1000,
    },
    {
      id: "special4",
      title: "Pirate's Treasure",
      description: "Sail the high seas in search of legendary treasures",
      image: "/placeholder.svg?height=300&width=500",
      pointsRequired: 1000,
    },
    {
      id: "special5",
      title: "Zombie Apocalypse",
      description: "Survive the zombie outbreak in this horror action game",
      image: "/placeholder.svg?height=300&width=500",
      pointsRequired: 3000,
    },
    {
      id: "special6",
      title: "Fantasy Kingdom",
      description: "Build your own fantasy kingdom and defend it from invaders",
      image: "/placeholder.svg?height=300&width=500",
      pointsRequired: 3000,
    },
  ]

  // Navigation functions for featured games
  const scrollFeaturedLeft = () => {
    if (currentFeaturedIndex > 0) {
      setCurrentFeaturedIndex(currentFeaturedIndex - 1)
    }
  }

  const scrollFeaturedRight = () => {
    if (currentFeaturedIndex < featuredGames.length - visibleItems) {
      setCurrentFeaturedIndex(currentFeaturedIndex + 1)
    }
  }

  // Navigation functions for playable games
  const scrollPlayableLeft = () => {
    if (currentPlayableIndex > 0) {
      setCurrentPlayableIndex(currentPlayableIndex - 1)
    }
  }

  const scrollPlayableRight = () => {
    if (currentPlayableIndex < playableGamesData.length - visibleItems) {
      setCurrentPlayableIndex(currentPlayableIndex + 1)
    }
  }

  // Navigation functions for special games
  const scrollSpecialLeft = () => {
    if (currentSpecialIndex > 0) {
      setCurrentSpecialIndex(currentSpecialIndex - 1)
    }
  }

  const scrollSpecialRight = () => {
    if (currentSpecialIndex < specialGames.length - visibleItems) {
      setCurrentSpecialIndex(currentSpecialIndex + 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        {/* Hero Section */}
        <section className="content-container-wide mx-auto scroll-reveal">
          <div className="flex flex-col items-start mb-6">
            <h1 className="mb-2">
              GCatalog: Game Database & Reviews
              {user && <span>, {user.displayName || user.username}</span>}
            </h1>

            {user && (
              <div className="points-display text-lg mt-2">
                <Trophy size={18} />
                <span className="font-bold">{user.points}</span> points
              </div>
            )}

            <p className="text-xl mt-4 mb-8 text-zinc-700 dark:text-zinc-300">
              A comprehensive catalog of carefully curated games across all platforms and genres.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 stagger-container">
            <Link
              href="/games"
              className="px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity stagger-item"
            >
              Browse Games
            </Link>
            <Link
              href="/play"
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors stagger-item"
            >
              Play Now
            </Link>
            {user && (
              <Link
                href="/favorites"
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors stagger-item"
              >
                My Favorites
              </Link>
            )}
          </div>
        </section>

        {/* Points and Leaderboard Section - Only shown to logged in users */}
        {user && (
          <section className="content-container-wide mx-auto mt-16 scroll-reveal">
            <h2 className="mb-8">Your Gaming Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                <h3 className="text-xl mb-4">Your Points</h3>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">{user.points}</div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    <p>Play more games to earn points!</p>
                    <p className="text-sm mt-1">Unlock new games at 300, 1000, and 3000 points</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/leaderboard" className="text-sm font-medium">
                    View Leaderboard →
                  </Link>
                </div>
              </div>

              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                <h3 className="text-xl mb-4">Your Favorites</h3>
                {user.favorites.length > 0 ? (
                  <div className="space-y-2">
                    {user.favorites.slice(0, 3).map((gameId) => {
                      const game = [...gamesData, ...playableGamesData].find((g) => g.id === gameId)
                      if (!game) return null

                      return (
                        <div key={gameId} className="flex justify-between items-center">
                          <span>{game.title}</span>
                          <Link
                            href={game.category ? `/play/${game.id}` : `/games/${game.id}`}
                            className="text-xs font-medium"
                          >
                            View →
                          </Link>
                        </div>
                      )
                    })}
                    {user.favorites.length > 3 && (
                      <div className="mt-2 text-center">
                        <Link href="/favorites" className="text-sm font-medium">
                          View All Favorites →
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-zinc-600 dark:text-zinc-400">
                    You haven't added any favorites yet. Browse games and click the heart icon to add them!
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Special Games Section - Only shown to logged in users */}
        {user && (
          <section className="content-container-wide mx-auto mt-16 scroll-reveal">
            <div className="flex justify-between items-center mb-6">
              <h2 className="mb-0">Special Games</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={scrollSpecialLeft} disabled={currentSpecialIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollSpecialRight}
                  disabled={currentSpecialIndex >= specialGames.length - visibleItems}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {specialGames.map((game, index) => (
                <div
                  key={game.id}
                  className={`${index >= currentSpecialIndex && index < currentSpecialIndex + visibleItems ? "block" : "hidden"} border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden`}
                >
                  <div className="aspect-video relative">
                    <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                    {user.points < game.pointsRequired && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                        <Lock className="h-8 w-8 mb-2" />
                        <p className="text-sm font-medium">Locked</p>
                        <p className="text-xs">{game.pointsRequired - user.points} points to unlock</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1">{game.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">{game.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Requires {game.pointsRequired} points
                      </span>
                      {user.points >= game.pointsRequired ? (
                        <Button size="sm" variant="outline">
                          Play Now
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Games Section */}
        <section className="content-container-wide mx-auto mt-16 scroll-reveal">
          <div className="flex justify-between items-center mb-6">
            <h2 className="mb-0">Featured Games</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollFeaturedLeft} disabled={currentFeaturedIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollFeaturedRight}
                disabled={currentFeaturedIndex >= featuredGames.length - visibleItems}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className={`${index >= currentFeaturedIndex && index < currentFeaturedIndex + visibleItems ? "block" : "hidden"} border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow`}
              >
                <div className="aspect-video relative">
                  <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="mb-0 text-base">{game.title}</h3>
                    <div className="px-2 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium rounded-md">
                      {game.rating}/10
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2 line-clamp-2">{game.description}</p>

                  {/* Display all tags/genres */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {game.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href={`/games/${game.id}`} className="text-sm font-medium">
                      View Details →
                    </Link>
                    {user && <FavoriteButton gameId={game.id} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/games" className="inline-flex items-center text-sm font-medium">
              View All Games →
            </Link>
          </div>
        </section>

        {/* Playable Games Section */}
        <section className="content-container-wide mx-auto mt-16 scroll-reveal">
          <div className="flex justify-between items-center mb-6">
            <h2 className="mb-0">Play Games Instantly</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollPlayableLeft} disabled={currentPlayableIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPlayableRight}
                disabled={currentPlayableIndex >= playableGamesData.length - visibleItems}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {playableGamesData.map((game, index) => (
              <Link
                key={game.id}
                href={`/play/${game.id}`}
                className={`${index >= currentPlayableIndex && index < currentPlayableIndex + visibleItems ? "block" : "hidden"} border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow no-underline`}
              >
                <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <div className="text-4xl">{game.title[0]}</div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="mb-0 text-base">{game.title}</h3>
                    <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                      {game.category}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">Play instantly in your browser</p>
                  {user && (
                    <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Earn 1 point per second playing</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/play" className="inline-flex items-center text-sm font-medium">
              View All Playable Games →
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="content-container-wide mx-auto mt-16 scroll-reveal">
          <h2 className="mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-container">
            {topCategories.map((category, index) => (
              <Link
                key={category.name}
                href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                className="stagger-item border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors no-underline"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{category.count} games</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Favorite button component
function FavoriteButton({ gameId }: { gameId: string }) {
  const { user, addFavorite, removeFavorite } = useAuth()

  if (!user) return null

  const isFavorite = user.favorites.includes(gameId)

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      await removeFavorite(gameId)
    } else {
      await addFavorite(gameId)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-1 rounded-full ${isFavorite ? "text-red-500" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  )
}

