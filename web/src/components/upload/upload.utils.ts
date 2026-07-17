import type {
  PdfMetadata,
  PdfThumbnail,
  UploadError,
  UploadValidationConfig,
  ValidationResult,
} from "./upload.types";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const DEFAULT_VALIDATION_CONFIG: UploadValidationConfig = {
  maxFileSizeBytes: 50 * 1024 * 1024,
  acceptedMimeTypes: ["application/pdf"],
  acceptedExtensions: [".pdf"],
};

const THUMBNAIL_MAX_WIDTH = 300;
const THUMBNAIL_SCALE_FALLBACK = 0.5;

export function generateFileId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `file_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 10)}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, exponent);

  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export function getFileExtension(fileName: string): string {
  const index = fileName.lastIndexOf(".");

  if (index === -1) return "";

  return fileName.substring(index).toLowerCase();
}

export function validateFile(
  file: File,
  config: UploadValidationConfig = DEFAULT_VALIDATION_CONFIG
): ValidationResult {
  if (file.size === 0) {
    return {
      valid: false,
      error: {
        code: "FILE_EMPTY",
        message: "The selected file is empty.",
      },
    };
  }

  const extension = getFileExtension(file.name);

  const validMime = config.acceptedMimeTypes.includes(file.type);

  const validExtension =
    config.acceptedExtensions.includes(extension);

  if (!validMime && !validExtension) {
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
        message: `Maximum allowed size is ${formatFileSize(
          config.maxFileSizeBytes
        )}`,
      },
    };
  }

  return {
    valid: true,
  };
}

export function toUploadError(
  error: unknown,
  fallback: UploadError["code"] = "UNKNOWN_ERROR"
): UploadError {
  if (error instanceof Error) {
    return {
      code: fallback,
      message: error.message,
    };
  }

  return {
    code: fallback,
    message: "Unknown error occurred.",
  };
}

/* ======================================================
      Extract Metadata
====================================================== */

export async function extractPdfMetadata(
  file: File
): Promise<PdfMetadata> {
  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: arrayBuffer,
  });

  try {
    const pdf = await loadingTask.promise;

    const metadata = await pdf.getMetadata().catch(() => null);

    const info = metadata?.info as
      | Record<string, unknown>
      | undefined;

    return {
      pageCount: pdf.numPages,
      title:
        typeof info?.Title === "string"
          ? info.Title
          : undefined,
      author:
        typeof info?.Author === "string"
          ? info.Author
          : undefined,
      fileSizeBytes: file.size,
      isEncrypted: false,
    };
  } catch (err) {
    console.error(err);

    throw new Error(
      err instanceof Error
        ? err.message
        : "Unable to read PDF."
    );
  } finally {
    await loadingTask.destroy();
  }
}

/* ======================================================
      Thumbnail
====================================================== */

export async function generatePdfThumbnail(
  file: File
): Promise<PdfThumbnail> {
  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: arrayBuffer,
  });

  try {
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);

    const baseViewport = page.getViewport({
      scale: 1,
    });

    const scale =
      baseViewport.width > 0
        ? THUMBNAIL_MAX_WIDTH / baseViewport.width
        : THUMBNAIL_SCALE_FALLBACK;

    const viewport = page.getViewport({
      scale,
    });

    const canvas = document.createElement("canvas");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas not supported.");
    }

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    if (!blob) {
      throw new Error("Unable to generate thumbnail.");
    }

    return {
      objectUrl: URL.createObjectURL(blob),
      width: viewport.width,
      height: viewport.height,
    };
  } finally {
    await loadingTask.destroy();
  }
}

export function revokeObjectUrlSafely(
  url?: string | null
) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

export function filterPdfCandidates(
  files: File[]
): File[] {
  return files.filter(
    (file) =>
      file.type === "application/pdf" ||
      getFileExtension(file.name) === ".pdf"
  );
}