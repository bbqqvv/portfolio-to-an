'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'

const navItems = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/about', label: 'Về Tôi' },
  { href: '/projects', label: 'Dự Án' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Liên Hệ' },
]

export function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-[#0F141C]/90 backdrop-blur-md shadow-lg border-b border-pink-100 dark:border-slate-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-500 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent font-['Eczar']"
            >
              Tố An
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.href} 
                href={item.href} 
                isActive={pathname === item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-pink-100 dark:bg-slate-700/50 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-slate-600/70 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full bg-pink-100 dark:bg-slate-700/50 text-pink-600 dark:text-pink-400"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-[#0F141C]/95 backdrop-blur-md border-t border-pink-100 dark:border-slate-700/50"
          >
            <div className="container mx-auto px-4 py-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-2"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Individual Nav Link Component
function NavLink({ 
  href, 
  children, 
  isActive, 
  onClick 
}: { 
  href: string
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={`relative z-10 ${
          isActive 
            ? 'text-white' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {children}
        </span>
        
        {/* Active Indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="activeNavItem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </AnimatePresence>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-pink-100 dark:bg-slate-700/30 rounded-xl opacity-0"
          whileHover={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </Link>
  )
}
