import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }, // as fotos já saem em AVIF/WebP por scripts/photos.mjs
  reactStrictMode: true,
};

export default config;
