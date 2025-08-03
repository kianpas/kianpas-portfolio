import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "/blog/page/1",
      },
    ];
  },
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
