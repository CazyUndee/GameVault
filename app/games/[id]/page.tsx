import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { gamesData } from "@/data/games"

// Function to get the correct link for a similar game
const getSimilarGameLink = (game: { id: string; title: string; type: string }) => {
  if (game.type === "playable") {
    return `/play/${game.id}`
  } else {
    return `/games/${game.id}`
  }
}

export default function GameDetails({ params }: { params: { id: string } }) {
  const game = gamesData.find((game) => game.id === params.id)

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

              <Button className="w-full">Purchase Game</Button>
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

      <Footer />
    </div>
  )
}

