"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Merge,
  RotateCw,
  ScanText,
  Scissors,
  Search,
  Split,
  Wand2,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { DURATION, EASE_OUT, stagger } from "@/components/ui/motion";
import { ToolCard } from "./ToolCard";

const categories = ["All", "Edit", "Convert", "Security", "AI"];

const tools = [
  {
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one document.",
    href: "/merge",
    icon: Merge,
    badge: "Popular",
    category: "Edit",
  },
  {
    title: "Split PDF",
    description: "Extract selected pages from any PDF.",
    href: "/split",
    icon: Split,
    badge: "Fast",
    category: "Edit",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality.",
    href: "/compress",
    icon: Zap,
    badge: "New",
    category: "Convert",
  },
  {
    title: "Rotate PDF",
    description: "Rotate pages with a single click.",
    href: "/rotate",
    icon: RotateCw,
    category: "Edit",
  },
  {
    title: "Extract Pages",
    description: "Pull selected pages out into a new PDF.",
    href: "/extract",
    icon: Scissors,
    category: "Convert",
  },
  {
    title: "Watermark",
    description: "Protect your PDFs with a text or image watermark.",
    href: "/watermark",
    icon: Wand2,
    badge: "Popular",
    category: "Security",
  },
  {
    title: "OCR",
    description: "Extract text from scanned PDF documents.",
    href: "/ocr",
    icon: ScanText,
    badge: "AI",
    category: "AI",
  },
];

export function ToolsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const categoryMatch =
        selectedCategory === "All" || tool.category === selectedCategory;

      const searchMatch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  return (
    <section className="space-y-6">
      <SectionHeading
        title="PDF tools"
        description="Everything runs locally inside your browser."
        actions={
          <div className="w-full lg:w-72">
            <Input
              icon={Search}
              type="search"
              placeholder="Search tools…"
              aria-label="Search tools"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        }
      />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tool categories">
        {categories.map((category) => {
          const active = selectedCategory === category;

          return (
            <button
              key={category}
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors duration-150",
                active
                  ? "border-foreground bg-foreground font-medium text-background"
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool, index) => (
            <motion.div
              layout
              key={tool.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: DURATION.base,
                ease: EASE_OUT,
                delay: stagger(index, 0.04),
              }}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredTools.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-border-strong bg-surface-2/50 py-16 text-center"
        >
          <h3 className="text-lg font-semibold">No tools found</h3>
          <p className="mt-1.5 text-sm text-muted">
            Try another keyword or category.
          </p>
        </motion.div>
      )}
    </section>
  );
}
