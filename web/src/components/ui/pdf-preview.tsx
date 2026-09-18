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
        "flex flex-col overflow-hidden rounded-3xl border bg-surface border-border",
        className
      )}
    >
      {toolbar && (
        <div className="border-b border-border p-3">{toolbar}</div>
      )}

      <div className="flex min-h-[400px] flex-1 items-center justify-center bg-surface-2 p-6 sm:p-10">
        {loading ? (
          <div className="h-full max-h-[75vh] w-full max-w-[900px] animate-pulse rounded-xl bg-surface" />
        ) : error ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-soft"
              aria-hidden="true"
            >
              <AlertCircle className="h-8 w-8 text-danger" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              Failed to load preview
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
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
                className="max-h-[75vh] max-w-[900px] rounded-xl bg-surface object-contain shadow-md transition-transform duration-200 ease-out"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft"
              aria-hidden="true"
            >
              <FileText className="h-8 w-8 text-foreground" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              No Preview
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Upload a PDF to preview it.
            </p>
          </div>
        )}
      </div>

      {footer && (
        <div className="border-t border-border p-3">{footer}</div>
      )}
    </motion.div>
  );
}

export default PdfPreview;