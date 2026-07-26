"use client";

import { motion } from "framer-motion";

export function CompressHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Compress PDF
      </h1>
      <p className="mt-1 text-sm text-muted-foreground sm:text-base">
        Reduce PDF file size while preserving quality. Everything happens
        locally inside your browser.
      </p>
    </motion.div>
  );
}

export default CompressHeader;