import { useCallback } from "react";
import { useSplitStore } from "@/store/split-store";
import { splitPdf } from "@/lib/pdf/split/split-engine";
import type { SplitRange, UsePdfSplitReturn } from "@/types/split";

export function usePdfSplit(): UsePdfSplitReturn {
  const status = useSplitStore((s) => s.status);
  const document = useSplitStore((s) => s.document);
  const options = useSplitStore((s) => s.options);
  const results = useSplitStore((s) => s.results);
  const error = useSplitStore((s) => s.error);
  const progress = useSplitStore((s) => s.progress);

  const setDocument = useSplitStore((s) => s.setDocument);
  const setStatus = useSplitStore((s) => s.setStatus);
  const setError = useSplitStore((s) => s.setError);
  const setMode = useSplitStore((s) => s.setMode);
  const togglePageSelection = useSplitStore((s) => s.togglePageSelection);
  const addRangeToStore = useSplitStore((s) => s.addRange);
  const removeRange = useSplitStore((s) => s.removeRange);
  const updateRange = useSplitStore((s) => s.updateRange);
  const setResults = useSplitStore((s) => s.setResults);
  const reset = useSplitStore((s) => s.reset);

  const loadDocument = useCallback(
    async (file: File) => {
      setStatus("loading-pdf");
      // TODO: implement PDF loading + page metadata extraction
      void file;
      void setDocument;
    },
    [setStatus, setDocument]
  );

  const addRange = useCallback(
    (range: Omit<SplitRange, "id">) => {
      addRangeToStore({ ...range, id: crypto.randomUUID() });
    },
    [addRangeToStore]
  );

  const executeSplit = useCallback(async () => {
    if (!document) return;
    setStatus("splitting");
    // TODO: call splitPdf and handle result/error
    void splitPdf;
    void setResults;
    void setError;
  }, [document, setStatus, setResults, setError]);

  return {
    state: { status, document, options, results, error, progress },
    loadDocument,
    setMode,
    togglePageSelection,
    addRange,
    removeRange,
    updateRange,
    executeSplit,
    reset,
  };
}