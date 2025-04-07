"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { Trophy, Medal, Award } from "lucide-react"

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load leaderboard data
  useEffect(() => {
    const loadLeaderboard = () => {
      try {
        setIsLoading(true)

        // In a real app, this would be an API call
        // For demo purposes, we'll get users from localStorage
        const usersJson = localStorage.getItem("users") || "[]"
        const users = JSON.parse(usersJson)

        // Sort by points (descending)
        const sortedUsers = users
          .map((u: any) => ({
            id: u.id,
            username: u.username,
            points: u.points || 0,
          }))
          .sort((a: any, b: any) => b.points - a.points)
          .slice(0, 20) // Top 20

        setLeaderboard(sortedUsers)
      } catch (error) {
        console.error("Error loading leaderboard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLeaderboard()

    // Refresh leaderboard every 30 seconds
    const interval = setInterval(loadLeaderboard, 30000)

    return () => clearInterval(interval)
  }, [])

  // Find user's rank
  const userRank = user ? leaderboard.findIndex((u) => u.id === user.id) + 1 : -1

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8">Leaderboard</h1>

          {/* Top 3 players */}
          {!isLoading && leaderboard.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {/* Second place */}
              {leaderboard.length > 1 && (
                <div className="order-2 md:order-1">
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center">
                    <div className="mb-4">
                      <Medal className="w-12 h-12 text-zinc-500" />
                    </div>
                    <h3 className="text-xl mb-1">{leaderboard[1].username}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">2nd Place</p>
                    <p className="text-2xl font-bold mt-2">{leaderboard[1].points} pts</p>
                  </div>
                </div>
              )}

              {/* First place */}
              <div className="order-1 md:order-2">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center transform md:scale-110">
                  <div className="mb-4">
                    <Trophy className="w-16 h-16 text-yellow-500" />
                  </div>
                  <h3 className="text-2xl mb-1">{leaderboard[0].username}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">1st Place</p>
                  <p className="text-3xl font-bold mt-2">{leaderboard[0].points} pts</p>
                </div>
              </div>

              {/* Third place */}
              {leaderboard.length > 2 && (
                <div className="order-3">
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center">
                    <div className="mb-4">
                      <Award className="w-12 h-12 text-zinc-500" />
                    </div>
                    <h3 className="text-xl mb-1">{leaderboard[2].username}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">3rd Place</p>
                    <p className="text-2xl font-bold mt-2">{leaderboard[2].points} pts</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full leaderboard */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
              <h2 className="text-xl">Top Players</h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <p>Loading leaderboard...</p>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="p-8 text-center">
                <p>No players yet. Start playing to earn points!</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center p-4 ${player.id === user?.id ? "bg-zinc-50 dark:bg-zinc-700/30" : ""}`}
                  >
                    <div className="w-10 text-center font-bold text-zinc-500 dark:text-zinc-400">{index + 1}</div>
                    <div className="flex-1 font-medium">
                      {player.displayName || player.username}
                      {player.id === user?.id && (
                        <span className="ml-2 text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded">You</span>
                      )}
                    </div>
                    <div className="font-bold">{player.points} pts</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User's rank (if not in top 20) */}
          {user && userRank > 20 && (
            <div className="mt-8 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
              <div className="flex items-center">
                <div className="w-10 text-center font-bold text-zinc-500 dark:text-zinc-400">{userRank}</div>
                <div className="flex-1 font-medium">
                  {user.username}
                  <span className="ml-2 text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded">You</span>
                </div>
                <div className="font-bold">{user.points} pts</div>
              </div>
            </div>
          )}

          {/* How to earn points */}
          <div className="mt-12 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
              <h2 className="text-xl">How to Earn Points</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Play Games</p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Earn 1 point for every second you spend playing games in the Play section.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Unlock Premium Games</p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Reach 300 points to unlock additional games that earn 2 points per second.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Reach the Top</p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Compete with other players to reach the top of the leaderboard!
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

