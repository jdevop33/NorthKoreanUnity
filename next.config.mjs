/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // React 19 and Next.js 15 optimizations
  experimental: {
    // React Compiler for automatic optimizations
    reactCompiler: true, // Re-enabled
    
    // Optimized image processing
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'react-icons'
    ],
    
    // React Server Components optimization
    serverMinification: true
  },
  
  // Optimize image handling
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Override packages for React 19 compatibility
  transpilePackages: [
    'recharts'
  ]
};

export default nextConfig;
