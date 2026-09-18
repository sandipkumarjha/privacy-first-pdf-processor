import {
  LayoutDashboard,
  Merge,
  Split,
  Zap,
  RotateCw,
  Scissors,
  Wand2,
  ScanText,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

/** Single source of truth for the sidebar, the mobile drawer and the
 *  header's page title lookup. */
export const navigationItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Merge PDFs", href: "/merge", icon: Merge },
  { title: "Split PDF", href: "/split", icon: Split },
  { title: "Compress PDF", href: "/compress", icon: Zap },
  { title: "Rotate PDF", href: "/rotate", icon: RotateCw },
  { title: "Extract Pages", href: "/extract", icon: Scissors },
  { title: "Watermark", href: "/watermark", icon: Wand2 },
  { title: "OCR", href: "/ocr", icon: ScanText },
];

export const pageTitles: Record<string, string> = Object.fromEntries(
  navigationItems.map((item) => [item.href, item.title])
);
