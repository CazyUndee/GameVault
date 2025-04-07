import { type NextRequest, NextResponse } from "next/server"
import { setRating, getUserRating } from "@/lib/kv"

export async function POST(request: NextRequest) {
  try {
    const { action, contentId, userId } = await request.json()

    if (!contentId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get current user rating
    const currentRating = await getUserRating(userId, contentId)

    // Determine the new rating
    let newRating: "like" | "dislike" | null = null

    if (action === "like") {
      // If already liked, remove the like
      if (currentRating === "like") {
        newRating = null
      } else {
        newRating = "like"
      }
    } else if (action === "dislike") {
      // If already disliked, remove the dislike
      if (currentRating === "dislike") {
        newRating = null
      } else {
        newRating = "dislike"
      }
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    // Update the rating
    const result = await setRating(contentId, userId, newRating)

    return NextResponse.json({
      success: true,
      likes: result.likes,
      dislikes: result.dislikes,
      userRating: newRating,
    })
  } catch (error) {
    console.error("Error handling rating:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

