import { FileText, ChevronUp, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface MergeFileCardProps {
  name: string;
  size: number;
  pageCount: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / Math.pow(1024, exponent);

  return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

export function MergeFileCard({
  name,
  size,
  pageCount,
  onMoveUp,
  onMoveDown,
  onRemove,
  isFirst = false,
  isLast = false,
  className,
}: MergeFileCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3",
        className
      )}
    >
      <FileText className="h-8 w-8 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(size)} &middot; {pageCount}{" "}
          {pageCount === 1 ? "page" : "pages"}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label="Move up"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label="Move down"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove file"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default MergeFileCard;