"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, LogOut, Trophy } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const isHomePage = pathname === "/"

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false)
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <nav className="py-6 px-4 md:px-6 w-full">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-medium no-underline"
          onClick={(e) => {
            e.preventDefault()
            handleNavigation("/")
          }}
        >
          GameVault<span className="text-accent">X</span>
        </Link>

        {/* Points display - only shown when logged in and NOT on homepage */}
        {user && !isHomePage && (
          <div className="hidden md:flex points-display">
            <Trophy size={16} />
            <span>{user.points} points</span>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/"
            className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("/")
            }}
          >
            Home
          </Link>
          <Link
            href="/games"
            className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("/games")
            }}
          >
            Games
          </Link>
          <Link
            href="/play"
            className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("/play")
            }}
          >
            Play
          </Link>
          <Link
            href="/categories"
            className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("/categories")
            }}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("/about")
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="no-underline hover:text-zinc-500 dark:hover:text-zinc-400"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("/contact")
            }}
          >
            Contact
          </Link>

          {user ? (
            <div className="relative group">
              <Button variant="ghost" className="flex items-center gap-2" onClick={() => handleNavigation("/profile")}>
                <User size={18} />
                <span className="hidden sm:inline">{user.username}</span>
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 hidden group-hover:block z-50">
                <div className="py-1">
                  <Link
                    href="/favorites"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/favorites")
                    }}
                  >
                    My Favorites
                  </Link>
                  <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/wishlist")
                    }}
                  >
                    My Wishlist
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/leaderboard")
                    }}
                  >
                    Leaderboard
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 text-red-600 dark:text-red-400"
                    onClick={logout}
                  >
                    <div className="flex items-center gap-2">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="flex items-center gap-2 auth-button"
              onClick={() => handleNavigation("/auth")}
            >
              <User size={18} />
              <span>Login / Signup</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-zinc-900 p-4 shadow-lg z-10">
          <div className="flex flex-col space-y-4">
            {user && !isHomePage && (
              <div className="flex items-center justify-center mb-2 points-display mx-auto">
                <Trophy size={16} />
                <span>{user.points} points</span>
              </div>
            )}

            <Link
              href="/"
              className="py-2 no-underline"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/")
              }}
            >
              Home
            </Link>
            <Link
              href="/games"
              className="py-2 no-underline"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/games")
              }}
            >
              Games
            </Link>
            <Link
              href="/play"
              className="py-2 no-underline"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/play")
              }}
            >
              Play
            </Link>
            <Link
              href="/categories"
              className="py-2 no-underline"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/categories")
              }}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="py-2 no-underline"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/about")
              }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="py-2 no-underline"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/contact")
              }}
            >
              Contact
            </Link>

            {user ? (
              <>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Logged in as {user.username}</p>
                </div>
                <Link
                  href="/favorites"
                  className="py-2 no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/favorites")
                  }}
                >
                  My Favorites
                </Link>
                <Link
                  href="/wishlist"
                  className="py-2 no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/wishlist")
                  }}
                >
                  My Wishlist
                </Link>
                <Link
                  href="/leaderboard"
                  className="py-2 no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/leaderboard")
                  }}
                >
                  Leaderboard
                </Link>
                <button className="py-2 text-left text-red-600 dark:text-red-400" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="py-2 no-underline"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/auth")
                }}
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

