"use client"

import { useState, useEffect } from "react"
import { Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [customCSS, setCustomCSS] = useState("")
  const [colorScheme, setColorScheme] = useState("default")
  const [styleApplied, setStyleApplied] = useState(false)

  // Ensure theme component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply custom CSS
  useEffect(() => {
    if (!styleApplied) return

    const styleElement = document.createElement("style")
    styleElement.id = "custom-css"
    styleElement.innerHTML = customCSS
    document.head.appendChild(styleElement)

    return () => {
      const existingStyle = document.getElementById("custom-css")
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [customCSS, styleApplied])

  // Apply color scheme
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    switch (colorScheme) {
      case "blue":
        root.style.setProperty("--foreground", "15, 23, 42")
        root.style.setProperty("--background", "255, 255, 255")
        document.body.classList.remove("dark")
        setTheme("light")
        break
      case "green":
        root.style.setProperty("--foreground", "20, 83, 45")
        root.style.setProperty("--background", "240, 253, 244")
        document.body.classList.remove("dark")
        setTheme("light")
        break
      case "purple":
        root.style.setProperty("--foreground", "88, 28, 135")
        root.style.setProperty("--background", "250, 245, 255")
        document.body.classList.remove("dark")
        setTheme("light")
        break
      case "dark-blue":
        root.style.setProperty("--foreground", "191, 219, 254")
        root.style.setProperty("--background", "30, 58, 138")
        document.body.classList.add("dark")
        setTheme("dark")
        break
      case "dark-green":
        root.style.setProperty("--foreground", "187, 247, 208")
        root.style.setProperty("--background", "20, 83, 45")
        document.body.classList.add("dark")
        setTheme("dark")
        break
      case "dark-purple":
        root.style.setProperty("--foreground", "233, 213, 255")
        root.style.setProperty("--background", "88, 28, 135")
        document.body.classList.add("dark")
        setTheme("dark")
        break
      default:
        // Reset to default
        root.style.setProperty("--foreground", "24, 24, 27")
        root.style.setProperty("--background", "255, 255, 255")
        if (theme === "dark") {
          root.style.setProperty("--foreground", "244, 244, 245")
          root.style.setProperty("--background", "24, 24, 27")
        }
    }
  }, [colorScheme, mounted, theme, setTheme])

  // Toggle settings menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Apply custom CSS
  const handleApplyCSS = () => {
    setStyleApplied(true)
  }

  // Reset custom CSS
  const handleResetCSS = () => {
    setCustomCSS("")
    setStyleApplied(false)
  }

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`relative ${isOpen ? "settings-open" : ""}`}>
        {/* Settings button */}
        <button
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg transition-all duration-300 ${isOpen ? "rotate-90" : ""}`}
          onClick={toggleMenu}
          aria-label="Settings"
          aria-expanded={isOpen}
        >
          <Settings className="w-6 h-6" />
        </button>

        {/* Settings panel */}
        <div
          className={`absolute bottom-16 right-0 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 overflow-hidden ${
            isOpen ? "opacity-100 translate-y-0 max-h-[80vh]" : "opacity-0 translate-y-4 max-h-0 pointer-events-none"
          }`}
        >
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold">Settings</h3>
          </div>

          <div className="p-4 space-y-6 max-h-[calc(80vh-60px)] overflow-y-auto">
            {/* Theme toggle */}
            <div>
              <h4 className="text-sm font-medium mb-2">Theme</h4>
              <div className="flex items-center gap-2">
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-md ${theme === "light" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-100 dark:bg-zinc-800"}`}
                  onClick={() => setTheme("light")}
                  aria-label="Light theme"
                >
                  <Sun className="w-5 h-5" />
                </button>
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-md ${theme === "dark" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-100 dark:bg-zinc-800"}`}
                  onClick={() => setTheme("dark")}
                  aria-label="Dark theme"
                >
                  <Moon className="w-5 h-5" />
                </button>
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-md ${theme === "system" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-100 dark:bg-zinc-800"}`}
                  onClick={() => setTheme("system")}
                  aria-label="System theme"
                >
                  <span className="text-sm font-medium">Auto</span>
                </button>
              </div>
            </div>

            {/* Color schemes */}
            <div>
              <h4 className="text-sm font-medium mb-2">Color Scheme</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "default" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("default")}
                  style={{ background: "linear-gradient(to right, #f8fafc, #1e293b)" }}
                  aria-label="Default color scheme"
                >
                  <span className="text-xs font-medium">Default</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "blue" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("blue")}
                  style={{ background: "linear-gradient(to right, #dbeafe, #1e40af)" }}
                  aria-label="Blue color scheme"
                >
                  <span className="text-xs font-medium">Blue</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "green" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("green")}
                  style={{ background: "linear-gradient(to right, #dcfce7, #166534)" }}
                  aria-label="Green color scheme"
                >
                  <span className="text-xs font-medium">Green</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "purple" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("purple")}
                  style={{ background: "linear-gradient(to right, #f3e8ff, #581c87)" }}
                  aria-label="Purple color scheme"
                >
                  <span className="text-xs font-medium">Purple</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "dark-blue" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("dark-blue")}
                  style={{ background: "linear-gradient(to right, #1e3a8a, #bfdbfe)" }}
                  aria-label="Dark blue color scheme"
                >
                  <span className="text-xs font-medium text-white">Dark Blue</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "dark-green" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("dark-green")}
                  style={{ background: "linear-gradient(to right, #14532d, #bbf7d0)" }}
                  aria-label="Dark green color scheme"
                >
                  <span className="text-xs font-medium text-white">Dark Green</span>
                </button>
              </div>
            </div>

            {/* Custom CSS */}
            <div>
              <h4 className="text-sm font-medium mb-2">Custom CSS (Advanced)</h4>
              <textarea
                className="w-full h-32 p-2 text-sm font-mono border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800"
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                placeholder=":root { --custom-color: #ff0000; } .my-class { color: var(--custom-color); }"
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 text-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md"
                  onClick={handleApplyCSS}
                >
                  Apply
                </button>
                <button
                  className="px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md"
                  onClick={handleResetCSS}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        .settings-open button::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: inherit;
          top: -6px;
          right: 0;
          border-radius: 50%;
          transition: all 0.3s ease;
          opacity: 0;
        }
        
        .settings-open button::after {
          content: 'Settings';
          position: absolute;
          background-color: inherit;
          color: inherit;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          top: -2rem;
          right: 0;
          white-space: nowrap;
          transition: all 0.3s ease;
          opacity: 0;
        }
        
        .settings-open:hover button::before {
          opacity: 1;
          transform: translateX(-24px);
        }
        
        .settings-open:hover button::after {
          opacity: 1;
          transform: translateY(-0.5rem);
        }
      `}</style>
    </div>
  )
}

