// components/pdf-upload/pdf-upload.tsx

"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUpload } from "./useUpload";
import { UploadZone } from "./upload-zone";
import { EmptyState } from "./empty-state";
import { FileCard } from "./file-card";
import { PreviewPanel } from "./preview-panel";
import { DEFAULT_VALIDATION_CONFIG } from "./upload.utils";
import type { PdfUploadProps } from "./upload.types";

/**
 * Top-level orchestrator for the PDF upload module.
 *
 * Responsibility: wire useUpload's state/handlers to presentational
 * children. Contains NO business logic itself — every decision
 * (validation, processing, store mutation) lives in useUpload/utils.
 * This component only decides LAYOUT and composition.
 */
export function PdfUpload({
  onFileReady,
  onFileRemove,
  multiple = false,
  validationConfig,
  className = "",
}: PdfUploadProps) {
  const {
    files,
    activeFile,
    isDragging,
    removeFile,
    replaceFile,
    retryFile,
    setIsDragging,
    handleDrop,
    handleBrowseSelect,
    handleFileSelect,
  } = useUpload({ multiple, validationConfig, onFileReady, onFileRemove });

  const resolvedMaxSize =
    validationConfig?.maxFileSizeBytes ?? DEFAULT_VALIDATION_CONFIG.maxFileSizeBytes;

  const handleDragEnter = useCallback(() => setIsDragging(true), [setIsDragging]);
  const handleDragLeave = useCallback(() => setIsDragging(false), [setIsDragging]);

  const hasFiles = files.length > 0;
  const showDropzone = multiple || !hasFiles;

  return (
    <div className={`flex w-full flex-col gap-6 ${className}`}>
      {/* Dropzone: always visible in multi-file mode; hidden once a
          file exists in single-file mode (replaced by FileCard's
          own "Replace" action instead). */}
      {showDropzone && (
        <UploadZone
        isDragging={isDragging}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onBrowseSelect={handleBrowseSelect}
      >
        <EmptyState
          onFileSelect={handleFileSelect}
          maxFileSizeBytes={resolvedMaxSize}
          isDragging={isDragging}
        />
      </UploadZone>
      )}
      {/* File list */}
      {hasFiles && (
        <div className="flex flex-col gap-3" role="list" aria-label="Uploaded files">
          <AnimatePresence initial={false} mode="popLayout">
            {files.map((file) => (
              <div key={file.id} role="listitem">
                <FileCard
                  file={file}
                  isActive={activeFile?.id === file.id}
                  onRemove={removeFile}
                  onReplace={replaceFile}
                  onRetry={retryFile}
                  onSelect={() => {
                    /* selection is handled implicitly on ready via useUpload;
                       exposed here in case future multi-file mode needs
                       explicit "set active" behavior */
                  }}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Preview of the currently active, ready file */}
      <PreviewPanel file={activeFile} />
    </div>
  );
}