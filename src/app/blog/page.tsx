"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SectionHeading } from "@/components/ui/section-heading";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const navRef = useRef<HTMLDivElement>(null);

    const blogPosts = [
        {
            slug: "tam-quan-trong-cua-thiet-ke-lay-nguoi-dung-lam-trung-tam",
            title: "Tầm Quan Trọng Của Thiết Kế Lấy Người Dùng Làm Trung Tâm",
            excerpt:
                "Khám phá lý do tại sao đặt người dùng làm trung tâm trong quá trình thiết kế sẽ tạo ra sản phẩm tốt hơn và khách hàng hài lòng hơn.",
            date: "5 Tháng 5, 2023",
            category: "Tư Duy Thiết Kế",
            image: "/images/toan1.png",
            readTime: "5 phút đọc",
        },
        {
            slug: "tam-ly-mau-sac-trong-thiet-ke-giao-dien",
            title: "Tâm Lý Màu Sắc Trong Thiết Kế Giao Diện",
            excerpt:
                "Tìm hiểu cách các màu sắc khác nhau ảnh hưởng đến nhận thức của người dùng và cách sử dụng màu sắc hiệu quả trong thiết kế.",
            date: "18 Tháng 4, 2023",
            category: "Thiết Kế Giao Diện",
            image: "/images/toan1.png",
            readTime: "7 phút đọc",
        },
        {
            slug: "thiet-ke-cho-tinh-tiep-can",
            title: "Thiết Kế Cho Tính Tiếp Cận",
            excerpt:
                "Khám phá các phương pháp tốt nhất để tạo ra thiết kế phù hợp với người dùng có khả năng khác nhau.",
            date: "22 Tháng 3, 2023",
            category: "Tiếp Cận",
            image: "/images/toan1.png",
            readTime: "6 phút đọc",
        },
    ];

    useEffect(() => {
        const animations: gsap.core.Tween[] = [];

        cardRefs.current.forEach((el, index) => {
            if (el) {
                const animation = gsap.fromTo(
                    el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                        delay: index * 0.12,
                    }
                );
                animations.push(animation);
            }
        });

        return () => {
            animations.forEach((anim) => anim.kill());
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b ">
            {/* Header */}
            <header className="relative overflow-hidden py-10 sm:py-12 bg-gradient-to-r ">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <SectionHeading
                        title="Góc Chia Sẻ"
                        subtitle="Khám phá những bài viết mới nhất về thiết kế và sáng tạo"
                        centered
                        className="text-rose-800"
                    />
                    <div className="mt-6 flex justify-center">
                        <div className="w-28 h-1 rounded-full bg-gradient-to-r from-rose-400 to-purple-400" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-10 pointer-events-none" />
            </header>

            {/* Blog content */}
            <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative">
                {/* Decorative circles */}

                {/* Posts grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogPosts.map((post, idx) => (
                        <AnimatedCard
                            key={post.slug}
                            ref={(el) => {
                                cardRefs.current[idx] = el;
                            }}
                            className="bg-white rounded-2xl  duration-400 overflow-hidden flex flex-col border border-gray-200 hover:border-rose-300 cursor-pointer group"
                        >
                            <div className="relative h-60 sm:h-64 w-full overflow-hidden rounded-t-2xl">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={idx < 2}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-rose-700 px-4 py-1 text-xs font-semibold rounded-full shadow-md">
                                    {post.category}
                                </span>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-3">
                                    <time>{post.date}</time>
                                    <span aria-hidden="true">•</span>
                                    <span>{post.readTime}</span>
                                </div>

                                <h2 className="text-2xl font-semibold text-gray-900 mb-4 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="mt-auto inline-flex items-center text-rose-600 font-semibold text-sm hover:text-rose-800 transition-colors duration-300"
                                    aria-label={`Đọc bài viết: ${post.title}`}
                                >
                                    Đọc bài viết
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                        </AnimatedCard>
                    ))}
                </div>

                <nav
                    className="mt-12 flex justify-center items-center gap-4"
                    aria-label="Phân trang"
                    ref={navRef}
                >
                    <button
                        className="p-2 rounded-full flex items-center justify-center text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-300"
                        aria-label="Trang trước"
                        disabled
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

                    {[1, 2, 3].map((num) => (
                        <button
                            key={num}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-300
        ${num === 1
                                    ? "bg-rose-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                                }`}
                            aria-current={num === 1 ? "page" : undefined}
                            aria-label={`Trang ${num}`}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        className="p-2 rounded-full flex items-center justify-center text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
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

            </section>
        </main>
    );
}
