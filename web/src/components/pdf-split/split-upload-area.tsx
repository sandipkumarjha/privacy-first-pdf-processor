"use client";

import { PdfDropzone } from "@/components/ui/pdf-dropzone";

interface SplitUploadAreaProps {
  onFileSelect: (file: File) => void | Promise<void>;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

export function SplitUploadArea(props: SplitUploadAreaProps) {
  return (
    <PdfDropzone
      title="Upload a PDF to split"
      description="Drag and drop a PDF, or browse from your device."
      {...props}
    />
  );
}

export default SplitUploadArea;
