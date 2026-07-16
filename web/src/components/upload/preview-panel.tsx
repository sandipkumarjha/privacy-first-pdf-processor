// components/pdf-upload/preview-panel.tsx

"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Lock, ShieldCheck } from "lucide-react";
import { formatFileSize } from "./upload.utils";
import type { UploadedFile } from "./upload.types";

interface PreviewPanelProps {
  file: UploadedFile | null;
  className?: string;
}

/**
 * Renders a summary preview for the active, ready-to-process file.
 * Purely presentational — reads directly off the UploadedFile entity,
 * makes no decisions, calls no business logic.
 */
function PreviewPanelComponent({ file, className = "" }: PreviewPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {file && file.status === "ready" && (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`
            flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-5
            dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-start
            ${className}
          `}
          role="region"
          aria-label={`Preview of ${file.fileName}`}
        >
          {/* Thumbnail hero */}
          <div className="mx-auto flex h-48 w-36 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-800 sm:mx-0">
            {file.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element -- local blob URL
              <img
                src={file.thumbnail.objectUrl}
                alt={`Preview of first page of ${file.fileName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <FileText className="h-8 w-8 text-zinc-300" aria-hidden="true" />
            )}
          </div>

          {/* Metadata + status */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div>
              <h3
                className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50"
                title={file.fileName}
              >
                {file.fileName}
              </h3>
              <p className="text-sm text-zinc-400">
                {formatFileSize(file.fileSizeBytes)}
                {file.metadata?.pageCount
                  ? ` · ${file.metadata.pageCount} page${file.metadata.pageCount === 1 ? "" : "s"}`
                  : ""}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {file.metadata?.title && (
                <div className="col-span-2 min-w-0">
                  <dt className="text-zinc-400">Title</dt>
                  <dd className="truncate text-zinc-700 dark:text-zinc-300" title={file.metadata.title}>
                    {file.metadata.title}
                  </dd>
                </div>
              )}
              {file.metadata?.author && (
                <div className="col-span-2 min-w-0">
                  <dt className="text-zinc-400">Author</dt>
                  <dd className="truncate text-zinc-700 dark:text-zinc-300" title={file.metadata.author}>
                    {file.metadata.author}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Ready for processing
              </span>

              {file.metadata?.isEncrypted && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Encrypted
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                Processed locally · never uploaded
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const PreviewPanel = memo(PreviewPanelComponent);