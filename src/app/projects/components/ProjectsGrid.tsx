import { AnimatePresence, motion } from "framer-motion"
import { Search } from "lucide-react"
import ProjectCard from "./ProjectCard"

interface ProjectsGridProps {
    projectsToShow: any[]
    filteredProjects: any[]
    clearAllFilters: () => void
}

export default function ProjectsGrid({ projectsToShow, filteredProjects, clearAllFilters }: ProjectsGridProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {projectsToShow.length > 0 ? (
                    projectsToShow.map((project, index) => (
                        <ProjectCard key={project.slug || project.title} project={project} index={index} />
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="col-span-full text-center py-16"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="relative mb-6">
                                <Search className="h-16 w-16 mx-auto text-gray-300" />
                                <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
                            </div>
                            <h3 className="text-xl font-medium mb-2 text-gray-800">Không tìm thấy dự án phù hợp</h3>
                            <p className="text-gray-500 mb-6">
                                Hãy thử điều chỉnh từ khóa tìm kiếm hoặc thay đổi bộ lọc danh mục.
                            </p>
                            <button
                                onClick={clearAllFilters}
                                className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                            >
                                Xóa tất cả bộ lọc
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}