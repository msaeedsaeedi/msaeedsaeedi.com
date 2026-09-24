# msaeedsaeedi.com

Personal site of Mohammad Saeed: product builder, engineer, and Urdu poet (pen name **Saeedi / سعیدی**).
Bilingual (English + Urdu, RTL), multi-page, light/dark themes, deployed to **Cloudflare Workers** via OpenNext.

## Commands (use bun)

| Task | Command |
|---|---|
| Dev server | `bun run dev` (compiles poems first) |
| Production build | `bun run build` |
| Type check | `bun run typecheck` |
| Cloudflare local preview (real workerd runtime) | `bun run preview` |
| Deploy to Cloudflare | `bun run deploy` (needs `wrangler login`) |
| Regenerate portrait images | `bun run images` (from `assets/profile.png`) |

## Where things live

```
content/                 ← EDIT CONTENT HERE (no UI code)
  kalaam/*.md            one file per ghazal (frontmatter + shers)
  builds.ts              projects on /builds and /builds/[slug]
  journey.ts             jobs, domains, toolbox, education (source: the CV in archive/)
  music.ts               albums, track durations
  poet.ts                poet introduction + selected ashaar (منتخب اشعار)
  site.ts                name, email, socials, portrait, cvUrl
src/i18n/en.ts, ur.ts    all UI copy. ur.ts must match en.ts's shape (type-enforced)
src/app/[lang]/…         routes: / builds journey kalaam sound self contact
src/components/
  layout/                Header, Footer, Logo, Cursor, ThemeToggle, LanguageSwitch, PageHeader, SmoothScroll
  home/                  Hero, InkCanvas (cursor calligraphy), Worlds, Vortex, SherRotator
  kalaam/                Sher (couplet typesetting), KalaamIndex (search), PoemReader
  builds/, ui/           BuildsGrid, BuildCover, Magnetic, Spotlight, Reveal, SpotifyEmbed…
scripts/build-kalaam.mjs md → src/generated/kalaam.json (auto-runs before dev/build; generated file is gitignored)
archive/                 original source material (old base.html, CV, Rekhta manuscript). Don't delete.
assets/profile.png       full-size portrait source (not shipped)
```

## Rules that matter

- **No filesystem access at runtime.** Workers has no `fs`. Poems are compiled to JSON at build time; everything else is TS imports. Every route is statically generated (`generateStaticParams` + `dynamicParams = false`).
- **Bilingual everything.** Any user-visible string goes in both `en.ts` and `ur.ts`, or as an `L` (`{ en, ur }`) in `content/`. Urdu copy is written for Urdu readers, not translated word for word. Use Urdu digits in Urdu (`localDigits`, `urduDigits` in `src/lib/format.ts`).
- **RTL:** use logical Tailwind utilities (`ms-/me-/ps-/pe-/start-/end-/text-start`), never `ml-/mr-/left-/right-` for layout. Wrap Latin names inside Urdu text with the `latin` class.
- **Poetry is always Urdu** (`lang="ur" dir="rtl"`, `font-gulzar`). Misre are justified to one width via `.sher` / `.misra`.
- **Fonts:** Bricolage Grotesque (Latin UI/display), Newsreader (Latin long-form), Gulzar (Urdu display + poetry), Noto Nastaliq Urdu (Urdu body). Urdu fonts are not preloaded.
- **Colour tokens** live in `src/app/globals.css` (`--paper --paper-2 --ink --ink-2 --line --rose --gold`), redefined under `.dark`. Use `bg-paper`, `text-ink`, `text-rose`, etc. Palette comes from the portrait (navy) and the Gulab-e-Suman cover (crimson, gold).
- **Motion:** `motion/react`. Every animation respects reduced motion (`MotionConfig reducedMotion="user"` plus CSS). Headings use `<Rise>`, supporting blocks `<Appear>`. Don't add fade-ups to every section.
- **Icons:** `lucide-react` for UI, `react-icons` (`si`, `fa6`) for brands via `components/ui/SocialIcon.tsx`.
- **Locale routing:** `/` redirects in `next.config.ts` (cookie `locale`, then `Accept-Language`, then `/en`). No middleware.

## Adding content

**A new ghazal:** create `content/kalaam/<slug>.md`:

```md
---
title: "Roman Title"
titleUr: "اردو عنوان"
order: 24                 # position in the list
form: ghazal
titleStatus: working      # or released
spotifyTrack: "<id>"      # optional; with album + trackNo it appears on /sound
album: gulab-e-suman
trackNo: 10
epigraph: "..."           # optional
epigraphCredit: "..."     # optional
---

first misra
second misra

next sher line one
next sher line two
```

The build fails loudly if a sher doesn't have exactly two lines.

**A new project:** add an entry to `content/builds.ts`. `draft: true` shows a "write-up coming" note.

**The upcoming album:** when released, set `status`, `cover`, `spotifyId`, `durationMs` in `content/music.ts` and add `spotifyTrack/album/trackNo` to the poems.

**CV download:** put the PDF in `public/cv/` and set `site.cvUrl` in `content/site.ts`.

## Cloudflare notes

- OpenNext config: `open-next.config.ts` uses the static-assets incremental cache (prerendered pages are served from Workers Static Assets; no KV/R2 needed). `preview`/`deploy` populate it automatically.
- `wrangler.jsonc`: add a `routes` custom-domain entry after the first deploy.
- `next.config.ts` has `images.unoptimized` because Workers has no sharp; pre-size images with `bun run images`.

## Open items (waiting on the owner)

- VortexMe: details beyond the research title (architecture, stack, results). Its case study is marked `draft`.
- Real titles for poems with `titleStatus: working` (the 9 album tracks use their Spotify titles).
- Wehm-e-Kham-e-Khayal artwork and the other two track names.
- Confirm the "Off the clock" hobbies in `src/i18n/*.ts` (`self.off`).
