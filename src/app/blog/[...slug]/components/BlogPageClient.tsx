"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useSpring } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark"
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, User } from "lucide-react"
import MetaData from "./Metadata"
import TableOfContents from "./TableOfContents"
import ArticleFooter from "./ArticleFooter"
import ScrollToTop from "@/components/ScrollToTop"
import { allBlogPosts } from "@/data/blogs"

interface Metadata {
    title?: string
    description?: string
    coverImage?: string
    date?: string
    author?: string
    tags?: string[]
}

interface Props {
    metadata: Metadata
    contentMarkdown: string
    slug: string
}

export default function BlogPageClient({ metadata, contentMarkdown, slug }: Props) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const url = `${siteUrl}/blog/${slug}`
    const articleRef = useRef(null)
    const isInView = useInView(articleRef, { once: true, amount: 0.1 })

    // Reading progress bar
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Calculate reading time
    const [readingTime, setReadingTime] = useState(10)
    useEffect(() => {
        const words = contentMarkdown.split(/\s+/).length
        const minutes = Math.ceil(words / 200) // Average reading speed
        setReadingTime(minutes)
    }, [contentMarkdown])

    // Get related posts (same category, excluding current post)
    const relatedPosts = allBlogPosts
        .filter(post => post.slug !== slug && post.category === metadata.tags?.[0])
        .slice(0, 3)

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <>
            <MetaData metadata={metadata} url={url} />
            <ScrollToTop />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
                style={{ 
                    scaleX,
                    backgroundColor: 'var(--accent)',
                    transformOrigin: '0%'
                }}
            />

            <main 
                className="min-h-screen"
                style={{ backgroundColor: 'var(--background-1)' }}
            >
                {/* Hero Section with Cover Image */}
                {metadata.coverImage && (
                    <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
                        <Image
                            src={metadata.coverImage}
                            alt={metadata.title || 'Blog cover'}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                        
                        {/* Back button */}
                        <div className="absolute top-6 left-4 md:left-8 z-10">
                            <Link href="/blog">
                                <motion.button
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl font-semibold font-[Work_Sans] shadow-xl transition-all duration-300"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.3)'
                                    }}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại
                                </motion.button>
                            </Link>
                        </div>

                        {/* Title and meta overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
                            <motion.div 
                                className="max-w-5xl mx-auto"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {metadata.tags && metadata.tags.length > 0 && (
                                    <motion.div 
                                        className="flex flex-wrap gap-2 mb-5"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        {metadata.tags.map((tag, index) => (
                                            <motion.span
                                                key={index}
                                                className="px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl font-[Work_Sans] shadow-lg"
                                                style={{
                                                    background: 'var(--accent)',
                                                    color: 'var(--accent-foreground)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                                }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                )}
                                <motion.h1 
                                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-[Eczar] leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    {metadata.title}
                                </motion.h1>
                                <motion.div 
                                    className="flex flex-wrap items-center gap-4 md:gap-6 text-white/95 text-sm font-[Work_Sans]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    {metadata.author && (
                                        <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                                            <User className="w-4 h-4" />
                                            {metadata.author}
                                        </span>
                                    )}
                                    {metadata.date && (
                                        <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                                            <Calendar className="w-4 h-4" />
                                            {metadata.date}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                                        <BookOpen className="w-4 h-4" />
                                        {readingTime} phút đọc
                                    </span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Main Article Content */}
                    <motion.article 
                        ref={articleRef}
                        className="prose prose-lg max-w-none flex-1"
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeInUp}
                        transition={{ duration: 0.8 }}
                    >
                    <div 
                        className="max-w-3xl mx-auto rounded-3xl p-6 md:p-10 lg:p-12 shadow-lg border"
                        style={{ 
                            backgroundColor: 'var(--card-bg)', 
                            borderColor: 'var(--border-light)'
                        }}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
                            components={{
                                img: ({ ...props }) => (
                                    <div className="my-8 rounded-2xl overflow-hidden shadow-xl border" style={{ borderColor: 'var(--border-light)' }}>
                                        <Image
                                            src={typeof props.src === "string" ? props.src : ""}
                                            alt={props.alt || ""}
                                            width={800}
                                            height={450}
                                            className="object-cover w-full"
                                            loading="lazy"
                                        />
                                        {props.alt && <p className="text-center text-sm mt-3 px-4 pb-3 font-[Work_Sans]" style={{ color: 'var(--text-muted)' }}>{props.alt}</p>}
                                    </div>
                                ),

                                a: ({ ...props }) => (
                                    <a
                                        {...props}
                                        className="underline underline-offset-4 transition-colors font-medium"
                                        style={{ color: 'var(--accent)' }}
                                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
                                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                ),

                                code: ({
                                    inline,
                                    className,
                                    children,
                                    ...props
                                }: {
                                    inline?: boolean
                                    className?: string
                                    children?: React.ReactNode
                                }) => {
                                    const match = /language-(\w+)/.exec(className || "")
                                    const codeString = Array.isArray(children) ? children.join("") : String(children || "")

                                    if (!inline && match) {
                                        return (
                                            <div className="my-8 rounded-2xl overflow-hidden shadow-xl border" style={{ borderColor: 'var(--border-light)' }}>
                                                <SyntaxHighlighter
                                                    style={oneDark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    showLineNumbers
                                                    wrapLines
                                                >
                                                    {codeString.trimEnd()}
                                                </SyntaxHighlighter>
                                            </div>
                                        )
                                    }

                                    return (
                                        <code
                                            className="rounded-md px-2 py-1 font-mono text-sm before:content-[''] after:content-[''] font-[Work_Sans]"
                                            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--accent)', border: '1px solid var(--border-light)' }}
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    )
                                },

                                blockquote: ({ ...props }) => (
                                    <blockquote 
                                        className="border-l-4 pl-6 py-2 italic my-8 font-[Work_Sans]"
                                        style={{ 
                                            borderColor: 'var(--accent)',
                                            backgroundColor: 'var(--card-bg)',
                                            color: 'var(--text-secondary)'
                                        }}
                                        {...props} 
                                    />
                                ),

                                table: ({ ...props }) => (
                                    <div className="overflow-x-auto my-8 rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
                                        <table className="min-w-full divide-y" style={{ borderColor: 'var(--border-light)' }} {...props} />
                                    </div>
                                ),

                                h1: ({ ...props }) => (
                                    <h1 className="font-bold mt-8 mb-4 font-[Eczar]" style={{ color: 'var(--foreground)' }} {...props} />
                                ),
                                h2: ({ ...props }) => (
                                    <h2 className="font-bold mt-8 mb-4 font-[Eczar]" style={{ color: 'var(--foreground)' }} {...props} />
                                ),
                                h3: ({ ...props }) => (
                                    <h3 className="font-bold mt-6 mb-3 font-[Eczar]" style={{ color: 'var(--foreground)' }} {...props} />
                                ),
                                p: ({ ...props }) => (
                                    <p className="my-4 leading-relaxed font-[Work_Sans]" style={{ color: 'var(--text)' }} {...props} />
                                ),
                                ul: ({ ...props }) => (
                                    <ul className="my-4 space-y-2 font-[Work_Sans]" style={{ color: 'var(--text)' }} {...props} />
                                ),
                                ol: ({ ...props }) => (
                                    <ol className="my-4 space-y-2 font-[Work_Sans]" style={{ color: 'var(--text)' }} {...props} />
                                ),
                            }}
                        >
                            {contentMarkdown}
                        </ReactMarkdown>
                    </div>

                        <ArticleFooter title={metadata.title} url={url} />
                    </motion.article>

                    {/* Sidebar with Table of Contents */}
                    <aside className="hidden lg:block lg:w-80">
                        <div className="sticky top-24">
                            <TableOfContents contentMarkdown={contentMarkdown} />
                        </div>
                    </aside>
                </div>

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Section header */}
                            <div className="text-center mb-12">
                                <motion.div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                                    style={{ 
                                        backgroundColor: 'var(--accent-bg)',
                                        color: 'var(--accent)'
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className="text-sm font-semibold font-[Work_Sans]">🔗 Bài viết liên quan</span>
                                </motion.div>
                                <h2 className="text-3xl md:text-4xl font-bold font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                    Tiếp tục khám phá
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                {relatedPosts.map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/blog/${post.slug}`}>
                                            <motion.div 
                                                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border relative"
                                                style={{ 
                                                    backgroundColor: 'var(--card-bg)',
                                                    borderColor: 'var(--border-light)'
                                                }}
                                                whileHover={{ y: -8 }}
                                            >
                                                {/* Image container */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                    
                                                    {/* Category badge */}
                                                    <div className="absolute top-3 left-3">
                                                        <span 
                                                            className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl shadow-lg font-[Work_Sans]"
                                                            style={{
                                                                backgroundColor: 'var(--accent)',
                                                                color: 'var(--accent-foreground)'
                                                            }}
                                                        >
                                                            {post.category}
                                                        </span>
                                                    </div>

                                                    {/* Reading time badge */}
                                                    <div className="absolute bottom-3 right-3">
                                                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-xl text-white font-[Work_Sans]" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                            <BookOpen className="w-3 h-3" />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {/* Content */}
                                                <div className="p-5 flex flex-col flex-1">
                                                    <div className="flex items-center gap-2 text-xs mb-3 font-[Work_Sans]" style={{ color: 'var(--text-muted)' }}>
                                                        <Calendar className="w-3 h-3" />
                                                        {post.date}
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm line-clamp-2 mb-4 font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                                                        {post.excerpt}
                                                    </p>
                                                    
                                                    {/* Read more link */}
                                                    <div className="mt-auto flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all font-[Work_Sans]" style={{ color: 'var(--accent)' }}>
                                                        Đọc tiếp
                                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Hover effect overlay */}
                                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                )}
            </main>
        </>
    )
}
