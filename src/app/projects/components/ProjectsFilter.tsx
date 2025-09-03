import { motion } from "framer-motion"
import { Filter, Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectsFilterProps {
    filter: string
    setFilter: (filter: string) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
    isSearching: boolean
    setIsSearching: (isSearching: boolean) => void
    sortBy: string
    setSortBy: (sortBy: string) => void
}

export default function ProjectsFilter({
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isSearching,
    setIsSearching,
    sortBy,
    setSortBy
}: ProjectsFilterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8 p-6 rounded-2xl  shadow-md border border-gray-100"
        >
            {/* Tìm kiếm dự án */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Tìm kiếm dự án theo tên, mô tả hoặc công nghệ..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setIsSearching(e.target.value.length > 0)
                    }}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                    <button
                        onClick={() => {
                            setSearchQuery("")
                            setIsSearching(false)
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-full p-1 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>

            {/* Bộ lọc danh mục */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="flex items-center gap-3">
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

                {/* Sắp xếp */}
                <div className="flex items-center gap-3">
                    <Select
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value)}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Sắp xếp" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Mới nhất</SelectItem>
                            <SelectItem value="oldest">Cũ nhất</SelectItem>
                            <SelectItem value="name">Theo tên</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </motion.div>
    )
}