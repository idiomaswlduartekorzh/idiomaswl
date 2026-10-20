'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { GrammarTopic } from '@/data/grammar/types'
import { getKoreanGrammarResource, type KoreanGrammarLevel } from '@/data/korean-grammar-preview'
import GrammarTopicClient from '@/components/grammar/GrammarTopicClient'
import styles from './KoreanGrammarLesson.module.css'

type RelatedWritingExercise = { id: string; sequence: number; title: string; genre: string }
type SectionId = 'comprender' | 'mapa' | 'ejemplos' | 'practica' | 'recursos'

const SECTIONS: Array<{ id: SectionId; number: string; label: string }> = [
  { id: 'comprender', number: '01', label: 'Comprender' },
  { id: 'mapa', number: '02', label: 'Mapa visual' },
  { id: 'ejemplos', number: '03', label: 'Paso a paso' },
  { id: 'practica', number: '04', label: 'Práctica' },
  { id: 'recursos', number: '05', label: 'Recursos' },
]

export default function KoreanGrammarLesson({
  topic,
  level,
  relatedWritingExercises,
}: {
  topic: GrammarTopic
  level: KoreanGrammarLevel
  relatedWritingExercises: RelatedWritingExercise[]
}) {
  const resource = getKoreanGrammarResource(topic, level)
  const [active, setActive] = useState<SectionId>('comprender')
  const formulaParts = splitFormula(topic.guide.formula)
  const model = splitModel(topic.guide.model)
  const hasFinalResources = Boolean(resource.pdf && resource.audioTracks?.length)
  const practiceActivityCount = countPracticeActivities(topic)

  function selectSection(id: SectionId) {
    setActive(id)
    requestAnimationFrame(() => {
      document.getElementById('korean-grammar-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <section className={styles.lesson} aria-labelledby="korean-grammar-title">
      <div className={styles.previewFlag}><span>{hasFinalResources ? 'Página completa' : 'Página renovada'}</span> {hasFinalResources ? 'Audio coreano nativo y PDF listos' : 'Contenido, práctica y diseño listos · audio reservado para la fase final'}</div>
      <div className={styles.track} aria-label={`Ruta de gramática coreana ${level.toUpperCase()}`}>
        <span>Hangul</span><b>→</b><strong>Gramática</strong><b>→</b><span>Comprensión</span><b>→</b><span>Producción</span>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Coreano · {topic.category} · {level.toUpperCase()}</p>
          <h1 id="korean-grammar-title">{topic.shortTitle}</h1>
          <p className={styles.lead}>{topic.lead}</p>
          <div className={styles.heroActions}>
            <button type="button" onClick={() => selectSection('practica')}>Empezar práctica <span>→</span></button>
            <button type="button" className={styles.secondary} onClick={() => selectSection('mapa')}>Ver mapa visual</button>
          </div>
          <div className={styles.metrics}>
            <span><b>{topic.practice.levels.length}</b> niveles listos</span>
            <span><b>{practiceActivityCount}</b> actividades</span>
            <span><b>{resource.studyMinutes}</b> min</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image src={resource.image} alt={resource.imageAlt} fill sizes="(max-width: 820px) 100vw, 44vw" priority />
          <div className={styles.heroShade} />
          <span className={styles.heroGlyph} lang="ko">{resource.glyph}</span>
          <p>{topic.guide.goal}</p>
        </div>
      </header>

      <nav id="korean-grammar-nav" className={styles.tabs} aria-label="Contenido de la lección">
        {SECTIONS.map((section) => (
          <button key={section.id} type="button" className={active === section.id ? styles.active : ''} onClick={() => setActive(section.id)}>
            <span>{section.number}</span>{section.label}
          </button>
        ))}
      </nav>

      <div className={styles.panel}>
        {active === 'comprender' ? (
          <article className={styles.article}>
            <SectionIntro kicker="Explicación del profesor" title={topic.title} copy={topic.description} />
            <div className={styles.outcomeGrid}>
              {topic.outcomes.map((outcome, index) => <div key={outcome}><span>{index + 1}</span><p>{outcome}</p></div>)}
            </div>
            {topic.seo.map((section) => (
              <section key={section.heading} className={styles.explainBlock}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.table ? <ReferenceTable rows={section.table} /> : null}
                {section.examples ? <div className={styles.exampleRows}>{section.examples.map((row, rowIndex) => <div key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}</div>)}</div> : null}
              </section>
            ))}
          </article>
        ) : null}

        {active === 'mapa' ? (
          <section className={styles.visualSection} aria-labelledby="visual-title">
            <SectionIntro kicker="Laboratorio visual" title="La regla de una sola mirada" copy={topic.visual.teacherLens} titleId="visual-title" />
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
                  <strong lang="ko">{pattern}</strong><span>→</span><p>{meaning}</p>
                </div>
              ))}
            </div>
            <ReferenceTable rows={topic.guide.table} />
            <div className={styles.modeRow}>{topic.visual.learnerModes.map((mode) => <span key={mode}>{modeLabel(mode)}</span>)}</div>
          </section>
        ) : null}

        {active === 'ejemplos' ? (
          <section className={styles.steps} aria-labelledby="steps-title">
            <SectionIntro kicker="Razonamiento guiado" title="Cómo decidir sin traducir palabra por palabra" titleId="steps-title" />
            <div className={styles.modelHeader}>
              <p>Modelo central de la lección</p>
              <span>{hasFinalResources ? 'Audio · listo' : 'Audio · fase final'}</span>
            </div>
            <div className={styles.modelCard}>
              <span>Modelo</span><strong lang="ko">{model.korean}</strong>{model.translation ? <p>{model.translation}</p> : null}
            </div>
            <ol className={styles.stepList}>
              {topic.guide.decisions.map((decision, index) => <li key={decision}><span>{index + 1}</span><p>{decision}</p></li>)}
            </ol>
            {resource.audioTracks ? <AudioShelf tracks={resource.audioTracks} /> : null}
            <div className={styles.warningBox}>
              <h3>Errores típicos de hispanohablantes</h3>
              {topic.guide.mistakes.map((mistake) => <p key={mistake}><span>×</span>{mistake}</p>)}
            </div>
          </section>
        ) : null}

        {active === 'practica' ? (
          <section className={styles.practice} aria-labelledby="practice-title">
            <SectionIntro kicker="Práctica progresiva" title="De reconocer a producir" copy="Supera el 65 % para avanzar. Tus mejores resultados quedan guardados en este dispositivo." titleId="practice-title" />
            <GrammarTopicClient topic={topic} idioma="coreano" nivel={level} relatedWritingExercises={relatedWritingExercises} mode="practiceOnly" />
          </section>
        ) : null}

        {active === 'recursos' ? (
          <section className={styles.resources} aria-labelledby="resources-title">
            <SectionIntro kicker="Biblioteca de estudio" title={hasFinalResources ? 'Material listo para estudiar' : 'Recursos de cierre'} copy={hasFinalResources ? `Descarga el cuaderno y usa las ${resource.audioTracks?.length ?? 0} pistas nativas dentro de la lección o fuera de línea.` : 'El contenido y la práctica ya están listos. Los audios nativos y archivos descargables se producirán juntos en la fase final.'} titleId="resources-title" />
            <div className={styles.resourceGrid}>
              <ResourceCard code="PDF" title="Guía y cuaderno" copy={`Explicación, mapa visual, ${practiceActivityCount} actividades y soluciones.`} href={resource.pdf} />
              <ResourceCard code="PNG" title="Mapa visual" copy="Fórmula, modelo y errores clave." />
              <ResourceCard code="음성" title="Audio coreano nativo" copy={resource.audioTracks ? `${resource.audioTracks.length} pistas Chatterbox con voz y ritmo aprobados.` : 'Chatterbox con la voz y el ritmo ya aprobados.'} final={!resource.audioTracks} />
            </div>
            {resource.audioTracks ? <AudioDownloads tracks={resource.audioTracks} /> : null}
            <div className={styles.studyPlan}>
              <h3>Ruta de estudio recomendada</h3>
              <ol><li><b>5 min</b> Comprende la intención.</li><li><b>7 min</b> Reconstruye el mapa.</li><li><b>15 min</b> Completa dos niveles.</li><li><b>5 min</b> Produce tres frases propias.</li></ol>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  )
}

function SectionIntro({ kicker, title, copy, titleId }: { kicker: string; title: string; copy?: string; titleId?: string }) {
  return <div className={styles.sectionIntro}><div><span>{kicker}</span><h2 id={titleId}>{title}</h2></div>{copy ? <p>{copy}</p> : null}</div>
}

function ReferenceTable({ rows }: { rows: string[][] }) {
  if (rows.length === 0) return null
  return <div className={styles.tableWrap} role="region" aria-label="Tabla de referencia" tabIndex={0}><table><thead><tr>{rows[0].map((cell, index) => <th key={`${index}-${cell}`}>{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function ResourceCard({ code, title, copy, final = false, href }: { code: string; title: string; copy: string; final?: boolean; href?: string }) {
  return <div><span className={styles.resourceIcon}>{code}</span><div><strong>{title}</strong><p>{copy}</p>{href ? <a className="korean-resource-action" href={href} download>Descargar PDF</a> : <em>{final ? 'Se produce al final' : 'Incluido en la lección'}</em>}</div></div>
}

function AudioShelf({ tracks }: { tracks: NonNullable<ReturnType<typeof getKoreanGrammarResource>['audioTracks']> }) {
  return <section className="korean-audio-shelf" aria-labelledby="korean-audio-title"><div className="korean-audio-heading"><span>Escucha y repite</span><h3 id="korean-audio-title">Pronunciación coreana nativa</h3><p>Escucha, señala cada bloque y repite con la voz.</p></div><div className="korean-audio-grid">{tracks.map((track, index) => <article className="korean-audio-card" key={track.id}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{track.title}</strong><p lang="ko">{track.text}</p><small>{track.translation}</small><audio controls preload="metadata" src={track.src}>Tu navegador no puede reproducir este audio.</audio></div></article>)}</div></section>
}

function AudioDownloads({ tracks }: { tracks: NonNullable<ReturnType<typeof getKoreanGrammarResource>['audioTracks']> }) {
  return <div className="korean-audio-downloads"><h3>Descargar pistas</h3><div>{tracks.map((track, index) => <a key={track.id} href={track.src} download><span>{String(index + 1).padStart(2, '0')}</span><strong>{track.title}</strong><em>M4A · voz coreana</em></a>)}</div></div>
}

function splitFormula(formula: string): string[] {
  return formula.split(/\s*(?:\||→|\+)\s*/u).map((part) => part.trim()).filter(Boolean)
}

function splitModel(model: string): { korean: string; translation?: string } {
  const firstModel = model.split(/\s+\/\s+/u)[0].trim()
  const translation = firstModel.match(/\(([^)]+)\)/u)?.[1]
  return { korean: firstModel.replace(/\s*\([^)]*\)\s*/gu, '').trim(), translation }
}

function modeLabel(mode: string): string {
  return ({ reading: 'lectura', choosing: 'elección', typing: 'escritura' } as Record<string, string>)[mode] ?? mode
}

function countPracticeActivities(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') {
      return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    }
    if (level.type === 'choice' || level.type === 'write') {
      return total + level.items.length
    }
    return total + level.blanks.length
  }, 0)
}
