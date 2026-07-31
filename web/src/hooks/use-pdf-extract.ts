"use client";

import { useState, useCallback } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  useExtractStore,
  type ExtractPage,
  type ExtractStatus,
} from "@/store/extract-store";
import { validatePdf } from "@/lib/pdf/extract/validation";
import { loadPdfDocument } from "@/lib/pdf/split/pdf-loader";
import { generatePageThumbnails } from "@/lib/pdf/extract/thumbnail";
import {
  extractPages as extractPagesFromEngine,
  ExtractEngineError,
} from "@/lib/pdf/extract/extract-engine";
import { downloadExtractedPdf } from "@/lib/pdf/extract/extract-download";

interface UsePdfExtractResult {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pages: ExtractPage[];
  status: ExtractStatus;
  error: string | null;
  resultBytes: Uint8Array | null;
  selectedPages: number[];
  isLoading: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  loadPdf: (file: File) => Promise<void>;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  extractPages: () => Promise<void>;
  download: (filename?: string) => void;
  reset: () => void;
}

export function usePdfExtract(): UsePdfExtractResult {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);

  const document = useExtractStore((state) => state.document);
  const pages = useExtractStore((state) => state.pages);
  const status = useExtractStore((state) => state.status);
  const error = useExtractStore((state) => state.error);
  const resultBytes = useExtractStore((state) => state.resultBytes);

  const setDocument = useExtractStore((state) => state.setDocument);
  const setPages = useExtractStore((state) => state.setPages);
  const togglePageAction = useExtractStore((state) => state.togglePage);
  const selectAllAction = useExtractStore((state) => state.selectAll);
  const clearSelectionAction = useExtractStore((state) => state.clearSelection);
  const setResult = useExtractStore((state) => state.setResult);
  const setStatus = useExtractStore((state) => state.setStatus);
  const setError = useExtractStore((state) => state.setError);
  const storeReset = useExtractStore((state) => state.reset);

  const loadPdf = useCallback(
    async (file: File) => {
      setStatus("loading");
      setError(null);

      const validation = validatePdf(file);

      if (!validation.valid) {
        setError(validation.errors.map((issue) => issue.message).join(" "));
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

  const extractPages = useCallback(async () => {
    if (!document) {
      setError("No PDF file loaded.");
      setStatus("error");
      return;
    }

    const selectedPageNumbers = pages
      .filter((page) => page.selected)
      .map((page) => page.pageNumber);

    if (selectedPageNumbers.length === 0) {
      setError("Select at least one page to extract.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      const bytes = await extractPagesFromEngine(document.file, {
        pageNumbers: selectedPageNumbers,
      });

      setResult(bytes);
      setStatus("completed");
    } catch (err) {
      const message =
        err instanceof ExtractEngineError
          ? err.message
          : "Failed to extract PDF pages.";
      setError(message);
      setStatus("error");
    }
  }, [document, pages, setStatus, setError, setResult]);

  const download = useCallback(
    (filename?: string) => {
      if (!resultBytes || !document) return;

      downloadExtractedPdf(resultBytes, filename ?? document.fileName);
    },
    [resultBytes, document]
  );

  const reset = useCallback(() => {
    if (pdfDocument) {
      pdfDocument.destroy();
    }
    setPdfDocument(null);
    storeReset();
  }, [pdfDocument, storeReset]);

  const selectedPages = pages
    .filter((page) => page.selected)
    .map((page) => page.pageNumber);

  return {
    file: document?.file ?? null,
    pdfDocument,
    pages,
    status,
    error,
    resultBytes,
    selectedPages,
    isLoading: status === "loading",
    isProcessing: status === "processing",
    isCompleted: status === "completed",
    loadPdf,
    togglePage,
    selectAll,
    clearSelection,
    extractPages,
    download,
    reset,
  };
}

export default usePdfExtract;