'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HeroClientProps {
  content: {
    greeting: string
    name: string
    description: string
    image: {
      src: string
      alt: string
      width: number
      height: number
    }
  }
}

export function HeroClient({ content }: HeroClientProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const typeText = () => {
      if (currentIndex <= content.greeting.length) {
        setDisplayedText(content.greeting.slice(0, currentIndex))
        currentIndex++
        timeout = setTimeout(typeText, 80)
      } else {
        setIsTypingComplete(true)
      }
    }

    typeText()
    return () => clearTimeout(timeout)
  }, [content.greeting])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Typing Animation */}
      <motion.div 
        className="font-mono text-pink-600 dark:text-pink-400 text-lg"
        variants={textVariants}
      >
        <span>{displayedText}</span>
        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="ml-1 bg-pink-500 dark:bg-pink-400 w-0.5 h-6 inline-block"
          />
        )}
      </motion.div>

      {/* Name with Gradient */}
      <motion.h1
        variants={textVariants}
        className="text-5xl lg:text-7xl font-bold"
      >
        <span className="bg-gradient-to-r from-pink-600 via-purple-500 to-pink-400 dark:from-pink-400 dark:via-purple-400 dark:to-pink-300 bg-clip-text text-transparent font-['Eczar']">
          {content.name}
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={textVariants}
        className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-['Work_Sans']"
      >
        {content.description}
      </motion.p>

      {/* Interactive Elements */}
      <motion.div
        variants={textVariants}
        className="flex flex-wrap gap-4"
      >
        {/* Social Links với animation riêng */}
        {['GitHub', 'LinkedIn', 'Email'].map((social, index) => (
          <motion.a
            key={social}
            href="#"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-pink-200 dark:border-slate-600 hover:border-pink-400 dark:hover:border-pink-500 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.8 + index * 0.1 }
            }}
          >
            {social}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}
