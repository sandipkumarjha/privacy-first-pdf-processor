import { useCallback, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useSplitStore } from "@/store/split-store";
import { loadPdfDocument, PdfLoadError } from "@/lib/pdf/split/pdf-loader";
import type { SplitError } from "@/types/split";

interface UsePdfSplitState {
  file: File | null;
  pdfDocument: PDFDocumentProxy | null;
  pageCount: number;
  isLoading: boolean;
  error: SplitError | null;
}

interface UsePdfSplitReturn {
  state: UsePdfSplitState;
  loadPdf: (file: File) => Promise<void>;
  reset: () => void;
}

const INITIAL_LOCAL_STATE: Omit<UsePdfSplitState, "isLoading" | "error"> = {
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

export function usePdfSplit(): UsePdfSplitReturn {
  const setDocument = useSplitStore((s) => s.setDocument);
  const setStatus = useSplitStore((s) => s.setStatus);
  const setError = useSplitStore((s) => s.setError);
  const storeReset = useSplitStore((s) => s.reset);

  const [file, setFile] = useState<File | null>(INITIAL_LOCAL_STATE.file);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(
    INITIAL_LOCAL_STATE.pdfDocument
  );
  const [pageCount, setPageCount] = useState<number>(INITIAL_LOCAL_STATE.pageCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setLocalError] = useState<SplitError | null>(null);

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

  const reset = useCallback(() => {
    if (pdfDocument) {
      void pdfDocument.destroy().catch(() => undefined);
    }

    setFile(null);
    setPdfDocument(null);
    setPageCount(0);
    setIsLoading(false);
    setLocalError(null);

    storeReset();
  }, [pdfDocument, storeReset]);

  return {
    state: {
      file,
      pdfDocument,
      pageCount,
      isLoading,
      error,
    },
    loadPdf,
    reset,
  };
}