"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-surface elevate-sm">
        <TriangleAlert className="size-6 text-danger" strokeWidth={1.75} />
      </span>

      <h1 className="mt-6 font-display text-4xl sm:text-5xl">
        Something went <span className="text-emphasis">wrong.</span>
      </h1>

      <p className="mt-4 leading-7 text-muted">
        This tool hit an unexpected error. Your file was never uploaded, so
        nothing has been lost — try again, or reload the PDF.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => unstable_retry()}>
          <RotateCcw />
          Try again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
