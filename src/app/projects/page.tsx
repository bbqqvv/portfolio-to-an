"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { allProjects } from "@/data/projects"
import { X, Sparkles } from "lucide-react"
import ProjectsFilter from "./components/ProjectsFilter"
import ProjectsGrid from "./components/ProjectsGrid"
import ProjectsHeader from "./components/ProjectsHeader"
import ProjectsLoadMore from "./components/ProjectsLoadMore"


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

    return (
        <div className="min-h-screen ">
            <div className="mx-auto container max-w-7xl px-4 md:px-8 lg:px-12 py-12 md:py-20">
                <ProjectsHeader />

                <ProjectsFilter
                    filter={filter}
                    setFilter={setFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isSearching={isSearching}
                    setIsSearching={setIsSearching}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Hiển thị bộ lọc đang dùng */}
                {(filter !== "all" || isSearching) && (
                    <ActiveFilters
                        filter={filter}
                        searchQuery={searchQuery}
                        isSearching={isSearching}
                        setFilter={setFilter}
                        setSearchQuery={setSearchQuery}
                        setIsSearching={setIsSearching}
                    />
                )}

                {/* Hiển thị số lượng dự án */}
                <ProjectsCounter
                    projectsToShow={projectsToShow}
                    filteredProjects={filteredProjects}
                    allProjects={allProjects}
                    clearAllFilters={clearAllFilters}
                />

                {/* Lưới hiển thị dự án */}
                <ProjectsGrid
                    projectsToShow={projectsToShow}
                    filteredProjects={filteredProjects}
                    clearAllFilters={clearAllFilters}
                />

                {/* Nút tải thêm dự án */}
                {hasMoreProjects && (
                    <ProjectsLoadMore
                        loadMoreProjects={loadMoreProjects}
                        filteredProjects={filteredProjects}
                        visibleProjects={visibleProjects}
                    />
                )}

                {/* Đã xem hết dự án */}
                {filteredProjects.length > 0 && !hasMoreProjects && (
                    <AllProjectsViewed filteredProjects={filteredProjects} />
                )}
            </div>
        </div>
    )
}

// Các components nhỏ bổ trợ
interface ActiveFiltersProps {
    filter: string;
    searchQuery: string;
    isSearching: boolean;
    setFilter: (filter: string) => void;
    setSearchQuery: (query: string) => void;
    setIsSearching: (isSearching: boolean) => void;
}

const ActiveFilters = ({
    filter,
    searchQuery,
    isSearching,
    setFilter,
    setSearchQuery,
    setIsSearching
}: ActiveFiltersProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex flex-wrap items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100"
        >
            <span className="text-sm font-medium text-blue-800">Bộ lọc đang dùng:</span>

            {filter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {filter === "backend" && "Backend"}
                    {filter === "frontend" && "Frontend"}
                    {filter === "module" && "Module"}
                    {filter === "tool" && "Công cụ"}
                    <button
                        onClick={() => setFilter("all")}
                        className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {isSearching && (
                <Badge variant="secondary" className="flex items-center gap-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Tìm kiếm: &quot;{searchQuery}&quot;
                    <button
                        onClick={() => {
                            setSearchQuery("")
                            setIsSearching(false)
                        }}
                        className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
        </motion.div>
    )
}

interface ProjectsCounterProps {
    projectsToShow: any[];
    filteredProjects: any[];
    allProjects: any[];
    clearAllFilters: () => void;
}

const ProjectsCounter = ({
    projectsToShow,
    filteredProjects,
    allProjects,
    clearAllFilters
}: ProjectsCounterProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-sm text-gray-600 flex justify-between items-center"
        >
            <span>
                Đang hiển thị <span className="font-semibold">{Math.min(projectsToShow.length, filteredProjects.length)}</span> / <span className="font-semibold">{filteredProjects.length}</span> dự án
                {filteredProjects.length !== allProjects.length && (
                    <button
                        onClick={clearAllFilters}
                        className="ml-2 text-blue-600 underline hover:no-underline"
                    >
                        Xóa tất cả bộ lọc
                    </button>
                )}
            </span>

            {filteredProjects.length === 0 && (
                <button
                    onClick={clearAllFilters}
                    className="text-blue-600 text-sm underline hover:no-underline"
                >
                    Xóa bộ lọc
                </button>
            )}
        </motion.div>
    )
}

interface AllProjectsViewedProps {
    filteredProjects: any[];
}

const AllProjectsViewed = ({ filteredProjects }: AllProjectsViewedProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16 pt-12 border-t border-gray-200"
        >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-50 to-gray-50 rounded-full mb-5">
                <Sparkles className="h-7 w-7 text-amber-500" />
            </div>
            <p >
                Bạn đã xem tất cả <span className="font-semibold">{filteredProjects.length}</span> dự án
            </p>
            <p className="text-sm  mt-2">
                Cảm ơn bạn đã dành thời gian khám phá các dự án của tôi!
            </p>
        </motion.div>
    )
}