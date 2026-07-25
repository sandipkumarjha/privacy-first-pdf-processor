import { Loader2, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface MergeDownloadProps {
  isMerging: boolean;
  isCompleted: boolean;
  disabled?: boolean;
  onMerge: () => void;
  mergedFileName?: string;
  mergedFileSize?: number;
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

export function MergeDownload({
  isMerging,
  isCompleted,
  disabled = false,
  onMerge,
  mergedFileName,
  mergedFileSize,
  className,
}: MergeDownloadProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Button
        type="button"
        size="lg"
        onClick={onMerge}
        disabled={disabled || isMerging}
        className="w-full sm:w-auto"
      >
        {isMerging ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Merging...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Merge PDFs
          </>
        )}
      </Button>

      {isCompleted && mergedFileName && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {mergedFileName}
            </p>
            {typeof mergedFileSize === "number" && (
              <p className="text-xs text-muted-foreground">
                {formatFileSize(mergedFileSize)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MergeDownload;