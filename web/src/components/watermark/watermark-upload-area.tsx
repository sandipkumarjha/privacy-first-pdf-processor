"use client";

import { useCallback, useState, type DragEvent } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { UploadButton } from "@/components/upload/upload-button";
import { cn } from "@/lib/cn";

interface WatermarkUploadAreaProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

function isPdfFile(file: File): boolean {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function getFirstPdfFile(fileList: FileList | File[]): File | undefined {
  return Array.from(fileList).find(isPdfFile);
}

export function WatermarkUploadArea({
  onFileSelect,
  isLoading,
  fileName,
  fileSize,
}: WatermarkUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const hasFile = Boolean(fileName);

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (isLoading) return;
      setIsDragging(true);
    },
    [isLoading]
  );

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (isLoading) return;

      const file = getFirstPdfFile(event.dataTransfer.files);
      if (file) {
        onFileSelect(file);
      }
    },
    [isLoading, onFileSelect]
  );

  /*const handleButtonSelect = useCallback(
    (fileList: FileList | File[]) => {
      const file = getFirstPdfFile(fileList);
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );*/
  const handleButtonSelect = useCallback((files: File[]) => {
    const file = files.find(
        f =>
            f.type === "application/pdf" ||
            f.name.toLowerCase().endsWith(".pdf")
    );

    if (file) {
        onFileSelect(file);
    }
}, [onFileSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isLoading ? undefined : { scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="region"
      aria-label="Upload PDF to watermark"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed",
        "border-[var(--secondary)] bg-blue-200 p-8 text-center shadow-sm sm:p-12",
        isDragging && "scale-[1.02] border-[var(--primary)] bg-[var(--accent)]/15",
        isLoading && "pointer-events-none opacity-70",
        hasFile && "py-6"
      )}
    >
      {hasFile ? (
        <div className="flex w-full max-w-md flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/40">
              <FileText className="h-6 w-6 text-zinc-800" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-800">
                {fileName}
              </p>
              {fileSize && (
                <p className="text-xs text-[var(--muted-foreground)]">
                  {fileSize}
                </p>
              )}
            </div>
          </div>

          <UploadButton
  disabled={isLoading}
  mode="replace"
  label="Replace PDF"
  onFilesSelect={handleButtonSelect}
/>
        </div>
      ) : (
        <>
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFDDB0]"
            aria-hidden="true"
          >
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin text-[var(--foreground)]" />
            ) : (
              <UploadCloud className="h-7 w-7 text-zinc-800" />
            )}
          </span>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-[var(--foreground)]">
              Upload PDF
            </p>
            <p className="text-sm text-zinc-800">
              Drag &amp; Drop or Browse
            </p>
          </div>

          <UploadButton
  disabled={isLoading}
  mode="replace"
  label="Replace PDF"
  onFilesSelect={handleButtonSelect}
/>
        </>
      )}
    </motion.div>
  );
}

export default WatermarkUploadArea;