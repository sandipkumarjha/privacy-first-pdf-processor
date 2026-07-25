const MIN_FILES = 2;
const MAX_FILES = 50;
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

export type ValidationErrorCode =
  | "INVALID_FILE_TYPE"
  | "FILE_TOO_LARGE"
  | "EMPTY_FILE"
  | "TOO_FEW_FILES"
  | "TOO_MANY_FILES";

export interface ValidationError {
  code: ValidationErrorCode;
  message: string;
  fileName?: string;
}

export interface FileValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface MultiFileValidationResult {
  valid: boolean;
  errors: ValidationError[];
  fileErrors: Map<string, ValidationError[]>;
}

export function validatePdf(file: File): FileValidationResult {
  const errors: ValidationError[] = [];

  const isPdfType =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!isPdfType) {
    errors.push({
      code: "INVALID_FILE_TYPE",
      message: `"${file.name}" is not a PDF file.`,
      fileName: file.name,
    });
  }

  if (file.size === 0) {
    errors.push({
      code: "EMPTY_FILE",
      message: `"${file.name}" is empty.`,
      fileName: file.name,
    });
  } else if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.push({
      code: "FILE_TOO_LARGE",
      message: `"${file.name}" exceeds the 100MB size limit.`,
      fileName: file.name,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateMultipleFiles(
  files: File[]
): MultiFileValidationResult {
  const errors: ValidationError[] = [];
  const fileErrors = new Map<string, ValidationError[]>();

  if (files.length < MIN_FILES) {
    errors.push({
      code: "TOO_FEW_FILES",
      message: `Select at least ${MIN_FILES} PDF files to merge.`,
    });
  }

  if (files.length > MAX_FILES) {
    errors.push({
      code: "TOO_MANY_FILES",
      message: `You can merge at most ${MAX_FILES} PDF files at once.`,
    });
  }

  for (const file of files) {
    const result = validatePdf(file);
    if (!result.valid) {
      fileErrors.set(file.name, result.errors);
      errors.push(...result.errors);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    fileErrors,
  };
}