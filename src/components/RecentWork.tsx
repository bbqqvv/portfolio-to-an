'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const RecentWork = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hiệu ứng tiêu đề
            gsap.fromTo(
                '.section-title',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                    },
                }
            );

            // Parallax nền mờ
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    y: '10%',
                    opacity: 0.5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.4,
                    },
                });
            }

            // Card hiệu ứng mượt khi cuộn vào
            const items = gsap.utils.toArray<HTMLElement>('.project-item');

            items.forEach((item, index) => {
                const fromX = index % 2 === 0 ? -60 : 60;

                gsap.fromTo(
                    item,
                    { x: fromX, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const projects = [
        {
            title: 'Ứng Dụng Sheepify',
            description:
                'Thiết kế giao diện trạng thái cho ứng dụng Sheepify với phong cách kawaii và các hiệu ứng tương tác nhỏ giúp tăng 32% mức độ tương tác của người dùng.',
            image: '/images/an1.png',
        },
        {
            title: 'Dashboard HoneyBunny',
            description:
                'Bảng điều khiển quản lý dự án với màu sắc tươi sáng, hỗ trợ chế độ tối và hiển thị dữ liệu trực quan giúp tăng hiệu suất công việc.',
            image: '/images/projects/dep.png',
        },
        {
            title: 'Memrise Redesign',
            description:
                'Tái thiết kế ứng dụng học ngôn ngữ với các yếu tố kawaii và tính năng gamification giúp tăng 27% người dùng hoạt động hàng ngày.',
            image: '/images/an2.png',
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 relative overflow-hidden"
            id="projects"
            style={{
                backgroundColor: 'var(--background-1)',
                color: 'var(--foreground)',
            }}
        >
            {/* Nền hiệu ứng mờ parallax */}
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none will-change-transform"
                ref={bgRef}
            >
                <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-orange-200 blur-[100px]" />
                <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-indigo-200 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
                {/* Tiêu đề section */}
                <div
                    className="mb-14 md:mb-20 section-title text-center md:text-left"
                    style={{ fontFamily: 'Eczar, sans-serif' }}
                >
                    <span className="inline-block px-4 text-3xl md:text-5xl font-bold">
                        Công Việc Gần Đây
                    </span>
                </div>

                {/* Danh sách dự án */}
                <div className="grid gap-12 md:gap-16">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-item opacity-0 transform rounded-xl md:rounded-2xl overflow-hidden group transition-all"
                            style={{ backgroundColor: 'var(--card-bg)' }}
                        >
                            <div className="md:flex flex-col md:flex-row h-full p-4 sm:p-6 md:p-10">
                                {/* Text */}
                                <div
                                    className={`p-4 sm:p-6 md:p-8 lg:p-10 md:w-1/2 flex flex-col ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                        }`}
                                >
                                    <h3
                                        className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4"
                                        style={{ fontFamily: 'Work Sans, sans-serif' }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p
                                        className="text-sm sm:text-base mb-4 md:mb-8 leading-relaxed"
                                        style={{
                                            fontFamily: 'Work Sans, sans-serif',
                                            color: 'var(--text-card)',
                                        }}
                                    >
                                        {project.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            href="/blog/1"
                                            className="text-sm md:text-base font-medium transition-transform duration-300 ease-out group-hover:translate-x-1 inline-block"
                                            style={{ color: 'var(--accent)' }}
                                        >
                                            Xem chi tiết →
                                        </Link>
                                    </div>
                                </div>

                                {/* Hình ảnh */}
                                <div
                                    className={`relative md:w-1/2 h-48 sm:h-64 md:h-auto ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                                        } rounded-lg md:rounded-xl overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-white bg-opacity-60 dark:bg-opacity-40 pointer-events-none rounded-lg md:rounded-xl" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 rounded-lg md:rounded-xl will-change-transform"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentWork;
