/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          "https://backend-production-d8e3.up.railway.app/api/v1/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend-production-d8e3.up.railway.app",
        port: "",
        pathname: "/src/infrastructure/storage/uploads/**",
      },
    ],
  },
};

export default nextConfig;
