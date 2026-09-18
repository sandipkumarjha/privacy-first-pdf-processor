"use client";

import { Input } from "@/components/ui/input";

interface SplitPageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  totalPages: number;
}

export default function SplitPageSelector({
  value,
  onChange,
  totalPages,
}: SplitPageSelectorProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground">
          Select Pages
        </h3>
        <p className="text-xs text-muted-foreground">
          Examples: 1,3,5 &nbsp;·&nbsp; 2-10 &nbsp;·&nbsp; 1,4-8,11
        </p>
      </div>

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Example: 1,3,5-8"
        aria-label="Page selection"
        className="font-mono text-sm"
      />

      <p className="text-xs text-muted-foreground">
        Total Pages: <span className="font-medium text-muted">{totalPages}</span>
      </p>
    </div>
  );
}