import { FaLinkedinIn } from 'react-icons/fa6'
import { SiDevdotto, SiGithub, SiInstagram, SiSpotify, SiYoutube } from 'react-icons/si'
import type { SocialId } from '@content/site'

const icons = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
  instagram: SiInstagram,
  spotify: SiSpotify,
  youtube: SiYoutube,
  devto: SiDevdotto,
} satisfies Record<SocialId, unknown>

export function SocialIcon({ id, size = 18 }: { id: SocialId; size?: number }) {
  const Icon = icons[id]
  return <Icon size={size} aria-hidden />
}
