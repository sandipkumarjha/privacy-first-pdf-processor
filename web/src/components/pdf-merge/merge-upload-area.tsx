"use client";

import { useCallback, useState, type DragEvent } from "react";
import { Loader2, FileUp } from "lucide-react";
import { UploadButton } from "@/components/upload/upload-button";
import { cn } from "@/lib/cn";

interface MergeUploadAreaProps {
  onFilesSelect: (files: File[]) => void;
  isLoading?: boolean;
  className?: string;
}

function filterPdfFiles(fileList: FileList | File[]): File[] {
  return Array.from(fileList).filter(
    (file) =>
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
  );
}

export function MergeUploadArea({
  onFilesSelect,
  isLoading = false,
  className,
}: MergeUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

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

      const files = filterPdfFiles(event.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelect(files);
      }
    },
    [isLoading, onFilesSelect]
  );

  const handleButtonSelect = useCallback(
    (files: File[]) => {
      const pdfFiles = filterPdfFiles(files);
  
      if (pdfFiles.length > 0) {
        onFilesSelect(pdfFiles);
      }
    },
    [onFilesSelect]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-blue-200 px-6 py-12 text-center transition-colors",
        isDragging && "border-primary bg-primary/10",
        isLoading && "pointer-events-none opacity-70",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      ) : (
        <FileUp className="h-8 w-8 text-zinc-700" />
      )}

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {isLoading
            ? "Loading files..."
            : "Drag and drop PDF files here"}
        </p>
        <p className="text-xs text-zinc-700">
          or select multiple PDF files from your device
        </p>
      </div>

      <UploadButton
  multiple
  disabled={isLoading}
  onFilesSelect={handleButtonSelect}
  variant="primary"
  mode="upload"
  label="Browse PDFs"
/>
       
    </div>
  );
}

export default MergeUploadArea;