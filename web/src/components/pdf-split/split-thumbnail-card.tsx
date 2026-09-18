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
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
        selected
          ? "border-foreground bg-accent-soft"
          : "border-border bg-surface hover:border-foreground/50"
      )}
    >
      {/* Checkbox */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
          selected
            ? "border-foreground bg-primary text-primary-foreground"
            : "border-border-strong bg-surface"
        )}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>

      {/* Thumbnail */}
      <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-2">
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-surface-2" />
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
          selected ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {page.pageNumber}
      </span>
    </motion.button>
  );
}