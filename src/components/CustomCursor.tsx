"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [cursorVariant, setCursorVariant] = useState("default")

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const variants = {
        default: {
            x: mousePosition.x - 20,  // Adjust to center the cursor
            y: mousePosition.y - 20,  // Adjust to center the cursor
            height: 40,  // Set size of cursor
            width: 40,   // Set size of cursor
            backgroundColor: "transparent",  // Make background transparent
            border: "3px solid #007bff",  // Blue border for default cursor
            borderRadius: "50%",  // Circular shape
            boxShadow: "0 0 12px rgba(0, 123, 255, 0.5)",  // Soft shadow effect
        },
        text: {
            x: mousePosition.x - 75,
            y: mousePosition.y - 75,
            height: 150,
            width: 150,
            backgroundColor: "transparent",  // Transparent background for text cursor
            border: "4px solid #ff5733",  // Change border color to orange for text
            mixBlendMode: "difference" as const,  // Invert colors on text hover
            borderRadius: "50%",  // Circular shape
            boxShadow: "0 0 20px rgba(255, 87, 51, 0.7)",  // Strong shadow for text hover
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
            transition={{ type: "spring", stiffness: 500, damping: 28 }}  // Smooth movement
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
