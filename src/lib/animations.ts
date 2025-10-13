import { Variants } from 'framer-motion'

// ============================================================================
// CORE ANIMATION VARIANTS
// ============================================================================

// Base transitions
export const transitions = {
  smooth: { type: 'tween', ease: 'easeOut', duration: 0.6 },
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  springBounce: { type: 'spring', stiffness: 400, damping: 10 },
  slow: { type: 'tween', ease: 'easeInOut', duration: 1.2 },
} as const

// Fade animations
export const fadeVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
} as const

// Scale animations
export const scaleVariants = {
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  scaleInBounce: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: transitions.springBounce
    }
  },
  scaleOnHover: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }
} as const

// ============================================================================
// STAGGERED ANIMATIONS
// ============================================================================

export const staggerVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  },
  containerFast: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  containerSlow: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.4
      }
    }
  }
} as const

// ============================================================================
// PROJECT-SPECIFIC ANIMATIONS
// ============================================================================

// Hero section animations
export const heroVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: transitions.smooth
    }
  },
  greeting: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { ...transitions.smooth, delay: 0.5 }
    }
  },
  name: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...transitions.spring, delay: 0.7 }
    }
  },
  description: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...transitions.smooth, delay: 0.9 }
    }
  },
  buttons: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...transitions.smooth, delay: 1.1 }
    }
  },
  image: {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { ...transitions.spring, delay: 0.4 }
    }
  }
} as const

// Project cards animations
export const projectVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  card: {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        ...transitions.spring,
        duration: 0.8
      }
    }
  },
  image: {
    hidden: { scale: 1.3, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut'
      }
    }
  },
  content: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        ...transitions.smooth,
        delay: 0.3
      }
    }
  },
  tags: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5
      }
    }
  },
  tag: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: transitions.spring
    }
  }
} as const

// Button hover effects
export const buttonVariants = {
  primary: {
    rest: { 
      scale: 1, 
      boxShadow: '0 10px 30px rgba(217, 119, 6, 0.2)' 
    },
    hover: { 
      scale: 1.05, 
      boxShadow: '0 20px 40px rgba(217, 119, 6, 0.3)',
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      boxShadow: '0 5px 15px rgba(217, 119, 6, 0.2)'
    }
  },
  secondary: {
    rest: { 
      scale: 1, 
      borderColor: 'rgb(245, 158, 11)' 
    },
    hover: { 
      scale: 1.03, 
      borderColor: 'rgb(217, 119, 6)',
      backgroundColor: 'rgb(251, 243, 219, 0.5)',
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98 
    }
  },
  ghost: {
    rest: { 
      scale: 1,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    hover: { 
      scale: 1.02,
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98 
    }
  }
} as const

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: transitions.smooth
  },
  out: { 
    opacity: 0, 
    y: -20, 
    scale: 1.02,
    transition: { duration: 0.3 }
  }
} as const

export const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  in: {
    x: 0,
    opacity: 1,
    transition: transitions.spring
  },
  out: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.3 }
  })
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a staggered container variant with custom timing
 */
export const createStaggerContainer = (
  staggerChildren: number = 0.15,
  delayChildren: number = 0.3
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
})

/**
 * Creates a fade-in variant with custom direction and distance
 */
export const createFadeVariant = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
  distance: number = 40
): Variants => {
  const getTransform = () => {
    switch (direction) {
      case 'up': return { y: distance }
      case 'down': return { y: -distance }
      case 'left': return { x: distance }
      case 'right': return { x: -distance }
      case 'none': return {}
      default: return { y: distance }
    }
  }

  return {
    hidden: { opacity: 0, ...getTransform() },
    visible: { opacity: 1, x: 0, y: 0 }
  }
}

/**
 * Creates a hover variant with custom scale and shadow
 */
export const createHoverVariant = (
  scale: number = 1.05,
  shadowColor: string = 'rgba(0,0,0,0.1)'
): Variants => ({
  rest: { 
    scale: 1, 
    boxShadow: `0 5px 15px ${shadowColor}` 
  },
  hover: { 
    scale, 
    boxShadow: `0 15px 35px ${shadowColor}`,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
})

/**
 * Viewport configuration for animations
 */
export const viewportConfig = {
  once: true,
  amount: 0.3,
  margin: '-100px'
} as const

/**
 * Reduced motion check
 */
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
