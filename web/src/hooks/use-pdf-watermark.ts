"use client";

import { useState, useCallback } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  useWatermarkStore,
  type WatermarkStatus,
  type WatermarkPage,
  type WatermarkSettings,
} from "@/store/watermark";
import { validatePdf } from "@/lib/pdf/watermark/watermark-validation";
import { loadPdfDocument } from "@/lib/pdf/split/pdf-loader";
import { generatePageThumbnails } from "@/lib/pdf/watermark/thumbnail";
import {
  watermarkPdf,
  WatermarkEngineError,
} from "@/lib/pdf/watermark/watermark-engine";
import { downloadWatermarkedPdf } from "@/lib/pdf/watermark/download";

interface UsePdfWatermarkResult {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pages: WatermarkPage[];
  status: WatermarkStatus;
  error: string | null;
  resultBytes: Uint8Array | null;
  settings: WatermarkSettings;
  isLoading: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  loadPdf: (file: File) => Promise<void>;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  updateSettings: (settings: Partial<WatermarkSettings>) => void;
  applyWatermark: () => Promise<void>;
  download: (filename?: string) => void;
  reset: () => void;
}

export function usePdfWatermark(): UsePdfWatermarkResult {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);

  const document = useWatermarkStore((state) => state.document);
  const pages = useWatermarkStore((state) => state.pages);
  const status = useWatermarkStore((state) => state.status);
  const error = useWatermarkStore((state) => state.error);
  const resultBytes = useWatermarkStore((state) => state.resultBytes);
  const settings = useWatermarkStore((state) => state.settings);

  const setDocument = useWatermarkStore((state) => state.setDocument);
  const setPages = useWatermarkStore((state) => state.setPages);
  const togglePageAction = useWatermarkStore((state) => state.togglePage);
  const selectAllAction = useWatermarkStore((state) => state.selectAll);
  const clearSelectionAction = useWatermarkStore((state) => state.clearSelection);
  const setSettingsAction = useWatermarkStore((state) => state.setSettings);
  const setResult = useWatermarkStore((state) => state.setResult);
  const setStatus = useWatermarkStore((state) => state.setStatus);
  const setError = useWatermarkStore((state) => state.setError);
  const storeReset = useWatermarkStore((state) => state.reset);

  const loadPdf = useCallback(
    async (file: File) => {
      setStatus("loading");
      setError(null);

      const validation = validatePdf(file);

      if (!validation.valid) {
        setError(validation.errors.map((e) => e.message).join(" "));
        setStatus("error");
        return;
      }

      try {
        const loaded = await loadPdfDocument(file);
    
        console.log("STEP 4 - PDF loaded");
    
        setPdfDocument(loaded.document);
    
        const thumbnails = await generatePageThumbnails(
          loaded.document
        );
    
        console.log("STEP 5 - thumbnails generated", thumbnails);
    
        setPages(thumbnails);
    
        console.log("STEP 6 - pages stored");
    
        setDocument({
          file,
          fileName: file.name,
          pageCount: thumbnails.length,
          originalSize: file.size,
        });
    
        console.log("STEP 7 - document stored");
    
        setStatus("ready");
    
        console.log("STEP 8 - ready");
      } catch (err) {
        console.error("ROTATE ERROR", err);
    
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load PDF."
        );
    
        setStatus("error");
      }
    }, []);

  const togglePage = useCallback(
    (pageNumber: number) => {
      togglePageAction(pageNumber);
    },
    [togglePageAction]
  );

  const selectAll = useCallback(() => {
    selectAllAction();
  }, [selectAllAction]);

  const clearSelection = useCallback(() => {
    clearSelectionAction();
  }, [clearSelectionAction]);

  const updateSettings = useCallback(
    (partial: Partial<WatermarkSettings>) => {
      setSettingsAction(partial);
    },
    [setSettingsAction]
  );

  const applyWatermark = useCallback(async () => {
    if (!document) {
      setError("No PDF loaded.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      const bytes = await watermarkPdf(document.file, settings);

      setResult(bytes);
      setStatus("completed");
    } catch (err) {
      const message =
        err instanceof WatermarkEngineError
          ? err.message
          : "Failed to apply watermark.";
      setError(message);
      setStatus("error");
    }
  }, [document, settings, setStatus, setError, setResult]);

  const download = useCallback(() => {
    if (!resultBytes || !document) return;
  
    downloadWatermarkedPdf(resultBytes, document.fileName);
  }, [resultBytes, document]);

  const reset = useCallback(() => {
    if (pdfDocument) {
      pdfDocument.destroy();
    }
    setPdfDocument(null);
    storeReset();
  }, [pdfDocument, storeReset]);

  return {
    file: document?.file ?? null,
    pdfDocument,
    pages,
    status,
    error,
    resultBytes,
    settings,
    isLoading: status === "loading",
    isProcessing: status === "processing",
    isCompleted: status === "completed",
    loadPdf,
    togglePage,
    selectAll,
    clearSelection,
    updateSettings,
    applyWatermark,
    download,
    reset,
  };
}

export default usePdfWatermark;