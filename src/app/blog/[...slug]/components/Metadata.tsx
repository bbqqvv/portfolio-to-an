import Head from "next/head"

interface Metadata {
    title?: string
    description?: string
    coverImage?: string
    date?: string
    author?: string
    tags?: string[]
}

export default function MetaData({ metadata, url }: { metadata: Metadata; url: string }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: metadata.title,
        image: metadata.coverImage ? [metadata.coverImage] : [],
        datePublished: metadata.date,
        author: {
            "@type": "Person",
            name: metadata.author || "Author",
        },
        description: metadata.description,
    }

    return (
        <Head>
            <title>{metadata.title || "Blog post"}</title>
            <meta name="description" content={metadata.description || "Blog post"} />
            <meta name="keywords" content={metadata.tags?.join(", ") || ""} />

            {/* Open Graph */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={metadata.title || ""} />
            <meta property="og:description" content={metadata.description || ""} />
            {metadata.coverImage && <meta property="og:image" content={metadata.coverImage} />}
            <meta property="og:url" content={url} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadata.title || ""} />
            <meta name="twitter:description" content={metadata.description || ""} />
            {metadata.coverImage && <meta name="twitter:image" content={metadata.coverImage} />}

            {/* Canonical */}
            <link rel="canonical" href={url} />

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </Head>
    )
}