"use client";

import { PdfDropzone } from "@/components/ui/pdf-dropzone";

interface ExtractUploadAreaProps {
  onFileSelect: (file: File) => void | Promise<void>;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

export function ExtractUploadArea(props: ExtractUploadAreaProps) {
  return (
    <PdfDropzone
      title="Upload a PDF to extract pages"
      description="Drag and drop a PDF, or browse from your device."
      {...props}
    />
  );
}

export default ExtractUploadArea;
