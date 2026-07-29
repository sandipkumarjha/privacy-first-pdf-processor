"use client";

import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { PageThumbnail } from "@/components/ui/page-Thumbnail";
import { cn } from "@/lib/cn";

interface PageGridItem {
  id: string;
  pageNumber: number;
  thumbnail: string;
  selected?: boolean;
  rotation?: 0 | 90 | 180 | 270;
  disabled?: boolean;
  loading?: boolean;
}

interface PageGridProps {
  pages: PageGridItem[];
  onPageClick?: (id: string) => void;
  footerRenderer?: (page: PageGridItem) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

function PageGridComponent({
  pages,
  onPageClick,
  footerRenderer,
  emptyState,
  className,
}: PageGridProps) {
  if (pages.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <motion.div
      role="grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className
      )}
    >
      {pages.map((page) => (
        <motion.div key={page.id} role="gridcell" variants={itemVariants}>
          <PageThumbnail
            pageNumber={page.pageNumber}
            thumbnail={page.thumbnail}
            selected={page.selected}
            rotation={page.rotation}
            disabled={page.disabled}
            loading={page.loading}
            onClick={onPageClick ? () => onPageClick(page.id) : undefined}
            footer={footerRenderer?.(page)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export const PageGrid = memo(PageGridComponent);

export default PageGrid;