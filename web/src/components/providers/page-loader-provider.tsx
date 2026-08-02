"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PageLoaderContext } from "@/hooks/use-page-loader";
import { PageLoader } from "@/components/common/page-loader";

const NAVIGATION_TIMEOUT_MS = 5000;

interface PageLoaderProviderProps {
  children: ReactNode;
}

interface RouteChangeWatcherProps {
  onRouteSettled: (routeKey: string) => void;
}

/**
 * Reads the current route (pathname + search params) and reports it
 * whenever it changes. Isolated into its own component because
 * useSearchParams() requires a Suspense boundary in the App Router.
 */
function RouteChangeWatcher({ onRouteSettled }: RouteChangeWatcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteSettled(`${pathname}?${searchParams.toString()}`);
  }, [pathname, searchParams, onRouteSettled]);

  return null;
}

/**
 * Global route transition loader. Mount this once near the root of the
 * app (e.g. in the root layout, wrapping `children`) and every internal
 * navigation will automatically show the loader until the destination
 * page has rendered — no per-page wiring required.
 *
 * Navigation start is detected by intercepting clicks on internal links.
 * Navigation completion is detected by watching for the resulting
 * pathname/search-params change. A safety timeout guarantees the loader
 * never gets stuck visible if a click doesn't result in a route change.
 */
export function PageLoaderProvider({ children }: PageLoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const currentRouteKeyRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNavigationTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsLoading(true);
    clearNavigationTimeout();
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, NAVIGATION_TIMEOUT_MS);
  }, [clearNavigationTimeout]);

  const stop = useCallback(() => {
    clearNavigationTimeout();
    setIsLoading(false);
  }, [clearNavigationTimeout]);

  const handleRouteSettled = useCallback(
    (routeKey: string) => {
      const isFirstRender = currentRouteKeyRef.current === null;
      currentRouteKeyRef.current = routeKey;

      // Skip the very first report (initial mount) — there is no
      // in-flight navigation to stop yet.
      if (!isFirstRender) {
        stop();
      }
    },
    [stop]
  );

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      let destination: URL;
      try {
        destination = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (destination.origin !== window.location.origin) return;

      const currentRoute = `${window.location.pathname}${window.location.search}`;
      const nextRoute = `${destination.pathname}${destination.search}`;
      if (currentRoute === nextRoute) return;

      start();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [start]);

  useEffect(() => clearNavigationTimeout, [clearNavigationTimeout]);

  return (
    <PageLoaderContext.Provider value={{ isLoading, start, stop }}>
      <Suspense fallback={null}>
        <RouteChangeWatcher onRouteSettled={handleRouteSettled} />
      </Suspense>
      {children}
      <PageLoader isVisible={isLoading} />
    </PageLoaderContext.Provider>
  );
}

export default PageLoaderProvider;