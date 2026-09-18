"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/cn"

const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "rounded-lg border border-transparent bg-clip-padding",
    "font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-45",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        // Ink on cream. The sheen is a 1px inner highlight that keeps a
        // flat black fill from looking like a hole in the page.
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.14),var(--shadow-sm)] hover:bg-[color-mix(in_oklch,var(--primary),var(--background)_14%)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.14),var(--shadow-md)]",
        outline:
          "border-border bg-surface text-foreground shadow-[var(--shadow-xs)] hover:bg-surface-2 hover:border-border-strong aria-expanded:bg-surface-2",
        secondary:
          "bg-secondary text-secondary-foreground border-[color-mix(in_oklch,var(--secondary),black_8%)] hover:bg-[color-mix(in_oklch,var(--secondary),black_5%)]",
        ghost:
          "text-muted hover:bg-surface-2 hover:text-foreground aria-expanded:bg-surface-2 aria-expanded:text-foreground",
        destructive:
          "bg-danger-soft text-danger border-[color-mix(in_oklch,var(--danger),transparent_75%)] hover:bg-[color-mix(in_oklch,var(--danger-soft),var(--danger)_10%)] focus-visible:ring-destructive/40",
        link: "text-foreground underline underline-offset-4 decoration-border-strong hover:decoration-foreground",
      },
      size: {
        // Bumped a step across the board — h-8 read cramped beside
        // the card padding this design uses.
        default: "h-10 gap-2 px-4 text-sm",
        xs: "h-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8.5 gap-1.5 rounded-md px-3 text-[0.8125rem]",
        lg: "h-12 gap-2 rounded-xl px-6 text-[0.9375rem]",
        icon: "size-10",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8.5 rounded-md",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
