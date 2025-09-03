import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function ProjectsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-16 text-center relative"
        >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <Sparkles className="h-8 w-8 text-amber-400 opacity-60" />
            </div>
            <h1
                className="text-4xl md:text-5xl font-bold mb-6  "
                onMouseEnter={() => window.enterTextCursor?.()}
                onMouseLeave={() => window.leaveTextCursor?.()}
                style={{ fontFamily: 'Eczar, serif' }}
            >
                Các dự án sáng tạo của tôi
            </h1>
            <p className="text-lg  max-w-2xl mx-auto">
                Khám phá các dự án đa dạng từ phát triển web đến công cụ tiện ích, thể hiện kỹ năng và đam mê trong từng dòng code.
            </p>
        </motion.div>
    )
}