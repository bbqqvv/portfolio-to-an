"use client"

import { motion } from "framer-motion"
import { Share2, Twitter, Facebook, Linkedin, Link2, Heart } from "lucide-react"
import { useState } from "react"

interface ArticleFooterProps {
    title?: string
    url: string
}

export default function ArticleFooter({ title, url }: ArticleFooterProps) {
    const [copied, setCopied] = useState(false)

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const shareButtons = [
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(url)}`,
            color: '#1DA1F2',
            bgColor: 'rgba(29, 161, 242, 0.1)'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: '#4267B2',
            bgColor: 'rgba(66, 103, 178, 0.1)'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: '#0077B5',
            bgColor: 'rgba(0, 119, 181, 0.1)'
        }
    ]

    return (
        <footer className="mt-16">
            {/* Divider with decoration */}
            <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-light)' }} />
                <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                />
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-light)' }} />
            </div>

            {/* Thank you message with emoji */}
            <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Heart className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    <h3 className="text-2xl font-bold font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                        Cảm ơn bạn đã đọc!
                    </h3>
                </div>
                <p className="text-sm font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                    Nếu bài viết hữu ích, hãy chia sẻ để nhiều người biết đến nhé!
                </p>
            </motion.div>

            {/* Share buttons */}
            <motion.div 
                className="flex flex-wrap items-center justify-center gap-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {shareButtons.map((button, index) => (
                    <motion.a
                        key={button.name}
                        href={button.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm font-[Work_Sans] border transition-all duration-300 hover:shadow-lg"
                        style={{
                            backgroundColor: button.bgColor,
                            borderColor: button.color,
                            color: button.color
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                        <button.icon className="w-4 h-4" />
                        {button.name}
                    </motion.a>
                ))}
                
                {/* Copy link button */}
                <motion.button
                    onClick={handleCopyLink}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm font-[Work_Sans] border transition-all duration-300 hover:shadow-lg"
                    style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--border-light)',
                        color: 'var(--text)'
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <Link2 className="w-4 h-4" />
                    {copied ? 'Đã sao chép!' : 'Sao chép link'}
                </motion.button>
            </motion.div>

            {/* Call to action */}
            <motion.div 
                className="rounded-2xl p-6 md:p-8 text-center border"
                style={{
                    background: 'linear-gradient(135deg, var(--accent-bg) 0%, var(--card-bg) 100%)',
                    borderColor: 'var(--border-light)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h4 className="text-xl font-bold mb-3 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                    📨 Muốn nhận thêm nội dung hay?
                </h4>
                <p className="text-sm mb-5 font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                    Theo dõi blog để không bỏ lỡ những bài viết mới về thiết kế, lập trình và công nghệ!
                </p>
                <motion.a
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm font-[Work_Sans] shadow-lg transition-all duration-300"
                    style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)'
                    }}
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Xem thêm bài viết
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </motion.a>
            </motion.div>
        </footer>
    )
}
