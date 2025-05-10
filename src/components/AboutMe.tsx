'use client'

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutMeComponent() {
    return (
        <div id="about"
            className="flex flex-col lg:flex-row items-center justify-center bg-[#FBE8D3] p-4 sm:p-6 md:p-8 lg:p-1 gap-6 md:gap-8 lg:gap-12">

            {/* Phần Text - Hiển thị trước trên mobile */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-transparent w-full lg:max-w-160 p-2 rounded-lg order-2 lg:order-1 dark:text-black"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Eczar, sans-serif' }}>
                    Một chút về tôi
                </h2>
                <div style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                        Tôi là Tố An, hiện đang là sinh viên tại Việt Nam. Tôi đang theo học chuyên ngành thiết kế giao diện người dùng và phát triển web.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                        Tôi yêu thích việc sáng tạo và phát triển các sản phẩm web, đặc biệt là thiết kế giao diện người dùng và tối ưu hóa trải nghiệm người dùng. Mặc dù tôi còn là sinh viên, nhưng tôi đã thực hiện nhiều dự án cá nhân và tham gia các khóa học thiết kế.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                        Ngoài công việc học tập và thiết kế, tôi còn thích đọc sách, viết lách và khám phá những sở thích mới.
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 border-2 md:border-3 rounded-lg md:rounded-xl text-sm sm:text-base text-black border-[#4d5566] hover:bg-black hover:text-white transition"
                >
                    Liên hệ với tôi
                </motion.button>
            </motion.div>

            {/* Phần Ảnh Đại Diện - Hiển thị sau trên mobile */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative w-full xs:w-4/5 sm:w-2/3 md:w-1/2 lg:w-[400px] xl:w-[500px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] order-1 lg:order-2"
            >
                <Image
                    src="/images/image-Photoroom.png"
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 500px"
                    className="rounded-lg object-contain"
                    priority
                />
            </motion.div>
        </div>
    )
}