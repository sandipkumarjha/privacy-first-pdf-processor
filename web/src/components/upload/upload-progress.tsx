// components/pdf-upload/upload-progress.tsx

"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { UploadStatus } from "./upload.types";

interface UploadProgressProps {
  status: UploadStatus;
  progress: number; // 0-100
  className?: string;
}

/**
 * Human-readable label per status, kept here since it's purely a
 * presentation concern (not business logic — no decisions are made,
 * just a lookup table).
 */
const STATUS_LABELS: Record<UploadStatus, string> = {
  idle: "Waiting",
  validating: "Validating file…",
  uploading: "Reading file…",
  "generating-preview": "Generating preview…",
  ready: "Ready",
  error: "Failed",
};

/**
 * Renders a labeled progress bar tied to upload status. Automatically
 * hides itself once idle, and swaps to a success checkmark when ready.
 */
function UploadProgressComponent({
  status,
  progress,
  className = "",
}: UploadProgressProps) {
  if (status === "idle") return null;

  const isProcessing =
    status === "validating" || status === "uploading" || status === "generating-preview";
  const isReady = status === "ready";
  const isError = status === "error";

  return (
    <div
      className={`flex w-full flex-col gap-2 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-300">
          <AnimatePresence mode="wait" initial={false}>
            {isProcessing && (
              <motion.span
                key="spinner"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{
                  rotate: { duration: 0.8, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.15 },
                }}
              >
                <Loader2 className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
              </motion.span>
            )}
            {isReady && (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
          {STATUS_LABELS[status]}
        </span>
        {isProcessing && (
          <span className="tabular-nums text-zinc-400" aria-hidden="true">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${isError ? 100 : progress}%`,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`h-full rounded-full ${
            isError
              ? "bg-red-400"
              : isReady
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-orange-400 to-orange-600"
          }`}
        />
      </div>
    </div>
  );
}

export const UploadProgress = memo(UploadProgressComponent);