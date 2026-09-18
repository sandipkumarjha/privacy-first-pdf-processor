"use client";

import { PdfDropzone } from "@/components/ui/pdf-dropzone";

interface MergeUploadAreaProps {
  onFilesSelect: (files: File[]) => void;
  isLoading?: boolean;
  className?: string;
}

export function MergeUploadArea({
  onFilesSelect,
  isLoading = false,
  className,
}: MergeUploadAreaProps) {
  return (
    <PdfDropzone
      multiple
      title="Upload PDFs to merge"
      description="Drop two or more PDFs here, or browse from your device."
      isLoading={isLoading}
      onFilesSelect={onFilesSelect}
      className={className}
    />
  );
}

export default MergeUploadArea;
