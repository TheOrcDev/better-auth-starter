import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { 
            key: 'Access-Control-Allow-Origin', 
            value: process.env.NODE_ENV === 'production'
              ? 'https://atribot.com'
              : 'http://localhost:3000'
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, X-Auth-Token, Content-Type, Authorization' },
        ]
      }
    ]
  },
  // Disable static optimization for all pages
  output: 'standalone',
  // Configure page revalidation (ISR)
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000', 'atribot.com']
    },
  },
  typescript: {
    // Skip TypeScript checking during build to catch errors earlier
    ignoreBuildErrors: false,
  },
  eslint: {
    // Don't fail build on ESLint errors
    ignoreDuringBuilds: true
  },
};

// For Netlify deployment
if (process.env.NETLIFY === 'true') {
  nextConfig.output = 'export';
  nextConfig.images = {
    unoptimized: true,
  };
}

export default nextConfig;
