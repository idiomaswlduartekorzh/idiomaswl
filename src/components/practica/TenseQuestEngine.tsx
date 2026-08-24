'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
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
import type { GapChallenge, TenseQuestConfig } from '@/data/practica/tense-quest-types'

import s from './TenseQuestEngine.module.css'

type ResponseSnapshot = {
  choice?: string
  gapAnswers?: Record<string, string>
  selectedError?: string
  correction?: string
  timelineAnswers?: Record<string, string>
  bankAnswers?: Record<string, string>
}

type QuestionResult = { correct: number; total: number }

type StoredAttempt = {
  selectedTenses: string[]
  activeLevel: number
  itemIndex: number
  responses: Record<number, ResponseSnapshot>
  savedLevelResponses: Record<number, Record<number, ResponseSnapshot>>
  current: ResponseSnapshot
  questionResults: Record<number, QuestionResult>
  summary: boolean
}

type StoredQuest = {
  bestScores?: Record<string, number>
  attempt?: StoredAttempt
}

function normalize(value: string, locale: string) {
  return value
    .normalize('NFKC')
    .replace(/[’‘]/g, "'")
    .trim()
    .toLocaleLowerCase(locale)
    .replace(/\s+/g, ' ')
}

function accepts(value: string, answers: string[], locale: string) {
  const normalized = normalize(value, locale)
  return answers.some((answer) => normalize(answer, locale) === normalized)
}

function GapText({
  challenge,
  answers,
  activeTenses,
  onChange,
  languageCode,
}: {
  challenge: GapChallenge<string>
  answers: Record<string, string>
  activeTenses: ReadonlySet<string>
  onChange: (id: string, value: string) => void
  languageCode: string
}) {
  return (
    <div className={s.proseExercise} lang={languageCode}>
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
                  name={gap.id}
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

export default function TenseQuestEngine({ config }: { config: TenseQuestConfig<string> }) {
  const {
    choiceChallenges: allChoiceChallenges,
    copy,
    errorChallenges: allErrorChallenges,
    finalChallenges,
    forms,
    levels,
    longStories: allLongStories,
    microStories: allMicroStories,
    presets,
    timelineChallenges: allTimelineChallenges,
  } = config
  const finalChallenge = finalChallenges[0]
  const allTenses = forms.map((tense) => tense.id)
  const [configured, setConfigured] = useState(false)
  const [draftTenses, setDraftTenses] = useState<string[]>([])
  const [selectedTenses, setSelectedTenses] = useState<string[]>([])
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
  const [savedLevelResponses, setSavedLevelResponses] = useState<Record<number, Record<number, ResponseSnapshot>>>({})
  const [questionResults, setQuestionResults] = useState<Record<number, QuestionResult>>({})
  const [summary, setSummary] = useState(false)
  const [bestScores, setBestScores] = useState<Record<string, number>>({})
  const [hydrated, setHydrated] = useState(false)
  const taskHeadingRef = useRef<HTMLHeadingElement>(null)
  const resultHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let cancelled = false
    let saved: StoredQuest = {}
    try {
      saved = JSON.parse(localStorage.getItem(config.storageKey) ?? '{}') as StoredQuest
    } catch {
      // El progreso local es opcional; un valor corrupto no bloquea el ejercicio.
    }

    const url = new URL(window.location.href)
    const requested = url.searchParams.get('forms')?.split(',') ?? []
    const valid = forms.filter((form) => requested.includes(form.id)).map((form) => form.id)
    const requestedLevel = Number(url.searchParams.get('level')) - 1
    const level = Number.isInteger(requestedLevel) && requestedLevel >= 0 && requestedLevel < levels.length
      ? requestedLevel
      : 0
    const attempt = saved.attempt
    const canRestore = Boolean(
      valid.length
      && attempt
      && valid.length === attempt.selectedTenses?.length
      && valid.every((id, index) => attempt.selectedTenses[index] === id),
    )
    const restoredLevel = canRestore
      && Number.isInteger(attempt!.activeLevel)
      && attempt!.activeLevel >= 0
      && attempt!.activeLevel < levels.length
      ? attempt!.activeLevel
      : level
    const validSet = new Set(valid)
    const restoredTotals = [
      allChoiceChallenges.filter((challenge) => challenge.tenses.some((id) => validSet.has(id))).length,
      allMicroStories.filter((challenge) => challenge.gaps.some((gap) => validSet.has(gap.tense))).length,
      allLongStories.filter((challenge) => challenge.gaps.some((gap) => validSet.has(gap.tense))).length,
      allErrorChallenges.filter((challenge) => validSet.has(challenge.tense)).length,
      allTimelineChallenges.filter((challenge) => challenge.slots.some((slot) => validSet.has(slot.tense))).length,
      finalChallenge.gaps.some((gap) => validSet.has(gap.tenseId)) ? 1 : 0,
    ]
    const restoredItem = canRestore
      && Number.isInteger(attempt!.itemIndex)
      && attempt!.itemIndex >= 0
      && attempt!.itemIndex < restoredTotals[restoredLevel]
      ? attempt!.itemIndex
      : 0
    const restoredCurrent = canRestore && restoredItem === attempt!.itemIndex
      ? attempt!.current
      : attempt?.responses?.[restoredItem] ?? {}

    queueMicrotask(() => {
      if (cancelled) return
      if (saved.bestScores && typeof saved.bestScores === 'object') setBestScores(saved.bestScores)
      if (valid.length) {
        setDraftTenses(valid)
        setSelectedTenses(valid)
        setConfigured(true)
        setActiveLevel(restoredLevel)
        if (canRestore) {
          setItemIndex(restoredItem)
          setResponses(attempt!.responses ?? {})
          setSavedLevelResponses(attempt!.savedLevelResponses ?? {})
          setQuestionResults(attempt!.questionResults ?? {})
          setSummary(Boolean(attempt!.summary))
          setChoice(restoredCurrent?.choice ?? '')
          setGapAnswers(restoredCurrent?.gapAnswers ?? {})
          setSelectedError(restoredCurrent?.selectedError ?? '')
          setCorrection(restoredCurrent?.correction ?? '')
          setTimelineAnswers(restoredCurrent?.timelineAnswers ?? {})
          setBankAnswers(restoredCurrent?.bankAnswers ?? {})
        }
      }
      setHydrated(true)
    })

    return () => { cancelled = true }
  }, [
    allChoiceChallenges,
    allErrorChallenges,
    allLongStories,
    allMicroStories,
    allTimelineChallenges,
    config.storageKey,
    finalChallenge.gaps,
    forms,
    levels.length,
  ])

  useEffect(() => {
    if (!configured) return
    requestAnimationFrame(() => (summary ? resultHeadingRef.current : taskHeadingRef.current)?.focus())
  }, [activeLevel, configured, itemIndex, summary])

  const selectedSet = useMemo(() => new Set(selectedTenses), [selectedTenses])

  const choiceChallenges = useMemo(
    () => allChoiceChallenges.filter((challenge) => challenge.tenses.some((tense) => selectedSet.has(tense))),
    [allChoiceChallenges, selectedSet],
  )
  const microStories = useMemo(
    () => allMicroStories.filter((challenge) => challenge.gaps.some((gap) => selectedSet.has(gap.tense))),
    [allMicroStories, selectedSet],
  )
  const longStories = useMemo(
    () => allLongStories.filter((challenge) => challenge.gaps.some((gap) => selectedSet.has(gap.tense))),
    [allLongStories, selectedSet],
  )
  const errorChallenges = useMemo(
    () => allErrorChallenges.filter((challenge) => selectedSet.has(challenge.tense)),
    [allErrorChallenges, selectedSet],
  )
  const timelineChallenges = useMemo(
    () => allTimelineChallenges.filter((challenge) => challenge.slots.some((slot) => selectedSet.has(slot.tense))),
    [allTimelineChallenges, selectedSet],
  )
  const finalGaps = useMemo(
    () => finalChallenge.gaps.filter((gap) => selectedSet.has(gap.tenseId)),
    [finalChallenge.gaps, selectedSet],
  )
  const finalBankCards = useMemo(() => {
    const correctIds = new Set(finalGaps.map((gap) => gap.answerCardId))
    const minimumSize = Math.min(finalChallenge.cards.length, Math.max(finalGaps.length, 4))
    const decoyIds = new Set(
      finalChallenge.cards
        .filter((card) => !correctIds.has(card.id))
        .slice(0, Math.max(0, minimumSize - correctIds.size))
        .map((card) => card.id),
    )
    return finalChallenge.cards.filter((card) => correctIds.has(card.id) || decoyIds.has(card.id))
  }, [finalChallenge.cards, finalGaps])

  useEffect(() => {
    if (!hydrated) return
    const stored: StoredQuest = {
      bestScores,
      attempt: configured ? {
        selectedTenses,
        activeLevel,
        itemIndex,
        responses,
        savedLevelResponses,
        current: { choice, gapAnswers, selectedError, correction, timelineAnswers, bankAnswers },
        questionResults,
        summary,
      } : undefined,
    }
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(stored))
    } catch {
      // El quiz sigue funcionando cuando el almacenamiento local está bloqueado.
    }
  }, [
    activeLevel,
    bankAnswers,
    bestScores,
    choice,
    configured,
    config.storageKey,
    correction,
    gapAnswers,
    hydrated,
    itemIndex,
    questionResults,
    responses,
    savedLevelResponses,
    selectedError,
    selectedTenses,
    summary,
    timelineAnswers,
  ])

  function cardText(cardId?: string) {
    return finalChallenge.cards.find((card) => card.id === cardId)?.text ?? ''
  }

  const levelCounts = [
    choiceChallenges.length,
    microStories.length,
    longStories.length,
    errorChallenges.length,
    timelineChallenges.length,
    finalGaps.length ? 1 : 0,
  ]
  const total = levelCounts[activeLevel]
  const meta = levels[activeLevel]
  const levelCorrect = Object.values(questionResults).reduce((sum, result) => sum + result.correct, 0)
  const levelPoints = Object.values(questionResults).reduce((sum, result) => sum + result.total, 0)
  const progress = summary ? 100 : total ? (itemIndex / total) * 100 : 0
  const selectionKey = forms
    .filter((tense) => selectedSet.has(tense.id))
    .map((tense) => tense.id)
    .join('|')
  const finalPercentage = levelPoints ? Math.round((levelCorrect / levelPoints) * 100) : 0

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

  function activeGaps(challenge: GapChallenge<string>) {
    return challenge.gaps.filter((gap) => selectedSet.has(gap.tense))
  }

  function activeTimelineSlots(index: number) {
    return timelineChallenges[index].slots.filter((slot) => selectedSet.has(slot.tense))
  }

  function responseResult(index: number, response: ResponseSnapshot): QuestionResult {
    if (activeLevel === 0) return { correct: response.choice === choiceChallenges[index].answer ? 1 : 0, total: 1 }

    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? microStories[index] : longStories[index]
      const gaps = activeGaps(challenge)
      return {
        correct: gaps.filter((gap) => accepts(response.gapAnswers?.[gap.id] ?? '', gap.answers, copy.languageCode)).length,
        total: gaps.length,
      }
    }

    if (activeLevel === 3) {
      const challenge = errorChallenges[index]
      const correct = response.selectedError === challenge.wrongId && accepts(response.correction ?? '', challenge.answers, copy.languageCode)
      return { correct: correct ? 1 : 0, total: 1 }
    }

    if (activeLevel === 4) {
      const slots = activeTimelineSlots(index)
      return {
        correct: slots.filter((slot) => response.timelineAnswers?.[slot.id] === slot.answer).length,
        total: slots.length,
      }
    }

    return {
      correct: finalGaps.filter((gap) => response.bankAnswers?.[gap.id] === gap.answerCardId).length,
      total: finalGaps.length,
    }
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

  function saveBestScore(score: number, possible: number) {
    const percentage = possible ? Math.round((score / possible) * 100) : 0
    const key = scoreKey(activeLevel)
    const next = { ...bestScores, [key]: Math.max(bestScores[key] ?? 0, percentage) }
    setBestScores(next)
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
      Array.from({ length: total }, (_, index) => [index, responseResult(index, nextResponses[index] ?? {})]),
    )
    const score = Object.values(results).reduce((sum, result) => sum + result.correct, 0)
    const possible = Object.values(results).reduce((sum, result) => sum + result.total, 0)
    setQuestionResults(results)
    setSavedLevelResponses((current) => ({ ...current, [activeLevel]: nextResponses }))
    saveBestScore(score, possible)
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
    const currentResponses = summary ? responses : { ...responses, [itemIndex]: snapshotResponse() }
    const targetResponses = savedLevelResponses[index] ?? {}
    setSavedLevelResponses((current) => ({ ...current, [activeLevel]: currentResponses }))
    setActiveLevel(index)
    setItemIndex(0)
    setResponses(targetResponses)
    setQuestionResults({})
    setSummary(false)
    loadResponse(targetResponses[0])
    const url = new URL(window.location.href)
    url.searchParams.set('level', String(index + 1))
    window.history.replaceState({}, '', url)
  }

  function retryLevel() {
    setItemIndex(0)
    setResponses({})
    setSavedLevelResponses((current) => ({ ...current, [activeLevel]: {} }))
    setQuestionResults({})
    setSummary(false)
    clearInteraction()
  }

  function nextAvailableLevel() {
    return levelCounts.findIndex((count, index) => index > activeLevel && count > 0)
  }

  function handleLevelKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    let target = index
    do target = (target + direction + levels.length) % levels.length
    while (!levelCounts[target] && target !== index)
    goToLevel(target)
    requestAnimationFrame(() => document.getElementById(`${config.id}-tab-${target}`)?.focus())
  }

  function toggleTense(id: string) {
    setDraftTenses((current) => (
      current.includes(id) ? current.filter((tense) => tense !== id) : [...current, id]
    ))
  }

  function configureQuiz() {
    if (!draftTenses.length) return
    const orderedSelection = forms.filter((tense) => draftTenses.includes(tense.id)).map((tense) => tense.id)
    setSelectedTenses(orderedSelection)
    const url = new URL(window.location.href)
    url.searchParams.set('forms', orderedSelection.join(','))
    url.searchParams.set('level', '1')
    window.history.replaceState({}, '', url)
    setConfigured(true)
    setActiveLevel(0)
    setItemIndex(0)
    setResponses({})
    setSavedLevelResponses({})
    setQuestionResults({})
    setSummary(false)
    setChoice('')
    setGapAnswers({})
    setSelectedError('')
    setCorrection('')
    setTimelineAnswers({})
    setBankAnswers({})
    setActiveBankGap('')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => document.getElementById('quiz-levels')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }))
  }

  function hasAttemptProgress() {
    return !summary && (itemIndex > 0
      || Object.keys(responses).length > 0
      || Boolean(choice || selectedError || correction.trim())
      || Object.values(gapAnswers).some(Boolean)
      || Object.values(timelineAnswers).some(Boolean)
      || Object.values(bankAnswers).some(Boolean))
  }

  function changeSelection() {
    if (hasAttemptProgress() && !window.confirm('Cambiar la selección descartará este intento en curso. ¿Quieres continuar?')) return
    const url = new URL(window.location.href)
    url.searchParams.delete('forms')
    url.searchParams.delete('level')
    window.history.replaceState({}, '', url)
    setConfigured(false)
    setActiveLevel(0)
    setItemIndex(0)
    setResponses({})
    setSavedLevelResponses({})
    setQuestionResults({})
    setSummary(false)
    clearInteraction()
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
    return finalChallenge.title
  }

  function itemExplanation(index: number) {
    if (activeLevel === 0) return choiceChallenges[index].explanation
    if (activeLevel === 1) return microStories[index].explanation
    if (activeLevel === 2) return longStories[index].explanation
    if (activeLevel === 3) return errorChallenges[index].explanation
    if (activeLevel === 4) return timelineChallenges[index].explanation
    return finalChallenge.explanation
  }

  function expectedAnswer(index: number) {
    if (activeLevel === 0) return choiceChallenges[index].answer
    if (activeLevel === 1 || activeLevel === 2) {
      const challenge = activeLevel === 1 ? microStories[index] : longStories[index]
      return activeGaps(challenge).map((gap) => `${gap.verb}: ${gap.answers[0]}`).join(' · ')
    }
    if (activeLevel === 3) return errorChallenges[index].answers[0]
    if (activeLevel === 4) return activeTimelineSlots(index).map((slot) => slot.answer).join(' · ')
    return finalGaps.map((gap) => cardText(gap.answerCardId)).join(' · ')
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
    return finalGaps.map((gap) => cardText(response.bankAnswers?.[gap.id]) || '—').join(' · ')
  }

  function renderChoice() {
    const challenge = choiceChallenges[itemIndex]
    return (
      <>
        <p className={s.taskInstruction}>{challenge.prompt}</p>
        <p className={s.choiceContext} lang={copy.languageCode}>{challenge.context}</p>
        <div className="wlp-option-grid" lang={copy.languageCode}>
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

  function renderGapLevel(challenge: GapChallenge<string>) {
    return (
      <>
        <p className={s.taskInstruction}>{challenge.instruction}</p>
        <GapText
          activeTenses={selectedSet}
          answers={gapAnswers}
          challenge={challenge}
          languageCode={copy.languageCode}
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
        <div className={s.errorSentence} lang={copy.languageCode}>
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
          <span>Reescribe el verbo</span>
          <input
            autoComplete="off"
            name={`${config.id}-correction`}
            onChange={(event) => setCorrection(event.target.value)}
            placeholder={selectedError ? 'Escribe la forma corregida…' : 'Primero selecciona el verbo…'}
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
        <div className={s.timelineBoard} lang={copy.languageCode}>
          {slots.map((slot, index) => (
            <label className={s.timelineRow} key={slot.id}>
              <span className={s.timelineMarker}>{index + 1}</span>
              <span className={s.timelineLabel}>
                <strong>{slot.label}</strong>
                <small>{slot.hint}</small>
              </span>
              <select
                name={slot.id}
                onChange={(event) => setTimelineAnswers((current) => ({ ...current, [slot.id]: event.target.value }))}
                value={timelineAnswers[slot.id] ?? ''}
              >
                <option value="">Elige la cláusula…</option>
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
          Completa solo las formas o estructuras que elegiste. Las demás ya están resueltas para conservar la historia.
        </p>
        <div className={s.manuscript} lang={copy.languageCode}>
          {finalChallenge.segments.map((segment, index) => {
            const gap = finalChallenge.gaps[index]
            const isActive = gap ? selectedSet.has(gap.tenseId) : false
            const activeNumber = gap ? finalGaps.findIndex((item) => item.id === gap.id) + 1 : 0
            return (
              <Fragment key={`final-${index}`}>
                {segment}
                {gap && isActive ? (
                  <button
                    aria-label={`Espacio ${activeNumber}: ${cardText(bankAnswers[gap.id]) || 'vacío'}`}
                    className={`${s.bankGap} ${activeBankGap === gap.id ? s.bankGapActive : ''}`}
                    onClick={() => setActiveBankGap(gap.id)}
                    type="button"
                  >
                    {cardText(bankAnswers[gap.id]) || activeNumber}
                  </button>
                ) : gap ? (
                  <span className={s.fixedForm}>{cardText(gap.answerCardId)}</span>
                ) : null}
              </Fragment>
            )
          })}
        </div>
        <div className={s.bankHeader}>
          <span>Banco de formas</span>
          <button disabled={!bankAnswers[activeBankGap]} onClick={clearActiveBankGap} type="button">
            <X aria-hidden="true" size={14} /> Vaciar selección
          </button>
        </div>
        {finalBankCards.length > finalGaps.length ? <p className={s.bankHint}>Hay tarjetas distractoras que no se usan.</p> : null}
        <div className={s.wordBank} lang={copy.languageCode}>
          {finalBankCards.map((card) => (
            <button
              className={used.has(card.id) ? s.bankCardUsed : ''}
              disabled={used.has(card.id)}
              key={card.id}
              onClick={() => assignBankForm(card.id)}
              type="button"
            >
              {card.text}
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
            : `${selectedTenses.length} ${copy.selectedLabel}`
  const nextLevel = nextAvailableLevel()

  return (
    <div className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.gramatica.var } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav aria-label="Migas de pan" className="wlp-breadcrumb">
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <Link href="/herramientas/quizes">Quizes</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.languageName}</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">{copy.eyebrow}</p>
          <h1 lang={copy.languageCode}>{copy.title}</h1>
          <p className="wlp-hero-lead">{copy.lead}</p>
        </header>

        <section aria-label="Mapa de referencia" className={s.timeMap} lang={copy.languageCode}>
          <span>{copy.mapLabels[0]}</span>
          <i aria-hidden="true" />
          <span>{copy.mapLabels[1]}</span>
          <i aria-hidden="true" />
          <strong>{copy.mapLabels[2]}</strong>
          <i aria-hidden="true" />
          <span>{copy.mapLabels[3]}</span>
        </section>

        {!configured ? (
          <section aria-labelledby="tense-selector-title" className={`wlp-card wlp-card--path ${s.selector}`} id="tense-selector">
            <div className={s.selectorHeading}>
              <div>
                <p className="wlp-eyebrow">Configura tu recorrido</p>
                <h2 id="tense-selector-title">{copy.selectorTitle}</h2>
                <p>{copy.selectorLead}</p>
              </div>
              <span className={s.selectionCount}>{draftTenses.length} de {forms.length}</span>
            </div>

            <div aria-label="Selecciones rápidas" className={s.presets}>
              <button onClick={() => setDraftTenses([...allTenses])} type="button">Todos</button>
              {presets.map((preset) => (
                <button key={preset.label} onClick={() => setDraftTenses(preset.ids)} type="button">
                  {preset.label}
                </button>
              ))}
              <button onClick={() => setDraftTenses([])} type="button">Limpiar</button>
            </div>

            <div className={s.tenseGrid} lang={copy.languageCode}>
              {forms.map((tense) => {
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
              <p>{draftTenses.length ? 'La corrección aparecerá cuando termines cada nivel.' : 'Selecciona al menos una forma o estructura para empezar.'}</p>
              <button className="wlp-btn" disabled={!draftTenses.length} onClick={configureQuiz} type="button">
                Crear mi quiz <ArrowRight size={16} />
              </button>
            </div>
          </section>
        ) : (
          <section aria-label="Formas seleccionadas" className={s.selectionBar}>
            <div>
              <SlidersHorizontal aria-hidden="true" size={18} />
              <span lang={copy.languageCode}>
                {forms.filter((tense) => selectedSet.has(tense.id)).map((tense) => tense.label).join(' · ')}
              </span>
            </div>
            <button onClick={changeSelection} type="button">Cambiar selección</button>
          </section>
        )}

        {configured ? (
          <section aria-labelledby="level-heading" className="wlp-section" id="quiz-levels">
            <div className="wlp-section-heading">
              <p className="wlp-eyebrow">{copy.configuredEyebrow}</p>
              <h2 id="level-heading">{copy.levelsTitle}</h2>
              <p>{copy.levelsLead}</p>
            </div>

            <div aria-label="Niveles del ejercicio" className={s.levelGrid} role="tablist">
              {levels.map((level, index) => {
                const best = bestScores[scoreKey(index)]
                const available = levelCounts[index] > 0
                return (
                  <button
                    aria-controls={`${config.id}-panel`}
                    aria-selected={activeLevel === index}
                    className={`wlp-level-btn ${activeLevel === index ? 'wlp-level-btn--selected' : ''} ${typeof best === 'number' ? 'wlp-level-btn--done' : ''}`}
                    disabled={!available}
                    id={`${config.id}-tab-${index}`}
                    key={level.number}
                    onClick={() => goToLevel(index)}
                    onKeyDown={(event) => handleLevelKeyDown(event, index)}
                    role="tab"
                    tabIndex={activeLevel === index ? 0 : -1}
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

            <article
              aria-labelledby={`${config.id}-tab-${activeLevel}`}
              className={`wlp-card wlp-card--path ${s.quizCard}`}
              id={`${config.id}-panel`}
              role="tabpanel"
            >
              <div className={s.quizTopline}>
                <div>
                  <span>Nivel {activeLevel + 1} · {meta.title}</span>
                  <strong>{summary ? 'Resultado' : `${itemIndex + 1} / ${total}`}</strong>
                </div>
                <span>{meta.description}</span>
              </div>
              <div
                aria-label={`Progreso ${Math.round(progress)}%`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={Math.round(progress)}
                className="wlp-meter"
                role="progressbar"
              >
                <span style={{ width: `${progress}%` }} />
              </div>

              {summary ? (
                <div aria-live="polite" className={s.summary} role="status">
                  <div className={s.summaryScore}>
                    <Trophy aria-hidden="true" size={34} />
                    <div>
                      <p className="wlp-eyebrow">Nivel completado</p>
                      <h3 ref={resultHeadingRef} tabIndex={-1}>{levelCorrect} de {levelPoints} puntos correctos</h3>
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
                      const result = questionResults[index] ?? { correct: 0, total: 1 }
                      const correct = result.correct === result.total
                      return (
                        <li className={correct ? s.reviewOk : s.reviewAlert} key={`${activeLevel}-${index}`}>
                          <div className={s.reviewTitle}>
                            {correct
                              ? <CheckCircle2 aria-hidden="true" size={19} />
                              : <XCircle aria-hidden="true" size={19} />}
                            <strong>{index + 1}. {itemTitle(index)} · {result.correct}/{result.total}</strong>
                          </div>
                          <p><b>Tu respuesta:</b> <span lang={copy.languageCode}>{submittedAnswer(index)}</span></p>
                          {!correct ? <p><b>Respuesta correcta:</b> <span lang={copy.languageCode}>{expectedAnswer(index)}</span></p> : null}
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
                      <h3 lang={copy.languageCode} ref={taskHeadingRef} tabIndex={-1}>{currentTitle}</h3>
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
          {copy.reviewLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </div>
  )
}
