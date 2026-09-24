// Identity, links and contact details. Single source of truth: change here, updates everywhere.
import type { L } from '@/i18n/config'

export const site = {
  url: 'https://msaeedsaeedi.com',
  name: { en: 'Mohammad Saeed', ur: 'محمد سعید' } satisfies L,
  fullName: { en: 'Mohammad Saeed Saeedi', ur: 'محمد سعید سعیدی' } satisfies L,
  penName: { en: 'Saeedi', ur: 'سعیدی' } satisfies L,
  email: 'imsaeedsaeedi@gmail.com',
  location: { en: 'Islamabad, Pakistan', ur: 'اسلام آباد، پاکستان' } satisfies L,
  timeZone: 'Asia/Karachi',
  portrait: {
    // Generated from assets/profile.png by `bun run images`.
    src: '/images/portrait-960.webp',
    srcSet: '/images/portrait-480.webp 480w, /images/portrait-960.webp 960w, /images/portrait-1440.webp 1440w',
    square: '/images/portrait-square.jpg',
    width: 2172,
    height: 2896,
    alt: { en: 'Portrait of Mohammad Saeed', ur: 'محمد سعید کی تصویر' } satisfies L,
  },
  /** Set to e.g. '/cv/mohammad-saeed.pdf' (file in /public) to show a download button on Journey. */
  cvUrl: null as string | null,
}

export type SocialId = 'github' | 'linkedin' | 'instagram' | 'spotify' | 'youtube' | 'devto'

export const socials: { id: SocialId; label: string; handle: string; href: string }[] = [
  { id: 'github', label: 'GitHub', handle: 'msaeedsaeedi', href: 'https://github.com/msaeedsaeedi' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'msaeedsaeedi', href: 'https://www.linkedin.com/in/msaeedsaeedi/' },
  { id: 'spotify', label: 'Spotify', handle: 'Mohammad Saeed Saeedi', href: 'https://open.spotify.com/album/3UMgWtCOb5RlAhPvCiXQfk' },
  { id: 'instagram', label: 'Instagram', handle: '@imsaeedsaeedi', href: 'https://www.instagram.com/imsaeedsaeedi/' },
  { id: 'youtube', label: 'YouTube', handle: '@imsaeedsaeedi', href: 'https://www.youtube.com/@imsaeedsaeedi' },
  { id: 'devto', label: 'DEV', handle: 'msaeedsaeedi', href: 'https://dev.to/msaeedsaeedi' },
]
