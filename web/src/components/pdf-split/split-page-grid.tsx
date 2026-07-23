"use client";

import type { SplitPageInfo } from "@/types/split";
import SplitThumbnailCard from "@/components/pdf-split/split-thumbnail-card";

interface SplitPageGridProps {
  pages: SplitPageInfo[];
  selectedPages: number[];
  onToggle: (page: number) => void;
}

export default function SplitPageGrid({
  pages,
  selectedPages,
  onToggle,
}: SplitPageGridProps) {
  return (
    <div
      role="grid"
      aria-label="PDF pages"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {pages.map((page) => (
       /* <SplitThumbnailCard
          key={page.pageNumber}
          pageNumber={page.pageNumber}
          thumbnailUrl={page.thumbnailUrl}
          isSelected={selectedPages.includes(page.pageNumber)}
          onToggle={() => onToggle(page.pageNumber)}
        />*/
        <SplitThumbnailCard
  key={page.pageNumber}
  page={page}
  selected={selectedPages.includes(page.pageNumber)}
  onClick={() => onToggle(page.pageNumber)}
/>
      ))}
    </div>
  );
}