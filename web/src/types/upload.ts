export interface UploadedFile {
    file: File;
    fileName: string;
    fileSize: number;
    uploadedAt: Date;
  }
  
  export interface ValidationError {
    code: 'INVALID_FILE_TYPE' | 'FILE_TOO_LARGE' | 'UNKNOWN';
    message: string;
  }
  
  export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
  export const ACCEPTED_MIME_TYPE = 'application/pdf';