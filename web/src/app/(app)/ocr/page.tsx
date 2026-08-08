"use client";

import { motion } from "framer-motion";
import { ScanText } from "lucide-react";
import { usePdfOcr } from "@/hooks/use-pdf-ocr";

import {
  OcrUploadArea,
  OcrSettings,
  OcrToolbar,
  OcrPageGrid,
  OcrProgress,
  OcrDownload,
} from "@/components/OCR";

function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB"];

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, exponent);

  return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

export default function OcrPage() {
  const {
    file,
    pages,
    language,
    error,
    isLoading,
    isProcessing,
    isCompleted,
    progress,
    loadPdf,
    setLanguage,
    togglePage,
    selectAll,
    clearSelection,
    runOcr,
    download,
    reset,
  } = usePdfOcr();

  const selectedPageCount = pages.filter(
    (page) => page.selected
  ).length;

  return (
    <div className="flex w-full flex-col gap-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10">
            <ScanText
              className="h-6 w-6 text-[var(--primary)]"
              aria-hidden="true"
            />
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              OCR
            </h1>

            <p className="text-sm text-[var(--muted-foreground)]">
              Extract text from scanned PDFs while keeping your files
              private.
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--muted-foreground)]">
          All processing happens locally on your device.
        </p>
      </div>

      {/* Upload */}
      <OcrUploadArea
        onFileSelect={loadPdf}
        isLoading={isLoading}
        fileName={file?.name}
        fileSize={file ? formatFileSize(file.size) : undefined}
      />

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="alert"
          className="rounded-2xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
        >
          {error}
        </motion.div>
      )}

      {/* OCR Settings */}
      <OcrSettings
        language={language}
        onLanguageChange={setLanguage}
        disabled={isLoading || isProcessing}
      />

      {/* Page Grid */}
      {pages.length > 0 && (
        <OcrPageGrid
          pages={pages}
          disabled={isLoading || isProcessing}
          onTogglePage={togglePage}
        />
      )}

      {/* Toolbar */}
      {file && (
        <OcrToolbar
          totalPages={pages.length}
          selectedPages={selectedPageCount}
          isProcessing={isProcessing}
          disabled={!file}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onRunOcr={runOcr}
        />
      )}

      {/* Progress */}
      <OcrProgress
        currentPage={progress.currentPage}
        totalPages={progress.totalPages}
        percentage={progress.percentage}
        currentStep={progress.currentStep}
        isVisible={isProcessing || isCompleted}
      />

      {/* Download */}
      <OcrDownload
        disabled={!file}
        isProcessing={isProcessing}
        isCompleted={isCompleted}
        totalPages={pages.length}
        selectedPages={selectedPageCount}
        onRunOcr={runOcr}
        onDownload={download}
      />

      {/* Reset */}
      {isCompleted && (
        <button
          type="button"
          onClick={reset}
          className="self-start rounded-xl border border-[var(--secondary)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition-colors hover:bg-[var(--background)]"
        >
          Start Over
        </button>
      )}
    </div>
  );
}