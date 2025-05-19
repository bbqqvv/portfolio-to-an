'use client'

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface PageTransitionContextType {
    navigateWithAnimation: (url: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(
    undefined
)

export function usePageTransition() {
    const context = useContext(PageTransitionContext)
    if (!context)
        throw new Error('usePageTransition must be used within a PageTransitionProvider')
    return context
}

interface PageTransitionProps {
    children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
    const router = useRouter()
    const pathname = usePathname()

    const [isAnimating, setIsAnimating] = useState(false)
    const [pendingRoute, setPendingRoute] = useState<string | null>(null)

    const navigateWithAnimation = useCallback(
        (url: string) => {
            if (isAnimating) return
            setIsAnimating(true)
            setPendingRoute(url)
        },
        [isAnimating]
    )

    // Animation variants
    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.6, ease: 'easeIn' } },
    }

    return (
        <PageTransitionContext.Provider value={{ navigateWithAnimation }}>
            <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                    if (pendingRoute) {
                        router.push(pendingRoute)
                        setPendingRoute(null)
                        setIsAnimating(false)
                    }
                }}
            >
                <motion.div
                    key={pathname} // re-mount and animate on pathname change
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        minHeight: '100vh',
                        pointerEvents: isAnimating ? 'none' : 'auto',
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </PageTransitionContext.Provider>
    )
}
