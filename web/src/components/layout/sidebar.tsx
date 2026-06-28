"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  FileText,
  Merge,
  Split,
  Zap,
  RotateCw,
  Scissors,
  Wand2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: FileText,
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
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-slate-950 text-slate-50 transition-all duration-300 ease-in-out flex flex-col border-r border-slate-800",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">PDFVault</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto">
            <Shield className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        <TooltipProvider>
          {navigationItems.map((item) => {
            const isActive = pathname === `/app${item.href}` || pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-slate-300 hover:text-slate-50 hover:bg-slate-800",
                        isActive && "bg-slate-800 text-slate-50"
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-slate-900 text-slate-50 border-slate-800">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Settings & Footer */}
      <div className="border-t border-slate-800 p-2 space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/settings">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-slate-300 hover:text-slate-50 hover:bg-slate-800",
                    pathname === "/settings" && "bg-slate-800 text-slate-50"
                  )}
                >
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3">Settings</span>}
                </Button>
              </Link>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-slate-900 text-slate-50 border-slate-800">
                Settings
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-slate-400 hover:text-slate-50 hover:bg-slate-800"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 mx-auto" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>
    </aside>
  );
}
