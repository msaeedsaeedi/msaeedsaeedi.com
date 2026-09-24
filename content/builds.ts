// Projects shown on /builds and /builds/[slug]. Order here = order on the page.
// `draft: true` shows a "full write-up coming" note on the case study.
import type { L } from '@/i18n/config'

export type BuildKind = 'flagship' | 'research' | 'product' | 'tool'
export type BuildStatus = 'design' | 'research' | 'experimental' | 'building' | 'shipped' | 'paused'

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
  /** Research projects: the question, shown as a pull quote. */
  question?: L
  /** A closing note, e.g. why a project is paused. Shown with a contact button. */
  epilogue?: L
  /** Label for the epilogue's contact button, when the default (“Share an idea”) doesn't fit. */
  epilogueCta?: L
  draft?: boolean
}

export const builds: Build[] = [
  {
    slug: 'vortexme',
    name: 'VortexMe',
    kind: 'flagship',
    status: 'design',
    year: '2026–27',
    role: { en: 'Final-year project, team of three', ur: 'فائنل ایئر پروجیکٹ، تین رکنی ٹیم' },
    oneLiner: {
      en: 'A team of AI marketing agents that a small business runs from WhatsApp.',
      ur: 'اے آئی مارکیٹنگ ایجنٹس کی ایک ٹیم، جسے چھوٹا کاروبار واٹس ایپ سے چلاتا ہے۔',
    },
    problem: {
      en: 'Most small businesses already sell on WhatsApp and Instagram, but marketing them well means juggling ad managers, content calendars and analytics dashboards. The owner doesn’t have the time, and an agency costs more than the budget.',
      ur: 'اکثر چھوٹے کاروبار پہلے ہی واٹس ایپ اور انسٹاگرام پر بیچتے ہیں، مگر اچھی مارکیٹنگ کے لیے اشتہاری مینیجر، مواد کا کیلنڈر اور تجزیاتی ڈیش بورڈ سنبھالنے پڑتے ہیں۔ مالک کے پاس وقت نہیں ہوتا، اور ایجنسی بجٹ سے مہنگی پڑتی ہے۔',
    },
    approach: {
      en: 'The owner messages a marketing assistant on WhatsApp in text, voice or a product photo: “Create a launch campaign for this, budget PKR 30k.” An orchestrator reads the intent and coordinates strategy, creative, media and community agents that share one brand memory. It replies with a short proposal (goal, budget, audience, creatives, platforms), and nothing that spends money or goes public happens until the owner approves.',
      ur: 'مالک واٹس ایپ پر مارکیٹنگ اسسٹنٹ کو لکھ کر، بول کر یا پروڈکٹ کی تصویر بھیج کر کہتا ہے: “اس کی لانچ مہم بنا دو، بجٹ تیس ہزار۔” ایک آرکیسٹریٹر ارادہ سمجھ کر حکمتِ عملی، تخلیق، میڈیا اور کمیونٹی کے ایجنٹس کو ساتھ لے کر چلتا ہے، جو ایک ہی برانڈ یادداشت بانٹتے ہیں۔ جواب میں مختصر تجویز آتی ہے (مقصد، بجٹ، ناظرین، تخلیقات، پلیٹ فارم)، اور جو کام پیسہ خرچ کرے یا عوام تک جائے، وہ مالک کی منظوری کے بغیر نہیں ہوتا۔',
    },
    highlights: [
      { en: 'WhatsApp-first: text, voice notes and product photos in, decisions out', ur: 'واٹس ایپ پہلے: متن، صوتی پیغام اور تصویر اندر، فیصلے باہر' },
      { en: 'Orchestrated agents for strategy, creative, media and community, sharing brand memory', ur: 'حکمتِ عملی، تخلیق، میڈیا اور کمیونٹی کے ایجنٹس، مشترکہ برانڈ یادداشت کے ساتھ' },
      { en: 'Tiered human-in-the-loop approvals: routine work runs, spending and publishing wait for a yes', ur: 'درجہ وار انسانی منظوری: معمول کا کام خود چلے، خرچ اور اشاعت منظوری کا انتظار کریں' },
      { en: 'Two-plane design: the owner’s control number never mixes with customer chats', ur: 'دو الگ راستے: مالک کا کنٹرول نمبر گاہکوں کی گفتگو سے کبھی نہیں ملتا' },
      { en: 'Brand-safe creatives composed through the Figma API', ur: 'فگما API کے ذریعے برانڈ کے مطابق تخلیقات' },
    ],
    stack: ['Python', 'LangGraph', 'WhatsApp Cloud API', 'Meta Graph API', 'WhatsApp Flows', 'Figma API'],
    links: {},
    glyph: 'Vx',
    draft: true,
  },
  {
    slug: 'digital-twin-reconciliation',
    name: 'Freshness-Aware Reconciliation',
    kind: 'research',
    status: 'research',
    year: '2026',
    role: { en: 'Researcher', ur: 'محقق' },
    oneLiner: {
      en: 'When should a digital twin change the infrastructure under it? A study of semantic, freshness-aware reconciliation in edge–cloud systems.',
      ur: 'ڈیجیٹل ٹوئن کو اپنے نیچے کا انفراسٹرکچر کب بدلنا چاہیے؟ ایج اور کلاؤڈ نظاموں میں معنی اور تازگی سے باخبر ری کنسیلی ایشن کا مطالعہ۔',
    },
    question: {
      en: 'Under what workload and network conditions can semantic freshness-aware reconciliation reduce unnecessary infrastructure actions without degrading digital twin freshness?',
      ur: 'کن ورک لوڈ اور نیٹ ورک حالات میں معنی اور تازگی سے باخبر ری کنسیلی ایشن، ڈیجیٹل ٹوئن کی تازگی گھٹائے بغیر، غیر ضروری انفراسٹرکچر اقدامات کم کر سکتی ہے؟',
    },
    problem: {
      en: 'A digital twin mirrors a physical system whose state changes constantly. Infrastructure actions that might follow, like scaling, migrating or reconfiguring, are slow and costly. Reacting to every telemetry event wastes resources; reacting too rarely leaves the twin stale.',
      ur: 'ڈیجیٹل ٹوئن ایک ایسے مادی نظام کا عکس ہے جس کی حالت مسلسل بدلتی رہتی ہے۔ اس کے بعد ہونے والے انفراسٹرکچر اقدامات، جیسے اسکیلنگ، منتقلی یا ترتیبِ نو، سست اور مہنگے ہیں۔ ہر ٹیلی میٹری پر ردِ عمل وسائل ضائع کرتا ہے، اور کم ردِ عمل ٹوئن کو باسی کر دیتا ہے۔',
    },
    approach: {
      en: 'Instead of reacting to every event, the proposed reconciler weighs state freshness, semantic significance, persistence, workload and network conditions, and the cost of acting. It is compared against periodic and naïve event-driven reconciliation, most likely through simulation rather than dedicated hardware.',
      ur: 'ہر واقعے پر ردِ عمل کے بجائے، مجوزہ ری کنسائلر حالت کی تازگی، معنوی اہمیت، تسلسل، ورک لوڈ اور نیٹ ورک کے حالات، اور عمل کی قیمت کو تولتا ہے۔ اس کا موازنہ وقفہ وار اور سادہ واقعہ پر مبنی طریقوں سے کیا جائے گا، غالباً مخصوص ہارڈویئر کے بجائے سیمولیشن کے ذریعے۔',
    },
    highlights: [
      { en: 'Three strategies compared: periodic, naïve event-driven, semantic cost-aware', ur: 'تین طریقوں کا موازنہ: وقفہ وار، سادہ واقعہ پر مبنی، معنی اور قیمت سے باخبر' },
      { en: 'Signals: freshness, semantic significance, persistence, workload, network, cost', ur: 'اشارے: تازگی، معنوی اہمیت، تسلسل، ورک لوڈ، نیٹ ورک، قیمت' },
      { en: 'Goal: fewer unnecessary actions with no loss of twin freshness', ur: 'مقصد: ٹوئن کی تازگی کھوئے بغیر کم غیر ضروری اقدامات' },
    ],
    stack: ['Kubernetes', 'Edge–cloud', 'Digital twins', 'Simulation'],
    links: {
      repo: 'https://github.com/msaeedsaeedi/Semantic-Freshness-Aware-Infrastructure-Reconciliation-for-Digital-Twins-in-Edge-Cloud-Kubernetes',
    },
    glyph: 'Dt',
    draft: true,
  },
  {
    slug: 'prime-innovators',
    name: 'Prime Innovators',
    kind: 'product',
    status: 'paused',
    year: '2025–26',
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
      en: 'A platform where contributors, maintainers, sponsors and recruiters meet around real projects, and every merged contribution becomes verified history. I led a ten-person team across engineering, AI/ML, security, product and operations from research to MVP.',
      ur: 'ایک پلیٹ فارم جہاں کنٹریبیوٹرز، مینٹینرز، اسپانسرز اور بھرتی کرنے والے اصل منصوبوں کے گرد ملیں، اور ہر قبول شدہ حصہ تصدیق شدہ تاریخ بن جائے۔ میں نے انجینئرنگ، اے آئی، سیکیورٹی، پروڈکٹ اور آپریشنز کی دس رکنی ٹیم کو تحقیق سے MVP تک لے کر چلا۔',
    },
    highlights: [
      { en: 'GitHub OAuth onboarding with contributor and maintainer roles', ur: 'گِٹ ہب کے ذریعے آن بورڈنگ، کنٹریبیوٹر اور مینٹینر کے کردار' },
      { en: 'Verified contribution history and project governance', ur: 'تصدیق شدہ کنٹریبیوشن ہسٹری اور منصوبوں کا نظم' },
      { en: 'TypeScript monorepo with shared, contract-driven APIs', ur: 'مشترکہ کنٹریکٹس پر مبنی APIs کے ساتھ TypeScript مونوریپو' },
      { en: 'Designed: impact scoring, skill graphs, transparent sponsorships', ur: 'منصوبہ بندی: اثر کی پیمائش، مہارتوں کا گراف، شفاف اسپانسرشپ' },
    ],
    epilogue: {
      en: 'I paused Prime Innovators in July 2026. The ground moved under the problem: AI made judging developers by their GitHub history far less meaningful, and once agents write code alongside people, you need higher-dimensional signals of ability. That’s the question I’d pick it back up for. If you have ideas, I’d genuinely like to hear them.',
      ur: 'جولائی ۲۰۲۶ میں میں نے پرائم انوویٹرز کو روک دیا۔ مسئلے کی بنیاد ہی بدل گئی: اے آئی کے بعد گِٹ ہب کی تاریخ سے ڈویلپر کو پرکھنا بہت کم معنی رکھتا ہے، اور جب ایجنٹس انسانوں کے ساتھ کوڈ لکھیں تو مہارت ناپنے کے لیے کہیں زیادہ جہتوں والے پیمانے چاہییں۔ اسی سوال کے لیے میں اسے دوبارہ اٹھاؤں گا۔ اگر آپ کے پاس کوئی خیال ہے تو ضرور بتائیے۔',
    },
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Traefik'],
    links: { extra: [{ label: { en: 'Prime Innovators on GitHub', ur: 'گِٹ ہب پر پرائم انوویٹرز' }, href: 'https://github.com/Prime-Innovators' }] },
    glyph: 'Pi',
  },
  {
    slug: 'vocab',
    name: 'Vocab',
    kind: 'research',
    status: 'experimental',
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
      en: 'Vocab is an R&D project that tests one idea: can ambient exposure and well-timed recall teach words without a daily session? It runs as a quiet Windows app. A word first appears on your wallpaper for passive exposure, then returns as a notification that tests recall. A scheduler combining FSRS and Bayesian Knowledge Tracing decides when, and adapts to how you actually engage.',
      ur: 'ووکیب ایک تحقیقی تجربہ ہے جو ایک خیال آزماتا ہے: کیا خاموش سامنا اور بروقت یاد دہانی روزانہ نشست کے بغیر الفاظ سکھا سکتی ہے؟ یہ ونڈوز پر خاموشی سے چلنے والا پروگرام ہے۔ لفظ پہلے وال پیپر پر ظاہر ہوتا ہے، پھر ایک نوٹیفکیشن بن کر لوٹتا ہے جو یادداشت کو آزماتا ہے۔ FSRS اور Bayesian Knowledge Tracing کو ملا کر بنایا گیا شیڈیولر طے کرتا ہے کہ کب، اور آپ کے اصل استعمال کے مطابق ڈھلتا ہے۔',
    },
    highlights: [
      { en: 'Two-phase loop: ambient exposure, then active recall', ur: 'دو مرحلے: پہلے خاموش سامنا، پھر فعال یاد دہانی' },
      { en: 'FSRS + BKT scheduling with adaptive daily pacing', ur: 'FSRS اور BKT پر مبنی شیڈیولنگ، روزانہ رفتار خود بخود' },
      { en: 'Curated word list built in: no downloads, no account', ur: 'منتخب الفاظ پروگرام کے اندر: نہ ڈاؤن لوڈ، نہ اکاؤنٹ' },
      { en: 'Single self-contained binary with a Windows installer', ur: 'ایک خود کفیل پروگرام، ونڈوز انسٹالر کے ساتھ' },
    ],
    stack: ['Go', 'Windows', 'FSRS', 'BKT'],
    links: { repo: 'https://github.com/msaeedsaeedi/vocab' },
    epilogue: {
      en: 'Vocab is experimental. It works, but it exists to answer a question about memory, not to be a finished product yet. If you study learning or spaced repetition, I’d like to compare notes.',
      ur: 'ووکیب ابھی تجرباتی ہے۔ یہ چلتا ہے، مگر اس کا مقصد یادداشت کے بارے میں ایک سوال کا جواب ڈھونڈنا ہے، مکمل پروڈکٹ بننا ابھی نہیں۔ اگر آپ سیکھنے یا وقفہ وار دہرائی پر کام کرتے ہیں تو بات کرنا چاہوں گا۔',
    },
    glyph: 'Vo',
  },
  {
    slug: 'slotty',
    name: 'Slotty',
    kind: 'product',
    status: 'design',
    year: '2026',
    role: { en: 'Designer and engineer', ur: 'ڈیزائنر اور انجینئر' },
    oneLiner: {
      en: 'Demo-slot booking for university courses, designed so two students can never grab the same slot.',
      ur: 'جامعہ کے کورسز کے لیے ڈیمو سلاٹ بکنگ، جس کا خاکہ ایسا ہے کہ دو طلبہ کبھی ایک ہی سلاٹ نہ لے سکیں۔',
    },
    problem: {
      en: 'Assignment demos at FAST-NU ran on spreadsheets and group chats. Slots were double-booked, TAs lost track, and the last-minute rush broke every system anyone tried.',
      ur: 'فاسٹ یونیورسٹی میں اسائنمنٹ ڈیمو اسپریڈشیٹس اور گروپ چیٹس پر چلتے تھے۔ ایک سلاٹ دو بار بک ہو جاتا، ٹی اے حساب کھو بیٹھتے، اور آخری لمحے کا رش ہر نظام توڑ دیتا۔',
    },
    approach: {
      en: 'Separate roles for students, TAs and course leadership. Booking is designed to run inside database transactions with active-booking and capacity checks, so the rush can’t break it. Bulk assignment comes in through CSV.',
      ur: 'طلبہ، ٹی ایز اور کورس انتظامیہ کے الگ کردار۔ خاکے کے مطابق بکنگ ڈیٹا بیس ٹرانزیکشنز کے اندر، موجودہ بکنگ اور گنجائش کی جانچ کے ساتھ ہو گی، اس لیے رش اسے توڑ نہیں سکتا۔ بڑی تعداد میں تفویض CSV سے۔',
    },
    highlights: [
      { en: 'Concurrency-safe booking with transactional capacity checks', ur: 'ٹرانزیکشن پر مبنی گنجائش کی جانچ، ایک ساتھ بکنگ میں بھی محفوظ' },
      { en: 'Role-based flows for students, TAs and leadership', ur: 'طلبہ، ٹی ایز اور انتظامیہ کے لیے الگ راستے' },
      { en: 'CSV bulk assignment for whole sections at once', ur: 'پورے سیکشن کی ایک ساتھ تفویض، CSV کے ذریعے' },
    ],
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis'],
    links: { repo: 'https://github.com/msaeedsaeedi/Slotty' },
    epilogue: {
      en: 'Slotty is in design, and I’m looking for contributors. If you write code, design interfaces, or have run demo slots as a TA and know where it hurts, there’s room for you.',
      ur: 'سلاٹی ابھی خاکے کے مرحلے میں ہے، اور مجھے ساتھ کام کرنے والوں کی تلاش ہے۔ اگر آپ کوڈ لکھتے ہیں، انٹرفیس ڈیزائن کرتے ہیں، یا بطور ٹی اے ڈیمو سلاٹس سنبھال چکے ہیں اور جانتے ہیں کہ مشکل کہاں ہے، تو آپ کے لیے جگہ ہے۔',
    },
    epilogueCta: { en: 'Join as a contributor', ur: 'ساتھ شامل ہوئیے' },
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
