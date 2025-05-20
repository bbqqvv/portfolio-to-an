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
        <div className="mx-auto container max-w-7xl px-4 md:px-8 lg:px-12 py-12 md:py-20">
            {/* Giới thiệu bản thân */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto mb-16 text-center"
                style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}

            >
                <h1
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    Giới thiệu bản thân
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Lập trình viên Full-stack
                </p>
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
                        <div className="absolute inset-0 border-2 border-primary rounded-lg transform translate-x-4 translate-y-4" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
                        <Image
                            src="/images/toan1.png"
                            alt="Tố An"
                            width={400}
                            height={400}
                            className="rounded-lg relative z-10 object-cover w-full h-full"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                    >Tôi là ai?</h2>

                    <div className="space-y-4 mb-8 text-muted-foreground">
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

                    <div className="grid grid-cols-2 gap-6" >
                        <div className="bg-card p-4 rounded-lg border">
                            <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Nơi ở</h4>
                            <p className="font-medium">Đà Nẵng, Việt Nam</p>
                        </div>
                        <div className="bg-card p-4 rounded-lg border">
                            <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Học vấn</h4>
                            <p className="font-medium">Đại học VKU</p>
                            <p className="text-sm text-muted-foreground">2022 - 2026</p>
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
                    <div className="max-w-2xl mx-auto text-center mb-12" style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Học vấn</h2>
                        <div className="w-20 h-1 bg-primary mx-auto" />
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative pl-8 border-l border-primary/30 pb-8"
                        >
                            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h3 className="font-bold text-lg">Cử nhân Công nghệ Thông tin</h3>
                                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">2022 - 2026</span>
                            </div>
                            <p className="font-medium text-muted-foreground mb-3">
                                Trường Đại học Việt - Hàn (VKU)
                            </p>
                            <p className="text-muted-foreground">
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
                    <div className="max-w-2xl mx-auto text-center mb-12" style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Công nghệ sử dụng</h2>
                        <div className="w-20 h-1 bg-primary mx-auto" />
                    </div>

                    <Tabs defaultValue="backend" className="max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="backend" className="text-lg flex items-center gap-2">
                                <Server className="h-5 w-5" /> Backend
                            </TabsTrigger>
                            <TabsTrigger value="frontend" className="text-lg flex items-center gap-2">
                                <MonitorSmartphone className="h-5 w-5" /> Frontend
                            </TabsTrigger>
                            <TabsTrigger value="tools" className="text-lg flex items-center gap-2">
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
                    <div className="max-w-2xl mx-auto text-center mb-12" style={{ fontFamily: 'Eczar, sans-serif', color: 'var(--text-card)' }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Thành tựu</h2>
                        <div className="w-20 h-1 bg-primary mx-auto" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                                        <p className="text-muted-foreground mb-3">{achievement.description}</p>
                                        <p className="text-sm text-primary font-medium">{achievement.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    )
}

function TechGrid({ list }: { list: Tech[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {list.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center justify-center text-center p-4 border rounded-lg bg-card hover:bg-primary/10 transition-all"
                >
                    <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={50}
                        height={50}
                        className="mb-3"
                    />
                    <p className="font-medium">{tech.name}</p>
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
