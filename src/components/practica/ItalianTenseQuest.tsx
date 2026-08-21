'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  EyeOff,
  RotateCcw,
  SlidersHorizontal,
  Trophy,
  X,
  XCircle,
} from 'lucide-react'

import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import {
  CHOICE_CHALLENGES,
  ERROR_CHALLENGES,
  FINAL_CHALLENGE,
  LEVEL_META,
  LONG_STORIES,
  MICRO_STORIES,
  TENSE_OPTIONS,
  TIMELINE_CHALLENGES,
  type GapChallenge,
  type TenseId,
} from '@/data/practica/italian-tense-quest'

import s from './ItalianTenseQuest.module.css'

const STORAGE_KEY = 'wl-italian-tense-quest-v2'

type ResponseSnapshot = {
  choice?: string
  gapAnswers?: Record<string, string>
  selectedError?: string
  correction?: string
  timelineAnswers?: Record<string, string>
  bankAnswers?: Record<string, string>
}

const ALL_TENSES = TENSE_OPTIONS.map((tense) => tense.id)

const PRESETS: { label: string; ids: TenseId[] }[] = [
  {
    label: 'Pasados',
    ids: ['passato-prossimo', 'imperfetto', 'passato-remoto', 'trapassato-prossimo', 'trapassato-remoto'],
  },
  { label: 'Futuros', ids: ['futuro-semplice', 'futuro-anteriore'] },
  { label: 'Condicionales', ids: ['condizionale-presente', 'condizionale-passato'] },
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
  activeTenses,
  onChange,
}: {
  challenge: GapChallenge
  answers: Record<string, string>
  activeTenses: ReadonlySet<TenseId>
  onChange: (id: string, value: string) => void
}) {
  return (
    <div className={s.proseExercise} lang="it">
      {challenge.segments.map((segment, index) => {
        const gap = challenge.gaps[index]
        const isActive = gap ? activeTenses.has(gap.tense) : false

        return (
          <Fragment key={`${challenge.title}-${index}`}>
            {segment}
            {gap && isActive ? (
              <span className={s.inlineAnswer}>
                <input
                  aria-label={`Conjuga ${gap.verb}`}
                  autoComplete="off"
                  className={s.gapInput}
                  onChange={(event) => onChange(gap.id, event.target.value)}
                  spellCheck={false}
                  value={answers[gap.id] ?? ''}
                />
                <span className={s.verbHint}>({gap.verb})</span>
              </span>
            ) : gap ? (
              <span className={s.fixedForm}>{gap.answers[0]}</span>
            ) : null}
          </Fragment>
        )
      })}
    </div>
  )
}

export default function ItalianTenseQuest() {
  const [configured, setConfigured] = useState(false)
  const [draftTenses, setDraftTenses] = useState<TenseId[]>([])
  const [selectedTenses, setSelectedTenses] = useState<TenseId[]>([])
  const [activeLevel, setActiveLevel] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)
  const [choice, setChoice] = useState('')
  const [gapAnswers, setGapAnswers] = useState<Record<string, string>>({})
  const [selectedError, setSelectedError] = useState('')
  const [correction, setCorrection] = useState('')
  const [timelineAnswers, setTimelineAnswers] = useState<Record<string, string>>({})
  const [bankAnswers, setBankAnswers] = useState<Record<string, string>>({})
  const [activeBankGap, setActiveBankGap] = useState('')
  const [responses, setResponses] = useState<Record<number, ResponseSnapshot>>({})
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({})
  const [summary, setSummary] = useState(false)
  const [bestScores, setBestScores] = useState<Record<string, number>>({})

  useEffect(() => {
    let cancelled = false
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {
        bestScores?: Record<string, number>
      }
      queueMicrotask(() => {
        if (!cancelled && saved.bestScores) setBestScores(saved.bestScores)
      })
    } catch {
      // El progreso local es opcional; un valor corrupto no bloquea el ejercicio.
    }
    return () => { cancelled = true }
  }, [])

  const selectedSet = useMemo(() => new Set<TenseId>(selectedTenses), [selectedTenses])

  const choiceChallenges = useMemo(
    () => CHOICE_CHALLENGES.filter((challenge) => challenge.tenses.some((tense) => selectedSet.has(tense))),
    [selectedSet],
  )
  const microStories = useMemo(
    () => MICRO_STORIES.filter((challenge) => challenge.gaps.some((gap) => selectedSet.has(gap.tense))),
    [selectedSet],
  )
  const longStories = useMemo(
    () => LONG_STORIES.filter((challenge) => challenge.gaps.some((gap) => selectedSet.has(gap.tense))),
    [selectedSet],
  )
  const errorChallenges = useMemo(
    () => ERROR_CHALLENGES.filter((challenge) => selectedSet.has(challenge.tense)),
    [selectedSet],
  )
  const timelineChallenges = useMemo(
    () => TIMELINE_CHALLENGES.filter((challenge) => challenge.slots.some((slot) => selectedSet.has(slot.tense))),
    [selectedSet],
  )
  const finalGaps = useMemo(
    () => FINAL_CHALLENGE.gaps.filter((gap) => selectedSet.has(gap.tenseId)),
    [selectedSet],
  )

  const levelCounts = [
    choiceChallenges.length,
    microStories.length,
    longStories.length,
    errorChallenges.length,
    timelineChallenges.length,
    finalGaps.length ? 1 : 0,
  ]
  const total = levelCounts[activeLevel]
  const meta = LEVEL_META[activeLevel]
  const levelCorrect = Object.values(questionResults).filter(Boolean).length
  const progress = summary ? 100 : total ? (itemIndex / total) * 100 : 0
  const selectionKey = TENSE_OPTIONS
    .filter((tense) => selectedSet.has(tense.id))
    .map((tense) => tense.id)
    .join('|')
  const finalPercentage = total ? Math.round((levelCorrect / total) * 100) : 0

  function scoreKey(level: number) {
    return `${selectionKey}:${level}`
  }

  function clearInteraction() {
    setChoice('')
    setGapAnswers({})
    setSelectedError('')
    setCorrection('')
    setTimelineAnswers({})
    setBankAnswers({})
    setActiveBankGap(finalGaps[0]?.id ?? '')
  }

  function loadResponse(response?: ResponseSnapshot) {
    setChoice(response?.choice ?? '')
    setGapAnswers(response?.gapAnswers ?? {})
    setSelectedError(response?.selectedError ?? '')
    setCorrection(response?.correction ?? '')
    setTimelineAnswers(response?.timelineAnswers ?? {})
    setBankAnswers(response?.bankAnswers ?? {})
    const nextEmptyGap = finalGaps.find((gap) => !response?.bankAnswers?.[gap.id])
    setActiveBankGap(nextEmptyGap?.id ?? finalGaps[0]?.id ?? '')
  }

  function snapshotResponse(): ResponseSnapshot {
    return { choice, gapAnswers, selectedError, correction, timelineAnswers, bankAnswers }
  }

  function activeGaps(challenge: GapChallenge) {
    return challenge.gaps.filter((gap) => selectedSet.has(gap.tense))
  }

  function activeTimelineSlots(index: number) {
    return timelineChallenges[index].slots.filter((slot) => selectedSet.has(slot.tense))
  }

  function responseIsCorrect(index: number, response: ResponseSnapshot) {
    if (activeLevel === 0) return response.choice === choiceChallenges[index].answer

    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? microStories[index] : longStories[index]
      return activeGaps(challenge).every((gap) => accepts(response.gapAnswers?.[gap.id] ?? '', gap.answers))
    }

    if (activeLevel === 3) {
      const challenge = errorChallenges[index]
      return response.selectedError === challenge.wrongId && accepts(response.correction ?? '', challenge.answers)
    }

    if (activeLevel === 4) {
      return activeTimelineSlots(index).every(
        (slot) => response.timelineAnswers?.[slot.id] === slot.answer,
      )
    }

    return finalGaps.every((gap) => response.bankAnswers?.[gap.id] === gap.answer)
  }

  function currentIsComplete() {
    if (activeLevel === 0) return Boolean(choice)

    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? microStories[itemIndex] : longStories[itemIndex]
      return activeGaps(challenge).every((gap) => Boolean(gapAnswers[gap.id]?.trim()))
    }

    if (activeLevel === 3) return Boolean(selectedError && correction.trim())

    if (activeLevel === 4) {
      return activeTimelineSlots(itemIndex).every((slot) => Boolean(timelineAnswers[slot.id]))
    }

    return finalGaps.every((gap) => Boolean(bankAnswers[gap.id]))
  }

  function saveBestScore(score: number) {
    const percentage = Math.round((score / total) * 100)
    const key = scoreKey(activeLevel)
    const next = { ...bestScores, [key]: Math.max(bestScores[key] ?? 0, percentage) }
    setBestScores(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ bestScores: next }))
    } catch {
      // El quiz sigue funcionando aunque el navegador bloquee localStorage.
    }
  }

  function submitCurrent() {
    if (!currentIsComplete()) return

    const current = snapshotResponse()
    const nextResponses = { ...responses, [itemIndex]: current }
    setResponses(nextResponses)

    if (itemIndex < total - 1) {
      const nextIndex = itemIndex + 1
      setItemIndex(nextIndex)
      loadResponse(nextResponses[nextIndex])
      return
    }

    const results = Object.fromEntries(
      Array.from({ length: total }, (_, index) => [index, responseIsCorrect(index, nextResponses[index] ?? {})]),
    )
    const score = Object.values(results).filter(Boolean).length
    setQuestionResults(results)
    saveBestScore(score)
    setSummary(true)
  }

  function goBack() {
    if (itemIndex === 0) return
    const nextResponses = { ...responses, [itemIndex]: snapshotResponse() }
    const previousIndex = itemIndex - 1
    setResponses(nextResponses)
    setItemIndex(previousIndex)
    loadResponse(nextResponses[previousIndex])
  }

  function goToLevel(index: number) {
    if (!levelCounts[index]) return
    setActiveLevel(index)
    setItemIndex(0)
    setResponses({})
    setQuestionResults({})
    setSummary(false)
    clearInteraction()
  }

  function retryLevel() {
    setItemIndex(0)
    setResponses({})
    setQuestionResults({})
    setSummary(false)
    clearInteraction()
  }

  function nextAvailableLevel() {
    return levelCounts.findIndex((count, index) => index > activeLevel && count > 0)
  }

  function toggleTense(id: TenseId) {
    setDraftTenses((current) => (
      current.includes(id) ? current.filter((tense) => tense !== id) : [...current, id]
    ))
  }

  function configureQuiz() {
    if (!draftTenses.length) return
    setSelectedTenses(TENSE_OPTIONS.filter((tense) => draftTenses.includes(tense.id)).map((tense) => tense.id))
    setConfigured(true)
    setActiveLevel(0)
    setItemIndex(0)
    setResponses({})
    setQuestionResults({})
    setSummary(false)
    setChoice('')
    setGapAnswers({})
    setSelectedError('')
    setCorrection('')
    setTimelineAnswers({})
    setBankAnswers({})
    setActiveBankGap('')
    requestAnimationFrame(() => document.getElementById('quiz-levels')?.scrollIntoView({ behavior: 'smooth' }))
  }

  function assignBankForm(form: string) {
    if (Object.values(bankAnswers).includes(form)) return
    const target = activeBankGap || finalGaps.find((gap) => !bankAnswers[gap.id])?.id
    if (!target) return

    const next = { ...bankAnswers, [target]: form }
    setBankAnswers(next)
    const nextEmpty = finalGaps.find((gap) => gap.id !== target && !next[gap.id])
    if (nextEmpty) setActiveBankGap(nextEmpty.id)
  }

  function clearActiveBankGap() {
    if (!activeBankGap) return
    setBankAnswers((current) => {
      const next = { ...current }
      delete next[activeBankGap]
      return next
    })
  }

  function itemTitle(index: number) {
    if (activeLevel === 0) return choiceChallenges[index].focus
    if (activeLevel === 1) return microStories[index].title
    if (activeLevel === 2) return longStories[index].title
    if (activeLevel === 3) return errorChallenges[index].title
    if (activeLevel === 4) return timelineChallenges[index].title
    return FINAL_CHALLENGE.title
  }

  function itemExplanation(index: number) {
    if (activeLevel === 0) return choiceChallenges[index].explanation
    if (activeLevel === 1) return microStories[index].explanation
    if (activeLevel === 2) return longStories[index].explanation
    if (activeLevel === 3) return errorChallenges[index].explanation
    if (activeLevel === 4) return timelineChallenges[index].explanation
    return FINAL_CHALLENGE.explanation
  }

  function expectedAnswer(index: number) {
    if (activeLevel === 0) return choiceChallenges[index].answer
    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? microStories[index] : longStories[index]
      return activeGaps(challenge).map((gap) => `${gap.verb}: ${gap.answers[0]}`).join(' · ')
    }
    if (activeLevel === 3) return errorChallenges[index].answers[0]
    if (activeLevel === 4) return activeTimelineSlots(index).map((slot) => slot.answer).join(' · ')
    return finalGaps.map((gap) => gap.answer).join(' · ')
  }

  function submittedAnswer(index: number) {
    const response = responses[index] ?? {}
    if (activeLevel === 0) return response.choice || 'Sin respuesta'
    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? microStories[index] : longStories[index]
      return activeGaps(challenge)
        .map((gap) => `${gap.verb}: ${response.gapAnswers?.[gap.id] || '—'}`)
        .join(' · ')
    }
    if (activeLevel === 3) return response.correction || 'Sin corrección'
    if (activeLevel === 4) {
      return activeTimelineSlots(index).map((slot) => response.timelineAnswers?.[slot.id] || '—').join(' · ')
    }
    return finalGaps.map((gap) => response.bankAnswers?.[gap.id] || '—').join(' · ')
  }

  function renderChoice() {
    const challenge = choiceChallenges[itemIndex]
    return (
      <>
        <p className={s.taskInstruction}>{challenge.prompt}</p>
        <p className={s.choiceContext} lang="it">{challenge.context}</p>
        <div className="wlp-option-grid">
          {challenge.options.map((option, index) => (
            <button
              aria-pressed={option === choice}
              className={`wlp-option ${option === choice ? 'wlp-option--selected' : ''}`}
              key={option}
              onClick={() => setChoice(option)}
              type="button"
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
            </button>
          ))}
        </div>
      </>
    )
  }

  function renderGapLevel(challenge: GapChallenge) {
    return (
      <>
        <p className={s.taskInstruction}>{challenge.instruction}</p>
        <GapText
          activeTenses={selectedSet}
          answers={gapAnswers}
          challenge={challenge}
          onChange={(id, value) => setGapAnswers((current) => ({ ...current, [id]: value }))}
        />
      </>
    )
  }

  function renderErrorHunt() {
    const challenge = errorChallenges[itemIndex]
    return (
      <>
        <p className={s.taskInstruction}>{challenge.instruction}</p>
        <div className={s.errorSentence} lang="it">
          {challenge.chunks.map((chunk) => (
            <Fragment key={chunk.id}>
              {chunk.before}
              <button
                aria-pressed={selectedError === chunk.id}
                className={`${s.errorToken} ${selectedError === chunk.id ? s.errorTokenSelected : ''}`}
                onClick={() => setSelectedError(chunk.id)}
                type="button"
              >
                {chunk.form}
              </button>
            </Fragment>
          ))}
          {challenge.after}
        </div>
        <label className={s.correctionField}>
          <span>Riscrivi il verbo</span>
          <input
            autoComplete="off"
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
    const challenge = timelineChallenges[itemIndex]
    const slots = activeTimelineSlots(itemIndex)
    return (
      <>
        <p className={s.taskInstruction}>{challenge.context}</p>
        <div className={s.timelineBoard}>
          {slots.map((slot, index) => (
            <label className={s.timelineRow} key={slot.id}>
              <span className={s.timelineMarker}>{index + 1}</span>
              <span className={s.timelineLabel}>
                <strong>{slot.label}</strong>
                <small>{slot.hint}</small>
              </span>
              <select
                onChange={(event) => setTimelineAnswers((current) => ({ ...current, [slot.id]: event.target.value }))}
                value={timelineAnswers[slot.id] ?? ''}
              >
                <option value="">Scegli la clausola…</option>
                {challenge.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
        </div>
      </>
    )
  }

  function renderFinal() {
    const used = new Set(Object.values(bankAnswers))
    return (
      <>
        <p className={s.taskInstruction}>
          Completa solo los tiempos que elegiste. Las demás formas ya están resueltas para conservar la historia.
        </p>
        <div className={s.manuscript} lang="it">
          {FINAL_CHALLENGE.segments.map((segment, index) => {
            const gap = FINAL_CHALLENGE.gaps[index]
            const isActive = gap ? selectedSet.has(gap.tenseId) : false
            const activeNumber = gap ? finalGaps.findIndex((item) => item.id === gap.id) + 1 : 0
            return (
              <Fragment key={`final-${index}`}>
                {segment}
                {gap && isActive ? (
                  <button
                    aria-label={`Espacio ${activeNumber}: ${bankAnswers[gap.id] || 'vacío'}`}
                    className={`${s.bankGap} ${activeBankGap === gap.id ? s.bankGapActive : ''}`}
                    onClick={() => setActiveBankGap(gap.id)}
                    type="button"
                  >
                    {bankAnswers[gap.id] || activeNumber}
                  </button>
                ) : gap ? (
                  <span className={s.fixedForm}>{gap.answer}</span>
                ) : null}
              </Fragment>
            )
          })}
        </div>
        <div className={s.bankHeader}>
          <span>Banco de formas</span>
          <button disabled={!bankAnswers[activeBankGap]} onClick={clearActiveBankGap} type="button">
            <X size={14} /> Vaciar selección
          </button>
        </div>
        <div className={s.wordBank}>
          {finalGaps.map((gap) => (
            <button
              className={used.has(gap.answer) ? s.bankCardUsed : ''}
              disabled={used.has(gap.answer)}
              key={gap.id}
              onClick={() => assignBankForm(gap.answer)}
              type="button"
            >
              {gap.answer}
            </button>
          ))}
        </div>
      </>
    )
  }

  function renderCurrentExercise() {
    if (activeLevel === 0) return renderChoice()
    if (activeLevel === 1) return renderGapLevel(microStories[itemIndex])
    if (activeLevel === 2) return renderGapLevel(longStories[itemIndex])
    if (activeLevel === 3) return renderErrorHunt()
    if (activeLevel === 4) return renderTimeline()
    return renderFinal()
  }

  const currentTitle = total ? itemTitle(itemIndex) : ''
  const currentFocus = activeLevel === 0
    ? choiceChallenges[itemIndex]?.focus
    : activeLevel === 1
      ? microStories[itemIndex]?.focus
      : activeLevel === 2
        ? longStories[itemIndex]?.focus
        : activeLevel === 3
          ? errorChallenges[itemIndex]?.focus
          : activeLevel === 4
            ? timelineChallenges[itemIndex]?.focus
            : `${selectedTenses.length} tiempos seleccionados`
  const nextLevel = nextAvailableLevel()

  return (
    <main className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.gramatica.var } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav aria-label="Migas de pan" className="wlp-breadcrumb">
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <Link href="/herramientas/quizes">Quizes</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Italiano</span>
        </nav>

        <header className={`wlp-hero wlp-hero--compact ${s.hero}`}>
          <div>
            <p className="wlp-eyebrow">Quiz de tiempos · A2–B2</p>
            <h1>La macchina del tempo</h1>
            <p className="wlp-hero-lead">
              Elige los tiempos que quieres practicar. El quiz adapta cada nivel y guarda la corrección hasta el final.
            </p>
          </div>
          <dl className={s.heroStats}>
            <div><dt>11</dt><dd>tiempos</dd></div>
            <div><dt>6</dt><dd>niveles</dd></div>
            <div><dt>1</dt><dd>resultado final</dd></div>
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

        {!configured ? (
          <section aria-labelledby="tense-selector-title" className={s.selector} id="tense-selector">
            <div className={s.selectorHeading}>
              <div>
                <p className="wlp-eyebrow">Configura tu recorrido</p>
                <h2 id="tense-selector-title">¿Qué tiempos quieres practicar?</h2>
                <p>Puedes combinar varios. Los textos mostrarán huecos solo para los tiempos elegidos.</p>
              </div>
              <span className={s.selectionCount}>{draftTenses.length} de {TENSE_OPTIONS.length}</span>
            </div>

            <div aria-label="Selecciones rápidas" className={s.presets}>
              <button onClick={() => setDraftTenses([...ALL_TENSES])} type="button">Todos</button>
              {PRESETS.map((preset) => (
                <button key={preset.label} onClick={() => setDraftTenses(preset.ids)} type="button">
                  {preset.label}
                </button>
              ))}
              <button onClick={() => setDraftTenses([])} type="button">Limpiar</button>
            </div>

            <div className={s.tenseGrid}>
              {TENSE_OPTIONS.map((tense) => {
                const selected = draftTenses.includes(tense.id)
                return (
                  <button
                    aria-pressed={selected}
                    className={selected ? s.tenseSelected : ''}
                    key={tense.id}
                    onClick={() => toggleTense(tense.id)}
                    type="button"
                  >
                    <span aria-hidden="true">{selected ? <Check size={16} /> : null}</span>
                    <strong>{tense.label}</strong>
                    <small>{tense.group}</small>
                  </button>
                )
              })}
            </div>

            <div className={s.selectorFooter}>
              <p>{draftTenses.length ? 'La corrección aparecerá cuando termines cada nivel.' : 'Selecciona al menos un tiempo para empezar.'}</p>
              <button className="wlp-btn" disabled={!draftTenses.length} onClick={configureQuiz} type="button">
                Crear mi quiz <ArrowRight size={16} />
              </button>
            </div>
          </section>
        ) : (
          <section aria-label="Tiempos seleccionados" className={s.selectionBar}>
            <div>
              <SlidersHorizontal aria-hidden="true" size={18} />
              <span>
                {TENSE_OPTIONS.filter((tense) => selectedSet.has(tense.id)).map((tense) => tense.label).join(' · ')}
              </span>
            </div>
            <button onClick={() => setConfigured(false)} type="button">Cambiar tiempos</button>
          </section>
        )}

        {configured ? (
          <section aria-labelledby="level-heading" className="wlp-section" id="quiz-levels">
            <div className="wlp-section-heading">
              <p className="wlp-eyebrow">Percorso personalizzato</p>
              <h2 id="level-heading">Sei livelli, senza pistas entre preguntas</h2>
              <p>Responde todo el nivel primero. Verás aciertos, errores y explicaciones únicamente al terminarlo.</p>
            </div>

            <div aria-label="Niveles del ejercicio" className={s.levelGrid} role="tablist">
              {LEVEL_META.map((level, index) => {
                const best = bestScores[scoreKey(index)]
                const available = levelCounts[index] > 0
                return (
                  <button
                    aria-selected={activeLevel === index}
                    className={`wlp-level-btn ${activeLevel === index ? 'wlp-level-btn--selected' : ''} ${typeof best === 'number' ? 'wlp-level-btn--done' : ''}`}
                    disabled={!available}
                    key={level.number}
                    onClick={() => goToLevel(index)}
                    role="tab"
                    type="button"
                  >
                    <span>{typeof best === 'number' ? <Check size={15} /> : level.number}</span>
                    <strong>
                      {level.title}
                      <small>{available ? (typeof best === 'number' ? `${best}%` : `${levelCounts[index]} reto${levelCounts[index] === 1 ? '' : 's'}`) : 'Sin retos'}</small>
                    </strong>
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
                  <div className={s.summaryScore}>
                    <Trophy aria-hidden="true" size={34} />
                    <div>
                      <p className="wlp-eyebrow">Livello completato</p>
                      <h3>{levelCorrect} de {total} correctos</h3>
                    </div>
                    <strong>{finalPercentage}%</strong>
                  </div>
                  <p>
                    {finalPercentage >= 70
                      ? 'La secuencia temporal está sólida. Revisa el detalle y continúa cuando quieras.'
                      : 'Revisa cada corrección antes de repetir el nivel o aumentar la dificultad.'}
                  </p>

                  <ol className={s.reviewList}>
                    {Array.from({ length: total }, (_, index) => {
                      const correct = questionResults[index]
                      return (
                        <li className={correct ? s.reviewOk : s.reviewAlert} key={`${activeLevel}-${index}`}>
                          <div className={s.reviewTitle}>
                            {correct
                              ? <CheckCircle2 aria-hidden="true" size={19} />
                              : <XCircle aria-hidden="true" size={19} />}
                            <strong>{index + 1}. {itemTitle(index)}</strong>
                          </div>
                          <p><b>Tu respuesta:</b> {submittedAnswer(index)}</p>
                          {!correct ? <p><b>Respuesta correcta:</b> {expectedAnswer(index)}</p> : null}
                          <small>{itemExplanation(index)}</small>
                        </li>
                      )
                    })}
                  </ol>

                  <div className="wlp-actions">
                    <button className="wlp-btn wlp-btn--secondary" onClick={retryLevel} type="button">
                      <RotateCcw size={16} /> Repetir nivel
                    </button>
                    {nextLevel >= 0 ? (
                      <button className="wlp-btn" onClick={() => goToLevel(nextLevel)} type="button">
                        Siguiente nivel <ArrowRight size={16} />
                      </button>
                    ) : (
                      <Link className="wlp-btn" href="/herramientas/quizes">Volver a Quizes</Link>
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

                  <p className={s.deferNote}>
                    <EyeOff aria-hidden="true" size={16} />
                    Sin corrección inmediata: tus resultados aparecen al terminar el nivel.
                  </p>

                  <div className={s.quizActions}>
                    <button className="wlp-btn wlp-btn--secondary" disabled={itemIndex === 0} onClick={goBack} type="button">
                      <ArrowLeft size={16} /> Anterior
                    </button>
                    <button className="wlp-btn" disabled={!currentIsComplete()} onClick={submitCurrent} type="button">
                      {itemIndex === total - 1 ? 'Terminar nivel' : 'Guardar y seguir'} <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </article>
          </section>
        ) : null}

        <nav aria-label="Siguiente práctica" className="wlp-next">
          <Link href="/practica/italiano/a2/gramatica">Repasar gramática A2</Link>
          <Link href="/practica/italiano/b1/gramatica">Profundizar en B1</Link>
          <Link href="/herramientas/quizes">Ver más quizes</Link>
        </nav>
      </div>
    </main>
  )
}
