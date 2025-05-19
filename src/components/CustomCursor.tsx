"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [isDark, setIsDark] = useState(false)
    const [variant, setVariant] = useState<"default" | "text">("default")

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cursorRef.current) return

            const { clientX: x, clientY: y } = e
            const offset = variant === "text" ? 75 : 20

            gsap.to(cursorRef.current, {
                x: x - offset,
                y: y - offset,
                duration: 0.15,
                ease: "power2.out",
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains("dark"))
        }

        checkDarkMode()

        const observer = new MutationObserver(checkDarkMode)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            observer.disconnect()
        }
    }, [variant])

    useEffect(() => {
        if (!cursorRef.current) return

        const el = cursorRef.current

        if (variant === "default") {
            gsap.to(el, {
                width: 40,
                height: 40,
                border: `3px solid ${isDark ? "#22d3ee" : "#007bff"}`,
                boxShadow: isDark
                    ? "0 0 12px rgba(34, 211, 238, 0.7)"
                    : "0 0 12px rgba(0, 123, 255, 0.5)",
                mixBlendMode: "initial",
                duration: 0.2,
                ease: "power2.out",
            })
        } else if (variant === "text") {
            gsap.to(el, {
                width: 150,
                height: 150,
                border: `4px solid ${isDark ? "#f87171" : "#ff5733"}`,
                boxShadow: isDark
                    ? "0 0 20px rgba(248, 113, 113, 0.9)"
                    : "0 0 20px rgba(255, 87, 51, 0.7)",
                mixBlendMode: "difference",
                duration: 0.2,
                ease: "power2.out",
            })
        }
    }, [variant, isDark])

    useEffect(() => {
        window.enterTextCursor = () => setVariant("text")
        window.leaveTextCursor = () => setVariant("default")

        return () => {
            delete window.enterTextCursor
            delete window.leaveTextCursor
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className="custom-cursor hidden md:block fixed top-0 left-0 pointer-events-none z-50 rounded-full"
            style={{
                position: "fixed",
                width: 40,
                height: 40,
                border: `3px solid ${isDark ? "#22d3ee" : "#007bff"}`,
                boxShadow: isDark
                    ? "0 0 12px rgba(34, 211, 238, 0.7)"
                    : "0 0 12px rgba(0, 123, 255, 0.5)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 9999,
                mixBlendMode: "initial",
            }}
        />
    )
}

declare global {
    interface Window {
        enterTextCursor?: () => void
        leaveTextCursor?: () => void
    }
}
