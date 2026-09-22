declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const Component: ComponentType<{ locale: string }>
  export default Component
}

declare module '@/i18n/*.json' {
  import type { Messages } from '@/i18n/types'
  const messages: Messages
  export default messages
}