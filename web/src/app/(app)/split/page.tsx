"use client";

import { useEffect, useState } from "react";
import { usePdfSplit } from "@/hooks/use-pdf-split";
import { useSplitStore } from "@/store/split-store";
import { formatFileSize } from "@/components/upload/upload.utils";
import {
  selectAllPages,
  deselectAllPages,
  parsePageRangeInput,
} from "@/lib/pdf/split/page-selection";
import {
  SplitHeader,
  SplitUploadArea,
  SplitPageSelector,
  SplitToolbar,
  SplitPageGrid,
  SplitDownloadSection,
} from "@/components/pdf-split";

export default function SplitPage() {
  const { state, loadPdf, split, download } = usePdfSplit();
  const { file, pageCount, isLoading, isSplitting, splitSuccess } = state;

  const document = useSplitStore((s) => s.document);
  const selectedPages = useSplitStore((s) => s.options.selectedPages);
  const setSelectedPages = useSplitStore((s) => s.setSelectedPages);
  const togglePageSelection = useSplitStore((s) => s.togglePageSelection);

  const [pageRangeInput, setPageRangeInput] = useState("");
  const [rangeError, setRangeError] = useState<string | null>(null);

  const hasFile = Boolean(file);

  const handleFileSelect = (selectedFile: File) => {
    console.log("✅ SplitPage:", selectedFile.name);
    void loadPdf(selectedFile);
  };

  const handleSelectAll = () => {
    setSelectedPages(selectAllPages(pageCount));
    setPageRangeInput("");
    setRangeError(null);
  };

  const handleClearSelection = () => {
    setSelectedPages(deselectAllPages());
    setPageRangeInput("");
    setRangeError(null);
  };

  const handleSplit = () => {
    void split();
  };

  const handlePageRangeChange = (value: string) => {
    setPageRangeInput(value);

    if (pageCount === 0) return;

    const result = parsePageRangeInput(value, pageCount);
    setRangeError(result.error);

    if (!result.error) {
      setSelectedPages(result.pages);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- trigger once per successful split
  useEffect(() => {
    if (splitSuccess) {
      download();
    }
  }, [splitSuccess]);
  console.log("FILE:", file);
  console.log("PAGE COUNT:", pageCount);
  console.log("DOCUMENT:", document);
  return (
  
    <div className="flex flex-col gap-8">
      
      <SplitHeader />

      <SplitUploadArea
        fileName={file?.name}
        fileSize={file ? formatFileSize(file.size) : undefined}
        isLoading={isLoading}
        onFileSelect={handleFileSelect}
      />

      {hasFile && (
        <>
          <div className="flex flex-col gap-1.5">
            <SplitPageSelector
              value={pageRangeInput}
              onChange={handlePageRangeChange}
              totalPages={pageCount}
            />
            {rangeError && (
              <p role="alert" className="text-xs text-red-500">
                {rangeError}
              </p>
            )}
          </div>

          <SplitToolbar
            total={pageCount}
            selected={selectedPages.length}
            onSelectAll={handleSelectAll}
            onClear={handleClearSelection}
          />

          <SplitPageGrid
            pages={document?.pages ?? []}
            selectedPages={selectedPages}
            onToggle={togglePageSelection}
          />

          <SplitDownloadSection
            disabled={selectedPages.length === 0}
            loading={isSplitting}
            selectedCount={selectedPages.length}
            onSplit={handleSplit}
          />
        </>
      )}
    </div>
  );
}