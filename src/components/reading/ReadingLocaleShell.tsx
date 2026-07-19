import Link from 'next/link'
import { BookOpen, Languages } from 'lucide-react'
import { LocaleSwitchLink } from './LocaleSwitchLink'
import type { TutorLocale } from '@/lib/reading/types'
import styles from './reading.module.css'

const COPY = {
  es: { practice: 'Práctica de lectura', progress: 'Tu progreso se guarda en este dispositivo', switchLabel: 'English' },
  en: { practice: 'Reading practice', progress: 'Your progress is saved on this device', switchLabel: 'Español' },
} as const

export function ReadingLocaleShell({
  locale,
  alternateHref,
  children,
}: {
  locale: TutorLocale
  alternateHref: string
  children: React.ReactNode
}) {
  const alternateLocale: TutorLocale = locale === 'es' ? 'en' : 'es'
  return (
    <div className={styles.shell} lang={locale}>
      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <Link href="/home" className={styles.brand} aria-label="Idiomas WeLearn">
            <span className={styles.brandMark}>W</span>
            <span>Idiomas WeLearn</span>
          </Link>
          <div className={styles.headerContext}>
            <BookOpen size={16} aria-hidden="true" />
            <span>{COPY[locale].practice}</span>
          </div>
          <LocaleSwitchLink href={alternateHref} locale={alternateLocale}>
            <span className={styles.localeSwitch}>
              <Languages size={16} aria-hidden="true" />
              {COPY[locale].switchLabel}
            </span>
          </LocaleSwitchLink>
        </div>
      </header>
      <main id="main" className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>{COPY[locale].progress}</footer>
    </div>
  )
}

