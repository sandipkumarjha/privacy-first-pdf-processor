"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";

interface OcrProgressProps {
  currentPage: number;
  totalPages: number;
  percentage: number;
  currentStep: string;
  isVisible: boolean;
}

export function OcrProgress({
  currentPage,
  totalPages,
  percentage,
  currentStep,
  isVisible,
}: OcrProgressProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const isCompleted = clampedPercentage >= 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="ocr-progress-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          className="flex w-full flex-col gap-4 rounded-2xl border border-[var(--secondary)] bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/40"
              aria-hidden="true"
            >
              {isCompleted ? (
                <Check className="h-5 w-5 text-[var(--foreground)]" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-[var(--foreground)]" />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Processing PDF
              </p>
              <p className="truncate text-sm text-[var(--muted-foreground)]">
                {isCompleted ? "OCR completed" : currentStep}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={clampedPercentage}
              className="h-2 w-full overflow-hidden rounded-full bg-[var(--background)]"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${clampedPercentage}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-[var(--primary)]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <span>{clampedPercentage}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OcrProgress;