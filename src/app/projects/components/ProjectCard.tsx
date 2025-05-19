"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";

type ProjectType = {
    title: string;
    description: string;
    link: string;
    github?: string;
    tags: string[];
    image: string;
    featured?: boolean;
};

const ProjectCard = React.forwardRef<HTMLDivElement, { project: ProjectType; className?: string }>(
    ({ project, className }, ref) => {
        return (
            <div
                ref={ref}
                className={`${className ?? ""} group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-500`}
            >
                {project.featured && (
                    <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        Featured
                    </div>
                )}

                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-[#3a3a3a]/90 text-black dark:text-[#fefae0] shadow-sm border border-gray-100 dark:border-gray-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                    <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-bold text-black dark:text-[#fefae0] group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                            {project.title}
                        </h2>
                        <div className="flex gap-2">
                            <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-[#fefae0] hover:bg-black dark:hover:bg-[#fefae0] hover:text-white dark:hover:text-black transition-colors"
                                aria-label={`View ${project.title} live demo`}
                            >
                                <FiExternalLink className="h-4 w-4" />
                            </Link>
                            {project.github && (
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-[#fefae0] hover:bg-black dark:hover:bg-[#fefae0] hover:text-white dark:hover:text-black transition-colors"
                                    aria-label={`View ${project.title} source code`}
                                >
                                    <FiGithub className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 line-clamp-3">{project.description}</p>
                </div>
            </div>
        );
    }
);

ProjectCard.displayName = "ProjectCard";

export type { ProjectType };
export default ProjectCard;
