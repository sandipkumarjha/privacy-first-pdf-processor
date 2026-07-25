import type { MergeFile } from "@/store/merge-store";
import { MergeFileCard } from "@/components/pdf-merge/merge-file-card";
import { cn } from "@/lib/cn";

interface MergeFileListProps {
  files: MergeFile[];
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
}

export function MergeFileList({
  files,
  onMoveUp,
  onMoveDown,
  onRemove,
  className,
}: MergeFileListProps) {
  return (
    <div className={cn("flex flex-col gap-2 sm:gap-3", className)}>
      {files.map((file, index) => (
        <MergeFileCard
          key={file.id}
          name={file.name}
          size={file.size}
          pageCount={file.pageCount}
          isFirst={index === 0}
          isLast={index === files.length - 1}
          onMoveUp={() => onMoveUp(file.id)}
          onMoveDown={() => onMoveDown(file.id)}
          onRemove={() => onRemove(file.id)}
        />
      ))}
    </div>
  );
}

export default MergeFileList;