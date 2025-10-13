'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface TemplateProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

// Slide transition cho mobile
const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  in: {
    x: 0,
    opacity: 1
  },
  out: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname()
  
  // Determine if it's mobile for different transition
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false

  return (
    <div className="relative">
      {/* Loading Bar Animation */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={isMobile ? slideVariants : pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {/* Background Pattern Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-50/20 via-transparent to-transparent dark:from-slate-800/10 pointer-events-none"
          />

          {/* Page Content với Staggered Animation */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10"
          >
            {children}
          </motion.main>
        </motion.div>
      </AnimatePresence>

      {/* Cursor Follow Effect (chỉ desktop) */}
      {!isMobile && <CursorFollowEffect />}
    </div>
  )
}

// Enhanced Cursor Effect
function CursorFollowEffect() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient cursor glow */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-radial from-pink-200/10 via-purple-200/5 to-transparent dark:from-pink-500/10 dark:via-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
          y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 100
        }}
      />
    </motion.div>
  )
}
