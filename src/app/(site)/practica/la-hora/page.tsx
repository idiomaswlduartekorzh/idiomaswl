import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { clockHub, clockLanguageKeys, clockLanguages, clockLessonUrl } from '@/data/clock-lessons/catalog'
import { ClockFace } from '@/components/grammar/ClockVisuals'
import styles from '@/components/grammar/ClockHub.module.css'

export const metadata: Metadata = {
  title: 'Aprende a decir la hora en ocho idiomas | WeLearn',
  description: 'Practica con relojes de agujas, conversaciones ilustradas y ejercicios A1 explicados en español.',
  alternates: { canonical: `https://www.idiomaswl.com${clockHub}` },
}

export default function ClockHub() {
  return <div className="wrap"><div data-clock-page className={styles.hub}>
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <span>Gramática A1</span><h1>La hora en ocho idiomas</h1>
        <p>El reloj marca las tres y media. Elige un idioma para descubrir cómo se dice, probar otras horas y practicar una cita.</p>
      </div>
      <div className={styles.photo}>
        <Image src="/images/grammar/aleman/uhrzeit/desayuno.webp" alt="" fill sizes="(max-width: 650px) 100vw, 490px" />
        <ClockFace clock={{ hour: 3, minute: 30 }} />
      </div>
    </header>
    <h2>Elige tu idioma</h2>
    <div className={styles.grid}>{clockLanguageKeys.map(language => {
      const {name, lang, example} = clockLanguages[language]
      return <Link key={language} className={styles.card} href={clockLessonUrl(language)}>
        <strong>{name} <span aria-hidden="true">↗</span></strong><span lang={lang}>{example}</span>
      </Link>
    })}</div>
  </div></div>
}
