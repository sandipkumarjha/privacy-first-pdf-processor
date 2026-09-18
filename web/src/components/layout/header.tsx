"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Home,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MobileNav } from "./mobile-nav";
import { pageTitles } from "./nav-items";

// Every item resolves to a real route. The previous menu listed
// Profile / Settings / Logout for an account system that doesn't exist.
const helpLinks = [
  { href: "/docs", label: "Documentation", icon: BookOpen },
  { href: "/privacy-policy", label: "Privacy policy", icon: ShieldCheck },
  { href: "/terms", label: "Terms of service", icon: FileText },
];

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <MobileNav />

        {/* Breadcrumb rather than a second <h1>: each page owns its title. */}
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm">
            <li className="hidden sm:block">
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                privacy/pdf
              </Link>
            </li>
            {!isDashboard && (
              <li aria-hidden="true" className="hidden text-muted-foreground sm:block">
                <ChevronRight className="size-3.5" />
              </li>
            )}
            <li
              aria-current="page"
              className={isDashboard ? "hidden" : "truncate font-medium text-foreground"}
            >
              {title}
            </li>
          </ol>
        </nav>

        <StatusBadge tone="success" size="sm" className="hidden md:inline-flex">
          Local only
        </StatusBadge>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Help and resources">
              <LifeBuoy />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8} className="w-56">
            <DropdownMenuLabel className="font-mono text-[0.6875rem] font-normal tracking-widest text-muted-foreground uppercase">
              Resources
            </DropdownMenuLabel>

            {helpLinks.map(({ href, label, icon: Icon }) => (
              <DropdownMenuItem key={href} asChild>
                <Link href={href}>
                  <Icon className="mr-2.5 size-4" />
                  {label}
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/">
                <Home className="mr-2.5 size-4" />
                Back to home
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
