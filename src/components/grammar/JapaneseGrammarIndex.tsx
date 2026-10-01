import Image from 'next/image'
import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import { getJapaneseGrammarLevelResource } from '@/data/japanese-grammar-levels'
import styles from './JapaneseGrammarIndex.module.css'

const COPY = {
  a2: { title: 'Conecta ideas y gana autonomía', lead: 'Pasa de frases aisladas a explicar causas, organizar planes, pedir con tacto y contar experiencias. Cada lección combina una escena real, una regla visual, seis niveles de práctica, audio japonés y un cuaderno imprimible.', label: 'Autonomía cotidiana', outcome: 'Al completar la ruta podrás desenvolverte en situaciones frecuentes y enlazar tus ideas sin traducir palabra por palabra.' },
  b1: { title: 'Narra, matiza y argumenta', lead: 'Aprende a mostrar perspectiva, deducir, corregir una interpretación y contrastar dos caras de un tema. Cada lección propone decisiones de uso, práctica progresiva, audio japonés y material para escribir.', label: 'Usuario independiente', outcome: 'Al completar la ruta podrás sostener explicaciones más largas y expresar opiniones con un matiz cercano al japonés natural.' },
} as const

export default function JapaneseGrammarIndex({ level, topics }: { level: 'a2' | 'b1'; topics: GrammarTopic[] }) {
  const copy = COPY[level]
  const levelLabel = level.toUpperCase()
  const chapters = Array.from({ length: 5 }, (_, index) => topics.slice(index * 5, index * 5 + 5))
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb"><Link href="/practica">Práctica</Link><span>/</span><Link href="/practica/japones">Japonés</Link><span>/</span><Link href={`/practica/japones/${level}`}>{levelLabel}</Link><span>/</span><strong>Gramática</strong></nav>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Japonés · {levelLabel} · {copy.label}</p>
            <h1>{copy.title}</h1>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.stats}><span><b>{topics.length}</b> lecciones</span><span><b>6</b> niveles por tema</span><span><b>{topics.length * 3}</b> recursos</span></div>
          </div>
          <aside><span>Meta de la ruta</span><p>{copy.outcome}</p><Link href={`#capitulo-1`}>Empezar la ruta <b>→</b></Link></aside>
        </header>
        <section className={styles.method} aria-label="Método de estudio"><div><span>01</span><b>Comprende</b><p>Una explicación pensada para hispanohablantes.</p></div><div><span>02</span><b>Decide</b><p>Una regla visual para elegir la forma correcta.</p></div><div><span>03</span><b>Produce</b><p>Seis niveles hasta crear mensajes propios.</p></div><div><span>04</span><b>Repasa</b><p>PDF, mapa y audio para estudiar sin conexión.</p></div></section>
        {chapters.map((chapter, chapterIndex) => (
          <section key={chapterIndex} id={`capitulo-${chapterIndex + 1}`} className={styles.chapter}>
            <div className={styles.chapterHeading}><span>{String(chapterIndex + 1).padStart(2, '0')}</span><div><p>Capítulo {chapterIndex + 1} de 5</p><h2>{chapterTitle(level, chapterIndex)}</h2></div><small>{chapter.length} temas · práctica progresiva</small></div>
            <div className={styles.grid}>
              {chapter.map((topic) => { const resource = getJapaneseGrammarLevelResource(topic, level); return (
                <Link className={styles.card} key={topic.slug} href={`/practica/japones/${level}/gramatica/${topic.slug}`}>
                  <div className={styles.image}><Image src={resource.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /><span>{topic.order}</span><i>{resource.studyMinutes} min</i></div>
                  <div className={styles.cardCopy}><p>{topic.category}</p><h3>{topic.shortTitle}</h3><span>{topic.lead}</span><footer><em>6 niveles · PDF · audio</em><b>→</b></footer></div>
                </Link>
              ) })}
            </div>
          </section>
        ))}
        <footer className={styles.footer}><p>¿Quieres repasar antes de continuar?</p><Link href={`/practica/japones/${level}`}>← Volver al panel de japonés {levelLabel}</Link></footer>
      </div>
    </main>
  )
}

function chapterTitle(level: 'a2' | 'b1', index: number): string {
  const titles = level === 'a2'
    ? ['Acciones conectadas', 'Capacidad y responsabilidad', 'Opinión y posibilidad', 'Condiciones y foco', 'Preparar, probar y planear']
    : ['Cambios y decisiones', 'Voz, resultado y grado', 'Evidencia y deducción', 'Obligación y relaciones lógicas', 'Matiz, normas y contraste']
  return titles[index]
}
