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
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
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
          className="gap-1.5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <Square className="h-3.5 w-3.5" aria-hidden="true" />
          Clear Selection
        </Button>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Selected:{" "}
        <span className="font-semibold text-zinc-900 dark:text-zinc-50">
          {selected} / {total}
        </span>{" "}
        Pages
      </p>
    </div>
  );
}