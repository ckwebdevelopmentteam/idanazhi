import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'm.ahstatic.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.21st.dev' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/singapore',
        destination: '/stay',
        permanent: true,
      },
      {
        source: '/singapore/:path*',
        destination: '/stay',
        permanent: true,
      },
      {
        source: '/dubai',
        destination: '/stay',
        permanent: true,
      },
      {
        source: '/dubai/:path*',
        destination: '/stay',
        permanent: true,
      },
      {
        source: '/rooms',
        destination: '/stay',
        permanent: true,
      },
      {
        source: '/rooms/:path*',
        destination: '/stay',
        permanent: true,
      },
      {
        source: '/celebrations-and-experience',
        destination: '/celebrations',
        permanent: true,
      },
      {
        source: '/celebration',
        destination: '/celebrations',
        permanent: true,
      },
      {
        source: '/weddings',
        destination: '/celebrations',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
