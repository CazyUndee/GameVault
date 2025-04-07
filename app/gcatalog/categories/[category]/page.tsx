import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { gamesData } from "@/data/games"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = decodeURIComponent(params.category).toLowerCase()

  // Find all games in this category
  const categoryGames = gamesData.filter((game) => game.genres.some((genre) => genre.toLowerCase() === categoryName))

  // Get the proper case for the category name from the first matching game
  const properCategoryName =
    categoryGames.length > 0
      ? categoryGames[0].genres.find((genre) => genre.toLowerCase() === categoryName)
      : categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link href="/gcatalog/categories" className="text-sm font-medium">
              ← Back to Categories
            </Link>
            <h1 className="mt-4">{properCategoryName} Games</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Showing {categoryGames.length} games in this category</p>
          </div>

          {categoryGames.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <p className="text-zinc-600 dark:text-zinc-400">No games found in this category.</p>
              <Link href="/gcatalog/categories" className="mt-4 inline-block font-medium">
                Browse all categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/gcatalog/games/${game.id}`}
                  className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-md transition-shadow no-underline"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={game.image || "/placeholder.svg?height=200&width=400"}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2">{game.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {game.genres.slice(0, 3).map((genre) => (
                        <span
                          key={genre}
                          className={`px-2 py-1 text-xs rounded-md ${
                            genre.toLowerCase() === categoryName
                              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                              : "bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">{game.description}</p>
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

