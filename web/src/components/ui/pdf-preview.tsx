"use client";

import { motion } from "framer-motion";
import { FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

interface PdfPreviewProps {
  src?: string;
  pageNumber?: number;
  pageCount?: number;
  zoom?: number;
  loading?: boolean;
  error?: string | null;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PdfPreview({
  src,
  pageNumber,
  pageCount,
  zoom = 1,
  loading = false,
  error = null,
  toolbar,
  footer,
  children,
  className,
}: PdfPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="region"
      aria-label="PDF Preview"
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border bg-[var(--surface)] border-[var(--border)]",
        className
      )}
    >
      {toolbar && (
        <div className="border-b border-[var(--border)] p-3">{toolbar}</div>
      )}

      <div className="flex min-h-[400px] flex-1 items-center justify-center bg-[var(--surface-2)] p-6 sm:p-10">
        {loading ? (
          <div className="h-full max-h-[75vh] w-full max-w-[900px] animate-pulse rounded-xl bg-[var(--surface)]" />
        ) : error ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20"
              aria-hidden="true"
            >
              <AlertCircle className="h-8 w-8 text-red-600" />
            </span>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Failed to load preview
            </h3>
            <p className="max-w-sm text-sm text-[var(--muted-foreground)]">
              {error}
            </p>
          </div>
        ) : src ? (
          <div className="flex h-full w-full items-center justify-center">
            {children ?? (
              <img
                src={src}
                alt={
                  pageNumber
                    ? `Page ${pageNumber}${pageCount ? ` of ${pageCount}` : ""}`
                    : "PDF preview"
                }
                style={{ transform: `scale(${zoom})` }}
                className="max-h-[75vh] max-w-[900px] rounded-xl bg-white object-contain shadow-md transition-transform duration-200 ease-out"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)]"
              aria-hidden="true"
            >
              <FileText className="h-8 w-8 text-[var(--accent)]" />
            </span>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              No Preview
            </h3>
            <p className="max-w-sm text-sm text-[var(--muted-foreground)]">
              Upload a PDF to preview it.
            </p>
          </div>
        )}
      </div>

      {footer && (
        <div className="border-t border-[var(--border)] p-3">{footer}</div>
      )}
    </motion.div>
  );
}

export default PdfPreview;