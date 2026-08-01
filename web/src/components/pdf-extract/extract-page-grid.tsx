"use client";

import { useCallback, type KeyboardEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface ExtractPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
}

interface ExtractPageGridProps {
  pages: ExtractPage[];
  selectedPages: number[];
  onToggleSelect: (pageNumber: number) => void;
}

interface ExtractPageCardProps {
  page: ExtractPage;
  selected: boolean;
  onClick: () => void;
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

function ExtractPageCard({ page, selected, onClick }: ExtractPageCardProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`Page ${page.pageNumber}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex cursor-pointer flex-col gap-3 rounded-2xl border-2 bg-white p-3",
        "shadow-sm transition-all hover:shadow-md",
        selected
          ? "border-[var(--primary)] bg-[var(--accent)]/20"
          : "border-[var(--secondary)]"
      )}
    >
      <span
        className={cn(
          "absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full transition-colors",
          selected
            ? "bg-[var(--primary)] text-white"
            : "border-2 border-[var(--secondary)] bg-white"
        )}
        aria-hidden="true"
      >32
      
        {selected && <Check className="h-3.5 w-3.5" />}
      </span>

      <div className="relative aspect-[210/297] w-full overflow-hidden rounded-lg border border-[var(--secondary)]/60 bg-white">
        <img
          src={page.thumbnail}
          alt={`Page ${page.pageNumber}`}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="text-center text-sm font-medium text-[var(--foreground)]">
        Page {page.pageNumber}
      </p>
    </motion.div>
  );
}

export function ExtractPageGrid({
  pages,
  selectedPages,
  onToggleSelect,
}: ExtractPageGridProps) {
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
      className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
    >
      {pages.map((page) => (
        <ExtractPageCard
          key={page.pageNumber}
          page={page}
          selected={selectedPages.includes(page.pageNumber)}
          onClick={() => onToggleSelect(page.pageNumber)}
        />
      ))}
    </motion.div>
  );
}

export default ExtractPageGrid;