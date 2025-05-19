'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useAnimation } from 'framer-motion'

export default function CustomCursor() {
    const [isDark, setIsDark] = useState(false)
    const [variant, setVariant] = useState<'default' | 'text'>('default')

    // Motion values for x and y position
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Smooth spring animations for position
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

    // Controls for size, border, boxShadow, mixBlendMode
    const controls = useAnimation()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const offset = variant === 'text' ? 75 : 20
            mouseX.set(e.clientX - offset)
            mouseY.set(e.clientY - offset)
        }

        window.addEventListener('mousemove', handleMouseMove)

        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'))
        }

        checkDarkMode()

        const observer = new MutationObserver(checkDarkMode)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            observer.disconnect()
        }
    }, [mouseX, mouseY, variant])

    useEffect(() => {
        if (variant === 'default') {
            controls.start({
                width: 40,
                height: 40,
                borderWidth: 3,
                borderColor: isDark ? '#22d3ee' : '#007bff',
                boxShadow: isDark
                    ? '0 0 12px rgba(34, 211, 238, 0.7)'
                    : '0 0 12px rgba(0, 123, 255, 0.5)',
                mixBlendMode: 'initial',
                borderRadius: '50%',
                transition: { duration: 0.2, ease: 'easeOut' },
            })
        } else if (variant === 'text') {
            controls.start({
                width: 150,
                height: 150,
                borderWidth: 4,
                borderColor: isDark ? '#f87171' : '#ff5733',
                boxShadow: isDark
                    ? '0 0 20px rgba(248, 113, 113, 0.9)'
                    : '0 0 20px rgba(255, 87, 51, 0.7)',
                mixBlendMode: 'difference',
                borderRadius: '50%',
                transition: { duration: 0.2, ease: 'easeOut' },
            })
        }
    }, [variant, isDark, controls])

    useEffect(() => {
        window.enterTextCursor = () => setVariant('text')
        window.leaveTextCursor = () => setVariant('default')

        return () => {
            delete window.enterTextCursor
            delete window.leaveTextCursor
        }
    }, [])

    return (
        <motion.div
            className="custom-cursor hidden md:block fixed top-0 left-0 pointer-events-none z-50"
            style={{
                translateX: springX,
                translateY: springY,
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
            animate={controls}
            initial={{
                width: 40,
                height: 40,
                borderWidth: 3,
                borderStyle: 'solid',
                borderColor: isDark ? '#22d3ee' : '#007bff',
                boxShadow: isDark
                    ? '0 0 12px rgba(34, 211, 238, 0.7)'
                    : '0 0 12px rgba(0, 123, 255, 0.5)',
                mixBlendMode: 'initial',
                borderRadius: '50%',
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
