import Link from "next/link"
import { Github, Twitter, Instagram, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 md:px-6 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Vaultican</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Your minimalist game catalog for discovering and exploring games across all platforms.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/gcatalog"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Game Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/gcatalog/categories"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/gcatalog/play"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Play Games
                </Link>
              </li>
              <li>
                <Link
                  href="/vault-search"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/vault-ai"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Vault AI
                </Link>
              </li>
              <li>
                <Link
                  href="/vault-tools"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/vault-tools"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Gaming Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/vault-tools"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Hardware Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col items-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            © {currentYear} Vaultican. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500" />
            <span>for gamers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
