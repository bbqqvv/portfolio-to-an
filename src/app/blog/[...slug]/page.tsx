
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

interface BlogPageProps {
    params: { slug?: string[] }
}

export default async function BlogPage({ params }: BlogPageProps) {
    const slugPath = params?.slug?.join("/") || "untitled-post"
    const filePath = path.join(process.cwd(), "contents/blogs", `${slugPath}.md`)

    let contentHtml = ""
    let metadata: {
        title?: string
        date?: string
        author?: string
        description?: string
        tags?: string[]
        coverImage?: string
    } = {}

    try {
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data, content } = matter(fileContents)
        const processedContent = await remark().use(html).process(content)
        contentHtml = processedContent.toString()
        metadata = data
    } catch (error) {
        return (
            <main className="p-10 text-center text-red-600">
                Không tìm thấy bài viết.
            </main>
        )
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-16 text-lg leading-relaxed">
            {metadata.coverImage && (
                <img
                    src={metadata.coverImage}
                    alt={metadata.title}
                    className="mb-8 rounded-xl shadow"
                />
            )}
            <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {metadata.date} • Tác giả: {metadata.author}
            </p>

            {metadata.tags && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {metadata.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </main>
    )
}
