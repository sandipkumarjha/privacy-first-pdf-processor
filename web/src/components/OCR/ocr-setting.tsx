"use client";

import { motion } from "framer-motion";
import { OcrLanguageSelector } from "@/components/OCR/ocr-language-selector";

interface OcrSettingsProps {
  language: string;
  onLanguageChange: (language: string) => void;
  disabled?: boolean;
}

export function OcrSettings({
  language,
  onLanguageChange,
  disabled = false,
}: OcrSettingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-5 rounded-2xl border border-[var(--secondary)] bg-white p-4 shadow-sm sm:p-6"
    >
      <div>
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          OCR Settings
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Choose the language used to recognize text in your PDF.
        </p>
      </div>

      <OcrLanguageSelector
        value={language}
        onChange={onLanguageChange}
        disabled={disabled}
      />
    </motion.div>
  );
}

export default OcrSettings;