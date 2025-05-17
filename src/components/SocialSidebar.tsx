"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function SocialSidebar() {
    const containerRef = useRef<HTMLDivElement>(null)
    const iconRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const lineRef = useRef<HTMLDivElement>(null)
    const tooltipRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Sidebar container animation
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 1,
                ease: 'power3.out',
            })

            // Icons float in
            gsap.from(iconRefs.current, {
                y: 20,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6,
                delay: 1.2,
                ease: 'back.out(1.7)',
            })

            // Line animation
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0, opacity: 0 },
                {
                    scaleY: 1,
                    opacity: 1,
                    duration: 0.8,
                    delay: 1.6,
                    ease: 'power2.out',
                    transformOrigin: 'bottom',
                }
            )
        })

        return () => ctx.revert()
    }, [])

    const handleHover = (
        el: HTMLAnchorElement,
        tooltip: HTMLSpanElement | null,
        enter: boolean
    ) => {
        gsap.to(el, {
            y: enter ? -4 : 0,
            scale: enter ? 1.12 : 1,
            backgroundColor: enter ? 'rgba(56, 34, 19, 0.08)' : 'transparent', // nền nâu nhạt
            color: enter ? '#cc3700' : 'var(--btn-text)', // cam đất đậm
            boxShadow: enter
                ? '0 4px 12px rgba(56, 34, 19, 0.2)' // đổ bóng nâu
                : 'none',
            duration: 0.3,
            ease: 'power2.out',
        })

        if (tooltip) {
            gsap.to(tooltip, {
                autoAlpha: enter ? 1 : 0,
                x: enter ? -6 : 0,
                color: enter ? '#382213' : '#ffffff', // đổi tooltip text nếu thích
                backgroundColor: enter ? '#ffeed9' : '#000000cc', // nền tooltip nổi bật
                duration: 0.3,
                ease: 'power2.out',
            })
        }
    }


    const socialLinks = [
        {
            href: 'https://www.facebook.com/profile.php?id=100015843854925',
            icon: <FaFacebook size={22} />,
            label: 'Facebook',
        },
        {
            href: 'https://linkedin.com/in/yourusername',
            icon: <FaLinkedin size={22} />,
            label: 'LinkedIn',
        },
        {
            href: 'https://instagram.com/yourusername',
            icon: <FaInstagram size={22} />,
            label: 'Instagram',
        },
    ]

    return (
        <div
            className="fixed right-6 bottom-2 hidden md:flex flex-col items-center z-50"
            ref={containerRef}
        >
            {socialLinks.map((link, i) => (
                <div key={i} className="mb-1 relative group">
                    <a
                        ref={(el) => {
                            iconRefs.current[i] = el
                        }}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="p-2 rounded-full transition-colors duration-300"
                        style={{
                            color: 'var(--btn-text)',
                            borderColor: 'var(--btn-border)',
                            display: 'inline-block',
                        }}
                        onMouseEnter={(e) =>
                            handleHover(
                                e.currentTarget,
                                tooltipRefs.current[i],
                                true
                            )
                        }
                        onMouseLeave={(e) =>
                            handleHover(
                                e.currentTarget,
                                tooltipRefs.current[i],
                                false
                            )
                        }
                    >
                        {link.icon}
                    </a>

                    {/* Tooltip */}
                    <span
                        ref={(el) => {
                            tooltipRefs.current[i] = el
                        }}
                        className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2 py-1 text-sm bg-black/80 text-white rounded opacity-0 pointer-events-none z-50"
                        style={{
                            fontSize: '12px',
                            letterSpacing: '0.5px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {link.label}
                    </span>
                </div>
            ))}

            {/* Divider Line */}
            <div
                ref={lineRef}
                className="h-16 w-0.5 mt-2"
                style={{
                    background: 'linear-gradient(to top, #fb923c, transparent)',
                    filter: 'drop-shadow(0 0 6px #fb923c88)',
                }}
            />
        </div>
    )
}
