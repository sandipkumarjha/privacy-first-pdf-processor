"use client";

import { motion, type Variants } from "framer-motion";
import { RotatePageCard } from "@/components/pdf-rotate/rotate-page-card";

interface RotatePage {
  pageNumber: number;
  thumbnail: string;
  rotation: number;
}

interface RotatePageGridProps {
  pages: RotatePage[];
  selectedPages: number[];
  onToggleSelect: (pageNumber: number) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export function RotatePageGrid({
  pages,
  selectedPages,
  onToggleSelect,
}: RotatePageGridProps) {
  if (pages.length === 0) {
    return null;
  }

  return (
    <motion.div
      role="grid"
      aria-label="PDF pages"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {pages.map((page) => (
        <motion.div key={page.pageNumber} role="gridcell" variants={cardVariants}>
          <RotatePageCard
            page={page}
            selected={selectedPages.includes(page.pageNumber)}
            onClick={() => onToggleSelect(page.pageNumber)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default RotatePageGrid;