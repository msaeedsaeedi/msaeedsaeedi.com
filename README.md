# msaeedsaeedi.com

The official website of **Mohammad Saeed**: product builder, engineer, and Urdu poet (سعیدی).

- Five sections: **Builds** (projects and case studies), **Journey** (career), **Kalaam** (every ghazal, one page each), **Albums**, **Self** (about), plus Contact.
- English and Urdu, each written for its own readers, with full RTL support and Nastaliq typography.
- Light and dark themes with a circular reveal when you switch. Cursor-reactive calligraphy in the hero.
- Next.js 16, statically generated, exported as a static site and served from Cloudflare Workers Static Assets.

```bash
bun install
bun run dev        # http://localhost:3000
bun run preview    # static build served locally by wrangler, like production
bun run deploy     # ship to Cloudflare
```

See [CLAUDE.md](CLAUDE.md) for the project map and how to add poems, projects and albums.

All poems © Mohammad Saeed Saeedi.
