"use client"

export function getUserId(): string {
  if (typeof window === "undefined") {
    return ""
  }

  let userId = localStorage.getItem("user_id")

  if (!userId) {
    userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    localStorage.setItem("user_id", userId)
  }

  return userId
}
