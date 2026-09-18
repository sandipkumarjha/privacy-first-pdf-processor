import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/cn"

interface InputProps extends React.ComponentProps<"input"> {
  /** Renders a leading icon inside the field and pads the text for it. */
  icon?: LucideIcon
}

function Input({ className, type, icon: Icon, ...props }: InputProps) {
  const field = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Matched to Button's default height so they line up in toolbars.
        "h-10 w-full min-w-0 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
        "shadow-[var(--shadow-xs)] transition-[border-color,box-shadow] outline-none",
        "placeholder:text-muted-foreground",
        "hover:border-border-strong",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        Icon && "pl-10",
        className
      )}
      {...props}
    />
  )

  if (!Icon) return field

  return (
    <div className="relative w-full">
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      {field}
    </div>
  )
}

export { Input }
