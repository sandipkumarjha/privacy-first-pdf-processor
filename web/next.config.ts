import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Addresses people guess, or that older links pointed at.
      { source: "/app", destination: "/dashboard", permanent: false },
      { source: "/tools", destination: "/dashboard", permanent: false },
      { source: "/privacy", destination: "/privacy-policy", permanent: false },
      { source: "/tos", destination: "/terms", permanent: false },
      { source: "/documentation", destination: "/docs", permanent: false },
    ];
  },
};

export default nextConfig;
