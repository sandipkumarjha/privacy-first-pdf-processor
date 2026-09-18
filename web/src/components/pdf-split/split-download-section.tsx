"use client";

import { Loader2, Scissors, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SplitDownloadSectionProps {
  disabled: boolean;
  loading: boolean;
  selectedCount: number;
  onSplit: () => void;
}

export default function SplitDownloadSection({
  disabled,
  loading,
  selectedCount,
  onSplit,
}: SplitDownloadSectionProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm text-muted-foreground">Selected Pages</p>
        <p className="text-2xl font-bold tabular-nums text-foreground">
          {selectedCount}
        </p>
      </div>

      <Button
        type="button"
        size="lg"
        disabled={disabled || loading}
        onClick={onSplit}
        className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Generating PDF…
          </>
        ) : (
          <>
            <Scissors className="h-4 w-4" aria-hidden="true" />
            Split PDF
          </>
        )}
      </Button>

      <p className="flex items-center gap-1.5 text-xs font-medium text-success">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Processing happens locally. Your file never leaves your device.
      </p>
    </div>
  );
}