'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import { getGermanGrammarResource, type GermanGrammarLevel } from '@/data/german-grammar-resources'
import GrammarTopicClient from '@/components/grammar/GrammarTopicClient'
import GrammarTopicVisual from '@/components/grammar/GrammarTopicVisual'
import { protectedMaterialHref } from '@/lib/material-download'
import styles from './KoreanGrammarLesson.module.css'

type SectionId = 'verstehen' | 'karte' | 'schritte' | 'uebungen' | 'materialien'
const sections: Array<{ id: SectionId; number: string; label: string }> = [
  { id: 'verstehen', number: '01', label: 'Verstehen' },
  { id: 'karte', number: '02', label: 'Visuelle Karte' },
  { id: 'schritte', number: '03', label: 'Schritt für Schritt' },
  { id: 'uebungen', number: '04', label: 'Übungen' },
  { id: 'materialien', number: '05', label: 'Materialien' },
]

export default function GermanGrammarLesson({ topic, level }: { topic: GrammarTopic; level: GermanGrammarLevel }) {
  const resource = getGermanGrammarResource(topic, level)
  const [active, setActive] = useState<SectionId>('verstehen')
  const formulaParts = topic.guide.formula.split(/\s*(?:\||→|\+)\s*/u).map((part) => part.trim()).filter(Boolean)
  const activityCount = countPracticeActivities(topic)

  function selectSection(id: SectionId) {
    setActive(id)
    requestAnimationFrame(() => {
      document.getElementById('german-grammar-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.querySelector<HTMLButtonElement>(`[data-german-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    })
  }

  return <section className={styles.lesson} style={{ '--kr-blue': '#171717', '--kr-red': '#D7A300', '--kr-cream': '#FFF7D6' } as React.CSSProperties} aria-labelledby="german-grammar-title">
    <div className={styles.previewFlag}><span>Vollständige fortgeschrittene Lektion</span> Visuelle Karte, drei PDFs und vertiefende Übungen</div>
    <div className={styles.track} aria-label={`Lernweg deutsche Grammatik ${level.toUpperCase()}`}><span>Erkennen</span><b>→</b><strong>Verstehen</strong><b>→</b><span>Umformen</span><b>→</b><span>Anwenden</span></div>

    <header className={styles.hero}><div className={styles.heroCopy}>
      <p className={styles.eyebrow}>Deutsch · {topic.category} · {level.toUpperCase()}</p>
      <h1 id="german-grammar-title">{topic.shortTitle}</h1><p className={styles.lead}>{topic.lead}</p>
      <div className={styles.heroActions}><button type="button" onClick={() => selectSection('uebungen')}>Übungen beginnen <span>→</span></button><button type="button" className={styles.secondary} onClick={() => selectSection('karte')}>Visuelle Karte ansehen</button></div>
      <div className={styles.metrics}><span><b>{topic.practice.levels.length}</b> Stufen</span><span><b>{activityCount}</b> Aufgaben</span><span><b>{resource.studyMinutes}</b> Min.</span></div>
    </div><div className={styles.heroVisual} aria-label={`Visuelle Karte zu ${topic.shortTitle}`}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 22% 18%, #fff 0 2%, transparent 2.4%), linear-gradient(145deg, #fffdf4 0%, #f5e9ad 48%, #e5ca57 100%)' }} />
      <div style={{ position: 'absolute', inset: '12% 9% 24%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(.55rem, 2vw, 1rem)', transform: 'rotate(-2deg)' }}>{heroWords(topic).map((word, index) => <span key={word} style={{ display: 'grid', placeItems: 'center', padding: '.5rem', textAlign: 'center', borderRadius: 18, background: index === 0 ? '#171717' : index === 3 ? '#D7A300' : 'rgba(255,255,255,.95)', color: index === 0 || index === 3 ? '#fff' : '#171717', fontWeight: 950, fontSize: 'clamp(.8rem, 1.8vw, 1.25rem)', boxShadow: '0 14px 28px rgba(23,23,23,.14)', border: '1px solid rgba(255,255,255,.8)' }}>{word}</span>)}</div>
      <div className={styles.heroShade} /><span className={styles.heroGlyph}>DE</span><p>{topic.guide.goal}</p>
    </div></header>

    <GrammarTopicVisual topic={topic} idioma="aleman" nivel={level} uiLanguage="de" />

    <nav id="german-grammar-nav" className={styles.tabs} aria-label="Inhalt der Lektion">{sections.map((section) => <button key={section.id} type="button" data-german-section={section.id} className={active === section.id ? styles.active : ''} onClick={() => selectSection(section.id)}><span>{section.number}</span>{section.label}</button>)}</nav>

    <div className={styles.panel}>
      {active === 'verstehen' ? <article className={styles.article}><SectionIntro kicker="Pädagogische Erklärung" title={topic.title} copy={topic.description} /><div className={styles.outcomeGrid}>{topic.outcomes.map((outcome, index) => <div key={outcome}><span>{index + 1}</span><p>{outcome}</p></div>)}</div>{topic.seo.map((section) => <section key={section.heading} className={styles.explainBlock}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.table ? <ReferenceTable rows={section.table} /> : null}{section.examples ? <div className={styles.exampleRows}>{section.examples.map((row, rowIndex) => <div key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}</div>)}</div> : null}</section>)}</article> : null}

      {active === 'karte' ? <section className={styles.visualSection} aria-labelledby="german-visual-title"><SectionIntro kicker="Visuelles Labor" title="Die Regel auf einen Blick" copy={topic.visual.teacherLens} titleId="german-visual-title" /><div className={styles.formula} aria-label={`Formel: ${topic.guide.formula}`}>{formulaParts.map((part, index) => <div key={`${part}-${index}`} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><b>{part}</b></div>)}</div><div className={styles.sceneGrid}>{topic.visual.scene.map(([pattern, meaning], index) => <div key={pattern} style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}><strong lang="de">{pattern}</strong><span>→</span><p>{meaning}</p></div>)}</div><ReferenceTable rows={topic.guide.table} /><div className={styles.modeRow}>{topic.visual.learnerModes.map((mode) => <span key={mode}>{mode}</span>)}</div></section> : null}

      {active === 'schritte' ? <section className={styles.steps} aria-labelledby="german-steps-title"><SectionIntro kicker="Gelenktes Denken" title="Entscheiden statt Wort für Wort übersetzen" titleId="german-steps-title" /><div className={styles.modelHeader}><p>Zentrales Modell der Lektion</p><span>Form · Kontrast · Verwendung</span></div><div className={styles.modelCard}><span>Modell</span><strong lang="de">{topic.guide.model}</strong></div><ol className={styles.stepList}>{topic.guide.decisions.map((decision, index) => <li key={decision}><span>{index + 1}</span><p>{decision}</p></li>)}</ol><div className={styles.warningBox}><h3>Häufige Fehler vermeiden</h3>{topic.guide.mistakes.map((mistake) => <p key={mistake}><span>×</span>{mistake}</p>)}</div></section> : null}

      {active === 'uebungen' ? <section className={styles.practice} aria-labelledby="german-practice-title"><SectionIntro kicker="Progressives Training" title="Vom Erkennen zur freien Anwendung" copy="Erreichen Sie mindestens 65 %, um fortzufahren. Jede Stufe verbindet Kontext, spätere Korrektur und eigene Produktion." titleId="german-practice-title" /><GrammarTopicClient topic={topic} idioma="aleman" nivel={level} relatedWritingExercises={[]} mode="practiceOnly" uiLanguage="de" /></section> : null}

      {active === 'materialien' ? <section className={styles.resources} aria-labelledby="german-resources-title"><SectionIntro kicker="Lernbibliothek" title="Drei Materialien für Unterricht und Selbststudium" copy="Laden Sie den vollständigen Kurs, das Übungsheft und den getrennten Lösungsschlüssel herunter. Audio folgt in einer späteren Phase." titleId="german-resources-title" /><div className={styles.resourceGrid}>
        <ResourceCard code="WEB" title="Interaktive Lektion" copy={`${topic.practice.levels.length} Stufen und ${activityCount} integrierte Aufgaben.`} status="Bereit zum Lernen" />
        <ResourceCard code="PDF" title="Vollständiger Kurs" copy="Ausführliche Erklärung, visuelle Karte, Beispiele, Übungen und Lösungen." status="Kurs herunterladen" href={resource.pdf} />
        <ResourceCard code="ÜB" title="Übungsheft" copy={`${activityCount} Lernentscheidungen, druckfreundlich geordnet.`} status="Übungen herunterladen" href={resource.exercisesPdf} />
        <ResourceCard code="LÖS" title="Lösungsschlüssel" copy="Musterlösungen mit knapper grammatischer Begründung." status="Lösungen herunterladen" href={resource.answerKeyPdf} />
      </div><div className={styles.studyPlan}><h3>Empfohlener Lernweg</h3><ol><li><b>10 Min.</b> Kommunikative Absicht verstehen.</li><li><b>10 Min.</b> Visuelle Karte rekonstruieren.</li><li><b>25 Min.</b> Vier Übungsstufen bearbeiten.</li><li><b>10 Min.</b> Drei eigene Beispiele schreiben und prüfen.</li></ol></div></section> : null}
    </div>

    <aside className="english-conversion" aria-label="Nächster Schritt beim Deutschlernen"><div><span>Sie möchten einen Lernweg für Ihr Niveau?</span><h2>Aus dieser Übung wird messbarer Fortschritt</h2><p>Bestimmen Sie Ihr Niveau und wählen Sie eine Begleitung, die zu Ihren Zielen passt.</p></div><div><Link href="/nivel-radar" data-german-cta="level-test">Niveau bestimmen</Link><Link href="/clases-de-aleman" data-german-cta="classes">Deutschkurse entdecken</Link></div></aside>
  </section>
}

function SectionIntro({ kicker, title, copy, titleId }: { kicker: string; title: string; copy?: string; titleId?: string }) { return <div className={styles.sectionIntro}><div><span>{kicker}</span><h2 id={titleId}>{title}</h2></div>{copy ? <p>{copy}</p> : null}</div> }
function ReferenceTable({ rows }: { rows: string[][] }) { if (!rows.length) return null; return <div className={styles.tableWrap} role="region" aria-label="Referenztabelle" tabIndex={0}><table><thead><tr>{rows[0].map((cell, index) => <th key={`${index}-${cell}`}>{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div> }
function ResourceCard({ code, title, copy, status, href }: { code: string; title: string; copy: string; status: string; href?: string }) { return <div><span className={styles.resourceIcon}>{code}</span><div><strong>{title}</strong><p>{copy}</p>{href ? <a className="korean-resource-action" href={protectedMaterialHref(href)} download>{status}</a> : <em>{status}</em>}</div></div> }
function heroWords(topic: GrammarTopic): string[] { return Array.from(new Set(topic.visual.scene.flatMap(([left, right]) => [left, right]).filter(Boolean))).slice(0, 4) }
function countPracticeActivities(topic: GrammarTopic): number { return topic.practice.levels.reduce((total, level) => { if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0); if (level.type === 'choice' || level.type === 'write') return total + level.items.length; return total + level.blanks.length }, 0) }
