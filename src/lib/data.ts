/**
 * Static data that doesn't need localization.
 * Localized strings (names, descriptions) live in src/i18n/*.json
 * and are accessed via the `t()` helper from useLocale().
 */

export type Project = {
  id: string
  slug: string
  tags: string[]
  status: string
  link?: string
  thumbClass?: string
  placeholder?: string
}

export type Album = {
  id: 'gulab' | 'wehm'
  slug: string
  trackCount: number
  spotifyUrl: string
  placeholder: boolean
}

export type SocialLink = {
  label: string
  href: string
  icon: string
  ariaLabel: string
}

const EMAIL = 'imsaeedsaeedi@gmail.com'
const SPOTIFY_ALBUM_URL = 'https://open.spotify.com/album/3UMgWtCOb5RIAhPvCiXQfk'
const GITHUB_PROFILE = 'https://github.com/msaeedsaeedi'

/**
 * Navigation order — matches the original site's nav.
 * Localized labels come from i18n messages under `nav.*`.
 */
export const navLinks: { slug: string; key: string }[] = [
  { slug: '/work', key: 'work' },
  { slug: '/music', key: 'music' },
  { slug: '/kalaam', key: 'poetry' },
  { slug: '/connect', key: 'reach' },
]

/**
 * Mobile nav — same links, no home anchor.
 */
export const mobileNavLinks = navLinks

/**
 * Projects — localized names/descs come from messages.work.projects.*
 */
export const projects: Project[] = [
  {
    id: 'prime',
    slug: 'prime-innovators',
    tags: ['Next.js', 'NestJS', 'Prisma', 'Docker'],
    status: 'open_source',
    link: GITHUB_PROFILE,
    thumbClass: 'p1',
  },
  {
    id: 'vortexme',
    slug: 'vortexme',
    tags: ['FYP', 'Cloud', 'R&D'],
    status: 'in_development',
    placeholder: 'FYP details coming as development progresses.',
    thumbClass: 'p2',
  },
  {
    id: 'vocab',
    slug: 'vocab',
    tags: ['TypeScript', 'Tool'],
    status: 'active',
    thumbClass: 'p3',
  },
  {
    id: 'clean-repo',
    slug: 'clean-repo',
    tags: ['CLI', 'TypeScript'],
    status: 'open_source',
    link: `${GITHUB_PROFILE}/clean-repo`,
    thumbClass: 'p4',
  },
  {
    id: 'again',
    slug: 'again',
    tags: ['Go', 'Bubble Tea'],
    status: 'open_source',
    link: `${GITHUB_PROFILE}/again`,
    thumbClass: 'p5',
  },
]

/**
 * Also-on-GitHub quick links (rendered as an inline row below the grid).
 */
export const alsoOnGitHub = [
  { label: 'again', href: `${GITHUB_PROFILE}/again` },
  { label: 'clean-repo', href: `${GITHUB_PROFILE}/clean-repo` },
  { label: 'full profile', href: GITHUB_PROFILE },
]

/**
 * Albums — localized names/meta/desc come from messages.music.albums.*
 */
export const albums: Album[] = [
  {
    id: 'gulab',
    slug: 'gulab-e-suman',
    trackCount: 9,
    spotifyUrl: SPOTIFY_ALBUM_URL,
    placeholder: true,
  },
  {
    id: 'wehm',
    slug: 'wehm-e-kham-e-khayal',
    trackCount: 3,
    spotifyUrl: SPOTIFY_ALBUM_URL,
    placeholder: true,
  },
]

/**
 * Social links — icons use Phosphor class names.
 */
export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/msaeedsaeedi/', icon: 'ph-linkedin-logo', ariaLabel: 'LinkedIn' },
  { label: 'GitHub', href: GITHUB_PROFILE, icon: 'ph-github-logo', ariaLabel: 'GitHub' },
  { label: 'Instagram', href: 'https://www.instagram.com/imsaeedsaeedi/', icon: 'ph-instagram-logo', ariaLabel: 'Instagram' },
  { label: 'Spotify', href: SPOTIFY_ALBUM_URL, icon: 'ph-spotify-logo', ariaLabel: 'Spotify' },
  { label: 'Dev.to', href: 'https://dev.to/msaeedsaeedi', icon: 'ph-dev-to-logo', ariaLabel: 'Dev.to' },
]

/**
 * Stats shown in the About section.
 */
export const stats = [
  { num: '43', key: 'repos' },
  { num: '65', key: 'stars' },
  { num: '9', key: 'tracks' },
]

export { EMAIL }
