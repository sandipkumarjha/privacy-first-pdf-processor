export const MAX_FILE_SIZE = 100 * 1024 * 1024;
export const SUPPORTED_TYPE = "application/pdf";

export type ValidationIssueSeverity = "error" | "warning";

export interface ValidationIssue {
  code: string;
  message: string;
  severity: ValidationIssueSeverity;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

function isPdf(file: File): boolean {
  return (
    file.type === SUPPORTED_TYPE || file.name.toLowerCase().endsWith(".pdf")
  );
}

/**
 * Validates a PDF file before it is loaded for extraction. Collects every
 * applicable issue rather than stopping at the first failure, except when
 * the file itself is missing, in which case no further checks are
 * possible.
 */
export function validatePdf(file: File): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  if (!file) {
    errors.push({
      code: "NO_FILE",
      message: "No PDF selected.",
      severity: "error",
    });

    return { valid: false, errors, warnings };
  }

  if (!isPdf(file)) {
    errors.push({
      code: "INVALID_TYPE",
      message: "Selected file is not a PDF.",
      severity: "error",
    });
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.push({
      code: "FILE_TOO_LARGE",
      message: "PDF exceeds the 100 MB limit.",
      severity: "error",
    });
  }

  if (file.size <= 0) {
    errors.push({
      code: "EMPTY_FILE",
      message: "Selected PDF is empty.",
      severity: "error",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export default validatePdf;