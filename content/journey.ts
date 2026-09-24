// Career data for /journey. Source: archive/Mohammad Saeed CV (June 2026).pdf
import type { L } from '@/i18n/config'

export type Role = {
  org: string
  orgUr?: string
  title: L
  start: string // YYYY-MM
  end: string | null // null = present
  place: L
  summary: L
  domain: 'engineering' | 'product' | 'design' | 'leadership'
}

export const roles: Role[] = [
  {
    org: 'CMOonTheGO',
    title: { en: 'Full-stack engineer', ur: 'فل اسٹیک انجینئر' },
    start: '2026-01',
    end: null,
    place: { en: 'Islamabad', ur: 'اسلام آباد' },
    summary: {
      en: 'Building marketing and customer-engagement features end to end: React screens, REST APIs, SQL-backed logic, and the release process around them.',
      ur: 'مارکیٹنگ اور کسٹمر انگیجمنٹ کے فیچرز شروع سے آخر تک: React اسکرینز، REST APIs، SQL پر مبنی منطق، اور ان کی ریلیز کا پورا عمل۔',
    },
    domain: 'engineering',
  },
  {
    org: 'Prime Innovators',
    orgUr: 'پرائم انوویٹرز',
    title: { en: 'Founder and CEO', ur: 'بانی اور سی ای او' },
    start: '2025-11',
    end: null,
    place: { en: 'Islamabad', ur: 'اسلام آباد' },
    summary: {
      en: 'Founded an open-source talent ecosystem for Pakistan. Lead a ten-person team and architected the platform from research to MVP.',
      ur: 'پاکستان کے لیے اوپن سورس ٹیلنٹ کا ماحول قائم کیا۔ دس افراد کی ٹیم کی قیادت، اور تحقیق سے MVP تک پلیٹ فارم کا پورا ڈھانچہ۔',
    },
    domain: 'leadership',
  },
  {
    org: 'Fastrack',
    orgUr: 'فاسٹ ٹریک',
    title: { en: 'Software engineer', ur: 'سافٹ ویئر انجینئر' },
    start: '2025-03',
    end: '2025-10',
    place: { en: 'Islamabad', ur: 'اسلام آباد' },
    summary: {
      en: 'Built an AI hiring platform that automates sourcing, shortlisting, outreach and scheduling. Owned dashboards, Docker deploys on Cloudflare, and CI/CD.',
      ur: 'اے آئی پر مبنی بھرتی کا پلیٹ فارم جو امیدواروں کی تلاش، چھانٹی، رابطہ اور انٹرویو کا شیڈول خودکار بناتا ہے۔ ڈیش بورڈز، کلاؤڈ فلیئر پر Docker ڈیپلائمنٹ اور CI/CD میری ذمہ داری تھے۔',
    },
    domain: 'engineering',
  },
  {
    org: 'Genesys Research Lab',
    title: { en: 'UI/UX intern', ur: 'یو آئی / یو ایکس انٹرن' },
    start: '2024-07',
    end: '2024-08',
    place: { en: 'Islamabad', ur: 'اسلام آباد' },
    summary: {
      en: 'Designed mobile-first screens, wireframes and prototypes in Figma, and checked them against what engineers could build.',
      ur: 'فگما میں موبائل کے لیے اسکرینز، وائر فریمز اور پروٹوٹائپس ڈیزائن کیے، اور انجینئرز کے ساتھ ان کی عملی جانچ کی۔',
    },
    domain: 'design',
  },
  {
    org: 'Elements Interactive',
    title: { en: 'UI designer intern', ur: 'یو آئی ڈیزائنر انٹرن' },
    start: '2024-02',
    end: '2024-06',
    place: { en: 'Remote', ur: 'ریموٹ' },
    summary: {
      en: 'Learned product design the practical way: layout systems, UI patterns, and working inside a design team.',
      ur: 'پروڈکٹ ڈیزائن عملی طور پر سیکھا: لے آؤٹ سسٹمز، یو آئی پیٹرنز، اور ڈیزائن ٹیم کے اندر کام۔',
    },
    domain: 'design',
  },
  {
    org: 'Fast Developers Club',
    title: { en: 'Senior web developer, then web development lead', ur: 'سینئر ویب ڈویلپر، پھر ویب ڈویلپمنٹ لیڈ' },
    start: '2023-11',
    end: '2024-08',
    place: { en: 'Islamabad', ur: 'اسلام آباد' },
    summary: {
      en: 'First engineer on the Fastrack MVP. Built the Angular frontend, then was promoted to lead: mentoring, code review, and architecture.',
      ur: 'فاسٹ ٹریک کے MVP پر پہلا انجینئر۔ Angular فرنٹ اینڈ بنایا، پھر ترقی پا کر لیڈ بنا: رہنمائی، کوڈ ریویو اور آرکیٹیکچر۔',
    },
    domain: 'leadership',
  },
  {
    org: 'LitGrey Technologies',
    title: { en: 'Frontend developer intern', ur: 'فرنٹ اینڈ ڈویلپر انٹرن' },
    start: '2021-09',
    end: '2022-03',
    place: { en: 'Remote', ur: 'ریموٹ' },
    summary: {
      en: 'Where it started, at sixteen: Angular components, reactive forms and responsive layouts in production.',
      ur: 'یہیں سے آغاز ہوا، سولہ برس کی عمر میں: پروڈکشن میں Angular کمپوننٹس، ری ایکٹو فارمز اور ریسپانسو لے آؤٹس۔',
    },
    domain: 'engineering',
  },
]

export const domains: { id: string; title: L; body: L; evidence: L }[] = [
  {
    id: 'software',
    title: { en: 'Software engineering', ur: 'سافٹ ویئر انجینئرنگ' },
    body: {
      en: 'Full-stack TypeScript systems and the infrastructure under them: Docker, CI/CD, reverse proxies, and now Kubernetes.',
      ur: 'فل اسٹیک TypeScript نظام اور ان کے نیچے کا انفراسٹرکچر: Docker، CI/CD، ریورس پراکسی، اور اب Kubernetes۔',
    },
    evidence: { en: 'CMOonTheGO, Fastrack, VortexMe', ur: 'CMOonTheGO، فاسٹ ٹریک، ووَرٹیکس می' },
  },
  {
    id: 'product',
    title: { en: 'Product and design', ur: 'پروڈکٹ اور ڈیزائن' },
    body: {
      en: 'From Figma wireframes to roadmaps. I’ve designed interfaces as an intern and set product direction as a founder.',
      ur: 'فگما کے خاکوں سے روڈ میپ تک۔ انٹرن کے طور پر انٹرفیس بنائے اور بانی کے طور پر پروڈکٹ کی سمت طے کی۔',
    },
    evidence: { en: 'Prime Innovators, Genesys, Elements', ur: 'پرائم انوویٹرز، جینیسس، ایلیمنٹس' },
  },
  {
    id: 'marketing',
    title: { en: 'Marketing', ur: 'مارکیٹنگ' },
    body: {
      en: 'I build the tools marketing teams work in every day, and I position and launch my own products.',
      ur: 'میں وہ ٹولز بناتا ہوں جن میں مارکیٹنگ ٹیمیں روز کام کرتی ہیں، اور اپنے پروڈکٹس کی پہچان اور لانچ خود طے کرتا ہوں۔',
    },
    evidence: { en: 'CMOonTheGO, Prime Innovators', ur: 'CMOonTheGO، پرائم انوویٹرز' },
  },
  {
    id: 'people',
    title: { en: 'People and hiring', ur: 'افراد اور بھرتی' },
    body: {
      en: 'I built HR technology that automates recruiting, and I hire, mentor and lead teams myself.',
      ur: 'میں نے بھرتی کو خودکار بنانے والی ایچ آر ٹیکنالوجی بنائی، اور خود بھی ٹیمیں بناتا، سکھاتا اور چلاتا ہوں۔',
    },
    evidence: { en: 'Fastrack, Prime Innovators, Fast Developers Club', ur: 'فاسٹ ٹریک، پرائم انوویٹرز، فاسٹ ڈویلپرز کلب' },
  },
]

export const toolbox: { group: L; items: string[] }[] = [
  { group: { en: 'Frontend', ur: 'فرنٹ اینڈ' }, items: ['TypeScript', 'React', 'Next.js', 'Angular', 'RxJS', 'Tailwind CSS'] },
  { group: { en: 'Backend', ur: 'بیک اینڈ' }, items: ['Node.js', 'NestJS', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Go', 'Rust'] },
  { group: { en: 'Infrastructure', ur: 'انفراسٹرکچر' }, items: ['Docker', 'Kubernetes', 'Traefik', 'GitHub Actions', 'Cloudflare', 'Turborepo'] },
  { group: { en: 'Product', ur: 'پروڈکٹ' }, items: ['Figma', 'Linear', 'ClickUp', 'Roadmapping', 'Sprint planning'] },
]

export const education = {
  school: { en: 'FAST National University of Computer and Emerging Sciences', ur: 'فاسٹ نیشنل یونیورسٹی آف کمپیوٹر اینڈ ایمرجنگ سائنسز' } satisfies L,
  degree: { en: 'BS Computer Science', ur: 'بی ایس کمپیوٹر سائنس' } satisfies L,
  period: { en: '2023 – 2027', ur: '۲۰۲۳ تا ۲۰۲۷' } satisfies L,
  note: {
    en: 'Data structures, algorithms, operating systems, databases, networking, parallel processing.',
    ur: 'ڈیٹا اسٹرکچرز، الگورتھمز، آپریٹنگ سسٹمز، ڈیٹا بیس، نیٹ ورکنگ، پیرالل پروسیسنگ۔',
  } satisfies L,
}

export const leadership = {
  title: { en: 'Head Boy, Army Public School and College', ur: 'ہیڈ بوائے، آرمی پبلک اسکول اینڈ کالج' } satisfies L,
  period: { en: '2021 – 2023', ur: '۲۰۲۱ تا ۲۰۲۳' } satisfies L,
  note: {
    en: 'Represented the student body to faculty and administration, and helped run campus and intercollegiate events.',
    ur: 'اساتذہ اور انتظامیہ کے سامنے طلبہ کی نمائندگی، اور کیمپس و بین الکلیاتی تقریبات کا انتظام۔',
  } satisfies L,
}
