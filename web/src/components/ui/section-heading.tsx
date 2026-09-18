import * as React from "react"
import { cn } from "@/lib/cn"

interface SectionHeadingProps {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Trailing controls — search, filters, a CTA. */
  actions?: React.ReactNode
  align?: "start" | "center"
  size?: "sm" | "default" | "lg"
  className?: string
}

const TITLE_SIZE = {
  sm: "text-2xl",
  default: "text-3xl sm:text-4xl",
  lg: "text-4xl sm:text-5xl",
} as const

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "start",
  size = "default",
  className,
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        !centered && actions && "lg:flex-row lg:items-end lg:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow && (
          <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}

        <h2
          className={cn(
            "font-display font-normal text-foreground",
            TITLE_SIZE[size]
          )}
        >
          {title}
        </h2>

        {description && (
          <p className="mt-3 leading-7 text-muted">{description}</p>
        )}
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
}
