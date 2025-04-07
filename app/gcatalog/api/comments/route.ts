import { type NextRequest, NextResponse } from "next/server"
import { getComments, addComment, updateCommentRating, type Comment } from "@/lib/kv"

export async function GET(request: NextRequest) {
  try {
    const contentId = request.nextUrl.searchParams.get("contentId")

    if (!contentId) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
    }

    const comments = await getComments(contentId)
    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Error getting comments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { contentId, user, text, parentId } = await request.json()

    if (!contentId || !user || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      user,
      text,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      parentId,
    }

    await addComment(contentId, newComment)
    const updatedComments = await getComments(contentId)

    return NextResponse.json({ success: true, comments: updatedComments })
  } catch (error) {
    console.error("Error adding comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { contentId, commentId, userId, action } = await request.json()

    if (!contentId || !commentId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Determine the new rating action
    let newAction: "like" | "dislike" | null = null

    if (action === "like" || action === "dislike") {
      newAction = action
    } else if (action === "unlike" || action === "undislike") {
      newAction = null
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const updatedComments = await updateCommentRating(contentId, commentId, userId, newAction)

    return NextResponse.json({ success: true, comments: updatedComments })
  } catch (error) {
    console.error("Error updating comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

