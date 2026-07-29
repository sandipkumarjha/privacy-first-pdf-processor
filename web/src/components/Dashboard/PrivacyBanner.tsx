"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  WifiOff,
  Lock,
  HardDrive,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: WifiOff,
    title: "Zero Uploads",
    description: "Files never leave your browser.",
  },
  {
    icon: Lock,
    title: "Encrypted Memory",
    description: "Processed only inside your device.",
  },
  {
    icon: HardDrive,
    title: "Offline Ready",
    description: "Works without an internet connection.",
  },
];

export function PrivacyBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border-4 border-[#3874FF] bg-gradient-to-br from-[#1591DC] via-[#99C2FF] to-[#1591DC] p-8 lg:p-12"
    >
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative z-10">
        {/* Badge */}

        <div className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/20 bg-green-200 px-4 py-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />

          <span className="text-sm font-medium text-emerald-950 ">
            Privacy First
          </span>
        </div>

        {/* Heading */}

        <h2 className="mt-6 text-3xl font-bold text-black">
          Your PDFs stay on
          <br />
          <span className="bg-gradient-to-r from-zinc-600 via-cyan-700 to-blue-800 bg-clip-text text-transparent">
            your device.
          </span>
        </h2>

        <p className="mt-5 leading-7 text-shadow-zinc-800">
          Every PDF operation happens locally using WebAssembly and Web Workers.
          We never upload, store, or analyze your files.
        </p>

        {/* Features */}

        <div className="mt-8 space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                }}
                className="flex items-start gap-4 rounded-2xl border-2 border-blue-600 bg-white/[0.03] p-4 transition-all duration-300 hover:border-indigo-500/20 hover:bg-white/[0.05]"
              >
                <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-3">
                  <Icon className="h-5 w-5 text-black" />
                </div>

                <div>
                  <h4 className="font-semibold text-black">
                    {feature.title}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-800">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Verification */}

        <div className="rounded-2xl border-2 border-blue-600  p-5">
          <div className="flex items-start gap-3 ">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />

            <div  >
              <h4 className="font-semibold text-black">
                Verifiable Privacy
              </h4>

              <p className="mt-2 text-sm leading-6 text-shadow-zinc-800">
                Open your browser's Developer Tools and inspect the Network tab.
                You'll never find your PDF being uploaded to any server.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}

        <Button
          className="mt-8 w-full rounded-xl bg-[#FFDDB0] hover:bg-[#FFBE91]"
        >
          Learn About Our Privacy

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.section>
  );
}