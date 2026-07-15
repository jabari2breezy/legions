import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  serverExternalPackages: ["three"],
};

export default nextConfig;
