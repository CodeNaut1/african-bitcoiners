import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

function imageRemotePatterns(): NonNullable<NextConfig['images']>['remotePatterns'] {
  const hosts = new Set<string>()
  const patterns: NonNullable<NextConfig['images']>['remotePatterns'] = []

  for (const raw of [NEXT_PUBLIC_SERVER_URL, process.env.R2_PUBLIC_URL].filter(Boolean)) {
    try {
      const url = new URL(raw as string)
      if (hosts.has(url.hostname)) continue
      hosts.add(url.hostname)
      patterns.push({
        hostname: url.hostname,
        protocol: url.protocol.replace(':', '') as 'http' | 'https',
      })
    } catch {
      // ignore invalid URLs
    }
  }

  return patterns
}

const nextConfig: NextConfig = {
  output: 'standalone',
  // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
  // See: https://github.com/vercel/next.js/issues/86431
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [100],
    remotePatterns: imageRemotePatterns(),
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
