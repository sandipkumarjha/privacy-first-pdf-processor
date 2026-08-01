"use client";

import { motion } from "framer-motion";
import { Stamp } from "lucide-react";
import { usePdfWatermark } from "@/hooks/use-pdf-watermark";
import { PageHeader } from "@/components/ui/page-header";
import {
  WatermarkUploadArea,
  WatermarkToolbar,
  WatermarkPageGrid,
  WatermarkDownload,
} from "@/components/watermark";

export default function WatermarkPage() {
  const {
    file,
    status,
    pages,
    settings,
    error,
    loadPdf,
    togglePage,
    selectAll,
    clearSelection,
    updateSettings,
    applyWatermark,
    download,
    reset,
  } = usePdfWatermark();

  const isLoading = status === "loading";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 md:px-8">
      <PageHeader
        title="Watermark PDF"
        description="Add custom text watermarks directly in your browser. Everything stays private and never leaves your device."
        icon={Stamp}
        badge="100% Local"
      />

      {!file ? (
        <WatermarkUploadArea onFileSelect={loadPdf} isLoading={isLoading} />
      ) : (
        <>
          <WatermarkToolbar
            settings={settings}
            isProcessing={status === "processing"}
            onSettingsChange={updateSettings}
            onReset={reset}
          />

          <WatermarkPageGrid pages={pages} onToggleSelect={togglePage} />

          <WatermarkDownload
            disabled={pages.every((page) => !page.selected)}
            isProcessing={status === "processing"}
            isCompleted={status === "completed"}
            totalPages={pages.length}
            selectedPages={pages.filter((page) => page.selected).length}
            onApply={applyWatermark}
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