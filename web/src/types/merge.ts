/**
 * PDF Merge Feature Types
 */

export interface MergePDFFile {
    id: string;
    file: File;
    fileName: string;
    fileSize: number;
    order: number;
    uploadedAt: Date;
  }
  
  export interface MergeState {
    files: MergePDFFile[];
    isLoading: boolean;
    isMerging: boolean;
    error: string | null;
    mergeProgress: number;
  }
  
  export interface MergeError {
    code: 'INVALID_FILE' | 'MERGE_FAILED' | 'NO_FILES' | 'UNKNOWN';
    message: string;
  }
  
  export interface MergeResult {
    success: boolean;
    fileName: string;
    fileSize: number;
    mergedAt: Date;
  }