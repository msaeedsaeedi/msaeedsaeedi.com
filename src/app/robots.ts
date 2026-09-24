import type { MetadataRoute } from 'next'
import { site } from '@content/site'

export const dynamic = 'force-static'

// Search and AI crawlers are welcome, including the ones that power answer engines
// (ChatGPT, Claude, Perplexity, Gemini). Named explicitly so the intent is unambiguous.
// Note: Cloudflare's "Block AI bots" / managed robots.txt settings can override this file.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'meta-externalagent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: aiCrawlers, allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
