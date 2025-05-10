"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function SocialSidebar() {
    return (
        <motion.div
            className="fixed right-6 bottom-2 hidden md:flex flex-col items-center z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 1.2,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 10
            }}
        >
            {/* Facebook */}
            <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Link
                    href="https://www.facebook.com/profile.php?id=100015843854925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-gray-100/80"
                    aria-label="Facebook"
                >
                    <FaFacebook size={22} />
                </Link>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Link
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100/80"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin size={22} />
                </Link>
            </motion.div>

            {/* Instagram */}
            <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Link
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-gray-100/80"
                    aria-label="Instagram"
                >
                    <FaInstagram size={22} />
                </Link>
            </motion.div>

            {/* Vertical divider line */}
            <motion.div
                className="h-16 w-0.5 bg-gradient-to-t from-orange-400/70 to-transparent mt-2"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            />
        </motion.div>
    )
}
