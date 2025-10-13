'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { works } from '@/data/works';
import Link from 'next/link';

const fadeInUp = (isMobile: boolean) => ({
    hidden: { opacity: 0, y: isMobile ? 20 : 40 },
    visible: { opacity: 1, y: 0 },
});

const fadeSide = (direction: 'left' | 'right', isMobile: boolean) => ({
    hidden: { opacity: 0, x: direction === 'left' ? (isMobile ? -20 : -60) : (isMobile ? 20 : 60) },
    visible: { opacity: 1, x: 0 },
});

const RecentWork = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });
    const reduceMotion = useReducedMotion();

    // Simple mobile detection (you can improve or use a hook/library)
    const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 relative overflow-hidden"
            style={{ backgroundColor: 'var(--background-2)' }}
            id="projects"
        >
            {/* Decorative background blur elements */}
            {!isMobile && !reduceMotion && (
                <div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
                    aria-hidden="true"
                >
                    <motion.div
                        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[120px]"
                        style={{ backgroundColor: 'var(--accent)' }}
                        initial={{ y: 0, opacity: 0.4 }}
                        animate={{ y: '10%', opacity: 0.3 }}
                        transition={{ duration: 4, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full blur-[120px]"
                        style={{ backgroundColor: 'var(--accent-secondary)' }}
                        initial={{ y: 0, opacity: 0.4 }}
                        animate={{ y: '-10%', opacity: 0.3 }}
                        transition={{ duration: 4, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
                    />
                </div>
            )}

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
                <motion.div
                    className="mb-14 md:mb-20 section-title text-center md:text-left font-[Eczar]"
                    variants={fadeInUp(isMobile)}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ duration: isMobile ? 0.5 : 0.8 }}
                >
                    <span 
                        className="inline-block px-4 text-3xl md:text-5xl font-bold"
                        style={{ color: 'var(--foreground)' }}
                    >
                        Công Việc Gần Đây
                    </span>
                </motion.div>

                <div className="grid gap-12 md:gap-16">
                    {works.map((work, index) => {
                        const from = index % 2 === 0 ? 'left' : 'right';

                        return (
                            <motion.div
                                key={index}
                                className="project-item rounded-xl md:rounded-2xl overflow-hidden group backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    borderColor: 'var(--border-light)',
                                    borderWidth: '1px'
                                }}
                                variants={fadeSide(from, isMobile)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: isMobile ? 0.6 : 1, ease: 'easeOut' }}
                            >
                                <div className="md:flex flex-col md:flex-row h-full p-4 sm:p-6 md:p-10">
                                    {/* Text */}
                                    <div
                                        className={`p-4 sm:p-6 md:p-8 lg:p-10 md:w-1/2 flex flex-col ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                            }`}
                                    >
                                        <h3
                                            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-[Work_Sans]"
                                            style={{ color: 'var(--foreground)' }}
                                        >
                                            {work.title}
                                        </h3>
                                        <p
                                            className="text-sm sm:text-base mb-4 md:mb-8 leading-relaxed font-[Work_Sans]"
                                            style={{ color: 'var(--text)' }}
                                        >
                                            {work.description}
                                        </p>
                                        <div className="mt-auto">
                                            <Link
                                                href={`/blog/${work.slug}`}
                                                className="text-sm md:text-base font-bold transition-all duration-300 ease-out group-hover:translate-x-2 inline-flex items-center gap-2 font-[Work_Sans]"
                                                style={{ color: 'var(--accent)' }}
                                            >
                                                Xem chi tiết →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div
                                        className={`relative md:w-1/2 h-48 sm:h-64 md:h-auto ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                                            } rounded-lg md:rounded-xl overflow-hidden`}
                                    >
                                        <Image
                                            src={work.image}
                                            alt={work.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 rounded-lg md:rounded-xl"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RecentWork;
