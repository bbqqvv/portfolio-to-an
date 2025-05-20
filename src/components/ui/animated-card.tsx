"use client";

import { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    index?: number;
    hover?: boolean;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
    ({ children, className = "", index = 0, hover = true }, ref) => {
        const [inViewRef, inView] = useInView({
            threshold: 0.15,
            triggerOnce: true,
        });

        const setRefs = (el: HTMLDivElement | null) => {
            inViewRef(el);
            if (typeof ref === "function") {
                ref(el);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }
        };

        return (
            <motion.div
                layout
                ref={setRefs}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 1.1, // 👈 chậm hơn
                    delay: index * 0.15, // 👈 delay giữa các card
                    ease: [0.22, 1, 0.36, 1], // easeOutQuart → rất mượt
                }}
                whileHover={
                    hover
                        ? {
                            y: -4,
                            scale: 1.015,
                            transition: {
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                            },
                        }
                        : undefined
                }
                className={className}
                style={{
                    willChange: "opacity, transform",
                    transformOrigin: "center",
                }}
            >
                {children}
            </motion.div>
        );
    }
);

AnimatedCard.displayName = "AnimatedCard";
