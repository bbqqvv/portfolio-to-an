'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
    const fullText = 'Xin chào, mình là'
    const [typedText, setTypedText] = useState('')
    const typingSpeed = 80
    const pauseTime = 1000

    useEffect(() => {
        let index = 0
        let isDeleting = false
        let timeout: NodeJS.Timeout

        const type = () => {
            if (!isDeleting) {
                if (index < fullText.length) {
                    setTypedText(fullText.slice(0, index + 1))
                    index++
                    timeout = setTimeout(type, typingSpeed)
                } else {
                    isDeleting = true
                    timeout = setTimeout(type, pauseTime)
                }
            } else {
                if (index > 0) {
                    setTypedText(fullText.slice(0, index - 1))
                    index--
                    timeout = setTimeout(type, typingSpeed / 2)
                } else {
                    isDeleting = false
                    timeout = setTimeout(type, typingSpeed)
                }
            }
        }

        type()
        return () => clearTimeout(timeout)
    }, [])

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const fadeLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    }

    const fadeRight = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    }

    return (
        <>
            <div
                id="home"
                className="bg-[#ffeed9] py-12 sm:py-16 md:py-20 lg:py-1"
                style={{
                    backgroundColor: 'var(--background-2)',
                    color: 'var(--foreground)',
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                    {/* Text Section */}
                    <div className="w-full text-center md:text-left">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="text-sm font-mono mb-4 text-black min-h-[1.5rem]"
                            style={{ color: 'var(--text-card)' }}
                        >
                            <span>{typedText}</span>
                            <span className="inline-block w-[1px] bg-teal-600 animate-blink ml-1" />
                        </motion.div>

                        <motion.h1
                            variants={fadeLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                        >
                            <span className="text-#ffeed9">Lưu Thị Tố An</span><br />
                            <span className="bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">
                                {/* mô tả */}
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                            className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-sans font-semibold"
                            style={{
                                fontFamily: 'Eczar, sans-serif',
                                color: 'var(--text-card)',
                            }}
                        >
                            🌟 Chào bạn! Mình là Tố An – đam mê sáng tạo và luôn tìm cách cải thiện trải nghiệm người dùng. Mình tin rằng thiết kế không chỉ phải đẹp mà còn phải dễ sử dụng. Cùng khám phá những điều mới mẻ nhé!
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                            className="flex flex-col sm:flex-row sm:gap-4 gap-3 w-full items-center md:items-start"
                            style={{ fontFamily: 'Eczar, sans-serif' }}
                        >
                            <Link
                                href="/work"
                                className="w-full sm:w-auto group inline-flex items-center justify-center px-6 py-3 text-white rounded-xl relative overflow-hidden text-base font-semibold"
                                style={{
                                    backgroundColor: "#4e5e80",
                                    fontFamily: 'Work Sans, sans-serif',
                                }}
                            >
                                <span className="relative z-10">Xem CV</span>
                                <ArrowRight
                                    className="ml-2 h-4 w-4 relative z-10 text-[#4e5e80] rounded-sm font-bold"
                                    style={{ backgroundColor: "#ffffff" }}
                                />
                            </Link>

                            <button
                                onClick={() => scrollToSection('about')}
                                className="w-full sm:w-auto group inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-[#4e5e80] hover:bg-teal-50 text-base font-semibold hover:text-black"
                                style={{
                                    fontFamily: 'Work Sans, sans-serif',
                                    borderColor: 'var(--btn-border)',
                                }}
                            >
                                <span>Về tôi</span>
                                <ArrowRight className="ml-2 h-4 w-4 text-[#4e5e80] rounded-sm transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Avatar Section */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
                        className="w-full md:w-auto flex justify-center"
                    >
                        <div className="relative w-50 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[30rem] lg:h-[40rem]">
                            <Image
                                src="/images/toan.png"
                                alt="Tố An"
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1 }
                    50% { opacity: 0 }
                }
                .animate-blink {
                    animation: blink 1s step-start infinite;
                    height: 1rem;
                }
            `}</style>
        </>
    )
}
