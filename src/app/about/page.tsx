"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Server, MonitorSmartphone, Wrench } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"

type Tech = {
    name: string;
    icon: string;
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-white dark:from-[#0F141C] dark:via-[#1a1f2e] dark:to-[#0F141C]">
            {/* Decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto container max-w-7xl px-4 md:px-8 lg:px-12 py-12 md:py-20">
            {/* Giới thiệu bản thân */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto mb-16 text-center"
            >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-500 to-pink-400 dark:from-pink-400 dark:via-purple-400 dark:to-pink-300 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Eczar, serif' }}>
                    Giới thiệu bản thân 🌸
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
                    Lập trình viên Full-stack
                </p>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full mx-auto max-w-md mt-6"
                />
            </motion.section>

            {/* Thông tin cá nhân */}
            <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative w-full aspect-square max-w-md mx-auto md:mx-0">
                        <div className="absolute inset-0 border-2 border-pink-500 dark:border-pink-400 rounded-2xl transform translate-x-4 translate-y-4" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-2xl" />
                        <Image
                            src="/images/toan1.png"
                            alt="Tố An"
                            width={400}
                            height={400}
                            className="rounded-2xl relative z-10 object-cover w-full h-full shadow-2xl"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Eczar, serif' }}>
                        Tôi là ai?
                    </h2>

                    <div className="space-y-4 mb-8 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        <p>
                            Mình là sinh viên ngành Kỹ thuật phần mềm, luôn khao khát học hỏi và khám phá công nghệ mới. Mình không ngừng cải thiện kỹ năng lập trình của bản thân.
                        </p>
                        <p>
                            Mình tập trung chủ yếu vào Spring và NextJS, đặc biệt chú trọng đến hiệu suất, trải nghiệm người dùng và giao diện đẹp mắt.
                        </p>
                        <p>
                            Mình thích khám phá tri thức công nghệ và phát triển các ứng dụng hữu ích. Ngoài thời gian học, mình thường xem video lập trình, luyện thuật toán trên LeetCode để rèn tư duy logic. Mình cũng yêu thích nghe nhạc, đi cà phê với bạn bè và chơi game giải trí.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-pink-100/50 dark:border-slate-700/50 shadow-lg">
                            <h4 className="font-bold mb-2 text-xs uppercase tracking-wider text-pink-600 dark:text-pink-400">Nơi ở</h4>
                            <p className="font-semibold text-gray-900 dark:text-white">Đà Nẵng, Việt Nam</p>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-pink-100/50 dark:border-slate-700/50 shadow-lg">
                            <h4 className="font-bold mb-2 text-xs uppercase tracking-wider text-pink-600 dark:text-pink-400">Học vấn</h4>
                            <p className="font-semibold text-gray-900 dark:text-white">Đại học VKU</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">2022 - 2026</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Học vấn */}
            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'Eczar, serif' }}>Học vấn</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative pl-8 border-l-2 border-pink-200 dark:border-pink-700/30 pb-8"
                        >
                            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Cử nhân Công nghệ Thông tin</h3>
                                <span className="text-sm bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 px-4 py-1.5 rounded-full font-semibold">2022 - 2026</span>
                            </div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Trường Đại học Việt - Hàn (VKU)
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Được đào tạo bài bản về phát triển phần mềm, trí tuệ nhân tạo và ứng dụng di động. Tích cực tham gia các sự kiện công nghệ và dự án nhóm tại trường.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Công nghệ sử dụng */}
            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'Eczar, serif' }}>Công nghệ sử dụng</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
                    </div>

                    <Tabs defaultValue="backend" className="max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-3 gap-4 mb-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-2xl border-2 border-pink-100/50 dark:border-slate-700/50 shadow-lg">
                            <TabsTrigger 
                                value="backend" 
                                className="text-base font-semibold flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-pink-50 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300"
                            >
                                <Server className="h-5 w-5" /> Backend
                            </TabsTrigger>
                            <TabsTrigger 
                                value="frontend" 
                                className="text-base font-semibold flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-pink-50 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300"
                            >
                                <MonitorSmartphone className="h-5 w-5" /> Frontend
                            </TabsTrigger>
                            <TabsTrigger 
                                value="tools" 
                                className="text-base font-semibold flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-pink-50 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300"
                            >
                                <Wrench className="h-5 w-5" /> Công cụ
                            </TabsTrigger>
                        </TabsList>

                        {/* Backend */}
                        <TabsContent value="backend" className="mt-6">
                            <TechGrid
                                list={[
                                    { name: "Java", icon: "/icons/java.png" },
                                    { name: "Spring Framework", icon: "https://cdn.simpleicons.org/spring" },
                                    { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql" },
                                    { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
                                    { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
                                    { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
                                    { name: "WSL", icon: "/icons/linux.png" },
                                    { name: "Postman", icon: "https://cdn.simpleicons.org/postman" },
                                ]}
                            />
                        </TabsContent>

                        {/* Frontend */}
                        <TabsContent value="frontend" className="mt-6">
                            <TechGrid
                                list={[
                                    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
                                    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
                                    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
                                    { name: "HTML/CSS", icon: "https://cdn.simpleicons.org/html5" },
                                    { name: "React", icon: "https://cdn.simpleicons.org/react" },
                                ]}
                            />
                        </TabsContent>

                        {/* Tools */}
                        <TabsContent value="tools" className="mt-6">
                            <TechGrid
                                list={[
                                    { name: "Git", icon: "https://cdn.simpleicons.org/git" },
                                    { name: "JetBrains IDEs", icon: "https://cdn.simpleicons.org/jetbrains/ffffff" },
                                    { name: "Scrum", icon: "https://cdn.simpleicons.org/scrumalliance" },
                                    { name: "Agile", icon: "/icons/agile.png" },
                                    { name: "VS Code", icon: "/icons/vscode.png" },
                                    { name: "Jira", icon: "https://cdn.simpleicons.org/jira" },
                                    { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
                                ]}
                            />
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </section>

            {/* Thành tựu */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'Eczar, serif' }}>Thành tựu</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-pink-100/50 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 p-3 rounded-xl flex-shrink-0">
                                        <Award className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{achievement.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{achievement.description}</p>
                                        <p className="text-sm text-pink-600 dark:text-pink-400 font-semibold">{achievement.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
            </div>
        </div>
    )
}

function TechGrid({ list }: { list: Tech[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {list.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center justify-center text-center p-6 border-2 border-pink-100/50 dark:border-slate-700/50 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-pink-400 dark:hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 group"
                >
                    <div className="relative mb-4">
                        <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={56}
                            height={56}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{tech.name}</p>
                </motion.div>
            ))}
        </div>
    )
}

const achievements = [
    {
        title: "Sinh viên xuất sắc năm 2023",
        description: "Được trao tặng vì thành tích học tập và hoạt động ngoại khóa nổi bật.",
        date: "Tháng 12 năm 2023"
    },
    {
        title: "Quán quân Hackathon 2022",
        description: "Đoạt giải nhất cuộc thi hackathon cấp quốc gia với sản phẩm sáng tạo.",
        date: "Tháng 6 năm 2022"
    },
    {
        title: "Top 10 LeetCode toàn cầu",
        description: "Nằm trong top 10 bảng xếp hạng toàn cầu về giải thuật.",
        date: "Tháng 1 năm 2024"
    }
]
