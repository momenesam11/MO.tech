'use client'
import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  delay?: number
  once?: boolean
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, once = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, isVisible }
}
