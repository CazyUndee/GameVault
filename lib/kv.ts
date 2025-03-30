import { kv } from "@vercel/kv"

// Helper functions for interacting with Vercel KV
export async function getLikes(id: string): Promise<number> {
  try {
    const likes = await kv.get<number>(`likes:${id}`)
    return likes || 0
  } catch (error) {
    console.error("Error getting likes:", error)
    return 0
  }
}

export async function getDislikes(id: string): Promise<number> {
  try {
    const dislikes = await kv.get<number>(`dislikes:${id}`)
    return dislikes || 0
  } catch (error) {
    console.error("Error getting dislikes:", error)
    return 0
  }
}

export async function incrementLikes(id: string): Promise<number> {
  try {
    const newValue = await kv.incr(`likes:${id}`)
    return newValue
  } catch (error) {
    console.error("Error incrementing likes:", error)
    return 0
  }
}

export async function incrementDislikes(id: string): Promise<number> {
  try {
    const newValue = await kv.incr(`dislikes:${id}`)
    return newValue
  } catch (error) {
    console.error("Error incrementing dislikes:", error)
    return 0
  }
}

export async function getUserRating(userId: string, contentId: string): Promise<string | null> {
  try {
    const rating = await kv.get<string>(`user:${userId}:rating:${contentId}`)
    return rating
  } catch (error) {
    console.error("Error getting user rating:", error)
    return null
  }
}

export async function setUserRating(userId: string, contentId: string, rating: string): Promise<void> {
  try {
    await kv.set(`user:${userId}:rating:${contentId}`, rating)
  } catch (error) {
    console.error("Error setting user rating:", error)
  }
}

// Comments
export type Comment = {
  id: string
  user: string
  text: string
  date: string
  likes: number
  dislikes: number
}

export async function getComments(contentId: string): Promise<Comment[]> {
  try {
    const comments = await kv.get<Comment[]>(`comments:${contentId}`)
    return comments || []
  } catch (error) {
    console.error("Error getting comments:", error)
    return []
  }
}

export async function addComment(contentId: string, comment: Comment): Promise<void> {
  try {
    const comments = await getComments(contentId)
    comments.push(comment)
    await kv.set(`comments:${contentId}`, comments)
  } catch (error) {
    console.error("Error adding comment:", error)
  }
}

export async function updateCommentLikes(
  contentId: string,
  commentId: string,
  action: "like" | "dislike",
): Promise<void> {
  try {
    const comments = await getComments(contentId)
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        if (action === "like") {
          return { ...comment, likes: comment.likes + 1 }
        } else {
          return { ...comment, dislikes: comment.dislikes + 1 }
        }
      }
      return comment
    })

    await kv.set(`comments:${contentId}`, updatedComments)
  } catch (error) {
    console.error("Error updating comment likes:", error)
  }
}

// Generate a unique user ID for the browser if one doesn't exist
export function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

