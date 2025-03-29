"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="py-6 px-4 md:px-6 w-full">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-medium no-underline">
          GameVault
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400">
            Home
          </Link>
          <Link href="/games" className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400">
            Games
          </Link>
          <Link href="/play" className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400">
            Play
          </Link>
          <Link href="/categories" className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400">
            Categories
          </Link>
          <Link href="/about" className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400">
            About
          </Link>
          <Link href="/contact" className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-zinc-900 p-4 shadow-lg z-10">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="py-2 no-underline" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/games" className="py-2 no-underline" onClick={() => setIsMenuOpen(false)}>
              Games
            </Link>
            <Link href="/play" className="py-2 no-underline" onClick={() => setIsMenuOpen(false)}>
              Play
            </Link>
            <Link href="/categories" className="py-2 no-underline" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link href="/about" className="py-2 no-underline" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="py-2 no-underline" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

