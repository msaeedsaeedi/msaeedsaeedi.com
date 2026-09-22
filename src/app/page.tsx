import { redirect } from 'next/navigation'

/**
 * Root route — redirect to the default locale (/en).
 * The [lang] segment handles all localized content.
 */
export default function RootPage() {
  redirect('/en')
}
