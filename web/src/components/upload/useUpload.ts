// components/pdf-upload/useUpload.ts

import { useCallback, useRef } from "react";
import { create } from "zustand";
import type {
  UploadedFile,
  UploadValidationConfig,
  UseUploadReturn,
} from "./upload.types";
import {
  DEFAULT_VALIDATION_CONFIG,
  extractPdfMetadata,
  filterPdfCandidates,
  generateFileId,
  generatePdfThumbnail,
  revokeObjectUrlSafely,
  toUploadError,
  validateFile,
} from "./upload.utils";

/* -------------------------------------------------------------------------- */
/*                                Zustand Store                               */
/* -------------------------------------------------------------------------- */

interface UploadStoreState {
  files: UploadedFile[];
  activeFileId: string | null;
  isDragging: boolean;
}

interface UploadStoreActions {
  setFiles: (files: UploadedFile[]) => void;
  upsertFile: (file: UploadedFile) => void;
  patchFile: (id: string, patch: Partial<UploadedFile>) => void;
  removeFileById: (id: string) => void;
  setActiveFileId: (id: string | null) => void;
  setIsDragging: (isDragging: boolean) => void;
}

type UploadStore = UploadStoreState & UploadStoreActions;

/**
 * Zustand store is the single source of truth for upload state.
 * Kept private to this module — consumers only interact via useUpload().
 */
const useUploadStore = create<UploadStore>((set) => ({
  files: [],
  activeFileId: null,
  isDragging: false,

  setFiles: (files) => set({ files }),

  upsertFile: (file) =>
    set((state) => {
      const exists = state.files.some((f) => f.id === file.id);
      return {
        files: exists
          ? state.files.map((f) => (f.id === file.id ? file : f))
          : [...state.files, file],
      };
    }),

  patchFile: (id, patch) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })),

  removeFileById: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
      activeFileId: state.activeFileId === id ? null : state.activeFileId,
    })),

  setActiveFileId: (id) => set({ activeFileId: id }),
  setIsDragging: (isDragging) => set({ isDragging }),
}));

/* -------------------------------------------------------------------------- */
/*                                 useUpload Hook                             */
/* -------------------------------------------------------------------------- */

interface UseUploadOptions {
  multiple?: boolean;
  validationConfig?: Partial<UploadValidationConfig>;
  onFileReady?: (file: UploadedFile) => void;
  onFileRemove?: (fileId: string) => void;
}

/**
 * Central business-logic hook for the upload module.
 * UI components consume this and this ONLY — no direct store access,
 * no direct utils access. This keeps the dependency graph one-directional:
 * components -> useUpload -> utils/store.
 */
export function useUpload(options: UseUploadOptions = {}): UseUploadReturn {
  const { multiple = false, validationConfig, onFileReady, onFileRemove } =
    options;

  const files = useUploadStore((state) => state.files);
  const activeFileId = useUploadStore((state) => state.activeFileId);
  const isDragging = useUploadStore((state) => state.isDragging);

  const upsertFile = useUploadStore((state) => state.upsertFile);
  const patchFile = useUploadStore((state) => state.patchFile);
  const removeFileById = useUploadStore((state) => state.removeFileById);
  const setActiveFileId = useUploadStore((state) => state.setActiveFileId);
  const setIsDraggingState = useUploadStore((state) => state.setIsDragging);

  // Merge default + override validation config once per render is fine,
  // it's a cheap object spread.
  const resolvedConfig: UploadValidationConfig = {
    ...DEFAULT_VALIDATION_CONFIG,
    ...validationConfig,
  };

  // Guards against stale async writes if a file is removed mid-processing.
  const inFlightIds = useRef<Set<string>>(new Set());

  const activeFile = files.find((f) => f.id === activeFileId) ?? null;

  /**
   * Core async pipeline: validate -> register -> extract metadata ->
   * generate thumbnail -> mark ready. Each stage patches store state
   * so the UI can render granular progress.
   */
  const processFile = useCallback(
    async (file: File, existingId?: string) => {
      const id = existingId ?? generateFileId();
      inFlightIds.current.add(id);

      const baseEntry: UploadedFile = {
        id,
        file,
        fileName: file.name,
        fileSizeBytes: file.size,
        status: "validating",
        progress: 0,
        error: null,
        metadata: null,
        thumbnail: null,
        previewObjectUrl: null,
        createdAt: Date.now(),
      };
      upsertFile(baseEntry);

      const validation = validateFile(file, resolvedConfig);
      if (!validation.valid) {
        patchFile(id, { status: "error", error: validation.error, progress: 0 });
        inFlightIds.current.delete(id);
        return;
      }

      try {
        patchFile(id, { status: "uploading", progress: 30 });

        // Simulated local "upload" stage — in a fully local pipeline this
        // represents reading the file into memory, kept for UX consistency
        // with progress bar semantics.
        const previewObjectUrl = URL.createObjectURL(file);

        if (!inFlightIds.current.has(id)) return; // removed mid-flight
        patchFile(id, {
          status: "generating-preview",
          progress: 60,
          previewObjectUrl,
        });

        const [metadata, thumbnail] = await Promise.all([
          extractPdfMetadata(file),
          generatePdfThumbnail(file),
        ]);

        if (!inFlightIds.current.has(id)) return; // removed mid-flight

        const readyEntry: Partial<UploadedFile> = {
          status: "ready",
          progress: 100,
          metadata,
          thumbnail,
        };
        patchFile(id, readyEntry);
        setActiveFileId(id);

        const finalFile = useUploadStore.getState().files.find((f) => f.id === id);
        if (finalFile) onFileReady?.(finalFile);
      } catch (err) {
        if (!inFlightIds.current.has(id)) return;
        patchFile(id, {
          status: "error",
          progress: 0,
          error: toUploadError(err, "PREVIEW_GENERATION_FAILED"),
        });
      } finally {
        inFlightIds.current.delete(id);
      }
    },
    [resolvedConfig, upsertFile, patchFile, setActiveFileId, onFileReady]
  );

  /**
   * Accepts raw FileList/File[] (from drop or browse), filters to PDF
   * candidates, and kicks off processing for each. Respects `multiple`.
   */
  const addFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const rawFiles = Array.from(fileList);
      const candidates = filterPdfCandidates(rawFiles);

      if (candidates.length === 0) {
        // No plausible PDFs at all — surface a single error card so the
        // user gets feedback even though nothing was added to state.
        const id = generateFileId();
        upsertFile({
          id,
          file: rawFiles[0] ?? new File([], "unknown"),
          fileName: rawFiles[0]?.name ?? "Unknown file",
          fileSizeBytes: rawFiles[0]?.size ?? 0,
          status: "error",
          progress: 0,
          error: {
            code: "INVALID_FILE_TYPE",
            message: "Only PDF files are supported.",
          },
          metadata: null,
          thumbnail: null,
          previewObjectUrl: null,
          createdAt: Date.now(),
        });
        return;
      }

      const targets = multiple ? candidates : [candidates[0]];

      if (!multiple && files.length > 0) {
        // Single-file mode: replace whatever is currently active.
        files.forEach((f) => {
          revokeObjectUrlSafely(f.previewObjectUrl);
          revokeObjectUrlSafely(f.thumbnail?.objectUrl);
        });
        useUploadStore.getState().setFiles([]);
      }

      await Promise.all(targets.map((file) => processFile(file)));
    },
    [multiple, files, processFile, upsertFile]
  );

  /**
   * Removes a file from state and revokes its object URLs to prevent
   * memory leaks (critical since we generate blob URLs per file).
   */
  const removeFile = useCallback(
    (fileId: string) => {
      inFlightIds.current.delete(fileId);
      const target = files.find((f) => f.id === fileId);
      if (target) {
        revokeObjectUrlSafely(target.previewObjectUrl);
        revokeObjectUrlSafely(target.thumbnail?.objectUrl);
      }
      removeFileById(fileId);
      onFileRemove?.(fileId);
    },
    [files, removeFileById, onFileRemove]
  );

  /**
   * Replaces an existing file entry with a new File, re-running the
   * full processing pipeline under the same entity ID.
   */
  const replaceFile = useCallback(
    async (fileId: string, newFile: File) => {
      const existing = files.find((f) => f.id === fileId);
      if (existing) {
        revokeObjectUrlSafely(existing.previewObjectUrl);
        revokeObjectUrlSafely(existing.thumbnail?.objectUrl);
      }
      await processFile(newFile, fileId);
    },
    [files, processFile]
  );

  /**
   * Re-runs processing for a file currently in an error state,
   * using the same File object that failed.
   */
  const retryFile = useCallback(
    async (fileId: string) => {
      const existing = files.find((f) => f.id === fileId);
      if (!existing) return;
      await processFile(existing.file, fileId);
    },
    [files, processFile]
  );

  const setIsDragging = useCallback(
    (dragging: boolean) => setIsDraggingState(dragging),
    [setIsDraggingState]
  );

  /**
   * Drag-and-drop handler. UI components wire this directly to
   * onDrop — all logic (preventDefault, extraction, dispatch) lives here.
   */
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDraggingState(false);
      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles && droppedFiles.length > 0) {
        void addFiles(droppedFiles);
      }
    },
    [addFiles, setIsDraggingState]
  );

  /**
   * File input change handler for the "Browse Files" button.
   * Resets input value after read so selecting the same file twice
   * still fires onChange.
   */
  const handleBrowseSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
  
      if (selectedFiles) {
        void addFiles(selectedFiles);
      }
  
      event.target.value = "";
    },
    [addFiles]
  );
  const handleFileSelect = useCallback(
    (file: File) => {
      void addFiles([file]);
    },
    [addFiles]
  );
  return {
    files,
    activeFile,
    isDragging,
    addFiles,
    removeFile,
    replaceFile,
    retryFile,
    setIsDragging,
    handleDrop,
    handleBrowseSelect,
    handleFileSelect,
  };
}