import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import GrammarTopicClient from '@/components/grammar/GrammarTopicClient'
import GrammarTopicVisual from '@/components/grammar/GrammarTopicVisual'
import TopicNav from '@/components/grammar/TopicNav'
import { grammarVisualImageObject, grammarVisualUrl } from '@/lib/grammar-visual'
import styles from './GrammarCollection.module.css'

type GrammarLanguage = 'aleman' | 'frances' | 'ingles' | 'italiano' | 'japones' | 'portugues' | 'ruso'
type GrammarLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'
type RelatedWritingExercise = { id: string; sequence: number; title: string; genre: string }

const LANGUAGE: Record<GrammarLanguage, {
  label: string
  adjective: string
  flag: string
  code: string
  native: string
  accent: string
  deep: string
  soft: string
}> = {
  aleman: { label: 'Alemán', adjective: 'alemana', flag: '🇩🇪', code: 'de', native: 'Deutsch', accent: '#d79a00', deep: '#181818', soft: '#fff3cf' },
  frances: { label: 'Francés', adjective: 'francesa', flag: '🇫🇷', code: 'fr', native: 'Français', accent: '#e7374f', deep: '#18347a', soft: '#eef3ff' },
  ingles: { label: 'Inglés', adjective: 'inglesa', flag: '🇬🇧', code: 'en', native: 'English', accent: '#c8102e', deep: '#012169', soft: '#eef3ff' },
  italiano: { label: 'Italiano', adjective: 'italiana', flag: '🇮🇹', code: 'it', native: 'Italiano', accent: '#d72b3f', deep: '#08713c', soft: '#edf8f0' },
  japones: { label: 'Japonés', adjective: 'japonesa', flag: '🇯🇵', code: 'ja', native: '日本語', accent: '#dc2f45', deep: '#202a44', soft: '#fff0f1' },
  portugues: { label: 'Portugués', adjective: 'portuguesa', flag: '🇧🇷', code: 'pt', native: 'Português', accent: '#e4aa00', deep: '#126b3a', soft: '#f4fae8' },
  ruso: { label: 'Ruso', adjective: 'rusa', flag: '🇷🇺', code: 'ru', native: 'Русский', accent: '#d92f45', deep: '#24458f', soft: '#f1f5ff' },
}

const LEVEL_COPY: Record<GrammarLevel, { label: string; lead: string; outcome: string }> = {
  a1: {
    label: 'Fundamentos',
    lead: 'Construye una base clara con explicaciones pensadas para hispanohablantes, mapas visuales y práctica que avanza desde reconocer hasta producir.',
    outcome: 'Al terminar esta ruta podrás formar frases esenciales y escoger las estructuras básicas con mayor seguridad.',
  },
  a2: {
    label: 'Autonomía',
    lead: 'Conecta ideas, amplía tus tiempos verbales y resuelve situaciones cotidianas con una ruta ordenada de explicación y práctica.',
    outcome: 'Al terminar esta ruta podrás enlazar oraciones y desenvolverte con más precisión en contextos frecuentes.',
  },
  b1: {
    label: 'Independencia',
    lead: 'Afina matices, relaciones entre ideas y estructuras de uso real con explicaciones completas y práctica progresiva.',
    outcome: 'Al terminar esta ruta podrás sostener explicaciones más complejas y elegir estructuras según la intención comunicativa.',
  },
  b2: {
    label: 'Precision',
    lead: 'Consolidate complex tense, voice, modality and clause systems through practice that requires decisions about meaning, not mechanical completion.',
    outcome: 'Complete the full B2 grammar system with controlled choices for conversation, writing and exam tasks.',
  },
  c1: {
    label: 'Advanced control',
    lead: 'Control emphasis, stance, clause compression and information flow across academic, professional and natural spoken English.',
    outcome: 'Complete the full C1 grammar system and use advanced structures as purposeful discourse choices.',
  },
  c2: {
    label: 'Mastery',
    lead: 'Refine information structure, evidentiality, reference, clause architecture and register for flexible, idiomatic and precise English.',
    outcome: 'Complete the full C2 grammar system and redesign the same proposition for different audiences, purposes and degrees of commitment.',
  },
}

export function GrammarCollectionIndex({
  idioma,
  nivel,
  topics,
}: {
  idioma: GrammarLanguage
  nivel: GrammarLevel
  topics: GrammarTopic[]
}) {
  const language = LANGUAGE[idioma]
  const level = LEVEL_COPY[nivel]
  const levelLabel = nivel.toUpperCase()
  const english = idioma === 'ingles' && (nivel === 'b2' || nivel === 'c1' || nivel === 'c2')
  const basePath = `/practica/${idioma}/${nivel}`
  const canonical = `https://www.idiomaswl.com${basePath}/gramatica`
  const groupedTopics = groupTopics(topics)
  const firstTopic = topics[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: english ? `English grammar ${levelLabel}` : `Gramática ${language.adjective} ${levelLabel}`,
        description: english ? `Complete English grammar ${levelLabel} curriculum with explanations, visual maps, extended exercises and printable resources.` : `Temas de gramática ${language.adjective} ${levelLabel} con explicaciones y ejercicios para hispanohablantes.`,
        url: canonical,
        inLanguage: english ? 'en' : 'es',
        isPartOf: { '@type': 'WebSite', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: topics.length,
          itemListElement: topics.map((topic, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: topic.shortTitle,
            url: `${canonical}/${topic.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: english ? 'Practice' : 'Práctica', item: 'https://www.idiomaswl.com/practica' },
          { '@type': 'ListItem', position: 2, name: english ? 'English' : language.label, item: `https://www.idiomaswl.com/practica/${idioma}` },
          { '@type': 'ListItem', position: 3, name: levelLabel, item: `https://www.idiomaswl.com${basePath}` },
          { '@type': 'ListItem', position: 4, name: english ? `Grammar ${levelLabel}` : `Gramática ${levelLabel}`, item: canonical },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div
        className={styles.page}
        style={{ '--grammar-accent': language.accent, '--grammar-deep': language.deep, '--grammar-soft': language.soft } as React.CSSProperties}
      >
        <div className={styles.wrap}>
          <Breadcrumb idioma={idioma} nivel={nivel} languageLabel={english ? 'English' : language.label} english={english} />

          <header className={styles.indexHero}>
            <div className={styles.indexHeroCopy}>
              <p className={styles.eyebrow}>{language.flag} {language.native} · {levelLabel} · {level.label}</p>
              <h1>{english ? `English grammar ${levelLabel}: complete curriculum and practice` : `Gramática ${language.adjective} ${levelLabel}: temas y ejercicios`}</h1>
              <p className={styles.lead}>{level.lead}</p>
              <div className={styles.heroActions}>
                {firstTopic ? <Link className={styles.primaryAction} href={`${basePath}/gramatica/${firstTopic.slug}`}>{english ? 'Start the route' : 'Empezar la ruta'} <span>→</span></Link> : null}
                <a className={styles.secondaryAction} href="#temas">{english ? 'View all topics' : 'Ver todos los temas'}</a>
              </div>
              <div className={styles.metrics} aria-label="Resumen de la ruta">
                <span><b>{topics.length}</b> {english ? 'lessons' : 'lecciones'}</span>
                <span><b>6</b> {english ? 'practice stages' : 'niveles de práctica'}</span>
                <span><b>100 %</b> {english ? 'open access' : 'acceso libre'}</span>
              </div>
            </div>
            <aside className={styles.routeGoal}>
              <span>{english ? 'Route goal' : 'Meta de la ruta'}</span>
              <p>{level.outcome}</p>
              <div><b>{language.native}</b><em>{levelLabel}</em></div>
            </aside>
          </header>

          <section className={styles.method} aria-label={english ? 'Study method' : 'Método de estudio'}>
            <div><span>01</span><b>{english ? 'Understand' : 'Comprende'}</b><p>{english ? 'Full teacher explanation in English.' : 'Explicación directa en español.'}</p></div>
            <div><span>02</span><b>{english ? 'Visualise' : 'Visualiza'}</b><p>{english ? 'Purposeful maps, formulas and contrasts.' : 'Fórmulas, tablas y ejemplos.'}</p></div>
            <div><span>03</span><b>{english ? 'Practise' : 'Practica'}</b><p>{english ? 'Six stages with feedback.' : 'Seis niveles con corrección.'}</p></div>
            <div><span>04</span><b>{english ? 'Produce' : 'Produce'}</b><p>{english ? 'Move from recognition to original use.' : 'Del reconocimiento al uso propio.'}</p></div>
          </section>

          <section id="temas" className={styles.catalogIntro}>
            <div><span>{english ? 'Complete route' : 'Ruta completa'}</span><h2>{english ? `All English grammar topics for ${levelLabel}` : `Todos los temas de gramática ${language.adjective} ${levelLabel}`}</h2></div>
            <p>{english ? 'Follow the sequence or open the system you need. Every topic includes a complete lesson, visual map, extended practice and three printable PDFs.' : 'Avanza en orden o abre la estructura que necesitas repasar. Cada enlace conserva una lección completa, ejemplos y ejercicios.'}</p>
          </section>

          {idioma === 'portugues' && nivel === 'a1' ? (
            <section className={styles.topicGroup} aria-labelledby="laboratorio-numeros-portugues">
              <div className={styles.groupHeading}>
                <span>00</span>
                <div><p>Laboratorio auditivo</p><h2 id="laboratorio-numeros-portugues">Números escuchados</h2></div>
                <small>6 series · 120 números</small>
              </div>
              <div className={styles.topicGrid}>
                <Link className={styles.topicCard} href="/practica/portugues/a1/gramatica/numeros-ditado">
                  <div className={styles.cardTop}><span style={{ background: '#126b3a' }}>▶</span><em>Escucha + escritura</em></div>
                  <h3>Ditado de números: 0 a 100.000</h3>
                  <p>Escucha un número, escríbelo en cifras y desbloquea la siguiente serie solo cuando aciertes.</p>
                  <footer><span>6 series progresivas · corrección inmediata</span><b>→</b></footer>
                </Link>
              </div>
            </section>
          ) : null}

          {groupedTopics.map(([category, categoryTopics], categoryIndex) => (
            <section className={styles.topicGroup} key={category} aria-labelledby={`categoria-${categoryIndex}`}>
              <div className={styles.groupHeading}>
                <span>{String(categoryIndex + 1).padStart(2, '0')}</span>
                <div><p>{english ? 'Block' : 'Bloque'} {categoryIndex + 1}</p><h2 id={`categoria-${categoryIndex}`}>{category}</h2></div>
                <small>{categoryTopics.length} {english ? (categoryTopics.length === 1 ? 'topic' : 'topics') : (categoryTopics.length === 1 ? 'tema' : 'temas')}</small>
              </div>
              <div className={styles.topicGrid}>
                {categoryTopics.map((topic) => (
                  <Link className={styles.topicCard} key={topic.slug} href={`${basePath}/gramatica/${topic.slug}`}>
                    <div className={styles.cardTop}><span style={{ background: topic.color }}>{topic.order}</span><em>{topic.category}</em></div>
                    <h3>{topic.shortTitle}</h3>
                    <p>{topic.lead}</p>
                    <footer><span>{english ? 'Explanation + practice + PDFs' : 'Explicación + práctica'}</span><b>→</b></footer>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <nav className={styles.levelRoute} aria-label={`Niveles de gramática ${language.label}`}>
            <div><span>{english ? 'Continue your route' : 'Sigue tu ruta'}</span><h2>{english ? 'English grammar from A1 to C2' : `Gramática ${language.adjective} de A1 a ${idioma === 'ingles' ? 'C2' : 'B1'}`}</h2></div>
            <div>{(idioma === 'ingles' ? ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const : ['a1', 'a2', 'b1'] as const).map((routeLevel) => <Link key={routeLevel} className={routeLevel === nivel ? styles.currentLevel : ''} href={`/practica/${idioma}/${routeLevel}/gramatica`}>{routeLevel.toUpperCase()}</Link>)}</div>
          </nav>

          <Link className={styles.backLink} href={basePath}>← {english ? `Back to English ${levelLabel}` : `Volver a ${language.label} ${levelLabel}`}</Link>
        </div>
      </div>
    </>
  )
}

export function GrammarCollectionTopicPage({
  topic,
  idioma,
  nivel,
  relatedWritingExercises,
}: {
  topic: GrammarTopic
  idioma: GrammarLanguage
  nivel: GrammarLevel
  relatedWritingExercises: RelatedWritingExercise[]
}) {
  const language = LANGUAGE[idioma]
  const levelLabel = nivel.toUpperCase()
  const basePath = `/practica/${idioma}/${nivel}`
  const indexPath = `${basePath}/gramatica`
  const canonical = `https://www.idiomaswl.com${indexPath}/${topic.slug}`
  const activityCount = countPracticeActivities(topic)
  const waText = encodeURIComponent(`Hola, tengo una pregunta sobre ${topic.shortTitle} en ${language.label} ${levelLabel}.`)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: topic.title,
        description: topic.description,
        url: canonical,
        educationalLevel: topic.level,
        inLanguage: ['es', language.code],
        teaches: topic.shortTitle,
        learningResourceType: ['Lección interactiva', 'Ejercicios de gramática'],
        isAccessibleForFree: true,
        image: grammarVisualUrl(idioma, nivel, topic.slug),
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      },
      grammarVisualImageObject(topic, idioma, nivel),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
          { '@type': 'ListItem', position: 2, name: language.label, item: `https://www.idiomaswl.com/practica/${idioma}` },
          { '@type': 'ListItem', position: 3, name: levelLabel, item: `https://www.idiomaswl.com${basePath}` },
          { '@type': 'ListItem', position: 4, name: `Gramática ${levelLabel}`, item: `https://www.idiomaswl.com${indexPath}` },
          { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div
        className={`${styles.page} gram-page`}
        style={{ '--grammar-accent': language.accent, '--grammar-deep': language.deep, '--grammar-soft': language.soft, '--topic-color': topic.color } as React.CSSProperties}
      >
        <div className={styles.wrap}>
          <Breadcrumb idioma={idioma} nivel={nivel} languageLabel={language.label} topic={topic} />

          <header className={styles.lessonHero}>
            <div className={styles.lessonHeroCopy}>
              <p className={styles.eyebrow}>{language.flag} Gramática {language.label} · {topic.category} · {levelLabel}</p>
              <h1>{topic.title}</h1>
              <p className={styles.lead}>{topic.lead}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#practica">Empezar práctica <span>→</span></a>
                <a className={styles.secondaryAction} href="#explicacion">Leer explicación</a>
              </div>
              <div className={styles.metrics} aria-label="Resumen de la lección">
                <span><b>{topic.practice.levels.length}</b> niveles</span>
                <span><b>{activityCount}</b> actividades</span>
                <span><b>{topic.outcomes.length}</b> objetivos</span>
              </div>
            </div>
            <aside className={styles.formulaCard}>
              <span>Regla central</span>
              <strong>{topic.guide.formula}</strong>
              <p>{topic.guide.goal}</p>
              <div><em>{language.native}</em><b>{levelLabel}</b></div>
            </aside>
          </header>

          <nav className={styles.lessonNav} aria-label="Contenido de la lección">
            <a href="#explicacion"><span>01</span> Explicación</a>
            <a href="#mapa"><span>02</span> Mapa visual</a>
            <a href="#practica"><span>03</span> Práctica</a>
            <a href={indexPath}><span>04</span> Más temas</a>
          </nav>

          <GrammarTopicVisual topic={topic} idioma={idioma} nivel={nivel} priority />

          <section className={styles.outcomes} aria-labelledby="lesson-outcomes-title">
            <div><span>Lo que vas a dominar</span><h2 id="lesson-outcomes-title">Una meta clara antes de practicar</h2></div>
            <ol>{topic.outcomes.map((outcome, index) => <li key={outcome}><span>{index + 1}</span><p>{outcome}</p></li>)}</ol>
          </section>

          <article id="explicacion" className={`${styles.seoArticle} seo-article`}>
            <span className="section-label">— Explicación del especialista</span>
            <h2 className="gram-h2">Aprende {topic.shortTitle}: guía para hispanohablantes</h2>
            <p className="article-lead">{topic.description}</p>
            {topic.seo.map((section) => (
              <section key={section.heading} className="article-section">
                <h2 className="gram-h2">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.table ? <GrammarTable rows={section.table} /> : null}
                {section.examples ? <ExampleStack rows={section.examples} /> : null}
              </section>
            ))}
            <div className="article-section">
              <p>¿Tienes dudas sobre {topic.shortTitle} o quieres practicarlo en clase con retroalimentación personalizada?{' '}<a href={`https://wa.me/573005004253?text=${waText}`} rel="nofollow" style={{ color: topic.color, fontWeight: 800, textDecoration: 'none' }}>Escríbele al equipo de Idiomas WeLearn por WhatsApp</a>{' '}y te orientamos.</p>
            </div>
            <footer className={styles.author}><span>✍</span><p>Escrito por el <strong>Equipo Idiomas WeLearn</strong> · Gramática {language.adjective} {levelLabel} para hispanohablantes</p></footer>
          </article>

          <section id="mapa" className={styles.practiceShell} aria-label={`Mapa y práctica de ${topic.shortTitle}`}>
            <GrammarTopicClient topic={topic} idioma={idioma} nivel={nivel} relatedWritingExercises={relatedWritingExercises} />
          </section>

          <aside className={styles.conversion}>
            <div><span>Siguiente paso</span><h2>Convierte esta lección en uso real</h2><p>Continúa con el siguiente tema o recibe orientación para organizar una ruta de estudio según tu nivel.</p></div>
            <div><Link href={indexPath}>Ver la ruta completa</Link><Link href="/nivel-radar">Descubrir mi nivel</Link></div>
          </aside>

          <TopicNav idioma={idioma} nivel={nivel} slug={topic.slug} indexLabel={`Gramática ${levelLabel}`} />
        </div>
      </div>
    </>
  )
}

function Breadcrumb({ idioma, nivel, languageLabel, topic, english = false }: { idioma: GrammarLanguage; nivel: GrammarLevel; languageLabel: string; topic?: GrammarTopic; english?: boolean }) {
  const levelLabel = nivel.toUpperCase()
  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      <Link href="/practica">{english ? 'Practice' : 'Práctica'}</Link><span>/</span>
      <Link href={`/practica/${idioma}`}>{languageLabel}</Link><span>/</span>
      <Link href={`/practica/${idioma}/${nivel}`}>{levelLabel}</Link><span>/</span>
      {topic ? <><Link href={`/practica/${idioma}/${nivel}/gramatica`}>{english ? 'Grammar' : 'Gramática'}</Link><span>/</span><strong>{topic.shortTitle}</strong></> : <strong>{english ? 'Grammar' : 'Gramática'}</strong>}
    </nav>
  )
}

function GrammarTable({ rows }: { rows: string[][] }) {
  return (
    <div className="grammar-table" style={{ marginTop: '1rem' }}>
      {rows.map((row, rowIndex) => (
        <div key={`${rowIndex}-${row.join('|')}`} className={`grammar-table__row${rowIndex === 0 ? ' is-head' : ''}`} style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0,1fr))` }}>
          {row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}
        </div>
      ))}
    </div>
  )
}

function ExampleStack({ rows }: { rows: string[][] }) {
  return <div className="example-stack">{rows.map((row, rowIndex) => <div key={`${rowIndex}-${row.join('|')}`} style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0,1fr))` }}>{row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}</div>)}</div>
}

function groupTopics(topics: GrammarTopic[]): Array<[string, GrammarTopic[]]> {
  const groups = new Map<string, GrammarTopic[]>()
  topics.forEach((topic) => groups.set(topic.category, [...(groups.get(topic.category) ?? []), topic]))
  return Array.from(groups.entries())
}

function countPracticeActivities(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}
