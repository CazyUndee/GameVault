"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { Trophy, Heart, BookmarkPlus, Mail, User, Shield, Bell } from "lucide-react"
import ProfileImageUpload from "@/components/profile-image-upload"

export default function ProfilePage() {
  const { user, isLoading, logout, sendVerificationEmail, updateProfile } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    } else if (user) {
      // Initialize form data with user info
      setFormData({
        ...formData,
        displayName: user.displayName || user.username,
        email: user.email,
      })
      setProfileImage(user.profileImage || "")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 md:px-6 py-12 md:py-20 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsUpdating(true)

    try {
      const result = await updateProfile({
        displayName: formData.displayName,
        profileImage,
      })

      if (result.success) {
        setSuccess(result.message)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("An error occurred while updating your profile. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsUpdating(true)

    try {
      // Validate passwords
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New passwords do not match")
        setIsUpdating(false)
        return
      }

      if (formData.newPassword.length < 8) {
        setError("Password must be at least 8 characters long")
        setIsUpdating(false)
        return
      }

      // In a real app, this would be an API call to update the user's password
      // For demo purposes, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the user's password in localStorage
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return { ...u, password: formData.newPassword }
        }
        return u
      })
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      setSuccess("Password updated successfully!")
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error updating password:", error)
      setError("An error occurred while updating your password. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSendVerificationEmail = async () => {
    setError("")
    setSuccess("")
    setIsEmailSent(true)

    try {
      const result = await sendVerificationEmail(user.email)
      if (result.success) {
        setSuccess(result.message)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Error sending verification email:", error)
      setError("An error occurred while sending the verification email. Please try again.")
    } finally {
      setIsEmailSent(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="content-container-wide mx-auto">
          <h1 className="mb-8">Your Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
                  <div className="flex flex-col items-center">
                    <ProfileImageUpload currentImage={profileImage} onImageChange={setProfileImage} />
                    <h2 className="text-xl font-medium mt-4">{user.displayName || user.username}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
                    {!user.emailVerified && (
                      <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">Email not verified</div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <nav className="space-y-1">
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                        activeTab === "account"
                          ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                      onClick={() => setActiveTab("account")}
                    >
                      <User className="w-4 h-4" />
                      <span>Account</span>
                    </button>
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                        activeTab === "security"
                          ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Security</span>
                    </button>
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                        activeTab === "notifications"
                          ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="w-4 h-4" />
                      <span>Notifications</span>
                    </button>
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                        activeTab === "stats"
                          ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                      onClick={() => setActiveTab("stats")}
                    >
                      <Trophy className="w-4 h-4" />
                      <span>Stats</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
              <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                {/* Account Tab */}
                {activeTab === "account" && (
                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-6">Account Settings</h2>

                    {error && (
                      <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md text-sm">
                        {success}
                      </div>
                    )}

                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                          Display Name
                        </label>
                        <Input
                          id="displayName"
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleChange}
                          required
                          disabled={isUpdating}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={true}
                        />
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          Email cannot be changed. Contact support for assistance.
                        </p>
                      </div>

                      {!user.emailVerified && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-amber-800 dark:text-amber-200">
                                Your email is not verified. Please verify your email to access all features.
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={handleSendVerificationEmail}
                                disabled={isEmailSent}
                              >
                                {isEmailSent ? "Sending..." : "Send Verification Email"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button type="submit" disabled={isUpdating} className="mt-2">
                        {isUpdating ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-6">Security Settings</h2>

                    {error && (
                      <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md text-sm">
                        {success}
                      </div>
                    )}

                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                          Current Password
                        </label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          required
                          disabled={isUpdating}
                        />
                      </div>

                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                          New Password
                        </label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          required
                          disabled={isUpdating}
                        />
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          Password must be at least 8 characters long
                        </p>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                          Confirm New Password
                        </label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          disabled={isUpdating}
                        />
                      </div>

                      <Button type="submit" disabled={isUpdating} className="mt-2">
                        {isUpdating ? "Updating..." : "Update Password"}
                      </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-6">Notification Settings</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Email Notifications</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Receive email notifications about account activity
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">New Game Alerts</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Get notified when new games are added to the catalog
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="newGameAlerts"
                            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Leaderboard Updates</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Get notified about changes in the leaderboard rankings
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="leaderboardUpdates"
                            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Special Offers</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Receive notifications about special offers and promotions
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="specialOffers"
                            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>

                    <Button className="mt-6">Save Preferences</Button>
                  </div>
                )}

                {/* Stats Tab */}
                {activeTab === "stats" && (
                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-6">Your Gaming Stats</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-8 h-8 text-yellow-500" />
                          <div>
                            <h3 className="text-sm font-medium">Total Points</h3>
                            <p className="text-2xl font-bold">{user.points}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center gap-3">
                          <Heart className="w-8 h-8 text-red-500" />
                          <div>
                            <h3 className="text-sm font-medium">Favorites</h3>
                            <p className="text-2xl font-bold">{user.favorites.length}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center gap-3">
                          <BookmarkPlus className="w-8 h-8 text-blue-500" />
                          <div>
                            <h3 className="text-sm font-medium">Wishlist</h3>
                            <p className="text-2xl font-bold">{user.wishlist.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-4">Points Progress</h3>
                    <div className="mb-8">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current: {user.points} points</span>
                        <span>
                          Next unlock: {user.points < 300 ? "300" : user.points < 1000 ? "1000" : "3000"} points
                        </span>
                      </div>
                      <div className="points-progress-bar">
                        <div
                          className="points-progress-fill"
                          style={{
                            width: `${
                              user.points < 300
                                ? (user.points / 300) * 100
                                : user.points < 1000
                                  ? ((user.points - 300) / 700) * 100
                                  : user.points < 3000
                                    ? ((user.points - 1000) / 2000) * 100
                                    : 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        {user.points < 300
                          ? `${300 - user.points} points until next unlock`
                          : user.points < 1000
                            ? `${1000 - user.points} points until next unlock`
                            : user.points < 3000
                              ? `${3000 - user.points} points until next unlock`
                              : "All games unlocked!"}
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-4">Account Activity</h3>
                    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                      <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Account Created</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Last Login</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Today</p>
                          </div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Email Verified</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {user.emailVerified ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

