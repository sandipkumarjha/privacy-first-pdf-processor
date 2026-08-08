"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { OcrPage } from "@/store/ocr";

interface OcrPageGridProps {
  pages: OcrPage[];
  disabled?: boolean;
  onTogglePage: (pageNumber: number) => void;
}

interface OcrPageCardProps {
  page: OcrPage;
  disabled: boolean;
  onToggle: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.04,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

function OcrPageCard({ page, disabled, onToggle }: OcrPageCardProps) {
  const label = page.selected
    ? `Deselect page ${page.pageNumber}`
    : `Select page ${page.pageNumber}`;

  return (
    <motion.button
      type="button"
      variants={cardVariants}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={page.selected}
      aria-label={label}
      className={cn(
        "relative flex flex-col gap-3 rounded-xl border-2 bg-white p-3 text-left",
        "shadow-sm transition-all",
        page.selected
          ? "border-[var(--primary)] bg-[var(--accent)]/20"
          : "border-[var(--secondary)]",
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:shadow-md"
      )}
    >
      {page.selected && (
        <span
          className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white"
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
    </motion.button>
  );
}

export function OcrPageGrid({
  pages,
  disabled = false,
  onTogglePage,
}: OcrPageGridProps) {
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
      className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {pages.map((page) => (
        <OcrPageCard
          key={page.pageNumber}
          page={page}
          disabled={disabled}
          onToggle={() => onTogglePage(page.pageNumber)}
        />
      ))}
    </motion.div>
  );
}

export default OcrPageGrid;