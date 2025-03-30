import { type NextRequest, NextResponse } from "next/server"
import { incrementLikes, incrementDislikes, setUserRating } from "@/lib/kv"

export async function POST(request: NextRequest) {
  try {
    const { action, contentId, userId } = await request.json()

    if (!contentId || !userId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let result
    if (action === "like") {
      result = await incrementLikes(contentId)
      await setUserRating(userId, contentId, "like")
    } else if (action === "dislike") {
      result = await incrementDislikes(contentId)
      await setUserRating(userId, contentId, "dislike")
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ success: true, count: result })
  } catch (error) {
    console.error("Error handling rating:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

