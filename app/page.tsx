import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { gamesData, playableGamesData } from "@/data/games"

export default function Home() {
  // Get top rated games for featured section
  const featuredGames = [...gamesData].sort((a, b) => b.rating - a.rating).slice(0, 4)

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="mb-6">Discover Your Next Favorite Game</h1>
            <p className="text-xl mb-8 text-zinc-700 dark:text-zinc-300">
              A minimalist catalog of carefully curated games across all platforms and genres.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/games"
                className="px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md no-underline hover:opacity-90 transition-opacity"
              >
                Browse Games
              </Link>
              <Link
                href="/play"
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Play Now
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Games Section */}
        <section className="max-w-5xl mx-auto mt-24">
          <h2 className="mb-8">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredGames.map((game) => (
              <div
                key={game.id}
                className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video relative">
                  <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="mb-0">{game.title}</h3>
                    <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                      {game.genres[0]}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">{game.description}</p>
                  <Link href={`/games/${game.id}`} className="text-sm font-medium">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/games" className="inline-flex items-center text-sm font-medium">
              View All Games →
            </Link>
          </div>
        </section>

        {/* Playable Games Section */}
        <section className="max-w-5xl mx-auto mt-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="mb-0">Play Games Instantly</h2>
            <Link href="/play" className="text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playableGamesData.slice(0, 3).map((game) => (
              <Link
                key={game.id}
                href={`/play/${game.id}`}
                className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow no-underline"
              >
                <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <div className="text-4xl">{game.title[0]}</div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="mb-0">{game.title}</h3>
                    <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                      {game.category}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">Play instantly in your browser</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-5xl mx-auto mt-24">
          <h2 className="mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCategories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors no-underline"
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

