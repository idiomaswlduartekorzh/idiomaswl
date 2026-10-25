'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import { getEnglishGrammarResource, isAdvancedPilot, type EnglishGrammarLevel } from '@/data/english-grammar-preview'
import GrammarTopicClient from '@/components/grammar/GrammarTopicClient'
import GrammarTopicVisual from '@/components/grammar/GrammarTopicVisual'
import { protectedMaterialHref } from '@/lib/material-download'
import styles from './KoreanGrammarLesson.module.css'
import englishStyles from './EnglishGrammarLesson.module.css'

type RelatedWritingExercise = { id: string; sequence: number; title: string; genre: string }
type SectionId = 'comprender' | 'mapa' | 'ejemplos' | 'practica' | 'recursos'

const SECTIONS: Array<{ id: SectionId; number: string; label: string }> = [
  { id: 'comprender', number: '01', label: 'Comprender' },
  { id: 'mapa', number: '02', label: 'Mapa visual' },
  { id: 'ejemplos', number: '03', label: 'Paso a paso' },
  { id: 'practica', number: '04', label: 'Práctica' },
  { id: 'recursos', number: '05', label: 'Recursos' },
]

const ADVANCED_SECTIONS: Array<{ id: SectionId; number: string; label: string }> = [
  { id: 'comprender', number: '01', label: 'Understand' },
  { id: 'mapa', number: '02', label: 'Visual map' },
  { id: 'ejemplos', number: '03', label: 'Step by step' },
  { id: 'practica', number: '04', label: 'Practice' },
  { id: 'recursos', number: '05', label: 'Resources' },
]

export default function EnglishGrammarLesson({
  topic,
  level,
  relatedWritingExercises,
}: {
  topic: GrammarTopic
  level: EnglishGrammarLevel
  relatedWritingExercises: RelatedWritingExercise[]
}) {
  const resource = getEnglishGrammarResource(topic, level)
  const advancedPilot = isAdvancedPilot(level)
  const english = advancedPilot
  const sections = english ? ADVANCED_SECTIONS : SECTIONS
  const [active, setActive] = useState<SectionId>('comprender')
  const formulaParts = splitFormula(topic.guide.formula)
  const practiceActivityCount = countPracticeActivities(topic)

  function selectSection(id: SectionId) {
    setActive(id)
    requestAnimationFrame(() => {
      document.getElementById('english-grammar-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.querySelector<HTMLButtonElement>(`[data-english-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    })
  }

  return (
    <section
      className={styles.lesson}
      style={{ '--kr-blue': '#012169', '--kr-red': '#c8102e', '--kr-cream': '#f5f2ea' } as React.CSSProperties}
      aria-labelledby="english-grammar-title"
    >
      <div className={styles.previewFlag}><span>{advancedPilot ? 'Advanced pilot' : 'Página completa'}</span> {advancedPilot ? 'Infographic, PDF and practice ready' : 'Audio inglés nativo, PDF y práctica listos'}</div>
      <div className={styles.track} aria-label={english ? `English grammar route ${level.toUpperCase()}` : `Ruta de gramática inglesa ${level.toUpperCase()}`}>
        <span>{english ? 'Foundations' : 'Fundamentos'}</span><b>→</b><strong>{english ? 'Grammar' : 'Gramática'}</strong><b>→</b><span>{english ? 'Real use' : 'Uso real'}</span><b>→</b><span>{english ? 'Production' : 'Producción'}</span>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{english ? 'English' : 'Inglés'} · {topic.category} · {level.toUpperCase()}</p>
          <h1 id="english-grammar-title">{topic.shortTitle}</h1>
          <p className={styles.lead}>{topic.lead}</p>
          <div className={styles.heroActions}>
            <button type="button" onClick={() => selectSection('practica')}>{english ? 'Start practice' : 'Empezar práctica'} <span>→</span></button>
            <button type="button" className={styles.secondary} onClick={() => selectSection('mapa')}>{english ? 'View visual map' : 'Ver mapa visual'}</button>
          </div>
          <div className={styles.metrics}>
            <span><b>{topic.practice.levels.length}</b> {english ? 'stages' : 'niveles'}</span>
            <span><b>{practiceActivityCount}</b> {english ? 'activities' : 'actividades'}</span>
            <span><b>{resource.studyMinutes}</b> min</span>
          </div>
        </div>
        <div className={styles.heroVisual} aria-label={english ? `Visual map for ${topic.shortTitle}` : 'Mapa visual de pronombres ingleses'}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 25% 20%, #ffffff 0 2%, transparent 2.4%), linear-gradient(145deg, #eef3ff 0%, #d8e3fb 48%, #b7c9ee 100%)' }} />
          <div style={{ position: 'absolute', inset: '12% 9% 24%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(.55rem, 2vw, 1rem)', transform: 'rotate(-2deg)' }}>
            {heroWords(topic).map((word, index) => (
              <span key={word} style={{ display: 'grid', placeItems: 'center', borderRadius: 18, background: index === 0 ? '#012169' : index === 3 ? '#c8102e' : 'rgba(255,255,255,.92)', color: index === 0 || index === 3 ? '#fff' : '#012169', fontWeight: 950, fontSize: 'clamp(1.05rem, 2.8vw, 2.1rem)', boxShadow: '0 14px 28px rgba(1,33,105,.14)', border: '1px solid rgba(255,255,255,.8)' }}>{word}</span>
            ))}
          </div>
          <div className={styles.heroShade} />
          <span className={styles.heroGlyph}>EN</span>
          <p>{topic.guide.goal}</p>
        </div>
      </header>

      <GrammarTopicVisual topic={topic} idioma="ingles" nivel={level} uiLanguage={english ? 'en' : 'es'} />

      <nav id="english-grammar-nav" className={styles.tabs} aria-label={english ? 'Lesson content' : 'Contenido de la lección'}>
        {sections.map((section) => (
          <button key={section.id} type="button" data-english-section={section.id} className={active === section.id ? styles.active : ''} onClick={() => selectSection(section.id)}>
            <span>{section.number}</span>{section.label}
          </button>
        ))}
      </nav>

      <div className={styles.panel}>
        {active === 'comprender' ? (
          <article className={styles.article}>
            <SectionIntro kicker={english ? 'Teacher explanation' : 'Explicación del profesor'} title={topic.title} copy={topic.description} />
            <div className={styles.outcomeGrid}>
              {topic.outcomes.map((outcome, index) => <div key={outcome}><span>{index + 1}</span><p>{outcome}</p></div>)}
            </div>
            {topic.seo.map((section) => (
              <section key={section.heading} className={styles.explainBlock}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.table ? <ReferenceTable rows={section.table} uiLanguage={english ? 'en' : 'es'} /> : null}
                {section.examples ? <div className={styles.exampleRows}>{section.examples.map((row, rowIndex) => <div key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}</div>)}</div> : null}
              </section>
            ))}
          </article>
        ) : null}

        {active === 'mapa' ? (
          <section className={styles.visualSection} aria-labelledby="visual-title">
            <SectionIntro kicker={english ? 'Visual lab' : 'Laboratorio visual'} title={english ? 'The rule at a glance' : 'La regla de una sola mirada'} copy={topic.visual.teacherLens} titleId="visual-title" />
            <div className={styles.formula} aria-label={`${english ? 'Formula' : 'Fórmula'}: ${topic.guide.formula}`}>
              {formulaParts.map((part, index) => (
                <div key={`${part}-${index}`} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><b>{part}</b></div>
              ))}
            </div>
            {topic.slug === 'inversion-emphasis-c1' ? (
              <div className={englishStyles.mapGuide}>
                <div>
                  <span>HOW TO READ THE MAP</span>
                  <h3>Use it as a decision path, not as a sentence to memorise</h3>
                  <p>Begin with the neutral sentence and preserve its meaning. The opener changes position, the auxiliary carries the tense, and the main verb keeps the form required by that auxiliary.</p>
                  <ol>
                    {topic.guide.decisions.map((decision, index) => <li key={decision}><b>{index + 1}</b><span>{decision}</span></li>)}
                  </ol>
                </div>
                <aside aria-label="Worked example of emphatic inversion">
                  <span>WORKED EXAMPLE</span>
                  <p><small>Neutral</small>We understood the risk only after the audit.</p>
                  <p><small>Front the restriction</small>Only after the audit...</p>
                  <p><small>Recover the tense</small>past simple → <b>did</b> + base verb</p>
                  <p className={englishStyles.mapResult}><small>Final sentence</small>Only after the audit <b>did we understand</b> the risk.</p>
                  <em>Effect: the delayed moment of understanding becomes the focus.</em>
                </aside>
              </div>
            ) : null}
            <div className={styles.sceneGrid}>
              {topic.visual.scene.map(([pattern, meaning], index) => (
                <div key={pattern} style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}><strong lang="en">{pattern}</strong><span>→</span><p>{meaning}</p></div>
              ))}
            </div>
            <ReferenceTable rows={topic.guide.table} uiLanguage={english ? 'en' : 'es'} />
            <div className={styles.modeRow}>{topic.visual.learnerModes.map((mode) => <span key={mode}>{mode}</span>)}</div>
          </section>
        ) : null}

        {active === 'ejemplos' ? (
          <section className={styles.steps} aria-labelledby="steps-title">
            <SectionIntro kicker={english ? 'Guided reasoning' : 'Razonamiento guiado'} title={english ? 'How to decide without translating word for word' : 'Cómo decidir sin traducir palabra por palabra'} titleId="steps-title" />
            <div className={styles.modelHeader}><p>{english ? 'Core lesson model' : 'Modelo central de la lección'}</p><span>{advancedPilot ? 'Pattern · contrast · use' : 'Audio · listo'}</span></div>
            <div className={styles.modelCard}><span>{english ? 'Model' : 'Modelo'}</span><strong lang="en">{topic.guide.model}</strong></div>
            <ol className={styles.stepList}>{topic.guide.decisions.map((decision, index) => <li key={decision}><span>{index + 1}</span><p>{decision}</p></li>)}</ol>
            {resource.audioTracks.length ? <AudioShelf tracks={resource.audioTracks} /> : null}
            <div className={styles.warningBox}><h3>{english ? 'Common learner errors' : 'Errores típicos de hispanohablantes'}</h3>{topic.guide.mistakes.map((mistake) => <p key={mistake}><span>×</span>{mistake}</p>)}</div>
          </section>
        ) : null}

        {active === 'practica' ? (
          <section className={styles.practice} aria-labelledby="practice-title">
            <SectionIntro kicker={english ? 'Progressive practice' : 'Práctica progresiva'} title={english ? 'From recognition to production' : 'De reconocer a producir'} copy={english ? 'Score at least 65% to continue. Every stage combines context, correction and original production.' : 'Supera el 65 % para avanzar. Cada nivel combina contexto, corrección y producción propia.'} titleId="practice-title" />
            <GrammarTopicClient topic={topic} idioma="ingles" nivel={level} relatedWritingExercises={relatedWritingExercises} mode="practiceOnly" uiLanguage={english ? 'en' : 'es'} />
          </section>
        ) : null}

        {active === 'recursos' ? (
          <section className={styles.resources} aria-labelledby="resources-title">
            <SectionIntro kicker={english ? 'Study library' : 'Biblioteca de estudio'} title={english ? 'Study materials ready to use' : 'Material listo para estudiar'} copy={resource.audioTracks.length ? `Descarga el cuaderno y usa las ${resource.audioTracks.length} pistas nativas dentro de la lección o fuera de línea.` : (english ? 'Download the printable workbook and keep the infographic as a quick reference for this topic.' : 'Descarga el cuaderno imprimible y conserva la infografía como referencia rápida del tema.')} titleId="resources-title" />
            <div className={styles.resourceGrid}>
              <ResourceCard code="WEB" title={english ? 'Interactive lesson' : 'Lección interactiva'} copy={english ? `${topic.practice.levels.length} stages and ${practiceActivityCount} activities already integrated.` : `${topic.practice.levels.length} niveles y ${practiceActivityCount} actividades ya integradas.`} status={english ? 'Ready to review' : 'Lista para revisar'} />
              <ResourceCard code="PDF" title={english ? 'Complete guide' : 'Guía y cuaderno'} copy={english ? 'Full explanation, guided visual map, practice and answer key in one editorial workbook.' : 'Explicación, mapa, práctica y soluciones con la misma jerarquía visual.'} status={english ? 'Download complete PDF' : 'Descargar PDF'} href={resource.pdf} />
              {resource.exercisesPdf ? <ResourceCard code="WORK" title="Exercises only" copy={`${practiceActivityCount} learning decisions organised for printing, classroom use or independent practice.`} status="Download exercises" href={resource.exercisesPdf} /> : null}
              {resource.answerKeyPdf ? <ResourceCard code="KEY" title="Answer key" copy="Model answers with a concise explanation of the grammar decision behind each response." status="Download answer key" href={resource.answerKeyPdf} /> : null}
              {resource.audioTracks.length ? <ResourceCard code="AUDIO" title="Inglés nativo" copy="Tres modelos con pronunciación clara y ritmo natural." status="3 pistas listas" /> : <ResourceCard code="MAP" title={english ? 'Topic infographic' : 'Infografía del tema'} copy={english ? 'Rule, contrast and examples organised for quick review.' : 'Regla, contraste y ejemplos organizados para repasar de una sola mirada.'} status={english ? 'Included in the lesson' : 'Incluida en la lección'} />}
            </div>
            {resource.audioTracks.length ? <AudioDownloads tracks={resource.audioTracks} /> : null}
            <div className={styles.studyPlan}>
              <h3>{english ? 'Recommended study route' : 'Ruta de estudio recomendada'}</h3>
              <ol><li><b>5 min</b> {english ? 'Understand the communicative purpose.' : 'Comprende la intención.'}</li><li><b>7 min</b> {english ? 'Rebuild the visual map.' : 'Reconstruye el mapa.'}</li><li><b>15 min</b> {english ? 'Complete two practice stages.' : 'Completa dos niveles.'}</li><li><b>5 min</b> {english ? 'Produce three original sentences.' : 'Produce tres frases propias.'}</li></ol>
            </div>
          </section>
        ) : null}
      </div>
      <aside className="english-conversion" aria-label={english ? 'Next step in your English learning' : 'Siguiente paso para aprender inglés'}>
        <div><span>{english ? 'Would you like a route built around your level?' : '¿Quieres una ruta hecha para ti?'}</span><h2>{english ? 'Turn this practice into measurable progress' : 'Convierte esta práctica en progreso medible'}</h2><p>{english ? 'Check your level and get guidance on the course that best fits your goals.' : 'Descubre tu nivel y recibe orientación para elegir el curso que mejor encaja contigo.'}</p></div>
        <div><Link href="/nivel-radar" data-english-cta="level-test">{english ? 'Check my level' : 'Descubrir mi nivel gratis'}</Link><Link href="/clases-de-ingles" data-english-cta="classes">{english ? 'View English lessons' : 'Ver clases de inglés'}</Link></div>
      </aside>
    </section>
  )
}

function SectionIntro({ kicker, title, copy, titleId }: { kicker: string; title: string; copy?: string; titleId?: string }) {
  return <div className={styles.sectionIntro}><div><span>{kicker}</span><h2 id={titleId}>{title}</h2></div>{copy ? <p>{copy}</p> : null}</div>
}

function ReferenceTable({ rows, uiLanguage = 'es' }: { rows: string[][]; uiLanguage?: 'es' | 'en' }) {
  if (rows.length === 0) return null
  return <div className={styles.tableWrap} role="region" aria-label={uiLanguage === 'en' ? 'Reference table' : 'Tabla de referencia'} tabIndex={0}><table><thead><tr>{rows[0].map((cell, index) => <th key={`${index}-${cell}`}>{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function ResourceCard({ code, title, copy, status, href }: { code: string; title: string; copy: string; status: string; href?: string }) {
  return <div><span className={styles.resourceIcon}>{code}</span><div><strong>{title}</strong><p>{copy}</p>{href ? <a className="korean-resource-action" href={protectedMaterialHref(href)} download>{status}</a> : <em>{status}</em>}</div></div>
}

function AudioShelf({ tracks }: { tracks: ReturnType<typeof getEnglishGrammarResource>['audioTracks'] }) {
  return <section className="korean-audio-shelf" aria-labelledby="english-audio-title"><div className="korean-audio-heading"><span>Listen and repeat</span><h3 id="english-audio-title">Pronunciación inglesa nativa</h3><p>Escucha el modelo completo y repítelo conservando ritmo y entonación.</p></div><div className="korean-audio-grid">{tracks.map((track, index) => <article className="korean-audio-card" key={track.id}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{track.title}</strong><p lang="en">{track.text}</p><small>{track.translation}</small><audio controls preload="metadata" src={track.src}>Tu navegador no puede reproducir este audio.</audio></div></article>)}</div></section>
}

function AudioDownloads({ tracks }: { tracks: ReturnType<typeof getEnglishGrammarResource>['audioTracks'] }) {
  return <div className="korean-audio-downloads"><h3>Descargar pistas</h3><div>{tracks.map((track, index) => <a key={track.id} href={protectedMaterialHref(track.src)} download><span>{String(index + 1).padStart(2, '0')}</span><strong>{track.title}</strong><em>M4A · voz inglesa</em></a>)}</div></div>
}

function splitFormula(formula: string): string[] {
  return formula.split(/\s*(?:\||→|\+)\s*/u).map((part) => part.trim()).filter(Boolean)
}

function heroWords(topic: GrammarTopic): string[] {
  const words = topic.visual.scene.flatMap(([left, right]) => [left, right]).filter(Boolean)
  return Array.from(new Set(words)).slice(0, 4).concat(['I', 'you', 'we', 'they']).slice(0, 4)
}

function countPracticeActivities(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}
