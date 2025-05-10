'use client'

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutMeComponent() {
    return (
        <div id="about"
            className="flex items-center justify-center bg-[#FBE8D3] p-6 sm:p-8 md:p-10">

            {/* Phần Text */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-transparent w-full max-w-xl p-2 rounded-lg"
            >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Eczar, sans-serif' }}>
                    Một chút về tôi
                </h2>
                <div style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    <p className="text-lg sm:text-xl mb-4">
                        Tôi là Tố An, hiện đang là sinh viên tại Việt Nam. Tôi đang theo học chuyên ngành thiết kế giao diện người dùng và phát triển web.
                    </p>
                    <p className="text-lg sm:text-xl mb-4">
                        Tôi yêu thích việc sáng tạo và phát triển các sản phẩm web, đặc biệt là thiết kế giao diện người dùng và tối ưu hóa trải nghiệm người dùng. Mặc dù tôi còn là sinh viên, nhưng tôi đã thực hiện nhiều dự án cá nhân và tham gia các khóa học thiết kế.
                    </p>
                    <p className="text-lg sm:text-xl mb-4">
                        Ngoài công việc học tập và thiết kế, tôi còn thích đọc sách, viết lách và khám phá những sở thích mới.
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-3 rounded-xl text-black border-[#4d5566] hover:bg-black hover:text-white transition"
                >
                    Liên hệ với tôi
                </motion.button>
            </motion.div>

            {/* Phần Ảnh Đại Diện */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full sm:w-80 h-[450px] md:w-[400px] md:h-[600px] lg:w-[700px] lg:h-[650px]"
            >
                <Image
                    src="/images/image-Photoroom.png"
                    alt="Profile"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                />
            </motion.div>
        </div>
    )
}
