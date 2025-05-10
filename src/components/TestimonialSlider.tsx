'use client';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const skills = [
    {
        text: "Tôi có khả năng thiết kế giao diện người dùng (UI) sáng tạo và hiện đại, đảm bảo mỗi sản phẩm đều mang lại trải nghiệm người dùng mượt mà và dễ sử dụng.",
        author: "Thiết kế giao diện (UI)",
    },
    {
        text: "Kỹ năng lập trình web của tôi vững chắc với các công nghệ hiện đại như React, Next.js và Tailwind CSS, giúp tôi xây dựng các ứng dụng web mạnh mẽ và dễ duy trì.",
        author: "Lập trình web (React, Next.js, Tailwind CSS)",
    },
    {
        text: "Tôi có khả năng tối ưu hóa trải nghiệm người dùng (UX), nghiên cứu và phân tích hành vi người dùng để tạo ra các giao diện không chỉ đẹp mắt mà còn dễ sử dụng.",
        author: "Tối ưu hóa trải nghiệm người dùng (UX)",
    },
    {
        text: "Kỹ năng quản lý dự án của tôi giúp đảm bảo các dự án được hoàn thành đúng hạn và đạt chất lượng cao, luôn sẵn sàng để làm việc với nhóm và khách hàng.",
        author: "Quản lý dự án",
    },
];

export default function SkillSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSkill = () => {
        setCurrentIndex((prev) => (prev + 1) % skills.length);
    };

    const prevSkill = () => {
        setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length);
    };

    return (
        <div id="skill" className="flex flex-col items-center bg-[#FAF4E7] p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-black" style={{ fontFamily: 'Eczar, sans-serif' }}>
                Kỹ năng của tôi
            </h2>
            <p className="mb-8 text-lg text-center text-gray-600" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                Một cái nhìn về những kỹ năng mà tôi sở hữu và ứng dụng trong công việc.
            </p>

            <div className="flex items-center space-x-6" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                <button onClick={prevSkill} className="p-2">
                    <ChevronLeft size={24} />
                </button>

                {/* Hiển thị hai kỹ năng cùng một lúc */}
                <div className="flex gap-6">
                    {/* Sử dụng motion.div cho phần hiển thị kỹ năng hiện tại */}
                    <motion.div
                        className="w-80 rounded-lg p-6"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <p className="text-base mb-4">{skills[currentIndex].text}</p>
                        <p className="font-semibold">{skills[currentIndex].author}</p>
                    </motion.div>

                    {/* Sử dụng motion.div cho phần hiển thị kỹ năng tiếp theo */}
                    <motion.div
                        className="w-80 rounded-lg p-6"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <p className="text-base mb-4">{skills[(currentIndex + 1) % skills.length].text}</p>
                        <p className="font-semibold">{skills[(currentIndex + 1) % skills.length].author}</p>
                    </motion.div>
                </div>

                <button onClick={nextSkill} className="p-2">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
