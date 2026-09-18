"use client";

import { motion } from "framer-motion";
import { Stamp, Loader2, Download, Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface WatermarkDownloadProps {
  disabled: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  totalPages: number;
  selectedPages: number;
  onApply: () => void;
  onDownload: () => void;
}

export function WatermarkDownload({
  disabled,
  isProcessing,
  isCompleted,
  totalPages,
  selectedPages,
  onApply,
  onDownload,
}: WatermarkDownloadProps) {
  const actionDisabled = disabled || isProcessing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-foreground">
          Ready to Save
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
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-2xl font-bold tracking-tight text-foreground">
            {totalPages}
          </p>
          <p className="text-sm text-muted-foreground">
            Total Pages
          </p>
        </div>

        <div className="rounded-xl border border-border bg-accent-soft p-4">
          <p className="text-2xl font-bold tracking-tight text-foreground">
            {selectedPages}
          </p>
          <p className="text-sm text-muted-foreground">
            Selected Pages
          </p>
        </div>
      </div>

      {isCompleted ? (
        <motion.button
          type="button"
          onClick={onDownload}
          aria-label="Download Watermarked PDF"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors sm:w-auto",
            "hover:opacity-90"
          )}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download Watermarked PDF
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onApply}
          disabled={actionDisabled}
          aria-label={isProcessing ? "Applying watermark" : "Apply Watermark"}
          aria-disabled={actionDisabled}
          whileHover={actionDisabled ? undefined : { scale: 1.02 }}
          whileTap={actionDisabled ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors sm:w-auto",
            "hover:opacity-90",
            "disabled:cursor-not-allowed disabled:opacity-60 "
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Applying...
            </>
          ) : (
            <>
              <Stamp className="h-4 w-4" aria-hidden="true" />
              Apply Watermark
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}

export default WatermarkDownload;