'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, EyeOff, RotateCcw, SlidersHorizontal, Trophy, XCircle } from 'lucide-react'

import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import type { PronounChoice, PronounQuestConfig } from '@/data/practica/pronoun-quest-types'

import s from './TenseQuestEngine.module.css'
import p from './PronounQuestEngine.module.css'

type Result = { correct: number; total: number }
type StoredAttempt = {
  selectedTopics: string[]
  activeLevel: number
  itemIndex: number
  answers: Record<number, string>
  savedAnswers: Record<number, Record<number, string>>
  bankAnswers: Record<string, string>
  savedBankAnswers: Record<string, string>
  results: Record<number, Result>
  summary: boolean
}
type StoredQuest = { bestScores?: Record<string, number>; attempt?: StoredAttempt }

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.values(value).every((entry) => typeof entry === 'string')
}

function isNestedStringRecord(value: unknown): value is Record<number, Record<number, string>> {
  return isRecord(value) && Object.values(value).every(isStringRecord)
}

function isResultRecord(value: unknown): value is Record<number, Result> {
  return isRecord(value) && Object.values(value).every((entry) => isRecord(entry)
    && Number.isInteger(entry.correct) && Number(entry.correct) >= 0
    && Number.isInteger(entry.total) && Number(entry.total) > 0)
}

function isBestScoreRecord(value: unknown): value is Record<string, number> {
  return isRecord(value) && Object.values(value).every((score) => typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 100)
}

function safeAttempt(value: unknown, topicIds: ReadonlySet<string>, levelCount: number): value is StoredAttempt {
  if (!isRecord(value)) return false
  const item = value as Partial<StoredAttempt>
  return Array.isArray(item.selectedTopics)
    && item.selectedTopics.length > 0
    && new Set(item.selectedTopics).size === item.selectedTopics.length
    && item.selectedTopics.every((id) => typeof id === 'string' && topicIds.has(id))
    && Number.isInteger(item.activeLevel)
    && Number(item.activeLevel) >= 0
    && Number(item.activeLevel) < levelCount
    && Number.isInteger(item.itemIndex)
    && Number(item.itemIndex) >= 0
    && isStringRecord(item.answers)
    && isNestedStringRecord(item.savedAnswers)
    && isStringRecord(item.bankAnswers)
    && isStringRecord(item.savedBankAnswers)
    && isResultRecord(item.results)
    && typeof item.summary === 'boolean'
}

export default function PronounQuestEngine({ config }: { config: PronounQuestConfig<string> }) {
  const allTopicIds = useMemo(() => config.topics.map((topic) => topic.id), [config.topics])
  const topicIdSet = useMemo(() => new Set(allTopicIds), [allTopicIds])
  const [configured, setConfigured] = useState(false)
  const [draftTopics, setDraftTopics] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [activeLevel, setActiveLevel] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [savedAnswers, setSavedAnswers] = useState<Record<number, Record<number, string>>>({})
  const [bankAnswers, setBankAnswers] = useState<Record<string, string>>({})
  const [savedBankAnswers, setSavedBankAnswers] = useState<Record<string, string>>({})
  const [activeGap, setActiveGap] = useState('')
  const [results, setResults] = useState<Record<number, Result>>({})
  const [summary, setSummary] = useState(false)
  const [bestScores, setBestScores] = useState<Record<string, number>>({})
  const [hydrated, setHydrated] = useState(false)
  const taskHeadingRef = useRef<HTMLHeadingElement>(null)
  const resultHeadingRef = useRef<HTMLHeadingElement>(null)

  const selectedSet = useMemo(() => new Set(selectedTopics), [selectedTopics])
  const choiceLevels = useMemo(() => [
    config.recognition.filter((item) => selectedSet.has(item.topic)),
    config.functions.filter((item) => selectedSet.has(item.topic)),
    config.placement.filter((item) => selectedSet.has(item.topic)),
    config.repairs.filter((item) => selectedSet.has(item.topic)),
    config.transformations.filter((item) => selectedSet.has(item.topic)),
  ], [config, selectedSet])
  const finalView = useMemo(() => {
    const gaps: typeof config.finalChallenge.gaps = []
    const segments = [config.finalChallenge.segments[0] ?? '']
    config.finalChallenge.gaps.forEach((gap, index) => {
      const nextSegment = config.finalChallenge.segments[index + 1] ?? ''
      if (selectedSet.has(gap.topic)) {
        gaps.push(gap)
        segments.push(nextSegment)
      } else {
        const answer = config.finalChallenge.cards.find((card) => card.id === gap.answerCardId)?.text ?? ''
        segments[segments.length - 1] += `${answer}${nextSegment}`
      }
    })
    return { gaps, segments }
  }, [config, selectedSet])
  const finalGaps = finalView.gaps
  const correctFinalCardIds = new Set(finalGaps.map((gap) => gap.answerCardId))
  const finalCards = [
    ...config.finalChallenge.cards.filter((card) => correctFinalCardIds.has(card.id)),
    ...config.finalChallenge.cards.filter((card) => !correctFinalCardIds.has(card.id)).slice(0, Math.max(0, 4 - finalGaps.length)),
  ]
  const total = activeLevel < 5 ? choiceLevels[activeLevel]?.length ?? 0 : finalGaps.length ? 1 : 0
  const current = activeLevel < 5 ? choiceLevels[activeLevel]?.[itemIndex] : undefined

  useEffect(() => {
    let saved: StoredQuest = {}
    try { saved = JSON.parse(localStorage.getItem(config.storageKey) ?? '{}') as StoredQuest } catch { /* progreso opcional */ }
    const url = new URL(window.location.href)
    const requested = [...new Set(url.searchParams.get('topics')?.split(',').filter((id) => topicIdSet.has(id)) ?? [])]
    const urlLevel = Number(url.searchParams.get('level')) - 1
    const requestedLevel = Number.isInteger(urlLevel) && urlLevel >= 0 && urlLevel < config.levels.length ? urlLevel : 0
    const attempt = safeAttempt(saved.attempt, topicIdSet, config.levels.length) ? saved.attempt : undefined
    const sameSelection = attempt && requested.length === attempt.selectedTopics.length && requested.every((id, index) => id === attempt.selectedTopics[index])
    const selection = requested.length ? requested : []

    const restoredLevel = sameSelection ? attempt.activeLevel : requestedLevel
    const restoredTotal = restoredLevel < 5
      ? [config.recognition, config.functions, config.placement, config.repairs, config.transformations][restoredLevel]
        .filter((item) => selection.includes(item.topic)).length
      : 1
    const restoredIndex = sameSelection && Number.isInteger(attempt.itemIndex) && attempt.itemIndex >= 0 && attempt.itemIndex < restoredTotal ? attempt.itemIndex : 0
    const frame = requestAnimationFrame(() => {
      if (selection.length) {
        setConfigured(true)
        setDraftTopics(selection)
        setSelectedTopics(selection)
        setActiveLevel(restoredLevel)
        if (sameSelection) {
          setItemIndex(restoredIndex)
          setAnswers(attempt.answers ?? {})
          setSavedAnswers(attempt.savedAnswers ?? {})
          setBankAnswers(attempt.bankAnswers ?? {})
          setSavedBankAnswers(attempt.savedBankAnswers ?? {})
          setResults(attempt.results ?? {})
          setSummary(Boolean(attempt.summary))
        }
      }
      if (isBestScoreRecord(saved.bestScores)) setBestScores(saved.bestScores)
      setHydrated(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [config, topicIdSet])

  useEffect(() => {
    if (!hydrated) return
    const attempt: StoredAttempt | undefined = configured ? {
      selectedTopics, activeLevel, itemIndex, answers, savedAnswers, bankAnswers, savedBankAnswers, results, summary,
    } : undefined
    localStorage.setItem(config.storageKey, JSON.stringify({ bestScores, attempt }))
  }, [activeLevel, answers, bankAnswers, bestScores, config.storageKey, configured, hydrated, itemIndex, results, savedAnswers, savedBankAnswers, selectedTopics, summary])

  useEffect(() => {
    if (!configured) return
    requestAnimationFrame(() => (summary ? resultHeadingRef.current : taskHeadingRef.current)?.focus())
  }, [activeLevel, configured, itemIndex, summary])

  function updateUrl(topics: string[], level?: number) {
    const url = new URL(window.location.href)
    if (topics.length) url.searchParams.set('topics', topics.join(',')); else url.searchParams.delete('topics')
    if (typeof level === 'number') url.searchParams.set('level', String(level + 1)); else url.searchParams.delete('level')
    window.history.replaceState({}, '', url)
  }

  function toggleTopic(id: string) {
    setDraftTopics((currentTopics) => currentTopics.includes(id) ? currentTopics.filter((topic) => topic !== id) : [...currentTopics, id])
  }

  function configureQuiz() {
    if (!draftTopics.length) return
    const ordered = allTopicIds.filter((id) => draftTopics.includes(id))
    setConfigured(true); setSelectedTopics(ordered); setActiveLevel(0); setItemIndex(0)
    setAnswers({}); setSavedAnswers({}); setBankAnswers({}); setSavedBankAnswers({}); setResults({}); setSummary(false)
    updateUrl(ordered, 0)
  }

  function changeSelection() {
    const hasProgress = Object.keys(savedAnswers).length || Object.keys(savedBankAnswers).length || Object.keys(answers).length || Object.keys(bankAnswers).length
    if (hasProgress && !window.confirm('Cambiar la selección borra el intento actual. ¿Quieres continuar?')) return
    setConfigured(false); setDraftTopics(selectedTopics); setAnswers({}); setSavedAnswers({}); setBankAnswers({}); setSavedBankAnswers({}); setResults({}); setSummary(false); setItemIndex(0); setActiveLevel(0)
    updateUrl([])
  }

  function scoreKey(level: number) { return `${selectedTopics.join('|')}:${level}` }

  function goToLevel(level: number) {
    setActiveLevel(level); setItemIndex(0); setAnswers(savedAnswers[level] ?? {}); setBankAnswers(level === 5 ? savedBankAnswers : {}); setResults({}); setSummary(false); setActiveGap('')
    updateUrl(selectedTopics, level)
  }

  function handleLevelKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let target = index
    if (event.key === 'ArrowRight') target = (index + 1) % config.levels.length
    else if (event.key === 'ArrowLeft') target = (index - 1 + config.levels.length) % config.levels.length
    else if (event.key === 'Home') target = 0
    else if (event.key === 'End') target = config.levels.length - 1
    else return
    event.preventDefault()
    goToLevel(target)
    requestAnimationFrame(() => document.getElementById(`${config.id}-tab-${target}`)?.focus())
  }

  function currentComplete() {
    if (activeLevel < 5) return Boolean(answers[itemIndex])
    return finalGaps.length > 0 && finalGaps.every((gap) => bankAnswers[gap.id])
  }

  function finishLevel(nextAnswers: Record<number, string>, nextBank: Record<string, string>) {
    const levelResults: Record<number, Result> = {}
    if (activeLevel < 5) {
      choiceLevels[activeLevel].forEach((item, index) => { levelResults[index] = { correct: nextAnswers[index] === item.answer ? 1 : 0, total: 1 } })
      setSavedAnswers((saved) => ({ ...saved, [activeLevel]: nextAnswers }))
    } else {
      const correct = finalGaps.reduce((sum, gap) => sum + (nextBank[gap.id] === gap.answerCardId ? 1 : 0), 0)
      levelResults[0] = { correct, total: finalGaps.length }
      setSavedBankAnswers(nextBank)
    }
    const correct = Object.values(levelResults).reduce((sum, result) => sum + result.correct, 0)
    const possible = Object.values(levelResults).reduce((sum, result) => sum + result.total, 0)
    const percentage = possible ? Math.round((correct / possible) * 100) : 0
    setResults(levelResults); setBestScores((scores) => ({ ...scores, [scoreKey(activeLevel)]: Math.max(scores[scoreKey(activeLevel)] ?? 0, percentage) })); setSummary(true)
  }

  function submitCurrent() {
    if (!currentComplete()) return
    if (activeLevel === 5) { finishLevel(answers, bankAnswers); return }
    const nextAnswers = { ...answers }
    if (itemIndex === total - 1) finishLevel(nextAnswers, bankAnswers)
    else setItemIndex((index) => index + 1)
  }

  function goBack() { if (itemIndex > 0) setItemIndex((index) => index - 1) }
  function retryLevel() { setItemIndex(0); setAnswers({}); setBankAnswers({}); setResults({}); setSummary(false); setActiveGap('') }

  function assignCard(cardId: string) {
    if (!activeGap || Object.values(bankAnswers).includes(cardId)) return
    setBankAnswers((currentAnswers) => ({ ...currentAnswers, [activeGap]: cardId }))
  }

  const levelCorrect = Object.values(results).reduce((sum, result) => sum + result.correct, 0)
  const levelPoints = Object.values(results).reduce((sum, result) => sum + result.total, 0)
  const percentage = levelPoints ? Math.round((levelCorrect / levelPoints) * 100) : 0
  const progress = summary ? 100 : total ? ((itemIndex + (currentComplete() ? 1 : 0)) / total) * 100 : 0
  const meta = config.levels[activeLevel]

  function reviewItem(index: number) {
    if (activeLevel < 5) {
      const item = choiceLevels[activeLevel][index]
      return { title: item.focus, submitted: savedAnswers[activeLevel]?.[index] ?? answers[index] ?? 'Sin respuesta', expected: item.answer, explanation: item.explanation }
    }
    const submitted = finalGaps.map((gap) => finalCards.find((card) => card.id === (savedBankAnswers[gap.id] ?? bankAnswers[gap.id]))?.text ?? '—').join(' · ')
    const expected = finalGaps.map((gap) => finalCards.find((card) => card.id === gap.answerCardId)?.text ?? '—').join(' · ')
    return { title: config.finalChallenge.title, submitted, expected, explanation: config.finalChallenge.explanation }
  }

  function renderChoice(item: PronounChoice<string>) {
    return <>
      <p className={p.choicePrompt}>{item.prompt}</p>
      <div className={s.choiceContext} lang={config.languageCode}>{item.context}</div>
      <div className="wlp-option-grid" lang={activeLevel === 1 ? 'es' : config.languageCode}>
        {item.options.map((option) => <button aria-pressed={answers[itemIndex] === option} className="wlp-option" key={option} onClick={() => setAnswers((currentAnswers) => ({ ...currentAnswers, [itemIndex]: option }))} type="button">{option}</button>)}
      </div>
    </>
  }

  function renderBank() {
    const used = new Set(Object.values(bankAnswers))
    return <>
      <p className={p.choicePrompt}>{config.finalChallenge.instruction}</p>
      <div className={p.bankText} lang={config.languageCode}>
        {finalView.segments.map((segment, index) => {
          const gap = finalGaps[index]
          const card = gap ? finalCards.find((item) => item.id === bankAnswers[gap.id]) : undefined
          return <Fragment key={`${config.id}-segment-${index}`}>{segment}{gap ? <button aria-label={`Espacio ${index + 1}: ${gap.label}`} className={`${s.bankGap} ${activeGap === gap.id ? s.bankGapActive : ''}`} onClick={() => setActiveGap(gap.id)} type="button"><span>{card?.text ?? 'Seleccionar'}</span><small>{gap.label}</small></button> : null}</Fragment>
        })}
      </div>
      <div className={s.bankHeader}><span>Banco de pronombres</span><button disabled={!activeGap || !bankAnswers[activeGap]} onClick={() => setBankAnswers((currentAnswers) => { const next = { ...currentAnswers }; delete next[activeGap]; return next })} type="button">Vaciar selección</button></div>
      {finalCards.length > finalGaps.length ? <p className={s.bankHint}>Hay tarjetas distractoras que no se usan.</p> : null}
      <div className={s.wordBank} lang={config.languageCode}>{finalCards.map((card) => <button className={used.has(card.id) ? s.bankCardUsed : ''} disabled={used.has(card.id)} key={card.id} onClick={() => assignCard(card.id)} type="button">{card.text}</button>)}</div>
    </>
  }

  if (!hydrated) return null
  const reviewCount = activeLevel < 5 ? total : 1

  return <div className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.gramatica.var } as React.CSSProperties}>
    <div className="wlp-shell">
      <nav aria-label="Migas de pan" className="wlp-breadcrumb"><Link href="/herramientas">Herramientas</Link><span aria-hidden="true">/</span><Link href="/herramientas/quizes">Quizes</Link><span aria-hidden="true">/</span><Link href="/herramientas/quizes/pronombres">Pronombres</Link><span aria-hidden="true">/</span><span aria-current="page">{config.languageName}</span></nav>
      <header className="wlp-hero wlp-hero--compact"><p className="wlp-eyebrow">Gramática · referentes y función</p><h1 lang={config.languageCode}>{config.title}</h1><p className="wlp-hero-lead">Elige qué familias practicar y aprende a seguir quién hace qué a quién. Todas las respuestas son cerradas y la corrección aparece al terminar el nivel.</p></header>
      <section aria-label="Cadena de referencia" className={p.referenceChain}><span>referente</span><ArrowRight aria-hidden="true" size={15}/><span>función</span><ArrowRight aria-hidden="true" size={15}/><strong>pronombre</strong></section>

      {!configured ? <section aria-labelledby="pronoun-selector-title" className={`wlp-card wlp-card--path ${s.selector}`}>
        <div className={s.selectorHeading}><div><p className="wlp-eyebrow">Configura tu recorrido</p><h2 id="pronoun-selector-title">¿Qué pronombres quieres practicar?</h2><p>Combina familias o trabaja una sola. Cada selección conserva seis niveles completos.</p></div><span className={s.selectionCount}>{draftTopics.length} de {config.topics.length}</span></div>
        <div aria-label="Selecciones rápidas" className={s.presets}>{config.presets.map((preset) => <button key={preset.label} onClick={() => setDraftTopics(preset.ids)} type="button">{preset.label}</button>)}<button onClick={() => setDraftTopics([])} type="button">Limpiar</button></div>
        <div className={s.tenseGrid}>{config.topics.map((topic) => { const selected = draftTopics.includes(topic.id); return <button aria-pressed={selected} className={selected ? s.tenseSelected : ''} key={topic.id} onClick={() => toggleTopic(topic.id)} type="button"><span aria-hidden="true">{selected ? <Check size={16}/> : null}</span><strong>{topic.label}</strong><small>{topic.level} · {topic.group}</small></button> })}</div>
        <div className={s.selectorFooter}><p>{draftTopics.length ? 'No verás aciertos ni errores hasta terminar el nivel.' : 'Selecciona al menos una familia para empezar.'}</p><button className="wlp-btn" disabled={!draftTopics.length} onClick={configureQuiz} type="button">Crear mi quiz <ArrowRight size={16}/></button></div>
      </section> : <section aria-label="Familias seleccionadas" className={s.selectionBar}><div><SlidersHorizontal aria-hidden="true" size={18}/><span>{config.topics.filter((topic) => selectedSet.has(topic.id)).map((topic) => topic.label).join(' · ')}</span></div><button onClick={changeSelection} type="button">Cambiar selección</button></section>}

      {configured ? <section aria-labelledby="pronoun-level-heading" className="wlp-section" id="pronoun-levels">
        <div className="wlp-section-heading"><p className="wlp-eyebrow">Recorrido configurado</p><h2 id="pronoun-level-heading">Seis decisiones, una cadena clara</h2><p>Avanza de reconocer una forma a reconstruir varios referentes sin apoyo abierto.</p></div>
        <div aria-label="Niveles del ejercicio" className={s.levelGrid} role="tablist">{config.levels.map((level, index) => { const best = bestScores[scoreKey(index)]; return <button aria-controls={`${config.id}-panel`} aria-selected={activeLevel === index} className={`wlp-level-btn ${activeLevel === index ? 'wlp-level-btn--selected' : ''} ${typeof best === 'number' ? 'wlp-level-btn--done' : ''}`} id={`${config.id}-tab-${index}`} key={level.number} onClick={() => goToLevel(index)} onKeyDown={(event) => handleLevelKeyDown(event, index)} role="tab" tabIndex={activeLevel === index ? 0 : -1} type="button"><span>{typeof best === 'number' ? <Check size={15}/> : level.number}</span><strong>{level.title}<small>{typeof best === 'number' ? `${best}%` : `${index === 5 ? 1 : choiceLevels[index]?.length ?? 0} reto${index === 5 ? '' : 's'}`}</small></strong></button> })}</div>
        <article aria-labelledby={`${config.id}-tab-${activeLevel}`} className={`wlp-card wlp-card--path ${s.quizCard}`} id={`${config.id}-panel`} role="tabpanel">
          <div className={s.quizTopline}><div><span>Nivel {activeLevel + 1} · {meta.title}</span><strong>{summary ? 'Resultado' : `${itemIndex + 1} / ${total}`}</strong></div><span>{meta.description}</span></div>
          <div aria-label={`Progreso ${Math.round(progress)}%`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={Math.round(progress)} className="wlp-meter" role="progressbar"><span style={{ width: `${progress}%` }}/></div>
          {summary ? <div aria-live="polite" className={s.summary} role="status"><div className={s.summaryScore}><Trophy aria-hidden="true" size={34}/><div><p className="wlp-eyebrow">Nivel completado</p><h3 ref={resultHeadingRef} tabIndex={-1}>{levelCorrect} de {levelPoints} puntos correctos</h3></div><strong>{percentage}%</strong></div><p>{percentage >= 70 ? 'La cadena de referentes está clara. Revisa el detalle y continúa.' : 'Revisa función, concordancia y posición antes de repetir el nivel.'}</p><ol className={s.reviewList}>{Array.from({ length: reviewCount }, (_, index) => { const result = results[index] ?? { correct: 0, total: 1 }; const item = reviewItem(index); const ok = result.correct === result.total; return <li className={ok ? s.reviewOk : s.reviewAlert} key={index}><div className={s.reviewTitle}>{ok ? <CheckCircle2 aria-hidden="true" size={19}/> : <XCircle aria-hidden="true" size={19}/>}<strong>{index + 1}. {item.title} · {result.correct}/{result.total}</strong></div><p><b>Tu respuesta:</b> <span lang={config.languageCode}>{item.submitted}</span></p>{!ok ? <p><b>Respuesta correcta:</b> <span lang={config.languageCode}>{item.expected}</span></p> : null}<small>{item.explanation}</small></li> })}</ol><div className="wlp-actions"><button className="wlp-btn wlp-btn--secondary" onClick={retryLevel} type="button"><RotateCcw size={16}/> Repetir nivel</button>{activeLevel < 5 ? <button className="wlp-btn" onClick={() => goToLevel(activeLevel + 1)} type="button">Siguiente nivel <ArrowRight size={16}/></button> : <Link className="wlp-btn" href="/herramientas/quizes/pronombres">Volver a Pronombres</Link>}</div></div> : <><div className={s.taskHeader}><div><p className="wlp-eyebrow">{current?.focus ?? 'Cadena final'}</p><h3 lang={current ? 'es' : config.languageCode} ref={taskHeadingRef} tabIndex={-1}>{current ? `${config.topics.find((topic) => topic.id === current.topic)?.label ?? current.topic} · ${itemIndex + 1}` : config.finalChallenge.title}</h3></div><span>{meta.short}</span></div><div className={s.exerciseBody}>{current ? renderChoice(current) : renderBank()}</div><p className={s.deferNote}><EyeOff aria-hidden="true" size={16}/>Sin corrección inmediata: tus resultados aparecen al terminar el nivel.</p><div className={s.quizActions}><button className="wlp-btn wlp-btn--secondary" disabled={itemIndex === 0} onClick={goBack} type="button"><ArrowLeft size={16}/> Anterior</button><button className="wlp-btn" disabled={!currentComplete()} onClick={submitCurrent} type="button">{itemIndex === total - 1 ? 'Terminar nivel' : 'Guardar y seguir'} <ArrowRight size={16}/></button></div></>}
        </article>
      </section> : null}
      <nav aria-label="Siguiente práctica" className="wlp-next">{config.reviewLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>
    </div>
  </div>
}
