"use client";

import { useState, useCallback } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  useCompressStore,
  type CompressionLevel,
} from "@/store/compress-store";
import { validatePdfFile } from "@/lib/pdf/compress/validation";
import { loadPdfDocument, getPageCount } from "@/lib/pdf/split/pdf-loader";
import {
  compressPdf,
  CompressionEngineError,
} from "@/lib/pdf/compress/compress-engine";
import { downloadPdf } from "@/lib/pdf/split/download-pdf";

interface UsePdfCompressResult {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pageCount: number;
  status: ReturnType<typeof useCompressStore.getState>["status"];
  compressionLevel: CompressionLevel;
  originalSize: number;
  compressedSize: number | null;
  compressionRatio: number | null;
  savedBytes: number | null;
  compressedBytes: Uint8Array | null;
  isLoading: boolean;
  isCompressing: boolean;
  compressSuccess: boolean;
  error: string | null;
  setCompressionLevel: (level: CompressionLevel) => void;
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
  const setCompressionLevelAction = useCompressStore(
    (state) => state.setCompressionLevel
  );
  const setCompressedResult = useCompressStore(
    (state) => state.setCompressedResult
  );
  const setError = useCompressStore((state) => state.setError);
  const storeReset = useCompressStore((state) => state.reset);

  const loadPdf = useCallback(
    async (file: File) => {
      setStatus("loading");
      setError(null);

      const validation = validatePdfFile(file);

      if (!validation.valid) {
        setError(validation.message ?? "This file could not be validated.");
        setStatus("error");
        return;
      }

      try {
        const { document: pdfDocument, pageCount } = await loadPdfDocument(file);

setPdfDocument(pdfDocument);
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

  const setCompressionLevel = useCallback(
    (level: CompressionLevel) => {
      setCompressionLevelAction(level);
    },
    [setCompressionLevelAction]
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
      const result = await compressPdf(document.file, compressionLevel);

      setCompressedResult({
        compressedBytes: result.bytes,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio,
        savedBytes: result.savedBytes,
      });
      setStatus("completed");
    } catch (err) {
      const message =
        err instanceof CompressionEngineError
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
      downloadPdf(compressedBytes, outputName);
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
    status,
    compressionLevel,
    originalSize: document?.originalSize ?? 0,
    compressedSize,
    compressionRatio,
    savedBytes,
    compressedBytes,
    isLoading: status === "loading",
    isCompressing: status === "compressing",
    compressSuccess: status === "completed",
    error,
    setCompressionLevel,
    loadPdf,
    compress,
    download,
    reset,
  };
}

export default usePdfCompress;