"use client"

import { useEffect, useRef, useState } from "react"

interface Heading {
    id: string
    text: string
    level: number
}

function removeVietnameseTones(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
}

function slugify(text: string) {
    const noToneText = removeVietnameseTones(text)
    return noToneText
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
}

export default function TableOfContents({ contentMarkdown }: { contentMarkdown: string }) {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string | null>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Handle smooth scroll to section
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            const yOffset = -100 // Offset for fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: 'smooth' })
            // Update active state immediately for better UX
            setActiveId(id)
        }
    }

    useEffect(() => {
        const regex = /^(#{1,4})\s+(.*)$/gm
        const matches: Heading[] = []
        let match: RegExpExecArray | null

        while ((match = regex.exec(contentMarkdown)) !== null) {
            const level = match[1].length
            const text = match[2].trim()
            const id = slugify(text)
            matches.push({ id, text, level })
        }

        setHeadings(matches)

        const timeoutId = setTimeout(() => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }

            // Track which headings are currently visible
            const visibleHeadings = new Set<string>()

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            visibleHeadings.add(entry.target.id)
                        } else {
                            visibleHeadings.delete(entry.target.id)
                        }
                    })

                    // Set the first visible heading as active
                    if (visibleHeadings.size > 0) {
                        // Find the first visible heading in document order
                        const firstVisible = matches.find(h => visibleHeadings.has(h.id))
                        if (firstVisible) {
                            setActiveId(firstVisible.id)
                        }
                    }
                },
                {
                    rootMargin: "-100px 0px -50% 0px", // Top offset for fixed header, bottom to trigger earlier
                    threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better detection
                }
            )

            matches.forEach(({ id }) => {
                const el = document.getElementById(id)
                if (el) {
                    observer.observe(el)
                    // Set scroll margin on each heading to avoid overlap
                    if (!el.style.scrollMarginTop) {
                        el.style.scrollMarginTop = "120px"
                    }
                }
            })

            observerRef.current = observer
        }, 500) // Increased timeout to ensure DOM is ready

        return () => {
            clearTimeout(timeoutId)
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [contentMarkdown])

    if (!headings.length) return null

    return (
        <nav className="sticky top-28 max-w-xs hidden xl:block h-[calc(100vh-10rem)] overflow-y-auto pr-4">
            <div 
                className="rounded-2xl p-6 backdrop-blur-xl shadow-xl border transition-all duration-300 hover:shadow-2xl"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border-light)'
                }}
            >
                <div className="flex items-center gap-2 mb-5">
                    <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                    >
                        📑
                    </div>
                    <p className="font-bold text-lg font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                        Mục lục
                    </p>
                </div>
                <ul className="space-y-1.5 text-sm font-[Work_Sans]">
                    {headings.map(({ id, text, level }) => (
                        <li
                            key={id}
                            className={`transition-all duration-300 ease-out group ${
                                level === 2 ? "ml-0" : level === 3 ? "ml-4" : "ml-8"
                            }`}
                        >
                            <a 
                                href={`#${id}`}
                                onClick={(e) => handleClick(e, id)}
                                className={`block py-2 px-3 rounded-lg transition-all duration-300 cursor-pointer ${
                                    activeId === id 
                                        ? 'font-semibold shadow-sm' 
                                        : 'hover:translate-x-1'
                                }`}
                                style={{
                                    color: activeId === id ? 'var(--accent)' : 'var(--text-secondary)',
                                    backgroundColor: activeId === id ? 'var(--accent-bg)' : 'transparent',
                                    borderLeft: activeId === id ? '3px solid var(--accent)' : '3px solid transparent'
                                }}
                            >
                                {text}
                            </a>
                        </li>
                    ))}
                </ul>
                
                {/* Reading Progress Indicator */}
                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="flex items-center justify-between text-xs mb-2 font-[Work_Sans]" style={{ color: 'var(--text-muted)' }}>
                        <span>Tiến độ đọc</span>
                        <span>{activeId ? `${headings.findIndex(h => h.id === activeId) + 1}/${headings.length}` : '0/0'}</span>
                    </div>
                    <div 
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--background-2)' }}
                    >
                        <div 
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{ 
                                width: activeId ? `${((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100}%` : '0%',
                                backgroundColor: 'var(--accent)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}
