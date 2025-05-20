"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { allBlogPosts } from "@/data/blogs";

export default function BlogPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(allBlogPosts.length / itemsPerPage);
    const currentPosts = allBlogPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="mx-auto container max-w-8xl px-4 md:px-8 lg:px-12 ">
            {/* Header */}
            <header className="relative overflow-hidden py-8 sm:py-14">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <SectionHeading
                        title="Góc nhỏ của An"
                        subtitle="Khám phá những bài viết mới nhất về thiết kế và sáng tạo của mình ><"
                        centered
                    />
                    <div className="mt-6 flex justify-center">
                        <div className="w-28 h-1 rounded-full bg-gradient-to-r from-rose-400 to-purple-400" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-10 pointer-events-none" />
            </header>

            {/* Blog content */}
            <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 relative">
                {/* Posts grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentPosts.map((post, index) => (
                        <AnimatedCard
                            key={post.slug}
                            index={index}
                            className="overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group cursor-pointer h-full"
                        >
                            {/* Image container */}
                            <div className="relative h-52 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-rose-600 px-3 py-1 text-xs font-medium rounded-full shadow-sm border border-gray-100">
                                    {post.category}
                                </span>
                            </div>

                            {/* Content container */}
                            <div className="p-5 flex flex-col flex-1">
                                {/* Date and read time */}
                                <div className="flex items-center text-xs mb-3 space-x-2">
                                    <time className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {post.date}
                                    </time>
                                    <span aria-hidden="true">•</span>
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-semibold mb-3 leading-snug group-hover:text-rose-600 transition-colors duration-200">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>

                                {/* Read more link */}
                                <div className="mt-auto pt-3 border-t border-gray-100">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium text-sm transition-colors duration-200 group/link"
                                        aria-label={`Đọc bài viết: ${post.title}`}
                                    >
                                        <span className="relative">
                                            Đọc bài viết
                                            <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-600 transition-all duration-300 group-hover/link:w-full"></span>
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedCard>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex justify-center">
                    <nav className="flex items-center gap-2" aria-label="Phân trang">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full flex items-center justify-center text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                            aria-label="Trang trước"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 ${page === currentPage
                                    ? "bg-rose-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                                    }`}
                                aria-current={page === currentPage ? "page" : undefined}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full flex items-center justify-center text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                            aria-label="Trang kế tiếp"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </section>
        </main>
    );
}
