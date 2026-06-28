"use client";

import { usePathname } from "next/navigation";
import { Bell, LogOut, User, Shield } from "lucide-react";
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
  "/watermark": "Add Watermark",
  "/ocr": "Text Recognition",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitle[pathname] || "Dashboard";

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      {/* Left: Page Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <Shield className="w-4 h-4" />
          <span>Privacy-first processing</span>
        </div>
      </div>

      {/* Right: Actions & User Menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 hover:text-slate-900"
        >
          <Bell className="w-5 h-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full p-0"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">John Doe</span>
                <span className="text-xs text-slate-500">john@example.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="w-4 h-4 mr-2" />
              Privacy Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
