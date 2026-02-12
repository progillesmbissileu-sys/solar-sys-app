/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/**"),
      new URL("http://localhost:3333/**"),
    ],
  },
};

export default nextConfig;
