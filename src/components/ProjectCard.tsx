'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, Calendar, ArrowUpRight, Star } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useState } from 'react'

interface ProjectCardProps {
    project: Project
    index: number
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    
    // Format date to readable format
    const formattedDate = new Date(project.date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
    })

    // Category config with colors
    const categoryConfig = {
        backend: { label: 'Backend', icon: '⚙️', color: '#667eea' },
        frontend: { label: 'Frontend', icon: '🎨', color: '#f093fb' },
        module: { label: 'Module', icon: '📦', color: '#4facfe' },
        tool: { label: 'Tool', icon: '🛠️', color: '#43e97b' },
    }

    const categoryInfo = categoryConfig[project.category]

    return (
        <motion.article
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: [0.215, 0.61, 0.355, 1],
                    },
                },
            }}
            className="group h-full"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.div
                className="relative h-full flex flex-col rounded-3xl overflow-hidden border-2 backdrop-blur-sm"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border-light)',
                }}
                whileHover={{
                    y: -12,
                    borderColor: 'var(--accent)',
                }}
                transition={{ 
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1]
                }}
            >
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${categoryInfo.color}, transparent 70%)`,
                    }}
                />

                {/* Thumbnail Image with overlay */}
                <div className="relative w-full aspect-video overflow-hidden">
                    <Link href={`/projects/${project.slug}`}>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index < 3}
                        />
                    </Link>
                    
                    {/* Gradient overlay - always visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Category Badge - Floating top-left */}
                    <motion.div 
                        className="absolute top-4 left-4 z-10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div
                            className="px-4 py-2 rounded-full text-xs font-bold backdrop-blur-xl shadow-2xl font-[Work_Sans] flex items-center gap-2 border border-white/20"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                color: '#ffffff',
                            }}
                        >
                            <span>{categoryInfo.icon}</span>
                            {categoryInfo.label}
                        </div>
                    </motion.div>

                    {/* Quick view button - appears on hover */}
                    <motion.div
                        className="absolute top-4 right-4 z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href={`/projects/${project.slug}`}>
                            <motion.div
                                className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center border border-white/20 cursor-pointer"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowUpRight className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Date badge - bottom left */}
                    <div className="absolute bottom-4 left-4 z-10">
                        <div
                            className="px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-xl font-[Work_Sans] flex items-center gap-1.5 border border-white/10"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#ffffff',
                            }}
                        >
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                        </div>
                    </div>
                </div>

                {/* Content Section with better spacing */}
                <div className="relative p-6 flex flex-col flex-1">
                    {/* Title */}
                    <Link href={`/projects/${project.slug}`}>
                        <motion.h3
                            className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 font-[Eczar] group-hover:translate-x-1 transition-transform duration-300"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {project.title}
                        </motion.h3>
                    </Link>

                    {/* Description with better line height */}
                    <p
                        className="text-sm leading-relaxed mb-4 line-clamp-2 font-[Work_Sans]"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {project.description}
                    </p>

                    {/* Technologies - Scrollable horizontal */}
                    <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-2">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                            <motion.span
                                key={i}
                                className="px-3 py-1.5 rounded-full text-xs font-medium font-[Work_Sans] whitespace-nowrap flex-shrink-0"
                                style={{
                                    backgroundColor: 'var(--background-2)',
                                    color: 'var(--text)',
                                    border: '1px solid var(--border-light)',
                                }}
                                whileHover={{ 
                                    scale: 1.05,
                                    borderColor: 'var(--accent)',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                        {project.technologies.length > 5 && (
                            <span
                                className="px-3 py-1.5 rounded-full text-xs font-bold font-[Work_Sans] whitespace-nowrap flex-shrink-0"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--accent-foreground)',
                                }}
                            >
                                +{project.technologies.length - 5}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons - Enhanced with better UX */}
                    <div className="flex gap-2 mt-auto">
                        {/* Live Demo Button - Primary */}
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 group/btn relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm font-[Work_Sans]"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                color: 'var(--accent-foreground)',
                            }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                            />
                            <ExternalLink className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">View Live</span>
                        </motion.a>

                        {/* GitHub Button - Secondary */}
                        {project.showGithub !== false && (
                            <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border-2 font-[Work_Sans] relative overflow-hidden"
                                style={{
                                    borderColor: 'var(--border-light)',
                                    color: 'var(--foreground)',
                                    backgroundColor: 'transparent',
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    y: -2,
                                    borderColor: 'var(--accent)',
                                    backgroundColor: 'var(--background-2)',
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-4 h-4" />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Shine effect on hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{
                        x: isHovered ? '100%' : '-100%',
                        opacity: isHovered ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                />
            </motion.div>
        </motion.article>
    )
}

