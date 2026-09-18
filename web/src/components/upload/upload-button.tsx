"use client";

import { memo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";
type UploadButtonVariant = "primary" | "secondary" | "ghost";

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  variant?: UploadButtonVariant;
  mode?: "upload" | "replace";
  disabled?: boolean;
  multiple?: boolean;
  label?: string;
  className?: string;
}

const ACCEPTED_INPUT_TYPES = "application/pdf,.pdf";

const VARIANT_CLASSES: Record<UploadButtonVariant, string> = {
  primary: cn(
    "bg-primary text-primary-foreground",
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.14),var(--shadow-sm)]",
    "hover:bg-[color-mix(in_oklch,var(--primary),var(--background)_14%)]"
  ),

  secondary:
  cn(
    "bg-surface text-foreground border border-border",
    "hover:bg-surface-2"
  ),
  ghost:
  cn(
    "bg-transparent text-foreground",
    "hover:bg-accent-soft/40"
  ),
};

function UploadButtonComponent({
  onFileSelect,
  onFilesSelect,
  variant = "primary",
  mode = "upload",
  disabled = false,
  multiple = false,
  label,
  className = "",
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
  
      if (!files?.length) return;
  
      const fileArray = Array.from(files);
  
      // Always fire the multi-file callback
      onFilesSelect?.(fileArray);
  
      // Also fire the single-file callback
      if (!multiple) {
        onFileSelect?.(fileArray[0]);
      }
  
      e.target.value = "";
    },
    [multiple, onFileSelect, onFilesSelect]
  );
  const defaultLabel =
    mode === "replace" ? "Replace File" : "Browse PDF";

  const Icon = mode === "replace" ? RefreshCw : Upload;

  return (
    <>
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={disabled}
                whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        aria-label={label ?? defaultLabel}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-lg
          h-10
          px-4
          text-sm
          font-medium
          transition-all
          outline-none
          focus-visible:ring-2
          focus-visible:ring-ring/60
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${VARIANT_CLASSES[variant]}
          ${className}
        `}
      >
        <Icon className="h-4 w-4" />
        <span>{label ?? defaultLabel}</span>
      </motion.button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_INPUT_TYPES}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />
    </>
  );
}

UploadButtonComponent.displayName = "UploadButton";

export const UploadButton = memo(UploadButtonComponent);