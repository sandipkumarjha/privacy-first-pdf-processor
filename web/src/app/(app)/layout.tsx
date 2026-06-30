import type { Metadata } from "next";
import "@/app/globals.css";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Dashboard • PDFVault",
  description: "Privacy-first PDF processing",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
          <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-500/5 blur-[140px]" />
        </div>

        {/* Header */}
        <Header />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}