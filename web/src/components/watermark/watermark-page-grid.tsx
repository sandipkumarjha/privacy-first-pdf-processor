"use client";

import { useCallback, type KeyboardEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface WatermarkPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
}

interface WatermarkPageGridProps {
  pages: WatermarkPage[];
  onToggleSelect: (pageNumber: number) => void;
}

interface WatermarkPageCardProps {
  page: WatermarkPage;
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

function WatermarkPageCard({ page, onClick }: WatermarkPageCardProps) {
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-pressed={page.selected}
      aria-label={`Page ${page.pageNumber}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 bg-white p-3",
        "shadow-sm transition-all hover:shadow-md",
        page.selected
          ? "border-blue-500 bg-[var(--accent)]/30"
          : "border-[var(--secondary)]"
      )}
    >
      {page.selected && (
        <span
          className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white"
          aria-hidden="true"
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      )}

      <div className="relative aspect-[210/297] w-full overflow-hidden rounded-lg border border-[var(--secondary)]/60 bg-white">
        <img
          src={page.thumbnail}
          alt={`Page ${page.pageNumber}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <p className="text-center text-sm font-medium text-[var(--foreground)]">
        Page {page.pageNumber}
      </p>
    </motion.div>
  );
}

export function WatermarkPageGrid({
  pages,
  onToggleSelect,
}: WatermarkPageGridProps) {
  if (pages.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[var(--muted-foreground)]">
        No pages available.
      </p>
    );
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
        <WatermarkPageCard
          key={page.pageNumber}
          page={page}
          onClick={() => onToggleSelect(page.pageNumber)}
        />
      ))}
    </motion.div>
  );
}

export default WatermarkPageGrid;