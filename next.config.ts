import type {NextConfig} from 'next';

// This will be set by the GitHub Actions workflow
// It extracts 'repo-name' from 'owner/repo-name'
const repoName = process.env.GITHUB_REPOSITORY_NAME || '';

const nextConfig: NextConfig = {
  output: 'export',
  // Set basePath and assetPrefix only for production builds on GitHub Pages
  // This ensures local development (npm run dev) works without the basePath
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
