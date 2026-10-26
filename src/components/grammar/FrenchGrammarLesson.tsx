'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import { getFrenchGrammarResource, type FrenchGrammarLevel } from '@/data/french-grammar-resources'
import GrammarTopicClient from '@/components/grammar/GrammarTopicClient'
import GrammarTopicVisual from '@/components/grammar/GrammarTopicVisual'
import { protectedMaterialHref } from '@/lib/material-download'
import styles from './KoreanGrammarLesson.module.css'

type SectionId = 'comprendre' | 'carte' | 'demarche' | 'pratique' | 'ressources'
const sections: Array<{ id: SectionId; number: string; label: string }> = [
  { id: 'comprendre', number: '01', label: 'Comprendre' },
  { id: 'carte', number: '02', label: 'Carte visuelle' },
  { id: 'demarche', number: '03', label: 'Pas à pas' },
  { id: 'pratique', number: '04', label: 'Pratique' },
  { id: 'ressources', number: '05', label: 'Ressources' },
]

export default function FrenchGrammarLesson({ topic, level }: { topic: GrammarTopic; level: FrenchGrammarLevel }) {
  const resource = getFrenchGrammarResource(topic, level)
  const [active, setActive] = useState<SectionId>('comprendre')
  const formulaParts = topic.guide.formula.split(/\s*(?:\||→|\+)\s*/u).map((part) => part.trim()).filter(Boolean)
  const activityCount = countPracticeActivities(topic)

  function selectSection(id: SectionId) {
    setActive(id)
    requestAnimationFrame(() => {
      document.getElementById('french-grammar-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.querySelector<HTMLButtonElement>(`[data-french-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    })
  }

  return (
    <section className={styles.lesson} style={{ '--kr-blue': '#18347A', '--kr-red': '#E7374F', '--kr-cream': '#F7F3EA' } as React.CSSProperties} aria-labelledby="french-grammar-title">
      <div className={styles.previewFlag}><span>Leçon avancée complète</span> Carte visuelle, trois PDF et pratique approfondie prêts</div>
      <div className={styles.track} aria-label={`Parcours de grammaire française ${level.toUpperCase()}`}><span>Repérer</span><b>→</b><strong>Comprendre</strong><b>→</b><span>Transformer</span><b>→</b><span>Produire</span></div>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Français · {topic.category} · {level.toUpperCase()}</p>
          <h1 id="french-grammar-title">{topic.shortTitle}</h1>
          <p className={styles.lead}>{topic.lead}</p>
          <div className={styles.heroActions}>
            <button type="button" onClick={() => selectSection('pratique')}>Commencer la pratique <span>→</span></button>
            <button type="button" className={styles.secondary} onClick={() => selectSection('carte')}>Voir la carte visuelle</button>
          </div>
          <div className={styles.metrics}><span><b>{topic.practice.levels.length}</b> étapes</span><span><b>{activityCount}</b> activités</span><span><b>{resource.studyMinutes}</b> min</span></div>
        </div>
        <div className={styles.heroVisual} aria-label={`Carte visuelle de ${topic.shortTitle}`}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 22% 18%, #fff 0 2%, transparent 2.4%), linear-gradient(145deg, #f7f9ff 0%, #e4eaf8 48%, #cbd5ef 100%)' }} />
          <div style={{ position: 'absolute', inset: '12% 9% 24%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(.55rem, 2vw, 1rem)', transform: 'rotate(-2deg)' }}>
            {heroWords(topic).map((word, index) => <span key={word} style={{ display: 'grid', placeItems: 'center', padding: '.5rem', textAlign: 'center', borderRadius: 18, background: index === 0 ? '#18347A' : index === 3 ? '#E7374F' : 'rgba(255,255,255,.94)', color: index === 0 || index === 3 ? '#fff' : '#18347A', fontWeight: 950, fontSize: 'clamp(.8rem, 1.8vw, 1.25rem)', boxShadow: '0 14px 28px rgba(24,52,122,.14)', border: '1px solid rgba(255,255,255,.8)' }}>{word}</span>)}
          </div>
          <div className={styles.heroShade} /><span className={styles.heroGlyph}>FR</span><p>{topic.guide.goal}</p>
        </div>
      </header>

      <GrammarTopicVisual topic={topic} idioma="frances" nivel={level} uiLanguage="fr" />

      <nav id="french-grammar-nav" className={styles.tabs} aria-label="Contenu de la leçon">
        {sections.map((section) => <button key={section.id} type="button" data-french-section={section.id} className={active === section.id ? styles.active : ''} onClick={() => selectSection(section.id)}><span>{section.number}</span>{section.label}</button>)}
      </nav>

      <div className={styles.panel}>
        {active === 'comprendre' ? <article className={styles.article}>
          <SectionIntro kicker="Explication pédagogique" title={topic.title} copy={topic.description} />
          <div className={styles.outcomeGrid}>{topic.outcomes.map((outcome, index) => <div key={outcome}><span>{index + 1}</span><p>{outcome}</p></div>)}</div>
          {topic.seo.map((section) => <section key={section.heading} className={styles.explainBlock}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.table ? <ReferenceTable rows={section.table} /> : null}{section.examples ? <div className={styles.exampleRows}>{section.examples.map((row, rowIndex) => <div key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}</div>)}</div> : null}</section>)}
        </article> : null}

        {active === 'carte' ? <section className={styles.visualSection} aria-labelledby="french-visual-title">
          <SectionIntro kicker="Laboratoire visuel" title="La règle en un coup d’œil" copy={topic.visual.teacherLens} titleId="french-visual-title" />
          <div className={styles.formula} aria-label={`Formule : ${topic.guide.formula}`}>{formulaParts.map((part, index) => <div key={`${part}-${index}`} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><b>{part}</b></div>)}</div>
          <div className={styles.sceneGrid}>{topic.visual.scene.map(([pattern, meaning], index) => <div key={pattern} style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}><strong lang="fr">{pattern}</strong><span>→</span><p>{meaning}</p></div>)}</div>
          <ReferenceTable rows={topic.guide.table} />
          <div className={styles.modeRow}>{topic.visual.learnerModes.map((mode) => <span key={mode}>{mode}</span>)}</div>
        </section> : null}

        {active === 'demarche' ? <section className={styles.steps} aria-labelledby="french-steps-title">
          <SectionIntro kicker="Raisonnement guidé" title="Décider sans traduire mot à mot" titleId="french-steps-title" />
          <div className={styles.modelHeader}><p>Modèle central de la leçon</p><span>Forme · contraste · emploi</span></div>
          <div className={styles.modelCard}><span>Modèle</span><strong lang="fr">{topic.guide.model}</strong></div>
          <ol className={styles.stepList}>{topic.guide.decisions.map((decision, index) => <li key={decision}><span>{index + 1}</span><p>{decision}</p></li>)}</ol>
          <div className={styles.warningBox}><h3>Erreurs fréquentes à éviter</h3>{topic.guide.mistakes.map((mistake) => <p key={mistake}><span>×</span>{mistake}</p>)}</div>
        </section> : null}

        {active === 'pratique' ? <section className={styles.practice} aria-labelledby="french-practice-title">
          <SectionIntro kicker="Pratique progressive" title="De la reconnaissance à la production" copy="Obtenez au moins 65 % pour continuer. Chaque étape combine contexte, correction et production originale." titleId="french-practice-title" />
          <GrammarTopicClient topic={topic} idioma="frances" nivel={level} relatedWritingExercises={[]} mode="practiceOnly" uiLanguage="fr" />
        </section> : null}

        {active === 'ressources' ? <section className={styles.resources} aria-labelledby="french-resources-title">
          <SectionIntro kicker="Bibliothèque d’étude" title="Trois supports prêts à utiliser" copy="Téléchargez le cours complet, le cahier d’exercices et le corrigé séparé. L’audio sera ajouté dans une phase ultérieure." titleId="french-resources-title" />
          <div className={styles.resourceGrid}>
            <ResourceCard code="WEB" title="Leçon interactive" copy={`${topic.practice.levels.length} étapes et ${activityCount} activités intégrées.`} status="Prête à étudier" />
            <ResourceCard code="PDF" title="Cours complet" copy="Explication longue, carte visuelle, exemples, exercices et corrigé." status="Télécharger le cours" href={resource.pdf} />
            <ResourceCard code="EXOS" title="Cahier d’exercices" copy={`${activityCount} décisions d’apprentissage organisées pour l’impression.`} status="Télécharger les exercices" href={resource.exercisesPdf} />
            <ResourceCard code="CLÉ" title="Corrigé raisonné" copy="Réponses modèles accompagnées d’une justification grammaticale concise." status="Télécharger le corrigé" href={resource.answerKeyPdf} />
          </div>
          <div className={styles.studyPlan}><h3>Parcours d’étude recommandé</h3><ol><li><b>10 min</b> Comprendre l’intention communicative.</li><li><b>10 min</b> Reconstruire la carte visuelle.</li><li><b>25 min</b> Réaliser quatre étapes de pratique.</li><li><b>10 min</b> Produire et réviser trois exemples personnels.</li></ol></div>
        </section> : null}
      </div>

      <aside className="english-conversion" aria-label="Étape suivante pour apprendre le français"><div><span>Envie d’un parcours adapté à votre niveau ?</span><h2>Transformez cette pratique en progrès mesurable</h2><p>Évaluez votre niveau et choisissez un accompagnement cohérent avec vos objectifs.</p></div><div><Link href="/nivel-radar" data-french-cta="level-test">Évaluer mon niveau</Link><Link href="/clases-de-frances" data-french-cta="classes">Découvrir les cours</Link></div></aside>
    </section>
  )
}

function SectionIntro({ kicker, title, copy, titleId }: { kicker: string; title: string; copy?: string; titleId?: string }) {
  return <div className={styles.sectionIntro}><div><span>{kicker}</span><h2 id={titleId}>{title}</h2></div>{copy ? <p>{copy}</p> : null}</div>
}

function ReferenceTable({ rows }: { rows: string[][] }) {
  if (rows.length === 0) return null
  return <div className={styles.tableWrap} role="region" aria-label="Tableau de référence" tabIndex={0}><table><thead><tr>{rows[0].map((cell, index) => <th key={`${index}-${cell}`}>{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function ResourceCard({ code, title, copy, status, href }: { code: string; title: string; copy: string; status: string; href?: string }) {
  return <div><span className={styles.resourceIcon}>{code}</span><div><strong>{title}</strong><p>{copy}</p>{href ? <a className="korean-resource-action" href={protectedMaterialHref(href)} download>{status}</a> : <em>{status}</em>}</div></div>
}

function heroWords(topic: GrammarTopic): string[] {
  return Array.from(new Set(topic.visual.scene.flatMap(([left, right]) => [left, right]).filter(Boolean))).slice(0, 4)
}

function countPracticeActivities(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}
