// Plain-text views of the site for AI answer engines (https://llmstxt.org).
// /llms.txt is the map; /llms-full.txt is every page's content in one Markdown file.
// Both are generated at build time from /content, so they never drift from the site.
import { alsoOnGithub, builds } from '@content/builds'
import { domains, education, learning, roles, toolbox } from '@content/journey'
import { albums, trackDurations } from '@content/music'
import { poetIntro } from '@content/poet'
import { site, socials } from '@content/site'
import en from '@/i18n/en'
import { getAlbumTracks, getPoems } from '@/lib/kalaam'

const url = (path = '') => `${site.url}/en${path ? `/${path}` : ''}`
const period = (start: string, end: string | null) => `${start} to ${end ?? 'present'}`
const minutes = (ms: number) => `${Math.round(ms / 60000)} min`

function about() {
  return [
    `# ${site.fullName.en}`,
    '',
    `> ${en.meta.description}`,
    '',
    `${site.fullName.en} (also written Mohammad Saeed; pen name ${site.penName.en}, ${site.penName.ur}) lives in ${site.location.en}. ` +
      `He is a full-stack software engineer at CMOonTheGO, a final-year BS Computer Science student at ${education.school.en} (FAST-NU), ` +
      `the founder of Prime Innovators (paused in July 2026), and an Urdu poet. ` +
      `Nine of his ghazals were set to music by a production house and released as the album Gulab-e-Suman; he wrote the lyrics and does not sing them. ` +
      `A second album, Wehm-e-Kham-e-Khayal, is in production.`,
    '',
    `Contact: ${site.email}. Profiles: ${socials.map((s) => `${s.label} ${s.href}`).join(', ')}.`,
  ]
}

export function llmsIndex() {
  const poems = getPoems()
  return [
    ...about(),
    '',
    '## Pages',
    '',
    `- [Home](${url()}): who he is and what he is working on now`,
    `- [Builds](${url('builds')}): ${en.seo.builds.description}`,
    `- [Journey](${url('journey')}): ${en.seo.journey.description}`,
    `- [Kalaam](${url('kalaam')}): ${en.seo.kalaam.description}`,
    `- [Albums](${url('albums')}): ${en.seo.albums.description}`,
    `- [Self](${url('self')}): ${en.seo.self.description}`,
    `- [Contact](${url('contact')}): ${en.seo.contact.description}`,
    '',
    '## Builds',
    '',
    ...builds.map((b) => `- [${b.name}](${url(`builds/${b.slug}`)}): ${b.oneLiner.en} (${[en.builds.kind[b.kind], b.status === 'research' ? null : en.builds.status[b.status].toLowerCase(), b.year].filter(Boolean).join(', ')})`),
    '',
    '## Ghazals (Urdu, by Saeedi)',
    '',
    ...poems.map((p) => `- [${p.titleUr} (${p.title})](${url(`kalaam/${p.slug}`)}): ${p.shers[0].join(' / ')}`),
    '',
    '## Optional',
    '',
    `- [Full text of the site](${site.url}/llms-full.txt): every page, project and ghazal in one Markdown file`,
    `- [Sitemap](${site.url}/sitemap.xml)`,
    '',
  ].join('\n')
}

export function llmsFull() {
  const out: string[] = [...about(), '']

  out.push('## Now', '', ...en.home.now.map((n) => `- ${n.label}: ${n.title}. ${n.body}`), '')

  out.push('## About', '', ...en.self.bio, '', '### What he believes', '')
  for (const t of en.self.think) out.push(`- **${t.title}** ${t.body}`)
  out.push('', '### What he dreams about', '', ...en.self.dreams.map((d) => `- ${d}`), '')

  out.push('## Builds', '')
  for (const b of builds) {
    out.push(
      `### ${b.name}`,
      '',
      `URL: ${url(`builds/${b.slug}`)}`,
      `Kind: ${en.builds.kind[b.kind]}. Status: ${en.builds.status[b.status]}. Year: ${b.year}. Role: ${b.role.en}.`,
      `Stack: ${b.stack.join(', ')}.`,
      ...(b.links.repo ? [`Source: ${b.links.repo}`] : []),
      '',
      b.oneLiner.en,
      '',
      ...(b.question ? [`Research question: ${b.question.en}`, ''] : []),
      `Problem: ${b.problem.en}`,
      '',
      `Approach: ${b.approach.en}`,
      '',
      ...b.highlights.map((h) => `- ${h.en}`),
      '',
      ...(b.epilogue ? [`Where it stands: ${b.epilogue.en}`, ''] : []),
    )
  }
  out.push('### Also on GitHub', '', ...alsoOnGithub.map((a) => `- [${a.name}](${a.href}): ${a.note.en}`), '')

  out.push('## Journey', '')
  for (const r of roles) out.push(`- **${r.title.en}, ${r.org}** (${period(r.start, r.end)}, ${r.place.en}): ${r.summary.en}`)
  out.push('', '### Strengths', '')
  for (const d of domains) out.push(`- **${d.title.en}:** ${d.body.en} (${d.evidence.en})`)
  out.push('', '### Toolbox', '')
  for (const t of toolbox) out.push(`- ${t.group.en}: ${t.items.join(', ')}`)
  out.push('', '### Education', '', `${education.degree.en}, ${education.school.en}, ${education.period.en}. ${education.note.en}`, '')
  out.push('### Currently learning', '', ...learning.map((l) => `- ${l.title.en}: ${l.note.en}`), '')

  out.push('## Albums', '')
  for (const a of albums) {
    out.push(`### ${a.title.en} (${a.title.ur})`, '')
    out.push(a.status === 'released' ? `Released. ${a.trackCount} tracks${a.durationMs ? `, ${minutes(a.durationMs)}` : ''}.` : 'In production.')
    if (a.spotifyId) out.push(`Spotify: https://open.spotify.com/album/${a.spotifyId}`)
    out.push('Lyrics by Saeedi (Mohammad Saeed Saeedi). Music produced by a production house.', '')
    for (const p of getAlbumTracks(a.slug)) {
      const dur = p.spotifyTrack && trackDurations[p.spotifyTrack] ? `, ${minutes(trackDurations[p.spotifyTrack])}` : ''
      out.push(`${p.trackNo}. ${p.title} (${p.titleUr})${dur}: ${url(`kalaam/${p.slug}`)}`)
    }
    out.push('')
  }
  out.push(`Artist page: ${site.spotifyArtist}`, '')

  out.push('## Kalaam: the ghazals', '', `About the poet: ${poetIntro.en}`, '')
  for (const p of getPoems()) {
    const album = albums.find((a) => a.slug === p.album)
    out.push(`### ${p.titleUr} (${p.title})`, '', `URL: ${url(`kalaam/${p.slug}`)}`)
    if (album && p.trackNo) out.push(`Track ${p.trackNo} of the album ${album.title.en}.`)
    if (p.epigraph) out.push(`Epigraph: ${p.epigraph}${p.epigraphCredit ? ` (${p.epigraphCredit})` : ''}`)
    out.push('')
    for (const s of p.shers) out.push(s.join('  \n'), '')
  }

  return out.join('\n')
}
