"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

type RevealOptions = {
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    markers?: boolean;
};

export function useGSAPReveal(
    selector: string,
    options: Partial<RevealOptions> = {},
) {
    const revealRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        if (elements.length === 0) return;

        const defaults: Required<RevealOptions> = {
            direction: "up",
            distance: 50,
            duration: 0.8,
            delay: 0,
            stagger: 0.1,
            ease: "power3.out",
            start: "top 80%",
            markers: false,
        };

        const mergedOptions = { ...defaults, ...options };
        const { direction, distance, markers, start, ...animationOptions } =
            mergedOptions;

        const initialProps: Record<string, number | string> = { opacity: 0 };
        switch (direction) {
            case "up":
                initialProps.y = distance;
                break;
            case "down":
                initialProps.y = -distance;
                break;
            case "left":
                initialProps.x = distance;
                break;
            case "right":
                initialProps.x = -distance;
                break;
        }

        elements.forEach((element) => {
            gsap.set(element, initialProps);
        });

        revealRef.current = gsap.to(elements, {
            opacity: 1,
            y: 0,
            x: 0,
            ...animationOptions,
            scrollTrigger: {
                trigger: elements[0],
                start,
                toggleActions: "play none none none",
                markers,
            },
        });

        return () => {
            if (revealRef.current) {
                revealRef.current.kill();
            }
        };
    }, [selector, options]);

    return revealRef;
}
