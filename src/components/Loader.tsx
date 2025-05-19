'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

type Props = {
    children: React.ReactNode;
};

const Loader: React.FC<Props> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const whiteBgControls = useAnimation();
    const darkBgControls = useAnimation();
    const textControls = useAnimation();

    useEffect(() => {
        async function sequence() {
            // Text animation: y from 120 -> -10, opacity 0 -> 1
            await textControls.start({
                y: -10,
                opacity: 1,
                transition: { ease: 'easeInOut', duration: 0.8 }
            });

            // Background white moves up
            await whiteBgControls.start({
                y: '-100%',
                transition: { ease: 'easeIn', duration: 0.9, delay: 0.2 }
            });

            // Background dark moves up with overlap
            darkBgControls.start({
                y: '-100%',
                transition: { ease: 'easeIn', duration: 1, delay: 0.2 + 0.9 - 0.7 }
            });

            // Wait for dark-bg animation to complete
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Hide loader from DOM
            setIsVisible(false);
        }

        sequence();
    }, [textControls, whiteBgControls, darkBgControls]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    aria-hidden="true"
                    className="overflow-hidden fixed inset-0 z-[9999]"
                    initial={{ display: 'block' }}
                    exit={{ display: 'none' }}
                >
                    {/* White BG */}
                    <motion.div
                        className="white-bg fixed top-0 left-0 w-full h-screen bg-[#fff7ed] dark:bg-[#0e141a] z-[9999] flex justify-center items-center overflow-hidden"
                        initial={{ y: 0 }}
                        animate={whiteBgControls}
                    >
                        <motion.span
                            className="loading-text inline-block text-bgdark dark:text-bglight text-4xl sm:text-5xl lg:text-7xl tracking-widest font-medium"
                            initial={{ y: 120, opacity: 0 }}
                            animate={textControls}
                        >
                            {children}
                        </motion.span>
                    </motion.div>

                    {/* Dark BG */}
                    <motion.div
                        className="dark-bg fixed top-0 left-0 w-full h-screen bg-marrsgreen dark:bg-carrigreen z-[9998]"
                        initial={{ y: 0 }}
                        animate={darkBgControls}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
