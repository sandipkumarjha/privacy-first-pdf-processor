"use client";

import { motion } from "framer-motion";

import { DashboardHero } from "@/components/Dashboard/DashboardHero";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { UploadCard } from "@/components/Dashboard/UploadCard";
import { ToolsGrid } from "@/components/Dashboard/ToolsGrid";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { PrivacyBanner } from "@/components/Dashboard/PrivacyBanner";

export default function DashboardPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 pb-12"
    >
      {/* Hero */}
      <DashboardHero />

      {/* Stats */}
      <DashboardStats />

      {/* Upload Area */}
      <UploadCard />

      {/* Tools */}
      <ToolsGrid />

      {/* Bottom Section */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <RecentActivity />

        <PrivacyBanner />
      </div>
    </motion.main>
  );
}