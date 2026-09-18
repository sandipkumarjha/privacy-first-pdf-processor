"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { riseIn } from "./motion";

type ContainerWidth = "narrow" | "default" | "wide";

interface AppContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: ContainerWidth;
}

const WIDTH: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
};

/**
 * Horizontal padding only — the app shell owns the page gutter, so
 * containers nested inside it must not add their own or the content
 * ends up double-inset.
 */
export function AppContainer({
  children,
  className,
  width = "default",
}: AppContainerProps) {
  return (
    <motion.div
      {...riseIn}
      className={cn(
        "mx-auto flex w-full flex-col gap-8",
        WIDTH[width],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default AppContainer;
