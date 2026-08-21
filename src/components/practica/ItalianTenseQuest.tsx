'use client'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  RotateCcw,
  Trophy,
  X,
} from 'lucide-react'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import {
  CHOICE_CHALLENGES,
  ERROR_CHALLENGES,
  FINAL_CHALLENGE,
  LEVEL_META,
  LONG_STORIES,
  MICRO_STORIES,
  TENSE_COVERAGE,
  TIMELINE_CHALLENGES,
  type GapChallenge,
} from '@/data/practica/italian-tense-quest'
import s from './ItalianTenseQuest.module.css'

const STORAGE_KEY = 'wl-italian-tense-quest-v1'

const LEVEL_LENGTHS = [
  CHOICE_CHALLENGES.length,
  MICRO_STORIES.length,
  LONG_STORIES.length,
  ERROR_CHALLENGES.length,
  TIMELINE_CHALLENGES.length,
  1,
]

function normalize(value: string) {
  return value
    .normalize('NFKC')
    .replace(/[’‘]/g, "'")
    .trim()
    .toLocaleLowerCase('it-IT')
    .replace(/\s+/g, ' ')
}

function accepts(value: string, answers: string[]) {
  const normalized = normalize(value)
  return answers.some((answer) => normalize(answer) === normalized)
}

function GapText({
  challenge,
  answers,
  checked,
  onChange,
}: {
  challenge: GapChallenge
  answers: Record<string, string>
  checked: boolean
  onChange: (id: string, value: string) => void
}) {
  return (
    <div className={s.proseExercise} lang="it">
      {challenge.segments.map((segment, index) => {
        const gap = challenge.gaps[index]
        const value = gap ? answers[gap.id] ?? '' : ''
        const correct = gap ? accepts(value, gap.answers) : false

        return (
          <Fragment key={`${challenge.title}-${index}`}>
            {segment}
            {gap ? (
              <span className={s.inlineAnswer}>
                <input
                  aria-label={`Conjuga ${gap.verb}`}
                  autoComplete="off"
                  className={`${s.gapInput} ${checked ? (correct ? s.inputOk : s.inputAlert) : ''}`}
                  disabled={checked}
                  onChange={(event) => onChange(gap.id, event.target.value)}
                  spellCheck={false}
                  value={value}
                />
                <span className={s.verbHint}>({gap.verb})</span>
              </span>
            ) : null}
          </Fragment>
        )
      })}
    </div>
  )
}

export default function ItalianTenseQuest() {
  const [activeLevel, setActiveLevel] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)
  const [choice, setChoice] = useState('')
  const [gapAnswers, setGapAnswers] = useState<Record<string, string>>({})
  const [selectedError, setSelectedError] = useState('')
  const [correction, setCorrection] = useState('')
  const [timelineAnswers, setTimelineAnswers] = useState<Record<string, string>>({})
  const [bankAnswers, setBankAnswers] = useState<Record<string, string>>({})
  const [activeBankGap, setActiveBankGap] = useState(FINAL_CHALLENGE.gaps[0].id)
  const [checked, setChecked] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({})
  const [summary, setSummary] = useState(false)
  const [bestScores, setBestScores] = useState<Record<number, number>>({})

  useEffect(() => {
    let cancelled = false
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as { bestScores?: Record<number, number> }
      queueMicrotask(() => {
        if (!cancelled && saved.bestScores) setBestScores(saved.bestScores)
      })
    } catch {
      // El progreso local es opcional; un valor corrupto no bloquea el ejercicio.
    }
    return () => { cancelled = true }
  }, [])

  const meta = LEVEL_META[activeLevel]
  const total = LEVEL_LENGTHS[activeLevel]
  const levelCorrect = Object.values(questionResults).filter(Boolean).length
  const progress = summary ? 100 : ((itemIndex + (checked ? 1 : 0)) / total) * 100

  function resetInteraction() {
    setChoice('')
    setGapAnswers({})
    setSelectedError('')
    setCorrection('')
    setTimelineAnswers({})
    setBankAnswers({})
    setActiveBankGap(FINAL_CHALLENGE.gaps[0].id)
    setChecked(false)
    setWasCorrect(false)
  }

  function goToLevel(index: number) {
    setActiveLevel(index)
    setItemIndex(0)
    setQuestionResults({})
    setSummary(false)
    resetInteraction()
  }

  function currentIsComplete() {
    if (activeLevel === 0) return Boolean(choice)

    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? MICRO_STORIES[itemIndex] : LONG_STORIES[itemIndex]
      return challenge.gaps.every((gap) => Boolean(gapAnswers[gap.id]?.trim()))
    }

    if (activeLevel === 3) return Boolean(selectedError && correction.trim())

    if (activeLevel === 4) {
      return TIMELINE_CHALLENGES[itemIndex].slots.every((slot) => Boolean(timelineAnswers[slot.id]))
    }

    return FINAL_CHALLENGE.gaps.every((gap) => Boolean(bankAnswers[gap.id]))
  }

  function currentIsCorrect() {
    if (activeLevel === 0) return choice === CHOICE_CHALLENGES[itemIndex].answer

    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? MICRO_STORIES[itemIndex] : LONG_STORIES[itemIndex]
      return challenge.gaps.every((gap) => accepts(gapAnswers[gap.id] ?? '', gap.answers))
    }

    if (activeLevel === 3) {
      const challenge = ERROR_CHALLENGES[itemIndex]
      return selectedError === challenge.wrongId && accepts(correction, challenge.answers)
    }

    if (activeLevel === 4) {
      return TIMELINE_CHALLENGES[itemIndex].slots.every(
        (slot) => timelineAnswers[slot.id] === slot.answer,
      )
    }

    return FINAL_CHALLENGE.gaps.every((gap) => bankAnswers[gap.id] === gap.answer)
  }

  function checkCurrent() {
    if (checked || !currentIsComplete()) return
    const correct = currentIsCorrect()
    setWasCorrect(correct)
    setChecked(true)
    setQuestionResults((current) => ({ ...current, [itemIndex]: correct }))
  }

  function saveBestScore(score: number) {
    const percentage = Math.round((score / total) * 100)
    const next = { ...bestScores, [activeLevel]: Math.max(bestScores[activeLevel] ?? 0, percentage) }
    setBestScores(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ bestScores: next }))
    } catch {
      // El quiz sigue funcionando aunque el navegador bloquee localStorage.
    }
  }

  function advance() {
    if (itemIndex < total - 1) {
      setItemIndex((value) => value + 1)
      resetInteraction()
      return
    }

    saveBestScore(levelCorrect)
    setSummary(true)
  }

  function retryLevel() {
    setItemIndex(0)
    setQuestionResults({})
    setSummary(false)
    resetInteraction()
  }

  function assignBankForm(form: string) {
    if (checked || Object.values(bankAnswers).includes(form)) return
    const target = activeBankGap || FINAL_CHALLENGE.gaps.find((gap) => !bankAnswers[gap.id])?.id
    if (!target) return

    const next = { ...bankAnswers, [target]: form }
    setBankAnswers(next)
    const nextEmpty = FINAL_CHALLENGE.gaps.find((gap) => gap.id !== target && !next[gap.id])
    if (nextEmpty) setActiveBankGap(nextEmpty.id)
  }

  function clearActiveBankGap() {
    if (checked || !activeBankGap) return
    setBankAnswers((current) => {
      const next = { ...current }
      delete next[activeBankGap]
      return next
    })
  }

  function explanation() {
    if (activeLevel === 0) return CHOICE_CHALLENGES[itemIndex].explanation
    if (activeLevel === 1) return MICRO_STORIES[itemIndex].explanation
    if (activeLevel === 2) return LONG_STORIES[itemIndex].explanation
    if (activeLevel === 3) return ERROR_CHALLENGES[itemIndex].explanation
    if (activeLevel === 4) return TIMELINE_CHALLENGES[itemIndex].explanation
    return FINAL_CHALLENGE.explanation
  }

  function correctAnswer() {
    if (activeLevel === 0) return CHOICE_CHALLENGES[itemIndex].answer
    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? MICRO_STORIES[itemIndex] : LONG_STORIES[itemIndex]
      return challenge.gaps.map((gap) => `${gap.verb}: ${gap.answers[0]}`).join(' · ')
    }
    if (activeLevel === 3) return ERROR_CHALLENGES[itemIndex].answers[0]
    if (activeLevel === 4) return 'Revisa la asignación correcta marcada en cada fila.'
    return 'Revisa las formas y los tiempos indicados dentro del texto.'
  }

  function renderChoice() {
    const challenge = CHOICE_CHALLENGES[itemIndex]
    return (
      <>
        <p className={s.taskInstruction}>{challenge.prompt}</p>
        <p className={s.choiceContext} lang="it">{challenge.context}</p>
        <div className="wlp-option-grid">
          {challenge.options.map((option, index) => {
            const isAnswer = option === challenge.answer
            const isSelected = option === choice
            const statusClass = checked
              ? (isAnswer ? 'wlp-option--ok' : isSelected ? 'wlp-option--alert' : '')
              : isSelected ? 'wlp-option--selected' : ''
            return (
              <button
                className={`wlp-option ${statusClass}`}
                disabled={checked}
                key={option}
                onClick={() => setChoice(option)}
                type="button"
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            )
          })}
        </div>
      </>
    )
  }

  function renderGapLevel(challenge: GapChallenge) {
    return (
      <>
        <p className={s.taskInstruction}>{challenge.instruction}</p>
        <GapText
          answers={gapAnswers}
          challenge={challenge}
          checked={checked}
          onChange={(id, value) => setGapAnswers((current) => ({ ...current, [id]: value }))}
        />
      </>
    )
  }

  function renderErrorHunt() {
    const challenge = ERROR_CHALLENGES[itemIndex]
    return (
      <>
        <p className={s.taskInstruction}>{challenge.instruction}</p>
        <div className={s.errorSentence} lang="it">
          {challenge.chunks.map((chunk) => {
            const selected = selectedError === chunk.id
            const isWrong = chunk.id === challenge.wrongId
            const status = checked
              ? (isWrong ? s.errorTokenAnswer : selected ? s.errorTokenMiss : '')
              : selected ? s.errorTokenSelected : ''
            return (
              <Fragment key={chunk.id}>
                {chunk.before}
                <button
                  aria-pressed={selected}
                  className={`${s.errorToken} ${status}`}
                  disabled={checked}
                  onClick={() => setSelectedError(chunk.id)}
                  type="button"
                >
                  {chunk.form}
                </button>
              </Fragment>
            )
          })}
          {challenge.after}
        </div>
        <label className={s.correctionField}>
          <span>Riscrivi il verbo</span>
          <input
            autoComplete="off"
            disabled={checked}
            onChange={(event) => setCorrection(event.target.value)}
            placeholder={selectedError ? 'Escribe la forma corregida' : 'Primero selecciona el verbo'}
            spellCheck={false}
            value={correction}
          />
        </label>
      </>
    )
  }

  function renderTimeline() {
    const challenge = TIMELINE_CHALLENGES[itemIndex]
    return (
      <>
        <p className={s.taskInstruction}>{challenge.context}</p>
        <div className={s.timelineBoard}>
          {challenge.slots.map((slot, index) => {
            const value = timelineAnswers[slot.id] ?? ''
            const correct = value === slot.answer
            return (
              <label className={s.timelineRow} key={slot.id}>
                <span className={s.timelineMarker}>{index + 1}</span>
                <span className={s.timelineLabel}>
                  <strong>{slot.label}</strong>
                  <small>{slot.hint}</small>
                </span>
                <select
                  className={checked ? (correct ? s.selectOk : s.selectAlert) : ''}
                  disabled={checked}
                  onChange={(event) => setTimelineAnswers((current) => ({ ...current, [slot.id]: event.target.value }))}
                  value={value}
                >
                  <option value="">Scegli la clausola…</option>
                  {challenge.options.map((option) => <option key={option}>{option}</option>)}
                </select>
                {checked && !correct ? <small className={s.rowCorrection}>{slot.answer}</small> : null}
              </label>
            )
          })}
        </div>
      </>
    )
  }

  function renderFinal() {
    const used = new Set(Object.values(bankAnswers))
    return (
      <>
        <p className={s.taskInstruction}>{FINAL_CHALLENGE.instruction}</p>
        <div className={s.manuscript} lang="it">
          {FINAL_CHALLENGE.segments.map((segment, index) => {
            const gap = FINAL_CHALLENGE.gaps[index]
            const value = gap ? bankAnswers[gap.id] ?? '' : ''
            const correct = gap ? value === gap.answer : false
            return (
              <Fragment key={`final-${index}`}>
                {segment}
                {gap ? (
                  <button
                    aria-label={`Espacio ${index + 1}: ${value || 'vacío'}`}
                    className={`${s.bankGap} ${activeBankGap === gap.id ? s.bankGapActive : ''} ${checked ? (correct ? s.bankGapOk : s.bankGapAlert) : ''}`}
                    disabled={checked}
                    onClick={() => setActiveBankGap(gap.id)}
                    type="button"
                  >
                    {checked && !correct ? gap.answer : value || `${index + 1}`}
                    {checked ? <small>{gap.tense}</small> : null}
                  </button>
                ) : null}
              </Fragment>
            )
          })}
        </div>
        <div className={s.bankHeader}>
          <span>Banco de formas</span>
          <button disabled={checked || !bankAnswers[activeBankGap]} onClick={clearActiveBankGap} type="button">
            <X size={14} /> Vaciar selección
          </button>
        </div>
        <div className={s.wordBank}>
          {FINAL_CHALLENGE.bank.map((form) => (
            <button
              className={used.has(form) ? s.bankCardUsed : ''}
              disabled={checked || used.has(form)}
              key={form}
              onClick={() => assignBankForm(form)}
              type="button"
            >
              {form}
            </button>
          ))}
        </div>
      </>
    )
  }

  function renderCurrentExercise() {
    if (activeLevel === 0) return renderChoice()
    if (activeLevel === 1) return renderGapLevel(MICRO_STORIES[itemIndex])
    if (activeLevel === 2) return renderGapLevel(LONG_STORIES[itemIndex])
    if (activeLevel === 3) return renderErrorHunt()
    if (activeLevel === 4) return renderTimeline()
    return renderFinal()
  }

  const currentTitle = activeLevel === 0
    ? CHOICE_CHALLENGES[itemIndex].focus
    : activeLevel === 1
      ? MICRO_STORIES[itemIndex].title
      : activeLevel === 2
        ? LONG_STORIES[itemIndex].title
        : activeLevel === 3
          ? ERROR_CHALLENGES[itemIndex].title
          : activeLevel === 4
            ? TIMELINE_CHALLENGES[itemIndex].title
            : FINAL_CHALLENGE.title

  const currentFocus = activeLevel === 0
    ? CHOICE_CHALLENGES[itemIndex].focus
    : activeLevel === 1
      ? MICRO_STORIES[itemIndex].focus
      : activeLevel === 2
        ? LONG_STORIES[itemIndex].focus
        : activeLevel === 3
          ? ERROR_CHALLENGES[itemIndex].focus
          : activeLevel === 4
            ? TIMELINE_CHALLENGES[itemIndex].focus
            : 'Tutti i tempi · senza congiuntivo'

  const finalPercentage = Math.round((levelCorrect / total) * 100)

  return (
    <main className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.gramatica.var } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav aria-label="Migas de pan" className="wlp-breadcrumb">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/italiano">Italiano</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Tiempos verbales</span>
        </nav>

        <header className={`wlp-hero wlp-hero--compact ${s.hero}`}>
          <div>
            <p className="wlp-eyebrow">Laboratorio acumulativo · A2–B2</p>
            <h1>La macchina del tempo</h1>
            <p className="wlp-hero-lead">
              Seis niveles para dominar el sistema verbal italiano completo, desde el presente hasta el trapassato remoto, sin entrar en el subjuntivo.
            </p>
          </div>
          <dl className={s.heroStats}>
            <div><dt>11</dt><dd>formas</dd></div>
            <div><dt>39</dt><dd>retos</dd></div>
            <div><dt>0</dt><dd>IA</dd></div>
          </dl>
        </header>

        <section aria-label="Mapa temporal" className={s.timeMap}>
          <span>Prima del prima</span>
          <i aria-hidden="true" />
          <span>Prima</span>
          <i aria-hidden="true" />
          <strong>Ora</strong>
          <i aria-hidden="true" />
          <span>Dopo</span>
        </section>

        <details className={s.coverage}>
          <summary>Qué entra en el acumulativo</summary>
          <div>
            {TENSE_COVERAGE.map((tense) => <span key={tense}>{tense}</span>)}
          </div>
          <p>Se excluyen deliberadamente todas las formas del congiuntivo.</p>
        </details>

        <section className="wlp-section" aria-labelledby="level-heading">
          <div className="wlp-section-heading">
            <p className="wlp-eyebrow">Percorso</p>
            <h2 id="level-heading">Sei livelli, una sola storia grammaticale</h2>
            <p>Puedes abrir cualquier nivel durante la clase. El mejor resultado queda guardado solo en este dispositivo.</p>
          </div>

          <div aria-label="Niveles del ejercicio" className={s.levelGrid} role="tablist">
            {LEVEL_META.map((level, index) => {
              const done = typeof bestScores[index] === 'number'
              return (
                <button
                  aria-selected={activeLevel === index}
                  className={`wlp-level-btn ${activeLevel === index ? 'wlp-level-btn--selected' : ''} ${done ? 'wlp-level-btn--done' : ''}`}
                  key={level.number}
                  onClick={() => goToLevel(index)}
                  role="tab"
                  type="button"
                >
                  <span>{done ? <Check size={15} /> : level.number}</span>
                  <strong>{level.title}<small>{done ? `${bestScores[index]}%` : level.short}</small></strong>
                </button>
              )
            })}
          </div>

          <article aria-live="polite" className={`wlp-card wlp-card--path ${s.quizCard}`}>
            <div className={s.quizTopline}>
              <div>
                <span>Nivel {activeLevel + 1} · {meta.title}</span>
                <strong>{summary ? 'Risultato' : `${itemIndex + 1} / ${total}`}</strong>
              </div>
              <span>{meta.description}</span>
            </div>
            <div className="wlp-meter" aria-label={`Progreso ${Math.round(progress)}%`}>
              <span style={{ width: `${progress}%` }} />
            </div>

            {summary ? (
              <div className={s.summary}>
                <Trophy aria-hidden="true" size={34} />
                <p className="wlp-eyebrow">Livello completato</p>
                <h3>{levelCorrect} de {total} correctos</h3>
                <strong>{finalPercentage}%</strong>
                <p>
                  {finalPercentage >= 70
                    ? 'La secuencia temporal está sólida. Puedes pasar al siguiente nivel.'
                    : 'Conviene repetir este nivel antes de aumentar la longitud y la ambigüedad del contexto.'}
                </p>
                <div className="wlp-actions">
                  <button className="wlp-btn wlp-btn--secondary" onClick={retryLevel} type="button">
                    <RotateCcw size={16} /> Repetir nivel
                  </button>
                  {activeLevel < LEVEL_META.length - 1 ? (
                    <button className="wlp-btn" onClick={() => goToLevel(activeLevel + 1)} type="button">
                      Siguiente nivel <ArrowRight size={16} />
                    </button>
                  ) : (
                    <Link className="wlp-btn" href="/practica/italiano">Volver a Italiano</Link>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className={s.taskHeader}>
                  <div>
                    <p className="wlp-eyebrow">{currentFocus}</p>
                    <h3>{currentTitle}</h3>
                  </div>
                  <span>{meta.short}</span>
                </div>

                <div className={s.exerciseBody}>{renderCurrentExercise()}</div>

                {checked ? (
                  <div className={`wlp-feedback ${wasCorrect ? 'wlp-feedback--ok' : 'wlp-feedback--alert'}`} role="status">
                    {wasCorrect ? <CheckCircle2 aria-hidden="true" size={20} /> : <X aria-hidden="true" size={20} />}
                    <div>
                      <strong>{wasCorrect ? 'Corretto' : 'Da rivedere'}</strong>
                      <p>{explanation()}</p>
                      {!wasCorrect ? <p><b>Respuesta:</b> {correctAnswer()}</p> : null}
                    </div>
                  </div>
                ) : null}

                <div className={s.quizActions}>
                  <button
                    className="wlp-btn wlp-btn--secondary"
                    disabled={itemIndex === 0}
                    onClick={() => {
                      setItemIndex((value) => Math.max(0, value - 1))
                      resetInteraction()
                    }}
                    type="button"
                  >
                    <ArrowLeft size={16} /> Anterior
                  </button>
                  {checked ? (
                    <button className="wlp-btn" onClick={advance} type="button">
                      {itemIndex === total - 1 ? 'Ver resultado' : 'Siguiente'} <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button className="wlp-btn" disabled={!currentIsComplete()} onClick={checkCurrent} type="button">
                      Corregir <Check size={16} />
                    </button>
                  )}
                </div>
              </>
            )}
          </article>
        </section>

        <nav aria-label="Siguiente práctica" className="wlp-next">
          <Link href="/practica/italiano/a2/gramatica">Repasar gramática A2</Link>
          <Link href="/practica/italiano/b1/gramatica">Profundizar en B1</Link>
          <Link href="/practica/italiano">Ver todo Italiano</Link>
        </nav>
      </div>
    </main>
  )
}
