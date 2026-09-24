// Poet introduction, from the Rekhta submission (archive/Poetry Submission to Rekhta.docx).
import type { L } from '@/i18n/config'

export const poetIntro: L = {
  en: 'Mohammad Saeed, writing under the takhallus Saeedi, is a poet of emotions that often find their meaning in silence before they find words. In his poetry, love is not confined to union and separation; it unfolds through memory, longing, inward conversation, and the act of creation itself. A severed flower may become an image of loss, while an ordinary gesture can carry the fragrance of an entire verse. Rooted in the atmosphere of the classical Urdu ghazal, Saeedi reshapes his inner world through distinctive imagery and compound expression. Gulab-e-Suman, his developing collection, emerges from this continuing journey.',
  ur: 'محمد سعید، تخلص سعیدی، ان کیفیات کے شاعر ہیں جو اکثر کہی جانے سے پہلے خاموشی میں اپنا مفہوم تراشتی ہیں۔ ان کے ہاں عشق محض وصل و ہجر کا قصہ نہیں، بلکہ یاد، خلش، خود کلامی اور تخلیق کے باہمی سفر کا نام ہے؛ جہاں کبھی گل اپنی شاخ سے جدا ہو کر معنی پاتا ہے اور کبھی ایک معمولی منظر پورے شعر کی خوشبو بن جاتا ہے۔ کلاسیکی غزل کی فضا سے رشتہ رکھتے ہوئے سعیدی اپنی داخلی دنیا کو نئے تراکیبی پیکروں میں ڈھالتے ہیں۔ ان کا زیرِ تکمیل شعری مجموعہ گلابِ سمن اسی سفر کی ایک صورت ہے۔',
}

/** Muntakhab ashaar: ten couplets the poet selected. `from` = slug of the source ghazal. */
export const selectedAshaar: { lines: [string, string]; from: string }[] = [
  { lines: ['کیسے آئیں عشق کو سمجھ تیرے کند خیال', 'نابینا ہے بیناؤں میں یہ سوزِ معروف'], from: 'lafz-e-ghair' },
  { lines: ['تیغِ برگِ گل سے میرے خوں کا قطرہ', 'بہہ کے سامانِ لب و رخسار ہوگا'], from: 'aaghosh-e-mohabbat' },
  { lines: ['ہے سَعیدی اس کو درپیش حادثۂ دل', 'کہ شاعری جس کی خاطر کمال ہوگئی'], from: 'haadsa-e-dil' },
  { lines: ['جب بھی تیرے سامنے آنا پڑا مجھ کو', 'اٹھ کے بزمِ یاد سے آنا پڑا مجھ کو'], from: 'bazm-e-yaad' },
  { lines: ['دیکھ عاشقِ ثنا کو ملال تو نہیں؟', 'کہ سخن وری پراگندہ حال ہوگئی'], from: 'haadsa-e-dil' },
  { lines: ['ہو کیونکر گلاب عارضِ گُل عِذار سا', 'رخِ زیبا کہ ہے آج اپنے شباب سا'], from: 'rakht-e-siyah' },
  { lines: ['ہے سَعیدی تیری آغوشِ محبت', 'تنہا اس میں تُو بڑا دو چار ہوگا'], from: 'aaghosh-e-mohabbat' },
  { lines: ['بس سَعیدی نگاہِ تکلف تمہیں', 'دیکھے ہے روز کہ ہم نوا جب نہ ہو'], from: 'nigah-e-takalluf' },
  { lines: ['سہارا گلابوں کا لیکر لحد میں', 'اسے قبر میں بھی سنوارا گیا ہے'], from: 'khoon-e-jigar' },
  { lines: ['یہ ہی تعریف ہے تیری کہ غزل لکھ دوں میں', 'ورنہ شاعر کو زمانے کی پڑی رہتی ہے'], from: 'muskurate-huye-chehron-mein' },
]
