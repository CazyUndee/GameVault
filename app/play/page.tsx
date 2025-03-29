"use client"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Gamepad2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { playableGamesData } from "@/data/games"

export default function PlayGames() {
  const router = useRouter()
  const [games] = useState(playableGamesData)

  const handleGameSelect = (gameId: string) => {
    // Navigate to the dedicated game page
    router.push(`/play/${gameId}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8">Play Games Online</h1>

          {/* Game selection grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

          {/* Game categories */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Game Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {["Arcade", "Puzzle", "Strategy", "Board", "Card", "Action", "Adventure", "Sports"].map((category) => (
                <div
                  key={category}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg">{category}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

