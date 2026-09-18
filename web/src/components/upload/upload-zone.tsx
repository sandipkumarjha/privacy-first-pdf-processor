"use client";

import { memo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/cn";


interface UploadZoneProps {
  isDragging: boolean;
  disabled?: boolean;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onBrowseSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

const ACCEPTED_INPUT_TYPES = "application/pdf,.pdf";

/**
 * Pure presentational dropzone. All drag/drop and file-selection LOGIC
 * lives in useUpload; this component only wires DOM events to the
 * handlers it receives and renders visual state.
 */
function UploadZoneComponent({
  isDragging,
  disabled = false,
  onDrop,
  onDragEnter,
  onDragLeave,
  onBrowseSelect,
  className = "",
  children,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!disabled) onDragEnter();
    },
    [disabled, onDragEnter]
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      // Only fire leave when actually exiting the zone, not its children.
      if (event.currentTarget.contains(event.relatedTarget as Node)) return;
      if (!disabled) onDragLeave();
    },
    [disabled, onDragLeave]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (disabled) return;
      onDrop(event);
    },
    [disabled, onDrop]
  );

  const handleZoneClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled]
  );

  return (
    <motion.div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label="Upload PDF file. Drag and drop or press Enter to browse."
      onClick={handleZoneClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
className={cn(
        "group relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden",
        "rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-12 text-center sm:py-16",
        "transition-[border-color,background-color,box-shadow] duration-200 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-foreground/50 hover:bg-surface-2/60",
        isDragging && "border-solid border-foreground bg-accent-soft elevate-md",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_INPUT_TYPES}
        onChange={onBrowseSelect}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      <motion.div
        animate={{ y: isDragging ? -4 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex flex-col items-center gap-3"
      >
        
  

        <span
          className="flex size-14 items-center justify-center rounded-2xl border border-border bg-surface elevate-sm"
          aria-hidden="true"
        >
          <UploadCloud className="size-6 text-foreground" strokeWidth={1.75} />
        </span>

        {children}
      </motion.div>
    </motion.div>
  );
}

export const UploadZone = memo(UploadZoneComponent);