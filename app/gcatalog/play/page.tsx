"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Gamepad2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { playableGamesData } from "@/data/games"

export default function PlayGames() {
  const router = useRouter()
  const [games, setGames] = useState(playableGamesData)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Arcade", "Puzzle", "Strategy", "Board", "Card", "Action", "Adventure", "Sports"]

  // Filter games by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setGames(playableGamesData)
    } else {
      const filtered = playableGamesData.filter((game) => game.category === selectedCategory)
      setGames(filtered)
    }
  }, [selectedCategory])

  const handleGameSelect = (gameId: string) => {
    // Navigate to the dedicated game page
    router.push(`/play/${gameId}`)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8">Play Games Online</h1>

          {/* Game categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Game Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    selectedCategory === category
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <h3 className="text-lg">{category}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Game selection grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {selectedCategory === "All" ? "All Games" : `${selectedCategory} Games`}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                {games.length} {games.length === 1 ? "game" : "games"} available
              </p>
            </div>

            {games.length === 0 ? (
              <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <h3 className="text-xl mb-2">No games found</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  There are no games in the {selectedCategory} category yet.
                </p>
                <Button onClick={() => setSelectedCategory("All")}>View All Games</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleGameSelect(game.id)}
                  >
                    <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Gamepad2 className="w-12 h-12 text-zinc-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="mb-1">{game.title}</h3>
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                          {game.category}
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">{game.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleGameSelect(game.id)
                        }}
                      >
                        Play Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
