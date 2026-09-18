import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "border-border bg-surface text-muted",
        accent:
          "border-[color-mix(in_oklch,var(--accent-strong),transparent_78%)] bg-[color-mix(in_oklch,var(--accent-soft),transparent_35%)] text-accent-strong",
        success:
          "border-[color-mix(in_oklch,var(--success),transparent_75%)] bg-success-soft text-[color-mix(in_oklch,var(--success),var(--foreground)_25%)]",
        warning:
          "border-[color-mix(in_oklch,var(--warning),transparent_72%)] bg-warning-soft text-warning-foreground",
        danger:
          "border-[color-mix(in_oklch,var(--danger),transparent_75%)] bg-danger-soft text-danger",
        info: "border-[color-mix(in_oklch,var(--info-foreground),transparent_82%)] bg-info text-info-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.6875rem] [&_svg]:size-3",
        default: "px-2.5 py-1 text-xs [&_svg]:size-3.5",
        lg: "px-3.5 py-1.5 text-sm [&_svg]:size-4",
      },
    },
    defaultVariants: { tone: "neutral", size: "default" },
  }
)

function Badge({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ tone, size, className }))}
      {...props}
    />
  )
}

/** Badge with a pulsing status dot — used for the "all local" indicators. */
function StatusBadge({
  className,
  tone = "success",
  children,
  ...props
}: React.ComponentProps<typeof Badge>) {
  return (
    <Badge tone={tone} className={className} {...props}>
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
      </span>
      {children}
    </Badge>
  )
}

export { Badge, StatusBadge, badgeVariants }
