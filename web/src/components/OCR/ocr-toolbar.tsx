"use client";

import { motion } from "framer-motion";
import { CheckSquare, X, ScanText, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface OcrToolbarProps {
  totalPages: number;
  selectedPages: number;
  isProcessing: boolean;
  disabled?: boolean;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onRunOcr: () => void;
}

export function OcrToolbar({
  totalPages,
  selectedPages,
  isProcessing,
  disabled = false,
  onSelectAll,
  onClearSelection,
  onRunOcr,
}: OcrToolbarProps) {
  const controlsDisabled = disabled || isProcessing;
  const runDisabled = controlsDisabled || selectedPages === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-2xl border border-[var(--secondary)] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm font-medium text-[var(--foreground)]">
        {selectedPages} of {totalPages} pages selected
      </p>

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <motion.button
          type="button"
          onClick={onSelectAll}
          disabled={controlsDisabled}
          aria-disabled={controlsDisabled}
          aria-label="Select All"
          whileHover={controlsDisabled ? undefined : { scale: 1.02 }}
          whileTap={controlsDisabled ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--secondary)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors",
            "hover:bg-[var(--background)]",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white"
          )}
        >
          <CheckSquare className="h-4 w-4" aria-hidden="true" />
          Select All
        </motion.button>

        <motion.button
          type="button"
          onClick={onClearSelection}
          disabled={controlsDisabled}
          aria-disabled={controlsDisabled}
          aria-label="Clear Selection"
          whileHover={controlsDisabled ? undefined : { scale: 1.02 }}
          whileTap={controlsDisabled ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors",
            "hover:bg-[var(--accent)]/30",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
          )}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Clear Selection
        </motion.button>

        <motion.button
          type="button"
          onClick={onRunOcr}
          disabled={runDisabled}
          aria-disabled={runDisabled}
          aria-label={isProcessing ? "Processing OCR" : "Extract Text"}
          whileHover={runDisabled ? undefined : { scale: 1.02 }}
          whileTap={runDisabled ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors",
            "hover:brightness-95",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Processing...
            </>
          ) : (
            <>
              <ScanText className="h-4 w-4" aria-hidden="true" />
              Extract Text
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default OcrToolbar;