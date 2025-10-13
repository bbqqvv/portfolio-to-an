"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Mail, MapPin, Phone, Send, CheckCircle2, Sparkles } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        setTimeout(() => {
            console.log("Form submitted:", formData)
            setIsSubmitting(false)
            setIsSubmitted(true)
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })

            setTimeout(() => {
                setIsSubmitted(false)
            }, 5000)
        }, 1500)
    }

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email",
            content: "hello@shambhavi.design",
            link: "mailto:hello@shambhavi.design",
            linkText: "Gửi email cho tôi",
        },
        {
            icon: <Phone className="w-5 h-5" />,
            title: "Điện thoại",
            content: "+84 123 456 789",
            link: "tel:+84123456789",
            linkText: "Gọi cho tôi",
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Địa chỉ",
            content: "Hà Nội, Việt Nam",
            link: "",
            linkText: "Làm việc từ xa",
        },
    ]

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <main 
            ref={containerRef}
            className="min-h-screen py-16 md:py-24" 
            style={{ backgroundColor: 'var(--background-1)' }}
        >
            {/* Decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
                <motion.div 
                    className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--accent)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div 
                    className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--accent-secondary)' }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <div className="relative mx-auto container max-w-7xl px-4 md:px-8 lg:px-12">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-light)' }}>
                        <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Hãy kết nối với tôi</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                        Liên Hệ Với Tôi
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                        Có ý tưởng thú vị? Hãy cùng biến nó thành hiện thực. Tôi luôn sẵn sàng lắng nghe!
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                >
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border"
                            style={{ 
                                backgroundColor: 'var(--card-bg)',
                                borderColor: 'var(--border-light)'
                            }}
                        >
                            <motion.div 
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md"
                                style={{ 
                                    background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                    color: 'var(--accent-foreground)'
                                }}
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {info.icon}
                            </motion.div>
                            <h3 className="text-lg font-bold mb-2 font-[Work_Sans]" style={{ color: 'var(--foreground)' }}>
                                {info.title}
                            </h3>
                            <p className="mb-4 text-sm font-[Work_Sans]" style={{ color: 'var(--text)' }}>
                                {info.content}
                            </p>
                            {info.link ? (
                                <a
                                    href={info.link}
                                    className="text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all font-[Work_Sans]"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    {info.linkText}
                                    <span>→</span>
                                </a>
                            ) : (
                                <p className="text-sm font-medium font-[Work_Sans]" style={{ color: 'var(--accent)' }}>{info.linkText}</p>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Form Section */}
                <motion.div 
                    className="max-w-3xl mx-auto"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="p-8 md:p-10 rounded-3xl backdrop-blur-sm shadow-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-3 font-[Eczar]" style={{ color: 'var(--foreground)' }}>
                                Gửi tin nhắn cho tôi
                            </h2>
                            <p className="font-[Work_Sans]" style={{ color: 'var(--text-secondary)' }}>
                                Điền thông tin bên dưới và tôi sẽ phản hồi trong vòng 24 giờ.
                            </p>
                        </div>

                        {isSubmitted && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl mb-6 flex items-center gap-3 border"
                                style={{ 
                                    backgroundColor: 'var(--card-bg)',
                                    borderColor: 'var(--accent)',
                                    color: 'var(--foreground)'
                                }}
                            >
                                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                                <span className="text-sm font-medium font-[Work_Sans]">
                                    Cảm ơn bạn! Tin nhắn đã được gửi thành công.
                                </span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-2 font-[Work_Sans]" style={{ color: 'var(--foreground)' }}>
                                        Họ và tên *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none transition-all font-[Work_Sans]"
                                        style={{
                                            backgroundColor: 'var(--background-1)',
                                            borderColor: 'var(--border-light)',
                                            color: 'var(--foreground)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                                        placeholder="Nhập họ tên của bạn"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold mb-2 font-[Work_Sans]" style={{ color: 'var(--foreground)' }}>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none transition-all font-[Work_Sans]"
                                        style={{
                                            backgroundColor: 'var(--background-1)',
                                            borderColor: 'var(--border-light)',
                                            color: 'var(--foreground)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                                        placeholder="email@cuaban.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold mb-2 font-[Work_Sans]" style={{ color: 'var(--foreground)' }}>
                                    Chủ đề *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none transition-all font-[Work_Sans]"
                                    style={{
                                        backgroundColor: 'var(--background-1)',
                                        borderColor: 'var(--border-light)',
                                        color: 'var(--foreground)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                                >
                                    <option value="">Bạn muốn liên hệ về vấn đề gì?</option>
                                    <option value="Project Inquiry">💼 Tư vấn dự án</option>
                                    <option value="Collaboration">🤝 Hợp tác</option>
                                    <option value="Job Opportunity">💡 Cơ hội việc làm</option>
                                    <option value="General Question">❓ Câu hỏi chung</option>
                                    <option value="Other">📝 Khác</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold mb-2 font-[Work_Sans]" style={{ color: 'var(--foreground)' }}>
                                    Nội dung *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none transition-all resize-none font-[Work_Sans]"
                                    style={{
                                        backgroundColor: 'var(--background-1)',
                                        borderColor: 'var(--border-light)',
                                        color: 'var(--foreground)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                                    placeholder="Hãy chia sẻ về dự án hoặc ý tưởng của bạn..."
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full px-6 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed font-[Work_Sans] flex items-center justify-center gap-2"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                    color: 'var(--accent-foreground)'
                                }}
                                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        Gửi tin nhắn
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
