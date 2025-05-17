import React from "react";

interface BlogPageProps {
    params: { slug?: string[] };
}

const BlogPage: React.FC<BlogPageProps> = ({ params }) => {
    const slug = params?.slug?.join("/") || "untitled-post";

    return (
        <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
            <h1>Blog Post: {slug}</h1>
            <p>
                Đây là template giả cho trang blog. Nội dung bài viết sẽ được hiển thị ở đây.
            </p>
            <div style={{ marginTop: "2rem", color: "#888" }}>
                <em>Chức năng đang phát triển...</em>
            </div>
        </main>
    );
};

export default BlogPage;