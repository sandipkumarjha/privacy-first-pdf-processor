"use client";

import { PdfDropzone } from "@/components/ui/pdf-dropzone";

interface RotateUploadAreaProps {
  onFileSelect: (file: File) => void | Promise<void>;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

export function RotateUploadArea(props: RotateUploadAreaProps) {
  return (
    <PdfDropzone
      title="Upload a PDF to rotate"
      description="Drag and drop a PDF, or browse from your device."
      {...props}
    />
  );
}

export default RotateUploadArea;
