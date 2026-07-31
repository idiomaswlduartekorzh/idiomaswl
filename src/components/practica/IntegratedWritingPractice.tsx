'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { IntegratedWritingExercise, RequiredWritingTerm } from '@/data/practica/writing-integrated'

type Stage = 'select' | 'read' | 'prepare' | 'write' | 'review'

const STAGES: { id: Stage; label: string }[] = [
  { id: 'read', label: 'Leer' },
  { id: 'prepare', label: 'Preparar' },
  { id: 'write', label: 'Escribir' },
  { id: 'review', label: 'Comparar' },
]

const KIND_LABELS: Record<RequiredWritingTerm['kind'], string> = {
  vocabulario: 'Vocabulario',
  conector: 'Conector',
  adjetivo: 'Adjetivo',
  adverbio: 'Adverbio',
  estructura: 'Estructura',
}

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:()[\]{}"'“”‘’«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countWords(value: string) {
  const compact = value.trim()
  if (!compact) return 0
  const cjkMatches = compact.match(/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/g)
  if (cjkMatches && cjkMatches.length > compact.replace(/\s/g, '').length * 0.45) {
    return Math.max(compact.split(/\s+/).filter(Boolean).length, Math.round(cjkMatches.length / 2))
  }
  return compact.split(/\s+/).filter(Boolean).length
}

function termIsUsed(text: string, term: string) {
  const normalizedText = normalizeText(text)
  const normalizedTerm = normalizeText(term)
  if (!normalizedTerm) return false
  if (/^[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(normalizedTerm)) {
    return text.includes(term)
  }
  return normalizedText.includes(normalizedTerm)
}

// Componente de nivel superior (no anidado en el render del padre): si se
// redefine en cada render, React lo trata como un tipo nuevo y desmonta el
// <textarea> en cada tecla, tirando el foco: el bug de "no se puede escribir".
function NotesNotebook({
  location,
  planningQuestions,
  notes,
  onNoteChange,
  completedNotes,
  plannedTerms,
}: {
  location: 'read' | 'prepare' | 'write'
  planningQuestions: string[]
  notes: Record<number, string>
  onNoteChange: (index: number, value: string) => void
  completedNotes: number
  plannedTerms: string[]
}) {
  const isRead = location === 'read'
  const title = isRead ? 'Apuntes de lectura' : location === 'prepare' ? 'Tus apuntes de lectura' : 'Tus apuntes'

  return (
    <aside className={`writing-integrated__notebook writing-integrated__notebook--${location}`} aria-label={title}>
      <div className="writing-integrated__notebook-header">
        <div>
          <p className="writing-integrated__kicker">{isRead ? 'Lee y registra' : 'Referencia personal'}</p>
          <h3>{title}</h3>
        </div>
        <span aria-label={`${completedNotes} de ${planningQuestions.length} apuntes listos`}>{completedNotes}/{planningQuestions.length}</span>
      </div>
      {isRead && <p className="writing-integrated__notebook-intro">Anota lo que entiendes mientras lees. No necesitas escribir frases perfectas.</p>}
      <div className="writing-integrated__note-fields">
        {planningQuestions.map((question, index) => (
          <label key={question}>
            <span>{question}</span>
            <textarea
              value={notes[index] ?? ''}
              onChange={event => onNoteChange(index, event.target.value)}
              rows={2}
              placeholder="Escribe una idea..."
            />
          </label>
        ))}
      </div>
      {location === 'write' && plannedTerms.length > 0 && <p className="writing-integrated__planned-terms">Para recordar: {plannedTerms.join(' · ')}</p>}
    </aside>
  )
}

export default function IntegratedWritingPractice(props: { exercises: IntegratedWritingExercise[] }) {
  return (
    <Suspense fallback={null}>
      <IntegratedWritingPracticeContent {...props} />
    </Suspense>
  )
}

function IntegratedWritingPracticeContent({ exercises }: { exercises: IntegratedWritingExercise[] }) {
  const searchParams = useSearchParams()
  const [stage, setStage] = useState<Stage>('select')
  const [selectedId, setSelectedId] = useState(exercises[0]?.id ?? '')
  const [text, setText] = useState('')
  const [notes, setNotes] = useState<Record<number, string>>({})
  const [plannedTerms, setPlannedTerms] = useState<string[]>([])

  useEffect(() => {
    const requestedId = searchParams.get('ejercicio')
    if (!requestedId || !exercises.some(item => item.id === requestedId)) return
    setSelectedId(requestedId)
    setStage('read')
  }, [exercises, searchParams])

  const exercise = exercises.find(item => item.id === selectedId) ?? exercises[0]
  if (!exercise) return null

  const usedTerms = useMemo(
    () => exercise.requiredTerms.filter(item => termIsUsed(text, item.term)),
    [exercise.requiredTerms, text],
  )
  const words = countWords(text)
  const enoughWords = words >= exercise.minWords
  const enoughTerms = usedTerms.length >= exercise.requiredCount
  const readyToReview = enoughWords && enoughTerms
  const completedNotes = exercise.planningQuestions.filter((_, index) => notes[index]?.trim()).length
  const readyToWrite = completedNotes === exercise.planningQuestions.length

  function togglePlannedTerm(term: string) {
    setPlannedTerms(current => current.includes(term) ? current.filter(item => item !== term) : [...current, term])
  }

  function go(next: Stage) {
    setStage(next)
    window.setTimeout(() => document.getElementById('writing-integrated-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  function selectExercise(nextExercise: IntegratedWritingExercise) {
    setSelectedId(nextExercise.id)
    setText('')
    setNotes({})
    setPlannedTerms([])
    go('read')
  }

  return (
    <section className="wl-section">
      <div className="wrap writing-integrated" id="writing-integrated-work">
        <div className="writing-integrated__crumbs">
          <Link href="/practica">Práctica</Link>
          <span>/</span>
          <Link href={exercise.backHref}>{exercise.languageLabel} {exercise.level.toUpperCase()}</Link>
          <span>/</span>
          <strong>Escritura integrada</strong>
        </div>

        <div className="writing-integrated__hero" style={{ borderTopColor: exercise.color }}>
          <div>
            <p className="eyebrow"><span className="ink-line" />{exercise.languageNative} · {exercise.level.toUpperCase()} · {exercise.genre}</p>
            <h1>{exercise.title}</h1>
            <p>Lee una situación breve, prepara vocabulario útil y escribe una respuesta que use las palabras objetivo del nivel.</p>
          </div>
          <div className="writing-integrated__meter" style={{ color: exercise.color }}>
            <strong>{usedTerms.length}/{exercise.requiredCount}</strong>
            <span>mínimo de vocabulario</span>
          </div>
        </div>

        <ol className="writing-integrated__steps" aria-label="Progreso del ejercicio">
          {STAGES.map((item, index) => {
            const current = STAGES.findIndex(step => step.id === stage)
            return (
              <li key={item.id} className={index === current ? 'is-current' : index < current ? 'is-done' : ''}>
                <span>{index + 1}</span>
                <em>{item.label}</em>
              </li>
            )
          })}
        </ol>

        {stage === 'select' && (
          <section className="writing-integrated__panel">
            <p className="writing-integrated__kicker">Banco del nivel</p>
            <h2>Elige una situación para escribir</h2>
            <p className="writing-integrated__intro">Cada práctica conecta una lectura, tus apuntes, vocabulario objetivo y un modelo del mismo nivel.</p>
            <div className="writing-integrated__catalog">
              {exercises.map(item => (
                <button key={item.id} type="button" onClick={() => selectExercise(item)}>
                  <span>{String(item.sequence).padStart(2, '0')}</span>
                  <b>{item.title}</b>
                  <small>{item.genre}</small>
                </button>
              ))}
            </div>
          </section>
        )}

        {stage === 'read' && (
          <section className="writing-integrated__panel">
            <p className="writing-integrated__kicker">Lectura base</p>
            <h2>{exercise.readingTitle}</h2>
            <div className="writing-integrated__read-layout">
              <div className="writing-integrated__reading-source">
                <div className="writing-integrated__reading">{exercise.readingText}</div>
                <div className="writing-integrated__focus">
                  {exercise.readingFocus.map(item => <span key={item}>{item}</span>)}
                </div>
              </div>
              <NotesNotebook location="read" planningQuestions={exercise.planningQuestions} notes={notes} onNoteChange={(index, value) => setNotes(current => ({ ...current, [index]: value }))} completedNotes={completedNotes} plannedTerms={plannedTerms} />
            </div>
            <div className="writing-integrated__grammar-links" aria-label="Gramática relacionada">
              <span>Gramática para esta práctica</span>
              {exercise.grammarReferences.map(reference => (
                <Link key={reference.slug} href={`/practica/${exercise.language}/${exercise.level}/gramatica/${reference.slug}`}>
                  {reference.title}
                </Link>
              ))}
            </div>
            <div className="writing-integrated__read-footer">
              <p>{completedNotes === exercise.planningQuestions.length ? 'Tus apuntes están listos para la siguiente etapa.' : 'Puedes continuar ahora; completa los tres apuntes antes de empezar a escribir.'}</p>
              <button className="btn btn-sm" style={{ background: exercise.color, borderColor: exercise.color }} onClick={() => go('prepare')}>Preparar vocabulario</button>
            </div>
          </section>
        )}

        {stage === 'prepare' && (
          <section className="writing-integrated__panel">
            <p className="writing-integrated__kicker">Vocabulario obligatorio</p>
            <h2>Elige palabras y prepara tus ideas</h2>
            <p className="writing-integrated__intro">Marca las palabras que quieres recordar. Después, anota una idea breve para cada pregunta: tus apuntes estarán contigo al escribir. En tu respuesta final deberás usar al menos {exercise.requiredCount} términos.</p>
            <div className="writing-integrated__terms">
              {exercise.requiredTerms.map(item => {
                const selected = plannedTerms.includes(item.term)
                return (
                  <button key={`${item.kind}-${item.term}`} type="button" className={selected ? 'is-selected' : ''} aria-pressed={selected} onClick={() => togglePlannedTerm(item.term)}>
                    <b>{item.label ?? item.term}</b>
                    <span>{KIND_LABELS[item.kind]}</span>
                  </button>
                )
              })}
            </div>
            <NotesNotebook location="prepare" planningQuestions={exercise.planningQuestions} notes={notes} onNoteChange={(index, value) => setNotes(current => ({ ...current, [index]: value }))} completedNotes={completedNotes} plannedTerms={plannedTerms} />
            {!readyToWrite && <p className="writing-integrated__warning">Completa los {exercise.planningQuestions.length} apuntes para continuar.</p>}
            <button className="btn btn-sm" disabled={!readyToWrite} style={{ background: exercise.color, borderColor: exercise.color, opacity: readyToWrite ? 1 : 0.45 }} onClick={() => go('write')}>Escribir respuesta</button>
          </section>
        )}

        {stage === 'write' && (
          <section className="writing-integrated__panel">
            <p className="writing-integrated__kicker">Consigna de escritura</p>
            <h2>{exercise.prompt}</h2>
            <div className="writing-integrated__criteria">
              {exercise.successCriteria.map(item => <span key={item}>{item}</span>)}
            </div>
            <div className="writing-integrated__writing-layout">
              <NotesNotebook location="write" planningQuestions={exercise.planningQuestions} notes={notes} onNoteChange={(index, value) => setNotes(current => ({ ...current, [index]: value }))} completedNotes={completedNotes} plannedTerms={plannedTerms} />
              <textarea
                value={text}
                onChange={event => setText(event.target.value)}
                rows={9}
                placeholder={`Escribe aquí tu respuesta en ${exercise.languageLabel.toLowerCase()}...`}
              />
            </div>
            <div className="writing-integrated__checks">
              <span className={enoughWords ? 'is-ok' : ''}>{words}/{exercise.minWords} palabras mínimas</span>
              <span className={enoughTerms ? 'is-ok' : ''}>{usedTerms.length}/{exercise.requiredCount} vocabulario usado</span>
            </div>
            <div className="writing-integrated__used">
              {exercise.requiredTerms.map(item => {
                const used = usedTerms.includes(item)
                return <span key={item.term} className={used ? 'is-used' : ''}>{used ? 'Usado' : 'Falta'}: {item.label ?? item.term}</span>
              })}
            </div>
            {!readyToReview && (
              <p className="writing-integrated__warning">
                Para terminar, añade {enoughWords ? 'más vocabulario del banco' : 'más desarrollo'}{!enoughWords && !enoughTerms ? ' y más vocabulario del banco' : ''}.
              </p>
            )}
            <button className="btn btn-sm" disabled={!readyToReview} style={{ background: exercise.color, borderColor: exercise.color, opacity: readyToReview ? 1 : 0.45 }} onClick={() => go('review')}>Terminar y comparar</button>
          </section>
        )}

        {stage === 'review' && (
          <section className="writing-integrated__panel">
            <p className="writing-integrated__kicker">Cierre</p>
            <h2>Tu texto y un ejemplo posible</h2>
            <div className="writing-integrated__comparison">
              <article>
                <h3>Lo que escribiste</h3>
                <p>{text}</p>
              </article>
              <article>
                <h3>Modelo del nivel</h3>
                <p>{exercise.modelAnswer}</p>
                <small>{exercise.modelNote}</small>
              </article>
            </div>
            <div className="writing-integrated__actions">
              <button className="btn btn-sm" style={{ background: exercise.color, borderColor: exercise.color }} onClick={() => go('write')}>Editar mi texto</button>
              <button className="btn btn-ghost btn-sm" onClick={() => go('select')}>Elegir otra práctica</button>
              <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setNotes({}); setPlannedTerms([]); go('read') }}>Reiniciar ejercicio</button>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}
