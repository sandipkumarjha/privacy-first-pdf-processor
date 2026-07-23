// components/pdf-upload/upload-zone.tsx

"use client";

import { memo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";


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
      animate={{
        scale: isDragging ? 1.01 : 1,
        borderColor: isDragging
          ? "var(--upload-zone-active-border, #f97316)"
          : "var(--upload-zone-border, #d4d4d8)",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`
        relative flex w-full flex-col items-center justify-center
        rounded-2xl border-2 border-dashed
        bg-white/50 dark:bg-zinc-900/40
        px-6 py-12 sm:py-16
        text-center cursor-pointer
        outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2
        transition-colors
        ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-orange-400"}
        ${isDragging ? "bg-orange-50/60 dark:bg-orange-950/20" : ""}
        ${className}
      `}
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
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10"
          aria-hidden="true"
        >
          <UploadCloud className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </span>

        {children}
      </motion.div>
    </motion.div>
  );
}

export const UploadZone = memo(UploadZoneComponent);