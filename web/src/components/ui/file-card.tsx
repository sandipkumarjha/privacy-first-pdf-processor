"use client";

import { useCallback, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { FileText, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface FileCardProps {
  fileName: string;
  fileSize?: string;
  pageCount?: number;
  thumbnail?: string;
  icon?: LucideIcon;
  selected?: boolean;
  disabled?: boolean;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FileCard({
  fileName,
  fileSize,
  pageCount,
  thumbnail,
  icon: Icon = FileText,
  selected = false,
  disabled = false,
  actions,
  footer,
  onClick,
  className,
}: FileCardProps) {
  const isInteractive = Boolean(onClick) && !disabled;

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isInteractive ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-pressed={isInteractive ? selected : undefined}
      aria-disabled={disabled}
      aria-label={isInteractive ? `Select ${fileName}` : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border bg-[var(--surface)] p-4 shadow-sm transition-all sm:flex-row sm:items-center",
        "border-[var(--border)]",
        isInteractive && "cursor-pointer hover:shadow-md",
        selected && "border-[var(--accent)] bg-[var(--accent-soft)]/30",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {selected && (
        <span
          className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-white"
          aria-hidden="true"
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      )}

      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--surface-2)]">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <Icon className="h-7 w-7 text-[var(--muted-foreground)]" aria-hidden="true" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-base font-semibold text-[var(--foreground)]">
          {fileName}
        </p>

        {(fileSize || typeof pageCount === "number") && (
          <p className="text-sm text-[var(--muted-foreground)]">
            {fileSize}
            {fileSize && typeof pageCount === "number" && " • "}
            {typeof pageCount === "number" &&
              `${pageCount} ${pageCount === 1 ? "page" : "pages"}`}
          </p>
        )}

        {footer && <div className="mt-1">{footer}</div>}
      </div>

      {actions && (
        <div
          className="flex shrink-0 items-center gap-2"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {actions}
        </div>
      )}
    </motion.div>
  );
}

export default FileCard;