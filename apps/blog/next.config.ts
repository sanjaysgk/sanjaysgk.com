import { fileURLToPath } from 'node:url'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

async function createNextConfig(): Promise<NextConfig> {
  const { createJiti } = await import('jiti')
  const jiti = createJiti(fileURLToPath(import.meta.url))

  await jiti.import('./src/env')

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    devIndicators: false,
    experimental: {
      viewTransition: true,
    },
    images: {
      dangerouslyAllowSVG: true,
      qualities: [100, 75, 85, 95],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    serverExternalPackages: [
      'ts-morph',
      'typescript',
      'oxc-transform',
      'twoslash',
      'twoslash-protocol',
      'shiki',
      '@takumi-rs/image-response',
    ],
    async rewrites() {
      return [
        {
          source: '/posts/:path*.mdx',
          destination: '/blog.mdx/:path*',
        },
      ]
    },
  }

  return nextConfig
}

const mdxPlugin = createMDX()

const NextApp = async () => {
  const nextConfig = await createNextConfig()
  return mdxPlugin(nextConfig)
}

export default NextApp
