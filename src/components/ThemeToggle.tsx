'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()


    const isDark = resolvedTheme === 'dark'

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark')
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            className="p-2 rounded"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}
