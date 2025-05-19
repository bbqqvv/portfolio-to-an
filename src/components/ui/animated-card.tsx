"use client"

import { forwardRef, ReactNode, useEffect, useRef } from "react"
import gsap from "gsap"

interface AnimatedCardProps {
    children: ReactNode
    className?: string
    delay?: number
    hover?: boolean
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
    ({ children, className = "", delay = 0, hover = true }, ref) => {
        const localRef = useRef<HTMLDivElement>(null)
        const elementRef = (ref as React.RefObject<HTMLDivElement>) || localRef

        useEffect(() => {
            const el = elementRef.current
            if (!el) return

            // GSAP animation on mount or when element enters viewport
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            gsap.to(el, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                delay: delay * 0.1,
                                ease: "power3.out",
                            })
                            observer.unobserve(el)
                        }
                    })
                },
                { threshold: 0.1 }
            )

            // Initialize with opacity 0 and y=20
            gsap.set(el, { opacity: 0, y: 20 })

            observer.observe(el)

            return () => observer.disconnect()
        }, [delay, elementRef])

        useEffect(() => {
            if (!hover) return

            const el = elementRef.current
            if (!el) return

            const onMouseEnter = () => {
                gsap.to(el, {
                    y: -5,
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power1.out",
                })
            }

            const onMouseLeave = () => {
                gsap.to(el, {
                    y: 0,
                    scale: 1,
                    duration: 0.2,
                    ease: "power1.out",
                })
            }

            el.addEventListener("mouseenter", onMouseEnter)
            el.addEventListener("mouseleave", onMouseLeave)

            return () => {
                el.removeEventListener("mouseenter", onMouseEnter)
                el.removeEventListener("mouseleave", onMouseLeave)
            }
        }, [hover, elementRef])

        return (
            <div ref={elementRef} className={className} style={{ willChange: "transform, opacity" }}>
                {children}
            </div>
        )
    }
)

AnimatedCard.displayName = "AnimatedCard"
