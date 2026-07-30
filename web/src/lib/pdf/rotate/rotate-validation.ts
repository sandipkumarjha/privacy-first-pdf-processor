export const MAX_FILE_SIZE = 100 * 1024 * 1024;
export const SUPPORTED_TYPE = "application/pdf";

export interface ValidationError {
  code: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

function isPdf(file: File): boolean {
  return (
    file.type === SUPPORTED_TYPE || file.name.toLowerCase().endsWith(".pdf")
  );
}

export function validatePdf(file: File): ValidationResult {
  const errors: ValidationError[] = [];

  if (!file) {
    errors.push({
      code: "NO_FILE",
      message: "No file selected.",
    });

    return { valid: false, errors };
  }

  if (!isPdf(file)) {
    errors.push({
      code: "INVALID_TYPE",
      message: "Only PDF files are supported.",
    });
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.push({
      code: "FILE_TOO_LARGE",
      message: "Maximum supported file size is 100 MB.",
    });
  }

  if (file.size <= 0) {
    errors.push({
      code: "EMPTY_FILE",
      message: "The selected file is empty.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}