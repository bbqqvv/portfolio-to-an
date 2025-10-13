'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/projects', label: 'Dự Án' },
    { href: '/blog', label: 'Góc nhỏ' },
    { href: '/about', label: 'Về tôi' },
    { href: '/contact', label: 'Liên Hệ' },
];

const desktopItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: 'easeOut',
        },
    }),
};

const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.3,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.05,
        },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const mobileItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isOpen &&
                !document.getElementById('mobile-menu')?.contains(e.target as Node) &&
                !toggleRef.current?.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <nav
            className="sticky top-0 z-50 backdrop-blur-md transition duration-300"
            style={{ 
                backgroundColor: 'var(--background-2)',
                fontFamily: 'Work Sans, sans-serif',
                opacity: 0.95
            }}
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-10">
                {/* Desktop Nav */}
                <ul className="hidden md:flex space-x-8 font-semibold ml-10">
                    {navItems.map(({ href, label }, index) => (
                        <motion.li
                            key={href}
                            className="relative group cursor-pointer"
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={desktopItemVariants}
                        >
                            <Link 
                                href={href}
                                className="text-base transition-colors duration-300"
                                style={{ color: 'var(--foreground)' }}
                            >
                                {label}
                                <span 
                                    className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 ease-in-out"
                                    style={{ backgroundColor: 'var(--accent)' }}
                                ></span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link 
                        href="/"
                        className="font-bold text-lg" 
                        style={{ color: 'var(--foreground)' }}
                    >
                        Tố An 
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button
                        ref={toggleRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md transition-colors duration-300"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="md:hidden px-6 overflow-hidden"
                        style={{ backgroundColor: 'var(--background-2)' }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuVariants}
                    >
                        <motion.ul className="flex flex-col space-y-4 py-4 font-semibold rounded-lg">
                            {navItems.map(({ href, label }) => (
                                <motion.li key={href} variants={mobileItemVariants}>
                                    <Link 
                                        href={href}
                                        className="block w-full text-left transition-colors duration-200"
                                        style={{ color: 'var(--foreground)' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
