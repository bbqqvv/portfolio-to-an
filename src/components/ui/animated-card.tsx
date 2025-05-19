"use client";

import { forwardRef, ReactNode } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
}

const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: custom * 0.1,
        },
    }),
};

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
    ({ children, className = "", delay = 0, hover = true }, ref) => {
        const controls = useAnimation();
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

        if (inView) {
            controls.start("visible");
        }

        return (
            <motion.div
                ref={setRefs}
                className={className}
                custom={delay}
                initial="hidden"
                animate={controls}
                variants={variants}
                style={{ willChange: "transform, opacity" }}
                whileHover={
                    hover
                        ? {
                            y: -5,
                            scale: 1.02,
                            transition: { duration: 0.25, ease: "easeOut" },
                        }
                        : {}
                }
            >
                {children}
            </motion.div>
        );
    }
);

AnimatedCard.displayName = "AnimatedCard";
