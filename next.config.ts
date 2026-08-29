import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT_MODE === "netlify" ? undefined : "standalone",
  reactStrictMode: true,
};

export default nextConfig;
