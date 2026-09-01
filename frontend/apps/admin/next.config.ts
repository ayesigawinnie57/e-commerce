import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@zavora/ui', '@zavora/api', '@zavora/types', '@zavora/utils', '@zavora/config', '@zavora/validation'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
