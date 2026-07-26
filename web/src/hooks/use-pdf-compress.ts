"use client";

import { useState, useCallback } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCompressStore } from "@/store/compress-store";
import { validatePdf } from "@/lib/pdf/compress/validation";
import { loadPdfDocument, getPageCount } from "@/lib/pdf/split/pdf-loader";
import { compressPdf, CompressEngineError } from "@/lib/pdf/compress/compress-engine";
import { downloadFile } from "@/lib/pdf/split/download-pdf";

interface UsePdfCompressResult {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pageCount: number;
  originalSize: number;
  compressedSize: number | null;
  compressionRatio: number | null;
  savedBytes: number | null;
  isLoading: boolean;
  isCompressing: boolean;
  compressSuccess: boolean;
  error: string | null;
  resultBytes: Uint8Array | null;
  loadPdf: (file: File) => Promise<void>;
  compress: () => Promise<void>;
  download: (filename?: string) => void;
  reset: () => void;
}

export function usePdfCompress(): UsePdfCompressResult {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);

  const document = useCompressStore((state) => state.document);
  const status = useCompressStore((state) => state.status);
  const compressionLevel = useCompressStore((state) => state.compressionLevel);
  const compressedBytes = useCompressStore((state) => state.compressedBytes);
  const compressedSize = useCompressStore((state) => state.compressedSize);
  const compressionRatio = useCompressStore((state) => state.compressionRatio);
  const savedBytes = useCompressStore((state) => state.savedBytes);
  const error = useCompressStore((state) => state.error);

  const setDocument = useCompressStore((state) => state.setDocument);
  const setStatus = useCompressStore((state) => state.setStatus);
  const setCompressedResult = useCompressStore((state) => state.setCompressedResult);
  const setError = useCompressStore((state) => state.setError);
  const storeReset = useCompressStore((state) => state.reset);

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
        const loadedDocument = await loadPdfDocument(file);
        const pageCount = await getPageCount(loadedDocument);

        setPdfDocument(loadedDocument);
        setDocument({
          fileName: file.name,
          file,
          pageCount,
          originalSize: file.size,
        });
        setStatus("ready");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load PDF file."
        );
        setStatus("error");
      }
    },
    [setStatus, setError, setDocument]
  );

  const compress = useCallback(async () => {
    if (!document) {
      setError("No PDF file loaded.");
      setStatus("error");
      return;
    }

    setStatus("compressing");
    setError(null);

    try {
      const bytes = await compressPdf(document.file, compressionLevel);

      const newCompressedSize = bytes.byteLength;
      const newSavedBytes = Math.max(
        document.originalSize - newCompressedSize,
        0
      );
      const newCompressionRatio =
        document.originalSize > 0
          ? newCompressedSize / document.originalSize
          : 0;

      setCompressedResult({
        compressedBytes: bytes,
        compressedSize: newCompressedSize,
        compressionRatio: newCompressionRatio,
        savedBytes: newSavedBytes,
      });
      setStatus("completed");
    } catch (err) {
      const message =
        err instanceof CompressEngineError
          ? err.message
          : "Failed to compress PDF file.";
      setError(message);
      setStatus("error");
    }
  }, [document, compressionLevel, setStatus, setError, setCompressedResult]);

  const download = useCallback(
    (filename?: string) => {
      if (!compressedBytes || !document) return;

      const outputName = filename ?? `compressed-${document.fileName}`;
      downloadFile(compressedBytes, outputName, "application/pdf");
    },
    [compressedBytes, document]
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
    pageCount: document?.pageCount ?? 0,
    originalSize: document?.originalSize ?? 0,
    compressedSize,
    compressionRatio,
    savedBytes,
    isLoading: status === "loading",
    isCompressing: status === "compressing",
    compressSuccess: status === "completed",
    error,
    resultBytes: compressedBytes,
    loadPdf,
    compress,
    download,
    reset,
  };
}

export default usePdfCompress;