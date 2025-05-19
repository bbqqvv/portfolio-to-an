'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { motion, useAnimation, useCycle } from 'framer-motion'

export default function Custom404() {
    const containerControls = useAnimation()
    const imageControls = useAnimation()

    useEffect(() => {
        // Animate container fade in + slide up
        containerControls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        })

        // Start floating animation loop for image
        imageControls.start({
            y: [-10, 0, -10],
            transition: {
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
            },
        })
    }, [containerControls, imageControls])

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={containerControls}
                className="max-w-lg w-full space-y-6 text-center"
            >
                {/* Illustration */}
                <motion.div animate={imageControls}>
                    <Image
                        src="/images/404.png"
                        alt="404 Illustration"
                        width={300}
                        height={100}
                        className="mx-auto"
                        priority
                    />
                </motion.div>

                {/* Text content */}
                <div>
                    <h1 className="text-5xl font-semibold">404</h1>
                    <h2 className="text-2xl font-medium mt-2">Trang không tìm thấy</h2>
                    <p className="mt-2">
                        Xin lỗi, mình không thể tìm thấy trang bạn đang cố truy cập.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-black text-white rounded-xl hover:scale-[1.03] transition-transform duration-200"
                    >
                        Về trang chủ
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 border border-gray-400 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                        Hỗ trợ kỹ thuật
                    </Link>
                </div>
            </motion.div>
        </main>
    )
}
