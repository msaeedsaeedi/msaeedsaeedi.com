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
