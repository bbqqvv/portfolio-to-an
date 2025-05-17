// lib/posts.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "contents/blogs")

export function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    return { metadata: data, content }
}

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory).map((file) => file.replace(/\.md$/, ""))
}
