"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { ArrowRight, Database, Search, Bot, PenToolIcon as Tool, Trophy, Sparkles } from "lucide-react"

export default function HomePage() {
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  // Add animation on load
  useEffect(() => {
    setIsLoaded(true)

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

    return () => {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        {/* Hero Section */}
        <section
          className={`content-container-wide mx-auto transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-start mb-10">
            <h1 className="mb-2 flex items-center">
              Welcome to GameVaultX
              {user && <span className="ml-2">, {user.displayName || user.username}</span>}
              <Sparkles className="ml-2 h-8 w-8 text-purple-500" />
            </h1>

            {user && (
              <div className="points-display text-lg mt-2">
                <Trophy size={18} className="text-purple-500" />
                <span className="font-bold">{user.points}</span> points
              </div>
            )}

            <p className="text-xl mt-4 mb-8 text-zinc-700 dark:text-zinc-300">
              Your complete gaming ecosystem with tools, catalogs, AI features, and more.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/gcatalog"
              className="px-6 py-3 bg-purple-600 text-white rounded-md no-underline hover:bg-purple-700 transition-colors"
            >
              Explore GCatalog
            </Link>
            <Link
              href="/vault-ai"
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Try Vault AI
            </Link>
            {user && (
              <Link
                href="/vault-tools"
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Vault Tools
              </Link>
            )}
          </div>
        </section>

        {/* Ecosystem Overview */}
        <section className="content-container-wide mx-auto mt-20 scroll-reveal">
          <h2 className="mb-10 text-center">The GameVaultX Ecosystem</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* GCatalog Card */}
            <Link href="/gcatalog" className="group">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
                <div className="flex items-center mb-4">
                  <Database className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">GCatalog</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Comprehensive game database with detailed metadata, tagging system, and community-driven mod
                  recommendations.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Detailed game metadata and developer insights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Advanced tagging system for precise categorization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Custom user lists for organization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Community-driven mod recommendations</span>
                  </li>
                </ul>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  Explore GCatalog
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Vault Search Card */}
            <Link href="/vault-search" className="group">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
                <div className="flex items-center mb-4">
                  <Search className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">Vault Search</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  AI-powered game discovery engine with cross-platform tracking and specialized filters for niche
                  categories.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>AI-powered recommendations based on play history</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Cross-platform game availability tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Niche category filters for specialized discovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>System compatibility matching</span>
                  </li>
                </ul>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  Explore Vault Search
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Vault AI Card */}
            <Link href="/vault-ai" className="group">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
                <div className="flex items-center mb-4">
                  <Bot className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">Vault AI</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Experimental AI sandbox for NPC behavior modeling, lore generation, and procedural content creation.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>AI-driven NPC behavior models</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Chatbot-powered lore generators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Procedural generation tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>AI response optimization</span>
                  </li>
                </ul>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  Explore Vault AI
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Vault Tools Card */}
            <Link href="/vault-tools" className="group">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
                <div className="flex items-center mb-4">
                  <Tool className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">Vault Tools</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Performance benchmarking, modding frameworks, and hardware optimization tools for gamers.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Performance benchmarking tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Modding frameworks for game customization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Hardware efficiency calculator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Game save editors and progression tools</span>
                  </li>
                </ul>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  Explore Vault Tools
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Featured Section */}
        <section className="content-container-wide mx-auto mt-20 scroll-reveal">
          <h2 className="mb-8">Featured This Week</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=300&width=500" alt="Featured game" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl mb-2">New Game Releases</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Check out the latest games added to our catalog this week.
                </p>
                <Link href="/gcatalog" className="text-purple-600 hover:text-purple-700 font-medium">
                  Browse New Games →
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=300&width=500" alt="AI feature" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl mb-2">AI Storytelling</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Create custom game lore and narratives with our new AI tools.
                </p>
                <Link href="/vault-ai" className="text-purple-600 hover:text-purple-700 font-medium">
                  Try AI Storytelling →
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Performance tools"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl mb-2">Performance Analyzer</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Optimize your gaming setup with our new performance tools.
                </p>
                <Link href="/vault-tools" className="text-purple-600 hover:text-purple-700 font-medium">
                  Analyze Your Setup →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        {!user && (
          <section className="content-container-wide mx-auto mt-20 scroll-reveal">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl mb-4">Join GameVaultX Today</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Create an account to track your favorite games, earn points, and access exclusive features across the
                GameVaultX ecosystem.
              </p>
              <Link
                href="/auth"
                className="px-6 py-3 bg-purple-600 text-white rounded-md no-underline hover:bg-purple-700 transition-colors inline-block"
              >
                Sign Up Now
              </Link>
            </div>
          </section>
        )}

        {/* Ecosystem Diagram */}
        <section className="content-container-wide mx-auto mt-20 scroll-reveal">
          <h2 className="mb-8 text-center">How GameVaultX Works</h2>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative py-10">
                {/* Central hub */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-purple-200 dark:bg-purple-900/30 transform -translate-x-1/2"></div>

                <div className="relative z-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 w-64 mx-auto mb-16">
                  <h3 className="text-lg font-bold text-center mb-2">GameVaultX Hub</h3>
                  <p className="text-sm text-center">Central platform connecting all ecosystem components</p>
                </div>

                {/* Components */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-bold mb-2">GCatalog</h3>
                    <p className="text-sm mb-2">Game database and reviews</p>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>Game listings</li>
                      <li>Reviews & ratings</li>
                      <li>Game comparisons</li>
                      <li>Mods & customization</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-bold mb-2">Vault Search</h3>
                    <p className="text-sm mb-2">Experimental search engine</p>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>AI-powered game search</li>
                      <li>Custom indexing</li>
                      <li>Mod database search</li>
                      <li>Performance benchmarks</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                    <h3 className="text-lg font-bold mb-2">Vault AI</h3>
                    <p className="text-sm mb-2">Sandbox AI testing & experiments</p>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>Jailbreak tests</li>
                      <li>AI-driven NPC simulations</li>
                      <li>AI story generation</li>
                      <li>Response optimization</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <h3 className="text-lg font-bold mb-2">Vault Tools</h3>
                    <p className="text-sm mb-2">Calculators, utilities & enhancements</p>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>FPS calculator</li>
                      <li>Modding tools</li>
                      <li>Hardware optimization</li>
                      <li>Game save editors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
