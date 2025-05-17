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

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id)
                        }
                    })
                },
                {
                    rootMargin: "0px 0px -65% 0px",
                    threshold: 1,
                }
            )

            matches.forEach(({ id }) => {
                const el = document.getElementById(id)
                if (el) observer.observe(el)
                // Set scroll margin on each heading to avoid overlap
                if (el && !el.style.scrollMarginTop) {
                    el.style.scrollMarginTop = "80px"
                }
            })

            observerRef.current = observer
        }, 100)

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
            <div className="border-l-2 border-gray-200 pl-6 py-2">
                <p className="font-semibold mb-4 text-lg text-gray-800">📑 Mục lục</p>
                <ul className="space-y-2 text-sm text-gray-600">
                    {headings.map(({ id, text, level }) => (
                        <li
                            key={id}
                            className={`transition-all duration-200 ease-in-out hover:text-blue-500 ${level === 2 ? "ml-0" : level === 3 ? "ml-4" : "ml-8"
                                } ${activeId === id ? "font-semibold text-blue-600" : ""}`}
                        >
                            <a href={`#${id}`} className="block py-1">
                                {text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
