"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiX, FiChevronDown } from "react-icons/fi";
import { AnimatedCard } from "@/components/ui/animated-card";

type Props = {
    filters: string[];
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

export default function ProjectFilters({ filters, activeFilter, setActiveFilter, searchTerm, setSearchTerm }: Props) {
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = () => setIsFilterMenuOpen(false);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <>
            <div className="max-w-2xl mx-auto relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                    type="text"
                    placeholder="Search projects by name, tech or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#2a2a2a] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light text-black dark:text-[#fefae0] placeholder-gray-400 dark:placeholder-gray-500 text-lg transition-all"
                    aria-label="Search projects"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        aria-label="Clear search"
                    >
                        <FiX className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                    </button>
                )}
            </div>

            <div className="mb-10 md:mb-12">
                <div className="flex flex-wrap justify-center gap-3 relative">
                    {filters.slice(0, 5).map((filter, idx) => (
                        <AnimatedCard key={filter} className="inline-block" delay={idx * 0.05}>
                            <button
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === filter
                                    ? "bg-primary dark:bg-primary-light text-white dark:text-black shadow-md"
                                    : "bg-white dark:bg-[#2a2a2a] text-black dark:text-[#fefae0] border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
                                    }`}
                                aria-label={`Filter by ${filter}`}
                            >
                                {filter}
                            </button>
                        </AnimatedCard>
                    ))}

                    {filters.length > 5 && (
                        <AnimatedCard className="inline-block" delay={5 * 0.05}>
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsFilterMenuOpen(!isFilterMenuOpen);
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-all ${isFilterMenuOpen || filters.slice(5).includes(activeFilter)
                                        ? "bg-primary dark:bg-primary-light text-white dark:text-black"
                                        : "bg-white dark:bg-[#2a2a2a] text-black dark:text-[#fefae0] border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
                                        }`}
                                    aria-expanded={isFilterMenuOpen}
                                    aria-label="More filters"
                                >
                                    More <FiChevronDown className={`h-4 w-4 transition-transform ${isFilterMenuOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isFilterMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-[#2a2a2a] shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 z-10 p-2 grid grid-cols-2 gap-2 animate-fade-in">
                                        {filters.slice(5).map((filter) => (
                                            <button
                                                key={filter}
                                                onClick={() => {
                                                    setActiveFilter(filter);
                                                    setIsFilterMenuOpen(false);
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeFilter === filter
                                                    ? "bg-primary dark:bg-primary-light text-white dark:text-black"
                                                    : "bg-gray-100 dark:bg-[#3a3a3a] text-black dark:text-[#fefae0] hover:bg-gray-200 dark:hover:bg-[#4a4a4a]"
                                                    }`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </AnimatedCard>
                    )}
                </div>

                {activeFilter !== "All" && (
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setActiveFilter("All")}
                            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <FiX className="mr-1" /> Clear filter
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
