'use client'

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'

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
    const containerRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [pendingRoute, setPendingRoute] = useState<string | null>(null)

    // Fade in khi mount hoặc khi route thay đổi xong
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete() {
                        setIsAnimating(false) // kết thúc animation, cho render tiếp
                    },
                }
            )
        }
    }, [pathname])

    // Hàm chuyển trang có animation fade out
    const navigateWithAnimation = useCallback(
        (url: string) => {
            if (isAnimating || !containerRef.current) return // chặn gọi nhiều lần
            setIsAnimating(true)
            setPendingRoute(url)

            gsap.to(containerRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.6,
                ease: 'power2.in',
                onComplete() {
                    router.push(url)
                },
            })
        },
        [router, isAnimating]
    )

    // Nếu user thay đổi route mà ko dùng navigateWithAnimation (vd Back/Forward)
    // => chạy animation fade out tương tự
    useEffect(() => {
        // Chỉ chạy khi có pendingRoute khác pathname (có chuyển trang đang chờ)
        if (pendingRoute === pathname) {
            setPendingRoute(null)
            setIsAnimating(false)
        }
    }, [pathname, pendingRoute])

    return (
        <PageTransitionContext.Provider value={{ navigateWithAnimation }}>
            <div
                ref={containerRef}
                style={{
                    minHeight: '100vh',
                    pointerEvents: isAnimating ? 'none' : 'auto',
                }}
            >
                {children}
            </div>
        </PageTransitionContext.Provider>
    )
}
