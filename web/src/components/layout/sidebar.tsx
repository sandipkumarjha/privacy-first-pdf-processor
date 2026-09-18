"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

import { ShieldCheck, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { navigationItems } from "./nav-items";

import { Button } from "@/components/ui/button";
import { DURATION, EASE_SOFT } from "@/components/ui/motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          "relative hidden h-screen shrink-0 flex-col border-r border-border bg-surface/60 md:flex",
          "transition-[width] duration-300 ease-out",
          collapsed ? "w-[76px]" : "w-[264px]"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center border-b border-border px-4">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3 rounded-lg"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
              <ShieldCheck className="size-[18px]" />
            </span>

            {!collapsed && (
              <span className="min-w-0">
                <span className="block truncate font-mono text-[15px] tracking-tight text-foreground">
                  privacy<span className="text-muted-foreground">/</span>pdf
                </span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            const link = (
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex h-11 items-center gap-3 rounded-lg px-3",
                  "text-sm transition-colors duration-150",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-surface-2 font-semibold text-foreground"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                )}
              >
                {/* Active marker: a 3px bar, not a gradient wash. */}
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    transition={{ duration: DURATION.fast, ease: EASE_SOFT }}
                    className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-foreground"
                  />
                )}

                <Icon className="size-[18px] shrink-0" />

                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );

            if (!collapsed) return <div key={item.href}>{link}</div>;

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="space-y-3 border-t border-border p-3">
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: DURATION.fast, ease: EASE_SOFT }}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-border bg-surface-2 p-3">
                  <p className="text-xs leading-5 text-muted">
                    Every operation runs in this browser tab. Nothing is
                    uploaded.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn("w-full", !collapsed && "justify-start")}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            {!collapsed && "Collapse"}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
