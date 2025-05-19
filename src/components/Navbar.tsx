'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const navItemControls = useAnimation()

    const navItems = [
        { href: '/', label: 'Trang Chủ' },
        { href: '/about', label: 'Về tôi' },
        { href: '/projects', label: 'Dự Án' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Liên Hệ' },
    ]

    // Animate desktop nav items on mount
    useEffect(() => {
        navItemControls.start(i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
        }))
    }, [navItemControls])

    // Variants for mobile menu container
    const menuVariants = {
        closed: { opacity: 0, y: -10, height: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        open: {
            opacity: 1,
            y: 0,
            height: 'auto',
            transition: {
                duration: 0.3,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    }

    // Variants for each mobile menu item
    const itemVariants = {
        closed: { opacity: 0, y: 10, transition: { duration: 0.4, ease: 'easeOut' } },
        open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    }

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node
            if (
                !document.getElementById('mobile-menu')?.contains(target) &&
                !document.getElementById('menu-toggle')?.contains(target)
            ) {
                setIsOpen(false)
            }
        }

        if (isOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    return (
        <nav
            className="sticky top-0 z-50 bg-[var(--background-2)] bg-opacity-70 backdrop-blur-md transition duration-300"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-10">
                {/* Desktop Nav */}
                <ul className="hidden md:flex space-x-8 font-semibold ml-10">
                    {navItems.map(({ href, label }, index) => (
                        <motion.li
                            key={href}
                            custom={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={navItemControls}
                            className="relative group cursor-pointer"
                        >
                            <Link href={href} passHref legacyBehavior>
                                <a className="text-base text-[var(--btn-text)] transition-colors duration-300">
                                    {label}
                                    <span className="block h-0.5 bg-gray-500 max-w-0 group-hover:max-w-full transition-all duration-300 ease-in-out" />
                                </a>
                            </Link>
                        </motion.li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden" id="menu-toggle">
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
                    <Link href="/" passHref legacyBehavior>
                        <a className="font-bold text-lg" style={{ color: 'var(--btn-text)' }}>
                            Tố An ❤️
                        </a>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="md:hidden px-6 overflow-hidden bg-[var(--background-2)]"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.ul className="flex flex-col space-y-4 font-semibold rounded-lg">
                            {navItems.map(({ href, label }) => (
                                <motion.li key={href} variants={itemVariants}>
                                    <Link href={href} passHref legacyBehavior>
                                        <a
                                            className="block w-full text-left text-[var(--btn-text)] hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {label}
                                        </a>
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
