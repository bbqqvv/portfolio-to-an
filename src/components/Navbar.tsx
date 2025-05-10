'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md" style={{ backgroundColor: "#ffeed9", fontFamily: 'Work Sans, sans-serif' }}>
            <div className="flex items-center justify-between px-6 py-4 md:px-10 ml-24">

                {/* Navbar Desktop */}
                <ul className="hidden md:flex space-x-8 font-semibold font-sans">
                    {navItems.map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} className="group relative block px-2 py-1">
                                <span className="text-stone-700 group-hover:text-red-500 transition-colors duration-300">
                                    {label}
                                </span>
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5  transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Logo */}
                <div className="text-lg font-bold text-black" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    Tố An ❤️
                </div>

                {/* Menu Hamburger (dành cho di động) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="p-2 rounded-md focus:outline-none">
                        {isOpen ? (
                            <X className="h-6 w-6 text-teal-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-teal-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu di động */}
            {isOpen && (
                <div className="md:hidden px-6 pb-4">
                    <ul className="flex flex-col space-y-4 font-semibold font-sans rounded-lg p-4">
                        {navItems.map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className="block text-stone-700 hover:text-teal-600 transition-colors"
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
