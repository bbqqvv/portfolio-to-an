import Image from "next/image"

interface ArticleHeaderProps {
    metadata: {
        title?: string
        coverImage?: string
        tags?: string[]
        author?: string
        date?: string
    }
}

export default function ArticleHeader({ metadata }: ArticleHeaderProps) {
    return (
        <header className="mb-12">
            {metadata.coverImage && (
                <div className="mb-8 relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={metadata.coverImage}
                        alt={metadata.title || "Cover image"}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                </div>
            )}

            <div className="space-y-4">
                {metadata.tags && (
                    <div className="flex flex-wrap gap-2">
                        {metadata.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-xs font-medium cursor-default select-none"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                    {metadata.title}
                </h1>

                <div className="flex items-center space-x-4 text-sm">
                    {metadata.author && (
                        <span className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            {metadata.author}
                        </span>
                    )}
                    {metadata.date && (
                        <span className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {new Date(metadata.date).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    )}
                </div>
            </div>
        </header>
    )
}