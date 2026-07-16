// components/pdf-upload/upload-button.tsx

"use client";

import { memo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, RefreshCw } from "lucide-react";

type UploadButtonVariant = "primary" | "secondary" | "ghost";

interface UploadButtonProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: UploadButtonVariant;
  /** Switches icon/label to a "Replace" affordance instead of "Upload". */
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

/**
 * Reusable file-picker trigger. Owns its own hidden <input type="file">
 * so it can be dropped anywhere in the tree (empty state, file card,
 * error retry) without depending on UploadZone's DOM structure.
 *
 * Contains NO business logic — the onFileSelect callback (wired to
 * useUpload().handleBrowseSelect or a similar handler) does all the work.
 */
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
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const defaultLabel = mode === "replace" ? "Replace file" : "Browse files";
  const Icon = mode === "replace" ? RefreshCw : Upload;

  return (
    <>
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        whileHover={disabled ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        aria-label={label ?? defaultLabel}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-lg px-4 py-2.5
          text-sm font-medium
          outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          transition-colors
          disabled:cursor-not-allowed disabled:opacity-50
          ${VARIANT_CLASSES[variant]}
          ${className}
        `}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{label ?? defaultLabel}</span>
      </motion.button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_INPUT_TYPES}
        multiple={multiple}
        onChange={onFileSelect}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
    </>
  );
}

export const UploadButton = memo(UploadButtonComponent);