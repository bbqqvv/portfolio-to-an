'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const navItems = [
        { href: '#home', label: 'Trang Chủ' },
        { href: '#projects', label: 'Dự Án' },
        { href: '#skill', label: 'Kỹ năng' },
        { href: '#about', label: 'Giới Thiệu' },
        { href: '#contact', label: 'Liên Hệ' },
    ]

    return (
        <nav
            className="sticky top-0 z-50 bg-[var(--background-2)] bg-opacity-70 backdrop-blur-md transition-colors duration-300"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-10" >
                {/* Navbar Desktop */}
                <ul className="hidden md:flex space-x-8 font-semibold font-sans ml-8" >
                    {navItems.map(({ href, label }) => (
                        <li key={href} >
                            <a
                                href={href}
                                className="group relative block px-2 py-1 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                                style={{
                                    color: 'var(--btn-text)',
                                }}
                            >
                                <span className="group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">
                                    {label}
                                </span>
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-500 dark:bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Logo */}
                <div className="flex items-center space-x-3 font-bold text-lg text-gray-900 dark:text-gray-100" style={{
                    color: 'var(--btn-text)',
                }}>
                    <ThemeToggle />
                    <span>Tố An ❤️</span>
                </div>

                {/* Menu Hamburger (dành cho di động) */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-md focus:outline-none text-gray-900 dark:text-black transition-colors duration-300"
                        aria-label="Toggle menu"
                        style={{
                            color: 'var(--btn-text)',
                        }}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Menu di động */}
            {isOpen && (
                <div className="md:hidden px-6 pb-4 bg-[var(--background-2)]  transition-colors duration-300">
                    <ul className="flex flex-col space-y-4 font-semibold font-sans rounded-lg p-4">
                        {navItems.map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className="block text-gray-900 dark:text-black hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                                    style={{
                                        color: 'var(--btn-text)',
                                    }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </nav>
    )
}
