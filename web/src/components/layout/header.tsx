"use client";

import { usePathname } from "next/navigation";
import {
  Bell,
  LogOut,
  User,
  Shield,
  Settings,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

const pageTitle: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/merge": "Merge PDFs",
  "/split": "Split PDF",
  "/compress": "Compress PDF",
  "/rotate": "Rotate PDF",
  "/extract": "Extract Pages",
  "/watermark": "Watermark",
  "/ocr": "OCR",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();

  const title = pageTitle[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-background/70 px-8 backdrop-blur-xl">
      {/* Left */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {title}
          </h1>

          <div className="hidden items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 md:flex">
            <Shield className="h-3.5 w-3.5 text-indigo-400" />

            <span className="text-xs font-medium text-indigo-300">
              Privacy First
            </span>
          </div>
        </div>

        <p className="mt-1 text-sm text-slate-400">
          All processing happens locally on your device.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5"
        >
          <Bell className="h-5 w-5 text-slate-300" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />
        </Button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 rounded-xl border border-white/5 bg-white/[0.02] px-2 hover:bg-white/5"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 font-semibold text-white">
                  JD
                </AvatarFallback>
              </Avatar>

              <div className="ml-3 hidden text-left lg:block">
                <p className="text-sm font-medium text-white">
                  John Doe
                </p>

                <p className="text-xs text-slate-400">
                  Free Plan
                </p>
              </div>

              <ChevronDown className="ml-3 h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 border border-white/10 bg-[#111827] text-white"
          >
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">
                    John Doe
                  </p>

                  <p className="text-xs text-slate-400">
                    john@example.com
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="mr-3 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Shield className="mr-3 h-4 w-4" />
              Privacy
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-400 focus:text-red-400">
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}