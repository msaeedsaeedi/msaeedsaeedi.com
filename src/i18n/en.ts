// UI copy for English. `ur.ts` must mirror this shape exactly (enforced by the Dictionary type).
// Keep copy short. Content (projects, jobs, poems) lives in /content, not here.

const en = {
  meta: {
    siteTitle: 'Mohammad Saeed',
    tagline: 'Product builder and Urdu poet',
    description:
      'Mohammad Saeed Saeedi is a software engineer in Islamabad who builds products and AI systems, and an Urdu poet who writes ghazals as Saeedi (سعیدی). Projects, career, poetry and music in one place.',
  },
  // Search-facing titles and descriptions. Written for someone who hasn't met the site yet:
  // say what the page is and whose it is. The layout appends " | Mohammad Saeed" to titles.
  seo: {
    homeTitle: 'Mohammad Saeed Saeedi: Software Engineer and Urdu Poet',
    builds: {
      title: 'Projects, Tools and Research',
      description:
        'Projects by Mohammad Saeed: VortexMe, a WhatsApp-first team of AI marketing agents; research on digital-twin infrastructure reconciliation; Prime Innovators; and open-source developer tools in Go and Rust.',
    },
    journey: {
      title: 'Experience, Skills and Education',
      description:
        'The career of Mohammad Saeed, full-stack software engineer in Islamabad: CMOonTheGO, founder of Prime Innovators, Fastrack, and BS Computer Science at FAST-NU. TypeScript, React, Next.js, NestJS, Go, Rust and AWS.',
    },
    kalaam: {
      title: 'Kalaam: Urdu Ghazals by Saeedi',
      description:
        'Urdu ghazals by Saeedi (سعیدی), the pen name of Mohammad Saeed Saeedi. Every ghazal in full, each on its own page, including the lyrics of the albums Gulab-e-Suman and Wehm-e-Kham-e-Khayal.',
    },
    albums: {
      title: 'Albums: Gulab-e-Suman and Wehm-e-Kham-e-Khayal',
      description:
        'Gulab-e-Suman, an album of nine Urdu ghazals written by Saeedi and set to music, and Wehm-e-Kham-e-Khayal, the album that comes next. Listen on Spotify and read the lyrics.',
    },
    self: {
      title: 'About',
      description:
        'Mohammad Saeed, born in Gujrat in 2005 and based in Islamabad: a computer science student at FAST-NU, a software engineer, and an Urdu poet who writes as Saeedi.',
    },
    contact: {
      title: 'Contact',
      description: 'How to reach Mohammad Saeed (Saeedi): email, GitHub, LinkedIn, Spotify, Instagram and YouTube.',
    },
    poemTitle: (roman: string, urdu: string) => `${roman} (${urdu}), Urdu Ghazal by Saeedi`,
    poemDescription: (matla: string, roman: string) => `${matla}. “${roman}”, an Urdu ghazal by Saeedi (Mohammad Saeed Saeedi), in full.`,
    ghazal: 'Urdu ghazal',
  },
  nav: {
    home: 'Home',
    builds: 'Builds',
    journey: 'Journey',
    kalaam: 'Kalaam',
    albums: 'Albums',
    self: 'Self',
    contact: 'Say salaam',
    hints: {
      builds: 'Products, tools and research',
      journey: 'Career and craft',
      kalaam: 'Ghazals, one per page',
      albums: 'Gulab-e-Suman and what comes next',
      self: 'The person off the clock',
      contact: 'Email and socials',
    },
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
  },
  controls: {
    theme: 'Switch theme',
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
    language: 'پڑھیے اردو میں',
    languageShort: 'اردو',
  },
  home: {
    lede: 'I build products and write Urdu ghazals. Both begin as a thought that refuses to leave.',
    ctaBuilds: 'See what I’m building',
    ctaKalaam: 'Read the kalaam',
    inkHint: 'Move through the empty space. It writes.',
    inkOn: 'Ink on',
    inkOff: 'Ink off',
    nowTitle: 'Right now',
    nowUpdated: 'Updated September 2026',
    now: [
      { label: 'Designing', title: 'VortexMe', body: 'A team of AI marketing agents that small businesses run from WhatsApp.', to: 'builds/vortexme' },
      { label: 'Researching', title: 'Digital twins', body: 'When should a twin change the infrastructure under it, and when should it wait?', to: 'builds/digital-twin-reconciliation' },
      { label: 'Up next', title: 'Wehm-e-Kham-e-Khayal', body: 'My second album: three ghazals, in production now.', to: 'albums' },
      { label: 'Learning', title: 'Cloud and agentic AI', body: 'Preparing for AWS Cloud Practitioner, then Solutions Architect.', to: 'journey' },
      { label: 'Working at', title: 'CMOonTheGO', body: 'Shipping marketing and customer-engagement features, end to end.', to: 'journey' },
    ],
    worldsTitle: 'Five rooms, one person',
    worlds: {
      builds: 'A marketing team of AI agents, a research question about digital twins, and the small tools I built for myself.',
      journey: 'From an Angular internship at sixteen to founding a company and leading a team of ten.',
      kalaam: 'Ghazals written as Saeedi, each on its own page, every sher ready to copy and share.',
      albums: 'Gulab-e-Suman, nine of my ghazals set to music, and a second album on the way.',
      self: 'What I believe, what I dream about, and who I am when the laptop closes.',
    },
    worldFacts: {
      builds: (n: number, shipped: number) => `${n} builds, ${shipped} shipped`,
      journey: (since: string, roles: number) => `Since ${since}, ${roles} roles`,
      kalaam: (n: number, sung: number) => `${n} ghazals, ${sung} set to music`,
      albums: (released: number, upcoming: number) => `${released} released, ${upcoming} in production`,
      self: 'Islamabad, pen name Saeedi',
    },
    flagshipTitle: 'The flagship',
    flagshipCta: 'Read the case study',
    sherTitle: 'A sher',
    sherNext: 'Another sher',
    sherRead: 'Read the full ghazal',
    closingTitle: 'Have a thought that won’t leave you alone?',
    closingBody: 'Bring it. I like building those.',
    closingCta: 'Write to me',
  },
  builds: {
    title: 'Builds',
    intro: 'Things I’ve shipped, things still in the lab, and the one I’m betting my final year on.',
    filters: { all: 'All', flagship: 'Flagship', research: 'Research', product: 'Products', tool: 'Tools' },
    status: {
      design: 'In design',
      research: 'In research',
      building: 'Building',
      experimental: 'Experimental',
      shipped: 'Shipped',
      paused: 'Paused',
    },
    kind: { flagship: 'Flagship', research: 'Research', product: 'Product', tool: 'Tool' },
    role: 'Role',
    year: 'Year',
    stack: 'Stack',
    problem: 'The problem',
    approach: 'The approach',
    highlights: 'Inside',
    question: 'Research question',
    epilogue: 'Where it stands',
    epilogueCta: 'Share an idea',
    links: 'Links',
    source: 'Source code',
    visit: 'Visit',
    moreSoon: 'This is work in progress. The full write-up lands when the work does. Ask me about it in the meantime.',
    alsoTitle: 'Also on GitHub',
    alsoBody: 'Smaller experiments, templates and university work.',
    profile: 'Open my GitHub',
    back: 'All builds',
    next: 'Next build',
  },
  journey: {
    title: 'Journey',
    intro: 'Six years of building, from an Angular internship at sixteen to founding Prime Innovators.',
    experience: 'Experience',
    present: 'Present',
    domainsTitle: 'What I bring to a team',
    toolboxTitle: 'Toolbox',
    educationTitle: 'Education',
    leadershipTitle: 'Leadership',
    learningTitle: 'Currently learning',
    cv: 'Download CV',
    cvRequest: 'Ask for my CV',
  },
  kalaam: {
    title: 'Kalaam',
    intro: 'Ghazals written under the pen name Saeedi. Twelve of them have been set to music, across two albums.',
    poetTitle: 'About the poet',
    search: 'Search a word or a line',
    searchLabel: 'Search the ghazals',
    all: 'All',
    sung: 'Set to music',
    count: (n: number) => `${n} ghazal${n === 1 ? '' : 's'}`,
    shers: (n: number) => `${n} shers`,
    empty: 'No ghazal has that word. Try a shorter one, or clear the search.',
    clear: 'Clear search',
    track: (n: number, album: string) => `Track ${n}, ${album}`,
    listen: 'Listen on Spotify',
    loadPlayer: 'Load the player',
    playerNote: 'Loads Spotify’s player, which sets its own cookies.',
    copy: 'Copy sher',
    copied: 'Copied',
    share: 'Share',
    linkCopied: 'Link copied',
    back: 'All kalaam',
    prev: 'Previous',
    next: 'Next',
    ghazal: 'Ghazal',
    selectedTitle: 'Selected ashaar',
  },
  albums: {
    title: 'Albums',
    intro: 'My ghazals, composed and produced as songs.',
    debut: 'Debut album',
    tracks: (n: number) => `${n} tracks`,
    minutes: (n: number) => `${n} minutes`,
    listen: 'Listen on Spotify',
    upcoming: 'Next album',
    upcomingBody: 'Three ghazals, in production now.',
    upcomingStatus: 'In production',
    readPoem: 'Read',
    play: 'Play',
    titleGhazal: 'Read the ghazal the album is named after',
    tracklist: 'Tracklist',
    notify: 'Follow on Spotify to hear it first',
    albumAbout:
      'Nine ghazals about longing, restraint, and what a rose means after it leaves the branch.',
  },
  self: {
    title: 'Self',
    intro: 'Off the résumé.',
    bio: [
      'I was born in Gujrat in 2005 and live in Islamabad. I’m in my final year of computer science at FAST-NU, building VortexMe with my team, and writing ghazals in the margins of all of it.',
      'People ask how an engineer ends up a poet. I think it’s the same habit: take something shapeless, and keep working until it holds.',
    ],
    thinkTitle: 'What I believe',
    think: [
      { title: 'Systems should know when to act.', body: 'A digital twin changes every second; infrastructure changes are expensive. My research asks which changes are worth acting on.' },
      { title: 'Automation should ask before it spends.', body: 'VortexMe’s one rule: no money is spent and nothing goes public without the owner’s approval.' },
      { title: 'Reputation should be earned in public.', body: 'Prime Innovators tried to measure developers by their real work. Agents moved the goalposts, and the question is still open.' },
      { title: 'A sher is the smallest complete system I know.', body: 'Two lines, strict metre, one idea, no wasted parts. I build software the same way.' },
    ],
    dreamTitle: 'What I dream about',
    dreams: [
      'A Pakistani developer ecosystem where proof of work beats a polished CV.',
      'Tools quiet enough that you forget they’re there.',
      'Urdu that feels at home on the internet, not translated onto it.',
    ],
    offTitle: 'Off the clock',
    off: [
      { title: 'Writing', body: 'Ghazals mostly, usually late at night.' },
      { title: 'Learning', body: 'Cloud computing and agentic AI, with two AWS certifications on the way.' },
      { title: 'Reading', body: 'The classical Urdu poets, and whatever the last one made me curious about.' },
      { title: 'Tinkering', body: 'Terminals, Neovim, and tools nobody asked me to build.' },
    ],
    factsTitle: 'Quick facts',
    facts: [
      { k: 'Based in', v: 'Islamabad, Pakistan' },
      { k: 'Pen name', v: 'Saeedi' },
      { k: 'Languages', v: 'English, Urdu' },
      { k: 'Studying', v: 'BS Computer Science, FAST-NU' },
    ],
  },
  contact: {
    title: 'Say salaam',
    intro: 'Email is the fastest way to reach me. I read everything and reply to most.',
    copy: 'Copy email',
    copied: 'Email copied',
    write: 'Write an email',
    reasonsTitle: 'Good reasons to write',
    reasons: [
      'You’re hiring, or building something and need a builder.',
      'You have ideas on measuring developer ability now that agents write code too.',
      'Poetry, music, or an invitation to a mushaira.',
      'You just want to say hello.',
    ],
    elsewhere: 'Elsewhere',
    localTime: 'My local time',
    timezone: 'Islamabad, UTC+5',
  },
  footer: {
    line: 'Written in Islamabad, between commits and couplets.',
    top: 'Back to top',
    rights: 'All poems © Mohammad Saeed Saeedi. Please credit when you share.',
  },
  notFound: {
    title: 'This page doesn’t exist',
    body: 'The link may be old, or the address has a typo.',
    home: 'Go to the home page',
    kalaam: 'Read a ghazal instead',
  },
}

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> }

export type Dictionary = Widen<typeof en>
export default en as Dictionary
