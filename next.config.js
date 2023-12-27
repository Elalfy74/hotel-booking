/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
      },
    ],
  },
};

module.exports = nextConfig;
