"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { AnimatedCard } from "@/components/ui/animated-card"

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
            icon: <Mail className="w-5 h-5 text-rose-500" />,
            title: "Email",
            content: "hello@shambhavi.design",
            link: "mailto:hello@shambhavi.design",
            linkText: "Gửi email cho tôi",
        },
        {
            icon: <Phone className="w-5 h-5 text-rose-500" />,
            title: "Điện thoại",
            content: "+84 123 456 789",
            link: "tel:+84123456789",
            linkText: "Gọi cho tôi",
        },
        {
            icon: <MapPin className="w-5 h-5 text-rose-500" />,
            title: "Địa chỉ",
            content: "Hà Nội, Việt Nam",
            link: "",
            linkText: "Làm việc từ xa",
        },
    ]

    return (
        <main className="mx-auto container max-w-7xl px-4 md:px-8 lg:px-12 ">
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <SectionHeading
                    title="Liên Hệ Với Tôi"
                    subtitle="Bạn có dự án cần hợp tác hoặc muốn trao đổi? Hãy gửi tin nhắn và tôi sẽ phản hồi trong vòng 24 giờ."
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {contactInfo.map((info, index) => (
                        <AnimatedCard
                            key={index}
                            className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-transparent hover:border-rose-300 flex flex-col items-center text-center"
                            index={index}
                        >
                            <div className="bg-rose-100 p-4 rounded-full mb-4 text-rose-600 text-xl shadow-inner">
                                {info.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-rose-900">
                                {info.title}
                            </h3>
                            <p className="mb-4 text-rose-800 text-sm leading-relaxed">
                                {info.content}
                            </p>
                            {info.link ? (
                                <a
                                    href={info.link}
                                    className="text-sm font-medium text-rose-700 hover:text-rose-600 hover:underline transition-colors duration-200"
                                >
                                    {info.linkText}
                                </a>
                            ) : (
                                <p className="text-sm font-medium text-rose-700">{info.linkText}</p>
                            )}
                        </AnimatedCard>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-medium ">
                            Thông tin liên hệ trực tiếp
                        </h2>
                        <p className="">
                            Hiện tôi đang nhận các dự án freelance và cơ hội hợp tác. Dù bạn có ý tưởng dự án
                            hay chỉ đơn giản muốn chào hỏi, tôi rất mong được nghe từ bạn.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 rounded-full mt-1">
                                    <Mail className="w-4 h-4 " />
                                </div>
                                <div>
                                    <h4 className="font-medium ">Email</h4>
                                    <a
                                        href="mailto:hello@shambhavi.design"
                                        className="hover:underline hover:text-rose-600"
                                    >
                                        hello@shambhavi.design
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2 rounded-full mt-1">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Điện thoại</h4>
                                    <a
                                        href="tel:+84123456789"
                                        className="hover:underline hover:text-rose-600"
                                    >
                                        +84 123 456 789
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AnimatedCard className="p-8 rounded-xl  border-2 border-rose-100">
                        <h2 className="text-2xl font-medium mb-6">
                            Gửi tin nhắn
                        </h2>

                        {isSubmitted && (
                            <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg mb-6 text-sm">
                                Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi lại trong vòng 24 giờ.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 text-sm border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all bg-white text-rose-900 placeholder-rose-300"
                                        placeholder="Nhập họ tên của bạn"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1 ">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 text-sm border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all bg-white text-rose-900 placeholder-rose-300"
                                        placeholder="email@cuaban.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                    Chủ đề
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 text-sm border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all bg-white text-rose-900"
                                >
                                    <option value="" className="text-rose-300">Bạn muốn liên hệ về vấn đề gì?</option>
                                    <option value="Project Inquiry">Tư vấn dự án</option>
                                    <option value="Collaboration">Hợp tác</option>
                                    <option value="Job Opportunity">Cơ hội việc làm</option>
                                    <option value="General Question">Câu hỏi chung</option>
                                    <option value="Other">Khác</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">
                                    Nội dung
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 text-sm border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all bg-white text-rose-900 placeholder-rose-300"
                                    placeholder="Hãy chia sẻ về dự án của bạn..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`w-full px-6 py-3 rounded-xl transition-all font-medium text-sm bg-gradient-to-r from-rose-400 to-red-500 text-white hover:from-rose-500 hover:to-rose-600 shadow-sm hover:shadow-md ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                    </span>
                                ) : (
                                    "Gửi tin nhắn"
                                )}
                            </button>
                        </form>
                    </AnimatedCard>
                </div>
            </div>
        </main>
    )
}