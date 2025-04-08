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

export async function setRating(
  id: string,
  userId: string,
  rating: "like" | "dislike" | null,
): Promise<{ likes: number; dislikes: number }> {
  try {
    // Get current user rating
    const currentRating = await getUserRating(userId, id)

    // Get current counts
    let likes = await getLikes(id)
    let dislikes = await getDislikes(id)

    // If user already rated, remove that rating first
    if (currentRating === "like") {
      likes = Math.max(0, likes - 1)
      await kv.set(`likes:${id}`, likes)
    } else if (currentRating === "dislike") {
      dislikes = Math.max(0, dislikes - 1)
      await kv.set(`dislikes:${id}`, dislikes)
    }

    // If new rating is null (removing rating), just update user rating
    if (rating === null) {
      await kv.del(`user:${userId}:rating:${id}`)
      return { likes, dislikes }
    }

    // Apply new rating
    if (rating === "like") {
      likes += 1
      await kv.set(`likes:${id}`, likes)
    } else if (rating === "dislike") {
      dislikes += 1
      await kv.set(`dislikes:${id}`, dislikes)
    }

    // Update user rating
    await kv.set(`user:${userId}:rating:${id}`, rating)

    return { likes, dislikes }
  } catch (error) {
    console.error("Error setting rating:", error)
    return { likes: await getLikes(id), dislikes: await getDislikes(id) }
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

// Comments
export type Comment = {
  id: string
  user: string
  text: string
  date: string
  likes: number
  dislikes: number
  replies?: Comment[]
  parentId?: string
  mentions?: string[]
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

    // Check for mentions in the comment text
    const mentionRegex = /@(\w+)/g
    const mentions = []
    let match

    while ((match = mentionRegex.exec(comment.text)) !== null) {
      mentions.push(match[1])
    }

    comment.mentions = mentions.length > 0 ? mentions : undefined

    // If it's a reply, add it to the parent comment
    if (comment.parentId) {
      const updatedComments = addReplyToComment(comments, comment)
      await kv.set(`comments:${contentId}`, updatedComments)
    } else {
      // Otherwise add it as a top-level comment
      comments.push(comment)
      await kv.set(`comments:${contentId}`, comments)
    }
  } catch (error) {
    console.error("Error adding comment:", error)
  }
}

// Helper function to add a reply to a comment
function addReplyToComment(comments: Comment[], reply: Comment): Comment[] {
  return comments.map((comment) => {
    if (comment.id === reply.parentId) {
      // Add reply to this comment
      const replies = comment.replies || []
      return {
        ...comment,
        replies: [...replies, reply],
      }
    } else if (comment.replies && comment.replies.length > 0) {
      // Check in nested replies
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, reply),
      }
    }
    return comment
  })
}

export async function updateCommentRating(
  contentId: string,
  commentId: string,
  userId: string,
  action: "like" | "dislike" | null,
): Promise<Comment[]> {
  try {
    const comments = await getComments(contentId)

    // Get current user rating for this comment
    const currentRating = await kv.get<string>(`user:${userId}:comment:${commentId}`)

    // Update the comments with the new rating
    const updatedComments = updateCommentRatingHelper(comments, commentId, action, currentRating as string | null)

    // Update user's rating for this comment
    if (action === null) {
      await kv.del(`user:${userId}:comment:${commentId}`)
    } else {
      await kv.set(`user:${userId}:comment:${commentId}`, action)
    }

    await kv.set(`comments:${contentId}`, updatedComments)
    return updatedComments
  } catch (error) {
    console.error("Error updating comment rating:", error)
    return await getComments(contentId)
  }
}

// Helper function to update a comment's rating
function updateCommentRatingHelper(
  comments: Comment[],
  commentId: string,
  action: "like" | "dislike" | null,
  currentRating: string | null,
): Comment[] {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      // Remove current rating if exists
      let likes = comment.likes
      let dislikes = comment.dislikes

      if (currentRating === "like") {
        likes = Math.max(0, likes - 1)
      } else if (currentRating === "dislike") {
        dislikes = Math.max(0, dislikes - 1)
      }

      // Apply new rating if not null
      if (action === "like") {
        likes += 1
      } else if (action === "dislike") {
        dislikes += 1
      }

      return {
        ...comment,
        likes,
        dislikes,
      }
    } else if (comment.replies && comment.replies.length > 0) {
      // Check in nested replies
      return {
        ...comment,
        replies: updateCommentRatingHelper(comment.replies, commentId, action, currentRating),
      }
    }
    return comment
  })
}

// Generate a unique user ID for the browser if one doesn't exist
export function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
