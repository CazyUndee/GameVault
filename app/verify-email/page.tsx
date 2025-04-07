"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle, XCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyEmail } = useAuth()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = searchParams.get("token")
        if (!token) {
          setIsSuccess(false)
          setMessage("Invalid verification link. Please try again.")
          setIsVerifying(false)
          return
        }

        const result = await verifyEmail(token)
        setIsSuccess(result.success)
        setMessage(result.message)
      } catch (error) {
        console.error("Error verifying email:", error)
        setIsSuccess(false)
        setMessage("An error occurred while verifying your email. Please try again.")
      } finally {
        setIsVerifying(false)
      }
    }

    verifyToken()
  }, [searchParams, verifyEmail])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700 p-8">
          <div className="text-center">
            {isVerifying ? (
              <>
                <div className="animate-pulse mb-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700 mx-auto"></div>
                </div>
                <h1 className="text-2xl font-bold mb-2">Verifying Email</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Please wait while we verify your email address...</p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Email Verified</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">{message}</p>
                <Button onClick={() => router.push("/profile")}>Go to Profile</Button>
              </>
            ) : (
              <>
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">{message}</p>
                <Button onClick={() => router.push("/profile")}>Go to Profile</Button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

