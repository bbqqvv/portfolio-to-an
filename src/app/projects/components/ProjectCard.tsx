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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            {/* Ảnh đại diện dự án */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <Image
                    src={imageError ? "/placeholder-project.jpg" : project.image || "/placeholder-project.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 right-3">
                    <Badge className="bg-gray-900/80 text-white px-3 py-1 text-xs font-medium">
                        {project.category === "backend" && "Backend"}
                        {project.category === "frontend" && "Frontend"}
                        {project.category === "module" && "Module"}
                        {project.category === "tool" && "Công cụ"}
                    </Badge>
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                        {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed text-sm">
                        {project.description}
                    </p>
                </div>

                {/* Công nghệ */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full cursor-help font-semibold border border-gray-200 dark:border-slate-600">
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
                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    {project.githubUrl ? (
                        project.showGithub === false ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            disabled
                                            className="flex-1 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 px-4 py-2.5 text-sm flex items-center justify-center gap-2 font-medium"
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
                                <button className="w-full rounded bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                                    <Github className="h-4 w-4" />
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
                            <button className="w-full rounded bg-blue-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                                <ExternalLink className="h-4 w-4" />
                                Xem thử
                            </button>
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="flex-1 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 px-4 py-2.5 text-sm flex items-center justify-center gap-2 font-medium cursor-not-allowed"
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