"use client";

import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { usePdfRotate } from "@/hooks/use-pdf-rotate";
import { PageHeader } from "@/components/ui/page-header";
import {
  RotateUploadArea,
  RotateToolbar,
  RotatePageGrid,
  RotateDownload,
} from "@/components/pdf-rotate";

export default function RotatePage() {
  const {
    file,
    status,
    pages,
    selectedPages,
    error,
    loadPdf,
    rotateLeft,
    rotateRight,
    download,
    reset,
  } = usePdfRotate();

  const isLoading = status === "loading";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 md:px-8">
      <PageHeader
        title="Rotate PDF"
        description="Rotate individual pages or the entire document. Everything happens locally inside your browser."
        icon={RotateCw}
        badge="100% Local"
      />

      {!file ? (
        <RotateUploadArea onFileSelect={loadPdf} isLoading={isLoading} />
      ) : (
        <>
          <RotateToolbar
            selectedPages={selectedPages}
            status={status}
            onRotateLeft={rotateLeft}
            onRotateRight={rotateRight}
            onReset={reset}
          />

          <RotatePageGrid
            pages={pages}
            selectedPages={selectedPages}
          />

          <RotateDownload
            status={status}
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
          className="rounded-2xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}