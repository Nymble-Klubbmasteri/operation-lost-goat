/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Tip 1: keep optimized image variants cached longer to reduce transformations/cache writes
    minimumCacheTTL: 2678400, // 31 days (seconds)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**', // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'storage.cloud.google.com',
        pathname: '/**', // allow all paths
      },
    ],
  },
};

export default nextConfig;