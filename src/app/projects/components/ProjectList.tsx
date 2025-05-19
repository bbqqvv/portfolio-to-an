"use client";

import React from "react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
type ProjectType = typeof projects[0];

type ProjectListProps = {
    projects: ProjectType[];
    visibleCount: number;
    onLoadMore: () => void;
};

export function ProjectList({ projects, visibleCount, onLoadMore }: ProjectListProps) {
    const visibleProjects = projects.slice(0, visibleCount);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleProjects.length === 0 ? (
                    <div className="col-span-full text-center py-16 md:py-20">
                        <div className="text-gray-400 dark:text-gray-500 mb-4 text-lg">
                            No projects found matching your criteria
                        </div>
                    </div>
                ) : (
                    visibleProjects.map((project, idx) => (
                        <AnimatedCard key={project.title} className="project-card" delay={Math.min(idx * 0.1, 0.6)}>
                            <ProjectCard project={project} />
                        </AnimatedCard>
                    ))
                )}
            </div>

            {visibleCount < projects.length && (
                <div className="text-center mt-12 md:mt-16">
                    <AnimatedCard className="inline-block">
                        <button
                            onClick={onLoadMore}
                            className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white dark:text-black bg-primary dark:bg-primary-light hover:bg-primary-dark dark:hover:bg-primary-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-light transition-all duration-200 hover:shadow-lg"
                            aria-label="Load more projects"
                        >
                            Load More Projects
                        </button>
                    </AnimatedCard>
                </div>
            )}
        </>
    );
}
