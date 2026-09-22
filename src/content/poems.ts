/**
 * Poem metadata — one entry per ghazal.
 * Verse content lives in MDX files under src/content/kalaam/.
 * Easily extendable: add a new entry + a new .mdx file.
 */

export interface Poem {
  slug: string
  titleEn: string
  titleUr: string
  /** Track number on the corresponding album */
  track: number
  albumId: 'gulab' | 'wehm'
  tags: string[]
  /** First verse snippet (English) for the index card */
  snippetEn: string
  /** First verse snippet (Urdu) for the index card */
  snippetUr: string
}

export const poems: Poem[] = [
  {
    slug: 'ghazal-1',
    titleEn: 'Ghazal I',
    titleUr: 'غزل اول',
    track: 1,
    albumId: 'gulab',
    tags: ['ghazal'],
    snippetEn: 'The garden waits for spring\'s return, yet every rose is tinged with thorn.',
    snippetUr: 'باغ منتظر بہار کی آمد ہے، ہر گل میچھڑکش دکھ سے بھرا۔',
  },
  {
    slug: 'ghazal-2',
    titleEn: 'Ghazal II',
    titleUr: 'غزل دوم',
    track: 2,
    albumId: 'gulab',
    tags: ['ghazal'],
    snippetEn: 'Your name rides the wind through empty streets at dusk.',
    snippetUr: 'تمہارا نام ہوا سے گزرتا ہے شام کے خالی سڑکوں پر۔',
  },
  {
    slug: 'ghazal-3',
    titleEn: 'Ghazal III',
    titleUr: 'غزل سوم',
    track: 3,
    albumId: 'gulab',
    tags: ['ghazal'],
    snippetEn: 'I left my keys by the river — you know where.',
    snippetUr: 'میں نے اپنے کلیدیں دریا کے کنارے چھوڑ دیے — تمہیں پتا ہے۔',
  },
  {
    slug: 'ghazal-4',
    titleEn: 'Ghazal IV',
    titleUr: 'غزل چہارم',
    track: 4,
    albumId: 'wehm',
    tags: ['ghazal'],
    snippetEn: 'We bloom in borrowed light — a temporary constellation.',
    snippetUr: 'ہم اس قراوطی روشنی میں پھلتے ہیں — ایک عارضی صورت کائے۔',
  },
] as const
