'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { GrammarTopic } from '@/data/grammar/types'
import { getJapaneseGrammarResource } from '@/data/japanese-grammar-a1'
import GrammarTopicClient from '@/components/grammar/GrammarTopicClient'
import styles from './JapaneseGrammarLesson.module.css'

type RelatedWritingExercise = {
  id: string
  sequence: number
  title: string
  genre: string
}

type SectionId = 'comprender' | 'mapa' | 'ejemplos' | 'practica' | 'recursos'

const sections: Array<{ id: SectionId; number: string; label: string }> = [
  { id: 'comprender', number: '01', label: 'Comprender' },
  { id: 'mapa', number: '02', label: 'Mapa visual' },
  { id: 'ejemplos', number: '03', label: 'Paso a paso' },
  { id: 'practica', number: '04', label: 'Práctica' },
  { id: 'recursos', number: '05', label: 'Recursos' },
]

function splitFormula(formula: string): string[] {
  return formula.split(/\s*(?:\||→|\+)\s*/u).map((part) => part.trim()).filter(Boolean)
}

export default function JapaneseGrammarLesson({
  topic,
  relatedWritingExercises,
}: {
  topic: GrammarTopic
  relatedWritingExercises: RelatedWritingExercise[]
}) {
  const resource = getJapaneseGrammarResource(topic.slug)
  const [active, setActive] = useState<SectionId>('comprender')
  const [playing, setPlaying] = useState(false)
  const formulaParts = useMemo(() => splitFormula(topic.guide.formula), [topic.guide.formula])

  if (!resource) return null
  const audioResource = resource

  function selectSection(id: SectionId) {
    setActive(id)
    requestAnimationFrame(() => {
      document.getElementById('japanese-grammar-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  async function playModel() {
    if (playing) return
    setPlaying(true)
    let fallbackStarted = false
    const playBrowserVoice = () => {
      if (fallbackStarted) return
      fallbackStarted = true
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(audioResource.audioText)
        utterance.lang = 'ja-JP'
        utterance.rate = 0.78
        utterance.onend = () => setPlaying(false)
        utterance.onerror = () => setPlaying(false)
        window.speechSynthesis.speak(utterance)
      } else {
        setPlaying(false)
      }
    }
    const audio = new Audio(audioResource.audio)
    audio.onended = () => setPlaying(false)
    audio.onerror = playBrowserVoice
    try {
      await audio.play()
    } catch {
      playBrowserVoice()
    }
  }

  const pdf = `/downloads/japanese-a1/grammar/idiomaswl-${topic.slug}-a1.pdf`
  const map = `/downloads/japanese-a1/grammar/idiomaswl-${topic.slug}-map.png`

  return (
    <section className={styles.lesson} aria-labelledby="japanese-grammar-title">
      <div className={styles.track} aria-label="Ruta de gramática japonesa A1">
        <span>Escritura</span><b>→</b><strong>Gramática</strong><b>→</b><span>Comprensión</span><b>→</b><span>Producción</span>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Japonés · {topic.category} · A1</p>
          <h1 id="japanese-grammar-title">{topic.shortTitle}</h1>
          <p className={styles.lead}>{topic.lead}</p>
          <div className={styles.heroActions}>
            <button type="button" onClick={() => selectSection('practica')}>Empezar práctica <span>→</span></button>
            <button type="button" className={styles.secondary} onClick={() => selectSection('comprender')}>Ver explicación</button>
          </div>
          <div className={styles.metrics}>
            <span><b>{topic.practice.levels.length}</b> niveles</span>
            <span><b>{resource.studyMinutes}</b> min</span>
            <span><b>PDF</b> incluido</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image src={resource.image} alt={resource.imageAlt} fill sizes="(max-width: 820px) 100vw, 44vw" priority />
          <div className={styles.heroShade} />
          <span className={styles.heroGlyph} lang="ja">{resource.glyph}</span>
          <p>{topic.guide.goal}</p>
        </div>
      </header>

      <nav id="japanese-grammar-nav" className={styles.tabs} aria-label="Contenido de la lección">
        {sections.map((section) => (
          <button key={section.id} type="button" className={active === section.id ? styles.active : ''} onClick={() => setActive(section.id)}>
            <span>{section.number}</span>{section.label}
          </button>
        ))}
      </nav>

      <div className={styles.panel}>
        {active === 'comprender' && (
          <article className={styles.article}>
            <div className={styles.sectionIntro}>
              <div><span>Explicación del profesor</span><h2>{topic.title}</h2></div>
              <p>{topic.description}</p>
            </div>
            <div className={styles.outcomeGrid}>
              {topic.outcomes.map((outcome, index) => <div key={outcome}><span>{index + 1}</span><p>{outcome}</p></div>)}
            </div>
            {topic.seo.map((section) => (
              <section key={section.heading} className={styles.explainBlock}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.table && <Table rows={section.table} />}
                {section.examples && <div className={styles.exampleRows}>{section.examples.map((row, rowIndex) => <div key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}</div>)}</div>}
              </section>
            ))}
          </article>
        )}

        {active === 'mapa' && (
          <section className={styles.visualSection} aria-labelledby="visual-title">
            <div className={styles.sectionIntro}>
              <div><span>Laboratorio visual</span><h2 id="visual-title">La regla de una sola mirada</h2></div>
              <p>{topic.visual.teacherLens}</p>
            </div>
            <div className={styles.formula} aria-label={`Fórmula: ${topic.guide.formula}`}>
              {formulaParts.map((part, index) => (
                <div key={`${part}-${index}`} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
                  <span>{String(index + 1).padStart(2, '0')}</span><b>{part}</b>
                </div>
              ))}
            </div>
            <div className={styles.sceneGrid}>
              {topic.visual.scene.map(([pattern, meaning], index) => (
                <div key={pattern} style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}>
                  <strong lang="ja">{pattern}</strong><span>→</span><p>{meaning}</p>
                </div>
              ))}
            </div>
            <Table rows={topic.guide.table} />
            <div className={styles.modeRow}>{topic.visual.learnerModes.map((mode) => <span key={mode}>{mode}</span>)}</div>
          </section>
        )}

        {active === 'ejemplos' && (
          <section className={styles.steps} aria-labelledby="steps-title">
            <div className={styles.sectionIntro}>
              <div><span>Razonamiento guiado</span><h2 id="steps-title">Cómo decidir sin traducir palabra por palabra</h2></div>
              <button type="button" className={styles.listen} onClick={playModel} disabled={playing} aria-label={`Escuchar ${resource.audioText}`}>
                <span aria-hidden>{playing ? '◼' : '▶'}</span>{playing ? 'Reproduciendo…' : 'Escuchar modelo'}
              </button>
            </div>
            <div className={styles.modelCard}>
              <span>Modelo</span><strong lang="ja">{topic.guide.model}</strong>
            </div>
            <ol className={styles.stepList}>
              {topic.guide.decisions.map((decision, index) => <li key={decision}><span>{index + 1}</span><p>{decision}</p></li>)}
            </ol>
            <div className={styles.warningBox}>
              <h3>Errores típicos de hispanohablantes</h3>
              {topic.guide.mistakes.map((mistake) => <p key={mistake}><span>×</span>{mistake}</p>)}
            </div>
          </section>
        )}

        {active === 'practica' && (
          <section className={styles.practice} aria-labelledby="practice-title">
            <div className={styles.sectionIntro}>
              <div><span>Práctica progresiva</span><h2 id="practice-title">De reconocer a producir</h2></div>
              <p>Supera el 65 % para avanzar. Tus mejores resultados quedan guardados en este dispositivo.</p>
            </div>
            <GrammarTopicClient topic={topic} idioma="japones" nivel="a1" relatedWritingExercises={relatedWritingExercises} mode="practiceOnly" />
          </section>
        )}

        {active === 'recursos' && (
          <section className={styles.resources} aria-labelledby="resources-title">
            <div className={styles.sectionIntro}>
              <div><span>Biblioteca descargable</span><h2 id="resources-title">Lleva la lección contigo</h2></div>
              <p>Material preparado para estudiar sin conexión, imprimir o repasar desde el teléfono.</p>
            </div>
            <div className={styles.resourceGrid}>
              <a href={pdf} download><span className={styles.resourceIcon}>PDF</span><div><strong>Guía y cuaderno de práctica</strong><p>Explicación, tabla, ejercicios y soluciones.</p><em>Descargar PDF →</em></div></a>
              <a href={map} download><span className={styles.resourceIcon}>PNG</span><div><strong>Mapa visual del tema</strong><p>La fórmula, el modelo y los errores clave.</p><em>Descargar imagen →</em></div></a>
              <a href={resource.audio} download><span className={styles.resourceIcon}>MP3</span><div><strong>Modelo de pronunciación</strong><p lang="ja">{resource.audioText}</p><em>Descargar audio →</em></div></a>
            </div>
            <div className={styles.studyPlan}>
              <h3>Ruta de estudio recomendada</h3>
              <ol><li><b>5 min</b> Lee la explicación sin memorizar.</li><li><b>7 min</b> Reconstruye el mapa visual de memoria.</li><li><b>15 min</b> Completa dos niveles de práctica.</li><li><b>5 min</b> Escribe tres frases propias y léelas en voz alta.</li></ol>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}

function Table({ rows }: { rows: string[][] }) {
  if (!rows.length) return null
  return (
    <div className={styles.tableWrap} role="region" aria-label="Tabla de referencia" tabIndex={0}>
      <table>
        <thead><tr>{rows[0].map((cell, cellIndex) => <th key={`${cellIndex}-${cell}`}>{cell}</th>)}</tr></thead>
        <tbody>{rows.slice(1).map((row, rowIndex) => <tr key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}
