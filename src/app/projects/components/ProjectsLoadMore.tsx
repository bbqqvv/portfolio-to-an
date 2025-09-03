import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ProjectsLoadMoreProps {
    loadMoreProjects: () => void
    filteredProjects: any[]
    visibleProjects: number
}

export default function ProjectsLoadMore({ loadMoreProjects, filteredProjects, visibleProjects }: ProjectsLoadMoreProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-16"
        >
            <button
                onClick={loadMoreProjects}
                className="px-7 py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow font-medium group"
            >
                Xem thêm dự án
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-md">
                    {filteredProjects.length - visibleProjects} còn lại
                </span>
                <ChevronDown className="h-4 w-4 group-hover:animate-bounce" />
            </button>
        </motion.div>
    )
}