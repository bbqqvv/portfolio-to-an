'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')
  const [mounted, setMounted] = useState(false)

  // Get system theme preference
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // Apply theme to document
  const applyTheme = (themeToApply: ResolvedTheme) => {
    setResolvedTheme(themeToApply)
    if (themeToApply === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true)
    
    // Read from data attributes set by the initialization script
    const dataTheme = document.documentElement.getAttribute('data-theme') as Theme
    const dataResolvedTheme = document.documentElement.getAttribute('data-resolved-theme') as ResolvedTheme
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme
    const initialTheme = dataTheme || savedTheme || 'system'
    const initialResolvedTheme = dataResolvedTheme || (initialTheme === 'system' ? getSystemTheme() : initialTheme as ResolvedTheme)
    
    setThemeState(initialTheme)
    setResolvedTheme(initialResolvedTheme)
    
    // Ensure DOM is in sync
    if (initialResolvedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system' || !mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-resolved-theme', newResolvedTheme)
      applyTheme(newResolvedTheme)
    }

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, mounted])

  // Update theme when user changes preference
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('portfolio-theme', newTheme)
    
    // Update data attributes
    document.documentElement.setAttribute('data-theme', newTheme)

    const resolvedThemeValue = newTheme === 'system' ? getSystemTheme() : newTheme as ResolvedTheme
    document.documentElement.setAttribute('data-resolved-theme', resolvedThemeValue)
    
    applyTheme(resolvedThemeValue)
  }

  // Prevent flash of unstyled content - provide default values while mounting
  const value = {
    theme,
    resolvedTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


