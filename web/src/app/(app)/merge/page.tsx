"use client";

import { useRef } from "react";
import { usePdfMerge } from "@/hooks/use-pdf-merge";
import { useMergeStore } from "@/store/merge-store";
import {
  MergeHeader,
  MergeUploadArea,
  MergeToolbar,
  MergeFileList,
  MergeDownload,
} from "@/components/pdf-merge";

export default function MergePage() {
  const {
    files,
    status,
    error,
    addFiles,
    removeFile,
    moveUp,
    moveDown,
    clearFiles,
    mergeFiles,
  } = usePdfMerge();

  const mergedBytes = useMergeStore((state) => state.mergedBytes);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "loading";
  const isMerging = status === "merging";
  const isCompleted = status === "completed";

  const totalPages = files.reduce((sum, file) => sum + file.pageCount, 0);

  const handleAddMoreClick = () => {
    addMoreInputRef.current?.click();
  };

  const handleAddMoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files;
    if (selected && selected.length > 0) {
      addFiles(Array.from(selected));
    }
    event.target.value = "";
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <MergeHeader />

      {files.length === 0 ? (
        <MergeUploadArea
        onFilesSelect={addFiles}
        isLoading={isLoading}
      />
      ) : (
        <>
          <MergeToolbar
            totalFiles={files.length}
            totalPages={totalPages}
            onAddMore={handleAddMoreClick}
            onClearAll={clearFiles}
          />

          <input
            ref={addMoreInputRef}
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={handleAddMoreChange}
          />

          <MergeFileList
            files={files}
            onMoveUp={moveUp}
            onMoveDown={moveDown}
            onRemove={removeFile}
          />
        </>
      )}

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <MergeDownload
          isMerging={isMerging}
          isCompleted={isCompleted}
          disabled={files.length < 2}
          onMerge={() => mergeFiles()}
          mergedFileName={isCompleted ? "merged.pdf" : undefined}
          mergedFileSize={mergedBytes?.length}
        />
      )}
    </div>
  );
}