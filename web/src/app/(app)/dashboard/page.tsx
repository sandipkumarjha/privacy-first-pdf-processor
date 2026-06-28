"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Merge,
  Split,
  Zap,
  RotateCw,
  Scissors,
  Wand2,
  Shield,
  Upload,
  TrendingUp,
  Clock,
} from "lucide-react";

const tools = [
  {
    title: "Merge PDFs",
    description: "Combine multiple PDFs into one document",
    href: "/merge",
    icon: Merge,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Split PDF",
    description: "Extract specific pages into separate files",
    href: "/split",
    icon: Split,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    href: "/compress",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Rotate PDF",
    description: "Adjust page orientation and rotation",
    href: "/rotate",
    icon: RotateCw,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Extract Pages",
    description: "Convert PDF pages to images or text",
    href: "/extract",
    icon: Scissors,
    color: "from-rose-500 to-red-500",
  },
  {
    title: "Add Watermark",
    description: "Add text or image watermarks to PDFs",
    href: "/watermark",
    icon: Wand2,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "OCR & Text",
    description: "Extract and recognize text from images",
    href: "/ocr",
    icon: Shield,
    color: "from-cyan-500 to-blue-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John</h2>
        <p className="text-slate-600">
          Select a tool to get started. All processing happens on your device for maximum privacy.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Files Processed</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-slate-500 mt-1">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Zap className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-slate-500 mt-1">of 100 GB available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.8s</div>
            <p className="text-xs text-slate-500 mt-1">average per file</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Upload */}
      <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors">
        <CardHeader className="flex flex-col items-center justify-center py-8">
          <Upload className="h-8 w-8 text-slate-400 mb-2" />
          <CardTitle className="text-center">Quick Upload</CardTitle>
          <CardDescription className="text-center">
            Drop a PDF file here or click to select
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tools Grid */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Available Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`bg-gradient-to-br ${tool.color} p-3 rounded-lg text-white`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardTitle className="mt-4">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Privacy Notice */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-5 w-5 text-blue-600" />
            Your privacy is protected
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">
          All PDF processing happens locally on your device. Your files are never uploaded to our servers.
          We don't collect, store, or share any of your data.
        </CardContent>
      </Card>
    </div>
  );
}
