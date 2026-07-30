"use client";

import { useState, useCallback } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  useRotateStore,
  type RotatePage,
  type RotateStatus,
} from "@/store/rotate-store";
import { validatePdf } from "@/lib/pdf/rotate/rotate-validation";
import { loadPdfDocument } from "@/lib/pdf/split/pdf-loader";
import { generatePageThumbnails } from "@/lib/pdf/rotate/thumbnail";
import {
  rotatePdf,
  RotateEngineError,
  type RotateInstruction,
} from "@/lib/pdf/rotate/rotate-engine";
import { downloadRotatedPdf } from "@/lib/pdf/rotate/download";

interface UsePdfRotateResult {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pages: RotatePage[];
  selectedPages: number[];
  status: RotateStatus;
  error: string | null;
  resultBytes: Uint8Array | null;
  isLoading: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  loadPdf: (file: File) => Promise<void>;
  rotateLeft: () => void;
  rotateRight: () => void;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  applyRotation: () => Promise<void>;
  download: (filename?: string) => void;
  reset: () => void;
}

export function usePdfRotate(): UsePdfRotateResult {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);

  const document = useRotateStore((state) => state.document);
  const pages = useRotateStore((state) => state.pages);
  const selectedPages = useRotateStore((state) => state.selectedPages);
  const status = useRotateStore((state) => state.status);
  const error = useRotateStore((state) => state.error);
  const resultBytes = useRotateStore((state) => state.resultBytes);

  const setDocument = useRotateStore((state) => state.setDocument);
  const setPages = useRotateStore((state) => state.setPages);
  const togglePageAction = useRotateStore((state) => state.togglePage);
  const selectAllAction = useRotateStore((state) => state.selectAll);
  const clearSelectionAction = useRotateStore((state) => state.clearSelection);
  const rotateSelectedLeft = useRotateStore((state) => state.rotateSelectedLeft);
  const rotateSelectedRight = useRotateStore((state) => state.rotateSelectedRight);
  const setResult = useRotateStore((state) => state.setResult);
  const setStatus = useRotateStore((state) => state.setStatus);
  const setError = useRotateStore((state) => state.setError);
  const storeReset = useRotateStore((state) => state.reset);

  const loadPdf = useCallback(async (file: File) => {
    console.log("STEP 1 - loadPdf called", file);
  
    setStatus("loading");
    setError(null);
  
    const validation = validatePdf(file);
  
    if (!validation.valid) {
      console.log("STEP 2 - validation failed");
  
      setError(validation.errors.map(e => e.message).join(" "));
      setStatus("error");
      return;
    }
  
    console.log("STEP 3 - validation passed");
  
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

  const rotateLeft = useCallback(() => {
    rotateSelectedLeft();
  }, [rotateSelectedLeft]);

  const rotateRight = useCallback(() => {
    rotateSelectedRight();
  }, [rotateSelectedRight]);

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

  const applyRotation = useCallback(async () => {
    if (!document) {
      setError("No PDF file loaded.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      const instructions: RotateInstruction[] = pages
        .filter((page) => page.rotation !== 0)
        .map((page) => ({
          pageNumber: page.pageNumber,
          rotation: page.rotation as 0 | 90 | 180 | 270,
        }));

      const bytes = await rotatePdf(document.file, instructions);

      setResult(bytes);
      setStatus("completed");
    } catch (err) {
      const message =
        err instanceof RotateEngineError
          ? err.message
          : "Failed to rotate PDF file.";
      setError(message);
      setStatus("error");
    }
  }, [document, pages, setStatus, setError, setResult]);

  const download = useCallback(
    (filename?: string) => {
      if (!resultBytes || !document) return;

      downloadRotatedPdf(resultBytes, filename ?? document.fileName);
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

  return {
    file: document?.file ?? null,
    pdfDocument,
    pages,
    selectedPages,
    status,
    error,
    resultBytes,
    isLoading: status === "loading",
    isProcessing: status === "processing",
    isCompleted: status === "completed",
    loadPdf,
    rotateLeft,
    rotateRight,
    togglePage,
    selectAll,
    clearSelection,
    applyRotation,
    download,
    reset,
  };
}

export default usePdfRotate;