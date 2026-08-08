"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/lib/cn";

interface OcrLanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  disabled?: boolean;
}

interface OcrLanguageOption {
  value: string;
  label: string;
}

const LANGUAGE_OPTIONS: OcrLanguageOption[] = [
  { value: "eng", label: "English" },
  { value: "hin", label: "Hindi" },
  { value: "eng+hin", label: "English + Hindi" },
];

export function OcrLanguageSelector({
  value,
  onChange,
  disabled = false,
}: OcrLanguageSelectorProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="ocr-language"
        className={cn(
          "text-sm font-medium text-[var(--foreground)]",
          disabled && "opacity-60"
        )}
      >
        OCR Language
      </label>

      <select
        id="ocr-language"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label="OCR Language"
        className={cn(
          "w-full rounded-xl border border-[var(--secondary)] bg-white px-3 py-2 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors",
          "focus:border-[var(--primary)]",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OcrLanguageSelector;