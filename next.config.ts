import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 75, 90], // Support quality 90 for high-res hero images
  },
};

export default nextConfig;
