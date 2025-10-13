'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

interface RecentWorkModernProps {
  projects: Project[]
}

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Delay giữa các items
      delayChildren: 0.3     // Delay trước khi bắt đầu
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing cho smooth animation
    }
  }
}

const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

export function RecentWorkModern({ projects }: RecentWorkModernProps) {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-pink-50/30 to-white dark:from-[#0F141C] dark:to-[#161E2A]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 text-sm font-semibold text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-slate-800/50 rounded-full mb-6"
          >
            Dự Án Gần Đây
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white font-['Eczar']"
          >
            Những Công Việc
            <span className="block bg-gradient-to-r from-pink-600 to-purple-500 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
              Nổi Bật
            </span>
          </motion.h2>
        </motion.div>

        {/* Projects Grid với Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Project Card Component
function ProjectCard({ 
  project, 
  index, 
  variants 
}: { 
  project: Project
  index: number
  variants: any 
}) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      variants={variants}
      className="group relative"
    >
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isEven ? '' : 'lg:grid-flow-col-dense'
      }`}>
        
        {/* Image Section */}
        <motion.div
          className={`relative ${isEven ? '' : 'lg:col-start-2'}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-slate-800 dark:to-slate-700">
            <motion.div
              variants={imageVariants}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </motion.div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <Github size={18} />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-1'}`}>
          {project.featured && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-3 py-1 text-xs font-semibold text-pink-700 dark:text-pink-400 bg-pink-100 dark:bg-orange-950/30 rounded-full"
            >
              Nổi Bật
            </motion.span>
          )}

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white font-['Eczar']"
          >
            {project.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-['Work_Sans']"
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.6 + tagIndex * 0.05 
                }}
                className="px-3 py-1 text-sm bg-pink-100 dark:bg-slate-700/50 text-pink-700 dark:text-pink-400 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Button với Enhanced Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href={`/projects/${project.id}`}>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Xem Chi Tiết
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight size={18} />
                  </motion.div>
                </span>
                
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
