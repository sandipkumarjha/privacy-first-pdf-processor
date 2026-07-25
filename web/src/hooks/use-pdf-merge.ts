"use client";

import { useCallback } from "react";
import { useMergeStore, type MergeFile } from "@/store/merge-store";
import { validateMultipleFiles } from "@/lib/pdf/merge/validation";
import { mergePdfFiles, MergeEngineError } from "@/lib/pdf/merge/merge-engine";
import { loadPdfDocument, getPageCount } from "@/lib/pdf/split/pdf-loader";
import { downloadPdf } from "@/lib/pdf/split/download-pdf";

interface UsePdfMergeResult {
  files: MergeFile[];
  status: ReturnType<typeof useMergeStore.getState>["status"];
  progress: number;
  error: string | null;
  addFiles: (files: File[]) => Promise<void>;
  removeFile: (id: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  clearFiles: () => void;
  mergeFiles: (outputName?: string) => Promise<void>;
  reset: () => void;
}

function createFileId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function usePdfMerge(): UsePdfMergeResult {
  const files = useMergeStore((state) => state.files);
  const status = useMergeStore((state) => state.status);
  const progress = useMergeStore((state) => state.progress);
  const error = useMergeStore((state) => state.error);

  const storeAddFiles = useMergeStore((state) => state.addFiles);
  const storeRemoveFile = useMergeStore((state) => state.removeFile);
  const storeMoveUp = useMergeStore((state) => state.moveUp);
  const storeMoveDown = useMergeStore((state) => state.moveDown);
  const storeClearFiles = useMergeStore((state) => state.clearFiles);
  const setStatus = useMergeStore((state) => state.setStatus);
  const setProgress = useMergeStore((state) => state.setProgress);
  const setMergedBytes = useMergeStore((state) => state.setMergedBytes);
  const setError = useMergeStore((state) => state.setError);
  const storeReset = useMergeStore((state) => state.reset);

  const addFiles = useCallback(
    async (incomingFiles: File[]) => {
      setStatus("loading");
      setError(null);

      const validation = validateMultipleFiles([...files.map((f) => f.file), ...incomingFiles]);

      if (!validation.valid) {
        setError(validation.errors.map((e) => e.message).join(" "));
        setStatus(files.length > 0 ? "ready" : "idle");
        return;
      }

      try {
        const newMergeFiles: MergeFile[] = await Promise.all(
          incomingFiles.map(async (file) => {
            const pdfDocument = await loadPdfDocument(file);
            const pageCount = await getPageCount(file);

            return {
              id: createFileId(),
              file,
              name: file.name,
              size: file.size,
              pageCount,
            };
          })
        );

        storeAddFiles(newMergeFiles);
        setStatus("ready");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to read one or more PDF files."
        );
      }
    },
    [files, setStatus, setError, storeAddFiles]
  );

  const removeFile = useCallback(
    (id: string) => {
      storeRemoveFile(id);
    },
    [storeRemoveFile]
  );

  const moveUp = useCallback(
    (id: string) => {
      storeMoveUp(id);
    },
    [storeMoveUp]
  );

  const moveDown = useCallback(
    (id: string) => {
      storeMoveDown(id);
    },
    [storeMoveDown]
  );

  const clearFiles = useCallback(() => {
    storeClearFiles();
    setStatus("idle");
    setError(null);
  }, [storeClearFiles, setStatus, setError]);

  const mergeFiles = useCallback(
    async (outputName = "merged.pdf") => {
      if (files.length < 2) {
        setError("Select at least 2 PDF files to merge.");
        setStatus("error");
        return;
      }

      setStatus("merging");
      setProgress(0);
      setError(null);

      try {
        const mergedBytes = await mergePdfFiles(files.map((f) => f.file));

        setProgress(100);
        setMergedBytes(mergedBytes);
        setStatus("completed");

        downloadPdf(mergedBytes, outputName);
      } catch (err) {
        const message =
          err instanceof MergeEngineError
            ? err.message
            : "Failed to merge PDF files.";
        setError(message);
        setStatus("error");
      }
    },
    [files, setStatus, setProgress, setError, setMergedBytes]
  );

  const reset = useCallback(() => {
    storeReset();
  }, [storeReset]);

  return {
    files,
    status,
    progress,
    error,
    addFiles,
    removeFile,
    moveUp,
    moveDown,
    clearFiles,
    mergeFiles,
    reset,
  };
}

export default usePdfMerge;