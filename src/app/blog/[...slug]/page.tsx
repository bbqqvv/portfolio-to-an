import { getPostBySlug } from "@/lib/api"
import BlogPageClient from "./components/BlogPageClient"

interface Props {
    params: { slug: string }
}

export default async function BlogPage({ params }: Props) {
    const { metadata, content } = getPostBySlug(params.slug)
    return <BlogPageClient metadata={metadata} contentMarkdown={content} slug={params.slug} />
}
