// Compiles content/kalaam/*.md into src/generated/kalaam.json.
// Runs automatically before `dev` and `build`, so the site never reads the filesystem at runtime
// (Cloudflare Workers has no fs). Poem format: frontmatter + shers separated by a blank line,
// each sher = two lines (misre).
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import matter from 'gray-matter'

const dir = 'content/kalaam'
const files = (await readdir(dir)).filter((f) => f.endsWith('.md'))
const poems = []

for (const file of files) {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(await readFile(`${dir}/${file}`, 'utf8'))
  const shers = content
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((l) => l.trim()).filter(Boolean))
  for (const [i, s] of shers.entries()) {
    if (s.length !== 2) throw new Error(`${file}: sher ${i + 1} has ${s.length} lines, expected 2`)
  }
  for (const key of ['title', 'titleUr', 'order']) {
    if (data[key] === undefined) throw new Error(`${file}: missing frontmatter "${key}"`)
  }
  poems.push({
    slug,
    title: data.title,
    titleUr: data.titleUr,
    form: data.form ?? 'ghazal',
    order: data.order,
    spotifyTrack: data.spotifyTrack ?? null,
    album: data.album ?? null,
    trackNo: data.trackNo ?? null,
    epigraph: data.epigraph ?? null,
    epigraphCredit: data.epigraphCredit ?? null,
    shers,
  })
}

poems.sort((a, b) => a.order - b.order)
await mkdir('src/generated', { recursive: true })
await writeFile('src/generated/kalaam.json', JSON.stringify(poems, null, 1) + '\n')
console.log(`kalaam: compiled ${poems.length} poems`)
