"use client";

import { motion } from "framer-motion";
import { usePdfCompress } from "@/hooks/use-pdf-compress";
import {
  CompressHeader,
  CompressUploadArea,
  CompressionSelector,
  CompressionStats,
  CompressToolbar,
  CompressDownload,
} from "@/components/pdf-compress";

export default function CompressPage() {
  const {
    file,
    status,
    compressionLevel,
    originalSize,
    compressedSize,
    savedBytes,
    compressionRatio,
    compressedBytes,
    error,
    setCompressionLevel,
    loadPdf,
    compress,
    download,
    reset,
  } = usePdfCompress();

  const isLoading = status === "loading";
  const isCompressing = status === "compressing";
  const isCompleted = status === "completed";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <CompressHeader />

      {!file ? (
        <CompressUploadArea
          onFileSelect={loadPdf}
          isLoading={isLoading}
        />
      ) : (
        <>
          <CompressionSelector
            value={compressionLevel}
            onChange={setCompressionLevel}
          />

          <CompressionStats
            originalSize={originalSize}
            compressedSize={compressedSize}
            savedBytes={savedBytes}
            compressionRatio={compressionRatio}
            isCompressed={isCompleted}
          />

          <CompressToolbar
            disabled={isLoading}
            isCompressing={isCompressing}
            progress={isCompleted ? 100 : 0}
            onCompress={compress}
            onReset={reset}
          />

          <CompressDownload
            disabled={!compressedBytes}
            isCompressing={isCompressing}
            isCompleted={isCompleted}
            originalSize={originalSize}
            compressedSize={compressedSize}
            savedBytes={savedBytes}
            compressionRatio={compressionRatio}
            onCompress={compress}
            onDownload={download}
          />
        </>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="alert"
          className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}