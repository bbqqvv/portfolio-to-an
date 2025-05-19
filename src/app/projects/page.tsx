import React from 'react';

const projects = [
    {
        title: 'Personal Portfolio',
        description: 'A modern portfolio website showcasing my projects and skills.',
        link: 'https://your-portfolio.com',
    },
    {
        title: 'E-commerce Store',
        description: 'A full-stack e-commerce application with payment integration.',
        link: 'https://your-store.com',
    },
    {
        title: 'Blog Platform',
        description: 'A blogging platform with markdown support and user authentication.',
        link: 'https://your-blog.com',
    },
];

export default function ProjectPage() {
    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Projects</h1>
            <ul className="space-y-6">
                {projects.map((project) => (
                    <li key={project.title} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                        <p className="mb-4 text-gray-700">{project.description}</p>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View Project
                        </a>
                    </li>
                ))}
            </ul>
        </main>
    );
}