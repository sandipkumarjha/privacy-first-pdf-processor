"use client";

import { motion } from "framer-motion";
import { Scissors, Loader2, Download, Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface ExtractDownloadProps {
  disabled: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  totalPages: number;
  selectedPages: number;
  onExtract: () => void;
  onDownload: () => void;
}

export function ExtractDownload({
  disabled,
  isProcessing,
  isCompleted,
  totalPages,
  selectedPages,
  onExtract,
  onDownload,
}: ExtractDownloadProps) {
  const actionDisabled = disabled || isProcessing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-5 rounded-2xl border border-[var(--secondary)] bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Ready to Extract
        </h2>

        {isCompleted && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--success)]/15 px-3 py-1 text-xs font-semibold text-[var(--success)]"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Ready
          </motion.span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--secondary)] bg-[var(--background)] p-4">
          <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {totalPages}
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Total Pages
          </p>
        </div>

        <div className="rounded-xl border border-[var(--secondary)] bg-[var(--accent)]/20 p-4">
          <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {selectedPages}
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Selected Pages
          </p>
        </div>
      </div>

      {isCompleted ? (
        <motion.button
          type="button"
          onClick={onDownload}
          aria-label="Download Extracted PDF"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors sm:w-auto",
            "hover:brightness-95"
          )}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download Extracted PDF
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onExtract}
          disabled={actionDisabled}
          aria-label={isProcessing ? "Extracting pages" : "Extract Pages"}
          aria-disabled={actionDisabled}
          whileHover={actionDisabled ? undefined : { scale: 1.02 }}
          whileTap={actionDisabled ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors sm:w-auto",
            "hover:brightness-95",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Extracting...
            </>
          ) : (
            <>
              <Scissors className="h-4 w-4" aria-hidden="true" />
              Extract Pages
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}

export default ExtractDownload;