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
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        }

        if (imgRef.current) {
            gsap.fromTo(
                imgRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: imgRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        }
    }, [])

    useEffect(() => {
        if (btnRef.current) {
            const btn = btnRef.current
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

            btn.addEventListener('mouseenter', hoverIn)
            btn.addEventListener('mouseleave', hoverOut)
            btn.addEventListener('mousedown', () => {
                gsap.to(btn, { scale: 0.95, duration: 0.1 })
            })
            btn.addEventListener('mouseup', () => {
                gsap.to(btn, { scale: 1.05, duration: 0.1 })
            })

            return () => {
                btn.removeEventListener('mouseenter', hoverIn)
                btn.removeEventListener('mouseleave', hoverOut)
            }
        }
    }, [])

    return (
        <div
            id="about"
            className="flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-1 gap-6 md:gap-8 lg:gap-12"
            style={{ backgroundColor: 'var(--background-1)' }}
        >
            {/* Phần Text - Hiển thị trước trên mobile */}
            <div
                ref={textRef}
                className="bg-transparent w-full lg:max-w-160 p-2 rounded-lg order-2 lg:order-1"
                style={{ willChange: 'opacity, transform' }}
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Eczar, sans-serif' }}>
                    Một chút về tôi
                </h2>
                <div style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                        Tôi là Tố An, hiện đang là sinh viên tại Việt Nam. Tôi đang theo học chuyên ngành thiết kế giao diện người dùng và phát triển web.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                        Tôi yêu thích việc sáng tạo và phát triển các sản phẩm web, đặc biệt là thiết kế giao diện người dùng và tối ưu hóa trải nghiệm người dùng. Mặc dù tôi còn là sinh viên, nhưng tôi đã thực hiện nhiều dự án cá nhân và tham gia các khóa học thiết kế.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                        Ngoài công việc học tập và thiết kế, tôi còn thích đọc sách, viết lách và khám phá những sở thích mới.
                    </p>
                </div>
                <Link href={'/contact'}>
                    <button
                        ref={btnRef}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 border-2 rounded-lg md:rounded-xl text-sm sm:text-base transition"
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

            {/* Phần Ảnh Đại Diện - Hiển thị sau trên mobile */}
            <div
                ref={imgRef}
                className="relative w-full xs:w-4/5 sm:w-2/3 md:w-1/2 lg:w-[400px] xl:w-[500px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] order-1 lg:order-2"
                style={{ willChange: 'opacity, transform' }}
            >
                <Image
                    src="/images/toan1.png"
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 500px"
                    className="rounded-lg object-contain"
                    priority
                />
            </div>
        </div>
    )
}
