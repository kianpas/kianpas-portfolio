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
};

export default nextConfig;
