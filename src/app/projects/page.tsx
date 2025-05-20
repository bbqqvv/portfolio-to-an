"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Filter, Lock, Search, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { allProjects, Project } from "@/data/projects"
import PageTransition from "@/components/PageTransition"

export default function ProjectsPage() {
    const [filter, setFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [visibleProjects, setVisibleProjects] = useState<number>(6)
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            if (filter !== "all" && project.category !== filter) return false

            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const inTitle = project.title.toLowerCase().includes(query)
                const inDesc = project.description.toLowerCase().includes(query)
                const inTech = project.technologies.some(tech =>
                    tech.toLowerCase().includes(query)
                )
                if (!inTitle && !inDesc && !inTech) return false
            }
            return true
        })
    }, [filter, searchQuery])

    const projectsToShow = filteredProjects.slice(0, visibleProjects)
    const hasMoreProjects = filteredProjects.length > visibleProjects

    const loadMoreProjects = () => setVisibleProjects(prev => prev + 3)

    useEffect(() => {
        setVisibleProjects(6)
    }, [filter, searchQuery])

    return (
        <div className="mx-auto container max-w-7xl px-4 md:px-8 lg:px-12 py-12 md:py-20">
            {/* Phần tiêu đề đầu trang */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto mb-16 text-center"
            >

                <h1
                    className="text-4xl md:text-5xl font-bold mb-6"
                    onMouseEnter={() => window.enterTextCursor?.()}
                    onMouseLeave={() => window.leaveTextCursor?.()}
                    style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                >
                    Các dự án sáng tạo của tôi
                </h1>

            </motion.div>

            {/* Thanh tìm kiếm và lọc dự án */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-xl shadow-sm border border-gray-100"
                style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}

            >
                {/* Tìm kiếm dự án */}
                <div className="relative flex-1" style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm dự án..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setIsSearching(e.target.value.length > 0)
                        }}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg  focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery("")
                                setIsSearching(false)
                            }}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Bộ lọc danh mục */}
                <div className="flex items-center gap-3 w-full md:w-auto" style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                >
                    <Filter className="h-5 w-5 text-gray-400" />
                    <Select
                        value={filter}
                        onValueChange={(value) => setFilter(value)}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Tất cả danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả dự án</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="module">Module</SelectItem>
                            <SelectItem value="tool">Công cụ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </motion.div>

            {/* Hiển thị bộ lọc đang dùng */}
            {(filter !== "all" || isSearching) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 flex flex-wrap items-center gap-3"
                >
                    <span className="text-sm">Bộ lọc đang dùng:</span>

                    {filter !== "all" && (
                        <Badge className="flex items-center gap-2 bg-gray-100 text-gray-800">
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            <button
                                onClick={() => setFilter("all")}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    {isSearching && (
                        <Badge className="flex items-center gap-2 bg-gray-100 text-gray-800">
                            Tìm kiếm: "{searchQuery}"
                            <button
                                onClick={() => {
                                    setSearchQuery("")
                                    setIsSearching(false)
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                </motion.div>
            )}

            {/* Hiển thị số lượng dự án */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 text-sm"
                style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}

            >
                Đang hiển thị {Math.min(projectsToShow.length, filteredProjects.length)} / {filteredProjects.length} dự án
                {filteredProjects.length !== allProjects.length && (
                    <button
                        onClick={() => {
                            setFilter("all")
                            setSearchQuery("")
                            setIsSearching(false)
                        }}
                        className="ml-2 text-black underline hover:no-underline"
                    >
                        Xóa tất cả bộ lọc
                    </button>
                )}
            </motion.div>

            {/* Lưới hiển thị dự án */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" >
                <AnimatePresence mode="wait">
                    {projectsToShow.length > 0 ? (
                        projectsToShow.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12"
                        >
                            <div className="max-w-md mx-auto">
                                <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-medium mb-2 text-gray-800">Không tìm thấy dự án</h3>
                                <p className="text-gray-500 mb-4">
                                    Hãy thử thay đổi từ khóa hoặc bộ lọc tìm kiếm.
                                </p>
                                <button
                                    onClick={() => {
                                        setFilter("all")
                                        setSearchQuery("")
                                        setIsSearching(false)
                                    }}
                                    className="text-sm text-black underline hover:no-underline"
                                >
                                    Xóa tất cả bộ lọc
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Nút tải thêm dự án */}
            {hasMoreProjects && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-12"
                    style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}

                >
                    <button
                        onClick={loadMoreProjects}
                        className="px-7 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
                    >
                        Xem thêm
                        <span className="text-sm text-gray-300">
                            ({filteredProjects.length - visibleProjects} còn lại)
                        </span>
                    </button>
                </motion.div>
            )}


            {/* Đã xem hết dự án */}
            {filteredProjects.length > 0 && !hasMoreProjects && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-12 pt-8 border-t border-gray-200"
                    style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}

                >
                    <p className="">
                        Bạn đã xem tất cả {filteredProjects.length} dự án
                    </p>
                </motion.div>
            )}
        </div>
    )
}

// Component hiển thị từng thẻ dự án
function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group  rounded-xl overflow-hidden h-full flex flex-col  transition-shadow"
        >
            {/* Ảnh đại diện dự án */}
            <div className="relative aspect-video bg-gray-900">
                <Image
                    src={project.image || "/placeholder-dark.svg"}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-80 transition-opacity"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute top-4 right-4">
                    <Badge className="bg-black/80 text-[#faf4e6] border-none">
                        {project.category}
                    </Badge>
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-rose-800 transition-colors">
                        {project.title}
                    </h3>
                    <p className="mb-4 line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Công nghệ */}
                <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs bg-rose-100 px-3 text-black py-1 rounded-full  transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="text-xs bg-black/5 text-black/60 px-3 py-1 rounded-full">
                                            +{project.technologies.length - 4}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-white shadow-lg border border-black/10">
                                        <div className="flex flex-wrap gap-2 max-w-[200px]">
                                            {project.technologies.slice(4).map(tech => (
                                                <span key={tech} className="text-xs bg-black/5 text-black/80 px-2 py-1 rounded-full">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                </div>

                {/* Nút hành động */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-black/10">
                    {project.githubUrl ? (
                        project.showGithub === false ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            disabled
                                            className="flex-1 rounded-lg bg-black/5  px-4 py-2 text-sm flex items-center justify-center gap-2"
                                            style={{ backgroundColor: "var(--btn-disabled)" }}
                                        >
                                            <Lock className="h-4 w-4" />
                                            Riêng tư
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-white border border-black/10">
                                        <p>Repo này là riêng tư</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <Link
                                href={project.githubUrl}
                                target="_blank"
                                className="flex-1"
                            >
                                <button className="w-full rounded-lg bg-black text-[#faf4e6] px-4 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                                    <Github className="h-4 w-4" />
                                    Mã nguồn
                                </button>
                            </Link>
                        )
                    ) : null}

                    {project.liveUrl && (
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            className="flex-1"
                        >
                            <button className="w-full rounded-lg border bg-rose-600 text-white border-black/20 px-4 py-2 text-sm flex items-center justify-center gap-2  transition-colors">
                                <ExternalLink className="h-4 w-4" />
                                Xem thử
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
