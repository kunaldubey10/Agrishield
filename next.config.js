/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org', 'maps.googleapis.com', 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  env: {
    OPENWEATHER_API_KEY: 'e15e7551cdb8ed7df8c7fd1833af7fec',
  },
  // Exclude undici from server components
  experimental: {
    serverComponentsExternalPackages: ['undici'],
  },
  webpack: (config, { isServer, webpack }) => {
    // Only modify client-side bundle
    if (!isServer) {
      // Exclude Node.js built-in modules from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        undici: false,
      };
      
      // Replace undici with empty module - more comprehensive approach
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /node_modules\/undici/,
          path.resolve(__dirname, 'lib/empty-module.js')
        ),
        new webpack.NormalModuleReplacementPlugin(
          /firebase\/node_modules\/undici/,
          path.resolve(__dirname, 'lib/empty-module.js')
        ),
        new webpack.IgnorePlugin({
          resourceRegExp: /undici/,
        })
      );
      
      // Use null-loader as fallback for all undici references
      config.module.rules.push({
        test: /[\\/]node_modules[\\/].*undici/,
        use: 'null-loader',
      });
    }
    
    // Path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    
    return config;
  },
}

module.exports = nextConfig
