import { UploadedFile, UploadError } from "../components/upload/upload.types";

/**
 * Convert bytes into a readable format
 * Example:
 * 1024 -> 1 KB
 * 1048576 -> 1 MB
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(2))} ${
    units[index]
  }`;
}

/**
 * Generate a unique id for uploaded files
 */
export function generateFileId(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}`;
}

/**
 * Check whether the file is a valid PDF
 */
export function isPdfFile(file: File): boolean {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

/**
 * Validate file size
 */
export function isValidFileSize(
  file: File,
  maxFileSize: number
): boolean {
  return file.size <= maxFileSize;
}

/**
 * Validate uploaded files
 */
export function validateFiles(
  files: File[],
  maxFiles: number,
  maxFileSize: number
): UploadError | null {
  if (files.length > maxFiles) {
    return {
      code: "TOO_MANY_FILES",
      message: `Maximum ${maxFiles} file(s) allowed.`,
    };
  }

  for (const file of files) {
    if (!isPdfFile(file)) {
      return {
        code: "INVALID_TYPE",
        message: `${file.name} is not a PDF file.`,
      };
    }

    if (!isValidFileSize(file, maxFileSize)) {
      return {
        code: "FILE_TOO_LARGE",
        message: `${file.name} exceeds the maximum allowed size of ${formatFileSize(
          maxFileSize
        )}.`,
      };
    }
  }

  return null;
}

/**
 * Convert File objects into UploadedFile objects
 */
export function createUploadedFiles(
  files: File[]
): UploadedFile[] {
  return files.map((file) => ({
    id: generateFileId(),
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    status: "success",
    progress: 100,
  }));
}

/**
 * Simulate upload progress
 * (Useful for showing progress even though
 * PDFs are processed locally.)
 */
export async function simulateProgress(
  callback: (progress: number) => void,
  delay = 15
): Promise<void> {
  for (let progress = 0; progress <= 100; progress += 5) {
    callback(progress);

    await new Promise((resolve) =>
      setTimeout(resolve, delay)
    );
  }
}