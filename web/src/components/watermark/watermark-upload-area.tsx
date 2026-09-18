"use client";

import { PdfDropzone } from "@/components/ui/pdf-dropzone";

interface WatermarkUploadAreaProps {
  onFileSelect: (file: File) => void | Promise<void>;
  isLoading: boolean;
  fileName?: string;
  fileSize?: string;
}

export function WatermarkUploadArea(props: WatermarkUploadAreaProps) {
  return (
    <PdfDropzone
      title="Upload a PDF to watermark"
      description="Drag and drop a PDF, or browse from your device."
      {...props}
    />
  );
}

export default WatermarkUploadArea;
