'use client'

import React from 'react'
import { usePageTransition } from './ui/page-transition'

interface AnimatedLinkProps {
    href: string
    className?: string
    style?: React.CSSProperties
    children: React.ReactNode
}

export default function AnimatedLink({ href, className, style, children }: AnimatedLinkProps) {
    const { navigateWithAnimation } = usePageTransition()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        navigateWithAnimation(href)
    }

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            style={style}
        >
            {children}
        </a>
    )
}
