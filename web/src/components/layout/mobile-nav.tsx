"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShieldCheck, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { DURATION, EASE_OUT } from "@/components/ui/motion";
import { navigationItems } from "./nav-items";

/** Below `md` the sidebar is hidden, so navigation lives here. */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change, and don't let the page scroll behind the panel.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-foreground/25 backdrop-blur-sm"
            />

            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: DURATION.base, ease: EASE_OUT }}
              className="absolute inset-y-0 left-0 flex w-[280px] max-w-[85vw] flex-col border-r border-border bg-surface elevate-xl"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-foreground text-background">
                    <ShieldCheck className="size-[18px]" />
                  </span>
                  <span className="font-mono text-[15px] tracking-tight">
                    privacy<span className="text-muted-foreground">/</span>pdf
                  </span>
                </span>

                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close navigation"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </Button>
              </div>

              <div className="flex-1 space-y-1 overflow-y-auto p-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                        active
                          ? "bg-surface-2 font-semibold text-foreground"
                          : "text-muted hover:bg-surface-2 hover:text-foreground"
                      )}
                    >
                      <Icon className="size-[18px] shrink-0" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
