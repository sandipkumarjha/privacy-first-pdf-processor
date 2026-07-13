// components/pdf-upload/upload.utils.ts

import type {
    PdfMetadata,
    PdfThumbnail,
    UploadError,
    UploadValidationConfig,
    ValidationResult,
  } from "./upload.types";
  
  /**
   * Default validation rules. Can be overridden via PdfUploadProps.validationConfig.
   */
  export const DEFAULT_VALIDATION_CONFIG: UploadValidationConfig = {
    maxFileSizeBytes: 50 * 1024 * 1024, // 50MB
    acceptedMimeTypes: ["application/pdf"],
    acceptedExtensions: [".pdf"],
  };
  
  const THUMBNAIL_MAX_WIDTH = 300;
  const THUMBNAIL_SCALE_FALLBACK = 0.5;
  
  /**
   * Generates a stable, unique ID for a file entity.
   * Uses crypto.randomUUID when available, falls back for older browsers.
   */
  export function generateFileId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `file_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }
  
  /**
   * Formats bytes into a human-readable string (KB, MB, GB).
   */
  export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const exponent = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );
    const value = bytes / Math.pow(1024, exponent);
    const formatted = exponent === 0 ? value.toString() : value.toFixed(1);
    return `${formatted} ${units[exponent]}`;
  }
  
  /**
   * Extracts the file extension (lowercased, with leading dot) from a filename.
   */
  export function getFileExtension(fileName: string): string {
    const lastDot = fileName.lastIndexOf(".");
    if (lastDot === -1) return "";
    return fileName.slice(lastDot).toLowerCase();
  }
  
  /**
   * Validates a raw File against the given validation config.
   * Pure function — does not throw, returns a discriminated union.
   */
  export function validateFile(
    file: File,
    config: UploadValidationConfig = DEFAULT_VALIDATION_CONFIG
  ): ValidationResult {
    if (file.size === 0) {
      return {
        valid: false,
        error: {
          code: "FILE_EMPTY",
          message: "This file is empty and cannot be processed.",
        },
      };
    }
  
    const extension = getFileExtension(file.name);
    const hasValidMimeType = config.acceptedMimeTypes.includes(file.type);
    const hasValidExtension = config.acceptedExtensions.includes(extension);
  
    // Some browsers/OSes fail to set MIME type correctly for PDFs,
    // so we accept if EITHER mime type OR extension matches.
    if (!hasValidMimeType && !hasValidExtension) {
      return {
        valid: false,
        error: {
          code: "INVALID_FILE_TYPE",
          message: "Only PDF files are supported.",
        },
      };
    }
  
    if (file.size > config.maxFileSizeBytes) {
      return {
        valid: false,
        error: {
          code: "FILE_TOO_LARGE",
          message: `File exceeds the ${formatFileSize(
            config.maxFileSizeBytes
          )} size limit.`,
        },
      };
    }
  
    return { valid: true };
  }
  
  /**
   * Maps unknown errors (thrown during async processing) into a
   * typed UploadError, so the UI never has to deal with raw `unknown`.
   */
  export function toUploadError(
    err: unknown,
    fallbackCode: UploadError["code"] = "UNKNOWN_ERROR"
  ): UploadError {
    if (err instanceof Error) {
      return { code: fallbackCode, message: err.message };
    }
    return { code: fallbackCode, message: "Something went wrong. Please try again." };
  }
  
  /**
   * Reads PDF metadata (page count, title, author, encryption status)
   * using pdf.js. Assumes pdfjs-dist's `getDocument` API.
   *
   * Note: dynamic import keeps pdf.js out of the main bundle until
   * a file is actually uploaded.
   */
  export async function extractPdfMetadata(file: File): Promise<PdfMetadata> {
    const pdfjs = await import("pdfjs-dist");
    const arrayBuffer = await file.arrayBuffer();
  
    // Encrypted PDFs still load (pdf.js handles empty-password decryption),
    // but we detect the flag to surface it in the UI if needed.
    let isEncrypted = false;
    let pageCount = 0;
    let title: string | undefined;
    let author: string | undefined;
  
    try {
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdfDocument = await loadingTask.promise;
  
      pageCount = pdfDocument.numPages;
      isEncrypted = (pdfDocument as unknown as { _pdfInfo?: { encrypted?: boolean } })
        ._pdfInfo?.encrypted ?? false;
  
      const metadata = await pdfDocument.getMetadata().catch(() => null);
      const info = metadata?.info as Record<string, unknown> | undefined;
      title = typeof info?.Title === "string" ? info.Title : undefined;
      author = typeof info?.Author === "string" ? info.Author : undefined;
  
      await pdfDocument.destroy();
    } catch {
      throw new Error(
        "This PDF appears to be corrupted or is not a valid PDF file."
      );
    }
  
    return {
      pageCount,
      title,
      author,
      fileSizeBytes: file.size,
      isEncrypted,
    };
  }
  
  /**
   * Renders the first page of a PDF to a canvas and converts it to a
   * thumbnail object URL. Runs entirely client-side via pdf.js.
   */
  export async function generatePdfThumbnail(file: File): Promise<PdfThumbnail> {
    const pdfjs = await import("pdfjs-dist");
    const arrayBuffer = await file.arrayBuffer();
  
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;
  
    try {
      const page = await pdfDocument.getPage(1);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale =
        baseViewport.width > 0
          ? THUMBNAIL_MAX_WIDTH / baseViewport.width
          : THUMBNAIL_SCALE_FALLBACK;
      const viewport = page.getViewport({ scale });
  
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
  
      if (!context) {
        throw new Error("Canvas rendering is not supported in this browser.");
      }
  
      await page.render({ canvas, canvasContext: context, viewport }).promise;
  
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
  
      if (!blob) {
        throw new Error("Failed to generate thumbnail image.");
      }
  
      return {
        objectUrl: URL.createObjectURL(blob),
        width: viewport.width,
        height: viewport.height,
      };
    } finally {
      await pdfDocument.destroy();
    }
  }
  
  /**
   * Revokes object URLs to prevent memory leaks. Safe to call with
   * null/undefined — no-ops silently.
   */
  export function revokeObjectUrlSafely(url: string | null | undefined): void {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }
  
  /**
   * Filters a FileList/File[] down to only PDF-plausible files,
   * used to pre-filter drag-drop payloads before full validation.
   */
  export function filterPdfCandidates(files: File[]): File[] {
    return files.filter(
      (file) =>
        file.type === "application/pdf" ||
        getFileExtension(file.name) === ".pdf"
    );
  }