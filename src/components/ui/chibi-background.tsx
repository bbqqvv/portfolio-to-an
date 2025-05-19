"use client";

import { JSX, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface ChibiBackgroundProps {
    className?: string;
}

export function ChibiBackground({ }: ChibiBackgroundProps): JSX.Element | null {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const { theme } = useTheme();

    if (!theme) return null;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === canvas) {
                    width = canvas.width = entry.contentRect.width;
                    height = canvas.height = entry.contentRect.height;
                }
            }
        });

        resizeObserver.observe(canvas);

        // Mảng màu light và dark
        const lightColors = [
            { r: 255, g: 230, b: 240 },
            { r: 230, g: 240, b: 255 },
            { r: 255, g: 250, b: 230 },
            { r: 230, g: 255, b: 240 },
            { r: 245, g: 230, b: 255 },
        ];

        const darkColors = [
            { r: 120, g: 60, b: 70 },
            { r: 70, g: 90, b: 140 },
            { r: 140, g: 140, b: 70 },
            { r: 70, g: 140, b: 90 },
            { r: 140, g: 70, b: 140 },
        ];

        const colors = theme === "dark" ? darkColors : lightColors;

        // Bubbles
        const numBubbles = 15;
        const bubbles = Array.from({ length: numBubbles }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 60 + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            baseOpacity: Math.random() * 0.3 + 0.1,
            opacity: 0,
        }));

        // Stars
        const numStars = 20;
        const stars = Array.from({ length: numStars }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 15 + 5,
            rotation: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: Math.random() * 0.3 - 0.15,
            vy: Math.random() * 0.3 - 0.15,
            rotationSpeed: (Math.random() * 0.02 - 0.01) * Math.PI,
        }));

        // Vẽ star với glow
        const drawStar = (
            x: number,
            y: number,
            size: number,
            rotation: number,
            color: { r: number; g: number; b: number },
            opacity = 0.8
        ): void => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
            ctx.shadowBlur = 8;
            ctx.beginPath();

            for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
                const outerX = Math.cos(angle) * size;
                const outerY = Math.sin(angle) * size;
                const innerAngle = angle + Math.PI / 5;
                const innerX = Math.cos(innerAngle) * (size / 2);
                const innerY = Math.sin(innerAngle) * (size / 2);

                if (i === 0) {
                    ctx.moveTo(outerX, outerY);
                } else {
                    ctx.lineTo(outerX, outerY);
                }
                ctx.lineTo(innerX, innerY);
            }

            ctx.closePath();
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
            ctx.fill();
            ctx.restore();
        };

        // Hiệu ứng gradient background
        const drawBackground = () => {
            const gradient = ctx.createRadialGradient(
                width / 2,
                height / 2,
                width / 10,
                width / 2,
                height / 2,
                width / 1.5
            );
            if (theme === "dark") {
                gradient.addColorStop(0, "rgba(20, 20, 30, 1)");
                gradient.addColorStop(1, "rgba(10, 10, 20, 1)");
            } else {
                gradient.addColorStop(0, "rgba(255, 250, 245, 1)");
                gradient.addColorStop(1, "rgba(255, 240, 230, 1)");
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        };

        // Parallax effect theo chuột
        let offsetX = 0;
        let offsetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            offsetX = (e.clientX - centerX) / centerX;
            offsetY = (e.clientY - centerY) / centerY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animate loop
        const animate = (): void => {
            drawBackground();

            bubbles.forEach((bubble) => {
                bubble.x += bubble.vx + offsetX * 0.3;
                bubble.y += bubble.vy + offsetY * 0.3;

                if (bubble.x < -bubble.radius) bubble.x = width + bubble.radius;
                if (bubble.x > width + bubble.radius) bubble.x = -bubble.radius;
                if (bubble.y < -bubble.radius) bubble.y = height + bubble.radius;
                if (bubble.y > height + bubble.radius) bubble.y = -bubble.radius;

                // Opacity thay đổi nhẹ theo thời gian
                bubble.opacity = bubble.baseOpacity + 0.2 * Math.sin(Date.now() / 500 + bubble.x);

                ctx.beginPath();
                ctx.shadowColor = `rgba(${bubble.color.r}, ${bubble.color.g}, ${bubble.color.b}, ${bubble.opacity})`;
                ctx.shadowBlur = 15;
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${bubble.color.r}, ${bubble.color.g}, ${bubble.color.b}, ${bubble.opacity})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            stars.forEach((star) => {
                star.x += star.vx + offsetX * 0.15;
                star.y += star.vy + offsetY * 0.15;
                star.rotation += star.rotationSpeed;

                if (star.x < -star.size) star.x = width + star.size;
                if (star.x > width + star.size) star.x = -star.size;
                if (star.y < -star.size) star.y = height + star.size;
                if (star.y > height + star.size) star.y = -star.size;

                drawStar(star.x, star.y, star.size, star.rotation, star.color, 0.8);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme]);

    return (
        <div className="absolute inset-0 -z-10">
            <canvas ref={canvasRef} className="w-full h-full will-change-transform" />
        </div>
    );
}
