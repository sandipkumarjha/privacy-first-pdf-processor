"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface AppContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function AppContainer({ children, className }: AppContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-12 md:px-8",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default AppContainer;