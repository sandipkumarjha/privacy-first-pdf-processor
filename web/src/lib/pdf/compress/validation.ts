export type ValidationErrorCode =
  | "INVALID_FILE"
  | "EMPTY_FILE"
  | "FILE_TOO_LARGE"
  | "INVALID_TYPE"
  | "INVALID_PAGE_COUNT"
  | "INVALID_COMPRESSION_LEVEL";

export interface ValidationResult {
  valid: boolean;
  code?: ValidationErrorCode;
  message?: string;
}

export type CompressionLevel = "low" | "medium" | "high";

export const MAX_FILE_SIZE = 100 * 1024 * 1024;
export const SUPPORTED_TYPE = "application/pdf";

const COMPRESSION_LEVELS: readonly CompressionLevel[] = [
  "low",
  "medium",
  "high",
];

export function isPdf(file: File): boolean {
  return (
    file.type === SUPPORTED_TYPE || file.name.toLowerCase().endsWith(".pdf")
  );
}

export function isValidCompressionLevel(
  level: unknown
): level is CompressionLevel {
  return (
    typeof level === "string" &&
    COMPRESSION_LEVELS.includes(level as CompressionLevel)
  );
}

export function validatePdfFile(file: File): ValidationResult {
  if (!file) {
    return {
      valid: false,
      code: "INVALID_FILE",
      message: "No file was provided.",
    };
  }

  if (file.size <= 0) {
    return {
      valid: false,
      code: "EMPTY_FILE",
      message: `"${file.name}" is empty.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      code: "FILE_TOO_LARGE",
      message: `"${file.name}" exceeds the 100MB size limit.`,
    };
  }

  if (!isPdf(file)) {
    return {
      valid: false,
      code: "INVALID_TYPE",
      message: `"${file.name}" is not a PDF file.`,
    };
  }

  return { valid: true };
}

export function validatePageCount(pageCount: number): ValidationResult {
  if (!Number.isFinite(pageCount) || pageCount <= 0) {
    return {
      valid: false,
      code: "INVALID_PAGE_COUNT",
      message: "The PDF must contain at least one page.",
    };
  }

  return { valid: true };
}

export function validateCompressionLevel(level: unknown): ValidationResult {
  if (!isValidCompressionLevel(level)) {
    return {
      valid: false,
      code: "INVALID_COMPRESSION_LEVEL",
      message: 'Compression level must be "low", "medium", or "high".',
    };
  }

  return { valid: true };
}