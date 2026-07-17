import { ValidationError, MAX_FILE_SIZE, ACCEPTED_MIME_TYPE } from '@/types/upload';

export function validatePDF(file: File): ValidationError | null {
  if (!validateMimeType(file)) {
    return {
      code: 'INVALID_FILE_TYPE',
      message: 'Only PDF files are accepted. Please select a valid PDF.',
    };
  }

  if (!validateSize(file)) {
    return {
      code: 'FILE_TOO_LARGE',
      message: `File size exceeds 100MB limit. Your file is ${getReadableFileSize(file.size)}.`,
    };
  }

  return null;
}

export function validateMimeType(file: File): boolean {
  return file.type === ACCEPTED_MIME_TYPE;
}

export function validateSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

export function getReadableFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}