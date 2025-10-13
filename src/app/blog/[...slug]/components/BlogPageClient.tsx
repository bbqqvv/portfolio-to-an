"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
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

            <main 
                className="min-h-screen"
                style={{ backgroundColor: 'var(--background-1)' }}
            >
                {/* Hero Section with Cover Image */}
                {metadata.coverImage && (
                    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                        <Image
                            src={metadata.coverImage}
                            alt={metadata.title || 'Blog cover'}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        {/* Back button */}
                        <div className="absolute top-8 left-4 md:left-8 z-10">
                            <Link href="/blog">
                                <motion.button
                                    className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md font-semibold font-[Work_Sans] shadow-lg"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại
                                </motion.button>
                            </Link>
                        </div>

                        {/* Title and meta overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                            <div className="max-w-4xl mx-auto">
                                {metadata.tags && metadata.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {metadata.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md font-[Work_Sans]"
                                                style={{
                                                    background: 'var(--accent)',
                                                    color: 'var(--accent-foreground)'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[Eczar]">
                                    {metadata.title}
                                </h1>
                                <div className="flex items-center gap-4 text-white/90 text-sm font-[Work_Sans]">
                                    {metadata.date && (
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {metadata.date}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        10 phút đọc
                                    </span>
                                    {metadata.author && (
                                        <>
                                            <span>•</span>
                                            <span>{metadata.author}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
                    {/* Main Article Content */}
                    <motion.article 
                        ref={articleRef}
                        className="prose prose-lg max-w-none flex-1"
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeInUp}
                        transition={{ duration: 0.8 }}
                    >

                    <div className="max-w-3xl mx-auto">
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
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t" style={{ borderColor: 'var(--border-light)' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                Bài viết liên quan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -8 }}
                                    >
                                        <Link href={`/blog/${post.slug}`}>
                                            <div 
                                                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border"
                                                style={{ 
                                                    backgroundColor: 'var(--card-bg)',
                                                    borderColor: 'var(--border-light)'
                                                }}
                                            >
                                                <div className="relative h-48 overflow-hidden">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                </div>
                                                <div className="p-5 flex flex-col flex-1">
                                                    <div className="flex items-center gap-2 text-xs mb-2 font-[Work_Sans]" style={{ color: 'var(--text-muted)' }}>
                                                        <Calendar className="w-3 h-3" />
                                                        {post.date}
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2 line-clamp-2 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm line-clamp-2 font-[Work_Sans]" style={{ color: 'var(--text)' }}>
                                                        {post.excerpt}
                                                    </p>
                                                </div>
                                            </div>
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
