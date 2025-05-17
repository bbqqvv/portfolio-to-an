'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { skills } from '@/data/skill';

export default function SkillSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSkill = () => setCurrentIndex((currentIndex + 1) % skills.length);
    const prevSkill = () => setCurrentIndex((currentIndex - 1 + skills.length) % skills.length);

    return (
        <div
            id="skill"
            className="flex flex-col items-center p-6 w-full"
            style={{ backgroundColor: 'var(--background-2)', color: 'var(--foreground-2)' }}
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Kỹ năng của tôi</h2>
            <p className="mb-6 text-center max-w-2xl text-muted-foreground">
                Một cái nhìn về những kỹ năng mà tôi sở hữu và ứng dụng trong công việc.
            </p>

            <div className="flex items-center w-full max-w-3xl mx-auto relative">
                <button
                    onClick={prevSkill}
                    className="hidden sm:block p-2"
                    aria-label="Kỹ năng trước"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="flex gap-6 w-full relative min-h-[160px] sm:min-h-[180px]">
                    {/* Trái: nội dung hiện tại */}
                    <div className="w-full sm:w-1/2">
                        <p className="mb-3">{skills[currentIndex].text}</p>
                        <p className="font-semibold">{skills[currentIndex].author}</p>
                    </div>

                    {/* Phải: nội dung kế tiếp */}
                    <div className="hidden sm:block w-1/2">
                        <p className="mb-3">
                            {skills[(currentIndex + 1) % skills.length].text}
                        </p>
                        <p className="font-semibold">
                            {skills[(currentIndex + 1) % skills.length].author}
                        </p>
                    </div>
                </div>

                <button
                    onClick={nextSkill}
                    className="hidden sm:block p-2"
                    aria-label="Kỹ năng tiếp theo"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Mobile controls */}
            <div className="flex sm:hidden justify-center gap-6 mt-6">
                <button onClick={prevSkill} className="p-2">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextSkill} className="p-2">
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="sm:hidden mt-4 flex gap-2">
                {skills.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className="w-2 h-2 rounded-full"
                        style={{
                            backgroundColor:
                                currentIndex === index
                                    ? 'var(--foreground-2)'
                                    : 'var(--text-muted)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
