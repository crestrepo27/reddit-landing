/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.redditmedia.com',
      },
      {
        protocol: 'https',
        hostname: '**.redd.it',
      }
    ],
  },
};

module.exports = nextConfig;