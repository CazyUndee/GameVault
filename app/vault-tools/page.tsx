"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PenTool, Code, BarChart, Zap, ChevronRight, Cpu, Gamepad2, Calculator, Wrench, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function VaultTools() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally handle the newsletter signup
    console.log("Subscribed:", email)
    setEmail("")
    alert("Thanks for subscribing! We'll notify you when Vault Tools launches.")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="mb-2">Vault Tools</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Powerful tools for gamers and developers</p>
            </div>
            <Link href="/" className="text-sm font-medium">
              ← Back to GameVaultX
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 mb-8 text-center">
            <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
              <PenTool className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-lg mx-auto">
              We're building a suite of powerful tools for gamers, developers, and content creators. Be the first to
              know when we launch!
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-zinc-700"
                required
              />
              <Button type="submit">Notify Me</Button>
            </form>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all">All Tools</TabsTrigger>
              <TabsTrigger value="gaming">Gaming</TabsTrigger>
              <TabsTrigger value="developer">Developer</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="utilities">Utilities</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gaming Tools */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                    <Gamepad2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold">FPS Optimizer</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Optimize your game settings for maximum FPS and performance based on your hardware.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Developer Tools */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                    <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold">Game Asset Optimizer</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Optimize game assets for better performance and smaller file sizes.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Hardware Tools */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-3">
                    <Cpu className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold">PC Builder</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Build your perfect gaming PC with our compatibility checker and performance estimator.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Analytics Tools */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-3">
                    <BarChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold">Gaming Analytics</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Track your gaming performance, analyze trends, and get insights to improve your gameplay.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Utilities */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-3">
                    <Calculator className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold">Gaming Calculators</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Various calculators for in-game stats, DPS, efficiency, and more.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* More Utilities */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-full mr-3">
                    <Monitor className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="font-semibold">Display Calibrator</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Calibrate your monitor for optimal gaming visuals and color accuracy.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="gaming" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                    <Gamepad2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold">FPS Optimizer</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Optimize your game settings for maximum FPS and performance based on your hardware.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-3">
                    <BarChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold">Gaming Analytics</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Track your gaming performance, analyze trends, and get insights to improve your gameplay.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="developer" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                    <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold">Game Asset Optimizer</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Optimize game assets for better performance and smaller file sizes.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3">
                    <Wrench className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold">Game Engine Tools</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Utilities and plugins for popular game engines to speed up development.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="hardware" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-3">
                    <Cpu className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold">PC Builder</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Build your perfect gaming PC with our compatibility checker and performance estimator.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-full mr-3">
                    <Monitor className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="font-semibold">Display Calibrator</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Calibrate your monitor for optimal gaming visuals and color accuracy.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="utilities" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-3">
                    <Calculator className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold">Gaming Calculators</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Various calculators for in-game stats, DPS, efficiency, and more.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mr-3">
                    <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-semibold">Benchmark Tools</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Benchmark your system and compare performance with other gamers.
                </p>
                <Button variant="ghost" size="sm" className="flex items-center">
                  Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

