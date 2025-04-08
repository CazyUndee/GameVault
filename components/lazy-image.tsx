"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current || priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px", // Load images 200px before they come into view
        threshold: 0.01,
      },
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) observer.disconnect()
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const combinedClassName = `lazy-image ${isLoaded ? "loaded" : ""} ${className}`

  return (
    <div ref={imgRef} className={`relative ${fill ? "w-full h-full" : ""}`}>
      {(isInView || priority) && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={combinedClassName}
          onLoad={handleLoad}
          loading={priority ? "eager" : "lazy"}
          {...props}
        />
      )}
    </div>
  )
}
