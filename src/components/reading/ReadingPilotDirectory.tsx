import Link from 'next/link'
import { LANGUAGE_NAMES } from '@/lib/reading/routes'
import type { CefrLevel, ReadingLanguage } from '@/lib/reading/types'
import styles from './reading.module.css'

export type ReadingPilotLink = {
  id: string
  language: ReadingLanguage
  level: CefrLevel
  title: string
  href: string
}

const LANGUAGES: ReadingLanguage[] = ['en', 'fr', 'it', 'de', 'pt', 'ru', 'ja', 'ko']

export function ReadingPilotDirectory({ links, currentId }: { links: ReadingPilotLink[]; currentId?: string }) {
  if (!links.length) return null

  return <details className={styles.pilotDirectory}>
    <summary>
      <span><strong>Explore the reading collection</strong><small>One reading for each language and level · {links.length} in this pilot</small></span>
      <span aria-hidden="true">Browse all ↗</span>
    </summary>
    <div className={styles.pilotDirectoryGrid}>
      {LANGUAGES.map((language) => {
        const languageLinks = links.filter((link) => link.language === language)
        if (!languageLinks.length) return null
        return <section key={language}>
          <h2>{LANGUAGE_NAMES.en[language]}</h2>
          <div>{languageLinks.map((link) => <Link key={link.id} href={link.href} aria-current={link.id === currentId ? 'page' : undefined} prefetch={false}>
            <b>{link.level}</b><span>{link.title}</span>
          </Link>)}</div>
        </section>
      })}
    </div>
  </details>
}
