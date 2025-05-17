'use client'

import { useRef } from 'react'
import { Twitter, Linkedin, Dribbble, Instagram } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Footer() {
    const btnRef = useRef<HTMLButtonElement>(null)
    const iconRefs = useRef<(HTMLAnchorElement | null)[]>([])

    // Button hover handlers
    const handleBtnMouseEnter = () => {
        if (!btnRef.current) return
        gsap.to(btnRef.current, {
            backgroundColor: 'var(--btn-hover-bg)',
            color: 'var(--btn-hover-text)',
            scale: 1.05,
            duration: 0.3,
            ease: 'power3.out',
        })
    }

    const handleBtnMouseLeave = () => {
        if (!btnRef.current) return
        gsap.to(btnRef.current, {
            backgroundColor: 'transparent',
            color: 'var(--btn-text)',
            scale: 1,
            duration: 0.3,
            ease: 'power3.out',
        })
    }

    // Social icon hover handlers
    const handleIconMouseEnter = (index: number) => {
        const icon = iconRefs.current[index]
        if (!icon) return
        gsap.to(icon, {
            backgroundColor: 'var(--btn-hover-bg)',
            color: 'var(--btn-hover-text)',
            scale: 1.1,
            duration: 0.3,
            ease: 'power3.out',
        })
    }

    const handleIconMouseLeave = (index: number) => {
        const icon = iconRefs.current[index]
        if (!icon) return
        gsap.to(icon, {
            backgroundColor: 'transparent',
            color: 'var(--btn-text)',
            scale: 1,
            duration: 0.3,
            ease: 'power3.out',
        })
    }

    return (
        <footer
            id="contact"
            className="bg-[#ffeed9] dark:bg-[#372112] px-6 md:px-12 lg:px-20 py-20 flex items-center justify-center"
            style={{ backgroundColor: 'var(--background-2)' }}
        >
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-center md:text-left">
                {/* Left: Text + Button */}
                <div className="flex flex-col items-center md:items-start">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-6 max-w-xl leading-snug"
                        style={{ fontFamily: 'Eczar, serif' }}
                    >
                        Hãy cùng nhau làm việc và biến mọi thứ trở nên thật đáng yêu và hữu ích.
                    </h2>
                    <Link href="/contact" legacyBehavior>
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
                            onMouseEnter={handleBtnMouseEnter}
                            onMouseLeave={handleBtnMouseLeave}
                        >
                            Liên hệ với tôi
                        </button>
                    </Link>
                    
                </div>

                {/* Right: Social Icons */}
                <div className="flex space-x-5 justify-center mt-auto">
                    {[Dribbble, Instagram, Linkedin].map((Icon, index) => (
                        <Link
                            href={''}
                            key={index}
                            aria-label="Social link"
                            ref={(el) => { iconRefs.current[index] = el; }}
                            className="p-2 rounded-full border transition-all"
                            style={{
                                borderColor: 'var(--btn-border)',
                                color: 'var(--btn-text)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transformOrigin: 'center',
                            }}
                            onMouseEnter={() => handleIconMouseEnter(index)}
                            onMouseLeave={() => handleIconMouseLeave(index)}
                        >
                            <Icon className="w-5 h-5" style={{ color: 'inherit' }} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}
