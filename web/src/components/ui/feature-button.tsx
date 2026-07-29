"use client";

import { motion } from "framer-motion";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type FeatureButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type FeatureButtonSize = "sm" | "md" | "lg";

interface FeatureButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: FeatureButtonVariant;
  size?: FeatureButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const SIZE_CLASSES: Record<FeatureButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const ICON_SIZE_CLASSES: Record<FeatureButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const VARIANT_CLASSES: Record<FeatureButtonVariant, string> = {
  default: "bg-[var(--accent)] text-white hover:brightness-95",
  secondary:
    "bg-[var(--surface-2)] text-[var(--foreground)] hover:brightness-95",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-2)]",
  ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-2)]",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export function FeatureButton({
  children,
  icon: Icon,
  variant = "default",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  className,
}: FeatureButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      whileHover={isDisabled ? undefined : { scale: 1.02 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium shadow-sm transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <Loader2
          className={cn("animate-spin", ICON_SIZE_CLASSES[size])}
          aria-hidden="true"
        />
      ) : (
        Icon && <Icon className={ICON_SIZE_CLASSES[size]} aria-hidden="true" />
      )}
      {children}
    </motion.button>
  );
}

export default FeatureButton;