import { create } from "zustand";

export type WatermarkStatus =
  | "idle"
  | "loading"
  | "ready"
  | "processing"
  | "completed"
  | "error";

export interface WatermarkPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
}

export interface WatermarkDocument {
  file: File;
  fileName: string;
  pageCount: number;
  originalSize: number;
}

export interface WatermarkSettings {
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  color: string;
  position:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

const DEFAULT_SETTINGS: WatermarkSettings = {
  text: "CONFIDENTIAL",
  fontSize: 36,
  opacity: 0.25,
  rotation: 45,
  color: "#FF0000",
  position: "center",
};

interface WatermarkState {
  document: WatermarkDocument | null;
  pages: WatermarkPage[];
  status: WatermarkStatus;
  error: string | null;
  resultBytes: Uint8Array | null;
  settings: WatermarkSettings;
}

interface WatermarkActions {
  setDocument: (document: WatermarkDocument | null) => void;
  setPages: (pages: WatermarkPage[]) => void;
  togglePage: (pageNumber: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  setSettings: (settings: Partial<WatermarkSettings>) => void;
  setResult: (bytes: Uint8Array | null) => void;
  setStatus: (status: WatermarkStatus) => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

type WatermarkStore = WatermarkState & WatermarkActions;

const initialState: WatermarkState = {
  document: null,
  pages: [],
  status: "idle",
  error: null,
  resultBytes: null,
  settings: DEFAULT_SETTINGS,
};

export const useWatermarkStore = create<WatermarkStore>((set) => ({
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

  // Merges partial settings into the existing settings object.
  setSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),

  setResult: (resultBytes) => set({ resultBytes }),

  setStatus: (status) => set({ status }),

  setError: (error) => set({ error, status: error ? "error" : "idle" }),

  reset: () => set(initialState),
}));

export default useWatermarkStore;