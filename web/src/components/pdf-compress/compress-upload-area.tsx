"use client";

import { PdfDropzone } from "@/components/ui/pdf-dropzone";

interface CompressUploadAreaProps {
  onFileSelect: (file: File) => void | Promise<void>;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

export function CompressUploadArea(props: CompressUploadAreaProps) {
  return (
    <PdfDropzone
      title="Upload a PDF to compress"
      description="Drag and drop a PDF, or browse from your device."
      {...props}
    />
  );
}

export default CompressUploadArea;
