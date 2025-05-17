"use client"

import { useGSAPReveal } from "@/hooks/useGSAPReveal"
import { useRef } from "react"

interface SectionHeadingProps {
    title: string
    subtitle?: string
    centered?: boolean
    className?: string
}

export function SectionHeading({ title, subtitle, centered = false, className = "" }: SectionHeadingProps) {
    const headingRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)

    // Use custom hook for reveal animation
    useGSAPReveal(".section-heading", { direction: "up", stagger: 0.2 }, [title, subtitle])

    return (
        <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}
        >
            <h2
                ref={headingRef}
                className="section-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading"
                style={{ fontFamily: "var(--font-eczar)", color: 'var(--foreground)' }}


            >
                {title}
            </h2>
            {subtitle && (
                <p ref={subtitleRef} className="section-heading text-gray-600 max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}
