export interface ValidationError {
  code: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;
const SUPPORTED_TYPE = "application/pdf";

function isPdf(file: File): boolean {
  return (
    file.type === SUPPORTED_TYPE || file.name.toLowerCase().endsWith(".pdf")
  );
}

export function validatePdf(file: File): ValidationResult {
  const errors: ValidationError[] = [];

  if (!file) {
    errors.push({ code: "NO_FILE", message: "No PDF selected." });
    return { valid: false, errors };
  }

  if (!isPdf(file)) {
    errors.push({
      code: "INVALID_TYPE",
      message: "Only PDF files are supported.",
    });
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.push({
      code: "FILE_TOO_LARGE",
      message: "PDF exceeds the 100 MB limit.",
    });
  }

  if (file.size <= 0) {
    errors.push({
      code: "EMPTY_FILE",
      message: "The selected PDF is empty.",
    });
  }

  return { valid: errors.length === 0, errors };
}