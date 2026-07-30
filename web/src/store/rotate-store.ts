import { create } from "zustand";

export type RotateStatus =
  | "idle"
  | "loading"
  | "ready"
  | "processing"
  | "completed"
  | "error";

export interface RotatePage {
  pageNumber: number;
  thumbnail: string;
  rotation: number;
}

export interface RotateDocument {
  file: File;
  fileName: string;
  pageCount: number;
  originalSize: number;
}

interface RotateState {
  document: RotateDocument | null;
  pages: RotatePage[];
  selectedPages: number[];
  status: RotateStatus;
  error: string | null;
  resultBytes: Uint8Array | null;
}

interface RotateActions {
  setDocument: (document: RotateDocument | null) => void;
  setPages: (pages: RotatePage[]) => void;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  rotateSelectedLeft: () => void;
  rotateSelectedRight: () => void;
  resetRotations: () => void;
  setResult: (bytes: Uint8Array | null) => void;
  setStatus: (status: RotateStatus) => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

type RotateStore = RotateState & RotateActions;

const initialState: RotateState = {
  document: null,
  pages: [],
  selectedPages: [],
  status: "idle",
  error: null,
  resultBytes: null,
};

function normalizeRotation(rotation: number): number {
  return ((rotation % 360) + 360) % 360;
}

export const useRotateStore = create<RotateStore>((set) => ({
  ...initialState,

  setDocument: (document) => set({ document }),

  setPages: (pages) => set({ pages }),

  togglePage: (pageNumber) =>
    set((state) => ({
      selectedPages: state.selectedPages.includes(pageNumber)
        ? state.selectedPages.filter((page) => page !== pageNumber)
        : [...state.selectedPages, pageNumber],
    })),

  selectAll: () =>
    set((state) => ({
      selectedPages: state.pages.map((page) => page.pageNumber),
    })),

  clearSelection: () => set({ selectedPages: [] }),

  rotateSelectedLeft: () =>
    set((state) => ({
      pages: state.pages.map((page) =>
        state.selectedPages.includes(page.pageNumber)
          ? { ...page, rotation: normalizeRotation(page.rotation - 90) }
          : page
      ),
    })),

  rotateSelectedRight: () =>
    set((state) => ({
      pages: state.pages.map((page) =>
        state.selectedPages.includes(page.pageNumber)
          ? { ...page, rotation: normalizeRotation(page.rotation + 90) }
          : page
      ),
    })),

  resetRotations: () =>
    set((state) => ({
      pages: state.pages.map((page) => ({ ...page, rotation: 0 })),
    })),

  setResult: (resultBytes) => set({ resultBytes }),

  setStatus: (status) => set({ status }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));

export default useRotateStore;