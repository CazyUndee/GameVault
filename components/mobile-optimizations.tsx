"use client"

import { useEffect, useState } from "react"

export default function MobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Listen for resize events
    window.addEventListener("resize", checkMobile)

    // Apply mobile-specific optimizations
    if (isMobile) {
      // Add class to body for mobile-specific CSS
      document.body.classList.add("mobile-device")

      // Add touch-target class to interactive elements
      const interactiveElements = document.querySelectorAll("button, a, input, select, textarea")
      interactiveElements.forEach((el) => {
        el.classList.add("touch-target")
      })
    } else {
      // Reset optimizations
      document.body.classList.remove("mobile-device")

      // Remove touch-target class
      const touchTargetElements = document.querySelectorAll(".touch-target")
      touchTargetElements.forEach((el) => {
        el.classList.remove("touch-target")
      })
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  return null // This component doesn't render anything
}

