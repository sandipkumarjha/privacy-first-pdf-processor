import { useCallback, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useSplitStore } from "@/store/split-store";
import { loadPdfDocument, PdfLoadError } from "@/lib/pdf/split/pdf-loader";
import { splitPdf as splitPdfBytes, SplitEngineError } from "@/lib/pdf/split/split-engine";
import { downloadPdf } from "@/lib/pdf/split/download-pdf";
import type { SplitError } from "@/types/split";

interface UsePdfSplitState {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pageCount: number;
  isLoading: boolean;
  error: SplitError | null;
  isSplitting: boolean;
  splitSuccess: boolean;
  splitError: SplitError | null;
  resultBytes: Uint8Array | null;
}

interface UsePdfSplitReturn {
  state: UsePdfSplitState;
  loadPdf: (file: File) => Promise<void>;
  split: () => Promise<void>;
  download: (filename?: string) => void;
  reset: () => void;
}
const INITIAL_LOCAL_STATE: Omit<UsePdfSplitState, "isLoading" | "error" | "isSplitting" | "splitSuccess" | "splitError" | "resultBytes"> = {
    file: null,
    pdfDocument: null,
    pageCount: 0,
  };


function toSplitError(err: unknown): SplitError {
  if (err instanceof PdfLoadError) {
    return { code: "LOAD_FAILED", message: err.message };
  }
  if (err instanceof Error) {
    return { code: "UNKNOWN_ERROR", message: err.message };
  }
  return { code: "UNKNOWN_ERROR", message: "Failed to load PDF." };
}
function toSplitEngineError(err: unknown): SplitError {
    if (err instanceof SplitEngineError) {
      if (err.message.includes("No pages selected")) {
        return { code: "NO_PAGES_SELECTED", message: err.message };
      }
      if (err.message.includes("Invalid page number")) {
        return { code: "INVALID_RANGE", message: err.message };
      }
      return { code: "SPLIT_FAILED", message: err.message };
    }
    if (err instanceof Error) {
      return { code: "UNKNOWN_ERROR", message: err.message };
    }
    return { code: "UNKNOWN_ERROR", message: "Failed to split PDF." };
  }

export function usePdfSplit(): UsePdfSplitReturn {
  const setDocument = useSplitStore((s) => s.setDocument);
  const setStatus = useSplitStore((s) => s.setStatus);
  const setError = useSplitStore((s) => s.setError);
  const setResults = useSplitStore((s) => s.setResults);
  const selectedPages = useSplitStore((s) => s.options.selectedPages);
  const storeReset = useSplitStore((s) => s.reset);

  const [file, setFile] = useState<File | null>(INITIAL_LOCAL_STATE.file);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(
    INITIAL_LOCAL_STATE.pdfDocument
  );
  const [pageCount, setPageCount] = useState<number>(INITIAL_LOCAL_STATE.pageCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setLocalError] = useState<SplitError | null>(null);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [splitSuccess, setSplitSuccess] = useState<boolean>(false);
  const [splitError, setSplitError] = useState<SplitError | null>(null);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  
  const loadPdf = useCallback(
    async (nextFile: File) => {
      setIsLoading(true);
      setLocalError(null);
      setError(null);
      setStatus("loading-pdf");

      if (pdfDocument) {
        await pdfDocument.destroy().catch(() => undefined);
      }

      try {
        const { document, pageCount: loadedPageCount } = await loadPdfDocument(nextFile);

        setFile(nextFile);
        setPdfDocument(document);
        setPageCount(loadedPageCount);

        setDocument({
          fileName: nextFile.name,
          file: nextFile,
          totalPages: loadedPageCount,
          pages: [],
        });

        setStatus("ready");
      } catch (err) {
        const splitError = toSplitError(err);

        setFile(null);
        setPdfDocument(null);
        setPageCount(0);
        setLocalError(splitError);

        setDocument(null);
        setError(splitError);
        setStatus("error");
      } finally {
        setIsLoading(false);
      }
    },
    [pdfDocument, setDocument, setError, setStatus]
  );
  const split = useCallback(async () => {
    if (!file) {
      setSplitError({ code: "INVALID_FILE", message: "No file loaded to split." });
      return;
    }

    setIsSplitting(true);
    setSplitSuccess(false);
    setSplitError(null);
    setResultBytes(null);
    setStatus("splitting");

    try {
      const bytes = await splitPdfBytes(file, selectedPages);

      setResultBytes(bytes);
      setSplitSuccess(true);
      setStatus("completed");
    } catch (err) {
      const engineError = toSplitEngineError(err);

      setSplitError(engineError);
      setError(engineError);
      setStatus("error");
    } finally {
      setIsSplitting(false);
    }
  }, [file, selectedPages, setError, setStatus]);

  const download = useCallback(
    (filename?: string) => {
      if (!resultBytes) return;

      const baseName = file?.name.replace(/\.pdf$/i, "") ?? "document";
      downloadPdf(resultBytes, filename ?? `${baseName}-split.pdf`);
    },
    [resultBytes, file]
  );
  const reset = useCallback(() => {
    if (pdfDocument) {
      void pdfDocument.destroy().catch(() => undefined);
    }

    setFile(null);
    setPdfDocument(null);
    setPageCount(0);
    setIsLoading(false);
    setLocalError(null);

    setIsSplitting(false);
    setSplitSuccess(false);
    setSplitError(null);
    setResultBytes(null);

    setResults([]);
    storeReset();
  }, [pdfDocument, setResults, storeReset]);

  return {
    state: {
      file,
      pdfDocument,
      pageCount,
      isLoading,
      error,
      isSplitting,
      splitSuccess,
      splitError,
      resultBytes,
    },
    loadPdf,
    split,
    download,
    reset,
  };
}