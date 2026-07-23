import { create } from "zustand";
import type { SplitOptions, SplitStore } from "@/types/split";

const DEFAULT_OPTIONS: SplitOptions = {
  mode: "range",
  ranges: [],
  selectedPages: [],
};

const INITIAL_STATE = {
  status: "idle" as const,
  document: null,
  options: DEFAULT_OPTIONS,
  results: [],
  error: null,
  progress: 0,
};

export const useSplitStore = create<SplitStore>((set) => ({
  ...INITIAL_STATE,

  setDocument: (document) => set({ document }),

  setStatus: (status) => set({ status }),

  setError: (error) => set({ error }),

  setProgress: (progress) => set({ progress }),

  setMode: (mode) =>
    set((state) => ({ options: { ...state.options, mode } })),

  togglePageSelection: (pageNumber) =>
    set((state) => {
      const selected = state.options.selectedPages.includes(pageNumber)
        ? state.options.selectedPages.filter((p) => p !== pageNumber)
        : [...state.options.selectedPages, pageNumber];
      return { options: { ...state.options, selectedPages: selected } };
    }),

  setSelectedPages: (pages) =>
    set((state) => ({ options: { ...state.options, selectedPages: pages } })),

  addRange: (range) =>
    set((state) => ({
      options: { ...state.options, ranges: [...state.options.ranges, range] },
    })),

  removeRange: (rangeId) =>
    set((state) => ({
      options: {
        ...state.options,
        ranges: state.options.ranges.filter((r) => r.id !== rangeId),
      },
    })),

  updateRange: (rangeId, patch) =>
    set((state) => ({
      options: {
        ...state.options,
        ranges: state.options.ranges.map((r) =>
          r.id === rangeId ? { ...r, ...patch } : r
        ),
      },
    })),

  setResults: (results) => set({ results }),

  reset: () => set({ ...INITIAL_STATE, options: DEFAULT_OPTIONS }),
}));