"use client";

import React, { useRef } from "react";
import { useUpload } from "./useUpload";
import { formatFileSize, getFileSizeIcon } from "./upload.utils";
import { PDFUploadComponentProps } from "./upload.types";
import {
  Upload,
  X,
  Check,
  AlertCircle,
  File,
  Loader2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const PDFUpload = React.forwardRef<
  HTMLDivElement,
  PDFUploadComponentProps
>(
  (
    {
      onFilesSelected,
      onFilesUploaded,
      onError,
      maxFileSize = 50,
      maxFiles = 10,
      disabled = false,
      className,
    },
    ref
  ) => {
    const {
      files,
      isDragging,
      isLoading,
      handleDrop,
      handleDragOver,
      handleDragLeave,
      handleFileSelect,
      removeFile,
      clearAll,
      uploadFiles,
    } = useUpload({
      maxFileSize: maxFileSize * 1024 * 1024,
      maxFiles,
      acceptedFormats: ["application/pdf"],
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);

    const handleBrowseClick = () => {
      fileInputRef.current?.click();
    };

    const handleUpload = async () => {
      setIsUploading(true);
      setUploadProgress(0);

      try {
        const responses = await uploadFiles((progress) => {
          setUploadProgress(progress);
        });

        await onFilesSelected(files.map((f) => f.file));
        onFilesUploaded?.(responses);

        // Clear files after successful upload
        setTimeout(() => {
          clearAll();
          setIsUploading(false);
          setUploadProgress(0);
        }, 1500);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Upload failed";
        onError?.({
          code: "UNKNOWN",
          message: errorMessage,
        });
        setIsUploading(false);
      }
    };

    const isEmpty = files.length === 0;
    const hasErrors = files.some((f) => f.status === "error");
    const allSuccess = files.length > 0 && files.every((f) => f.status === "success");

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl mx-auto",
          className
        )}
      >
        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-xl border-2 border-dashed transition-all duration-200",
            "p-8 md:p-12 text-center cursor-pointer",
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Empty State */}
          {isEmpty && !isUploading && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div
                  className={cn(
                    "rounded-full p-4 transition-colors",
                    isDragging
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-200 text-slate-600"
                  )}
                >
                  <Upload className="w-8 h-8" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {isDragging ? "Drop your PDFs here" : "Upload PDF files"}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Drag and drop up to {maxFiles} PDFs here
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-300" />
                <span className="text-sm text-slate-500">or</span>
                <div className="flex-1 h-px bg-slate-300" />
              </div>

              <Button
                onClick={handleBrowseClick}
                disabled={disabled || isUploading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Browse Files
              </Button>

              <p className="text-xs text-slate-500">
                PDF files only • Max {maxFileSize}MB per file
              </p>
            </div>
          )}

          {/* Uploading State */}
          {isUploading && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full p-4 bg-blue-100 text-blue-600">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Uploading your files
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Processing {files.length} PDF{files.length !== 1 ? "s" : ""}...
                </p>
              </div>

              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-slate-500 text-right">
                  {uploadProgress}%
                </p>
              </div>
            </div>
          )}

          {/* Success State */}
          {allSuccess && !isUploading && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-center">
                <div className="rounded-full p-4 bg-green-100 text-green-600">
                  <Check className="w-8 h-8" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Upload complete
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {files.length} file{files.length !== 1 ? "s" : ""} uploaded successfully
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || isUploading}
          />
        </div>

        {/* Files List */}
        {!isEmpty && (
          <div className="mt-6 space-y-3">
            {/* Files Header */}
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">
                {files.length} file{files.length !== 1 ? "s" : ""} selected
              </h4>
              {!isUploading && files.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-slate-600 hover:text-slate-900 underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Files Container */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {files.map((uploadFile) => (
                <FileItem
                  key={uploadFile.id}
                  file={uploadFile}
                  onRemove={removeFile}
                  isLoading={isUploading}
                />
              ))}
            </div>

            {/* Action Buttons */}
            {!allSuccess && !isUploading && files.length > 0 && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-200">
                <Button
                  onClick={handleUpload}
                  disabled={disabled || isLoading || hasErrors}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {files.length} file{files.length !== 1 ? "s" : ""}
                </Button>
              </div>
            )}

            {/* Retry for errors */}
            {hasErrors && !isUploading && (
              <div className="text-center">
                <p className="text-sm text-red-600 mb-2">
                  Some files failed to upload. Please fix and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

PDFUpload.displayName = "PDFUpload";

/**
 * File Item Component
 */
interface FileItemProps {
  file: {
    id: string;
    file: File;
    status: "pending" | "uploading" | "success" | "error";
    progress: number;
    error?: string;
  };
  onRemove: (id: string) => void;
  isLoading: boolean;
}

function FileItem({ file, onRemove, isLoading }: FileItemProps) {
  const sizeCategory = getFileSizeIcon(file.file.size);
  const fileSizeStr = formatFileSize(file.file.size);

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-colors",
        file.status === "success"
          ? "bg-green-50 border-green-200"
          : file.status === "error"
            ? "bg-red-50 border-red-200"
            : file.status === "uploading"
              ? "bg-blue-50 border-blue-200"
              : "bg-slate-50 border-slate-200"
      )}
    >
      {/* File Icon */}
      <div className="flex-shrink-0 pt-0.5">
        {file.status === "uploading" && (
          <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        )}
        {file.status === "success" && (
          <Check className="w-5 h-5 text-green-600" />
        )}
        {file.status === "error" && (
          <AlertCircle className="w-5 h-5 text-red-600" />
        )}
        {file.status === "pending" && (
          <FileText className="w-5 h-5 text-slate-600" />
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {file.file.name}
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              {fileSizeStr}
            </p>
          </div>

          {/* Remove Button */}
          {!isLoading && file.status !== "uploading" && (
            <button
              onClick={() => onRemove(file.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {file.status === "uploading" && (
          <div className="mt-2">
            <Progress value={file.progress} className="h-1.5" />
            <p className="text-xs text-slate-600 mt-1 text-right">
              {Math.round(file.progress)}%
            </p>
          </div>
        )}

        {/* Error Message */}
        {file.status === "error" && file.error && (
          <p className="text-xs text-red-600 mt-1">{file.error}</p>
        )}

        {/* Success Message */}
        {file.status === "success" && (
          <p className="text-xs text-green-600 mt-1">Uploaded successfully</p>
        )}
      </div>
    </div>
  );
}

export { FileItem };
