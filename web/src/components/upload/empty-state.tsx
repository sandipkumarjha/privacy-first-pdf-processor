// components/pdf-upload/empty-state.tsx

"use client";

import { memo } from "react";
import { ShieldCheck } from "lucide-react";
import { UploadButton } from "./upload-button";
import { formatFileSize } from "./upload.utils";

interface EmptyStateProps {
  onFileSelect: (file: File) => void;
  maxFileSizeBytes: number;
  isDragging?: boolean;
  className?: string;
}

/**
 * Zero-state copy + CTA shown inside UploadZone before any file exists.
 * Purely presentational — the onFileSelect callback is forwarded
 * straight through to useUpload().handleBrowseSelect by the parent.
 */
function EmptyStateComponent({
  onFileSelect,
  maxFileSizeBytes,
  isDragging = false,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {isDragging ? "Drop your PDF here" : "Drag & drop a PDF here"}
        </p>
        <p className="text-sm text-zinc-400">
          or click to browse from your device
        </p>
      </div>

      {/* Stop propagation so clicking the button doesn't also fire the
          UploadZone's own onClick, which would open a second file dialog. */}
      <div onClick={(e) => e.stopPropagation()}>
        <UploadButton
          onFileSelect={onFileSelect}
          variant="primary"
          mode="upload"
          label="Choose file"
        />
      </div>

      <div className="flex flex-col items-center gap-1 pt-1">
        <p className="text-xs text-zinc-400">
          PDF only · Up to {formatFileSize(maxFileSizeBytes)}
        </p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          100% private — files never leave your device
        </p>
      </div>
    </div>
  );
}

export const EmptyState = memo(EmptyStateComponent);