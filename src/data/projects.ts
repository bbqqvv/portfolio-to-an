export interface Project {
    title: string
    slug: string
    description: string
    image: string
    technologies: string[]
    liveUrl: string
    githubUrl: string
    category: "backend" | "frontend" | "module" | "tool"
    showGithub?: boolean
}

export const allProjects: Project[] = [
    {
        title: "E-Commerce Roway",
        slug: "e-commerce-roway",
        description:
            "A comprehensive e-commerce platform designed to efficiently manage products, orders, and payments. This project leverages the power of Spring Boot for backend development, integrated with Spring Security for robust authentication, Spring Data JPA for database management, and Thymeleaf for rendering dynamic web pages. MySQL is used for storing product data and other critical information.",
        image: "/images/projects/backend.png",
        technologies: ["SpringBoot", "Spring Security", "Spring Data JPA", "Thymeleaf", "MySQL"],
        liveUrl: "https://github.com/bbqqvv/BackendE-Commerce",
        githubUrl: "https://github.com/bbqqvv/BackendE-Commerce",
        category: "backend",
    },
    {
        title: "Roway Shop",
        slug: "roway-shop",
        description:
            "A modern, fully-featured e-commerce web application built with Next.js and React for a smooth, interactive user experience. The frontend is styled using Tailwind CSS, and Redux is used for efficient state management. TypeScript and Axios ensure type safety and seamless communication with the backend. This project provides a full-stack solution, combining both frontend and backend for a complete e-commerce system.",
        image: "/images/projects/ecomerce-backend.png",
        technologies: ["NextJS", "React", "Tailwind", "Typescript", "Redux", "Axios"],
        liveUrl: "https://roway-shop.vercel.app/",
        githubUrl: "https://github.com/bbqqvv/RowayShop.git",
        category: "frontend",
    },
    {
        title: "Portfolio Website just for you",
        slug: "portfolio-website",
        description:
            "A personal portfolio website template for you. Built with Next.js, Tailwind CSS, and Framer Motion for smooth animations.",
        image: "/images/projects/portfolio-toan.png",
        technologies: ["NextJS", "Tailwind", "Framer Motion", "Typescript"],
        liveUrl: "https://portfolio-to-an.vercel.app/",
        githubUrl: "https://github.com/bbqqvv/portfolio-to-an.git",
        category: "frontend",
        showGithub: false,
    },
    {
        title: "TCV Education",
        slug: "tcv-education-backend",
        description:
            "A backend system for an educational platform that enables user management, lesson handling, automated email notifications, and AI-powered features via the Gemini API. Built with Spring WebFlux for reactive programming and MongoDB for scalable data storage. Email integration is handled through SMTP, while security is enforced using Spring Security.",
        image: "/images/projects/backend1.png",
        technologies: ["SpringBoot", "Spring Security", "Thymeleaf", "Mongodb", "Gemini API", "SMTP", "WebFlux"],
        liveUrl: "https://github.com/bbqqvv/Backend-Education",
        githubUrl: "https://github.com/bbqqvv/Backend-Education",
        category: "backend",
    },
    {
        title: "Education React Native",
        slug: "tcv-education-frontend",
        description:
            "A cross-platform mobile app for the TCV Education platform, developed with React Native and Expo. It features user authentication, lesson interaction, and real-time communication with the backend via Axios. Tailwind CSS ensures modern styling, while Redux handles state management for a responsive user experience.",
        image: "/images/projects/edu.png",
        technologies: ["React Native", "Tailwind", "Typescript", "Axios", "Redux"],
        liveUrl: "https://github.com/bbqqvv/Education-ReactNative.git",
        githubUrl: "https://github.com/bbqqvv/Education-ReactNative.git",
        category: "frontend",
    },
    {
        title: "Audio To Text",
        slug: "audio-to-text",
        description:
            "Audio to text converter, supports automatic audio file processing using Python language.",
        image: "/images/projects/tool-convert-audio.png",
        technologies: ["Python"],
        liveUrl: "https://github.com/bbqqvv/ConvertAudioToText.git",
        githubUrl: "https://github.com/bbqqvv/ConvertAudioToText.git",
        category: "tool",
    },
    {
        title: "Hand Check",
        slug: "hand-check",
        description:
            "HandCheckAI is a graphical user interface (GUI) application that helps you measure hand angles from input images using MediaPipe, OpenCV, and Tkinter. Suitable for hand gesture analysis in physical therapy, education, or scientific research.",
        image: "/images/projects/handcheck.png",
        technologies: ["MediaPipe", "OpenCV", "Tkinter"],
        liveUrl: "https://github.com/bbqqvv/HandCheckAI.git",
        githubUrl: "https://github.com/bbqqvv/HandCheckAI.git",
        category: "tool",
    },

    {
        title: "Project HTVT",
        slug: "project-htvt",
        description:
            "A module in the LMS system of Vietnam Korea University Of Information And Communication Technology.",
        image: "/images/projects/module-edu-htvt.png",
        technologies: ["PHP", "Laravel", "MySQL", "Tailwind", "React"],
        liveUrl: "https://github.com/bbqqvv/Project-HTVT.git",
        githubUrl: "https://github.com/bbqqvv/Project-HTVT.git",
        category: "module",
    },

]