// components/pdf-upload/file-card.tsx

"use client";

import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle, FileText, RotateCcw, X } from "lucide-react";
import { UploadProgress } from "./upload-progress";
import { UploadButton } from "./upload-button";
import { formatFileSize } from "./upload.utils";
import type { UploadedFile } from "./upload.types";

interface FileCardProps {
  file: UploadedFile;
  isActive?: boolean;
  onRemove: (fileId: string) => void;
  onReplace: (fileId: string, newFile: File) => void;
  onRetry: (fileId: string) => void;
  onSelect?: (fileId: string) => void;
  className?: string;
}

/**
 * Displays a single file's thumbnail, metadata, progress, and actions.
 * All callbacks are forwarded from useUpload via the parent orchestrator —
 * this component only decides WHAT to call, never HOW.
 */
function FileCardComponent({
  file,
  isActive = false,
  onRemove,
  onReplace,
  onRetry,
  onSelect,
  className = "",
}: FileCardProps) {
  const isError = file.status === "error";
  const isReady = file.status === "ready";

  const handleRemoveClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onRemove(file.id);
    },
    [file.id, onRemove]
  );

  const handleReplaceSelect = useCallback(
    (newFile: File) => {
      onReplace(file.id, newFile);
    },
    [file.id, onReplace]
  );

  const handleRetryClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onRetry(file.id);
    },
    [file.id, onRetry]
  );

  const handleCardClick = useCallback(() => {
    if (isReady) onSelect?.(file.id);
  }, [isReady, file.id, onSelect]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={handleCardClick}
      role={isReady ? "button" : "group"}
      tabIndex={isReady ? 0 : undefined}
      aria-label={`${file.fileName}, ${formatFileSize(file.fileSizeBytes)}`}
      className={`
        group relative flex items-start gap-4 rounded-xl border p-4
        bg-white dark:bg-zinc-900
        transition-colors
        ${isError ? "border-red-200 dark:border-red-500/30" : "border-zinc-200 dark:border-zinc-800"}
        ${isActive ? "ring-2 ring-orange-500 ring-offset-2" : ""}
        ${isReady ? "cursor-pointer hover:border-orange-300" : ""}
        ${className}
      `}
    >
      {/* Thumbnail / fallback icon */}
      <div className="flex h-16 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800">
        {file.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element -- local blob URL, not a remote/optimizable image
          <img
            src={file.thumbnail.objectUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : isError ? (
          <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
        ) : (
          <FileText className="h-5 w-5 text-zinc-400" aria-hidden="true" />
        )}
      </div>

      {/* Info + progress */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100"
              title={file.fileName}
            >
              {file.fileName}
            </p>
            <p className="text-xs text-zinc-400">
              {formatFileSize(file.fileSizeBytes)}
              {file.metadata?.pageCount
                ? ` · ${file.metadata.pageCount} page${file.metadata.pageCount === 1 ? "" : "s"}`
                : ""}
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center gap-1">
            {isReady && (
              <UploadButton
                onFileSelect={handleReplaceSelect}
                mode="replace"
                variant="ghost"
                label=""
                className="!p-2"
              />
            )}
            <button
              type="button"
              onClick={handleRemoveClick}
              aria-label={`Remove ${file.fileName}`}
              className="rounded-lg p-2 text-zinc-400 outline-none transition-colors hover:bg-zinc-100 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-zinc-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isError && file.error ? (
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              {file.error.message}
            </p>
            <button
              type="button"
              onClick={handleRetryClick}
              className="flex flex-shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-orange-600 outline-none hover:bg-orange-50 focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:bg-orange-500/10"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Retry
            </button>
          </div>
        ) : (
          <UploadProgress status={file.status} progress={file.progress} />
        )}
      </div>
    </motion.div>
  );
}

export const FileCard = memo(FileCardComponent);