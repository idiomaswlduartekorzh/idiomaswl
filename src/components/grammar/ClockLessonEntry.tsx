import Link from 'next/link'
import { clockLanguages, clockLessonUrl, type ClockLanguage } from '@/data/clock-lessons/catalog'
import styles from './ClockHub.module.css'

export function ClockLessonEntry({ language }: { language: ClockLanguage }) {
  return <Link className={styles.entry} href={clockLessonUrl(language)}>
    <span><strong>La hora en {clockLanguages[language].name.toLowerCase()}</strong>
      <small>Lee las agujas, practica una conversación y prueba los ejercicios.</small></span>
    <span aria-hidden="true">→</span>
  </Link>
}
