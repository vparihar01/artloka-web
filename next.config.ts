import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [60, 75],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440],
    imageSizes: [64, 80, 160, 320, 480],
    localPatterns: [
      { pathname: "/assets/products/**", search: "" },
      { pathname: "/images/**", search: "" }
    ]
  },
  turbopack: {
    root: projectRoot
  },
  experimental: {
    typedEnv: true
  },
  async headers() {
    return [
      {
        source: "/assets/products/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2678400, stale-while-revalidate=86400" }
        ]
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2678400, stale-while-revalidate=86400" }
        ]
      }
    ];
  }
};

export default nextConfig;
