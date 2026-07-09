import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.us-east-005.backblazeb2.com',
        port: '',
        pathname: '/amhs-project-12/**',
      },
    ]
  }
};

export default nextConfig;
