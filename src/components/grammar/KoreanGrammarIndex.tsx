import Image from 'next/image'
import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import {
  getKoreanGrammarResource,
  KOREAN_GRAMMAR_PREVIEW_SLUGS,
  type KoreanGrammarLevel,
} from '@/data/korean-grammar-preview'
import styles from './KoreanGrammarIndex.module.css'

const COPY = {
  a1: {
    label: 'Fundamentos claros',
    title: 'Construye tus primeras frases con orden',
    lead: 'Entiende cómo funciona el hangul dentro de una oración, coloca el verbo al final y usa partículas sin traducir palabra por palabra.',
    outcome: 'Al completar la ruta podrás presentarte, describir tu entorno y resolver intercambios cotidianos con estructuras estables.',
    chapters: ['Base de la frase', 'Acción, objeto y lugar', 'Preguntar, contar y desear', 'Relatar y desenvolverte'],
  },
  a2: {
    label: 'Autonomía cotidiana',
    title: 'Conecta acciones y cuenta lo que ocurre',
    lead: 'Pasa de frases aisladas a explicar planes, experiencias, razones y acciones en progreso con decisiones visuales y práctica gradual.',
    outcome: 'Al completar la ruta podrás enlazar ideas y desenvolverte con más naturalidad en situaciones frecuentes.',
    chapters: ['Formas verbales, futuro y causa', 'Intención, capacidad y obligación', 'Tiempo, descripción y partículas', 'Registro, progresión y discurso'],
  },
  b1: {
    label: 'Usuario independiente',
    title: 'Matiza, argumenta y aprovecha el contexto',
    lead: 'Aprende a expresar intención, consecuencia, oportunidad y punto de vista con el nivel de detalle que exige una conversación real.',
    outcome: 'Al completar la ruta podrás sostener explicaciones más largas y escoger estructuras según el matiz que quieres comunicar.',
    chapters: ['Tiempo, cambio y decisiones', 'Causa, posibilidad y condición', 'Oportunidad y secuencia', 'Obligación, voz y propósito'],
  },
} as const

export default function KoreanGrammarIndex({ level, topics }: { level: KoreanGrammarLevel; topics: GrammarTopic[] }) {
  const copy = COPY[level]
  const levelLabel = level.toUpperCase()
  const chapters = Array.from({ length: 4 }, (_, index) => topics.slice(index * 5, index * 5 + 5))
  const previewSlug = KOREAN_GRAMMAR_PREVIEW_SLUGS[level]

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link href="/practica">Práctica</Link><span>/</span>
          <Link href="/practica/coreano">Coreano</Link><span>/</span>
          <Link href={`/practica/coreano/${level}`}>{levelLabel}</Link><span>/</span>
          <strong>Gramática</strong>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Coreano · {levelLabel} · {copy.label}</p>
            <h1>{copy.title}</h1>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.stats}>
              <span><b>{topics.length}</b> lecciones</span>
              <span><b>{topics.length}</b> páginas renovadas</span>
              <span><b>5</b> módulos por lección</span>
            </div>
          </div>
          <aside>
            <span>Meta de la ruta</span>
            <p>{copy.outcome}</p>
            <Link href={`/practica/coreano/${level}/gramatica/${previewSlug}`}>Abrir primera lección <b>→</b></Link>
          </aside>
        </header>

        <section className={styles.method} aria-label="Método de estudio">
          <div><span>01</span><b>Comprende</b><p>Explicación directa para hispanohablantes.</p></div>
          <div><span>02</span><b>Visualiza</b><p>Una fórmula y escenas que fijan el patrón.</p></div>
          <div><span>03</span><b>Produce</b><p>Práctica progresiva con retroalimentación.</p></div>
          <div><span>04</span><b>Repasa</b><p>PDF, mapa y audio en las páginas finalizadas.</p></div>
        </section>

        {chapters.map((chapter, chapterIndex) => (
          <section key={copy.chapters[chapterIndex]} id={`capitulo-${chapterIndex + 1}`} className={styles.chapter}>
            <div className={styles.chapterHeading}>
              <span>{String(chapterIndex + 1).padStart(2, '0')}</span>
              <div><p>Capítulo {chapterIndex + 1} de 4</p><h2>{copy.chapters[chapterIndex]}</h2></div>
              <small>{chapter.length} temas · práctica progresiva</small>
            </div>
            <div className={styles.grid}>
              {chapter.map((topic) => {
                const resource = getKoreanGrammarResource(topic, level)
                return (
                  <Link className={`${styles.card} ${styles.preview}`} key={topic.slug} href={`/practica/coreano/${level}/gramatica/${topic.slug}`}>
                    <div className={styles.image}>
                      <Image src={resource.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                      <span>{topic.order}</span><i>{resource.studyMinutes} min</i>
                    </div>
                    <div className={styles.cardCopy}>
                      <p>{topic.category}</p><h3>{topic.shortTitle}</h3><span>{topic.lead}</span>
                      <footer><em>{topic.slug === 'hangul-basico' ? 'Audio y PDF listos' : 'Página renovada · audio al cierre'}</em><b>→</b></footer>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}

        <footer className={styles.footer}>
          <p>Las veinte lecciones de este nivel ya usan el sistema visual renovado y la práctica progresiva completa.</p>
          <Link href={`/practica/coreano/${level}`}>← Volver al panel de coreano {levelLabel}</Link>
        </footer>
      </div>
    </main>
  )
}
