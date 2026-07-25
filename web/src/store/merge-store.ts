import { create } from "zustand";

export type MergeStatus =
  | "idle"
  | "loading"
  | "ready"
  | "merging"
  | "completed"
  | "error";

export interface MergeFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number;
  thumbnail?: string;
}

interface MergeState {
  files: MergeFile[];
  status: MergeStatus;
  progress: number;
  error: string | null;
  mergedBytes: Uint8Array | null;
}

interface MergeActions {
  addFiles: (files: MergeFile[]) => void;
  removeFile: (id: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  clearFiles: () => void;
  setStatus: (status: MergeStatus) => void;
  setProgress: (progress: number) => void;
  setMergedBytes: (bytes: Uint8Array | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

type MergeStore = MergeState & MergeActions;

const initialState: MergeState = {
  files: [],
  status: "idle",
  progress: 0,
  error: null,
  mergedBytes: null,
};

export const useMergeStore = create<MergeStore>((set) => ({
  ...initialState,

  addFiles: (files) =>
    set((state) => ({
      files: [...state.files, ...files],
    })),

  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
    })),

  moveUp: (id) =>
    set((state) => {
      const index = state.files.findIndex((f) => f.id === id);
      if (index <= 0) return state;

      const files = [...state.files];
      [files[index - 1], files[index]] = [files[index], files[index - 1]];

      return { files };
    }),

  moveDown: (id) =>
    set((state) => {
      const index = state.files.findIndex((f) => f.id === id);
      if (index === -1 || index >= state.files.length - 1) return state;

      const files = [...state.files];
      [files[index], files[index + 1]] = [files[index + 1], files[index]];

      return { files };
    }),

  clearFiles: () => set({ files: [] }),

  setStatus: (status) => set({ status }),

  setProgress: (progress) => set({ progress }),

  setMergedBytes: (mergedBytes) => set({ mergedBytes }),

  setError: (error) => set({ error, status: error ? "error" : "idle" }),

  reset: () => set(initialState),
}));

export default useMergeStore;