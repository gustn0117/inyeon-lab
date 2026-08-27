/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 360, 390, 430, 640, 750, 828, 1080, 1200, 1440, 1536, 1920, 2560, 2880, 3200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};
export default nextConfig;
