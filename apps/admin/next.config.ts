/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'solar-sys-api-production.up.railway.app',
        pathname: '/uploads/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
        pathname: '/uploads/images/**',
      },
    ],
  },
  experimental: {
    authInterrupts: true,
  },
};

module.exports = nextConfig;
