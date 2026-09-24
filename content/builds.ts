// Projects shown on /builds and /builds/[slug]. Order here = order on the page.
// `draft: true` shows a "full write-up coming" note on the case study.
import type { L } from '@/i18n/config'

export type BuildKind = 'flagship' | 'product' | 'tool'
export type BuildStatus = 'research' | 'building' | 'shipped'

export type Build = {
  slug: string
  name: string
  kind: BuildKind
  status: BuildStatus
  year: string
  role: L
  oneLiner: L
  problem: L
  approach: L
  highlights: L[]
  stack: string[]
  links: { repo?: string; site?: string; extra?: { label: L; href: string }[] }
  /** Two short strings used by the generated cover graphic. */
  glyph: string
  draft?: boolean
}

export const builds: Build[] = [
  {
    slug: 'vortexme',
    name: 'VortexMe',
    kind: 'flagship',
    status: 'research',
    year: '2026–27',
    role: { en: 'Final-year project, lead', ur: 'فائنل ایئر پروجیکٹ، سربراہ' },
    oneLiner: {
      en: 'Semantic, freshness-aware reconciliation for digital twins running across edge and cloud Kubernetes.',
      ur: 'ایج اور کلاؤڈ پر چلنے والے Kubernetes میں ڈیجیٹل ٹوئنز کے لیے معنی اور تازگی سے باخبر ری کنسیلی ایشن۔',
    },
    problem: {
      en: 'A digital twin is only as good as its latest reading. Kubernetes reconciles toward declared state, but it has no idea whether the data behind that state is still fresh, or what that data means. At the edge, where links drop and sensors lag, that blind spot turns into wrong decisions made with confidence.',
      ur: 'ڈیجیٹل ٹوئن اتنا ہی سچا ہے جتنی اس کی تازہ ترین ریڈنگ۔ Kubernetes طے شدہ حالت کی طرف لوٹتا رہتا ہے، مگر اسے خبر نہیں کہ اس حالت کے پیچھے کا ڈیٹا ابھی تازہ ہے یا نہیں، اور اس کا مطلب کیا ہے۔ ایج پر، جہاں رابطے ٹوٹتے اور سینسر پیچھے رہ جاتے ہیں، یہی اندھا پن پورے اعتماد سے غلط فیصلوں میں بدل جاتا ہے۔',
    },
    approach: {
      en: 'VortexMe teaches the reconciler to reason about meaning and freshness. Each piece of twin state carries its semantics and an age budget, and the control loop weighs both before acting: reconcile now, wait for newer data, or fall back safely.',
      ur: 'ووَرٹیکس می ری کنسائلر کو معنی اور تازگی کے بارے میں سوچنا سکھاتا ہے۔ ٹوئن کی ہر حالت اپنا مفہوم اور عمر کی حد ساتھ رکھتی ہے، اور کنٹرول لوپ عمل سے پہلے دونوں کو تولتا ہے: ابھی درست کرے، تازہ ڈیٹا کا انتظار کرے، یا محفوظ راستہ اپنائے۔',
    },
    highlights: [
      { en: 'Semantic model of twin state, not just desired vs. actual', ur: 'ٹوئن کی حالت کا بامعنی ماڈل، محض مطلوب اور موجود کا فرق نہیں' },
      { en: 'Freshness budgets that shape when the control loop acts', ur: 'تازگی کی حدیں جو طے کرتی ہیں کہ کنٹرول لوپ کب حرکت کرے' },
      { en: 'Designed for unreliable edge links and partial connectivity', ur: 'کمزور ایج رابطوں اور ادھوری کنیکٹیویٹی کے لیے بنایا گیا' },
    ],
    stack: ['Kubernetes', 'Edge–cloud', 'Digital twins', 'Control loops'],
    links: {
      repo: 'https://github.com/msaeedsaeedi/Semantic-Freshness-Aware-Infrastructure-Reconciliation-for-Digital-Twins-in-Edge-Cloud-Kubernetes',
    },
    glyph: 'Vx',
    draft: true,
  },
  {
    slug: 'prime-innovators',
    name: 'Prime Innovators',
    kind: 'flagship',
    status: 'building',
    year: '2025–',
    role: { en: 'Founder and CEO', ur: 'بانی اور سی ای او' },
    oneLiner: {
      en: 'An open-source talent ecosystem for Pakistan, where developers earn reputation through real contributions.',
      ur: 'پاکستان کے لیے اوپن سورس ٹیلنٹ کا ماحول، جہاں ڈویلپر اصل کام سے اپنی ساکھ بناتے ہیں۔',
    },
    problem: {
      en: 'Talented developers in Pakistan are judged by résumés that anyone can write. Recruiters can’t verify skill, and contributors have no public record of the work they’ve actually done.',
      ur: 'پاکستان کے باصلاحیت ڈویلپرز کو ایسی سی ویز سے پرکھا جاتا ہے جو کوئی بھی لکھ سکتا ہے۔ بھرتی کرنے والے مہارت کی تصدیق نہیں کر پاتے، اور کام کرنے والوں کے پاس اپنے اصل کام کا کوئی عوامی ریکارڈ نہیں ہوتا۔',
    },
    approach: {
      en: 'A platform where contributors, maintainers, sponsors and recruiters meet around real projects. Every merged contribution becomes verified history. I lead a ten-person team across engineering, AI/ML, security, product and operations.',
      ur: 'ایک پلیٹ فارم جہاں کنٹریبیوٹرز، مینٹینرز، اسپانسرز اور بھرتی کرنے والے اصل منصوبوں کے گرد ملتے ہیں۔ ہر قبول شدہ حصہ تصدیق شدہ تاریخ بن جاتا ہے۔ میں انجینئرنگ، اے آئی، سیکیورٹی، پروڈکٹ اور آپریشنز پر مشتمل دس افراد کی ٹیم کی قیادت کرتا ہوں۔',
    },
    highlights: [
      { en: 'GitHub OAuth onboarding with contributor and maintainer roles', ur: 'گِٹ ہب کے ذریعے آن بورڈنگ، کنٹریبیوٹر اور مینٹینر کے کردار' },
      { en: 'Verified contribution history and project governance', ur: 'تصدیق شدہ کنٹریبیوشن ہسٹری اور منصوبوں کا نظم' },
      { en: 'TypeScript monorepo with shared, contract-driven APIs', ur: 'مشترکہ کنٹریکٹس پر مبنی APIs کے ساتھ TypeScript مونوریپو' },
      { en: 'Planned: AI impact scoring, skill graphs, transparent sponsorships', ur: 'آئندہ: اے آئی سے اثر کی پیمائش، مہارتوں کا گراف، شفاف اسپانسرشپ' },
    ],
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Traefik'],
    links: { site: 'https://github.com/Prime-Innovators' },
    glyph: 'Pi',
  },
  {
    slug: 'vocab',
    name: 'Vocab + Lexicon',
    kind: 'product',
    status: 'shipped',
    year: '2026',
    role: { en: 'Creator', ur: 'خالق' },
    oneLiner: {
      en: 'Learn vocabulary from your desktop wallpaper, then prove you remember it.',
      ur: 'اپنے ڈیسک ٹاپ وال پیپر سے نئے الفاظ سیکھیے، پھر ثابت کیجیے کہ یاد رہے۔',
    },
    problem: {
      en: 'Vocabulary apps demand a daily session, and most people stop opening them within a week. The words never get the repeated, low-effort exposure that memory actually needs.',
      ur: 'الفاظ سکھانے والی ایپس روزانہ وقت مانگتی ہیں، اور اکثر لوگ ایک ہفتے میں انہیں کھولنا چھوڑ دیتے ہیں۔ الفاظ کو وہ بار بار، بے محنت سامنا نہیں ملتا جس کی یادداشت کو ضرورت ہے۔',
    },
    approach: {
      en: 'Vocab is a quiet Windows daemon. A word first appears on your wallpaper for passive exposure, then returns as a notification that tests recall. A scheduler combining FSRS and Bayesian Knowledge Tracing decides when. Lexicon is the versioned data pipeline behind it.',
      ur: 'ووکیب ونڈوز پر خاموشی سے چلنے والا پروگرام ہے۔ لفظ پہلے وال پیپر پر ظاہر ہوتا ہے، پھر ایک نوٹیفکیشن بن کر لوٹتا ہے جو یادداشت کو آزماتا ہے۔ FSRS اور Bayesian Knowledge Tracing کو ملا کر بنایا گیا شیڈیولر طے کرتا ہے کہ کب۔ لیکسیکن اس کے پیچھے ڈیٹا کی پائپ لائن ہے۔',
    },
    highlights: [
      { en: 'Two-phase loop: ambient exposure, then active recall', ur: 'دو مرحلے: پہلے خاموش سامنا، پھر فعال یاد دہانی' },
      { en: 'FSRS + BKT scheduling with adaptive daily pacing', ur: 'FSRS اور BKT پر مبنی شیڈیولنگ، روزانہ رفتار خود بخود' },
      { en: 'Deterministic, checksummed language datasets from Open English WordNet', ur: 'اوپن انگلش ورڈ نیٹ سے تصدیق شدہ، ورژن والے لسانی ڈیٹا سیٹس' },
      { en: 'Single self-contained binary with a Windows installer', ur: 'ایک خود کفیل پروگرام، ونڈوز انسٹالر کے ساتھ' },
    ],
    stack: ['Go', 'Windows APIs', 'FSRS', 'Python', 'SQLite'],
    links: {
      repo: 'https://github.com/msaeedsaeedi/vocab',
      extra: [{ label: { en: 'Lexicon pipeline', ur: 'لیکسیکن پائپ لائن' }, href: 'https://github.com/msaeedsaeedi/lexicon' }],
    },
    glyph: 'Vo',
  },
  {
    slug: 'slotty',
    name: 'Slotty',
    kind: 'product',
    status: 'building',
    year: '2026',
    role: { en: 'Designer and engineer', ur: 'ڈیزائنر اور انجینئر' },
    oneLiner: {
      en: 'Demo-slot booking for university courses, built so two students can never grab the same slot.',
      ur: 'جامعہ کے کورسز کے لیے ڈیمو سلاٹ بکنگ، ایسی کہ دو طلبہ کبھی ایک ہی سلاٹ نہ لے سکیں۔',
    },
    problem: {
      en: 'Assignment demos at FAST-NU ran on spreadsheets and group chats. Slots were double-booked, TAs lost track, and the last-minute rush broke every system anyone tried.',
      ur: 'فاسٹ یونیورسٹی میں اسائنمنٹ ڈیمو اسپریڈشیٹس اور گروپ چیٹس پر چلتے تھے۔ ایک سلاٹ دو بار بک ہو جاتا، ٹی اے حساب کھو بیٹھتے، اور آخری لمحے کا رش ہر نظام توڑ دیتا۔',
    },
    approach: {
      en: 'Separate roles for students, TAs and course leadership. Booking runs inside database transactions with active-booking and capacity checks, so the rush can’t break it. Bulk assignment comes in through CSV.',
      ur: 'طلبہ، ٹی ایز اور کورس انتظامیہ کے الگ کردار۔ بکنگ ڈیٹا بیس ٹرانزیکشنز کے اندر، موجودہ بکنگ اور گنجائش کی جانچ کے ساتھ ہوتی ہے، اس لیے رش اسے توڑ نہیں سکتا۔ بڑی تعداد میں تفویض CSV سے۔',
    },
    highlights: [
      { en: 'Concurrency-safe booking with transactional capacity checks', ur: 'ٹرانزیکشن پر مبنی گنجائش کی جانچ، ایک ساتھ بکنگ میں بھی محفوظ' },
      { en: 'Role-based flows for students, TAs and leadership', ur: 'طلبہ، ٹی ایز اور انتظامیہ کے لیے الگ راستے' },
      { en: 'CSV bulk assignment for whole sections at once', ur: 'پورے سیکشن کی ایک ساتھ تفویض، CSV کے ذریعے' },
    ],
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis'],
    links: { repo: 'https://github.com/msaeedsaeedi/Slotty' },
    glyph: 'Sl',
  },
  {
    slug: 'clean-repo',
    name: 'clean-repo',
    kind: 'tool',
    status: 'shipped',
    year: '2025',
    role: { en: 'Author and maintainer', ur: 'مصنف اور نگران' },
    oneLiner: {
      en: 'Delete everything your .gitignore ignores, safely. Installable with apt.',
      ur: 'جو کچھ ‎.gitignore‎ نظر انداز کرتا ہے، اسے محفوظ طریقے سے مٹائیے۔ apt سے انسٹال کیجیے۔',
    },
    problem: {
      en: 'Build output, caches and generated files pile up in every repository. Cleaning them by hand is slow, and `git clean` is easy to get dangerously wrong.',
      ur: 'بلڈ آؤٹ پٹ، کیش اور خودکار فائلیں ہر ریپوزیٹری میں جمع ہوتی رہتی ہیں۔ انہیں ہاتھ سے صاف کرنا سست ہے، اور `git clean` میں خطرناک غلطی آسان ہے۔',
    },
    approach: {
      en: 'A small Rust CLI that reads your .gitignore and removes exactly what it matches. Dry-run is the default, exclusions are explicit, and it ships through a signed APT repository I host at repo.msaeedsaeedi.com.',
      ur: 'Rust میں لکھا ایک چھوٹا سا کمانڈ لائن ٹول جو ‎.gitignore‎ پڑھ کر صرف وہی ہٹاتا ہے جو اس سے میل کھائے۔ پہلے صرف دکھاتا ہے، مٹاتا بعد میں ہے، اور repo.msaeedsaeedi.com پر میری اپنی دستخط شدہ APT ریپوزیٹری سے ملتا ہے۔',
    },
    highlights: [
      { en: 'Safe dry-run by default', ur: 'پہلے سے طے شدہ طور پر محفوظ آزمائشی موڈ' },
      { en: 'Signed APT repository and man page', ur: 'دستخط شدہ APT ریپوزیٹری اور مکمل دستاویز' },
      { en: 'Pattern exclusions, verbose and quiet modes', ur: 'استثنا کے پیٹرن، تفصیلی اور خاموش موڈ' },
    ],
    stack: ['Rust', 'APT', 'Debian packaging'],
    links: { repo: 'https://github.com/msaeedsaeedi/clean-repo' },
    glyph: 'cr',
  },
  {
    slug: 'again',
    name: 'again',
    kind: 'tool',
    status: 'shipped',
    year: '2025',
    role: { en: 'Author', ur: 'مصنف' },
    oneLiner: {
      en: 'Run a command again and again, and watch every run in a live terminal UI.',
      ur: 'ایک کمانڈ بار بار چلائیے، اور ہر بار کا نتیجہ ٹرمینل میں براہِ راست دیکھیے۔',
    },
    problem: {
      en: 'Flaky tests only fail one run in twenty. Catching them, or benchmarking a script, means clumsy shell loops and scrolling through walls of output.',
      ur: 'غیر مستحکم ٹیسٹ بیس میں سے ایک بار ناکام ہوتے ہیں۔ انہیں پکڑنے یا کسی اسکرپٹ کی رفتار ناپنے کے لیے بھدے شیل لوپس اور لمبے آؤٹ پٹ میں بھٹکنا پڑتا ہے۔',
    },
    approach: {
      en: 'A Go CLI with an interactive Bubble Tea dashboard: live output, history you can step through, and JSON or raw modes for CI. Output size is capped so a runaway command can’t eat your memory.',
      ur: 'Go میں لکھا ٹول، Bubble Tea کے انٹرایکٹو ڈیش بورڈ کے ساتھ: براہِ راست آؤٹ پٹ، ہر رن کی تاریخ، اور CI کے لیے JSON یا سادہ موڈ۔ آؤٹ پٹ کی حد مقرر ہے تاکہ بے قابو کمانڈ میموری نہ کھا جائے۔',
    },
    highlights: [
      { en: 'Interactive TUI with run history', ur: 'رنز کی تاریخ کے ساتھ انٹرایکٹو ٹرمینل انٹرفیس' },
      { en: 'JSON output for CI pipelines', ur: 'CI پائپ لائنز کے لیے JSON آؤٹ پٹ' },
      { en: 'Linux, macOS and Windows', ur: 'لینکس، میک اور ونڈوز' },
    ],
    stack: ['Go', 'Bubble Tea', 'TUI'],
    links: { repo: 'https://github.com/msaeedsaeedi/again' },
    glyph: 'ag',
  },
]

export const alsoOnGithub: { name: string; note: L; href: string }[] = [
  { name: 'ArchBoard', note: { en: 'Collaborative architecture diagrams', ur: 'مل کر آرکیٹیکچر ڈایاگرام بنانا' }, href: 'https://github.com/msaeedsaeedi/ArchBoard' },
  { name: 'MEAN FullStack Template', note: { en: 'NestJS + Angular SSR monorepo', ur: 'NestJS اور Angular SSR مونوریپو' }, href: 'https://github.com/msaeedsaeedi/MEAN-FullStack-Template' },
  { name: 'H2DE', note: { en: 'A 2D game engine in C++', ur: 'C++ میں دو جہتی گیم انجن' }, href: 'https://github.com/msaeedsaeedi/H2DE' },
  { name: 'Smart TA', note: { en: 'Auto-grading for C/C++ assignments', ur: 'C/C++ اسائنمنٹس کی خودکار جانچ' }, href: 'https://github.com/msaeedsaeedi/Smart-TA' },
  { name: 'devcontainers', note: { en: 'Dev container configs for many stacks', ur: 'مختلف اسٹیکس کے لیے ڈیو کنٹینر' }, href: 'https://github.com/msaeedsaeedi/devcontainers' },
]

export function getBuild(slug: string) {
  return builds.find((b) => b.slug === slug)
}
