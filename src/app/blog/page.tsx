"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { allBlogPosts } from "@/data/blogs";
import { Sparkles, Calendar, Clock, Search, X, ArrowRight, BookOpen, Tag, TrendingUp } from "lucide-react";

export default function BlogPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [layoutMode, setLayoutMode] = useState<'grid' | 'masonry' | 'list'>('grid');
    const itemsPerPage = 9;

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(allBlogPosts.map(post => post.category)));
        return ["all", ...cats];
    }, []);

    // Filter posts
    const filteredPosts = useMemo(() => {
        let posts = [...allBlogPosts];
        
        // Filter by category
        if (selectedCategory !== "all") {
            posts = posts.filter(post => post.category === selectedCategory);
        }
        
        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            posts = posts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query)
            );
        }
        
        return posts;
    }, [selectedCategory, searchQuery]);

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Featured post (first post)
    const featuredPost = allBlogPosts[0];
    const regularPosts = currentPosts.filter(post => post.slug !== featuredPost.slug);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.1 })

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <main 
            ref={containerRef}
            className="min-h-screen py-16 md:py-24" 
            style={{ backgroundColor: 'var(--background-1)' }}
        >
            {/* Decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <motion.div 
                    className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--accent)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--accent-secondary)' }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <div className="relative mx-auto container max-w-7xl px-4 md:px-8 lg:px-12">
                {/* Header */}
                <motion.header 
                    className="py-12 sm:py-16 text-center"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-light)' }}>
                        <BookOpen className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="text-sm font-medium font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>Câu chuyện và kinh nghiệm</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                        Góc nhỏ của An
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                        Khám phá những bài viết về thiết kế, sáng tạo và câu chuyện của tôi
                    </p>
                </motion.header>

                {/* Search and Filter */}
                <motion.div 
                    className="mb-12 space-y-6"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Search bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all outline-none font-[Work_Sans]"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    borderColor: 'var(--border-light)',
                                    color: 'var(--foreground)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                            />
                            {searchQuery && (
                                <motion.button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
                                    style={{ color: 'var(--text-muted)' }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className="px-5 py-2.5 rounded-full font-medium text-sm transition-all font-[Work_Sans]"
                                style={{
                                    backgroundColor: selectedCategory === category ? 'var(--accent)' : 'var(--card-bg)',
                                    color: selectedCategory === category ? 'var(--accent-foreground)' : 'var(--foreground)',
                                    border: selectedCategory === category ? 'none' : '1px solid var(--border-light)'
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category === "all" ? "Tất cả" : category}
                            </motion.button>
                        ))}
                    </div>

                    {/* Results count */}
                    <div className="text-center text-sm font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                        Hiển thị <span className="font-semibold" style={{ color: 'var(--accent)' }}>{filteredPosts.length}</span> bài viết
                    </div>
                </motion.div>


                {/* Featured Post - First post */}
                {currentPage === 1 && filteredPosts.length > 0 && (
                    <motion.section
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                            <h2 className="text-2xl font-bold font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                Bài viết nổi bật
                            </h2>
                        </div>
                        <Link href={`/blog/${filteredPosts[0].slug}`}>
                            <motion.div
                                className="group relative rounded-3xl overflow-hidden shadow-2xl border"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid md:grid-cols-2 gap-0">
                                    {/* Image */}
                                    <div className="relative h-64 md:h-96 overflow-hidden">
                                        <Image
                                            src={filteredPosts[0].image}
                                            alt={filteredPosts[0].title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                        <div className="absolute top-6 left-6">
                                            <span 
                                                className="px-4 py-2 rounded-full text-sm font-bold shadow-xl font-[Work_Sans] backdrop-blur-sm"
                                                style={{
                                                    background: 'var(--accent)',
                                                    color: 'var(--accent-foreground)'
                                                }}
                                            >
                                                {filteredPosts[0].category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-8 md:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 text-sm mb-4 font-[Work_Sans]" style={{ color: 'var(--text-muted)' }}>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                {filteredPosts[0].date}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4" />
                                                {filteredPosts[0].readTime}
                                            </span>
                                        </div>
                                        
                                        <h3 
                                            className="text-2xl md:text-3xl font-bold mb-4 line-clamp-2 font-[Eczar] group-hover:text-opacity-80 transition-opacity"
                                            style={{ color: 'var(--foreground)' }}
                                        >
                                            {filteredPosts[0].title}
                                        </h3>
                                        
                                        <p className="text-base leading-relaxed mb-6 line-clamp-3 font-[Work_Sans]" style={{ color: 'var(--text)' }}>
                                            {filteredPosts[0].excerpt}
                                        </p>
                                        
                                        <div className="flex items-center gap-3 text-sm font-semibold font-[Work_Sans]" style={{ color: 'var(--accent)' }}>
                                            Đọc bài viết
                                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.section>
                )}

                {/* Blog content */}
                <section className="py-6">
                    {currentPosts.length === 0 ? (
                        <motion.div 
                            className="text-center py-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold mb-2 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                Không tìm thấy bài viết
                            </h3>
                            <p className="font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                                Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Section heading */}
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                    Tất cả bài viết
                                </h2>
                            </div>

                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                variants={staggerContainer}
                            >
                                {(currentPage === 1 ? currentPosts.slice(1) : currentPosts).map((post, index) => (
                                    <motion.article
                                        key={post.slug}
                                        custom={index}
                                        variants={{
                                            hidden: { opacity: 0, y: 40 },
                                            visible: (i: number) => ({
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    delay: i * 0.1,
                                                    duration: 0.6,
                                                    ease: [0.215, 0.61, 0.355, 1],
                                                },
                                            }),
                                        }}
                                        whileHover={{ y: -12 }}
                                        className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                                        style={{ 
                                            backgroundColor: 'var(--card-bg)',
                                            border: '1px solid var(--border-light)'
                                        }}
                                    >
                                        {/* Image container with overlay */}
                                        <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden">
                                            <div className="relative h-56 w-full">
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                                
                                                {/* Floating category badge */}
                                                <div className="absolute top-4 right-4">
                                                    <motion.span 
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm font-[Work_Sans]"
                                                        style={{
                                                            background: 'var(--accent)',
                                                            color: 'var(--accent-foreground)'
                                                        }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Tag className="w-3 h-3" />
                                                        {post.category}
                                                    </motion.span>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Content container */}
                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Meta info */}
                                            <div className="flex items-center gap-3 text-xs mb-3 font-[Work_Sans]" style={{ color: 'var(--text-muted)' }}>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {post.date}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <Link href={`/blog/${post.slug}`}>
                                                <h3 
                                                    className="text-xl font-bold mb-3 transition-all duration-300 line-clamp-2 font-[Eczar] group-hover:text-opacity-80"
                                                    style={{ color: 'var(--foreground)' }}
                                                >
                                                    {post.title}
                                                </h3>
                                            </Link>

                                            {/* Excerpt */}
                                            <p className="mb-5 line-clamp-3 text-sm leading-relaxed flex-grow font-[Work_Sans]" style={{ color: 'var(--text)' }}>
                                                {post.excerpt}
                                            </p>

                                            {/* Read more link */}
                                            <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-bold transition-all group/link font-[Work_Sans]"
                                                    style={{ color: 'var(--accent)' }}
                                                >
                                                    Đọc tiếp
                                                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        </>
                    )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div 
                        className="mt-16 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <nav className="flex items-center gap-2">
                            <motion.button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    color: 'var(--foreground)',
                                    border: '1px solid var(--border-light)'
                                }}
                                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                                aria-label="Trang trước"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </motion.button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <motion.button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className="min-w-[40px] h-10 px-4 rounded-xl text-sm font-semibold transition-all font-[Work_Sans]"
                                    style={{
                                        backgroundColor: page === currentPage ? 'var(--accent)' : 'var(--card-bg)',
                                        color: page === currentPage ? 'var(--accent-foreground)' : 'var(--foreground)',
                                        border: page === currentPage ? 'none' : '1px solid var(--border-light)'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-current={page === currentPage ? "page" : undefined}
                                >
                                    {page}
                                </motion.button>
                            ))}

                            <motion.button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    color: 'var(--foreground)',
                                    border: '1px solid var(--border-light)'
                                }}
                                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                                aria-label="Trang kế tiếp"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </motion.button>
                        </nav>
                    </motion.div>
                )}
                </section>
            </div>
        </main>
    );
}
