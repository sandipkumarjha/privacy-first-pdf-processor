import { cn } from "@/lib/cn"

/**
 * Placeholder for content being generated client-side — page
 * thumbnails, OCR passes, compression previews.
 */
export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-lg bg-[color-mix(in_oklch,var(--surface-3),transparent_25%)]",
        className
      )}
      {...props}
    />
  )
}

/** Matches the aspect ratio of a rendered PDF page thumbnail. */
export function ThumbnailSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("aspect-[1/1.414] w-full rounded-xl", className)} />
  )
}
