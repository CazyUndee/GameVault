import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="mb-2">About GameVaultX</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Our mission and vision</p>
            </div>
            <Link href="/" className="text-sm font-medium">
              ← Back to GameVaultX
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  GameVaultX was born from a simple idea: create a minimalist game catalog that helps gamers discover
                  and explore games across all platforms and genres without the noise and distractions of traditional
                  game stores.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Founded in 2023 by a team of passionate gamers and developers, we've built GameVaultX to be the go-to
                  resource for thoughtful game discovery and exploration.
                </p>
              </div>
              <div className="md:w-1/2 relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="GameVaultX Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <h2>Our Approach</h2>
              <p>
                In a world of flashy, overwhelming game stores and catalogs, GameVaultX takes a different approach. We
                believe in:
              </p>

              <ul>
                <li>
                  <strong>Simplicity</strong> - A clean interface that puts games front and center
                </li>
                <li>
                  <strong>Curation</strong> - Thoughtfully selected games rather than an endless catalog
                </li>
                <li>
                  <strong>Information</strong> - Concise, useful details about each game without the noise
                </li>
                <li>
                  <strong>Accessibility</strong> - A responsive design that works well on any device
                </li>
              </ul>

              <h2>How We Select Games</h2>
              <p>Our catalog includes games that meet our quality standards across various criteria:</p>

              <ul>
                <li>Gameplay innovation and execution</li>
                <li>Artistic and technical achievement</li>
                <li>Narrative and world-building</li>
                <li>Cultural and historical significance</li>
              </ul>

              <p>We regularly update our catalog with new releases and rediscovered classics that deserve attention.</p>

              <h2>Our Tools</h2>
              <p>Beyond our game catalog, we're building a suite of tools to enhance your gaming experience:</p>

              <ul>
                <li>
                  <strong>Vault Search</strong> - Find games, mods, guides, and communities
                </li>
                <li>
                  <strong>Vault AI</strong> - Get personalized recommendations and answers to your gaming questions
                </li>
                <li>
                  <strong>Vault Tools</strong> - Optimize your gaming setup, track performance, and more
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
              <h3 className="text-xl font-bold mb-3">Our Team</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We're a diverse team of gamers, developers, and designers passionate about creating the best gaming
                platform.
              </p>
              <Link href="/team">
                <Button variant="outline" className="w-full">
                  Meet the Team
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
              <h3 className="text-xl font-bold mb-3">Careers</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Join our growing team and help shape the future of game discovery and exploration.
              </p>
              <Link href="/careers">
                <Button variant="outline" className="w-full">
                  View Openings
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
              <h3 className="text-xl font-bold mb-3">Contact Us</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Have questions, feedback, or suggestions? We'd love to hear from you.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30 p-6">
            <h3 className="text-xl font-bold mb-3">Get Involved</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Have suggestions for games we should include? Found an error in our information? We welcome your feedback
              and contributions.
            </p>
            <Link href="/contact">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowRight className="h-4 w-4 mr-2" />
                Contribute
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

