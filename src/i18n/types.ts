export type Locale = 'en' | 'ur'

export interface Messages {
  nav: {
    work: string
    music: string
    poetry: string
    reach: string
    close: string
    menu: string
  }
  hero: {
    label: string
    tagline: string
    subline: string
    cta: {
      work: string
      poetry: string
    }
    scroll: string
  }
  about: {
    title: string
    intro: string
    bio: string
    label: string
    stats: {
      repos: string
      stars: string
      tracks: string
    }
    preview: string
    contact: string
  }
  domains: {
    title: string
    software: string
    marketing: string
    people: string
  }
  work: {
    title: string
    intro: string
    in_development: string
    open_source: string
    rd: string
    fyp: string
    active: string
    in_progress: string
    case_study_soon: string
    placeholder_uniflow: string
    projects: Record<string, Record<string, string | string[] | object>>
    also_on_github: string
    full_profile: string
  }
  music: {
    title: string
    intro: string
    albums: Record<string, Record<string, string>>
  }
  kalaam: {
    title: string
    intro: string
    index: {
      intro: string
      ghazal_tag: string
      sample_layout: string
    }
    back: string
    all_verses: string
    listen: string
    listen_to_album: string
    track_prefix: string
    album_prefix: string
  }
  connect: {
    title: string
    line: string
    email: string
  }
  footer: {
    label: string
    tagline: string
    reach: string
    email: string
    github: string
    social: string
    connect: string
  }
}
