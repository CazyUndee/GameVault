import { kv } from "@vercel/kv"

// Cache TTL in seconds
const DEFAULT_TTL = 3600 // 1 hour

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const cachedData = await kv.get<T>(key)
    return cachedData
  } catch (error) {
    console.error("Error getting cache:", error)
    return null
  }
}

export async function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): Promise<void> {
  try {
    await kv.set(key, data, { ex: ttl })
  } catch (error) {
    console.error("Error setting cache:", error)
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await kv.del(key)
  } catch (error) {
    console.error("Error deleting cache:", error)
  }
}

export async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL,
): Promise<T> {
  try {
    // Try to get from cache first
    const cachedData = await getCache<T>(key)

    if (cachedData) {
      return cachedData
    }

    // If not in cache, fetch the data
    const data = await fetchFn()

    // Store in cache for future use
    await setCache(key, data, ttl)

    return data
  } catch (error) {
    console.error("Error in getCachedOrFetch:", error)
    // If cache fails, just fetch the data directly
    return fetchFn()
  }
}
