"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [cursorVariant, setCursorVariant] = useState("default")
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)

        // Kiểm tra dark mode theo class trên html
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains("dark"))
        }

        checkDarkMode()
        // Lắng nghe sự thay đổi class nếu bạn dùng JS toggle dark mode
        const observer = new MutationObserver(checkDarkMode)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            observer.disconnect()
        }
    }, [])

    const variants = {
        default: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            height: 40,
            width: 40,
            backgroundColor: "transparent",
            border: isDark ? "3px solid #22d3ee" : "3px solid #007bff", // Cyan for dark, Blue for light
            borderRadius: "50%",
            boxShadow: isDark
                ? "0 0 12px rgba(34, 211, 238, 0.7)"  // lighter cyan glow
                : "0 0 12px rgba(0, 123, 255, 0.5)",  // blue glow
        },
        text: {
            x: mousePosition.x - 75,
            y: mousePosition.y - 75,
            height: 150,
            width: 150,
            backgroundColor: "transparent",
            border: isDark ? "4px solid #f87171" : "4px solid #ff5733",  // Light red for dark, orange for light
            mixBlendMode: "difference" as const,
            borderRadius: "50%",
            boxShadow: isDark
                ? "0 0 20px rgba(248, 113, 113, 0.9)"  // bright red glow
                : "0 0 20px rgba(255, 87, 51, 0.7)",   // orange glow
        },
    }

    useEffect(() => {
        window.enterTextCursor = () => setCursorVariant("text")
        window.leaveTextCursor = () => setCursorVariant("default")

        return () => {
            // @ts-ignore
            delete window.enterTextCursor
            // @ts-ignore
            delete window.leaveTextCursor
        }
    }, [])

    return (
        <motion.div
            className="custom-cursor hidden md:block fixed top-0 left-0 pointer-events-none z-50"
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    )
}

// Add these to the global Window interface
declare global {
    interface Window {
        enterTextCursor: () => void
        leaveTextCursor: () => void
    }
}
