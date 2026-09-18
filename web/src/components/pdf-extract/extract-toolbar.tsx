"use client";

import { motion } from "framer-motion";
import { CheckSquare, Square, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

interface ExtractToolbarProps {
  selectedCount: number;
  totalPages: number;
  isProcessing: boolean;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onReset: () => void;
}

export function ExtractToolbar({
  selectedCount,
  totalPages,
  isProcessing,
  onSelectAll,
  onClearSelection,
  onReset,
}: ExtractToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="text-sm font-semibold text-foreground">
          Select Pages
        </p>
        <p className="text-sm text-muted-foreground">
          Choose which pages to include in the new PDF.
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <p className="text-sm font-medium text-foreground sm:text-right">
          {selectedCount} / {totalPages} Pages
        </p>

        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <motion.button
            type="button"
            onClick={onSelectAll}
            disabled={isProcessing}
            aria-label="Select All"
            whileHover={isProcessing ? undefined : { scale: 1.02 }}
            whileTap={isProcessing ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors",
              "hover:opacity-90",
              "disabled:cursor-not-allowed disabled:opacity-60 "
            )}
          >
            <CheckSquare className="h-4 w-4" aria-hidden="true" />
            Select All
          </motion.button>

          <motion.button
            type="button"
            onClick={onClearSelection}
            disabled={isProcessing}
            aria-label="Clear Selection"
            whileHover={isProcessing ? undefined : { scale: 1.02 }}
            whileTap={isProcessing ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors",
              "hover:bg-background",
              "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-surface"
            )}
          >
            <Square className="h-4 w-4" aria-hidden="true" />
            Clear Selection
          </motion.button>

          <motion.button
            type="button"
            onClick={onReset}
            disabled={isProcessing}
            aria-label="Reset"
            whileHover={isProcessing ? undefined : { scale: 1.02 }}
            whileTap={isProcessing ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors",
              "hover:bg-surface-2",
              "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
            )}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ExtractToolbar;