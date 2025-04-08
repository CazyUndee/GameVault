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
    setMounted(true)
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
    const colorSchemes = {
      default: {
        light: {
          foreground: "24, 24, 27", // zinc-900
          background: "255, 255, 255", // white
          primary: "24, 24, 27", // zinc-900
          "primary-foreground": "255, 255, 255", // white
          secondary: "244, 244, 245", // zinc-100
          "secondary-foreground": "24, 24, 27", // zinc-900
          accent: "37, 99, 235", // blue-600
          "accent-foreground": "255, 255, 255", // white
          muted: "244, 244, 245", // zinc-100
          "muted-foreground": "113, 113, 122", // zinc-500
          border: "228, 228, 231", // zinc-200
          input: "228, 228, 231", // zinc-200
          ring: "24, 24, 27", // zinc-900
          card: "255, 255, 255", // white
          "card-foreground": "24, 24, 27", // zinc-900
          popover: "255, 255, 255", // white
          "popover-foreground": "24, 24, 27", // zinc-900
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
        dark: {
          foreground: "244, 244, 245", // zinc-100
          background: "24, 24, 27", // zinc-900
          primary: "244, 244, 245", // zinc-100
          "primary-foreground": "24, 24, 27", // zinc-900
          secondary: "39, 39, 42", // zinc-800
          "secondary-foreground": "244, 244, 245", // zinc-100
          accent: "96, 165, 250", // blue-400
          "accent-foreground": "24, 24, 27", // zinc-900
          muted: "39, 39, 42", // zinc-800
          "muted-foreground": "161, 161, 170", // zinc-400
          border: "63, 63, 70", // zinc-700
          input: "63, 63, 70", // zinc-700
          ring: "244, 244, 245", // zinc-100
          card: "39, 39, 42", // zinc-800
          "card-foreground": "244, 244, 245", // zinc-100
          popover: "39, 39, 42", // zinc-800
          "popover-foreground": "244, 244, 245", // zinc-100
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
      },
      blue: {
        light: {
          foreground: "23, 37, 84", // blue-900
          background: "239, 246, 255", // blue-50
          primary: "37, 99, 235", // blue-600
          "primary-foreground": "255, 255, 255", // white
          secondary: "191, 219, 254", // blue-200
          "secondary-foreground": "30, 58, 138", // blue-800
          accent: "59, 130, 246", // blue-500
          "accent-foreground": "255, 255, 255", // white
          muted: "219, 234, 254", // blue-100
          "muted-foreground": "30, 58, 138", // blue-800
          border: "191, 219, 254", // blue-200
          input: "191, 219, 254", // blue-200
          ring: "37, 99, 235", // blue-600
          card: "255, 255, 255", // white
          "card-foreground": "23, 37, 84", // blue-900
          popover: "255, 255, 255", // white
          "popover-foreground": "23, 37, 84", // blue-900
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
        dark: {
          foreground: "219, 234, 254", // blue-100
          background: "30, 58, 138", // blue-900
          primary: "96, 165, 250", // blue-400
          "primary-foreground": "30, 58, 138", // blue-900
          secondary: "37, 99, 235", // blue-600
          "secondary-foreground": "239, 246, 255", // blue-50
          accent: "59, 130, 246", // blue-500
          "accent-foreground": "255, 255, 255", // white
          muted: "30, 64, 175", // blue-800
          "muted-foreground": "191, 219, 254", // blue-200
          border: "30, 64, 175", // blue-800
          input: "30, 64, 175", // blue-800
          ring: "96, 165, 250", // blue-400
          card: "30, 64, 175", // blue-800
          "card-foreground": "219, 234, 254", // blue-100
          popover: "30, 64, 175", // blue-800
          "popover-foreground": "219, 234, 254", // blue-100
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
      },
      green: {
        light: {
          foreground: "6, 78, 59", // green-800
          background: "240, 253, 244", // green-50
          primary: "16, 185, 129", // green-600
          "primary-foreground": "255, 255, 255", // white
          secondary: "187, 247, 208", // green-200
          "secondary-foreground": "6, 78, 59", // green-800
          accent: "34, 197, 94", // green-500
          "accent-foreground": "255, 255, 255", // white
          muted: "220, 252, 231", // green-100
          "muted-foreground": "6, 78, 59", // green-800
          border: "187, 247, 208", // green-200
          input: "187, 247, 208", // green-200
          ring: "16, 185, 129", // green-600
          card: "255, 255, 255", // white
          "card-foreground": "6, 78, 59", // green-800
          popover: "255, 255, 255", // white
          "popover-foreground": "6, 78, 59", // green-800
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
        dark: {
          foreground: "220, 252, 231", // green-100
          background: "6, 78, 59", // green-900
          primary: "34, 197, 94", // green-500
          "primary-foreground": "6, 78, 59", // green-900
          secondary: "16, 185, 129", // green-600
          "secondary-foreground": "240, 253, 244", // green-50
          accent: "34, 197, 94", // green-500
          "accent-foreground": "255, 255, 255", // white
          muted: "5, 150, 105", // green-700
          "muted-foreground": "187, 247, 208", // green-200
          border: "5, 150, 105", // green-700
          input: "5, 150, 105", // green-700
          ring: "34, 197, 94", // green-500
          card: "5, 150, 105", // green-700
          "card-foreground": "220, 252, 231", // green-100
          popover: "5, 150, 105", // green-700
          "popover-foreground": "220, 252, 231", // green-100
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
      },
      purple: {
        light: {
          foreground: "76, 29, 149", // purple-900
          background: "250, 245, 255", // purple-50
          primary: "147, 51, 234", // purple-600
          "primary-foreground": "255, 255, 255", // white
          secondary: "233, 213, 255", // purple-200
          "secondary-foreground": "88, 28, 135", // purple-800
          accent: "168, 85, 247", // purple-500
          "accent-foreground": "255, 255, 255", // white
          muted: "243, 232, 255", // purple-100
          "muted-foreground": "88, 28, 135", // purple-800
          border: "233, 213, 255", // purple-200
          input: "233, 213, 255", // purple-200
          ring: "147, 51, 234", // purple-600
          card: "255, 255, 255", // white
          "card-foreground": "76, 29, 149", // purple-900
          popover: "255, 255, 255", // white
          "popover-foreground": "76, 29, 149", // purple-900
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
        dark: {
          foreground: "243, 232, 255", // purple-100
          background: "76, 29, 149", // purple-900
          primary: "192, 132, 252", // purple-400
          "primary-foreground": "76, 29, 149", // purple-900
          secondary: "147, 51, 234", // purple-600
          "secondary-foreground": "250, 245, 255", // purple-50
          accent: "168, 85, 247", // purple-500
          "accent-foreground": "255, 255, 255", // white
          muted: "107, 33, 168", // purple-800
          "muted-foreground": "233, 213, 255", // purple-200
          border: "107, 33, 168", // purple-800
          input: "107, 33, 168", // purple-800
          ring: "192, 132, 252", // purple-400
          card: "107, 33, 168", // purple-800
          "card-foreground": "243, 232, 255", // purple-100
          popover: "107, 33, 168", // purple-800
          "popover-foreground": "243, 232, 255", // purple-100
          destructive: "239, 68, 68", // red-500
          "destructive-foreground": "255, 255, 255", // white
        },
      },
    }

    // Get the current theme mode
    const isDark = theme === "dark"

    // Get the color scheme
    let selectedScheme
    if (colorScheme === "default") {
      selectedScheme = colorSchemes.default
    } else if (colorScheme === "blue" || colorScheme === "dark-blue") {
      selectedScheme = colorSchemes.blue
      if (colorScheme === "dark-blue") {
        document.documentElement.classList.add("dark")
        setTheme("dark")
      } else {
        document.documentElement.classList.remove("dark")
        setTheme("light")
      }
    } else if (colorScheme === "green" || colorScheme === "dark-green") {
      selectedScheme = colorSchemes.green
      if (colorScheme === "dark-green") {
        document.documentElement.classList.add("dark")
        setTheme("dark")
      } else {
        document.documentElement.classList.remove("dark")
        setTheme("light")
      }
    } else if (colorScheme === "purple" || colorScheme === "dark-purple") {
      selectedScheme = colorSchemes.purple
      if (colorScheme === "dark-purple") {
        document.documentElement.classList.add("dark")
        setTheme("dark")
      } else {
        document.documentElement.classList.remove("dark")
        setTheme("light")
      }
    } else {
      selectedScheme = colorSchemes.default
    }

    // Apply the selected color scheme
    const colors = isDark ? selectedScheme.dark : selectedScheme.light

    // Apply all colors to CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
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
                <button
                  className={`flex items-center justify-center w-full h-10 rounded-md ${colorScheme === "dark-purple" ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                  onClick={() => setColorScheme("dark-purple")}
                  style={{ background: "linear-gradient(to right, #581c87, #e9d5ff)" }}
                  aria-label="Dark purple color scheme"
                >
                  <span className="text-xs font-medium text-white">Dark Purple</span>
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
