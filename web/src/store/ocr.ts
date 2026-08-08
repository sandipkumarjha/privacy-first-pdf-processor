import { create } from "zustand";

export type OcrStatus =
  | "idle"
  | "loading"
  | "ready"
  | "processing"
  | "completed"
  | "error";

export interface OcrPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
}

export interface OcrDocument {
  file: File;
  fileName: string;
  pageCount: number;
  originalSize: number;
}

export interface OcrProgress {
  currentPage: number;
  totalPages: number;
  percentage: number;
  currentStep: string;
}

const DEFAULT_LANGUAGE = "eng";

const DEFAULT_PROGRESS: OcrProgress = {
  currentPage: 0,
  totalPages: 0,
  percentage: 0,
  currentStep: "",
};

interface OcrState {
  document: OcrDocument | null;
  pages: OcrPage[];
  status: OcrStatus;
  error: string | null;
  resultBytes: Uint8Array | null;
  progress: OcrProgress;
  language: string;
}

interface OcrActions {
  setDocument: (document: OcrDocument | null) => void;
  setPages: (pages: OcrPage[]) => void;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  setProgress: (progress: OcrProgress) => void;
  setLanguage: (language: string) => void;
  setResult: (bytes: Uint8Array | null) => void;
  setStatus: (status: OcrStatus) => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

type OcrStore = OcrState & OcrActions;

const initialState: OcrState = {
  document: null,
  pages: [],
  status: "idle",
  error: null,
  resultBytes: null,
  progress: DEFAULT_PROGRESS,
  language: DEFAULT_LANGUAGE,
};

export const useOcrStore = create<OcrStore>((set) => ({
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

  setProgress: (progress) => set({ progress }),

  setLanguage: (language) => set({ language }),

  setResult: (resultBytes) => set({ resultBytes }),

  setStatus: (status) => set({ status }),

  setError: (error) => set({ error, status: error ? "error" : "idle" }),

  reset: () => set(initialState),
}));

export default useOcrStore;