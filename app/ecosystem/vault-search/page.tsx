import type { Metadata } from "next"
import { Search, Filter, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Vault Search - GameVaultX",
  description: "AI-powered game discovery engine with cross-platform tracking",
}

// Mock data for demonstration
const recommendedGames = [
  {
    id: 1,
    title: "Stellar Odyssey",
    platforms: ["Steam", "Epic Games", "Xbox"],
    matchScore: 98,
    tags: ["Space", "RPG", "Open World"],
    image: "/placeholder.svg?height=150&width=250",
    reason: "Based on your interest in space exploration games",
  },
  {
    id: 2,
    title: "Neon Shadows",
    platforms: ["Steam", "PlayStation"],
    matchScore: 92,
    tags: ["Cyberpunk", "Action", "Story-Rich"],
    image: "/placeholder.svg?height=150&width=250",
    reason: "Similar to other story-driven games in your library",
  },
  {
    id: 3,
    title: "Forgotten Kingdoms",
    platforms: ["Epic Games", "GOG"],
    matchScore: 87,
    tags: ["Fantasy", "Strategy", "Turn-Based"],
    image: "/placeholder.svg?height=150&width=250",
    reason: "Matches your preference for strategic gameplay",
  },
]

const nicheCategoryGames = [
  {
    id: 1,
    title: "Pixel Dungeon Masters",
    category: "Retro-Inspired",
    developer: "Indie Pixels",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    title: "Experimental Protocol",
    category: "Experimental",
    developer: "Future Labs",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    title: "Handcrafted Tales",
    category: "Indie Narrative",
    developer: "Story Weavers",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 4,
    title: "Quantum Puzzler",
    category: "Physics-Based",
    developer: "Mind Benders",
    image: "/placeholder.svg?height=120&width=200",
  },
]

export default function VaultSearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Vault Search</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            AI-powered game discovery engine with cross-platform tracking
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10 pr-4 py-6 text-lg" placeholder="Search for games, genres, or mechanics..." />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Search</Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            Open World
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            RPG
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            Strategy
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            Indie
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            Multiplayer
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            <Filter className="h-3 w-3 mr-1" /> More Filters
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="ai-recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="ai-recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="cross-platform">Cross-Platform Tracking</TabsTrigger>
          <TabsTrigger value="niche-categories">Niche Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-recommendations">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">AI-powered</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {recommendedGames.map((game) => (
                <div
                  key={game.id}
                  className="flex flex-col md:flex-row gap-4 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full md:w-48 h-32 object-cover rounded-md"
                  />

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{game.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{game.reason}</p>
                      </div>
                      <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 font-bold rounded-full h-10 w-10 flex items-center justify-center">
                        {game.matchScore}%
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex gap-2">
                        {game.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cross-platform">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="text-center p-8">
              <h3 className="text-xl font-medium mb-2">Connect Your Gaming Platforms</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Link your Steam, Epic Games, PlayStation, Xbox, and other accounts to track your games across platforms.
              </p>
              <Button>Connect Platforms</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="niche-categories">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nicheCategoryGames.map((game) => (
                <div
                  key={game.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      {game.category}
                    </span>
                    <h3 className="font-bold mt-1">{game.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{game.developer}</p>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Explore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
