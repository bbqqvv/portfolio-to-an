"use client"

import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark"
import MetaData from "./Metadata"
import TableOfContents from "./TableOfContents"
import ArticleHeader from "./ArticleHeader"
import ArticleFooter from "./ArticleFooter"

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

    return (
        <>
            <MetaData metadata={metadata} url={url} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
                <article className="prose prose-lg max-w-none flex-1">
                    <ArticleHeader metadata={metadata} />

                    <div className="max-w-3xl mx-auto">
                        <ReactMarkdown
                            children={contentMarkdown}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
                            components={{
                                img: ({ node, ...props }) => (
                                    <div className="my-6 rounded-lg overflow-hidden shadow-md">
                                        <Image
                                            src={typeof props.src === "string" ? props.src : ""}
                                            alt={props.alt || ""}
                                            width={800}
                                            height={450}
                                            className="object-cover w-full"
                                            loading="lazy"
                                        />
                                        {props.alt && <p className="text-center text-sm mt-2">{props.alt}</p>}
                                    </div>
                                ),
                                a: ({ node, ...props }) => (
                                    <a
                                        {...props}
                                        className="text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                ),
                                code: ({
                                    node,
                                    inline,
                                    className,
                                    children,
                                    ...props
                                }: {
                                    node?: any // thành optional
                                    inline?: boolean
                                    className?: string
                                    children?: React.ReactNode
                                }) => {
                                    const match = /language-(\w+)/.exec(className || "")
                                    const codeString = Array.isArray(children) ? children.join("") : String(children || "")

                                    if (!inline && match) {
                                        return (
                                            <div className="my-6 rounded-lg overflow-hidden shadow-lg">
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
                                            className="bg-gray-100 rounded px-2 py-1 font-mono text-sm before:content-[''] after:content-['']"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    )
                                },

                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6" {...props} />
                                ),
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-6">
                                        <table className="min-w-full divide-y divide-gray-200" {...props} />
                                    </div>
                                ),
                            }}
                        />
                    </div>

                    <ArticleFooter title={metadata.title} url={url} />
                </article>

                <TableOfContents contentMarkdown={contentMarkdown} />
            </main>
        </>
    )
}
