// @ts-nocheck — no types for @next/mdx
import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Support MDX files as pages/content
  pageExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx', 'mdx'],
}

const withPlugins = [
  withMDX({
    /* mdx options */
    options: {},
  }),
]

export default withPlugins.reduce((acc, plugin) => plugin(acc), nextConfig)
