"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostMetadata } from "@/types/types";
import Image from "next/image";

interface Props {
  projects: PostMetadata[];
}

const CategoryScroll = (props: Props) => {
  // Environment variables with fallback defaults
  const ITEMS_PER_PAGE = parseInt(
    process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || "4"
  );
  const SCROLL_DISTANCE = parseInt(
    process.env.NEXT_PUBLIC_SCROLL_DISTANCE || "200"
  );
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const PORTFOLIO_PATH = process.env.NEXT_PUBLIC_PORTFOLIO_PATH || "/portfolio";
  const DEFAULT_CATEGORY = process.env.NEXT_PUBLIC_DEFAULT_CATEGORY;
  const ARROW_CHECK_DELAY = parseInt(
    process.env.NEXT_PUBLIC_ARROW_CHECK_DELAY || "300"
  );
  const ARROW_THRESHOLD = parseInt(
    process.env.NEXT_PUBLIC_ARROW_THRESHOLD || "5"
  );
  const { projects } = props;

  const categories: string[] = [
    // DEFAULT_CATEGORY,
    ...new Set(projects.map((project) => project.category)),
  ];
  const firstCategory=categories.find((category)=>category===DEFAULT_CATEGORY)
  const removedCategory=categories.filter((category)=>category!==DEFAULT_CATEGORY)
  const arrangedCategory=[firstCategory,...removedCategory]
  const [activeCategory, setActiveCategory] =
    useState<string | undefined>(DEFAULT_CATEGORY);
  const [filteredProjects, setFilteredProjects] =
    useState<PostMetadata[]>(projects);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft <
            container.scrollWidth - container.clientWidth - ARROW_THRESHOLD
        );
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);

      // Initial check after a configurable delay
      const timer = setTimeout(checkScroll, ARROW_CHECK_DELAY);

      // Check on resize
      window.addEventListener("resize", checkScroll);

      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        clearTimeout(timer);
      };
    }
  }, [isMounted, ARROW_CHECK_DELAY, ARROW_THRESHOLD]);

  useEffect(() => {
    
      setFilteredProjects(
        projects.filter((project) => project.category === activeCategory)
      );
    
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory, DEFAULT_CATEGORY]);

  const scrollLeft = (): void => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -SCROLL_DISTANCE, behavior: "smooth" });
    }
  };

  const scrollRight = (): void => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: SCROLL_DISTANCE, behavior: "smooth" });
    }
  };

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Get current items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const goToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = (): void => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = (): void => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleCategoryChange = (category: string | undefined): void => {
    setActiveCategory(category);
  };

  // Generate portfolio URL with base URL and portfolio path
  const generatePortfolioUrl = (projectName: string): string => {
    const path = `${PORTFOLIO_PATH}/${projectName?.toLowerCase()}`;
    return BASE_URL ? `${BASE_URL}${path}` : path;
  };

  return (
    <div className="flex flex-col gap-7 w-full">
      <div className="relative w-full h-14">
        {/* Left scroll button */}
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        )}

        {/* Categories scroll container */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto px-8 h-full relative top-1/2 -translate-y-1/2 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex flex-nowrap gap-2 min-w-max absolute">
            {arrangedCategory.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-3xl font-bold transition-colors whitespace-nowrap text-base flex items-center ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Right scroll button */}
        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-10 gap-x-5 xl:gap-x-40 px-10 md:px-20 md:h-[49vh]">
        {currentItems.map((project, index) => (
          <a
            key={index}
            href={generatePortfolioUrl(project.name)}
            className="no-underline flex justify-center bg-white overflow-hidden rounded-xl"
          >
            {/* <h1 className="text-2xl p-10 border rounded-lg">{project.name}</h1> */}
            <Image
              src={project.image}
              alt={project.name}
              width={500}
              height={500}
              className=" h-full w-auto"
            />
          </a>
        ))}
      </div>

      {/* Pagination Controls */}
      {filteredProjects.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-lg">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-pink-500"
            }`}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-pink-500"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryScroll;
