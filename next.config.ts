import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp', 'image/png', 'image/jpg'],
  },
  reactCompiler: true,
};

export default nextConfig;
