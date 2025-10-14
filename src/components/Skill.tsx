'use client'

import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { skills } from '@/data/skill'

export default function SkillComponent() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })
    const reduceMotion = useReducedMotion()

    const nextSkill = () => setCurrentIndex((currentIndex + 1) % skills.length)
    const prevSkill = () => setCurrentIndex((currentIndex - 1 + skills.length) % skills.length)

    const fadeInFromBottom = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }

    const transition = {
        duration: 0.7,
        ease: 'easeOut',
    }

    return (
        <div
            id="skill"
            ref={containerRef}
            className="flex flex-col items-center w-full p-4 sm:p-6 md:p-8 
  bg-gradient-to-b from-pink-50 via-purple-50/30 to-white text-black
  dark:from-[#0F141C] dark:via-[#1a1f2e] dark:to-[#0F141C] dark:text-white"


        >
            <motion.div
                className="w-full max-w-4xl mx-auto"
                style={{ willChange: 'opacity, transform' }}
                variants={fadeInFromBottom}
                initial="hidden"
                animate={reduceMotion ? 'visible' : isInView ? 'visible' : 'hidden'}
                transition={transition}
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center  dark:text-white font-[Eczar]" >
                    Kỹ năng của tôi
                </h2>
                <p className="mb-6 md:mb-8 text-center max-w-2xl mx-auto font-[Work_Sans] text-base sm:text-lg md:text-xl dark:text-white">
                    Một cái nhìn về những kỹ năng mà tôi sở hữu và ứng dụng trong công việc.
                </p>

                <div className="flex items-center w-full relative">
                    <button
                        onClick={prevSkill}
                        className="hidden sm:block p-2 hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Kỹ năng trước"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex gap-6 w-full relative min-h-[160px] sm:min-h-[180px] ">
                        {/* Trái: nội dung hiện tại */}
                        <motion.div
                            key={currentIndex}
                            className="w-full sm:w-1/2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="mb-3 font-[Work_Sans] text-base sm:text-lg  dark:text-white" >
                                {skills[currentIndex].text}
                            </p>
                            <p className="font-semibold font-[Work_Sans]  dark:text-white" >
                                {skills[currentIndex].author}
                            </p>
                        </motion.div>

                        {/* Phải: nội dung kế tiếp */}
                        <motion.div
                            key={`next-${currentIndex}`}
                            className="hidden sm:block w-1/2"
                            style={{ opacity: 0.6 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 0.6, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="mb-3 font-[Work_Sans] text-base sm:text-lg  dark:text-white" >
                                {skills[(currentIndex + 1) % skills.length].text}
                            </p>
                            <p className="font-semibold font-[Work_Sans]  dark:text-white">
                                {skills[(currentIndex + 1) % skills.length].author}
                            </p>
                        </motion.div>
                    </div>

                    <button
                        onClick={nextSkill}
                        className="hidden sm:block p-2 hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Kỹ năng tiếp theo"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Mobile controls */}
                <div className="flex sm:hidden justify-center gap-6 mt-6">
                    <button
                        onClick={prevSkill}
                        className="p-2 hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Kỹ năng trước"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSkill}
                        className="p-2 hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Kỹ năng tiếp theo"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Pagination dots */}
                <div className="sm:hidden mt-4 flex gap-2 justify-center">
                    {skills.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className="w-2 h-2 rounded-full transition-all"
                            style={{
                                backgroundColor:
                                    currentIndex === index
                                        ? 'var(--accent)'
                                        : 'var(--text-muted)',
                            }}
                            aria-label={`Đến kỹ năng ${index + 1}`}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
