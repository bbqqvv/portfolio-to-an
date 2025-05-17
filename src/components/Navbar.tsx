'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import gsap from 'gsap'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const navItemRefs = useRef<HTMLLIElement[]>([])

    const navItems = [
        { id: 'home', label: 'Trang Chủ' },
        { id: 'projects', label: 'Dự Án' },
        { id: 'skill', label: 'Kỹ năng' },
        { id: 'about', label: 'Giới Thiệu' },
        { id: 'contact', label: 'Liên Hệ' },
    ]

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
            setIsOpen(false)
        }
    }

    // Animate desktop nav items on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (navItemRefs.current.length) {
                gsap.from(navItemRefs.current, {
                    opacity: 0,
                    y: 10,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'power2.out',
                })
            }
        })

        return () => ctx.revert()
    }, [])

    // Animate mobile menu on open
    useEffect(() => {
        if (isOpen && menuRef.current) {
            const items = menuRef.current.querySelectorAll('li')

            gsap.from(menuRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
            })

            gsap.from(items, {
                opacity: 0,
                y: 10,
                stagger: 0.1,
                duration: 0.4,
                ease: 'power2.out',
            })
        }
    }, [isOpen])

    // Close mobile menu on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <nav
            className="sticky top-0 z-50 bg-[var(--background-2)] bg-opacity-70 backdrop-blur-md transition duration-300"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-10">
                {/* Desktop Nav */}
                <ul className="hidden md:flex space-x-8 font-semibold ml-10">
                    {navItems.map(({ id, label }, index) => (
                        <li
                            key={id}
                            ref={(el) => { navItemRefs.current[index] = el! }}
                            className="relative group cursor-pointer"
                        >
                            <button
                                onClick={() => scrollToSection(id)}
                                className="text-base text-[var(--btn-text)] transition-colors duration-300"
                            >
                                {label}
                                <span className="block h-0.5 bg-gray-500 max-w-0 group-hover:max-w-full transition-all duration-300 ease-in-out"></span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md text-[var(--btn-text)] transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Logo + Theme */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/" className="font-bold text-lg" style={{ color: 'var(--btn-text)' }}>
                        Tố An ❤️
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`md:hidden px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0'
                    } bg-[var(--background-2)]`}
            >
                <ul className="flex flex-col space-y-4 font-semibold rounded-lg">
                    {navItems.map(({ id, label }) => (
                        <li key={id}>
                            <button
                                onClick={() => scrollToSection(id)}
                                className="block w-full text-left text-[var(--btn-text)] hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
