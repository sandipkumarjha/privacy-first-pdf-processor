"use client";

import { useCallback, useState, type DragEvent } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { UploadButton } from "@/components/upload/upload-button";
import { cn } from "@/lib/cn";

interface RotateUploadAreaProps {
  onFileSelect: (file: File) => void | Promise<void>;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

function isPdfFile(file: File) {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function getFirstPdfFile(files: FileList | File[]) {
  return Array.from(files).find(isPdfFile);
}

export function RotateUploadArea({
  onFileSelect,
  isLoading,
  fileName,
  fileSize,
}: RotateUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const hasFile = !!fileName;

  const processFile = useCallback(
    async (file?: File) => {
      if (!file || isLoading) return;

      console.log("✅ PDF Selected:", file.name);

      try {
        await onFileSelect(file);
      } catch (err) {
        console.error("RotateUploadArea:", err);
      }
    },
    [isLoading, onFileSelect]
  );

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = getFirstPdfFile(e.dataTransfer.files);

      await processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!isLoading) {
        setIsDragging(true);
      }
    },
    [isLoading]
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

 /* const handleFilesSelected = useCallback(
    async (files: FileList | File[]) => {
      const file = getFirstPdfFile(files);

      await processFile(file);
    },
    [processFile]
  );*/
  const handleButtonSelect = useCallback(
    async (file: File) => {
      console.log("PDF Selected:", file);
  
      await onFileSelect(file);
    },
    [onFileSelect]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isLoading ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.25 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed p-10 shadow-sm transition-all",
        "border-[#FFBE91] bg-blue-200",
        isDragging && "border-[#CFEBFF] bg-[#CFEBFF]/30",
        isLoading && "pointer-events-none opacity-60"
      )}
    >
      {hasFile ? (
        <>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#FFDDB0] p-3">
              <FileText className="h-7 w-7 text-orange-600" />
            </div>

            <div>
              <p className="font-semibold">{fileName}</p>

              {fileSize && (
                <p className="text-sm text-gray-500">
                  {fileSize}
                </p>
              )}
            </div>
          </div>

          <UploadButton
  disabled={isLoading}
  mode="replace"
  label="Replace PDF"
  onFileSelect={handleButtonSelect}
/>
        </>
      ) : (
        <>
          <div className="rounded-full bg-[#FFDDB0] p-5">
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            ) : (
              <UploadCloud className="h-8 w-8 text-orange-600" />
            )}
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold">
              Upload PDF to Rotate
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Drag & Drop your PDF or browse from your device.
            </p>
          </div>

          <UploadButton
  disabled={isLoading}
  mode="replace"
  label="Replace PDF"
  onFileSelect={handleButtonSelect}
/>
        </>
      )}
    </motion.div>
  );
}

export default RotateUploadArea;