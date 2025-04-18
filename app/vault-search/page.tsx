"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, History, Sparkles, X, Clock, Newspaper, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { gamesData } from "@/data/games"

export default function VaultSearch() {
  const [query, setQuery] = useState("")
  const [gameResults, setGameResults] = useState<any[]>([])
  const [newsResults, setNewsResults] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState(["gaming news", "best RPG games 2023", "indie game developers"])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Perform search when query changes
  useEffect(() => {
    if (hasSearched && query.trim()) {
      performSearch(query)
    }
  }, [query, hasSearched])

  const performSearch = (searchQuery: string) => {
    setIsSearching(true)

    // Normalize search query - make it case insensitive and handle special characters
    const normalizedQuery = searchQuery
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .trim()
    const queryTerms = normalizedQuery.split(/\s+/)

    // Search in games data - match if ANY term is found
    setTimeout(() => {
      // Game search
      const gameMatches = gamesData.filter((game) => {
        const gameTitle = game.title.toLowerCase()
        const gameDesc = game.description.toLowerCase()
        const gameGenres = game.genres.join(" ").toLowerCase()

        // Check if any query term matches
        return queryTerms.some(
          (term) => gameTitle.includes(term) || gameDesc.includes(term) || gameGenres.includes(term),
        )
      })

      setGameResults(gameMatches)

      // Simulate news search results
      const mockNewsResults = [
        {
          id: "news1",
          title: `Latest updates on ${searchQuery}`,
          source: "GameSpot",
          date: "2 hours ago",
          snippet: `Recent developments in the ${searchQuery} scene have shown promising trends...`,
          url: "https://www.gamespot.com",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "news2",
          title: `${searchQuery} industry insights`,
          source: "IGN",
          date: "1 day ago",
          snippet: `Industry experts weigh in on the future of ${searchQuery} and what it means for gamers...`,
          url: "https://www.ign.com",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "news3",
          title: `Why ${searchQuery} matters in 2023`,
          source: "Polygon",
          date: "3 days ago",
          snippet: `An in-depth analysis of ${searchQuery} and its impact on the gaming landscape...`,
          url: "https://www.polygon.com",
          image: "/placeholder.svg?height=200&width=300",
        },
      ]

      setNewsResults(mockNewsResults)
      setIsSearching(false)
    }, 800)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setHasSearched(true)
      performSearch(query)

      // Add to recent searches if not already there
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches.slice(0, 4)])
      }
    }
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== search))
  }

  const handleGoogleSearch = () => {
    if (query.trim()) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + " gaming")}`
      window.open(googleSearchUrl, "_blank")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="content-container-wide mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="mb-2">Vault Search</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Search across the gaming universe</p>
            </div>
            <Link href="/" className="text-sm font-medium">
              ← Back to Vaultican
            </Link>
          </div>

          {/* Main Search */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8 mb-8 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Find Anything Gaming Related</h2>
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for games, news, mods, tools, guides, communities..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 py-6 text-lg rounded-full"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Searching...
                      </span>
                    ) : (
                      "Search"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{isSearching ? "Searching..." : `Results for "${query}"`}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {gameResults.length + newsResults.length} results found
                  </span>
                  <Button variant="outline" size="sm" onClick={handleGoogleSearch}>
                    <Globe className="h-4 w-4 mr-1" />
                    Search Google
                  </Button>
                </div>
              </div>

              {isSearching ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
              ) : gameResults.length === 0 && newsResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">No results found for "{query}"</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Try different keywords or browse categories below
                  </p>
                  <Button variant="outline" className="mt-4" onClick={handleGoogleSearch}>
                    <Globe className="h-4 w-4 mr-2" />
                    Search on Google
                  </Button>
                </div>
              ) : (
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All Results ({gameResults.length + newsResults.length})</TabsTrigger>
                    <TabsTrigger value="games">Games ({gameResults.length})</TabsTrigger>
                    <TabsTrigger value="news">News ({newsResults.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {gameResults.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-4 flex items-center">
                          <Search className="h-5 w-5 mr-2 text-purple-500" />
                          Games
                        </h4>
                        <div className="space-y-6">
                          {gameResults.slice(0, 3).map((result) => (
                            <div
                              key={result.id}
                              className="flex flex-col md:flex-row gap-4 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
                            >
                              <div className="md:w-1/4 aspect-video relative rounded-md overflow-hidden">
                                <Image
                                  src={result.image || "/placeholder.svg?height=200&width=400"}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {result.genres.slice(0, 3).map((genre: string) => (
                                    <span
                                      key={genre}
                                      className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md"
                                    >
                                      {genre}
                                    </span>
                                  ))}
                                </div>
                                <h4 className="text-xl font-medium mb-2">{result.title}</h4>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-4">{result.description}</p>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    <Clock className="h-4 w-4" />
                                    <span>Released: {result.releaseDate}</span>
                                  </div>
                                  <Link
                                    href={`/gcatalog/games/${result.id}`}
                                    className="text-sm font-medium text-purple-600 hover:text-purple-700"
                                  >
                                    View Details →
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {gameResults.length > 3 && (
                          <div className="mt-4 text-center">
                            <Button variant="outline" onClick={() => setActiveTab("games")}>
                              View All Game Results
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {newsResults.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-lg font-medium mb-4 flex items-center">
                          <Newspaper className="h-5 w-5 mr-2 text-purple-500" />
                          News
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {newsResults.map((news) => (
                            <a
                              key={news.id}
                              href={news.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow no-underline"
                            >
                              <div className="aspect-video relative">
                                <Image
                                  src={news.image || "/placeholder.svg"}
                                  alt={news.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h5 className="font-medium mb-1 text-zinc-900 dark:text-zinc-100">{news.title}</h5>
                                <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                                  <span className="font-medium">{news.source}</span>
                                  <span className="mx-2">•</span>
                                  <span>{news.date}</span>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{news.snippet}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="games">
                    <div className="space-y-6">
                      {gameResults.length > 0 ? (
                        gameResults.map((result) => (
                          <div
                            key={result.id}
                            className="flex flex-col md:flex-row gap-4 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
                          >
                            <div className="md:w-1/4 aspect-video relative rounded-md overflow-hidden">
                              <Image
                                src={result.image || "/placeholder.svg?height=200&width=400"}
                                alt={result.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2 mb-2">
                                {result.genres.slice(0, 3).map((genre: string) => (
                                  <span
                                    key={genre}
                                    className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-md"
                                  >
                                    {genre}
                                  </span>
                                ))}
                              </div>
                              <h4 className="text-xl font-medium mb-2">{result.title}</h4>
                              <p className="text-zinc-600 dark:text-zinc-400 mb-4">{result.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                  <Clock className="h-4 w-4" />
                                  <span>Released: {result.releaseDate}</span>
                                </div>
                                <Link
                                  href={`/gcatalog/games/${result.id}`}
                                  className="text-sm font-medium text-purple-600 hover:text-purple-700"
                                >
                                  View Details →
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-zinc-600 dark:text-zinc-400">No game results found for "{query}"</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="news">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {newsResults.length > 0 ? (
                        newsResults.map((news) => (
                          <a
                            key={news.id}
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow no-underline"
                          >
                            <div className="aspect-video relative">
                              <Image
                                src={news.image || "/placeholder.svg"}
                                alt={news.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h5 className="font-medium mb-1 text-zinc-900 dark:text-zinc-100">{news.title}</h5>
                              <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                                <span className="font-medium">{news.source}</span>
                                <span className="mx-2">•</span>
                                <span>{news.date}</span>
                              </div>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400">{news.snippet}</p>
                            </div>
                          </a>
                        ))
                      ) : (
                        <div className="text-center py-12 col-span-3">
                          <p className="text-zinc-600 dark:text-zinc-400">No news results found for "{query}"</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && !hasSearched && (
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-zinc-500" />
                  <h3 className="text-lg font-medium">Recent Searches</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRecentSearches([])}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  Clear All
                </Button>
              </div>
              <ul className="space-y-2">
                {recentSearches.map((search, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 last:border-0 py-2"
                  >
                    <button
                      onClick={() => {
                        setQuery(search)
                        setHasSearched(true)
                        performSearch(search)
                      }}
                      className="text-left hover:text-purple-600 flex-grow"
                    >
                      {search}
                    </button>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Categories */}
          {!hasSearched && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium mb-3">Games</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Find games across all platforms, genres, and stores
                </p>
                <Link href="/gcatalog/games">
                  <Button variant="outline" className="w-full">
                    Browse Games
                  </Button>
                </Link>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium mb-3">Categories</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">Browse games by genre, style, and theme</p>
                <Link href="/gcatalog/categories">
                  <Button variant="outline" className="w-full">
                    Explore Categories
                  </Button>
                </Link>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium mb-3">Playable Games</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">Play games directly in your browser</p>
                <Link href="/gcatalog/play">
                  <Button variant="outline" className="w-full">
                    Play Now
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* AI Search Suggestion */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 dark:bg-purple-800/30 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Try AI-Powered Search</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Get more accurate results with our AI-powered search. Ask questions in natural language and get
                  personalized recommendations.
                </p>
                <Link href="/vault-ai">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Try AI Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
