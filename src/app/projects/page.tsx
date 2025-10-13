"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { allProjects } from "@/data/projects"
import { X, Sparkles, Layers, Search } from "lucide-react"
import { ProjectCard } from "@/components/ProjectCard"


export default function ProjectsPage() {
    const [filter, setFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [visibleProjects, setVisibleProjects] = useState<number>(6)
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [sortBy, setSortBy] = useState<string>("newest")

    const filteredProjects = useMemo(() => {
        let projects = [...allProjects];

        // Lọc theo danh mục
        if (filter !== "all") {
            projects = projects.filter(project => project.category === filter);
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            projects = projects.filter(project => {
                const inTitle = project.title.toLowerCase().includes(query);
                const inDesc = project.description.toLowerCase().includes(query);
                const inTech = project.technologies.some(tech => tech.toLowerCase().includes(query));
                return inTitle || inDesc || inTech;
            });
        }

        // Sắp xếp dự án
        if (sortBy === "newest") {
            projects.sort((a, b) =>
                new Date(b.date || Date.now()).getTime() - new Date(a.date || Date.now()).getTime()
            );
        } else if (sortBy === "oldest") {
            projects.sort((a, b) =>
                new Date(a.date || Date.now()).getTime() - new Date(b.date || Date.now()).getTime()
            );
        } else if (sortBy === "name") {
            projects.sort((a, b) => a.title.localeCompare(b.title));
        }

        return projects;
    }, [filter, searchQuery, sortBy])

    const projectsToShow = filteredProjects.slice(0, visibleProjects)
    const hasMoreProjects = filteredProjects.length > visibleProjects

    const loadMoreProjects = () => setVisibleProjects(prev => prev + 6)

    const clearAllFilters = () => {
        setFilter("all")
        setSearchQuery("")
        setIsSearching(false)
        setSortBy("newest")
    }

    useEffect(() => {
        setVisibleProjects(6)
    }, [filter, searchQuery, sortBy])

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.1 })

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(allProjects.map(p => p.category)))
        return ["all", ...cats]
    }, [])

    return (
        <div 
            ref={containerRef}
            className="min-h-screen py-16 md:py-24" 
            style={{ backgroundColor: 'var(--background-1)' }}
        >
            {/* Decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <motion.div 
                    className="absolute top-1/3 -left-20 w-96 h-96 rounded-full blur-3xl"
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
                    className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full blur-3xl"
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
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-light)' }}>
                        <Layers className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="text-sm font-medium font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>Các dự án nổi bật</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                        Dự Án Của Tôi
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                        Khám phá các dự án mà tôi đã thực hiện với đam mê và sự cống hiến
                    </p>
                </motion.header>

                {/* Search and Filter */}
                <motion.div 
                    className="mb-12 space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Search bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm dự án..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setIsSearching(e.target.value !== "")
                                }}
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
                                    onClick={() => {
                                        setSearchQuery("")
                                        setIsSearching(false)
                                    }}
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
                                onClick={() => setFilter(category)}
                                className="px-5 py-2.5 rounded-full font-medium text-sm transition-all font-[Work_Sans]"
                                style={{
                                    backgroundColor: filter === category ? 'var(--accent)' : 'var(--card-bg)',
                                    color: filter === category ? 'var(--accent-foreground)' : 'var(--foreground)',
                                    border: filter === category ? 'none' : '1px solid var(--border-light)'
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
                        Hiển thị <span className="font-semibold" style={{ color: 'var(--accent)' }}>{Math.min(projectsToShow.length, filteredProjects.length)}</span> / <span className="font-semibold" style={{ color: 'var(--accent)' }}>{filteredProjects.length}</span> dự án
                    </div>
                </motion.div>

                {/* Projects Grid - 3-2-1 Column Layout */}
                {projectsToShow.length === 0 ? (
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                            Không tìm thấy dự án
                        </h3>
                        <p className="font-[Work_Sans] mb-4" style={{ color: 'var(--text-secondary)' }}>
                            Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
                        </p>
                        <motion.button
                            onClick={clearAllFilters}
                            className="px-6 py-3 rounded-xl font-semibold font-[Work_Sans]"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                color: 'var(--accent-foreground)'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Xóa tất cả bộ lọc
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.2,
                                },
                            },
                        }}
                    >
                        {projectsToShow.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} index={index} />
                        ))}
                    </motion.div>
                )}

                {/* Load More Button */}
                {hasMoreProjects && (
                    <motion.div 
                        className="mt-20 flex justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button
                            onClick={loadMoreProjects}
                            className="px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg font-[Work_Sans] flex items-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                color: 'var(--accent-foreground)'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Layers className="w-5 h-5" />
                            Xem thêm dự án ({filteredProjects.length - visibleProjects} còn lại)
                        </motion.button>
                    </motion.div>
                )}

                {/* All viewed */}
                {filteredProjects.length > 0 && !hasMoreProjects && projectsToShow.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mt-20 pt-12 border-t" style={{ borderColor: 'var(--border-light)' }}
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5 shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}>
                            <Sparkles className="h-7 w-7" style={{ color: 'var(--accent-foreground)' }} />
                        </div>
                        <p className="text-lg font-medium font-[Work_Sans]" style={{ color: 'var(--foreground)' }}>
                            Bạn đã xem tất cả <span className="font-bold" style={{ color: 'var(--accent)' }}>{filteredProjects.length}</span> dự án
                        </p>
                        <p className="text-sm mt-2 font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                            Cảm ơn bạn đã dành thời gian khám phá!
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}


