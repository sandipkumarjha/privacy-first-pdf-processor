"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { cardHover, riseIn } from "./motion";

type AppCardPadding = "default" | "compact" | "spacious" | "none";
type AppCardTone = "surface" | "sunken" | "accent";
type AppCardElevation = "none" | "sm" | "md" | "lg";

interface AppCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  /** Lift on hover. Off for static/informational cards. */
  hover?: boolean;
  padding?: AppCardPadding;
  tone?: AppCardTone;
  elevation?: AppCardElevation;
  /** Entrance animation. Turn off when a parent already staggers. */
  animate?: boolean;
}

const PADDING: Record<AppCardPadding, string> = {
  none: "p-0",
  compact: "p-4",
  default: "p-6",
  spacious: "p-8 lg:p-10",
};

const TONE: Record<AppCardTone, string> = {
  surface: "bg-surface border-border",
  sunken: "bg-surface-2 border-border",
  // A warm wash, not a saturated gradient fill.
  accent: "bg-surface border-border surface-sheen",
};

const ELEVATION: Record<AppCardElevation, string> = {
  none: "",
  sm: "elevate-sm",
  md: "elevate-md",
  lg: "elevate-lg",
};

export function AppCard({
  children,
  className,
  hover = false,
  padding = "default",
  tone = "surface",
  elevation = "sm",
  animate = true,
  ...props
}: AppCardProps) {
  return (
    <motion.div
      {...(animate ? riseIn : {})}
      whileHover={hover ? cardHover : undefined}
      className={cn(
        "relative rounded-2xl border",
        "transition-[border-color,box-shadow] duration-200 ease-out",
        TONE[tone],
        ELEVATION[elevation],
        hover && "hover:border-border-strong hover:elevate-md",
        PADDING[padding],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AppCard;
