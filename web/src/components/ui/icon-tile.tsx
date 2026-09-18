import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/cn"

/**
 * The rounded icon square used on tool cards, stat tiles and feature
 * rows. Replaces the seven ad-hoc `bg-gradient-to-br from-X to-Y`
 * strings that previously gave every card a different hue.
 */
const iconTileVariants = cva(
  "inline-flex items-center justify-center rounded-xl border shrink-0",
  {
    variants: {
      tone: {
        accent:
          "border-[color-mix(in_oklch,var(--accent-strong),transparent_80%)] bg-[color-mix(in_oklch,var(--accent-soft),transparent_20%)] text-accent-strong",
        neutral: "border-border bg-surface-2 text-muted",
        success:
          "border-[color-mix(in_oklch,var(--success),transparent_78%)] bg-success-soft text-[color-mix(in_oklch,var(--success),var(--foreground)_25%)]",
        info: "border-[color-mix(in_oklch,var(--info-foreground),transparent_85%)] bg-info text-info-foreground",
      },
      size: {
        sm: "size-9 [&_svg]:size-4",
        default: "size-11 [&_svg]:size-5",
        lg: "size-14 rounded-2xl [&_svg]:size-6",
      },
    },
    defaultVariants: { tone: "accent", size: "default" },
  }
)

interface IconTileProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof iconTileVariants> {
  icon: LucideIcon
}

export function IconTile({
  icon: Icon,
  tone,
  size,
  className,
  ...props
}: IconTileProps) {
  return (
    <div className={cn(iconTileVariants({ tone, size, className }))} {...props}>
      <Icon aria-hidden="true" />
    </div>
  )
}

export { iconTileVariants }
