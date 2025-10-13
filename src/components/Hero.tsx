'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    const fullText = 'Xin chào, mình là';
    const [typedText, setTypedText] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Disable typing effect on mobile
    useEffect(() => {

        let index = 0;
        let isDeleting = false;
        let timeout: NodeJS.Timeout;

        const type = () => {
            if (!isDeleting) {
                if (index < fullText.length) {
                    setTypedText(fullText.slice(0, index + 1));
                    index++;
                    timeout = setTimeout(type, 80);
                } else {
                    isDeleting = true;
                    timeout = setTimeout(type, 1000);
                }
            } else {
                if (index > 0) {
                    setTypedText(fullText.slice(0, index - 1));
                    index--;
                    timeout = setTimeout(type, 40);
                } else {
                    isDeleting = false;
                    timeout = setTimeout(type, 80);
                }
            }
        };

        type();
        return () => clearTimeout(timeout);
    }, [isMobile]);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const fadeVariant = (axis: 'x' | 'y', dir: number) => ({
        hidden: { opacity: 0, [axis]: dir * 40 },
        visible: { opacity: 1, [axis]: 0 },
    });

    return (
        <>
            <div
                id="home"
                className="py-12 sm:py-16 md:py-20 lg:py-1"
                style={{ backgroundColor: 'var(--background-1)' }}
            >
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                    {/* Text Section */}
                    <div className="w-full text-center md:text-left">
                        <motion.div
                            variants={fadeVariant('y', 1)}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6 }}
                            className="text-sm font-mono mb-4 min-h-[1.5rem]"
                            style={{ color: 'var(--foreground)' }}
                        >
                            <span>{typedText}</span>
                            {!isMobile && (
                                <span 
                                    className="inline-block w-[1px] animate-blink ml-1" 
                                    style={{ backgroundColor: 'var(--accent)', height: '1rem' }}
                                />
                            )}
                        </motion.div>

                        <motion.h1
                            variants={fadeVariant('x', -1)}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-[Eczar]"
                        >
                            <span 
                                className="bg-gradient-to-r bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: 'linear-gradient(to right, var(--accent), var(--accent-secondary), var(--accent))'
                                }}
                            >
                                Lưu Thị Tố An
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeVariant('y', 1)}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base sm:text-lg leading-relaxed mb-8 font-semibold font-[Work_Sans]"
                            style={{ color: 'var(--text)' }}
                        >
                            🌟 Chào bạn! Mình là Tố An – đam mê sáng tạo và luôn tìm cách cải thiện trải nghiệm người dùng. Mình tin rằng thiết kế không chỉ phải đẹp mà còn phải dễ sử dụng. Cùng khám phá những điều mới mẻ nhé!
                        </motion.p>

                        <motion.div
                            variants={fadeVariant('y', 1)}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row sm:gap-4 gap-3 w-full items-center md:items-start"
                        >
                            <Link
                                href="/work"
                                className="w-full sm:w-auto group inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 font-[Work_Sans]"
                                style={{
                                    background: 'linear-gradient(to right, var(--accent), var(--accent-secondary))',
                                    color: 'var(--accent-foreground)',
                                    boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.3)'
                                }}
                            >
                                <span className="relative z-10">Xem CV</span>
                                <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
                            </Link>

                            <button
                                onClick={() => scrollToSection('about')}
                                className="w-full sm:w-auto group inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 text-base font-semibold transition-all duration-300 font-[Work_Sans]"
                                style={{
                                    borderColor: 'var(--btn-border)',
                                    color: 'var(--btn-border)',
                                    backgroundColor: 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--btn-hover-bg)';
                                    e.currentTarget.style.color = 'var(--btn-hover-text)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--btn-border)';
                                }}
                            >
                                <span>Về tôi</span>
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Avatar Section */}
                    <motion.div
                        variants={fadeVariant('x', 1)}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full md:w-auto flex justify-center"
                    >
                        <div className="relative w-44 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-[30rem] lg:h-[40rem]">
                            <Image
                                src="/images/toan.png"
                                alt="Tố An"
                                layout="fill"
                                objectFit="cover"
                                loading={isMobile ? 'lazy' : 'eager'}
                                priority={!isMobile}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1 }
                    50% { opacity: 0 }
                }
                .animate-blink {
                    animation: blink 1s step-start infinite;
                    height: 1rem;
                }
            `}</style>
        </>
    );
}
