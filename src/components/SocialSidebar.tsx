'use client'

import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function SocialSidebar() {
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

    // Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 1, ease: 'easeOut' },
        },
    }

    const iconVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 1.2 + i * 0.15, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }, // back.out(1.7) approx
        }),
        hover: {
            y: -4,
            scale: 1.12,
            backgroundColor: 'rgba(56, 34, 19, 0.08)',
            color: '#cc3700',
            boxShadow: '0 4px 12px rgba(56, 34, 19, 0.2)',
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        rest: {
            y: 0,
            scale: 1,
            backgroundColor: 'transparent',
            color: 'var(--btn-text)',
            boxShadow: 'none',
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    }

    const tooltipVariants = {
        hidden: {
            opacity: 0,
            x: 0,
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        visible: {
            opacity: 1,
            x: -6,
            color: '#382213',
            backgroundColor: '#ffeed9',
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    }

    const lineVariants = {
        hidden: { scaleY: 0, opacity: 0, transformOrigin: 'bottom' },
        visible: {
            scaleY: 1,
            opacity: 1,
            transition: { duration: 0.8, delay: 1.6, ease: 'easeOut' },
            transformOrigin: 'bottom',
        },
    }

    return (
        <motion.div
            className="fixed right-6 bottom-2 hidden md:flex flex-col items-center z-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {socialLinks.map((link, i) => (
                <motion.div
                    key={i}
                    className="mb-1 relative group"
                    variants={iconVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                >
                    <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="p-2 rounded-full transition-colors duration-300 inline-block"
                        style={{
                            borderColor: 'var(--btn-border)',
                            display: 'inline-block',
                        }}
                        variants={iconVariants}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onHoverStart={() => { }}
                        onHoverEnd={() => { }}
                    >
                        {link.icon}
                    </motion.a>

                    <motion.span
                        className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2 py-1 text-sm rounded opacity-0 pointer-events-none z-50"
                        style={{
                            fontSize: '12px',
                            letterSpacing: '0.5px',
                            whiteSpace: 'nowrap',
                        }}
                        variants={tooltipVariants}
                        initial="hidden"
                        whileHover="visible"
                    // To sync tooltip with icon hover, parent handles hover, so using pointer-events-none to keep tooltip from interfering
                    >
                        {link.label}
                    </motion.span>
                </motion.div>
            ))}

            <motion.div
                className="h-16 w-0.5 mt-2"
                style={{
                    background:
                        'linear-gradient(to top, #fb923c, transparent)',
                    filter: 'drop-shadow(0 0 6px #fb923c88)',
                    originY: 1,
                }}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.div>
    )
}
