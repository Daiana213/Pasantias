
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
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'diagonalalaro.com.ar',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // Ensure NEXT_PUBLIC_ environment variables are available client-side
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_GITHUB_PAGES_DEPLOY: process.env.GITHUB_PAGES_DEPLOY, // Added for client-side check
  },
};

export default nextConfig;

