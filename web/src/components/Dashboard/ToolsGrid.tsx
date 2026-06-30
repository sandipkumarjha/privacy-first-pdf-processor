"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Merge,
  Split,
  RotateCw,
  Scissors,
  Shield,
  Wand2,
  Zap,
} from "lucide-react";

import { ToolCard } from "./ToolCard";

const categories = [
  "All",
  "Edit",
  "Convert",
  "Security",
  "AI",
];

const tools = [
  {
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one document.",
    href: "/merge",
    icon: Merge,
    gradient: "from-blue-500 to-cyan-500",
    badge: "Popular",
    category: "Edit",
  },
  {
    title: "Split PDF",
    description: "Extract selected pages from any PDF.",
    href: "/split",
    icon: Split,
    gradient: "from-purple-500 to-pink-500",
    badge: "Fast",
    category: "Edit",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality.",
    href: "/compress",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    badge: "New",
    category: "Convert",
  },
  {
    title: "Rotate PDF",
    description: "Rotate pages with a single click.",
    href: "/rotate",
    icon: RotateCw,
    gradient: "from-green-500 to-emerald-500",
    category: "Edit",
  },
  {
    title: "Extract Pages",
    description: "Extract pages into a new PDF.",
    href: "/extract",
    icon: Scissors,
    gradient: "from-rose-500 to-red-500",
    category: "Convert",
  },
  {
    title: "Watermark",
    description: "Protect your PDFs with text or image watermark.",
    href: "/watermark",
    icon: Wand2,
    gradient: "from-indigo-500 to-violet-500",
    badge: "Popular",
    category: "Security",
  },
  {
    title: "OCR",
    description: "Extract text from scanned PDF documents.",
    href: "/ocr",
    icon: Shield,
    gradient: "from-cyan-500 to-blue-500",
    badge: "AI",
    category: "AI",
  },
];

export function ToolsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatch =
        selectedCategory === "All" ||
        tool.category === selectedCategory;

      const searchMatch =
        tool.title.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-3xl font-bold text-white">
            PDF Tools
          </h2>

          <p className="mt-2 text-slate-400">
            Everything runs locally inside your browser.
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            pl-12
            pr-4
            text-white
            outline-none
            transition
            focus:border-indigo-500
            "
          />
        </div>

      </div>

      {/* Categories */}

      <div className="flex flex-wrap gap-3">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300

            ${
              selectedCategory === category
                ? "bg-indigo-600 text-white shadow-lg"
                : "border border-white/10 bg-[#111827] text-slate-400 hover:border-indigo-500 hover:text-white"
            }
            `}
          >
            {category}
          </button>

        ))}

      </div>

      {/* Grid */}

      <motion.div
        layout
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">

          {filteredTools.map((tool, index) => (

            <motion.div
              layout
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.4,
              }}
            >
              <ToolCard {...tool} />
            </motion.div>

          ))}

        </AnimatePresence>
      </motion.div>

      {/* Empty State */}

      {filteredTools.length === 0 && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
          rounded-3xl
          border
          border-dashed
          border-white/10
          py-20
          text-center
          "
        >
          <h3 className="text-xl font-semibold text-white">
            No tools found
          </h3>

          <p className="mt-2 text-slate-500">
            Try another keyword or category.
          </p>
        </motion.div>

      )}

    </section>
  );
}