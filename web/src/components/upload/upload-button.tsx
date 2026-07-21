"use client";

import { memo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, RefreshCw } from "lucide-react";

type UploadButtonVariant = "primary" | "secondary" | "ghost";

interface UploadButtonProps {
  onFileSelect: (file: File) => void;
  variant?: UploadButtonVariant;
  mode?: "upload" | "replace";
  disabled?: boolean;
  multiple?: boolean;
  label?: string;
  className?: string;
}

const ACCEPTED_INPUT_TYPES = "application/pdf,.pdf";

const VARIANT_CLASSES: Record<UploadButtonVariant, string> = {
  primary:
    "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500 shadow-sm",

  secondary:
    "bg-white text-orange-700 border border-orange-200 hover:bg-orange-50 focus-visible:ring-orange-500 dark:bg-zinc-900 dark:text-orange-400 dark:border-orange-500/30",

  ghost:
    "bg-transparent text-zinc-600 hover:bg-zinc-100 focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-800",
};

function UploadButtonComponent({
  onFileSelect,
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

      onFileSelect(files[0]);

      // Allow selecting the same file again
      e.target.value = "";
    },
    [onFileSelect]
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