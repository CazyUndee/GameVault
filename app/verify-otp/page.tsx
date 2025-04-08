"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyOTP } = useAuth()

  const otpId = searchParams.get("id") || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsVerifying(true)

    try {
      if (!otp) {
        setError("Please enter the OTP sent to your email")
        setIsVerifying(false)
        return
      }

      if (!otpId) {
        setError("Invalid OTP verification link. Please try again.")
        setIsVerifying(false)
        return
      }

      const result = await verifyOTP(otpId, otp)
      if (result.success) {
        setSuccess(`${result.message} Redirecting...`)
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setError("An error occurred while verifying the OTP. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Enter the one-time password (OTP) sent to your email address.
            </p>
          </div>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-1">
                Enter OTP
              </label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the 6-digit code"
                required
                disabled={isVerifying}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Didn't receive the code?{" "}
              <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/auth?tab=otp")}>
                Resend OTP
              </Button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
