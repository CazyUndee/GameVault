"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { Laptop } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpId, setOtpId] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtpForm, setShowOtpForm] = useState(false)

  const { login, signup, socialLogin, sendOTP, verifyOTP } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for OAuth callback
  useEffect(() => {
    const provider = searchParams.get("provider")
    const code = searchParams.get("code")

    if (provider && code) {
      // Handle OAuth callback
      handleOAuthCallback(provider, code)
    }
  }, [searchParams])

  const handleOAuthCallback = async (provider: string, code: string) => {
    setIsLoading(true)
    setError("")

    try {
      // In a real app, we would exchange the code for a token
      // For demo purposes, we'll simulate a successful login
      const result = await socialLogin(provider)

      if (result.success) {
        setSuccess(`${result.message}! Redirecting...`)
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error(`OAuth callback error:`, error)
      setError(`An error occurred during ${provider} login. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long"
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      return "Password must contain both letters and numbers"
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      if (activeTab === "login") {
        // Login
        const result = await login(email, password)
        if (result.success) {
          setSuccess(`${result.message}! Redirecting...`)
          setTimeout(() => {
            router.push("/")
          }, 1500)
        } else {
          setError(result.message)
        }
      } else {
        // Signup
        // Validate password
        const passwordError = validatePassword(password)
        if (passwordError) {
          setError(passwordError)
          setIsLoading(false)
          return
        }

        // Check if passwords match
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }

        const result = await signup(username, email, password)
        if (result.success) {
          setSuccess("Account created successfully! Redirecting...")
          setTimeout(() => {
            router.push("/")
          }, 1500)
        } else {
          setError(result.message)
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    // For demo purposes, we'll redirect to a simulated OAuth flow
    // In a real app, you would use actual OAuth client IDs

    // Simulate the OAuth flow by redirecting to the provider's site
    let authUrl = ""

    switch (provider) {
      case "google":
        // In a real app, you would use your actual Google OAuth client ID
        authUrl =
          "https://accounts.google.com/o/oauth2/v2/auth?client_id=DEMO_CLIENT_ID&redirect_uri=" +
          encodeURIComponent(window.location.origin + "/auth?provider=google") +
          "&response_type=code&scope=email%20profile"
        break
      case "github":
        // In a real app, you would use your actual GitHub OAuth client ID
        authUrl =
          "https://github.com/login/oauth/authorize?client_id=DEMO_CLIENT_ID&redirect_uri=" +
          encodeURIComponent(window.location.origin + "/auth?provider=github") +
          "&scope=user:email"
        break
      case "microsoft":
        // In a real app, you would use your actual Microsoft OAuth client ID
        authUrl =
          "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=DEMO_CLIENT_ID&redirect_uri=" +
          encodeURIComponent(window.location.origin + "/auth?provider=microsoft") +
          "&response_type=code&scope=openid%20profile%20email"
        break
      default:
        // For demo purposes, we'll just simulate a successful login
        socialLogin(provider).then((result) => {
          if (result.success) {
            setSuccess(`${result.message}! Redirecting...`)
            setTimeout(() => {
              router.push("/")
            }, 1500)
          } else {
            setError(result.message)
          }
        })
        return
    }

    // For demo purposes, we'll open the auth URL in a new window
    // In a real app, you would redirect the current window
    window.open(authUrl, "_blank", "width=600,height=700")

    // Show a message to the user
    setSuccess(`Please complete the ${provider} login in the popup window.`)
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      if (!email) {
        setError("Please enter your email address")
        setIsLoading(false)
        return
      }

      const result = await sendOTP(email)
      if (result.success && result.otpId) {
        setOtpId(result.otpId)
        setShowOtpForm(true)
        setSuccess(result.message)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Send OTP error:", error)
      setError("An error occurred while sending the OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      if (!otp) {
        setError("Please enter the OTP sent to your email")
        setIsLoading(false)
        return
      }

      const result = await verifyOTP(otpId, otp)
      if (result.success) {
        setSuccess(`${result.message} Redirecting...`)
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Verify OTP error:", error)
      setError("An error occurred while verifying the OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20 flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Welcome to GameVaultX</h1>

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

            <Tabs defaultValue="login" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="otp">OTP Login</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                      Username
                    </label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full auth-button" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="signup-username" className="block text-sm font-medium mb-1">
                      Username
                    </label>
                    <Input
                      id="signup-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Must be at least 8 characters with letters and numbers
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full auth-button" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="otp">
                {!showOtpForm ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div>
                      <label htmlFor="otp-email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="otp-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Enter your email to receive OTP"
                      />
                    </div>

                    <Button type="submit" className="w-full auth-button" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send OTP"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div>
                      <label htmlFor="otp-code" className="block text-sm font-medium mb-1">
                        Enter OTP
                      </label>
                      <Input
                        id="otp-code"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Enter the 6-digit code sent to your email"
                      />
                    </div>

                    <Button type="submit" className="w-full auth-button" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>

                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        onClick={handleSendOTP}
                        disabled={isLoading}
                      >
                        Resend OTP
                      </button>
                    </div>
                  </form>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-300 dark:border-zinc-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="auth-button"
                >
                  {/* Google Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("github")}
                  disabled={isLoading}
                  className="auth-button"
                >
                  {/* GitHub Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5"
                  >
                    <path
                      fill="currentColor"
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    />
                  </svg>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("microsoft")}
                  disabled={isLoading}
                  className="auth-button"
                >
                  <Laptop className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
