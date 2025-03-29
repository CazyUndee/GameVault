import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { gamesData } from "@/data/games"

export default function Categories() {
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

  // Create categories data with counts and descriptions
  const categories = allGenres.map((genre) => {
    let description = ""

    // Add descriptions for common genres
    switch (genre) {
      case "Action RPG":
        description = "Role-playing games focused on real-time combat and character progression."
        break
      case "Open World":
        description = "Games featuring vast, explorable environments with freedom to choose where to go and what to do."
        break
      case "First-Person Shooter":
        description =
          "Action games where the player views the world from the first-person perspective of the protagonist."
        break
      case "Action-Adventure":
        description = "Games that combine elements of action games and adventure games."
        break
      case "Souls-like":
        description = "Challenging action RPGs inspired by FromSoftware's Dark Souls series."
        break
      case "Stealth":
        description = "Games that emphasize avoiding detection and strategic planning over direct confrontation."
        break
      case "Cyberpunk":
        description = "Games set in dystopian futures with advanced technology and societal breakdown."
        break
      case "Western":
        description = "Games set in the American Old West featuring cowboys, outlaws, and frontier life."
        break
      case "Survival Horror":
        description = "Games designed to scare players through atmosphere, sound design, and limited resources."
        break
      default:
        description = `Games in the ${genre} category featuring unique gameplay mechanics and themes.`
    }

    return {
      name: genre,
      count: categoryCounts[genre],
      description,
    }
  })

  // Sort categories by count (descending)
  categories.sort((a, b) => b.count - a.count)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-8">Game Categories</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:shadow-md transition-shadow no-underline"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="mb-0">{category.name}</h3>
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md">
                    {category.count} games
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

