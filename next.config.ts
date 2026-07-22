import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    turbopack: {
      // Set to current directory to override incorrect inference from global lockfile
      root: process.cwd(),
    }
  }
};

export default nextConfig;
