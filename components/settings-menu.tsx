"use client"

import { useState, useEffect, useRef } from "react"
import { Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [customCSS, setCustomCSS] = useState("")
  const [colorScheme, setColorScheme] = useState("default")
  const [styleApplied, setStyleApplied] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  // Ensure theme component is mounted before accessing theme
  useEffect(() => {
    // Set mounted to true after a short delay to ensure all styles are applied
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  // Force a repaint of the settings panel when it's opened
  useEffect(() => {
    if (isOpen && settingsRef.current) {
      // Force a repaint by accessing offsetHeight
      const height = settingsRef.current.offsetHeight
      // Apply a small style change to trigger a repaint
      settingsRef.current.style.opacity = "0.99"
      setTimeout(() => {
        if (settingsRef.current) {
          settingsRef.current.style.opacity = "1"
        }
      }, 10)
    }
  }, [isOpen])

  // Apply custom CSS
  useEffect(() => {
    if (!styleApplied || !customCSS) return

    try {
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
    } catch (error) {
      console.error("Error applying custom CSS:", error)
    }
  }, [customCSS, styleApplied])

  // Apply color scheme
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    switch (colorScheme) {
      case "blue":
        // Blue theme - actual blue colors
        root.style.setProperty("--foreground", "23, 37, 84") // blue-900
        root.style.setProperty("--background", "239, 246, 255") // blue-50
        root.style.setProperty("--primary", "37, 99, 235") // blue-600
        root.style.setProperty("--primary-foreground", "255, 255, 255") // white
        root.style.setProperty("--secondary", "191, 219, 254") // blue-200
        root.style.setProperty("--secondary-foreground", "30, 58, 138") // blue-800
        document.body.classList.remove("dark")
        setTheme("light")
        break

      case "green":
        // Green theme - actual green colors
        root.style.setProperty("--foreground", "6, 78, 59") // green-800
        root.style.setProperty("--background", "240, 253, 244") // green-50
        root.style.setProperty("--primary", "16, 185, 129") // green-600
        root.style.setProperty("--primary-foreground", "255, 255, 255") // white
        root.style.setProperty("--secondary", "187, 247, 208") // green-200
        root.style.setProperty("--secondary-foreground", "6, 78, 59") // green-800
        document.body.classList.remove("dark")
        setTheme("light")
        break

      case "purple":
        // Purple theme - actual purple colors
        root.style.setProperty("--foreground", "76, 29, 149") // purple-900
        root.style.setProperty("--background", "250, 245, 255") // purple-50
        root.style.setProperty("--primary", "147, 51, 234") // purple-600
        root.style.setProperty("--primary-foreground", "255, 255, 255") // white
        root.style.setProperty("--secondary", "233, 213, 255") // purple-200
        root.style.setProperty("--secondary-foreground", "88, 28, 135") // purple-800
        document.body.classList.remove("dark")
        setTheme("light")
        break

      case "dark-blue":
        // Dark blue theme - actual dark blue colors
        root.style.setProperty("--foreground", "219, 234, 254") // blue-100
        root.style.setProperty("--background", "30, 58, 138") // blue-900
        root.style.setProperty("--primary", "96, 165, 250") // blue-400
        root.style.setProperty("--primary-foreground", "30, 58, 138") // blue-900
        root.style.setProperty("--secondary", "37, 99, 235") // blue-600
        root.style.setProperty("--secondary-foreground", "239, 246, 255") // blue-50
        document.body.classList.add("dark")
        setTheme("dark")
        break

      case "dark-green":
        // Dark green theme - actual dark green colors
        root.style.setProperty("--foreground", "220, 252, 231") // green-100
        root.style.setProperty("--background", "6, 78, 59") // green-900
        root.style.setProperty("--primary", "34, 197, 94") // green-500
        root.style.setProperty("--primary-foreground", "6, 78, 59") // green-900
        root.style.setProperty("--secondary", "16, 185, 129") // green-600
        root.style.setProperty("--secondary-foreground", "240, 253, 244") // green-50
        document.body.classList.add("dark")
        setTheme("dark")
        break

      case "dark-purple":
        // Dark purple theme - actual dark purple colors
        root.style.setProperty("--foreground", "243, 232, 255") // purple-100
        root.style.setProperty("--background", "76, 29, 149") // purple-900
        root.style.setProperty("--primary", "192, 132, 252") // purple-400
        root.style.setProperty("--primary-foreground", "76, 29, 149") // purple-900
        root.style.setProperty("--secondary", "147, 51, 234") // purple-600
        root.style.setProperty("--secondary-foreground", "250, 245, 255") // purple-50
        document.body.classList.add("dark")
        setTheme("dark")
        break

      default:
        // Reset to default
        root.style.removeProperty("--foreground")
        root.style.removeProperty("--background")
        root.style.removeProperty("--primary")
        root.style.removeProperty("--primary-foreground")
        root.style.removeProperty("--secondary")
        root.style.removeProperty("--secondary-foreground")

        if (theme === "dark") {
          root.style.setProperty("--foreground", "244, 244, 245") // zinc-100
          root.style.setProperty("--background", "24, 24, 27") // zinc-900
        } else {
          root.style.setProperty("--foreground", "24, 24, 27") // zinc-900
          root.style.setProperty("--background", "255, 255, 255") // white
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

    // Remove any existing custom CSS
    const existingStyle = document.getElementById("custom-css")
    if (existingStyle) {
      document.head.removeChild(existingStyle)
    }
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
      <div className="relative">
        {/* Settings button */}
        <button
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg hover:scale-110 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          onClick={toggleMenu}
          aria-label="Settings"
          aria-expanded={isOpen}
        >
          <Settings className="w-6 h-6" />
        </button>

        {/* Settings panel */}
        <div
          ref={settingsRef}
          className={`absolute bottom-16 right-0 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 overflow-hidden ${
            isOpen ? "opacity-100 translate-y-0 max-h-[80vh]" : "opacity-0 translate-y-4 max-h-0 pointer-events-none"
          }`}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
        >
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold text-black dark:text-white">Settings</h3>
          </div>

          <div className="p-4 space-y-6 max-h-[calc(80vh-60px)] overflow-y-auto">
            {/* Theme toggle */}
            <div className="settings-section">
              <h4 className="text-sm font-medium mb-2 text-black dark:text-white">Theme</h4>
              <div className="flex items-center gap-2">
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-md ${theme === "light" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-100 dark:bg-zinc-800"} text-black dark:text-white`}
                  onClick={() => setTheme("light")}
                  aria-label="Light theme"
                >
                  <Sun className="w-5 h-5" />
                </button>
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-md ${theme === "dark" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-100 dark:bg-zinc-800"} text-black dark:text-white`}
                  onClick={() => setTheme("dark")}
                  aria-label="Dark theme"
                >
                  <Moon className="w-5 h-5" />
                </button>
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-md ${theme === "system" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-100 dark:bg-zinc-800"} text-black dark:text-white`}
                  onClick={() => setTheme("system")}
                  aria-label="System theme"
                >
                  <span className="text-sm font-medium">Auto</span>
                </button>
              </div>
            </div>

            {/* Color schemes */}
            <div className="settings-section">
              <h4 className="text-sm font-medium mb-2 text-black dark:text-white">Color Scheme</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "default" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("default")}
                  style={{ background: "linear-gradient(to right, #f8fafc, #1e293b)" }}
                  aria-label="Default color scheme"
                >
                  <span className="text-xs font-medium text-black">Default</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "blue" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("blue")}
                  style={{ background: "linear-gradient(to right, #eff6ff, #1e40af)" }}
                  aria-label="Blue color scheme"
                >
                  <span className="text-xs font-medium text-black">Blue</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "green" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("green")}
                  style={{ background: "linear-gradient(to right, #f0fdf4, #166534)" }}
                  aria-label="Green color scheme"
                >
                  <span className="text-xs font-medium text-black">Green</span>
                </button>
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "purple" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("purple")}
                  style={{ background: "linear-gradient(to right, #faf5ff, #7e22ce)" }}
                  aria-label="Purple color scheme"
                >
                  <span className="text-xs font-medium text-black">Purple</span>
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
                  style={{ background: "linear-gradient(to right, #064e3b, #bbf7d0)" }}
                  aria-label="Dark green color scheme"
                >
                  <span className="text-xs font-medium text-white">Dark Green</span>
                </button>
              </div>
            </div>

            {/* Custom CSS */}
            <div className="settings-section">
              <h4 className="text-sm font-medium mb-2 text-black dark:text-white">Custom CSS (Advanced)</h4>
              <textarea
                className="w-full h-32 p-2 text-sm font-mono border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white"
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                placeholder=":root { --custom-color: #ff0000; } .my-class { color: var(--custom-color); }"
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 text-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-md settings-apply-button"
                  onClick={handleApplyCSS}
                >
                  Apply
                </button>
                <button
                  className="px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md text-black dark:text-white settings-reset-button"
                  onClick={handleResetCSS}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

