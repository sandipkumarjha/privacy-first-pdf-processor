"use client";

import { motion } from "framer-motion";
import { RotateCcw, RotateCw, RefreshCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface RotateToolbarProps {
  selectedCount: number;
  isProcessing: boolean;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
}

export function RotateToolbar({
  selectedCount,
  isProcessing,
  onRotateLeft,
  onRotateRight,
  onReset,
}: RotateToolbarProps) {
  const hasSelection = selectedCount > 0;
  const rotateDisabled = isProcessing || !hasSelection;

  const selectionLabel =
    selectedCount === 0
      ? "No pages selected"
      : `${selectedCount} ${selectedCount === 1 ? "page" : "pages"} selected`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-stretch gap-4 rounded-2xl border border-[var(--secondary)] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm font-medium text-[var(--foreground)]">
        {selectionLabel}
      </p>

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <motion.button
          type="button"
          onClick={onRotateLeft}
          disabled={rotateDisabled}
          aria-label="Rotate Left"
          whileHover={rotateDisabled ? undefined : { scale: 1.02 }}
          whileTap={rotateDisabled ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors",
            "hover:brightness-95",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
          )}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          )}
          Rotate Left
        </motion.button>

        <motion.button
          type="button"
          onClick={onRotateRight}
          disabled={rotateDisabled}
          aria-label="Rotate Right"
          whileHover={rotateDisabled ? undefined : { scale: 1.02 }}
          whileTap={rotateDisabled ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors",
            "hover:brightness-95",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
          )}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RotateCw className="h-4 w-4" aria-hidden="true" />
          )}
          Rotate Right
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
            "inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors",
            "hover:bg-[var(--accent)]/30",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
          )}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          )}
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}

export default RotateToolbar;