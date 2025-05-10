'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const RecentWork = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const opacityBg = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.5]);

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const projects = [
        {
            title: 'Ứng Dụng Sheepify',
            description:
                'Thiết kế giao diện trạng thái cho ứng dụng Sheepify với phong cách kawaii và các hiệu ứng tương tác nhỏ giúp tăng 32% mức độ tương tác của người dùng.',
            accentColor: 'bg-pink-100 text-pink-800',
            image: '/images/an1.png',
        },
        {
            title: 'Dashboard HoneyBunny',
            description:
                'Bảng điều khiển quản lý dự án với màu sắc tươi sáng, hỗ trợ chế độ tối và hiển thị dữ liệu trực quan giúp tăng hiệu suất công việc.',
            tags: ['Dashboard', 'Data Visualization', 'Dark Mode'],
            accentColor: 'bg-amber-100 text-amber-800',
            image: '/images/projects/dep.png',
        },
        {
            title: 'Memrise Redesign',
            description:
                'Tái thiết kế ứng dụng học ngôn ngữ với các yếu tố kawaii và tính năng gamification giúp tăng 27% người dùng hoạt động hàng ngày.',
            tags: ['Redesign UX', 'Gamification', 'Ứng dụng di động'],
            accentColor: 'bg-indigo-100 text-indigo-800',
            image: '/images/an2.png',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
                duration: 0.5,
            },
        },
    };

    const projectVariants = {
        offscreen: { y: 80, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                bounce: 0.2,
                duration: 0.8,
            },
        },
    };

    return (
        <motion.section
            ref={sectionRef}
            className="py-12 md:py-20 relative overflow-hidden"
            style={{ backgroundColor: '#ffe6cc' }}
            id="projects"
        >
            {/* Các yếu tố nền nhẹ nhàng */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            >
                <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-orange-200 blur-[100px]" />
                <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-indigo-200 blur-[100px]" />
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
                {/* Tiêu đề phần */}
                <motion.div
                    className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 md:gap-6"
                    initial="hidden"
                    style={{ fontFamily: 'Eczar, sans-serif' }}
                    animate={controls}
                    variants={containerVariants}
                >
                    {/* Trái: Nhãn phần */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-block px-4 text-2xl md:text-4xl py-1.5 font-bold rounded-full dark:text-black">
                            Công Việc Gần Đây
                        </span>
                    </motion.div>
                </motion.div>

                <div className="grid gap-8 md:gap-14">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl md:rounded-2xl overflow-hidden group transition-all duration-500"
                            style={{ backgroundColor: '#fff8f2' }}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={projectVariants}
                        >
                            <div className="md:flex flex-col md:flex-row h-full p-4 sm:p-6 md:p-10">
                                {/* Nội dung văn bản */}
                                <div
                                    className={`p-4 sm:p-6 md:p-8 lg:p-10 md:w-1/2 flex flex-col ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                        }`}
                                >
                                    <h3
                                        className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4"
                                        style={{ fontFamily: 'Work Sans, sans-serif' }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p
                                        className="text-sm sm:text-base text-gray-600 mb-4 md:mb-8 leading-relaxed"
                                        style={{ fontFamily: 'Work Sans, sans-serif' }}
                                    >
                                        {project.description}
                                    </p>

                                    {/* Các nút hành động */}
                                    <div className="flex gap-4 md:gap-6 mt-auto">
                                        <Link
                                            href="/project-detail"
                                            className="text-sm dark:text-black md:text-base transition-transform duration-300 ease-out group-hover:scale-105 inline-block"
                                        >
                                            <div className="relative">Xem chi tiết →</div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Hình ảnh với lớp phủ và hiệu ứng phóng to */}
                                <div
                                    className={`relative md:w-1/2 h-48 sm:h-64 md:h-auto ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                                        } rounded-lg md:rounded-xl overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-white bg-opacity-60 pointer-events-none rounded-lg md:rounded-xl" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 rounded-lg md:rounded-xl"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default RecentWork;