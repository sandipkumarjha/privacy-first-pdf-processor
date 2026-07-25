import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface MergeToolbarProps {
  totalFiles: number;
  totalPages: number;
  onAddMore: () => void;
  onClearAll: () => void;
  className?: string;
}

export function MergeToolbar({
  totalFiles,
  totalPages,
  onAddMore,
  onClearAll,
  className,
}: MergeToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">{totalFiles}</span>{" "}
          {totalFiles === 1 ? "file" : "files"}
        </span>
        <span>
          <span className="font-medium text-foreground">{totalPages}</span>{" "}
          {totalPages === 1 ? "page" : "pages"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onAddMore}>
          <Plus className="h-4 w-4" />
          Add More Files
        </Button>

        <Button variant="ghost" size="sm" onClick={onClearAll}>
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}

export default MergeToolbar;