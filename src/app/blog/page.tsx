"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { SectionHeading } from "@/components/ui/section-heading"

export default function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            title: "The Importance of User-Centered Design",
            excerpt:
                "Discover why putting users at the center of your design process leads to better products and happier customers.",
            date: "May 5, 2023",
            category: "Design Thinking",
            image: "/placeholder.svg?height=300&width=600",
        },
        {
            id: 2,
            title: "Color Psychology in UI Design",
            excerpt: "Learn how different colors affect user perception and how to use color effectively in your designs.",
            date: "April 18, 2023",
            category: "UI Design",
            image: "/placeholder.svg?height=300&width=600",
        },
        {
            id: 3,
            title: "Designing for Accessibility",
            excerpt: "Explore best practices for creating designs that are accessible to users with different abilities.",
            date: "March 22, 2023",
            category: "Accessibility",
            image: "/placeholder.svg?height=300&width=600",
        },
        {
            id: 4,
            title: "The Art of Prototyping",
            excerpt: "Discover different prototyping methods and when to use each one in your design process.",
            date: "February 10, 2023",
            category: "Prototyping",
            image: "/placeholder.svg?height=300&width=600",
        },
        {
            id: 5,
            title: "From Sketch to Final Design",
            excerpt: "Follow my process from initial sketches to polished final designs with this step-by-step guide.",
            date: "January 28, 2023",
            category: "Design Process",
            image: "/placeholder.svg?height=300&width=600",
        },
        {
            id: 6,
            title: "Collaboration Between Designers and Developers",
            excerpt: "Tips for effective communication and collaboration between design and development teams.",
            date: "December 15, 2022",
            category: "Teamwork",
            image: "/placeholder.svg?height=300&width=600",
        },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <SectionHeading
                    title="Blog"
                    subtitle="Thoughts, insights, and perspectives on design, creativity, and problem-solving."
                    centered
                />

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {blogPosts.map((post, index) => (
                        <AnimatedCard
                            key={post.id}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            delay={index}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                                </motion.div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-amber-100 text-amber-800 px-3 py-1 text-xs rounded-full">{post.category}</span>
                                    <span className="text-gray-500 text-sm">{post.date}</span>
                                </div>
                                <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
                                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="text-amber-800 font-medium hover:underline inline-flex items-center group"
                                >
                                    Read More
                                    <motion.span className="inline-block ml-1" initial={{ x: 0 }} whileHover={{ x: 5 }}>
                                        →
                                    </motion.span>
                                </Link>
                            </div>
                        </AnimatedCard>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-12 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <nav className="flex items-center gap-2">
                        <motion.button
                            className="w-10 h-10 rounded-full border border-amber-800 flex items-center justify-center text-amber-800 hover:bg-amber-800 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            1
                        </motion.button>
                        <motion.button
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-amber-800 hover:text-white hover:border-amber-800 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            2
                        </motion.button>
                        <motion.button
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-amber-800 hover:text-white hover:border-amber-800 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            3
                        </motion.button>
                        <span className="mx-2 text-gray-500">...</span>
                        <motion.button
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-amber-800 hover:text-white hover:border-amber-800 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Next
                        </motion.button>
                    </nav>
                </motion.div>
            </div>
        </main>
    )
}
