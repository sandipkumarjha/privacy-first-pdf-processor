import { Skeleton } from "@/components/ui/skeleton";

/** Shown while a tool route's bundle loads. Mirrors the tool layout —
 *  header, drop zone, action row — so nothing jumps when it resolves. */
export default function AppLoading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-72 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <Skeleton className="h-72 w-full rounded-2xl" />

      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    </div>
  );
}
