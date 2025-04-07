/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Remove experimental section if empty or specific to R19/N15
  // experimental: { 
    // React Compiler for automatic optimizations
    // reactCompiler: true, // Keep disabled or remove entirely
    
    // Optimized image processing
    // optimizePackageImports: [ // Keep if still relevant for v14
    //   'lucide-react',
    //   'date-fns',
    //   'react-icons'
    // ],
    
    // React Server Components optimization
    // serverMinification: true // Keep if still relevant for v14
  //},
  
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
  // Remove if not needed for React 18
  transpilePackages: [
    'recharts' // Keep if recharts still needs transpilation with Next 14
  ]
};

export default nextConfig;
