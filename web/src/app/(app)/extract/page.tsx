"use client";

import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { usePdfExtract } from "@/hooks/use-pdf-extract";
import { PageHeader } from "@/components/ui/page-header";
import {
  ExtractUploadArea,
  ExtractToolbar,
  ExtractPageGrid,
  ExtractDownload,
} from "@/components/pdf-extract";

export default function ExtractPage() {
  const {
    file,
    pages,
    selectedPages,
    status,
    error,
    loadPdf,
    togglePage,
    selectAll,
    clearSelection,
    extractPages,
    download,
    reset,
  } = usePdfExtract();

  const isLoading = status === "loading";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col text-zinc-800 gap-8 px-5 py-10 md:px-8">
      <PageHeader
        title="Extract PDF"
        description="Extract selected pages into a brand-new PDF. Everything happens locally in your browser."
        icon={Scissors}
        badge="100% Local"
      />

      {!file ? (
        
        <ExtractUploadArea onFileSelect={loadPdf} isLoading={isLoading} /> 
      ) : (
        <>
          <ExtractToolbar
            selectedCount={selectedPages.length}
            totalPages={pages.length}
            isProcessing={status === "processing"}
            onSelectAll={selectAll}
            onClearSelection={clearSelection}
            onReset={reset}
          />

          <ExtractPageGrid
            pages={pages}
            selectedPages={selectedPages}
            onToggleSelect={togglePage}
          />

          <ExtractDownload
            disabled={selectedPages.length === 0}
            isProcessing={status === "processing"}
            isCompleted={status === "completed"}
            totalPages={pages.length}
            selectedPages={selectedPages.length}
            onExtract={extractPages}
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