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
  primary:cn(
    "bg-[var(--accent)] text-[var(--accent-foreground)]",
    "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-8px_rgba(0,0,0,0.15)]",
    "hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_14px_28px_-10px_rgba(0,0,0,0.22)]"
  ),
    

  secondary:
  cn(
    "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]",
    "hover:bg-[var(--surface-2)]"
  ),
  ghost:
  cn(
    "bg-transparent text-[var(--foreground)]",
    "hover:bg-[var(--accent-soft)]/40"
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
  
      if (!files || files.length === 0) return;
  
      if (multiple) {
        onFilesSelect?.(Array.from(files));
      } else {
        onFileSelect?.(files[0]);
      }
  
      // Allow selecting the same file again
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
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.15 }}
        aria-label={label ?? defaultLabel}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-xl
          px-5
          py-3
          text-sm
          font-medium
          transition-all
          outline-none
          focus-visible:ring-2
          focus-visible:ring-offset-2
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