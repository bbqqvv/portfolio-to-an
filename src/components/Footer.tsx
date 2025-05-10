'use client'

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Dribbble, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer id="contact" className=" bg-[#ffeed9] px-6 md:px-12 lg:px-20 flex items-center justify-center p-25 dark:text-black">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-center md:text-left">

                {/* Left: Text + Button */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-xl leading-snug" style={{ fontFamily: 'Eczar, serif' }}>
                        Hãy cùng nhau làm việc và biến mọi thứ trở nên thật đáng yêu và hữu ích.
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 border-3 rounded-xl text-black border-[#4d5566] hover:bg-black hover:text-white transition"
                    >
                        Liên hệ với tôi
                    </motion.button>

                </div>

                {/* Right: Social Icons */}
                <div className="flex space-x-5 justify-center mt-auto">
                    {[Dribbble, Instagram, Linkedin].map((Icon, index) => (
                        <a href="#" key={index} className="p-2 rounded-full border border-black hover:bg-black hover:text-white transition-all">
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    )
}
