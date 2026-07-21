// components/pdf-upload/upload.types.ts

/**
 * Core status of a file as it moves through the upload pipeline.
 */
export type UploadStatus =
  | "idle"
  | "validating"
  | "uploading"
  | "generating-preview"
  | "ready"
  | "error";

/**
 * Categorized error codes so UI can render specific messages / icons
 * without string-matching on error messages.
 */
export type UploadErrorCode =
  | "INVALID_FILE_TYPE"
  | "FILE_TOO_LARGE"
  | "FILE_EMPTY"
  | "CORRUPTED_PDF"
  | "PREVIEW_GENERATION_FAILED"
  | "UNKNOWN_ERROR";

export interface UploadError {
  code: UploadErrorCode;
  message: string;
}

/**
 * Metadata extracted from the PDF itself (via pdf.js) once parsed.
 */
export interface PdfMetadata {
  pageCount: number;
  title?: string;
  author?: string;
  fileSizeBytes: number;
  isEncrypted: boolean;
}

/**
 * A thumbnail rendered from the first page of the PDF.
 * Stored as an object URL for cheap re-render / cleanup.
 */
export interface PdfThumbnail {
  objectUrl: string;
  width: number;
  height: number;
}

/**
 * The central entity representing a single uploaded file
 * as it exists in the Zustand store.
 */
export interface UploadedFile {
  id: string;
  file: File;
  fileName: string;
  fileSizeBytes: number;
  status: UploadStatus;
  progress: number; // 0-100
  error: UploadError | null;
  metadata: PdfMetadata | null;
  thumbnail: PdfThumbnail | null;
  previewObjectUrl: string | null; // full PDF blob URL for preview-panel
  createdAt: number;
}

/**
 * Configuration for validation rules. Kept injectable so limits
 * can be overridden per-deployment (e.g. free vs pro tier) without
 * touching validation logic.
 */
export interface UploadValidationConfig {
  maxFileSizeBytes: number;
  acceptedMimeTypes: string[];
  acceptedExtensions: string[];
}

/**
 * Result of running validation against a raw File.
 * Discriminated union so consumers get type-narrowing for free.
 */
export type ValidationResult =
  | { valid: true }
  | { valid: false; error: UploadError };

/**
 * Props contract for the top-level orchestrator component.
 */
export interface PdfUploadProps {
  /** Called once a file has finished processing and is ready for the next step. */
  onFileReady?: (file: UploadedFile) => void;
  /** Called when the user removes a file. */
  onFileRemove?: (fileId: string) => void;
  /** Allow multiple files. Defaults to false (single-file workflow). */
  multiple?: boolean;
  /** Override default validation config. */
  validationConfig?: Partial<UploadValidationConfig>;
  /** Extra classNames for the root container. */
  className?: string;
}

/**
 * Return shape of the useUpload hook — the single source of truth
 * for all upload business logic consumed by UI components.
 */
export interface UseUploadReturn {
  files: UploadedFile[];
  activeFile: UploadedFile | null;

  isDragging: boolean;

  addFiles: (fileList: FileList | File[]) => Promise<void>;

  removeFile: (fileId: string) => void;

  replaceFile: (fileId: string, newFile: File) => Promise<void>;

  retryFile: (fileId: string) => Promise<void>;

  setIsDragging: (isDragging: boolean) => void;

  handleDrop: (event: React.DragEvent<HTMLElement>) => void;

  // changed
  handleBrowseSelect: (file: File) => void;
}