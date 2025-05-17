"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedCardProps {
    children: ReactNode
    className?: string
    delay?: number
    hover?: boolean
}

export function AnimatedCard({ children, className = "", delay = 0, hover = true }: AnimatedCardProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            whileHover={hover ? { y: -5, scale: 1.02, transition: { duration: 0.2 } } : undefined}
        >
            {children}
        </motion.div>
    )
}
