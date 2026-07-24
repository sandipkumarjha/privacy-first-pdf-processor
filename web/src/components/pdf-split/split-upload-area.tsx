"use client";

import { FileText, Upload, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { UploadButton } from "@/components/upload/upload-button";

interface SplitUploadAreaProps {
  fileName?: string;
  fileSize?: string;
  isLoading: boolean;
  onFileSelect: (file: File) => void;
}

export default function SplitUploadArea({
  fileName,
  fileSize,
  isLoading,
  onFileSelect,
}: SplitUploadAreaProps) {
  const handleFileSelect = (file: File) => {
    console.log("✅ SplitUploadArea:", file.name);
    onFileSelect(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const hasFile = Boolean(fileName);

  if (!hasFile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-zinc-200 bg-white px-6 py-14 text-center transition-colors hover:border-orange-300 dark:border-zinc-800 dark:bg-zinc-900 sm:py-20"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
          <Upload className="h-6 w-6 text-orange-600 dark:text-orange-400" aria-hidden="true" />
        </span>

        <div className="flex flex-col items-center gap-1.5">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Upload PDF to Split
          </p>
          <p className="text-sm text-zinc-400">Drag & Drop supported</p>
        </div>

        <UploadButton
          onFileSelect={handleFileSelect}
          variant="primary"
          mode="upload"
          label="Browse files"
          disabled={isLoading}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10">
        <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" aria-hidden="true" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50" title={fileName}>
          {fileName}
        </p>
        {fileSize && <p className="text-xs text-zinc-400">{fileSize}</p>}
      </div>

      <UploadButton
        onFileSelect={handleFileSelect}
        variant="secondary"
        mode="replace"
        label="Replace"
        disabled={isLoading}
        className="flex-shrink-0"
      />
    </motion.div>
  );
}