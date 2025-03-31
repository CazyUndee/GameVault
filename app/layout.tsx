import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import SettingsMenu from "@/components/settings-menu"
import { AuthProvider } from "@/contexts/auth-context"
import MobileOptimizations from "@/components/mobile-optimizations"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata
export const metadata: Metadata = {
  title: "GameVaultX - Your Gaming Hub",
  description: "Discover, play, and share your favorite games in one place",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <MobileOptimizations />
            {children}
            <SettingsMenu />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'