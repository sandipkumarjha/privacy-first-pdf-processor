"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SplitPageInfo as PdfPageThumbnail } from "@/types/split";

interface SplitThumbnailCardProps {
  page: PdfPageThumbnail;
  selected: boolean;
  onClick: () => void;
}

export default function SplitThumbnailCard({
  page,
  selected,
  onClick,
}: SplitThumbnailCardProps) {
  const isLoading = !page.thumbnailUrl;

  return (
    <motion.button
      type="button"
      role="gridcell"
      aria-pressed={selected}
      aria-label={`Page ${page.pageNumber}${selected ? ", selected" : ""}`}
      onClick={onClick}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col items-center gap-2 rounded-xl border-2 p-2 outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500",
        selected
          ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
          : "border-zinc-200 bg-white hover:border-orange-300 dark:border-zinc-800 dark:bg-zinc-900"
      )}
    >
      {/* Checkbox */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
          selected
            ? "border-orange-600 bg-orange-600 text-white"
            : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800"
        )}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>

      {/* Thumbnail */}
      <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800">
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-zinc-100 dark:bg-zinc-700" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- local blob URL
          <img
            src={page.thumbnailUrl ?? undefined}
            alt={`Page ${page.pageNumber} preview`}
            className="h-full w-full object-cover"
            draggable={false}
          />
        )}
      </div>

      {/* Page number */}
      <span
        className={cn(
          "text-xs font-medium tabular-nums",
          selected ? "text-orange-700 dark:text-orange-400" : "text-zinc-500 dark:text-zinc-400"
        )}
      >
        {page.pageNumber}
      </span>
    </motion.button>
  );
}