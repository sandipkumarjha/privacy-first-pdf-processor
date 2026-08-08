"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ScanText, Loader2, Check, Download } from "lucide-react";
import { cn } from "@/lib/cn";

interface OcrDownloadProps {
  disabled: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  totalPages: number;
  selectedPages: number;
  onRunOcr: () => void;
  onDownload: () => void;
}

export function OcrDownload({
  disabled,
  isProcessing,
  isCompleted,
  totalPages,
  selectedPages,
  onRunOcr,
  onDownload,
}: OcrDownloadProps) {
  const runDisabled = disabled || isProcessing || selectedPages === 0;
  const downloadDisabled = disabled || !isCompleted;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[var(--secondary)] bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-[var(--foreground)]">
        {selectedPages} of {totalPages} pages selected
      </p>

      <AnimatePresence mode="wait">
        {isCompleted ? (
          <motion.button
            key="download"
            type="button"
            onClick={onDownload}
            disabled={downloadDisabled}
            aria-disabled={downloadDisabled}
            aria-label="Download OCR PDF"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            whileHover={downloadDisabled ? undefined : { scale: 1.02 }}
            whileTap={downloadDisabled ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors sm:w-auto",
              "hover:brightness-95",
              "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
            )}
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            <Download className="h-4 w-4" aria-hidden="true" />
            Download OCR PDF
          </motion.button>
        ) : (
          <motion.button
            key="run-ocr"
            type="button"
            onClick={onRunOcr}
            disabled={runDisabled}
            aria-disabled={runDisabled}
            aria-label={isProcessing ? "Processing OCR" : "Extract Text"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            whileHover={runDisabled ? undefined : { scale: 1.02 }}
            whileTap={runDisabled ? undefined : { scale: 0.98 }}
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
                Processing...
              </>
            ) : (
              <>
                <ScanText className="h-4 w-4" aria-hidden="true" />
                Extract Text
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OcrDownload;