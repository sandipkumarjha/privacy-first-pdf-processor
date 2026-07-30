"use client";

import { useCallback, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface RotatePage {
  pageNumber: number;
  thumbnail: string;
  rotation: number;
}

interface RotatePageCardProps {
  page: RotatePage;
  selected: boolean;
  onClick: () => void;
}

export function RotatePageCard({ page, selected, onClick }: RotatePageCardProps) {
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-label={`Rotate Page ${page.pageNumber}`}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex cursor-pointer flex-col gap-3 rounded-2xl border bg-white p-3 shadow-sm transition-shadow hover:shadow-md",
        "border-[var(--secondary)]",
        selected && "border-[var(--primary)] bg-[var(--primary)]/10"
      )}
    >
      {selected && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white"
          aria-hidden="true"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.span>
      )}

      <div className="relative aspect-[210/297] w-full overflow-hidden rounded-lg border border-[var(--secondary)]/60 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.thumbnail}
          alt={`Page ${page.pageNumber}`}
          style={{ transform: `rotate(${page.rotation}deg)` }}
          className="h-full w-full object-contain transition-transform duration-200 ease-out"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--foreground)]">
          Page {page.pageNumber}
        </span>

        <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--foreground)]">
          {page.rotation}&deg;
        </span>
      </div>
    </motion.div>
  );
}

export default RotatePageCard;