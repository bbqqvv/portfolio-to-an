import { getPostBySlug } from "@/lib/api"
import BlogPageClient from "./components/BlogPageClient"

interface Props {
    params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: Props) {
    const { slug } = await params
    const { metadata, content } = getPostBySlug(slug)

    return (
        <BlogPageClient metadata={metadata} contentMarkdown={content} slug={slug} />
    )
}
