/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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