/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elitedraftingdesign.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
