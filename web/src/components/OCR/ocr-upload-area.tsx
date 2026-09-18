"use client";

import { PdfDropzone } from "@/components/ui/pdf-dropzone";

interface OcrUploadAreaProps {
  onFileSelect: (file: File) => void | Promise<void>;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

export function OcrUploadArea(props: OcrUploadAreaProps) {
  return (
    <PdfDropzone
      title="Upload a scanned PDF"
      description="Text is recognised in your browser — the scan is never uploaded."
      {...props}
    />
  );
}

export default OcrUploadArea;
