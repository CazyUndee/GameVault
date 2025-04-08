"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  User,
  LogOut,
  Trophy,
  Database,
  Search,
  Bot,
  PenToolIcon as Tool,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const isHomePage = pathname === "/"
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false)
    setMobileSubMenuOpen(null)
    router.push(path)
    window.scrollTo(0, 0)
  }

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 300) // Delay before closing dropdown
  }

  const toggleMobileSubMenu = (menu: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === menu ? null : menu)
  }

  // Determine if we're in a specific section
  const isInGCatalog = pathname?.startsWith("/gcatalog")
  const isInVaultSearch = pathname?.startsWith("/vault-search")
  const isInVaultAI = pathname?.startsWith("/vault-ai")
  const isInVaultTools = pathname?.startsWith("/vault-tools")

  return (
    <nav className="py-6 px-4 md:px-6 w-full">
      <div className="content-container-wide mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="text-xl font-medium no-underline"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/")
              }}
            >
              Vaultican<span className="text-accent">.</span>
            </Link>

            {/* Points display for mobile - only shown when logged in and NOT on homepage */}
            {user && isMobile && !isHomePage && (
              <div className="points-display text-sm mt-1">
                <Trophy size={14} />
                <span>{user.points} points</span>
              </div>
            )}
          </div>

          {/* Points display for desktop - only shown when logged in and NOT on homepage */}
          {user && !isMobile && !isHomePage && (
            <div className="hidden lg:flex points-display">
              <Trophy size={16} />
              <span>{user.points} points</span>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex space-x-4 items-center">
            <Link
              href="/"
              className={`no-underline hover:text-zinc-500 dark:hover:text-zinc-400 ${isHomePage ? "font-medium" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/")
              }}
            >
              Home
            </Link>

            {/* GCatalog Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("gcatalog")}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href="/gcatalog"
                className={`no-underline hover:text-zinc-500 dark:hover:text-zinc-400 flex items-center gap-1 ${
                  isInGCatalog ? "font-medium" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/gcatalog")
                }}
              >
                <Database className="h-4 w-4" />
                <span>GCatalog</span>
              </Link>
              <div
                className={`absolute left-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 z-50 transition-opacity duration-200 ${
                  activeDropdown === "gcatalog" ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="py-1">
                  <Link
                    href="/gcatalog/games"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/gcatalog/games")
                    }}
                  >
                    Browse Games
                  </Link>
                  <Link
                    href="/gcatalog/play"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/gcatalog/play")
                    }}
                  >
                    Play Games
                  </Link>
                  <Link
                    href="/gcatalog/categories"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/gcatalog/categories")
                    }}
                  >
                    Categories
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/vault-search"
              className={`no-underline hover:text-zinc-500 dark:hover:text-zinc-400 flex items-center gap-1 ${
                isInVaultSearch ? "font-medium" : ""
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/vault-search")
              }}
            >
              <Search className="h-4 w-4" />
              <span>Vault Search</span>
            </Link>

            <Link
              href="/vault-ai"
              className={`no-underline hover:text-zinc-500 dark:hover:text-zinc-400 flex items-center gap-1 ${
                isInVaultAI ? "font-medium" : ""
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/vault-ai")
              }}
            >
              <Bot className="h-4 w-4" />
              <span>Vault AI</span>
            </Link>

            <Link
              href="/vault-tools"
              className={`no-underline hover:text-zinc-500 dark:hover:text-zinc-400 flex items-center gap-1 ${
                isInVaultTools ? "font-medium" : ""
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/vault-tools")
              }}
            >
              <Tool className="h-4 w-4" />
              <span>Vault Tools</span>
            </Link>

            <Link
              href="/about"
              className={`no-underline hover:text-zinc-500 dark:hover:text-zinc-400 ${
                pathname === "/about" ? "font-medium" : ""
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/about")
              }}
            >
              About
            </Link>

            {/* User Profile Dropdown */}
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("profile")}
                onMouseLeave={handleDropdownLeave}
              >
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => handleNavigation("/profile")}
                >
                  {user.profileImage ? (
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.username}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <User size={18} />
                  )}
                  <span className="hidden sm:inline">{user.displayName || user.username}</span>
                </Button>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 z-50 transition-opacity duration-200 ${
                    activeDropdown === "profile" ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation("/profile")
                      }}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/gcatalog/favorites"
                      className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation("/gcatalog/favorites")
                      }}
                    >
                      My Favorites
                    </Link>
                    <Link
                      href="/gcatalog/wishlist"
                      className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation("/gcatalog/wishlist")
                      }}
                    >
                      My Wishlist
                    </Link>
                    <Link
                      href="/gcatalog/leaderboard"
                      className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 no-underline"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation("/gcatalog/leaderboard")
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
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 bg-white dark:bg-zinc-900 p-4 shadow-lg z-10">
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

            <div className="py-2">
              <button
                className="w-full text-left font-medium mb-1 flex items-center justify-between"
                onClick={() => toggleMobileSubMenu("gcatalog")}
              >
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-1" />
                  GCatalog
                </div>
                {mobileSubMenuOpen === "gcatalog" ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {mobileSubMenuOpen === "gcatalog" && (
                <div className="pl-5 space-y-2 mt-1">
                  <Link
                    href="/gcatalog"
                    className="block py-1 text-sm no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/gcatalog")
                    }}
                  >
                    Overview
                  </Link>
                  <Link
                    href="/gcatalog/games"
                    className="block py-1 text-sm no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/gcatalog/games")
                    }}
                  >
                    Browse Games
                  </Link>
                  <Link
                    href="/gcatalog/play"
                    className="block py-1 text-sm no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/gcatalog/play")
                    }}
                  >
                    Play Games
                  </Link>
                  <Link
                    href="/gcatalog/categories"
                    className="block py-1 text-sm no-underline"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/gcatalog/categories")
                    }}
                  >
                    Categories
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/vault-search"
              className="py-2 no-underline flex items-center"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/vault-search")
              }}
            >
              <Search className="h-4 w-4 mr-1" />
              Vault Search
            </Link>

            <Link
              href="/vault-ai"
              className="py-2 no-underline flex items-center"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/vault-ai")
              }}
            >
              <Bot className="h-4 w-4 mr-1" />
              Vault AI
            </Link>

            <Link
              href="/vault-tools"
              className="py-2 no-underline flex items-center"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/vault-tools")
              }}
            >
              <Tool className="h-4 w-4 mr-1" />
              Vault Tools
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

            {user ? (
              <>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2">
                  <div className="flex items-center gap-2">
                    {user.profileImage ? (
                      <div className="h-6 w-6 rounded-full overflow-hidden">
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt={user.username}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <User size={18} className="text-zinc-500 dark:text-zinc-400" />
                    )}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Logged in as {user.displayName || user.username}
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="py-2 no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/profile")
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/gcatalog/favorites"
                  className="py-2 no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/gcatalog/favorites")
                  }}
                >
                  My Favorites
                </Link>
                <Link
                  href="/gcatalog/wishlist"
                  className="py-2 no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/gcatalog/wishlist")
                  }}
                >
                  My Wishlist
                </Link>
                <Link
                  href="/gcatalog/leaderboard"
                  className="py-2 no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/gcatalog/leaderboard")
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
