"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { FileText, Loader2, RefreshCw, ShieldCheck, Upload } from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "./button";

interface PdfDropzoneProps {
  title: string;
  description?: string;
  /** Accept several PDFs at once (merge). Uses `onFilesSelect`. */
  multiple?: boolean;
  isLoading?: boolean;
  /** When set, the zone collapses into a "current file" row. */
  fileName?: string;
  fileSize?: string;
  onFileSelect?: (file: File) => void | Promise<void>;
  onFilesSelect?: (files: File[]) => void;
  className?: string;
}

function isPdf(file: File) {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
}

/**
 * The one upload surface for every tool. Seven near-identical copies of
 * this used to live in the per-tool folders, each with its own colours.
 */
export function PdfDropzone({
  title,
  description = "Drag and drop, or browse from your device.",
  multiple = false,
  isLoading = false,
  fileName,
  fileSize,
  onFileSelect,
  onFilesSelect,
  className,
}: PdfDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const deliver = useCallback(
    (list: FileList | File[] | null) => {
      if (!list || isLoading) return;
      const pdfs = Array.from(list).filter(isPdf);
      if (pdfs.length === 0) return;

      if (multiple) onFilesSelect?.(pdfs);
      else void onFileSelect?.(pdfs[0]);
    },
    [isLoading, multiple, onFileSelect, onFilesSelect]
  );

  const browse = useCallback(() => {
    if (!isLoading) inputRef.current?.click();
  }, [isLoading]);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isLoading) setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    deliver(e.dataTransfer.files);
  };

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept="application/pdf,.pdf"
      multiple={multiple}
      disabled={isLoading}
      className="hidden"
      onChange={(e) => {
        deliver(e.target.files);
        e.target.value = "";
      }}
    />
  );

  // ---- A file is loaded: compact row ----
  if (fileName) {
    return (
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 elevate-sm transition-colors",
          isDragging && "border-foreground bg-accent-soft",
          isLoading && "pointer-events-none opacity-60",
          className
        )}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2">
          {isLoading ? (
            <Loader2 className="size-5 animate-spin text-muted" />
          ) : (
            <FileText className="size-5 text-foreground" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" title={fileName}>
            {fileName}
          </p>
          {fileSize && (
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {fileSize}
            </p>
          )}
        </div>

        <Button variant="outline" size="sm" onClick={browse} disabled={isLoading}>
          <RefreshCw />
          Replace
        </Button>

        {input}
      </div>
    );
  }

  // ---- Empty: full drop target ----
  return (
    <div
      role="button"
      tabIndex={isLoading ? -1 : 0}
      aria-label={title}
      onClick={browse}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          browse();
        }
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-6 overflow-hidden",
        "rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-14 text-center",
        "transition-[border-color,background-color,box-shadow] duration-200",
        "hover:border-foreground/50 hover:bg-surface-2/60",
        "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        isDragging && "border-solid border-foreground bg-accent-soft elevate-md",
        isLoading && "pointer-events-none opacity-60",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,black,transparent)]"
      />

      <span
        className={cn(
          "relative flex size-14 items-center justify-center rounded-2xl border border-border bg-surface elevate-sm",
          "transition-transform duration-200 group-hover:-translate-y-0.5",
          isDragging && "-translate-y-1"
        )}
      >
        {isLoading ? (
          <Loader2 className="size-6 animate-spin text-muted" />
        ) : (
          <Upload className="size-6 text-foreground" strokeWidth={1.75} />
        )}
      </span>

      <div className="relative">
        <h3 className="text-lg font-semibold">
          {isLoading ? "Reading your file…" : isDragging ? "Drop to load" : title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
      </div>

      <Button
        tabIndex={-1}
        disabled={isLoading}
        className="relative"
        onClick={(e) => {
          e.stopPropagation();
          browse();
        }}
      >
        {multiple ? "Browse PDFs" : "Browse PDF"}
      </Button>

      <p className="relative inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide text-muted-foreground uppercase">
        <ShieldCheck className="size-3.5" />
        Stays on this device
      </p>

      {input}
    </div>
  );
}

export default PdfDropzone;
