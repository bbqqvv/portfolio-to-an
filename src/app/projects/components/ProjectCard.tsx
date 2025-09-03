import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Project } from "@/data/projects"

interface ProjectCardProps {
    project: Project
    index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group  rounded-2xl overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
            {/* Ảnh đại diện dự án */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
                <Image
                    src={imageError ? "/placeholder-project.jpg" : project.image || "/placeholder-project.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                    <Badge className="bg-black/90 text-white border-none backdrop-blur-sm px-3 py-1.5">
                        {project.category === "backend" && "Backend"}
                        {project.category === "frontend" && "Frontend"}
                        {project.category === "module" && "Module"}
                        {project.category === "tool" && "Công cụ"}
                    </Badge>
                </div>

                {/* Hiệu ứng hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Nội dung */}
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3  group-hover:text-blue-600 transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                    <p className="mb-4  line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Công nghệ */}
                <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full transition-colors group-hover:bg-blue-100 group-hover:text-blue-800"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full cursor-help">
                                            +{project.technologies.length - 4}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-white shadow-lg border border-gray-200 p-3">
                                        <div className="flex flex-wrap gap-2 max-w-[200px]">
                                            {project.technologies.slice(4).map(tech => (
                                                <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
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
                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                    {project.githubUrl ? (
                        project.showGithub === false ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            disabled
                                            className="flex-1 rounded-xl bg-gray-100 text-gray-500 px-4 py-2.5 text-sm flex items-center justify-center gap-2 font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            <Lock className="h-4 w-4" />
                                            Riêng tư
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-white border border-gray-200 shadow-md">
                                        <p className="text-sm">Repo này là riêng tư</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <Link
                                href={project.githubUrl}
                                target="_blank"
                                className="flex-1"
                            >
                                <button className="w-full rounded-xl bg-gray-900 text-white px-4 py-2.5 text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-medium group/github">
                                    <Github className="h-4 w-4 group-hover/github:scale-110 transition-transform" />
                                    Mã nguồn
                                </button>
                            </Link>
                        )
                    ) : (
                        <button
                            disabled
                            className="flex-1 rounded-xl bg-gray-100 text-gray-500 px-4 py-2.5 text-sm flex items-center justify-center gap-2 font-medium cursor-not-allowed"
                        >
                            <Lock className="h-4 w-4" />
                            Không có mã nguồn
                        </button>
                    )}

                    {project.liveUrl ? (
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            className="flex-1"
                        >
                            <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-500 px-4 py-2.5 text-sm flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-600 transition-all font-medium group/demo shadow-sm hover:shadow-md">
                                <ExternalLink className="h-4 w-4 group-hover/demo:scale-110 transition-transform" />
                                Xem thử
                            </button>
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="flex-1 rounded-xl bg-gray-100 text-gray-500 px-4 py-2.5 text-sm flex items-center justify-center gap-2 font-medium cursor-not-allowed"
                        >
                            <Lock className="h-4 w-4" />
                            Không có demo
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}