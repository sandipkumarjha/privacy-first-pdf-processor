"use client";

import { DashboardHero } from "@/components/Dashboard/DashboardHero";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { UploadCard } from "@/components/Dashboard/UploadCard";
import { ToolsGrid } from "@/components/Dashboard/ToolsGrid";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { PrivacyBanner } from "@/components/Dashboard/PrivacyBanner";

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-4">
      <DashboardHero />
      <DashboardStats />
      <UploadCard />
      <ToolsGrid />

      <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <RecentActivity />
        <PrivacyBanner />
      </div>
    </div>
  );
}
