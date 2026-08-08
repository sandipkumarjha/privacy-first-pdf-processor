"use client";

import { useState, useCallback } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

import {
  useOcrStore,
  type OcrPage,
  type OcrStatus,
  type OcrProgress,
} from "@/store/ocr";

import { validatePdf } from "@/lib/pdf/ocr/validation";
import { loadPdfDocument } from "@/lib/pdf/ocr/pdf-loader";
import { generatePageThumbnails } from "@/lib/pdf/ocr/thumbnail";
import {
  renderPageAsImage,
  type RenderedPageImage,
} from "@/lib/pdf/ocr/image-renderer";
import { runOcr as runOcrEngine } from "@/lib/pdf/ocr/ocr-engine";
import { buildSearchablePdf } from "@/lib/pdf/ocr/searchable-pdf";
import { downloadOcrPdf } from "@/lib/pdf/ocr/download";

interface UsePdfOcrResult {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pages: OcrPage[];
  status: OcrStatus;
  error: string | null;
  progress: OcrProgress;
  language: string;
  resultBytes: Uint8Array | null;

  isLoading: boolean;
  isProcessing: boolean;
  isCompleted: boolean;

  loadPdf: (file: File) => Promise<void>;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  setLanguage: (language: string) => void;
  runOcr: () => Promise<void>;
  download: (filename?: string) => void;
  reset: () => void;
}

const INITIAL_PROGRESS: OcrProgress = {
  currentPage: 0,
  totalPages: 0,
  percentage: 0,
  currentStep: "",
};

export function usePdfOcr(): UsePdfOcrResult {
  const [pdfDocument, setPdfDocument] =
    useState<PDFDocumentProxy | null>(null);

  // --------------------------------------------------
  // STORE STATE
  // --------------------------------------------------

  const document = useOcrStore((state) => state.document);
  const pages = useOcrStore((state) => state.pages);
  const status = useOcrStore((state) => state.status);
  const error = useOcrStore((state) => state.error);
  const resultBytes = useOcrStore((state) => state.resultBytes);
  const progress = useOcrStore((state) => state.progress);
  const language = useOcrStore((state) => state.language);

  // --------------------------------------------------
  // STORE ACTIONS
  // --------------------------------------------------

  const setDocument = useOcrStore((state) => state.setDocument);
  const setPages = useOcrStore((state) => state.setPages);
  const togglePageAction = useOcrStore(
    (state) => state.togglePage
  );
  const selectAllAction = useOcrStore(
    (state) => state.selectAll
  );
  const clearSelectionAction = useOcrStore(
    (state) => state.clearSelection
  );
  const setProgress = useOcrStore(
    (state) => state.setProgress
  );
  const setLanguageAction = useOcrStore(
    (state) => state.setLanguage
  );
  const setResult = useOcrStore(
    (state) => state.setResult
  );
  const setStatus = useOcrStore(
    (state) => state.setStatus
  );
  const setError = useOcrStore(
    (state) => state.setError
  );
  const storeReset = useOcrStore(
    (state) => state.reset
  );

  // --------------------------------------------------
  // LOAD PDF
  // --------------------------------------------------

  const loadPdf = useCallback(
    async (file: File): Promise<void> => {
      console.log("OCR STEP 1: loadPdf called", file);

      setStatus("loading");
      setError(null);
      setResult(null);
      setProgress(INITIAL_PROGRESS);

      const validation = validatePdf(file);

      if (!validation.valid) {
        console.log("OCR STEP 2: validation failed");

        setError(
          validation.errors
            .map((issue) => issue.message)
            .join(" ")
        );

        setStatus("error");
        return;
      }

      console.log("OCR STEP 3: validation passed");

      try {
        const loaded = await loadPdfDocument(file);

        console.log("OCR STEP 4: PDF loaded");

        setPdfDocument(loaded.document);

        const thumbnails =
          await generatePageThumbnails(
            loaded.document
          );

        console.log(
          "OCR STEP 5: thumbnails generated",
          thumbnails
        );

        setPages(thumbnails);

        console.log("OCR STEP 6: pages stored");

        setDocument({
          file,
          fileName: file.name,
          pageCount: thumbnails.length,
          originalSize: file.size,
        });

        console.log("OCR STEP 7: document stored");

        setProgress({
          currentPage: 0,
          totalPages: thumbnails.length,
          percentage: 0,
          currentStep: "PDF loaded",
        });

        setStatus("ready");

        console.log("OCR STEP 8: ready");
      } catch (err) {
        console.error(
          "OCR PDF LOAD ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load PDF."
        );

        setStatus("error");
      }
    },
    [
      setStatus,
      setError,
      setResult,
      setProgress,
      setPages,
      setDocument,
    ]
  );

  // --------------------------------------------------
  // PAGE SELECTION
  // --------------------------------------------------

  const togglePage = useCallback(
    (pageNumber: number): void => {
      togglePageAction(pageNumber);
    },
    [togglePageAction]
  );

  const selectAll = useCallback((): void => {
    selectAllAction();
  }, [selectAllAction]);

  const clearSelection = useCallback((): void => {
    clearSelectionAction();
  }, [clearSelectionAction]);

  // --------------------------------------------------
  // LANGUAGE
  // --------------------------------------------------

  const setLanguage = useCallback(
    (nextLanguage: string): void => {
      setLanguageAction(nextLanguage);
    },
    [setLanguageAction]
  );

  // --------------------------------------------------
  // RUN OCR
  // --------------------------------------------------

  const runOcr = useCallback(
    async (): Promise<void> => {
      if (!document) {
        setError("No PDF loaded.");
        setStatus("error");
        return;
      }

      if (!pdfDocument) {
        setError("PDF document is not available.");
        setStatus("error");
        return;
      }

      const selectedPages = pages.filter(
        (page: OcrPage) => page.selected
      );

      if (selectedPages.length === 0) {
        setError("Please select at least one page.");
        setStatus("error");
        return;
      }

      setStatus("processing");
      setError(null);

      setProgress({
        currentPage: 0,
        totalPages: selectedPages.length,
        percentage: 0,
        currentStep: "Preparing OCR...",
      });

      try {
        const renderedImages: RenderedPageImage[] =
          [];

        // ----------------------------------------------
        // RENDER SELECTED PAGES
        // ----------------------------------------------

        for (const page of selectedPages) {
          const pdfPage =
            await pdfDocument.getPage(
              page.pageNumber
            );

          const renderedImage =
            await renderPageAsImage(pdfPage);

          renderedImages.push(renderedImage);

          pdfPage.cleanup();
        }

        // ----------------------------------------------
        // OCR
        // ----------------------------------------------

        const ocrResults =
          await runOcrEngine(
            renderedImages,
            language,
            (nextProgress) => {
              setProgress(nextProgress);
            }
          );

        // ----------------------------------------------
        // BUILD SEARCHABLE PDF
        // ----------------------------------------------

        const bytes =
          await buildSearchablePdf(
            renderedImages,
            ocrResults
          );

        setResult(bytes);

        setProgress({
          currentPage: selectedPages.length,
          totalPages: selectedPages.length,
          percentage: 100,
          currentStep: "OCR completed",
        });

        setStatus("completed");

        console.log(
          "OCR completed successfully."
        );
      } catch (err) {
        console.error(
          "OCR PROCESSING ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to extract text from PDF."
        );

        setStatus("error");
      }
    },
    [
      document,
      pages,
      pdfDocument,
      language,
      setStatus,
      setError,
      setProgress,
      setResult,
    ]
  );

  // --------------------------------------------------
  // DOWNLOAD
  // --------------------------------------------------

  const download = useCallback(
    (filename?: string): void => {
      if (!resultBytes) {
        console.warn(
          "Download requested but no OCR result exists."
        );
        return;
      }

      if (!document) {
        console.warn(
          "Download requested but no original document exists."
        );
        return;
      }

      const originalFileName =
        typeof document.fileName === "string"
          ? document.fileName
          : document.file?.name;

      if (!originalFileName) {
        console.error(
          "Could not determine original PDF filename."
        );
        return;
      }

      const downloadFileName =
        typeof filename === "string" &&
        filename.trim().length > 0
          ? filename.trim()
          : originalFileName;

      console.log(
        "Downloading OCR PDF:",
        downloadFileName
      );

      downloadOcrPdf(
        resultBytes,
        downloadFileName
      );
    },
    [resultBytes, document]
  );

  // --------------------------------------------------
  // RESET
  // --------------------------------------------------

  const reset = useCallback((): void => {
    if (pdfDocument) {
      pdfDocument.destroy();
    }

    setPdfDocument(null);

    storeReset();
  }, [pdfDocument, storeReset]);

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return {
    file: document?.file ?? null,
    pdfDocument,
    pages,
    status,
    error,
    progress,
    language,
    resultBytes,

    isLoading: status === "loading",
    isProcessing: status === "processing",
    isCompleted: status === "completed",

    loadPdf,
    togglePage,
    selectAll,
    clearSelection,
    setLanguage,
    runOcr,
    download,
    reset,
  };
}

export default usePdfOcr;