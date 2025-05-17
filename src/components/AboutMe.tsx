'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMeComponent() {
    const textRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const fadeInFromBottom = (element: HTMLElement | null, delay = 0) => {
            if (!element) return
            gsap.fromTo(
                element,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        }

        fadeInFromBottom(textRef.current)
        fadeInFromBottom(imgRef.current, 0.2)
    }, [])

    useEffect(() => {
        const btn = btnRef.current
        if (!btn) return

        const hoverIn = () => {
            gsap.to(btn, {
                backgroundColor: 'var(--btn-hover-bg)',
                color: 'var(--btn-hover-text)',
                scale: 1.05,
                duration: 0.3,
                ease: 'power3.out',
            })
        }

        const hoverOut = () => {
            gsap.to(btn, {
                backgroundColor: 'transparent',
                color: 'var(--btn-text)',
                scale: 1,
                duration: 0.3,
                ease: 'power3.out',
            })
        }

        const pressIn = () => gsap.to(btn, { scale: 0.95, duration: 0.1 })
        const pressOut = () => gsap.to(btn, { scale: 1.05, duration: 0.1 })

        btn.addEventListener('mouseenter', hoverIn)
        btn.addEventListener('mouseleave', hoverOut)
        btn.addEventListener('mousedown', pressIn)
        btn.addEventListener('mouseup', pressOut)

        return () => {
            btn.removeEventListener('mouseenter', hoverIn)
            btn.removeEventListener('mouseleave', hoverOut)
            btn.removeEventListener('mousedown', pressIn)
            btn.removeEventListener('mouseup', pressOut)
        }
    }, [])

    return (
        <div
            id="about"
            className="flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-1 gap-6 md:gap-8 lg:gap-12"
            style={{ backgroundColor: 'var(--background-1)' }}
        >
            {/* Text content */}
            <div
                ref={textRef}
                className="w-full lg:max-w-180 p-2 rounded-lg order-2 lg:order-1"
                style={{ willChange: 'opacity, transform' }}
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-[Eczar]">
                    Một chút về tôi
                </h2>
                <div className="font-[Work_Sans] text-base sm:text-lg md:text-xl space-y-4">
                    <p>
                        Tôi là Tố An, hiện đang là sinh viên tại Việt Nam. Tôi đang theo học chuyên ngành thiết kế giao diện người dùng và phát triển web.
                    </p>
                    <p>
                        Tôi yêu thích việc sáng tạo và phát triển các sản phẩm web, đặc biệt là thiết kế giao diện người dùng và tối ưu hóa trải nghiệm người dùng. Mặc dù tôi còn là sinh viên, nhưng tôi đã thực hiện nhiều dự án cá nhân và tham gia các khóa học thiết kế.
                    </p>
                    <p>
                        Ngoài công việc học tập và thiết kế, tôi còn thích đọc sách, viết lách và khám phá những sở thích mới.
                    </p>
                </div>
                <Link href="/contact" aria-label="Liên hệ với tôi">
                    <button
                        ref={btnRef}
                        role="button"
                        className="mt-6 px-6 py-3 border-2 rounded-xl text-sm sm:text-base transition-all"
                        style={{
                            color: 'var(--btn-text)',
                            borderColor: 'var(--btn-border)',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transformOrigin: 'center',
                        }}
                    >
                        Liên hệ với tôi
                    </button>
                </Link>
            </div>

            {/* Image section */}
            <div
                ref={imgRef}
                className="relative w-full xs:w-4/5 sm:w-2/3 md:w-1/2 lg:w-[400px] xl:w-[400px] h-[400px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] order-1 lg:order-2"
                style={{ willChange: 'opacity, transform' }}
            >
                <Image
                    src="/images/anbum_02.png"
                    alt="Ảnh đại diện Tố An"
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 500px"
                    className="rounded-lg object-contain"
                    priority
                />
            </div>
        </div>
    )
}
