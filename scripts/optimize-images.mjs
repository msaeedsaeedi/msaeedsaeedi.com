// Generates web-ready portrait + album art from source images.
// Run: bun run images   (re-run whenever you replace a source image)
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const out = 'public/images'
await mkdir(out, { recursive: true })

const portrait = 'assets/profile.png'
for (const w of [480, 960, 1440]) {
  await sharp(portrait).resize({ width: w }).webp({ quality: 82 }).toFile(`${out}/portrait-${w}.webp`)
}
// Square crop used for social cards and the favicon-ish avatar.
await sharp(portrait)
  .resize({ width: 800, height: 800, position: 'top' })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(`${out}/portrait-square.jpg`)

console.log('Images optimized.')

// Album covers: drop the full-size source in assets/music/<slug>.png|jpg and re-run.
import { readdir } from 'node:fs/promises'
await mkdir(`${out}/music`, { recursive: true })
for (const file of await readdir('assets/music')) {
  const slug = file.replace(/\.(png|jpe?g|webp)$/i, '')
  await sharp(`assets/music/${file}`).resize({ width: 960, height: 960, fit: 'cover' }).jpeg({ quality: 84, mozjpeg: true }).toFile(`${out}/music/${slug}.jpg`)
}
console.log('Album covers optimized.')
