import type {NextConfig} from 'next';

const repoName = process.env.GITHUB_REPOSITORY_NAME || 'Pasantias';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES_DEPLOY === 'true' ? `/${repoName}` : '',
  assetPrefix: process.env.GITHUB_PAGES_DEPLOY === 'true' ? `/${repoName}/` : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Important for static export to GitHub Pages without a custom loader
    // next/image will serve images as-is.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
