"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  username: string
  email: string
  emailVerified: boolean
  points: number
  favorites: string[]
  wishlist: string[]
  createdAt: string
  provider?: string
  displayName?: string
  profileImage?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  socialLogin: (provider: string) => Promise<{ success: boolean; message: string }>
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>
  sendVerificationEmail: (email: string) => Promise<{ success: boolean; message: string }>
  sendOTP: (email: string) => Promise<{ success: boolean; message: string; otpId?: string }>
  verifyOTP: (otpId: string, otp: string) => Promise<{ success: boolean; message: string }>
  addFavorite: (gameId: string) => Promise<void>
  removeFavorite: (gameId: string) => Promise<void>
  addToWishlist: (gameId: string) => Promise<void>
  removeFromWishlist: (gameId: string) => Promise<void>
  addPoints: (points: number) => Promise<void>
  shareFavorites: () => Promise<{ success: boolean; shareUrl: string; message: string }>
  updateProfile: (data: { displayName?: string; profileImage?: string }) => Promise<{
    success: boolean
    message: string
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // Fix the login function to preserve username case and ensure points are properly synced
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful login with localStorage

      // Check if user exists in localStorage (simulating a database)
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)

      // If no users exist yet, create a default admin user for testing
      if (users.length === 0) {
        const defaultUser = {
          id: `user_${Date.now()}`,
          username: email.split("@")[0], // Preserve original case
          displayName: email.split("@")[0], // Store display name separately
          email: email,
          emailVerified: true,
          password: password, // In a real app, this would be hashed
          points: 100,
          favorites: [],
          wishlist: [],
          createdAt: new Date().toISOString(),
        }

        users.push(defaultUser)
        localStorage.setItem("users", JSON.stringify(users))

        // Remove password before storing in state
        const { password: _, ...userWithoutPassword } = defaultUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))

        return { success: true, message: "Login successful with new account" }
      }

      // Try to find user by email (case insensitive)
      const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())

      // If user not found but we have an email that looks valid, create a new account
      if (!foundUser && email.includes("@")) {
        const username = email.split("@")[0] // Preserve original case
        const newUser = {
          id: `user_${Date.now()}`,
          username: username, // Preserve original case
          displayName: username, // Store display name separately
          email: email,
          emailVerified: false,
          password: password, // In a real app, this would be hashed
          points: 100,
          favorites: [],
          wishlist: [],
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))

        // Remove password before storing in state
        const { password: _, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))

        // In a real app, we would send a verification email here
        console.log("Verification email would be sent to:", email)

        return { success: true, message: "Account created and logged in successfully. Please verify your email." }
      }

      // If user exists, check password
      if (foundUser) {
        // In a real app, you would hash and compare passwords
        // This is just for demonstration
        if (foundUser.password === password) {
          // Remove password before storing in state
          const { password: _, ...userWithoutPassword } = foundUser

          // Set user in state and localStorage
          setUser(userWithoutPassword)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))

          // If email is not verified, remind the user
          if (!userWithoutPassword.emailVerified) {
            return { success: true, message: "Login successful. Please verify your email." }
          }

          return { success: true, message: "Login successful" }
        } else {
          return { success: false, message: "Incorrect password" }
        }
      }

      return { success: false, message: "User not found" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    }
  }

  // Fix the signup function to preserve username case
  const signup = async (username: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate user registration with localStorage

      // Check if username or email already exists
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)

      // Case-insensitive username check
      const usernameExists = users.some((u: any) => u.username.toLowerCase() === username.toLowerCase())

      if (usernameExists) {
        return { success: false, message: "Username already exists" }
      }

      const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())

      if (emailExists) {
        return { success: false, message: "Email already exists" }
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        username: username, // Preserve original case
        displayName: username, // Store display name separately
        email: email,
        emailVerified: false,
        password, // In a real app, this would be hashed
        points: 100,
        favorites: [],
        wishlist: [],
        createdAt: new Date().toISOString(),
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = newUser

      // Set user in state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      // In a real app, we would send a verification email here
      console.log("Verification email would be sent to:", email)

      return { success: true, message: "Signup successful. Please verify your email." }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, message: "An error occurred during signup" }
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Fix the social login function to preserve username case
  const socialLogin = async (provider: string) => {
    try {
      // In a real app, this would redirect to OAuth flow
      // For demo purposes, we'll simulate a successful OAuth login

      // Generate a random email based on the provider
      const randomId = Math.floor(Math.random() * 10000)
      const email = `user${randomId}@${provider.toLowerCase()}.com`
      const username = `${provider}User${randomId}` // Preserve original case

      // Check if user with this email already exists
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)

      const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())

      if (foundUser) {
        // User exists, log them in
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        return { success: true, message: `Logged in with ${provider}` }
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        username: username, // Preserve original case
        displayName: username, // Store display name separately
        email,
        emailVerified: true, // OAuth users are considered verified
        provider,
        points: 100,
        favorites: [],
        wishlist: [],
        createdAt: new Date().toISOString(),
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Set user in state and localStorage
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))

      return { success: true, message: `Account created and logged in with ${provider}` }
    } catch (error) {
      console.error(`${provider} login error:`, error)
      return { success: false, message: `An error occurred during ${provider} login` }
    }
  }

  // Email verification functions
  const verifyEmail = async (token: string) => {
    try {
      // In a real app, this would validate the token against a database
      // For demo purposes, we'll simulate a successful verification

      if (!user) {
        return { success: false, message: "No user is currently logged in" }
      }

      // Update user in state and localStorage
      const updatedUser = { ...user, emailVerified: true }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, emailVerified: true } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      return { success: true, message: "Email verified successfully" }
    } catch (error) {
      console.error("Email verification error:", error)
      return { success: false, message: "An error occurred during email verification" }
    }
  }

  const sendVerificationEmail = async (email: string) => {
    try {
      // In a real app, this would send an email with a verification link
      // For demo purposes, we'll simulate a successful email send

      console.log("Verification email would be sent to:", email)

      return { success: true, message: "Verification email sent. Please check your inbox." }
    } catch (error) {
      console.error("Send verification email error:", error)
      return { success: false, message: "An error occurred while sending the verification email" }
    }
  }

  // OTP functions
  const sendOTP = async (email: string) => {
    try {
      // In a real app, this would generate and send an OTP
      // For demo purposes, we'll simulate a successful OTP send

      const otpId = `otp_${Date.now()}`
      const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP

      // Store OTP in localStorage (in a real app, this would be in a database with expiration)
      const otpsJson = localStorage.getItem("otps") || "{}"
      const otps = JSON.parse(otpsJson)
      otps[otpId] = {
        email,
        otp,
        createdAt: new Date().toISOString(),
        // In a real app, we would add an expiration timestamp
      }
      localStorage.setItem("otps", JSON.stringify(otps))

      console.log("OTP would be sent to:", email, "OTP:", otp)

      return {
        success: true,
        message: "OTP sent to your email. Please check your inbox.",
        otpId,
      }
    } catch (error) {
      console.error("Send OTP error:", error)
      return { success: false, message: "An error occurred while sending the OTP" }
    }
  }

  const verifyOTP = async (otpId: string, otp: string) => {
    try {
      // In a real app, this would verify the OTP against a database
      // For demo purposes, we'll simulate a successful verification

      const otpsJson = localStorage.getItem("otps") || "{}"
      const otps = JSON.parse(otpsJson)

      if (!otps[otpId]) {
        return { success: false, message: "Invalid OTP ID" }
      }

      if (otps[otpId].otp !== otp) {
        return { success: false, message: "Incorrect OTP" }
      }

      // In a real app, we would check if the OTP has expired

      // Find user by email
      const email = otps[otpId].email
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())

      if (!foundUser) {
        return { success: false, message: "User not found" }
      }

      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = foundUser

      // Set user in state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      // Remove used OTP
      delete otps[otpId]
      localStorage.setItem("otps", JSON.stringify(otps))

      return { success: true, message: "OTP verified successfully. You are now logged in." }
    } catch (error) {
      console.error("Verify OTP error:", error)
      return { success: false, message: "An error occurred during OTP verification" }
    }
  }

  // Add favorite
  const addFavorite = async (gameId: string) => {
    if (!user) return

    try {
      const updatedFavorites = [...user.favorites, gameId]
      const updatedUser = { ...user, favorites: updatedFavorites }

      // Update user in state and localStorage
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, favorites: updatedFavorites } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    } catch (error) {
      console.error("Error adding favorite:", error)
    }
  }

  // Remove favorite
  const removeFavorite = async (gameId: string) => {
    if (!user) return

    try {
      const updatedFavorites = user.favorites.filter((id) => id !== gameId)
      const updatedUser = { ...user, favorites: updatedFavorites }

      // Update user in state and localStorage
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, favorites: updatedFavorites } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    } catch (error) {
      console.error("Error removing favorite:", error)
    }
  }

  // Add to wishlist
  const addToWishlist = async (gameId: string) => {
    if (!user) return

    try {
      const updatedWishlist = [...user.wishlist, gameId]
      const updatedUser = { ...user, wishlist: updatedWishlist }

      // Update user in state and localStorage
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, wishlist: updatedWishlist } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    } catch (error) {
      console.error("Error adding to wishlist:", error)
    }
  }

  // Remove from wishlist
  const removeFromWishlist = async (gameId: string) => {
    if (!user) return

    try {
      const updatedWishlist = user.wishlist.filter((id) => id !== gameId)
      const updatedUser = { ...user, wishlist: updatedWishlist }

      // Update user in state and localStorage
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, wishlist: updatedWishlist } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  // Fix the addPoints function to ensure points are properly synced
  const addPoints = async (points: number) => {
    if (!user) return

    try {
      const updatedPoints = user.points + points
      const updatedUser = { ...user, points: updatedPoints }

      // Update user in state and localStorage
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array to ensure persistence
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return { ...u, points: updatedPoints }
        }
        return u
      })
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      // Log points update for debugging
      console.log(`Points updated: +${points}, new total: ${updatedPoints}`)
    } catch (error) {
      console.error("Error adding points:", error)
    }
  }

  // Share favorites
  const shareFavorites = async () => {
    if (!user) {
      return {
        success: false,
        shareUrl: "",
        message: "You must be logged in to share your favorites",
      }
    }

    try {
      // In a real app, this would create a shareable link in the database
      // For demo purposes, we'll create a simulated share URL

      // Create a share ID
      const shareId = `share_${user.id}_${Date.now()}`

      // Store share data in localStorage (in a real app, this would be in a database)
      const sharesJson = localStorage.getItem("shares") || "{}"
      const shares = JSON.parse(sharesJson)
      shares[shareId] = {
        userId: user.id,
        username: user.username,
        favorites: user.favorites,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem("shares", JSON.stringify(shares))

      // Create share URL
      const shareUrl = `${window.location.origin}/shared/favorites/${shareId}`

      return {
        success: true,
        shareUrl,
        message: "Your favorites list has been shared successfully!",
      }
    } catch (error) {
      console.error("Error sharing favorites:", error)
      return {
        success: false,
        shareUrl: "",
        message: "An error occurred while sharing your favorites",
      }
    }
  }

  // Update profile
  const updateProfile = async (data: { displayName?: string; profileImage?: string }) => {
    if (!user) {
      return {
        success: false,
        message: "You must be logged in to update your profile",
      }
    }

    try {
      // Update user data
      const updatedUser = { ...user, ...data }

      // Update user in state and localStorage
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in users array
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...data } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      return {
        success: true,
        message: "Profile updated successfully",
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      return {
        success: false,
        message: "An error occurred while updating your profile",
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        socialLogin,
        verifyEmail,
        sendVerificationEmail,
        sendOTP,
        verifyOTP,
        addFavorite,
        removeFavorite,
        addToWishlist,
        removeFromWishlist,
        addPoints,
        shareFavorites,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
