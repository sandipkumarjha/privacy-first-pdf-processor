import { create } from "zustand";

export type ExtractStatus =
  | "idle"
  | "loading"
  | "ready"
  | "processing"
  | "completed"
  | "error";

export interface ExtractPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
}

export interface ExtractDocument {
  file: File;
  fileName: string;
  pageCount: number;
  originalSize: number;
}

interface ExtractState {
  document: ExtractDocument | null;
  pages: ExtractPage[];
  status: ExtractStatus;
  error: string | null;
  resultBytes: Uint8Array | null;
}

interface ExtractActions {
  setDocument: (document: ExtractDocument | null) => void;
  setPages: (pages: ExtractPage[]) => void;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  setResult: (bytes: Uint8Array | null) => void;
  setStatus: (status: ExtractStatus) => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

type ExtractStore = ExtractState & ExtractActions;

const initialState: ExtractState = {
  document: null,
  pages: [],
  status: "idle",
  error: null,
  resultBytes: null,
};

export const useExtractStore = create<ExtractStore>((set) => ({
  ...initialState,

  setDocument: (document) => set({ document }),

  setPages: (pages) => set({ pages }),

  togglePage: (pageNumber) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.pageNumber === pageNumber
          ? { ...page, selected: !page.selected }
          : page
      ),
    })),

  selectAll: () =>
    set((state) => ({
      pages: state.pages.map((page) => ({ ...page, selected: true })),
    })),

  clearSelection: () =>
    set((state) => ({
      pages: state.pages.map((page) => ({ ...page, selected: false })),
    })),

  setResult: (resultBytes) => set({ resultBytes }),

  setStatus: (status) => set({ status }),

  setError: (error) => set({ error, status: error ? "error" : "idle" }),

  reset: () => set(initialState),
}));

export default useExtractStore;