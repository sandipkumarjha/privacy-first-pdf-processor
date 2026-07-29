"use client";

import { useCallback, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type PageRotation = 0 | 90 | 180 | 270;

interface PageThumbnailProps {
  pageNumber: number;
  thumbnail: string;
  selected?: boolean;
  rotation?: PageRotation;
  disabled?: boolean;
  loading?: boolean;
  showCheckbox?: boolean;
  showPageNumber?: boolean;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PageThumbnail({
  pageNumber,
  thumbnail,
  selected = false,
  rotation = 0,
  disabled = false,
  loading = false,
  showCheckbox = false,
  showPageNumber = true,
  footer,
  onClick,
  className,
}: PageThumbnailProps) {
  const isInteractive = Boolean(onClick) && !disabled && !loading;

  const handleClick = useCallback(() => {
    if (!isInteractive) return;
    onClick?.();
  }, [isInteractive, onClick]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick?.();
      }
    },
    [isInteractive, onClick]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isInteractive ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-selected={isInteractive ? selected : undefined}
      aria-disabled={disabled}
      aria-label={isInteractive ? `Page ${pageNumber}` : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex flex-col gap-2 rounded-xl border bg-[var(--surface)] p-2 shadow-sm transition-all",
        "border-[var(--border)]",
        isInteractive && "cursor-pointer hover:shadow-md",
        selected &&
          "border-[var(--accent)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_35%,transparent)]",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {selected && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-white"
          aria-hidden="true"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.span>
      )}

      {showCheckbox && !selected && (
        <span
          className="absolute right-2 top-2 z-10 h-5 w-5 rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface)]"
          aria-hidden="true"
        />
      )}

      <div className="relative aspect-[210/297] w-full overflow-hidden rounded-lg bg-[var(--surface-2)]">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-[var(--surface-2)]" />
        ) : (
          <motion.img
            src={thumbnail}
            alt={`Page ${pageNumber}`}
            animate={{ rotate: rotation }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {showPageNumber && (
        <p className="text-center text-sm font-medium text-[var(--foreground)]">
          {pageNumber}
        </p>
      )}

      {footer}
    </motion.div>
  );
}

export default PageThumbnail;