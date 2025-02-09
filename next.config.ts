import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
  experimental: {
    reactCompiler: true,
    serverMinification: true,
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    optimizePackageImports: [
      'tailwindcss',
      '@radix-ui/react-toast',
      '@radix-ui/react-slot',
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
              },
            },
          ],
          as: '*.js',
        },
      },
      moduleIdStrategy: 'deterministic',
      resolveExtensions: [
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.json',
        '.css',
        '.scss',
        '.sass',
        '.mjs',
      ],
      memoryLimit: 4 * 1024 * 1024 * 1024,
    },
  },
};

export default nextConfig;
