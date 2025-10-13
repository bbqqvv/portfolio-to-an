'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [showOptions, setShowOptions] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="p-2.5 rounded-xl" style={{ width: '44px', height: '44px' }} />
        )
    }

    const themeOptions = [
        { value: 'light' as const, icon: Sun, label: 'Sáng' },
        { value: 'dark' as const, icon: Moon, label: 'Tối' },
        { value: 'system' as const, icon: Monitor, label: 'Hệ thống' },
    ]

    const currentOption = themeOptions.find(opt => opt.value === theme) || themeOptions[2]
    const CurrentIcon = currentOption.icon

    return (
        <div className="relative">
            {/* Main Toggle Button */}
            <motion.button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                className="relative p-2.5 rounded-xl transition-all duration-300 group"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '2px solid var(--border-light)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Thay đổi chế độ giao diện"
            >
                <motion.div
                    initial={false}
                    animate={{
                        rotate: resolvedTheme === 'dark' ? 180 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <CurrentIcon 
                        size={20} 
                        className="transition-colors duration-300"
                        style={{ color: 'var(--foreground)' }}
                    />
                </motion.div>

                {/* Active indicator */}
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.button>

            {/* Dropdown Options */}
            <AnimatePresence>
                {showOptions && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowOptions(false)}
                        />

                        {/* Options Panel */}
                        <motion.div
                            className="absolute right-0 mt-2 p-2 rounded-xl shadow-2xl z-50 min-w-[160px]"
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                border: '2px solid var(--border-light)',
                            }}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            {themeOptions.map((option) => {
                                const Icon = option.icon
                                const isActive = theme === option.value

                                return (
                                    <motion.button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setTheme(option.value)
                                            setShowOptions(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-[Work_Sans] text-sm font-medium"
                                        style={{
                                            backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                                            color: isActive ? 'var(--accent-foreground)' : 'var(--foreground)',
                                        }}
                                        whileHover={{
                                            backgroundColor: isActive ? 'var(--accent)' : 'var(--background-2)',
                                            x: 4,
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Icon size={18} />
                                        <span>{option.label}</span>
                                        {isActive && (
                                            <motion.div
                                                className="ml-auto w-2 h-2 rounded-full"
                                                style={{ backgroundColor: 'var(--accent-foreground)' }}
                                                layoutId="activeIndicator"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                    </motion.button>
                                )
                            })}

                            {/* Current System Theme Info */}
                            {theme === 'system' && (
                                <motion.div
                                    className="mt-2 pt-2 px-3 text-xs font-[Work_Sans]"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        borderTop: '1px solid var(--border-light)',
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Hiện tại: <span style={{ color: 'var(--accent)' }}>{resolvedTheme === 'dark' ? 'Tối' : 'Sáng'}</span>
                                </motion.div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
