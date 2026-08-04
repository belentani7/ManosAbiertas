import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT_MODE === "netlify" ? undefined : "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
