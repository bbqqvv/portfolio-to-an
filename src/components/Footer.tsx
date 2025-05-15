'use client'

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Dribbble, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer
            id="contact"
            className="bg-[#ffeed9] dark:bg-[#372112] px-6 md:px-12 lg:px-20 flex items-center justify-center p-25 dark:text-[#fefae0] "
            style={{ backgroundColor: "var(--background-2)" }}
        >
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-center md:text-left">
                {/* Left: Text + Button */}
                <div className="flex flex-col items-center md:items-start">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-6 max-w-xl leading-snug"
                        style={{ fontFamily: 'Eczar, serif' }}
                    >
                        Hãy cùng nhau làm việc và biến mọi thứ trở nên thật đáng yêu và hữu ích.
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 border-2 rounded-lg md:rounded-xl text-sm sm:text-base transition"
                        style={{
                            color: 'var(--btn-text)',
                            borderColor: 'var(--btn-border)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = 'var(--btn-hover-bg)';
                            e.currentTarget.style.color = 'var(--btn-hover-text)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--btn-text)';
                        }}
                    >
                        Liên hệ với tôi
                    </motion.button>
                </div>

                {/* Right: Social Icons */}
                {/* Right: Social Icons */}
                <div className="flex space-x-5 justify-center mt-auto">
                    {[Dribbble, Instagram, Linkedin].map((Icon, index) => (
                        <a
                            href="#"
                            key={index}
                            aria-label="Social link"
                            className="p-2 rounded-full border transition-all"
                            style={{
                                borderColor: 'var(--btn-border)',
                                color: 'var(--btn-text)', // để link có màu mặc định
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = 'var(--btn-hover-bg)';
                                e.currentTarget.style.color = 'var(--btn-hover-text)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--btn-text)';
                            }}
                        >
                            <Icon className="w-5 h-5" style={{ color: 'inherit' }} />
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    )
}
