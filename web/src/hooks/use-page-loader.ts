"use client";

import { createContext, useContext } from "react";

export interface PageLoaderContextValue {
  isLoading: boolean;
  start: () => void;
  stop: () => void;
}

export const PageLoaderContext = createContext<PageLoaderContextValue | null>(
  null
);

/**
 * Access the global route transition loader's state and controls.
 * Must be used within a <PageLoaderProvider>.
 */
export function usePageLoader(): PageLoaderContextValue {
  const context = useContext(PageLoaderContext);

  if (!context) {
    throw new Error("usePageLoader must be used within a PageLoaderProvider.");
  }

  return context;
}

export default usePageLoader;