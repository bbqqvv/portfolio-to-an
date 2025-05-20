"use client";

import { motion } from "framer-motion";
import { useMotionReveal } from "@/hooks/useMotionReveal";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeading({ title, subtitle, centered = false, className = "" }: SectionHeadingProps) {
    // Dùng hook cho tiêu đề
    const { ref: headingRef, controls: headingControls, initial: headingInitial } = useMotionReveal({
        direction: "up",
        distance: 50,
        duration: 0.8,
    });

    // Dùng hook cho subtitle nếu có (cách đơn giản nhất là không stagger, hoặc tạo 2 hook)
    const { ref: subtitleRef, controls: subtitleControls, initial: subtitleInitial } = useMotionReveal({
        direction: "up",
        distance: 50,
        duration: 0.8,
        delay: 0.2,
    });

    return (
        <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
            <motion.h2
                ref={headingRef}
                initial={headingInitial}
                animate={headingControls}
                className="section-heading text-4xl md:text-5xl font-bold mb-4 font-heading"
                style={{ fontFamily: "var(--font-eczar)" }}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    ref={subtitleRef}
                    initial={subtitleInitial}
                    animate={subtitleControls}
                    className="section-heading max-w-2xl mx-auto text-xl"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
