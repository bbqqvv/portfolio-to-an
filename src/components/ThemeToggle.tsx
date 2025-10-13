'use client'

import { Sun, Moon } from 'lucide-react'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
    return (
        <ThemeProvider>
            {/* Existing content of ThemeToggle */}
        </ThemeProvider>
    )
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}
