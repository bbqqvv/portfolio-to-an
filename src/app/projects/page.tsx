"use client";

import React, { useEffect, useState } from "react";

import { AnimatedCard } from "@/components/ui/animated-card";
import { projects } from "@/data/projects";
import ProjectFilters from "./components/ProjectFilter";
import ProjectCard from "./components/ProjectCard";

const PAGE_SIZE = 3;

export default function ProjectPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = projects.filter((p) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.tags.some((tag) => tag.toLowerCase().includes(searchLower));
        const matchesFilter =
            activeFilter === "All" || p.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase()));
        return matchesSearch && matchesFilter;
    });

    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
    const filters = ["All", ...allTags];

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [searchTerm, activeFilter]);

    return (
        <main className="min-h-screen transition-colors duration-300">
            <section className="max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-[#fefae0] mb-4">
                        My{" "}
                        <span className="text-primary dark:text-primary-light underline decoration-4 decoration-primary dark:decoration-primary-light underline-offset-8">
                            Projects
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        Each project is a unique piece of development, crafted with attention to detail and modern technologies.
                    </p>

                    <ProjectFilters
                        filters={filters}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {visibleProjects.length === 0 ? (
                        <div className="col-span-full text-center py-16 md:py-20">
                            <div className="text-gray-400 dark:text-gray-500 mb-4 text-lg">No projects found matching your criteria</div>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveFilter("All");
                                }}
                                className="text-primary dark:text-primary-light hover:underline font-medium transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        visibleProjects.map((project, idx) => (
                            <AnimatedCard key={project.title} className="project-card" delay={Math.min(idx * 0.1, 0.6)}>
                                <ProjectCard project={project} />
                            </AnimatedCard>
                        ))
                    )}
                </div>

                {visibleCount < filteredProjects.length && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                            className="inline-block bg-primary dark:bg-primary-light hover:bg-primary-dark dark:hover:bg-primary transition-colors text-white font-semibold py-3 px-8 rounded-xl shadow-md"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
