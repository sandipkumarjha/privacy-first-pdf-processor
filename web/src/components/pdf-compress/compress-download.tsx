"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Archive,
  Download,
  Loader2,
  CheckCircle2,
  FileText,
  HardDriveDownload,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface CompressDownloadProps {
  isCompressing: boolean;
  isCompleted: boolean;
  disabled: boolean;
  originalSize: number;
  compressedSize?: number | null;
  savedBytes?: number | null;
  compressionRatio?: number | null;
  onCompress: () => void;
  onDownload: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / Math.pow(1024, exponent);

  return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

function formatReduction(compressionRatio: number): string {
  const reduction = Math.max(1 - compressionRatio, 0) * 100;
  return `${Math.round(reduction)}%`;
}

export function CompressDownload({
  isCompressing,
  isCompleted,
  disabled,
  originalSize,
  compressedSize,
  savedBytes,
  compressionRatio,
  onCompress,
  onDownload,
}: CompressDownloadProps) {
  const stats = [
    {
      label: "Original Size",
      value: formatBytes(originalSize),
      icon: FileText,
    },
    {
      label: "Compressed Size",
      value:
        typeof compressedSize === "number" ? formatBytes(compressedSize) : "--",
      icon: Archive,
    },
    {
      label: "Saved",
      value: typeof savedBytes === "number" ? formatBytes(savedBytes) : "--",
      icon: HardDriveDownload,
    },
    {
      label: "Reduction",
      value:
        typeof compressionRatio === "number"
          ? formatReduction(compressionRatio)
          : "--",
      icon: TrendingDown,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-base font-semibold text-foreground">
        Compressed PDF
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Download your optimized PDF.
      </p>

      <div className="mt-6 flex flex-col items-center gap-4 text-center">
        <AnimatePresence mode="wait">
          {isCompressing ? (
            <motion.div
              key="compressing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <Loader2 className="h-8 w-8 animate-spin text-orange-500 dark:text-orange-400" />
              <p className="text-sm font-medium text-foreground">
                Compressing your PDF...
              </p>
            </motion.div>
          ) : isCompleted ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
              <p className="text-sm font-medium text-foreground">
                Compression completed successfully
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-sm text-muted-foreground">
                Ready to compress your PDF.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {isCompleted && (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: index * 0.05,
                  }}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background p-4"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <p className="text-lg font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
          {isCompleted ? (
            <>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDownload}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-colors sm:w-auto",
                  "hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400"
                )}
              >
                <Download className="h-4 w-4" />
                Download Compressed PDF
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCompress}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors sm:w-auto",
                  "hover:bg-muted"
                )}
              >
                <Archive className="h-4 w-4" />
                Compress Again
              </motion.button>
            </>
          ) : (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCompress}
              disabled={disabled || isCompressing}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-colors sm:w-auto",
                "hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              {isCompressing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Archive className="h-4 w-4" />
              )}
              Compress PDF
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CompressDownload;