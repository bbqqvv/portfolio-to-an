"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ChibiBackground } from "@/components/ui/chibi-background"

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
            icon: <Mail className="w-5 h-5 " />,
            title: "Email",
            content: "hello@shambhavi.design",
            link: "mailto:hello@shambhavi.design",
            linkText: "Send an email",
        },
        {
            icon: <Phone className="w-5 h-5 " />,
            title: "Phone",
            content: "+1 (555) 123-4567",
            link: "tel:+15551234567",
            linkText: "Give me a call",
        },
        {
            icon: <MapPin className="w-5 h-5 " />,
            title: "Location",
            content: "San Francisco, California",
            link: "",
            linkText: "Available for remote work",
        },
    ]

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <SectionHeading
                    title="Let's Connect"
                    subtitle="Have a project in mind or want to collaborate? Drop me a message and I'll get back to you within 24 hours."
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <AnimatedCard
                            key={index}
                            className="p-6 rounded-lg border border-gray-100 hover:border-amber-200 transition-all flex flex-col items-center text-center hover:shadow-sm"
                            delay={index}
                        >
                            <div className="bg-amber-50 p-3 rounded-full mb-4 text-amber-500">{info.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                            <p className="mb-3">{info.content}</p>
                            {info.link ? (
                                <a
                                    href={info.link}
                                    className="text-sm font-medium hover:underline hover:text-amber-700 transition-colors"
                                >
                                    {info.linkText}
                                </a>
                            ) : (
                                <p className=" text-sm font-medium">{info.linkText}</p>
                            )}
                        </AnimatedCard>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-[var(--foreground)]">
                    {/* Thẻ cha set màu text toàn bộ phần này */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">
                            Get in touch directly
                        </h2>
                        <p className="text-opacity-80">
                            I'm currently available for freelance work and collaborations. Whether you have a project in mind or just want to say hello, I'd love to hear from you.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="bg-amber-50 p-2 rounded-full mt-1">
                                    <Mail className="w-4 h-4 " />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[var(--foreground)]">Email me at</h4>
                                    <a href="mailto:hello@shambhavi.design" className=" hover:underline">
                                        hello@shambhavi.design
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-amber-50 p-2 rounded-full mt-1">
                                    <Phone className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[var(--foreground)]">Call me at</h4>
                                    <a href="tel:+15551234567" className=" hover:underline">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AnimatedCard className="p-8 rounded-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">Send a message</h2>

                        {isSubmitted && (
                            <div className="bg-green-50 border border-green-100  p-4 rounded-lg mb-6 text-sm">
                                Thank you for your message! I'll get back to you within 24 hours.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-mediummb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-[var(--foreground)]"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium  mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-[var(--foreground)]"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-[var(--foreground)]"
                                >
                                    <option value="">What's this about?</option>
                                    <option value="Project Inquiry">Project Inquiry</option>
                                    <option value="Collaboration">Collaboration</option>
                                    <option value="Job Opportunity">Job Opportunity</option>
                                    <option value="General Question">General Question</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-[var(--foreground)]"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`w-full border-2 px-6 py-3 rounded-lg transition-colors font-medium text-sm ${isSubmitting
                                    ? "border-gray-400  cursor-not-allowed"
                                    : "border-gray-400 hover:bg-gray-100 hover:text-black"
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    </AnimatedCard>
                </div>
            </div>
        </main>
    )
}
