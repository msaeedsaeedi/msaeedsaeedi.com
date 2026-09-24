# msaeedsaeedi.com

Personal site of Mohammad Saeed: product builder, engineer, and Urdu poet (pen name **Saeedi / سعیدی**).
Built bilingual (English + Urdu, RTL), multi-page, light/dark themes, deployed to **Cloudflare Workers Static Assets** as a Next.js static export (no Worker script runs).

**Release status: English only.** Urdu is fully wired but unpublished until its copy is reviewed by hand. The switch is `publishedLocales` in `src/i18n/config.ts` (plus the `/` redirect in `public/_redirects`). Keep `ur.ts` compiling and in sync; don't delete Urdu code.

## Commands (use bun)

| Task | Command |
|---|---|
| Dev server | `bun run dev` (compiles poems first) |
| Production build | `bun run build` |
| Type check | `bun run typecheck` |
| Cloudflare local preview (serves `out/` like production) | `bun run preview` |
| Deploy to Cloudflare | `bun run deploy` (needs `wrangler login`) |
| Regenerate portrait images | `bun run images` (from `assets/profile.png`) |

## Where things live

```
content/                 ← EDIT CONTENT HERE (no UI code)
  kalaam/*.md            one file per ghazal (frontmatter + shers)
  builds.ts              projects on /builds and /builds/[slug]
  journey.ts             jobs, domains, toolbox, education (source: the CV in archive/)
  music.ts               albums, track durations (covers: assets/music/<slug>.png → `bun run images`)
  poet.ts                poet introduction + selected ashaar (منتخب اشعار)
  site.ts                name, email, socials, portrait, cvUrl
src/i18n/en.ts, ur.ts    all UI copy. ur.ts must match en.ts's shape (type-enforced)
src/app/[lang]/…         routes: / builds journey kalaam albums self contact
src/components/
  layout/                Header, Footer, Logo, Cursor, ThemeToggle, LanguageSwitch, PageHeader, SmoothScroll
  home/                  Hero, InkCanvas (cursor calligraphy; tune INK_DEFAULTS), ProximityName, Worlds, Vortex, SherRotator
  kalaam/                Sher (couplet typesetting), KalaamIndex (search), PoemReader
  builds/, ui/           BuildsGrid, BuildCover, Magnetic, Spotlight, Reveal, SpotifyEmbed…
scripts/build-kalaam.mjs md → src/generated/kalaam.json (auto-runs before dev/build; generated file is gitignored)
archive/                 original source material (old base.html, CV, Rekhta manuscript). Don't delete.
assets/profile.png       full-size portrait source (not shipped)
```

## Rules that matter

- **Static export only (`output: 'export'`).** There is no server at runtime: no route handlers that read the request, server actions, cookies, headers, middleware/proxy, ISR or `next.config` redirects/headers. Every route is statically generated (`generateStaticParams` + `dynamicParams = false`). Poems are compiled to JSON at build time. Adding a server feature would put a billed Worker back in front of every page, so don't.
- **Bilingual everything.** Any user-visible string goes in both `en.ts` and `ur.ts`, or as an `L` (`{ en, ur }`) in `content/`. Urdu copy is written for Urdu readers, not translated word for word. Use Urdu digits in Urdu (`localDigits`, `urduDigits` in `src/lib/format.ts`).
- **RTL:** use logical Tailwind utilities (`ms-/me-/ps-/pe-/start-/end-/text-start`), never `ml-/mr-/left-/right-` for layout. Wrap Latin names inside Urdu text with the `latin` class.
- **Poetry is always Urdu** (`lang="ur" dir="rtl"`, `font-gulzar`). Misre are justified to one width via `.sher` / `.misra`.
- **Fonts:** Bricolage Grotesque (Latin UI/display), Newsreader (Latin long-form), Gulzar (Urdu display + poetry), Noto Nastaliq Urdu (Urdu body). Urdu fonts are not preloaded.
- **Colour tokens** live in `src/app/globals.css` (`--paper --paper-2 --ink --ink-2 --line --rose --gold`), redefined under `.dark`. Use `bg-paper`, `text-ink`, `text-rose`, etc. Palette comes from the portrait (navy) and the Gulab-e-Suman cover (crimson, gold).
- **Motion:** `motion/react`. Every animation respects reduced motion (`MotionConfig reducedMotion="user"` plus CSS). Headings use `<Rise>`, supporting blocks `<Appear>`. Don't add fade-ups to every section.
- **Icons:** `lucide-react` for UI, `react-icons` (`si`, `fa6`) for brands via `components/ui/SocialIcon.tsx`.
- **Locale routing:** `/` redirects to `/en` in `public/_redirects` (Cloudflare syntax; old-site URLs are there too). Those rules can't read cookies or `Accept-Language`, so when Urdu ships, choose the language on the client (e.g. a tiny script on a static `/` page) or add a Worker limited to `/` with `run_worker_first: ["/"]`. Never route every page through a Worker.
- **Poetry pages stay RTL even on /en**: the poet intro is the Urdu one, and poem lists/nav flow right to left.
- **Facts to respect:** Saeed does not sing; the albums were produced by a production house that must not be named. Prime Innovators is paused (July 2026). Vocab no longer mentions Lexicon, and is an experimental R&D project, not shipped. Slotty is in design, not shipped, and open to contributors.
- **Links must look clickable:** use `.link` for inline links (quiet underline, rose on hover); nav items get a hover underline.

## SEO and AI engines

- Titles and descriptions for search live in `seo` in `en.ts`/`ur.ts` (the layout appends ` | Mohammad Saeed`). Poem titles come from `seo.poemTitle`.
- Structured data: `src/lib/seo.ts`. The layout declares one `Person` (`#person`) and `WebSite`; each page adds its own graph (ProfilePage, CollectionPage + ItemList, MusicAlbum with tracks and lyricist, CreativeWork for poems, BreadcrumbList) that points back to `#person`. Render with `<JsonLd>`.
- `/llms.txt` and `/llms-full.txt` (`src/lib/llms.ts`) are generated from `/content` at build time. New content shows up there automatically.
- `robots.ts` explicitly allows AI crawlers. Cloudflare's "Block AI bots" and managed robots.txt settings can override it, so keep them off.

## Adding content

**A new ghazal:** create `content/kalaam/<slug>.md`:

```md
---
title: "Roman Title"
titleUr: "اردو عنوان"
order: 24                 # position in the list
form: ghazal
titleStatus: working      # or released
spotifyTrack: "<id>"      # optional; with album + trackNo it appears on /albums
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

**Roman Urdu:** after the Urdu, add a `<!-- roman -->` line and the transliteration laid out the same way (same shers, two lines each). Readers choose Urdu (default) · Both · Roman with the floating `ScriptDock` (Kalaam index and poem pages; site-wide, saved in localStorage, applied before paint by `scriptInit` in the layout). Mark elements with `script-ur`, `script-roman` or `only-roman`, and `script-flip` on RTL containers that should turn LTR in Roman mode; globals.css does the rest. The Roman text also powers Latin-script search on /kalaam, and leads the poem's meta description. Conventions: izafat as `gham-e-zindagi`, `o` for و (`khwaab-o-khayaal`), `n` for ں, capitalise names (`Saeedi`, `Khuda`, `Lahore`).

The build fails loudly if a sher doesn't have exactly two lines, or if the Roman Urdu doesn't match the Urdu sher for sher.

**A new project:** add an entry to `content/builds.ts`. Kinds: flagship, research, product, tool. `draft: true` shows a "write-up coming" note; `question` (research) and `epilogue` (e.g. why it paused) render as their own blocks.

**The upcoming album:** when released, set `status`, `spotifyId`, `durationMs` in `content/music.ts` and add `spotifyTrack/album/trackNo` to the poems.

**CV download:** put the PDF in `public/cv/` and set `site.cvUrl` in `content/site.ts`.

## Cloudflare notes

- `next build` writes the static site to `out/`. `wrangler.jsonc` is an **assets-only Worker** (no `main`): Cloudflare serves every file, including the router's `?_rsc=` prefetches (`__next.*.txt`), from Workers Static Assets. Those requests are free and don't count as Worker invocations.
- `html_handling: auto-trailing-slash` maps `/en/contact` to `out/en/contact.html`; `not_found_handling: 404-page` serves `out/404.html` (the global not-found page).
- `public/_redirects` and `public/_headers` replace `next.config` redirects and headers (Cloudflare syntax). `_headers` also sets `Content-Type: image/png` on the extensionless `opengraph-image` files.
- The custom domain is attached in the dashboard (Worker > Settings > Domains & Routes).
- `images.unoptimized` is set because there is no image server; pre-size images with `bun run images`.
- **Before deploying, run `bun run preview`** and watch the Network tab: prefetches should be `__next.*.txt` files, a few dozen per page, then quiet.

## Open items (waiting on the owner)

- VortexMe is in design (FYP, team of three); case study marked `draft` until it's built and validated. Don't claim it's launched.
- The digital-twin research is a separate entry (`digital-twin-reconciliation`), also `draft`.
- Real titles for poems with `titleStatus: working` (the 9 album tracks use their Spotify titles).
- Wehm-e-Kham-e-Khayal (tracks: Behr-e-Kitab, Bazm-e-Yaad, Khoon-e-Jigar): add `spotifyId`, `durationMs` and per-poem `spotifyTrack` on release.
- Urdu copy review before flipping `publishedLocales`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
