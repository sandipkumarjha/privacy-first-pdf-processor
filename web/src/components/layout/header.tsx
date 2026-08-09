
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

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    <header className="flex min-h-[84px] w-full items-center justify-between gap-3 border-b border-blue-200 bg-[#FFDDB0] px-4 py-3 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <h1 className="truncate text-2xl font-semibold text-black sm:text-3xl lg:text-4xl">
            {title}
          </h1>

          {/* Privacy Badge */}
          <div className="hidden shrink-0 items-center gap-2 rounded-full border-2 border-blue-600 bg-indigo-500/10 px-3 py-1 md:flex">
            <Shield className="h-3.5 w-3.5 text-indigo-400" />

            <span className="text-xs font-medium text-zinc-700">
              Privacy First
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-1 hidden truncate text-sm text-zinc-800 sm:block">
          All processing happens locally on your device.
        </p>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative h-10 w-10 rounded-xl border-2 border-blue-600 bg-white/[0.02] hover:bg-white/5 sm:h-11 sm:w-11"
        >
          <Bell className="h-5 w-5 text-zinc-800" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />
        </Button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label="Open user menu"
              className="h-10 rounded-xl border border-blue-600 px-1.5 hover:bg-[#FFDDB0] sm:h-12 sm:px-2"
            >
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 font-semibold text-white">
                  JD
                </AvatarFallback>
              </Avatar>

              {/* User details - hidden on mobile */}
              <div className="ml-3 hidden text-left lg:block">
                <p className="text-sm font-medium text-black">
                  John Doe
                </p>

                <p className="text-xs text-zinc-800">
                  Free Plan
                </p>
              </div>

              {/* Chevron */}
              <ChevronDown className="ml-2 hidden h-4 w-4 text-slate-800 sm:block lg:ml-3" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="z-50 w-[calc(100vw-2rem)] max-w-64 rounded-xl border-2 border-blue-400 bg-[#FFDDB0] text-black shadow-lg shadow-indigo-500/20 sm:w-64"
          >
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate font-medium">
                    John Doe
                  </p>

                  <p className="truncate text-xs text-zinc-700">
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
