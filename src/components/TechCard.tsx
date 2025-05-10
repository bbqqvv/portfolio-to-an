import Image from 'next/image';
import { motion } from 'framer-motion';

type TechCardProps = {
    tech: { name: string; icon: string };
    index: number;
};

export const TechCard = ({ tech, index }: TechCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className="bg-white p-6 rounded-lg shadow-lg border"
        >
            <div className="flex items-center justify-center">
                <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                />
            </div>
            <h4 className="text-center font-semibold text-xl mt-4">{tech.name}</h4>
        </motion.div>
    );
};
