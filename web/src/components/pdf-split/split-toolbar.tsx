"use client";

import { CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SplitToolbarProps {
  total: number;
  selected: number;
  onSelectAll: () => void;
  onClear: () => void;
}

export default function SplitToolbar({
  total,
  selected,
  onSelectAll,
  onClear,
}: SplitToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSelectAll}
          className="gap-1.5"
        >
          <CheckSquare className="h-3.5 w-3.5" aria-hidden="true" />
          Select All
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="gap-1.5 text-muted-foreground hover:text-muted"
        >
          <Square className="h-3.5 w-3.5" aria-hidden="true" />
          Clear Selection
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Selected:{" "}
        <span className="font-semibold text-foreground">
          {selected} / {total}
        </span>{" "}
        Pages
      </p>
    </div>
  );
}