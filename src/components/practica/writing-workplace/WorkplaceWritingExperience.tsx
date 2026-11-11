'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { WRITING_UI, type WritingLevel, type WritingLocale } from '@/data/practica/writing-workplace-ui'
import styles from './WorkplaceWritingExperience.module.css'

type Stage = 'email' | 'document' | 'analysis' | 'reply' | 'review'
export type WorkplaceCase = {
  id: string
  title: string
  area: string
  areaLabel?: string
  role: string
  teaser: string
  email: { from: string; to: string; sent: string; subject: string; body: string }
  document: { title: string; intro: string; facts: { id: string; time: string; text: string }[] }
  questions: { id: string; axis: string; prompt: string; evidenceIds: string[]; correctOptionId: string; options: { id: string; text: string; feedback: string }[] }[]
  task: { prompt: string; wordGuide: string; criteria: string[] }
  model: { subject: string; body: string; annotations: { label: string; excerpt: string; evidenceIds: string[] }[] }
}
type Notes = { fact: string; assumption: string; responsibility: string }

const stages: Stage[] = ['email', 'document', 'analysis', 'reply', 'review']

const emptyNotes: Notes = { fact: '', assumption: '', responsibility: '' }

function writingLength(value: string, language: string) {
  if (!value.trim()) return 0
  return language === 'ja' || language === 'ko'
    ? Array.from(value.replace(/\s/gu, '')).length
    : value.trim().split(/\s+/u).length
}

export default function WorkplaceWritingExperience({ language = 'en', level, cases }: { language?: WritingLocale; level: WritingLevel; cases: WorkplaceCase[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [areaFilter, setAreaFilter] = useState('all')
  const [stage, setStage] = useState<Stage>('email')
  const [notesByCase, setNotesByCase] = useState<Record<string, Notes>>({})
  const [answersByCase, setAnswersByCase] = useState<Record<string, Record<string, string>>>({})
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [firstDrafts, setFirstDrafts] = useState<Record<string, string>>({})
  const [hydrated, setHydrated] = useState(false)
  const [showEmptyWarning, setShowEmptyWarning] = useState(false)
  const [reviewChecks, setReviewChecks] = useState<Record<string, boolean>>({})
  const storageKey = `welearn-writing-${language}-${level.toLowerCase()}-workplace`
  const ui = WRITING_UI[language]
  const intro = ui.intro[level]
  const noteCopy = ui.notes[level]
  const areas = [...new Set(cases.map(item => item.area.split(' ×')[0]))]
  const visibleCases = cases.map((item, index) => ({ item, index })).filter(({ item }) => areaFilter === 'all' || item.area.startsWith(areaFilter))

  useEffect(() => {
    const previousLanguage = document.documentElement.lang
    document.documentElement.lang = language
    return () => { document.documentElement.lang = previousLanguage }
  }, [language])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey) ?? (language === 'en' && level === 'B2' ? window.localStorage.getItem('welearn-writing-b2-workplace') ?? window.localStorage.getItem('welearn-writing-b2-preview') : null)
        if (saved) {
          const parsed = JSON.parse(saved) as { drafts?: Record<string, string>; firstDrafts?: Record<string, string>; notesByCase?: Record<string, Notes>; answersByCase?: Record<string, Record<string, string>> }
          setDrafts(parsed.drafts ?? {})
          setFirstDrafts(parsed.firstDrafts ?? {})
          setNotesByCase(parsed.notesByCase ?? {})
          setAnswersByCase(parsed.answersByCase ?? {})
        }
      } catch {
        // The exercise still works when local storage is unavailable.
      }
      setHydrated(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [language, level, storageKey])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ drafts, firstDrafts, notesByCase, answersByCase }))
    } catch {
      // Drafts remain available for this session.
    }
  }, [drafts, firstDrafts, notesByCase, answersByCase, hydrated, storageKey])

  const current = cases.find(item => item.id === selectedId)
  const notes = current ? notesByCase[current.id] ?? emptyNotes : emptyNotes
  const answers = current ? answersByCase[current.id] ?? {} : {}
  const draft = current ? drafts[current.id] ?? '' : ''
  const firstDraft = current ? firstDrafts[current.id] : undefined
  const answered = current?.questions.filter(question => answers[question.id]).length ?? 0
  const correct = current?.questions.filter(question => answers[question.id] === question.correctOptionId).length ?? 0
  const notesReady = Object.values(notes).every(value => Boolean(value.trim()))
  const analysisReady = Boolean(current && correct === current.questions.length && notesReady)

  function scrollToWorkspace() {
    window.setTimeout(() => document.getElementById('case-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  function openCase(id: string) {
    setSelectedId(id)
    setStage(drafts[id]?.trim() ? 'reply' : 'email')
    setReviewChecks({})
    setShowEmptyWarning(false)
    scrollToWorkspace()
  }

  function closeCase() {
    setSelectedId(null)
    scrollToWorkspace()
  }

  function go(next: Stage) {
    setStage(next)
    scrollToWorkspace()
  }

  function submitDraft() {
    if (!current) return
    if (!draft.trim()) {
      setShowEmptyWarning(true)
      return
    }
    if (!firstDrafts[current.id]) setFirstDrafts(previous => ({ ...previous, [current.id]: draft }))
    setShowEmptyWarning(false)
    go('review')
  }

  return (
    <div className={styles.shell} id="case-workspace" data-active-practice="true" lang={language}>
      <div className={styles.wrap}>
        {language !== 'en' && <div className={styles.focusHeader}><Link href="/">WeLearn</Link><span>{ui.languageName} {level}</span></div>}
        <nav className={styles.breadcrumb} aria-label={ui.breadcrumb}>
          <Link href={`/practica/${ui.languageSlug}/${level.toLowerCase()}`}>{ui.languageName} {level}</Link><span>/</span><span>{ui.breadcrumb}{cases.length < 20 ? ` · ${ui.preview}` : ''}</span>
        </nav>

        {!current ? (
          <>
            <header className={styles.intro}>
              <p className={styles.kicker}>{ui.breadcrumb} {level} · {cases.length < 20 ? ui.previewKicker : ui.liveKicker}</p>
              <h1>{intro.first}<br /><em>{intro.second}</em></h1>
              <p>{intro.description}</p>
              <div className={styles.introMeta}><span>{ui.caseCount.replace('{count}', String(cases.length))}</span><span>{ui.stepsCount}</span><span>{ui.localDraft}</span></div>
            </header>
            {cases.length > 3 && <nav className={styles.filters} aria-label={ui.filterLabel}>
              {['all', ...areas].map(area => <button key={area} type="button" aria-pressed={areaFilter === area} onClick={() => setAreaFilter(area)}>{area === 'all' ? ui.allCases : ui.areas[area] ?? area}<span>{area === 'all' ? cases.length : cases.filter(item => item.area.startsWith(area)).length}</span></button>)}
            </nav>}
            <section className={styles.catalog} aria-label={ui.availableCases}>
              {visibleCases.map(({ item, index }) => (
                <button className={styles.caseCard} key={item.id} type="button" onClick={() => openCase(item.id)}>
                  <span className={styles.caseIndex}>{ui.caseLabel} {String(index + 1).padStart(2, '0')} <span>· {item.areaLabel ?? item.area}</span></span>
                  <strong>{item.title}</strong>
                  <span className={styles.teaser}>{item.teaser}</span>
                  <span className={styles.cardFooter}>{drafts[item.id]?.trim() ? ui.continueDraft : ui.openCase} <span aria-hidden="true">↗</span></span>
                </button>
              ))}
            </section>
            {cases.length < 20 && <p className={styles.previewNote}>{ui.previewNote}</p>}
          </>
        ) : (
          <>
            <header className={styles.caseHeader}>
              <button type="button" className={styles.backToCases} onClick={closeCase}>← {ui.allCases}</button>
              <p className={styles.kicker}>{current.areaLabel ?? current.area} · {ui.yourRole}: {current.role}</p>
              <h1>{current.title}</h1>
              <p>{current.teaser}</p>
            </header>
            <ol className={styles.progress} aria-label={ui.caseSteps}>
              {stages.map((item, index) => {
                const activeIndex = stages.indexOf(stage)
                return <li key={item} className={index === activeIndex ? styles.activeStep : index < activeIndex ? styles.doneStep : ''} aria-current={index === activeIndex ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{ui.stages[item]}</li>
              })}
            </ol>

            {stage === 'email' && (
              <section className={styles.panel} aria-labelledby="email-title">
                <div className={styles.sectionHeading}><span>{ui.emailInput}</span><h2 id="email-title">{ui.emailTitle}</h2><p>{ui.emailInstruction}</p></div>
                <article className={styles.email}>
                  <div className={styles.emailHeader}><div><span>{ui.from}</span><strong>{current.email.from}</strong></div><div><span>{ui.to}</span><strong>{current.email.to}</strong></div><div><span>{ui.sent}</span><strong>{current.email.sent}</strong></div><div><span>{ui.subject}</span><strong>{current.email.subject}</strong></div></div>
                  <div className={styles.emailBody}>{current.email.body}</div>
                </article>
                <div className={styles.panelActions}><button type="button" className={styles.primaryButton} onClick={() => go('document')}>{ui.readDocument} →</button></div>
              </section>
            )}

            {stage === 'document' && (
              <section className={styles.panel} aria-labelledby="document-title">
                <div className={styles.sectionHeading}><span>{ui.evidenceStep}</span><h2 id="document-title">{current.document.title}</h2><p>{current.document.intro}</p></div>
                <ol className={styles.timeline}>{current.document.facts.map(fact => <li key={fact.id}><span className={styles.factTime}>{fact.time}</span><p>{fact.text}</p><span className={styles.factId}>{fact.id}</span></li>)}</ol>
                <div className={styles.panelActions}><button type="button" className={styles.quietButton} onClick={() => go('email')}>← {ui.backEmail}</button><button type="button" className={styles.primaryButton} onClick={() => go('analysis')}>{ui.analyseSituation} →</button></div>
              </section>
            )}

            {stage === 'analysis' && (
              <section className={styles.panel} aria-labelledby="analysis-title">
                <div className={styles.sectionHeading}><span>{ui.judgementStep}</span><h2 id="analysis-title">{ui.analysis[level].title}</h2><p>{ui.analysis[level].instruction}</p></div>
                <div className={styles.notebook}>
                  <label><span>{noteCopy.fact}</span><textarea value={notes.fact} onChange={event => setNotesByCase(previous => ({ ...previous, [current.id]: { ...notes, fact: event.target.value } }))} rows={2} placeholder={noteCopy.factPlaceholder} /></label>
                  <label><span>{noteCopy.assumption}</span><textarea value={notes.assumption} onChange={event => setNotesByCase(previous => ({ ...previous, [current.id]: { ...notes, assumption: event.target.value } }))} rows={2} placeholder={noteCopy.assumptionPlaceholder} /></label>
                  <label><span>{noteCopy.responsibility}</span><textarea value={notes.responsibility} onChange={event => setNotesByCase(previous => ({ ...previous, [current.id]: { ...notes, responsibility: event.target.value } }))} rows={2} placeholder={noteCopy.responsibilityPlaceholder} /></label>
                </div>
                <div className={styles.questions}>{current.questions.map((question, index) => (
                  <fieldset key={question.id} className={styles.question}>
                    <legend><span>{String(index + 1).padStart(2, '0')} · {ui.axes[question.axis] ?? question.axis}</span>{question.prompt}</legend>
                    <div className={styles.options}>{question.options.map(option => {
                      const selected = answers[question.id] === option.id
                      return <button key={option.id} type="button" aria-pressed={selected} className={selected ? styles.chosenOption : ''} onClick={() => setAnswersByCase(previous => ({ ...previous, [current.id]: { ...answers, [question.id]: option.id } }))}>{option.text}</button>
                    })}</div>
                    {answers[question.id] && <p className={answers[question.id] === question.correctOptionId ? styles.feedbackGood : styles.feedbackTry} role="status">{question.options.find(option => option.id === answers[question.id])?.feedback} {answers[question.id] === question.correctOptionId ? '✓' : ui.tryAnother}</p>}
                  </fieldset>
                ))}</div>
                <p className={styles.stepHint}>{answered}/{current.questions.length} {ui.questionsAnswered} · {Object.values(notes).filter(value => value.trim()).length}/3 {ui.notesReady}{answered === current.questions.length ? ` · ${correct} ${ui.correctAnswers}` : ''}</p>
                <div className={styles.panelActions}><button type="button" className={styles.quietButton} onClick={() => go('document')}>← {ui.reviewFacts}</button><button type="button" className={styles.primaryButton} disabled={!analysisReady} onClick={() => go('reply')}>{ui.writeReply} →</button></div>
              </section>
            )}

            {stage === 'reply' && (
              <section className={styles.panel} aria-labelledby="reply-title">
                <div className={styles.sectionHeading}><span>{ui.replyStep}</span><h2 id="reply-title">{ui.replyTitle}</h2><p>{current.task.prompt}</p></div>
                <div className={styles.replyGrid}>
                  <div className={styles.editor}><div className={styles.editorHeader}><span>{ui.to}: {current.email.from}</span><strong>{ui.replyPrefix} {current.email.subject}</strong></div><label htmlFor="workplace-reply">{ui.replyLabel}</label><textarea id="workplace-reply" rows={14} value={draft} onChange={event => setDrafts(previous => ({ ...previous, [current.id]: event.target.value }))} placeholder={ui.replyPlaceholder} /><div className={styles.editorFooter}><span>{writingLength(draft, language)} {ui.wordUnit} · {current.task.wordGuide}</span><span>{ui.draftSaved}</span></div></div>
                  <aside className={styles.replyAside}><h3>{ui.beforeSend}</h3><ul>{current.task.criteria.map(criterion => <li key={criterion}>{criterion}</li>)}</ul><p>{ui.wordGuideNote}</p></aside>
                </div>
                {showEmptyWarning && <p className={styles.feedbackTry} role="alert">{ui.emptyReply}</p>}
                <div className={styles.panelActions}><button type="button" className={styles.quietButton} onClick={() => go('analysis')}>← {ui.reviewAnalysis}</button><button type="button" className={styles.primaryButton} onClick={submitDraft}>{ui.compareRevise} →</button></div>
              </section>
            )}

            {stage === 'review' && (
              <section className={styles.panel} aria-labelledby="review-title">
                <div className={styles.sectionHeading}><span>{ui.revisionStep}</span><h2 id="review-title">{ui.revisionTitle}</h2><p>{ui.revisionInstruction}</p></div>
                <div className={styles.compareGrid}><article><span className={styles.compareLabel}>{ui.yourReply}</span><div className={styles.compareBody}>{draft}</div></article><article><span className={styles.compareLabel}>{ui.possibleReply}</span><strong>{current.model.subject}</strong><div className={styles.compareBody}>{current.model.body}</div></article></div>
                <div className={styles.reviewBottom}><div><h3>{ui.noticeDecisions}</h3><ul className={styles.annotationList}>{current.model.annotations.map(annotation => <li key={annotation.label}><strong>{annotation.label}</strong><span>“{annotation.excerpt}”</span></li>)}</ul></div><div><h3>{ui.checkReply}</h3><div className={styles.checklist}>{current.task.criteria.map(criterion => <label key={criterion}><input type="checkbox" checked={Boolean(reviewChecks[criterion])} onChange={event => setReviewChecks(previous => ({ ...previous, [criterion]: event.target.checked }))} /><span>{criterion}</span></label>)}</div></div></div>
                {firstDraft && firstDraft !== draft && <details className={styles.firstDraft}><summary>{ui.compareFirstDraft}</summary><div>{firstDraft}</div></details>}
                <div className={styles.panelActions}><button type="button" className={styles.primaryButton} onClick={() => go('reply')}>{ui.rewriteReply} →</button><button type="button" className={styles.quietButton} onClick={closeCase}>{ui.chooseCase}</button></div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
