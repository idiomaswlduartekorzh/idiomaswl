import Link from 'next/link'
import { LANGUAGE_NAMES } from '@/lib/reading/routes'
import type { CefrLevel, ReadingLanguage } from '@/lib/reading/types'
import styles from './reading.module.css'

export type ReadingPilotLink = {
  language: ReadingLanguage
  level: CefrLevel
  count: number
  href: string
}

const LANGUAGES: ReadingLanguage[] = ['en', 'fr', 'it', 'de', 'pt', 'ru', 'ja', 'ko']

export function ReadingPilotDirectory({ links, currentLanguage, currentLevel }: { links: ReadingPilotLink[]; currentLanguage?: ReadingLanguage; currentLevel?: CefrLevel }) {
  if (!links.length) return null

  return <details className={styles.pilotDirectory}>
    <summary>
      <span><strong>Explore the reading collection</strong><small>{links.length} language and level paths · 20 readings planned in each</small></span>
      <span aria-hidden="true">Browse all ↗</span>
    </summary>
    <div className={styles.pilotDirectoryGrid}>
      {LANGUAGES.map((language) => {
        const languageLinks = links.filter((link) => link.language === language)
        if (!languageLinks.length) return null
        return <section key={language}>
          <h2>{LANGUAGE_NAMES.en[language]}</h2>
          <div>{languageLinks.map((link) => <Link key={`${link.language}-${link.level}`} href={link.href} aria-current={link.language === currentLanguage && link.level === currentLevel ? 'location' : undefined} prefetch={false}>
            <b>{link.level}</b><span>{link.count} {link.count === 1 ? 'reading' : 'readings'} available</span>
          </Link>)}</div>
        </section>
      })}
    </div>
  </details>
}
