"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useAnimation, AnimationControls } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

type RevealOptions = {
    direction?: Direction;
    distance?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
};

export function useMotionReveal(
    options: Partial<RevealOptions> = {}
): { ref: React.RefObject<HTMLDivElement | null>; controls: AnimationControls; initial: { opacity: number; x: number; y: number } } {
    const {
        direction = "up",
        distance = 50,
        duration = 0.8,
        delay = 0,
        ease = "easeOut",
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration, delay, ease },
            });
        }
    }, [inView, controls, duration, delay, ease]);

    // Khởi tạo giá trị ban đầu dựa theo direction và distance
    const initial = {
        opacity: 0,
        x: 0,
        y: 0,
    };

    switch (direction) {
        case "up":
            initial.y = distance;
            break;
        case "down":
            initial.y = -distance;
            break;
        case "left":
            initial.x = distance;
            break;
        case "right":
            initial.x = -distance;
            break;
    }

    return { ref, controls, initial };
}
