export interface ValidationError {
    code: string;
    message: string;
  }
  
  export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
  }
  
  export const MAX_FILE_SIZE_MB = 100;
  export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  export const SUPPORTED_TYPE = "application/pdf";
  
  function isPdf(file: File): boolean {
    return (
      file.type === SUPPORTED_TYPE || file.name.toLowerCase().endsWith(".pdf")
    );
  }
  
  export function validatePdf(file: File): ValidationResult {
    const errors: ValidationError[] = [];
  
    if (!file) {
      errors.push({ code: "NO_FILE", message: "No PDF file selected." });
      return { valid: false, errors };
    }
  
    if (!isPdf(file)) {
      errors.push({
        code: "INVALID_TYPE",
        message: "Selected file is not a PDF.",
      });
    }
  
    if (file.size <= 0) {
      errors.push({
        code: "EMPTY_FILE",
        message: "The selected PDF is empty.",
      });
    }
  
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push({
        code: "TOO_LARGE",
        message: "PDF exceeds the maximum size of 100 MB.",
      });
    }
  
    return { valid: errors.length === 0, errors };
  }
  
  export function formatValidationErrors(errors: ValidationError[]): string {
    return errors.map((error) => error.message).join(" ");
  }