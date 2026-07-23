export type SplitMode = "range" | "custom" | "all" | "size";

export type SplitStatus =
  | "idle"
  | "loading-pdf"
  | "ready"
  | "splitting"
  | "completed"
  | "error";

export interface SplitPageInfo {
  pageNumber: number;
  thumbnailUrl: string | null;
  selected: boolean;
  width: number;
  height: number;
}

export interface SplitRange {
  id: string;
  from: number;
  to: number;
}

export interface SplitError {
  code:
    | "INVALID_FILE"
    | "LOAD_FAILED"
    | "INVALID_RANGE"
    | "SPLIT_FAILED"
    | "NO_PAGES_SELECTED"
    | "UNKNOWN_ERROR";
  message: string;
}

export interface SplitResultFile {
  id: string;
  fileName: string;
  blob: Blob;
  objectUrl: string;
  pageCount: number;
  sizeBytes: number;
}

export interface SplitDocument {
  fileName: string;
  file: File;
  totalPages: number;
  pages: SplitPageInfo[];
}

export interface SplitOptions {
  mode: SplitMode;
  ranges: SplitRange[];
  selectedPages: number[];
  maxSizeBytes?: number;
}

export interface SplitState {
  status: SplitStatus;
  document: SplitDocument | null;
  options: SplitOptions;
  results: SplitResultFile[];
  error: SplitError | null;
  progress: number;
}

export interface SplitStateActions {
  setDocument: (document: SplitDocument | null) => void;
  setStatus: (status: SplitStatus) => void;
  setError: (error: SplitError | null) => void;
  setProgress: (progress: number) => void;
  setMode: (mode: SplitMode) => void;
  togglePageSelection: (pageNumber: number) => void;
  setSelectedPages: (pages: number[]) => void;
  addRange: (range: SplitRange) => void;
  removeRange: (rangeId: string) => void;
  updateRange: (rangeId: string, patch: Partial<SplitRange>) => void;
  setResults: (results: SplitResultFile[]) => void;
  reset: () => void;
}

export type SplitStore = SplitState & SplitStateActions;

export interface SplitEngineInput {
  file: File;
  options: SplitOptions;
}

export interface SplitEngineResult {
  files: SplitResultFile[];
}

export interface UsePdfSplitReturn {
  state: SplitState;
  loadDocument: (file: File) => Promise<void>;
  setMode: (mode: SplitMode) => void;
  togglePageSelection: (pageNumber: number) => void;
  addRange: (range: Omit<SplitRange, "id">) => void;
  removeRange: (rangeId: string) => void;
  updateRange: (rangeId: string, patch: Partial<SplitRange>) => void;
  executeSplit: () => Promise<void>;
  reset: () => void;
}