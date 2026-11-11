'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import cases from '@/data/practica/writing-workplace-b2.json'
import styles from './WorkplaceWritingPreview.module.css'

type Stage = 'email' | 'document' | 'analysis' | 'reply' | 'review'
type Case = (typeof cases)[number]
type Notes = { fact: string; assumption: string; responsibility: string }

const stages: { id: Stage; label: string }[] = [
  { id: 'email', label: 'Correo' },
  { id: 'document', label: 'Hechos' },
  { id: 'analysis', label: 'Analizar' },
  { id: 'reply', label: 'Responder' },
  { id: 'review', label: 'Revisar' },
]

const emptyNotes: Notes = { fact: '', assumption: '', responsibility: '' }

function words(value: string) {
  return value.trim() ? value.trim().split(/\s+/u).length : 0
}

export default function WorkplaceWritingPreview() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [stage, setStage] = useState<Stage>('email')
  const [notesByCase, setNotesByCase] = useState<Record<string, Notes>>({})
  const [answersByCase, setAnswersByCase] = useState<Record<string, Record<string, string>>>({})
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [firstDrafts, setFirstDrafts] = useState<Record<string, string>>({})
  const [hydrated, setHydrated] = useState(false)
  const [showEmptyWarning, setShowEmptyWarning] = useState(false)
  const [reviewChecks, setReviewChecks] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem('welearn-writing-b2-preview')
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
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem('welearn-writing-b2-preview', JSON.stringify({ drafts, firstDrafts, notesByCase, answersByCase }))
    } catch {
      // Drafts remain available for this session.
    }
  }, [drafts, firstDrafts, notesByCase, answersByCase, hydrated])

  const current = cases.find(item => item.id === selectedId) as Case | undefined
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
    <div className={styles.shell} id="case-workspace">
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
          <Link href="/practica/ingles/b2">Inglés B2</Link><span>/</span><span>Writing · Preview</span>
        </nav>

        {!current ? (
          <>
            <header className={styles.intro}>
              <p className={styles.kicker}>Writing B2 · Preview editorial</p>
              <h1>Before you reply,<br /><em>find out what happened.</em></h1>
              <p>Un correo puede contar una versión incompleta. Lee el mensaje, revisa el documento interno y escribe una respuesta que aclare la situación sin inventar hechos ni buscar culpables.</p>
              <div className={styles.introMeta}><span>3 casos jugables</span><span>5 pasos por caso</span><span>Tu borrador se guarda en este navegador</span></div>
            </header>
            <section className={styles.catalog} aria-label="Casos disponibles">
              {cases.map((item, index) => (
                <button className={styles.caseCard} key={item.id} type="button" onClick={() => openCase(item.id)}>
                  <span className={styles.caseIndex}>CASE {String(index + 1).padStart(2, '0')} <span>· {item.area}</span></span>
                  <strong>{item.title}</strong>
                  <span className={styles.teaser}>{item.teaser}</span>
                  <span className={styles.cardFooter}>{drafts[item.id]?.trim() ? 'Continuar borrador' : 'Abrir caso'} <span aria-hidden="true">↗</span></span>
                </button>
              ))}
            </section>
            <p className={styles.previewNote}>Estos casos son un preview para revisar el formato antes de producir los 20 ejercicios del nivel.</p>
          </>
        ) : (
          <>
            <header className={styles.caseHeader}>
              <button type="button" className={styles.backToCases} onClick={closeCase}>← Todos los casos</button>
              <p className={styles.kicker}>{current.area} · Tu rol: {current.role}</p>
              <h1>{current.title}</h1>
              <p>{current.teaser}</p>
            </header>
            <ol className={styles.progress} aria-label="Pasos del caso">
              {stages.map((item, index) => {
                const activeIndex = stages.findIndex(value => value.id === stage)
                return <li key={item.id} className={index === activeIndex ? styles.activeStep : index < activeIndex ? styles.doneStep : ''} aria-current={index === activeIndex ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</li>
              })}
            </ol>

            {stage === 'email' && (
              <section className={styles.panel} aria-labelledby="email-title">
                <div className={styles.sectionHeading}><span>01 / Input</span><h2 id="email-title">You have a new email</h2><p>Lee el mensaje como si fueras la persona que debe responderlo.</p></div>
                <article className={styles.email}>
                  <div className={styles.emailHeader}><div><span>From</span><strong>{current.email.from}</strong></div><div><span>To</span><strong>{current.email.to}</strong></div><div><span>Sent</span><strong>{current.email.sent}</strong></div><div><span>Subject</span><strong>{current.email.subject}</strong></div></div>
                  <div className={styles.emailBody}>{current.email.body}</div>
                </article>
                <div className={styles.panelActions}><button type="button" className={styles.primaryButton} onClick={() => go('document')}>Leer el documento →</button></div>
              </section>
            )}

            {stage === 'document' && (
              <section className={styles.panel} aria-labelledby="document-title">
                <div className={styles.sectionHeading}><span>02 / Evidence</span><h2 id="document-title">{current.document.title}</h2><p>{current.document.intro}</p></div>
                <ol className={styles.timeline}>{current.document.facts.map(fact => <li key={fact.id}><span className={styles.factTime}>{fact.time}</span><p>{fact.text}</p><span className={styles.factId}>{fact.id}</span></li>)}</ol>
                <div className={styles.panelActions}><button type="button" className={styles.quietButton} onClick={() => go('email')}>← Volver al correo</button><button type="button" className={styles.primaryButton} onClick={() => go('analysis')}>Analizar la situación →</button></div>
              </section>
            )}

            {stage === 'analysis' && (
              <section className={styles.panel} aria-labelledby="analysis-title">
                <div className={styles.sectionHeading}><span>03 / Judgement</span><h2 id="analysis-title">Separate what happened from what was assumed</h2><p>Completa los tres apuntes y acierta las cuatro preguntas antes de escribir. Cada opción te mostrará por qué encaja o no.</p></div>
                <div className={styles.notebook}>
                  <label><span>What is a confirmed fact?</span><textarea value={notes.fact} onChange={event => setNotesByCase(previous => ({ ...previous, [current.id]: { ...notes, fact: event.target.value } }))} rows={2} placeholder="A fact you can support with the document…" /></label>
                  <label><span>What has someone assumed?</span><textarea value={notes.assumption} onChange={event => setNotesByCase(previous => ({ ...previous, [current.id]: { ...notes, assumption: event.target.value } }))} rows={2} placeholder="An assumption that needs clarification…" /></label>
                  <label><span>What can you take responsibility for?</span><textarea value={notes.responsibility} onChange={event => setNotesByCase(previous => ({ ...previous, [current.id]: { ...notes, responsibility: event.target.value } }))} rows={2} placeholder="Your part in the misunderstanding…" /></label>
                </div>
                <div className={styles.questions}>{current.questions.map((question, index) => (
                  <fieldset key={question.id} className={styles.question}>
                    <legend><span>{String(index + 1).padStart(2, '0')} · {question.axis}</span>{question.prompt}</legend>
                    <div className={styles.options}>{question.options.map(option => {
                      const selected = answers[question.id] === option.id
                      return <button key={option.id} type="button" aria-pressed={selected} className={selected ? styles.chosenOption : ''} onClick={() => setAnswersByCase(previous => ({ ...previous, [current.id]: { ...answers, [question.id]: option.id } }))}>{option.text}</button>
                    })}</div>
                    {answers[question.id] && <p className={answers[question.id] === question.correctOptionId ? styles.feedbackGood : styles.feedbackTry} role="status">{question.options.find(option => option.id === answers[question.id])?.feedback} {answers[question.id] === question.correctOptionId ? '✓' : 'Try another option.'}</p>}
                  </fieldset>
                ))}</div>
                <p className={styles.stepHint}>{answered}/{current.questions.length} preguntas respondidas · {Object.values(notes).filter(value => value.trim()).length}/3 apuntes listos{answered === current.questions.length ? ` · ${correct} respuestas correctas` : ''}</p>
                <div className={styles.panelActions}><button type="button" className={styles.quietButton} onClick={() => go('document')}>← Revisar los hechos</button><button type="button" className={styles.primaryButton} disabled={!analysisReady} onClick={() => go('reply')}>Escribir la respuesta →</button></div>
              </section>
            )}

            {stage === 'reply' && (
              <section className={styles.panel} aria-labelledby="reply-title">
                <div className={styles.sectionHeading}><span>04 / Your reply</span><h2 id="reply-title">Write the email you would actually send</h2><p>{current.task.prompt}</p></div>
                <div className={styles.replyGrid}>
                  <div className={styles.editor}><div className={styles.editorHeader}><span>To: {current.email.from}</span><strong>Re: {current.email.subject}</strong></div><label htmlFor="workplace-reply">Your reply in English</label><textarea id="workplace-reply" rows={14} value={draft} onChange={event => setDrafts(previous => ({ ...previous, [current.id]: event.target.value }))} placeholder="Hi…" /><div className={styles.editorFooter}><span>{words(draft)} words · {current.task.wordGuide}</span><span>Draft saved locally</span></div></div>
                  <aside className={styles.replyAside}><h3>Before you send</h3><ul>{current.task.criteria.map(criterion => <li key={criterion}>{criterion}</li>)}</ul><p>La extensión orienta; importa más que tus afirmaciones se puedan sostener con los hechos.</p></aside>
                </div>
                {showEmptyWarning && <p className={styles.feedbackTry} role="alert">Escribe una respuesta antes de abrir la comparación.</p>}
                <div className={styles.panelActions}><button type="button" className={styles.quietButton} onClick={() => go('analysis')}>← Revisar mi análisis</button><button type="button" className={styles.primaryButton} onClick={submitDraft}>Comparar y revisar →</button></div>
              </section>
            )}

            {stage === 'review' && (
              <section className={styles.panel} aria-labelledby="review-title">
                <div className={styles.sectionHeading}><span>05 / Revision</span><h2 id="review-title">What did your reply make clear?</h2><p>El modelo es una respuesta posible. Compara sus decisiones con las tuyas y mejora tu borrador.</p></div>
                <div className={styles.compareGrid}><article><span className={styles.compareLabel}>Your reply</span><div className={styles.compareBody}>{draft}</div></article><article><span className={styles.compareLabel}>One possible reply</span><strong>{current.model.subject}</strong><div className={styles.compareBody}>{current.model.body}</div></article></div>
                <div className={styles.reviewBottom}><div><h3>Notice the decisions</h3><ul className={styles.annotationList}>{current.model.annotations.map(annotation => <li key={annotation.label}><strong>{annotation.label}</strong><span>“{annotation.excerpt}”</span></li>)}</ul></div><div><h3>Check your own reply</h3><div className={styles.checklist}>{current.task.criteria.map(criterion => <label key={criterion}><input type="checkbox" checked={Boolean(reviewChecks[criterion])} onChange={event => setReviewChecks(previous => ({ ...previous, [criterion]: event.target.checked }))} /><span>{criterion}</span></label>)}</div></div></div>
                {firstDraft && firstDraft !== draft && <details className={styles.firstDraft}><summary>Compare with your first draft</summary><div>{firstDraft}</div></details>}
                <div className={styles.panelActions}><button type="button" className={styles.primaryButton} onClick={() => go('reply')}>Reescribir mi respuesta →</button><button type="button" className={styles.quietButton} onClick={closeCase}>Elegir otro caso</button></div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
