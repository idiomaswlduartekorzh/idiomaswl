'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { saveSkillCompletion } from '@/lib/progress'
import type { GrammarTopic } from '@/data/practica/grammar-types'
import {
  buildGrammarQuest,
  displayQuestAnswer,
  type GrammarQuestItem,
  type GrammarQuestLevel,
} from '@/components/practica/grammarQuestAdapter'
import { useGrammarQuestProgress } from '@/components/practica/useGrammarQuestProgress'

interface Props {
  topic: GrammarTopic
  lang: string
  level: string
  skill: string
  color: string
}

interface LevelResult {
  score: number
  total: number
  percent: number
  xpEarned: number
  globalXpEarned: number
  reason: 'completed' | 'time'
}

interface ReviewItem {
  item: GrammarQuestItem
  user: string
  ok: boolean
}

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[¿?¡!.,;:]/g, '')
    .replace(/\s+/g, ' ')
}

function hasAnswer(answers: Record<string, string>, item: GrammarQuestItem) {
  return Object.prototype.hasOwnProperty.call(answers, item.id)
}

function matchesAnswer(user: string, item: GrammarQuestItem) {
  const normalized = normalizeAnswer(user)
  return item.accepted.some((answer) => normalizeAnswer(answer) === normalized)
}

function userAnswerLabel(item: GrammarQuestItem, answers: Record<string, string>) {
  if (!hasAnswer(answers, item)) return '(sin respuesta)'
  const value = answers[item.id]
  if (item.isZeroAnswer && value.trim() === '') return displayQuestAnswer(item.answer)
  return value.trim() || '(vacío)'
}

function buildReview(level: GrammarQuestLevel, answers: Record<string, string>): ReviewItem[] {
  return level.items.map((item) => {
    const user = hasAnswer(answers, item) ? answers[item.id] : ''
    return {
      item,
      user,
      ok: matchesAnswer(user, item),
    }
  })
}

export default function GrammarQuest({ topic, lang, level, skill, color }: Props) {
  const quest = useMemo(() => buildGrammarQuest(topic), [topic])
  const storageKey = `wl-grammar-quest:${lang}:${level}:${topic.slug}`
  const {
    mounted,
    progress,
    completedLevels,
    saveLevelResult,
    setActiveLevel,
    resetProgress,
  } = useGrammarQuestProgress(storageKey, quest.levels.length)

  const [activeLevelIdx, setActiveLevelIdx] = useState(0)
  const [phase, setPhase] = useState<'practicing' | 'reviewing'>('practicing')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [review, setReview] = useState<ReviewItem[]>([])
  const [result, setResult] = useState<LevelResult | null>(null)
  const [sprintStarted, setSprintStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(75)

  const activeLevel = quest.levels[activeLevelIdx]
  const currentItem = activeLevel.items[currentIdx]
  const isSprint = activeLevel.mode === 'sprint'
  const sprintWaiting = isSprint && !sprintStarted && phase === 'practicing'
  const progressPct = activeLevel.items.length > 0
    ? ((currentIdx + 1) / activeLevel.items.length) * 100
    : 0

  useEffect(() => {
    if (!mounted) return
    const next = Math.min(progress.activeLevel, quest.levels.length - 1)
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setActiveLevelIdx(next)
      setTimeLeft(quest.levels[next]?.durationSeconds ?? 75)
      setSprintStarted(quest.levels[next]?.mode !== 'sprint')
    })
    return () => {
      cancelled = true
    }
  }, [mounted, progress.activeLevel, quest.levels])

  const resetRun = useCallback((levelIdx: number) => {
    const nextLevel = quest.levels[levelIdx]
    setPhase('practicing')
    setCurrentIdx(0)
    setAnswers({})
    setReview([])
    setResult(null)
    setSprintStarted(nextLevel.mode !== 'sprint')
    setTimeLeft(nextLevel.durationSeconds ?? 75)
  }, [quest.levels])

  const finishLevel = useCallback((reason: 'completed' | 'time') => {
    const reviewItems = buildReview(activeLevel, answers)
    const score = reviewItems.filter((item) => item.ok).length
    const total = activeLevel.items.length
    const saved = saveLevelResult(activeLevel.id, activeLevelIdx, score, total)
    const globalXpEarned = saved.topicCompletedNow
      ? saveSkillCompletion(lang, level, skill, saved.aggregatePercent)
      : 0

    setReview(reviewItems)
    setResult({
      score,
      total,
      percent: saved.percent,
      xpEarned: saved.xpEarned,
      globalXpEarned,
      reason,
    })
    setPhase('reviewing')
    setSprintStarted(false)
  }, [activeLevel, activeLevelIdx, answers, lang, level, saveLevelResult, skill])

  useEffect(() => {
    if (!isSprint || !sprintStarted || phase !== 'practicing') return
    const timer = window.setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [isSprint, phase, sprintStarted])

  useEffect(() => {
    if (!isSprint || !sprintStarted || phase !== 'practicing') return
    if (timeLeft === 0) {
      const timeout = window.setTimeout(() => finishLevel('time'), 0)
      return () => window.clearTimeout(timeout)
    }
  }, [finishLevel, isSprint, phase, sprintStarted, timeLeft])

  function chooseLevel(index: number) {
    if (index >= progress.unlocked) return
    setActiveLevelIdx(index)
    setActiveLevel(index)
    resetRun(index)
  }

  function setItemAnswer(item: GrammarQuestItem, value: string) {
    setAnswers((current) => ({ ...current, [item.id]: value }))
  }

  function canProceed(item: GrammarQuestItem) {
    if (item.mode === 'choice') return hasAnswer(answers, item)
    if (!hasAnswer(answers, item)) return false
    if (item.isZeroAnswer) return true
    return answers[item.id].trim().length > 0
  }

  function goNext() {
    if (!currentItem || !canProceed(currentItem)) return
    if (currentIdx >= activeLevel.items.length - 1) {
      finishLevel('completed')
      return
    }
    setCurrentIdx((current) => current + 1)
  }

  function retryLevel() {
    resetRun(activeLevelIdx)
  }

  function goNextLevel() {
    const next = activeLevelIdx + 1
    if (next >= quest.levels.length || next >= progress.unlocked) return
    chooseLevel(next)
  }

  function resetAll() {
    resetProgress()
    setActiveLevelIdx(0)
    resetRun(0)
  }

  const passed = result ? result.percent >= 65 : false
  const completedAll = mounted && completedLevels >= quest.levels.length && progress.unlocked >= quest.levels.length

  return (
    <section
      id="practica"
      className="grammar-quest"
      style={{ '--topic-color': color } as CSSProperties}
      aria-labelledby="grammar-quest-heading"
    >
      <div className="practice-journey">
        <div className="practice-journey__intro">
          <div>
            <span className="section-label">Práctica progresiva</span>
            <h2 id="grammar-quest-heading" className="gram-h2">Quest de ejercicios</h2>
          </div>
          <p>{quest.guide.goal}</p>
        </div>
        <div className="journey-grid">
          {quest.levels.map((questLevel, index) => (
            <div
              key={questLevel.id}
              className="journey-step"
              style={{ '--i': index } as CSSProperties}
            >
              <span>{index + 1}</span>
              <b>{quest.guide.levelVerbs[index]}</b>
              <strong>{questLevel.title}</strong>
              <p>{questLevel.tag} · {questLevel.focus}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="quest-stat-row" aria-label="Progreso de la quest">
        <div className="quest-stat-card">
          <span>XP local</span>
          <strong>{mounted ? progress.localXp : 0}</strong>
        </div>
        <div className="quest-stat-card">
          <span>Niveles</span>
          <strong>{mounted ? `${completedLevels}/${quest.levels.length}` : `0/${quest.levels.length}`}</strong>
        </div>
        <div className="quest-stat-card">
          <span>Desbloqueados</span>
          <strong>{mounted ? `${progress.unlocked}/${quest.levels.length}` : `1/${quest.levels.length}`}</strong>
        </div>
      </div>

      <div className="quest-guide-card">
        <span className="rail-kicker">{quest.guide.decisionTitle}</span>
        <ul>
          {quest.guide.decisions.map((decision) => <li key={decision}>{decision}</li>)}
        </ul>
      </div>

      <div className="level-strip" role="list" aria-label="Niveles de ejercicios">
        {quest.levels.map((questLevel, index) => {
          const unlocked = !mounted ? index === 0 : index < progress.unlocked
          const best = progress.levelScores[questLevel.id]
          const active = index === activeLevelIdx
          return (
            <button
              key={questLevel.id}
              type="button"
              role="listitem"
              className={`level-card${active ? ' is-active' : ''}${!unlocked ? ' is-locked' : ''}`}
              disabled={!unlocked}
              onClick={() => chooseLevel(index)}
              aria-current={active ? 'step' : undefined}
              aria-label={unlocked ? `Nivel ${index + 1}: ${questLevel.title}` : `Nivel ${index + 1} bloqueado`}
            >
              <span>{unlocked ? index + 1 : 'B'}</span>
              <strong>{questLevel.title}</strong>
              <em>{questLevel.tag}</em>
              {best && <em className="quest-best-score">{best.percent}% mejor</em>}
            </button>
          )
        })}
      </div>

      {completedAll && (
        <div className="quest-complete-banner" role="status">
          <strong>Quest completada</strong>
          <span>Ya puedes repasar cualquier nivel o reiniciar el progreso de este tema.</span>
        </div>
      )}

      <div className="lesson-panel" aria-live="polite">
        <div className="lesson-panel__bar" />
        <div className="lesson-panel__inner">
          <div className="level-kicker">
            <span className="pill active">Nivel {activeLevelIdx + 1}</span>
            <span className="pill">{activeLevel.tag}</span>
            <span className="pill">{activeLevel.footer}</span>
            {isSprint && phase === 'practicing' && sprintStarted && (
              <span className="pill">Tiempo {timeLeft}s</span>
            )}
          </div>

          <h3 className="lesson-title">{activeLevel.title}</h3>
          <p className="lesson-intro">{activeLevel.intro}</p>

          {phase === 'practicing' && sprintWaiting && (
            <div className="question-shell">
              <div className="quest-sprint-board">
                <div className="quest-sprint-stat">
                  <b>{activeLevel.durationSeconds}</b>
                  <span>segundos</span>
                </div>
                <div className="quest-sprint-stat">
                  <b>{activeLevel.items.length}</b>
                  <span>pistas</span>
                </div>
                <div className="quest-sprint-stat">
                  <b>65%</b>
                  <span>para pasar</span>
                </div>
              </div>
              <div className="quest-prompt-card">
                <span>Regla del sprint</span>
                <p>Escribe la respuesta corta que completa o corrige cada caso. El reloj empieza cuando pulses iniciar.</p>
              </div>
              <div className="gram-actions">
                <button
                  type="button"
                  className="gram-btn accent"
                  onClick={() => {
                    setSprintStarted(true)
                    setTimeLeft(activeLevel.durationSeconds ?? 75)
                  }}
                >
                  Iniciar sprint
                </button>
              </div>
            </div>
          )}

          {phase === 'practicing' && !sprintWaiting && currentItem && (
            <div className="question-shell">
              <div className="question-topline">
                <span>{isSprint ? 'Sprint' : 'Pregunta'} {currentIdx + 1} de {activeLevel.items.length}</span>
                <div className="mini-progress" aria-hidden="true">
                  <span style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <span className="scene-label">{currentItem.source}</span>
              <div className="quest-prompt-card">
                <span>{currentItem.mode === 'choice' ? 'Elige la mejor opción' : 'Escribe la respuesta'}</span>
                <p>{currentItem.prompt}</p>
              </div>

              {currentItem.mode === 'choice' && currentItem.options && (
                <div className="options quest-options">
                  {currentItem.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`option${answers[currentItem.id] === option ? ' is-selected' : ''}`}
                      onClick={() => setItemAnswer(currentItem, option)}
                      aria-pressed={answers[currentItem.id] === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentItem.mode === 'input' && (
                <div className="quest-input-zone">
                  <label className="sr-only" htmlFor={`quest-answer-${currentItem.id}`}>
                    Respuesta del ejercicio
                  </label>
                  <input
                    id={`quest-answer-${currentItem.id}`}
                    className="answer-field"
                    value={answers[currentItem.id] ?? ''}
                    onChange={(event) => setItemAnswer(currentItem, event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && canProceed(currentItem)) goNext()
                    }}
                    placeholder={currentItem.isZeroAnswer ? 'Escribe o marca sin artículo' : 'Escribe tu respuesta'}
                    autoComplete="off"
                  />
                  {currentItem.isZeroAnswer && (
                    <button
                      type="button"
                      className={`gram-btn secondary quest-zero-btn${hasAnswer(answers, currentItem) && answers[currentItem.id] === '' ? ' is-selected' : ''}`}
                      onClick={() => setItemAnswer(currentItem, '')}
                    >
                      Sin artículo
                    </button>
                  )}
                </div>
              )}

              <div className="gram-actions">
                <button
                  type="button"
                  className="gram-btn accent"
                  disabled={!canProceed(currentItem)}
                  onClick={goNext}
                >
                  {currentIdx >= activeLevel.items.length - 1 ? 'Terminar nivel' : 'Siguiente'}
                </button>
                {isSprint && (
                  <button
                    type="button"
                    className="gram-btn secondary"
                    onClick={() => finishLevel('time')}
                  >
                    Terminar ahora
                  </button>
                )}
              </div>
            </div>
          )}

          {phase === 'reviewing' && result && (
            <div className="result-box">
              <div className="score-ring" style={{ '--pct': result.percent } as CSSProperties}>
                <span>{result.percent}%</span>
              </div>
              <div>
                <span className="section-label">{passed ? 'Nivel superado' : 'A reforzar'}</span>
                <h3 className="lesson-title quest-result-title">
                  {result.score}/{result.total} correctas
                </h3>
                <p className="lesson-intro">
                  {result.reason === 'time' ? 'El sprint terminó con el tiempo disponible.' : 'Terminaste el nivel completo.'}
                  {' '}
                  {passed ? 'El siguiente nivel queda disponible.' : 'Necesitas 65% para desbloquear el siguiente nivel.'}
                </p>
                {(result.xpEarned > 0 || result.globalXpEarned > 0) && (
                  <p className="quest-xp-note">
                    +{result.xpEarned + result.globalXpEarned} XP
                  </p>
                )}
                <div className="gram-actions">
                  <button type="button" className="gram-btn secondary" onClick={retryLevel}>
                    Reintentar
                  </button>
                  {activeLevelIdx + 1 < quest.levels.length && (
                    <button
                      type="button"
                      className="gram-btn accent"
                      disabled={activeLevelIdx + 1 >= progress.unlocked}
                      onClick={goNextLevel}
                    >
                      Nivel {activeLevelIdx + 2}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {phase === 'reviewing' && (
        <div className="review-section">
          <div className="review-heading">
            <div>
              <h3>Revisión del nivel</h3>
              <p>Compara tu respuesta con la solución y mira el porqué de cada caso.</p>
            </div>
            <span className="review-summary">
              {review.filter((item) => item.ok).length}/{review.length} correctas
            </span>
          </div>
          <div className="review-grid">
            {review.map(({ item, ok }, index) => (
              <article key={item.id} className={`review-card ${ok ? 'good' : 'bad'}`}>
                <div className="review-card__top">
                  <span className="review-index">{index + 1}</span>
                  <span className="review-status">{ok ? 'Correcta' : 'Revisar'}</span>
                </div>
                <p className="review-prompt">{item.prompt}</p>
                <div className="review-answer-grid">
                  <div className="review-answer">
                    <span>Tu respuesta</span>
                    <b>{userAnswerLabel(item, answers)}</b>
                  </div>
                  <div className="review-answer">
                    <span>Respuesta correcta</span>
                    <b>{displayQuestAnswer(item.answer)}</b>
                  </div>
                </div>
                <p className="review-explain">{item.explanation}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="quest-reset-row">
        <button type="button" className="gram-btn secondary" onClick={resetAll}>
          Reiniciar quest de este tema
        </button>
      </div>
    </section>
  )
}
