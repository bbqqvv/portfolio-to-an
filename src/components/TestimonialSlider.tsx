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
        <div id="skill" className="flex flex-col items-center bg-[#FAF4E7] p-4 sm:p-6 md:p-8 rounded-lg w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-black" style={{ fontFamily: 'Eczar, sans-serif' }}>
                Kỹ năng của tôi
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-center text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                Một cái nhìn về những kỹ năng mà tôi sở hữu và ứng dụng trong công việc.
            </p>

            <div className="flex flex-col sm:flex-row items-center w-full max-w-3xl mx-auto">
                {/* Nút điều hướng - hiển thị trên desktop */}
                <button
                    onClick={prevSkill}
                    className="hidden sm:block p-2 text-gray-700 hover:text-black transition-colors"
                    aria-label="Kỹ năng trước"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="flex flex-col sm:flex-row gap-4 w-full overflow-hidden">
                    {/* Hiển thị một kỹ năng trên mobile, hai kỹ năng trên desktop */}
                    <motion.div
                        key={`current-${currentIndex}`}
                        className="w-full sm:w-1/2 rounded-lg p-4 sm:p-6  "
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <p className="text-sm sm:text-base mb-3 sm:mb-4">{skills[currentIndex].text}</p>
                        <p className="text-sm sm:text-base font-semibold">{skills[currentIndex].author}</p>
                    </motion.div>

                    {/* Ẩn trên mobile, hiển thị trên desktop */}
                    <motion.div
                        key={`next-${(currentIndex + 1) % skills.length}`}
                        className="hidden sm:block w-1/2 rounded-lg p-6  "
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <p className="text-base mb-4">{skills[(currentIndex + 1) % skills.length].text}</p>
                        <p className="font-semibold">{skills[(currentIndex + 1) % skills.length].author}</p>
                    </motion.div>
                </div>

                {/* Nút điều hướng - hiển thị trên desktop */}
                <button
                    onClick={nextSkill}
                    className="hidden sm:block p-2 text-gray-700 hover:text-black transition-colors"
                    aria-label="Kỹ năng tiếp theo"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Nút điều hướng - hiển thị trên mobile */}
                <div className="flex sm:hidden justify-center gap-8 mt-6 w-full">
                    <button
                        onClick={prevSkill}
                        className="p-2 text-gray-700 hover:text-black transition-colors"
                        aria-label="Kỹ năng trước"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSkill}
                        className="p-2 text-gray-700 hover:text-black transition-colors"
                        aria-label="Kỹ năng tiếp theo"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Chỉ số slide - hiển thị trên mobile */}
                <div className="sm:hidden mt-4 flex gap-2">
                    {skills.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                            aria-label={`Đến kỹ năng ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}