"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface ChibiBackgroundProps {
    className?: string
}

export function ChibiBackground({ className = "" }: ChibiBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number | null>(null)
    const { theme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === canvas) {
                    width = canvas.width = entry.contentRect.width
                    height = canvas.height = entry.contentRect.height
                }
            }
        })

        resizeObserver.observe(canvas)

        // Các màu pastel (light mode)
        const lightColors = [
            { r: 255, g: 230, b: 240 }, // pastel pink
            { r: 230, g: 240, b: 255 }, // pastel blue
            { r: 255, g: 250, b: 230 }, // pastel yellow
            { r: 230, g: 255, b: 240 }, // pastel green
            { r: 245, g: 230, b: 255 }, // pastel purple
        ]

        // Màu cho dark mode: giảm sáng, trầm hơn
        const darkColors = [
            { r: 120, g: 60, b: 70 },
            { r: 70, g: 90, b: 140 },
            { r: 140, g: 140, b: 70 },
            { r: 70, g: 140, b: 90 },
            { r: 140, g: 70, b: 140 },
        ]

        // Chọn màu theo theme
        const colors = theme === "dark" ? darkColors : lightColors

        // Màu nền theo theme
        const backgroundColor = theme === "dark" ? "rgb(20, 20, 30)" : "rgb(255, 250, 245)"

        // Khởi tạo bubbles và stars với màu tương ứng
        const numBubbles = 15
        const bubbles = Array.from({ length: numBubbles }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 60 + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.3 + 0.1,
        }))

        const numStars = 20
        const stars = Array.from({ length: numStars }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 15 + 5,
            rotation: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: Math.random() * 0.3 - 0.15,
            vy: Math.random() * 0.3 - 0.15,
            rotationSpeed: (Math.random() * 0.02 - 0.01) * Math.PI,
        }))

        function drawStar(
            x: number,
            y: number,
            size: number,
            rotation: number,
            color: { r: number; g: number; b: number },
        ) {
            if (!ctx) return
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(rotation)
            ctx.beginPath()

            for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5 - Math.PI / 2
                const outerX = Math.cos(angle) * size
                const outerY = Math.sin(angle) * size
                const innerAngle = angle + Math.PI / 5
                const innerX = Math.cos(innerAngle) * (size / 2)
                const innerY = Math.sin(innerAngle) * (size / 2)

                if (i === 0) {
                    ctx.moveTo(outerX, outerY)
                } else {
                    ctx.lineTo(outerX, outerY)
                }

                ctx.lineTo(innerX, innerY)
            }

            ctx.closePath()
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`
            ctx.fill()
            ctx.restore()
        }

        function animate() {
            if (!ctx) return
            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, width, height)

            bubbles.forEach((bubble) => {
                bubble.x += bubble.vx
                bubble.y += bubble.vy

                if (bubble.x < -bubble.radius || bubble.x > width + bubble.radius) {
                    bubble.vx = -bubble.vx
                }
                if (bubble.y < -bubble.radius || bubble.y > height + bubble.radius) {
                    bubble.vy = -bubble.vy
                }

                ctx.beginPath()
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${bubble.color.r}, ${bubble.color.g}, ${bubble.color.b}, ${bubble.opacity})`
                ctx.fill()
            })

            stars.forEach((star) => {
                star.x += star.vx
                star.y += star.vy
                star.rotation += star.rotationSpeed

                if (star.x < -star.size) star.x = width + star.size
                if (star.x > width + star.size) star.x = -star.size
                if (star.y < -star.size) star.y = height + star.size
                if (star.y > height + star.size) star.y = -star.size

                drawStar(star.x, star.y, star.size, star.rotation, star.color)
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            resizeObserver.disconnect()
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [theme]) // thêm theme vào dependencies để khi theme thay đổi sẽ chạy lại effect

    return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} />
}
