import { create } from "zustand";

export type CompressStatus =
  | "idle"
  | "loading"
  | "ready"
  | "compressing"
  | "completed"
  | "error";

export type CompressionLevel = "low" | "medium" | "high";

export interface CompressDocument {
  fileName: string;
  file: File;
  pageCount: number;
  originalSize: number;
}

interface CompressState {
  status: CompressStatus;
  document: CompressDocument | null;
  compressionLevel: CompressionLevel;
  compressedBytes: Uint8Array | null;
  compressedSize: number | null;
  compressionRatio: number | null;
  savedBytes: number | null;
  error: string | null;
}

interface CompressActions {
  setDocument: (document: CompressDocument | null) => void;
  setStatus: (status: CompressStatus) => void;
  setCompressionLevel: (level: CompressionLevel) => void;
  setCompressedResult: (result: {
    compressedBytes: Uint8Array;
    compressedSize: number;
    compressionRatio: number;
    savedBytes: number;
  }) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

type CompressStore = CompressState & CompressActions;

const initialState: CompressState = {
  status: "idle",
  document: null,
  compressionLevel: "medium",
  compressedBytes: null,
  compressedSize: null,
  compressionRatio: null,
  savedBytes: null,
  error: null,
};

export const useCompressStore = create<CompressStore>((set) => ({
  ...initialState,

  setDocument: (document) => set({ document }),

  setStatus: (status) => set({ status }),

  setCompressionLevel: (compressionLevel) => set({ compressionLevel }),

  setCompressedResult: ({
    compressedBytes,
    compressedSize,
    compressionRatio,
    savedBytes,
  }) =>
    set({
      compressedBytes,
      compressedSize,
      compressionRatio,
      savedBytes,
    }),

  setError: (error) => set({ error, status: error ? "error" : "idle" }),

  reset: () => set(initialState),
}));

export default useCompressStore;