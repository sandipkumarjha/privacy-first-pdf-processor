"use client";

import type { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Type, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

type WatermarkPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface WatermarkSettings {
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  color: string;
  position: WatermarkPosition;
}

interface WatermarkToolbarProps {
  settings: WatermarkSettings;
  isProcessing: boolean;
  onSettingsChange: (values: Partial<WatermarkSettings>) => void;
  onReset: () => void;
}

const POSITION_OPTIONS: { value: WatermarkPosition; label: string }[] = [
  { value: "center", label: "Center" },
  { value: "top-left", label: "Top Left" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
];

const fieldLabelClasses = "text-sm font-medium text-[var(--foreground)]";
const fieldValueClasses = "text-xs font-medium text-[var(--muted-foreground)]";
const inputClasses =
  "w-full rounded-xl border border-[var(--secondary)] bg-white px-3 py-2 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors focus:border-[var(--primary)]";

export function WatermarkToolbar({
  settings,
  isProcessing,
  onSettingsChange,
  onReset,
}: WatermarkToolbarProps) {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ text: event.target.value });
  };

  const handleFontSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ fontSize: Number(event.target.value) });
  };

  const handleOpacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ opacity: Number(event.target.value) });
  };

  const handleRotationChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ rotation: Number(event.target.value) });
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ color: event.target.value });
  };

  const handlePositionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({ position: event.target.value as WatermarkPosition });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-5 rounded-2xl border border-[var(--secondary)] bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/40">
            <Type className="h-4 w-4 text-[var(--foreground)]" aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Watermark Settings
          </p>
        </div>

        <motion.button
          type="button"
          onClick={onReset}
          disabled={isProcessing}
          aria-label="Reset"
          whileHover={isProcessing ? undefined : { scale: 1.02 }}
          whileTap={isProcessing ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors",
            "hover:bg-[var(--accent)]/30",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
          )}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="watermark-text" className={fieldLabelClasses}>
            Text
          </label>
          <input
            id="watermark-text"
            type="text"
            value={settings.text}
            onChange={handleTextChange}
            disabled={isProcessing}
            placeholder="CONFIDENTIAL"
            maxLength={100}
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="watermark-font-size" className={fieldLabelClasses}>
              Font Size
            </label>
            <span className={fieldValueClasses}>{settings.fontSize}px</span>
          </div>
          <input
            id="watermark-font-size"
            type="range"
            min={12}
            max={96}
            value={settings.fontSize}
            onChange={handleFontSizeChange}
            disabled={isProcessing}
            className="w-full accent-[var(--primary)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="watermark-opacity" className={fieldLabelClasses}>
              Opacity
            </label>
            <span className={fieldValueClasses}>
              {Math.round(settings.opacity * 100)}%
            </span>
          </div>
          <input
            id="watermark-opacity"
            type="range"
            min={0.05}
            max={1}
            step={0.05}
            value={settings.opacity}
            onChange={handleOpacityChange}
            disabled={isProcessing}
            className="w-full accent-[var(--primary)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="watermark-rotation" className={fieldLabelClasses}>
              Rotation
            </label>
            <span className={fieldValueClasses}>{settings.rotation}&deg;</span>
          </div>
          <input
            id="watermark-rotation"
            type="range"
            min={0}
            max={360}
            value={settings.rotation}
            onChange={handleRotationChange}
            disabled={isProcessing}
            className="w-full accent-[var(--primary)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="watermark-color" className={fieldLabelClasses}>
            Color
          </label>
          <input
            id="watermark-color"
            type="color"
            value={settings.color}
            onChange={handleColorChange}
            disabled={isProcessing}
            className="h-10 w-full cursor-pointer rounded-xl border border-[var(--secondary)] bg-white p-1 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="watermark-position" className={fieldLabelClasses}>
            Position
          </label>
          <select
            id="watermark-position"
            value={settings.position}
            onChange={handlePositionChange}
            disabled={isProcessing}
            className={inputClasses}
          >
            {POSITION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}

export default WatermarkToolbar;