"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


/*const scrollToUpload = () => {
  const section = document.getElementById("upload-zone");

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};*/
export function DashboardHero() {
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-3xl border-4 border-[#3874FF] bg-gradient-to-br from-[#1591DC] via-[#99C2FF] to-[#1591DC] p-8 lg:p-12"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
      <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full  blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full  blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3874FF] border-2 px-4 py-2"
          >
            <ShieldCheck className="h-4 w-4 text-zinc-900" />
            <span className="text-sm font-medium text-zinc-800">
              100% Privacy First
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold tracking-tight text-black lg:text-5xl"
          >
            Welcome back 👋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-5 max-w-xl text-lg leading-8 text-black"
          >
            Securely merge, split, compress, rotate and edit PDFs directly
            inside your browser.
            <span className="text-zinc-700 font-medium">
              {" "}
              Your files never leave your device.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            
            <Button
  size="lg"
  
  className="rounded-xl bg-[#FFDDB0] px-6 hover:bg-[#FFBE91]"
>
  Upload PDF
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-[#3874FF] bg-white/5 text-zinc-900 hover:bg-blue-500"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Right Side Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="rounded-2xl border border-[#3874FF] border-2 bg-[#99C2FF] p-6 backdrop-blur-xl ">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-[#99C2FF] p-3">
                <Sparkles className="h-6 w-6 text-zinc-800 " />
              </div>

              <div>
                <h3 className="font-semibold text-zinc-800">
                  Local Processing
                </h3>

                <p className="text-sm text-zinc-700">
                  Browser Powered
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "No uploads to any server",
                "Works completely offline",
                "End-to-end local processing",
                "No account required",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-[#3874FF] border-2 bg-blue-300 p-3"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                  <span className="text-sm text-zinc-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-black bg-[#FFBE91] p-4">
              <p className="text-xs leading-6 text-zinc-800">
                🔒 Privacy is not just a promise. Every PDF operation happens
                locally inside your browser using WebAssembly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}