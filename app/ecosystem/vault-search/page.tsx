import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Vault Search - GameVaultX",
  description: "Simple search page",
}

// Mock data
const recommendedGames = [
  {
    id: 1,
    title: "Game 1",
    tags: ["Action", "RPG"],
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 2,
    title: "Game 2",
    tags: ["Strategy"],
    image: "/placeholder.svg?height=150&width=250",
  },
]

export default function VaultSearchPage() {
  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Vault Search</h1>

      <div className="mb-4">
        <input type="text" placeholder="Search games..." className="w-full p-2 border rounded" />
        <Button className="mt-2">Search</Button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Recommended Games</h2>
        {recommendedGames.map((game) => (
          <div key={game.id} className="border p-2 mb-2 rounded">
            <h3>{game.title}</h3>
            <div className="flex gap-1 mt-1">
              {game.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
