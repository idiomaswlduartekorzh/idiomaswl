import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, LockKeyhole } from 'lucide-react'
import { ADVANCED_CYCLE, ADVANCED_TOPICS } from '@/data/practica/advanced-topics'
import { CourseSchema } from '@/components/practica/EducationSchema'
import styles from './AdvancedIdeas.module.css'

export const metadata: Metadata = {
  title: 'Ideas avanzadas en inglés B2–C1 | Práctica integrada',
  description:
    'Practica inglés avanzado con ciclos integrados de escucha, lectura larga, vocabulario, ejercicios y producción sobre sesgos, sociedad y carácter.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ideas-avanzadas' },
  openGraph: {
    title: 'Ideas avanzadas — inglés B2–C1',
    description: 'Una idea compleja. Seis maneras de trabajarla. Un ciclo que vuelve al comienzo.',
    url: 'https://www.idiomaswl.com/practica/ideas-avanzadas',
  },
}

const CATEGORY_NUMBER = {
  Sesgos: 'I',
  'Vida social': 'II',
  Carácter: 'III',
} as const

export default function AdvancedIdeasPage() {
  const availableCount = ADVANCED_TOPICS.filter((topic) => topic.status === 'available').length

  return (
    <main className={`wlp-page ${styles.page}`}>
      <CourseSchema
        name="Ideas avanzadas en inglés"
        description="Ciclos integrados B2–C1 de escucha, lectura, vocabulario, práctica y producción sobre ideas complejas."
        url="https://www.idiomaswl.com/practica/ideas-avanzadas"
        educationalLevel="B2–C1"
        teaches="Critical reading, nuanced vocabulary, listening and argumentation in English"
        inLanguage="en"
      />

      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <span>Ideas avanzadas</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className="wlp-eyebrow">Inglés B2–C1 · pensamiento y lenguaje</p>
            <h1>Ideas que no caben en una respuesta rápida.</h1>
            <p className={styles.lead}>
              Aquí no memorizas una opinión. Escuchas una tesis, lees sus matices, afilas el
              vocabulario, la pones a prueba y vuelves a formularla con más precisión.
            </p>
            <div className={styles.heroMeta} aria-label="Características del curso">
              <span>{availableCount} ciclos completos disponibles</span>
              <span>6 movimientos por tema</span>
              <span>32–38 min</span>
            </div>
            <Link className="wlp-btn wlp-btn--primary" href="/practica/ideas-avanzadas/efecto-encuadre">
              Empezar con el encuadre <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.orbit} aria-label="Ciclo pedagógico de seis movimientos">
            <svg className={styles.orbitLine} viewBox="0 0 420 420" role="img" aria-hidden="true">
              <circle cx="210" cy="210" r="150" />
              <path d="M 343 139 l 16 3 -8 14" />
            </svg>
            <div className={styles.orbitCore}>
              <span>Una idea</span>
              <strong>6 lentes</strong>
              <small>vuelve distinta</small>
            </div>
            {ADVANCED_CYCLE.map((stage, index) => (
              <div className={styles.orbitStep} data-step={index + 1} key={stage.id}>
                <span>{index + 1}</span>
                <strong>{stage.label}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.method} aria-labelledby="method-heading">
          <div className={styles.sectionHeading}>
            <p className="wlp-eyebrow">Circularidad pedagógica</p>
            <h2 id="method-heading">El final comprueba cuánto cambió tu primera lectura.</h2>
            <p>
              Cada fase deja una pieza que la siguiente necesita. La producción final no es una
              actividad suelta: responde otra vez a la intuición inicial, ahora con evidencia y
              lenguaje más preciso.
            </p>
          </div>
          <ol className={styles.cycleList}>
            {ADVANCED_CYCLE.map((stage, index) => (
              <li key={stage.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{stage.label}</strong>
                  <p>{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.catalog} aria-labelledby="catalog-heading">
          <div className={styles.sectionHeading}>
            <p className="wlp-eyebrow">Biblioteca en construcción</p>
            <h2 id="catalog-heading">Temas para pensar en un inglés más exacto.</h2>
            <p>
              Los temas sociales se trabajan como preguntas abiertas a evidencia y objeciones. Una
              etiqueta no sustituye una explicación.
            </p>
          </div>

          <div className={styles.topicGrid}>
            {ADVANCED_TOPICS.map((topic) => {
              const content = (
                <>
                  <div className={styles.topicTop}>
                    <span className={styles.category}>
                      {CATEGORY_NUMBER[topic.category]} · {topic.category}
                    </span>
                    <span className={topic.status === 'available' ? styles.available : styles.planned}>
                      {topic.status === 'available' ? <Check size={13} /> : <LockKeyhole size={13} />}
                      {topic.status === 'available' ? 'Disponible' : 'En diseño'}
                    </span>
                  </div>
                  <h3>{topic.title}</h3>
                  <p className={styles.topicEn}>{topic.titleEn}</p>
                  <p className={styles.premise}>{topic.premise}</p>
                  {topic.caution && <p className={styles.caution}>{topic.caution}</p>}
                  <div className={styles.topicFooter}>
                    <span>{topic.level}</span>
                    <span>{topic.minutes} min</span>
                    <strong>{topic.status === 'available' ? 'Abrir ciclo →' : 'Próximamente'}</strong>
                  </div>
                </>
              )

              return topic.status === 'available' ? (
                <Link className={styles.topicCard} href={`/practica/ideas-avanzadas/${topic.slug}`} key={topic.slug}>
                  {content}
                </Link>
              ) : (
                <article className={`${styles.topicCard} ${styles.topicCardPlanned}`} key={topic.slug} aria-disabled="true">
                  {content}
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
