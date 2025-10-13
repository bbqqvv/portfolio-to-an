'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MotionConfig {
  reduceMotion: boolean
  prefersReducedMotion: boolean
  isMobile: boolean
  shouldAnimate: boolean
}

/**
 * Hook để tối ưu animation dựa trên device và preferences
 */
export function useOptimizedMotion(): MotionConfig {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Giảm animation trên mobile để tăng hiệu suất
      setShouldAnimate(!shouldReduceMotion && (!mobile || window.innerWidth > 1024))
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [shouldReduceMotion])

  return {
    reduceMotion: shouldReduceMotion || false,
    prefersReducedMotion: shouldReduceMotion || false,
    isMobile,
    shouldAnimate
  }
}

/**
 * Hook để lazy load animations chỉ khi element visible
 */
export function useLazyAnimation(threshold: number = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const { shouldAnimate } = useOptimizedMotion()

  const ref = (node: Element | null) => {
    if (!node || !shouldAnimate) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '50px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }

  return { ref, isInView, shouldAnimate }
}

/**
 * Hook để preload animations khi hover
 */
export function usePreloadAnimation() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPreloaded, setIsPreloaded] = useState(false)

  const onMouseEnter = () => {
    setIsHovered(true)
    if (!isPreloaded) {
      setIsPreloaded(true)
    }
  }

  const onMouseLeave = () => {
    setIsHovered(false)
  }

  return {
    isHovered,
    isPreloaded,
    onMouseEnter,
    onMouseLeave
  }
}

/**
 * Hook để throttle animation updates
 */
export function useThrottledAnimation(callback: () => void, delay: number = 16) {
  const [isThrottled, setIsThrottled] = useState(false)

  const throttledCallback = () => {
    if (!isThrottled) {
      callback()
      setIsThrottled(true)
      setTimeout(() => setIsThrottled(false), delay)
    }
  }

  return throttledCallback
}
