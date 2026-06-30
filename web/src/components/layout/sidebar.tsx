"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

import {
  LayoutDashboard,
  Merge,
  Split,
  Zap,
  RotateCw,
  Scissors,
  Wand2,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Merge PDF",
    href: "/merge",
    icon: Merge,
  },
  {
    title: "Split PDF",
    href: "/split",
    icon: Split,
  },
  {
    title: "Compress PDF",
    href: "/compress",
    icon: Zap,
  },
  {
    title: "Rotate PDF",
    href: "/rotate",
    icon: RotateCw,
  },
  {
    title: "Extract Pages",
    href: "/extract",
    icon: Scissors,
  },
  {
    title: "Watermark",
    href: "/watermark",
    icon: Wand2,
  },
  {
    title: "OCR",
    href: "/ocr",
    icon: Shield,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          "relative flex h-screen flex-col border-r border-white/10 bg-[#09090B] transition-all duration-300",
          collapsed ? "w-[78px]" : "w-[280px]"
        )}
      >
        {/* Top Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent" />

        {/* Logo */}
        <div className="relative flex h-20 items-center border-b border-white/5 px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/20">
              <Shield className="h-5 w-5 text-white" />
            </div>

            {!collapsed && (
              <div>
                <h2 className="font-semibold text-white tracking-tight">
                  PDFVault
                </h2>
                <p className="text-xs text-slate-400">
                  Privacy First
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            const button = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex h-12 items-center rounded-xl transition-all duration-300",

                  active
                    ? "bg-gradient-to-r from-indigo-500/20 to-indigo-500/5 text-white shadow-lg shadow-indigo-500/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
                )}
              >
                {active && (
                  <div className="absolute left-0 h-7 w-1 rounded-r-full bg-indigo-500" />
                )}

                <div
                  className={cn(
                    "flex w-full items-center",
                    collapsed ? "justify-center" : "px-4"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      active
                        ? "text-indigo-400"
                        : "text-slate-400 group-hover:text-indigo-300"
                    )}
                  />

                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">
                      {item.title}
                    </span>
                  )}
                </div>
              </Link>
            );

            if (!collapsed) return button;

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/5 p-3">
          <Link
            href="/settings"
            className={cn(
              "group flex h-12 items-center rounded-xl transition-all duration-300",

              pathname === "/settings"
                ? "bg-gradient-to-r from-indigo-500/20 to-indigo-500/5 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <div
              className={cn(
                "flex w-full items-center",
                collapsed ? "justify-center" : "px-4"
              )}
            >
              <Settings className="h-5 w-5" />

              {!collapsed && (
                <span className="ml-3 text-sm font-medium">
                  Settings
                </span>
              )}
            </div>
          </Link>

          <Button
            variant="ghost"
            onClick={() => setCollapsed(!collapsed)}
            className="mt-3 h-11 w-full rounded-xl border border-white/5 bg-white/[0.02] text-slate-400 transition-all hover:bg-white/5 hover:text-white"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="mr-2 h-5 w-5" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}