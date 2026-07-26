"use client";

import { useCallback, useState, type DragEvent } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText } from "lucide-react";
import { UploadButton } from "@/components/upload/upload-button";
import { cn } from "@/lib/cn";

interface CompressUploadAreaProps {
  fileName?: string;
  fileSize?: string;
  isLoading: boolean;
  onFileSelect: (file: File) => void;
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

export function CompressUploadArea({
  fileName,
  fileSize,
  isLoading,
  onFileSelect,
}: CompressUploadAreaProps) {
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

  const handleButtonSelect = useCallback(
    (fileList: FileList | File[]) => {
      const file = getFirstPdfFile(fileList);
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-12 text-center transition-colors",
        isDragging && "border-primary bg-muted/60",
        isLoading && "pointer-events-none opacity-70",
        hasFile && "py-6"
      )}
    >
      {hasFile ? (
        <div className="flex w-full max-w-md flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="h-8 w-8 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {fileName}
              </p>
              {fileSize && (
                <p className="text-xs text-muted-foreground">{fileSize}</p>
              )}
            </div>
          </div>

          <UploadButton
            accept="application/pdf"
            disabled={isLoading}
            mode="replace"
            label="Replace"
            onFilesSelected={handleButtonSelect}
          />
        </div>
      ) : (
        <>
          <UploadCloud className="h-8 w-8 text-muted-foreground" />

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Compress your PDF
            </p>
            <p className="text-xs text-muted-foreground">
              Drag & Drop or browse a PDF file
            </p>
          </div>

          <UploadButton
            accept="application/pdf"
            disabled={isLoading}
            label="Browse PDF"
            onFilesSelected={handleButtonSelect}
          />
        </>
      )}
    </motion.div>
  );
}

export default CompressUploadArea;