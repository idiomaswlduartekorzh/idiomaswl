'use client'

import { useReducer, useMemo, Fragment } from 'react'
import type {
  GrammarTopic,
  Level,
  ChoiceLevel,
  DualLevel,
  GuidedTextLevel,
  FreeTextLevel,
  WriteLevel,
  Blank,
} from '@/data/grammar/types'
import { useGrammarProgress } from '@/components/grammar/useGrammarProgress'

// ── State machine ────────────────────────────────────────────────────────────

type Phase = 'idle' | 'practicing' | 'reviewing'

interface State {
  phase: Phase
  activeLevelIdx: number
  currentIdx: number
  answers: Record<string, string>
  score: number
  total: number
}

const initialState: State = {
  phase: 'practicing',
  activeLevelIdx: 0,
  currentIdx: 0,
  answers: {},
  score: 0,
  total: 0,
}

type Action =
  | { type: 'START'; levelIdx: number }
  | { type: 'SET'; key: string; value: string }
  | { type: 'NEXT' }
  | { type: 'SUBMIT'; score: number; total: number }
  | { type: 'RETRY' }
  | { type: 'BACK' }

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'START':
      return { ...initialState, phase: 'practicing', activeLevelIdx: a.levelIdx }
    case 'SET':
      return { ...s, answers: { ...s.answers, [a.key]: a.value } }
    case 'NEXT':
      return { ...s, currentIdx: s.currentIdx + 1 }
    case 'SUBMIT':
      return { ...s, phase: 'reviewing', score: a.score, total: a.total }
    case 'RETRY':
      return { ...initialState, phase: 'practicing', activeLevelIdx: s.activeLevelIdx }
    case 'BACK':
      return { ...initialState, activeLevelIdx: s.activeLevelIdx }
  }
}

// ── Option shuffling ─────────────────────────────────────────────────────────
// Grammar topic data always lists the correct answer as the first element of
// `options` (authoring convention), so rendering it verbatim puts the right
// choice in position 1 on every question. Fisher-Yates shuffles the display
// order while `answer`/scoring still reference the original string value.

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Scoring helpers ──────────────────────────────────────────────────────────

function norm(s: string) {
  return s.toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ')
}

function matchAnswer(user: string, answer: string, accepted?: string[]) {
  const u = norm(user)
  return u === norm(answer) || (accepted ?? []).some((a) => u === norm(a))
}

// Índices de hueco [[n]] presentes en un texto, en orden y sin repetir. El motor
// sólo renderiza un input por cada [[n]] presente, así que scoring y validación
// deben derivarse de este conjunto (no de la longitud cruda de `blanks`). Así un
// desajuste de datos —más blanks que huecos, o al revés— nunca bloquea el nivel.
function gapIndices(text: string): number[] {
  const seen = new Set<number>()
  const out: number[] = []
  for (const m of text.matchAll(/\[\[(\d+)\]\]/g)) {
    const i = Number(m[1])
    if (!seen.has(i)) { seen.add(i); out.push(i) }
  }
  return out
}

function dualItemText(item: DualLevel['items'][number]): string {
  return item.lines.map(([, t]) => t).join(' ')
}

function scoreLevel(level: Level, answers: Record<string, string>): { score: number; total: number } {
  if (level.type === 'choice') {
    const l = level as ChoiceLevel
    let score = 0
    l.items.forEach((item, i) => {
      if ((answers[`${i}`] ?? '').toLowerCase() === item.answer.toLowerCase()) score++
    })
    return { score, total: l.items.length }
  }
  if (level.type === 'dual') {
    const l = level as DualLevel
    let score = 0, total = 0
    l.items.forEach((item, ii) => {
      const present = gapIndices(dualItemText(item))
      present.forEach((bi) => {
        const blank = item.blanks[bi]
        if (!blank) return // hueco sin respuesta definida: no puntúa
        total++
        if ((answers[`${ii}-${bi}`] ?? '').toLowerCase() === blank.answer.toLowerCase()) score++
      })
    })
    return { score, total }
  }
  if (level.type === 'guidedText' || level.type === 'freeText') {
    const l = level as GuidedTextLevel | FreeTextLevel
    let score = 0, total = 0
    gapIndices(l.text).forEach((i) => {
      const blank = l.blanks[i]
      if (!blank) return // hueco extra sin respuesta: no puntúa (evita bloqueo)
      total++
      if (matchAnswer(answers[`${i}`] ?? '', blank.answer, blank.accepted)) score++
    })
    return { score, total }
  }
  if (level.type === 'write') {
    const l = level as WriteLevel
    let score = 0
    l.items.forEach((item, i) => {
      if (matchAnswer(answers[`${i}`] ?? '', item.answer, item.accepted)) score++
    })
    return { score, total: l.items.length }
  }
  return { score: 0, total: 0 }
}

// ── Text with inline blanks ──────────────────────────────────────────────────

function TextWithBlanks({
  text,
  blanks,
  answers,
  onChange,
}: {
  text: string
  blanks: Blank[]
  answers: Record<string, string>
  onChange: (key: string, value: string) => void
}) {
  const parts = text.split(/\[\[(\d+)\]\]/)
  const shuffledOptions = useMemo(
    () => blanks.map((b) => (b.options ? shuffle(b.options) : undefined)),
    [blanks],
  )
  return (
    <p className="story-text">
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
        const bi = parseInt(part)
        const blank = blanks[bi]
        const key = `${bi}`
        if (blank?.options?.length) {
          return (
            <select
              key={i}
              className="blank-field"
              value={answers[key] ?? ''}
              onChange={(e) => onChange(key, e.target.value)}
            >
              <option value="">—</option>
              {shuffledOptions[bi]!.map((o, oi) => <option key={oi} value={o}>{o}</option>)}
            </select>
          )
        }
        return (
          <input
            key={i}
            type="text"
            className="blank-field"
            value={answers[key] ?? ''}
            onChange={(e) => onChange(key, e.target.value)}
            placeholder="___"
          />
        )
      })}
    </p>
  )
}

// ── Choice level ─────────────────────────────────────────────────────────────

function ChoicePractice({
  level,
  idx,
  answers,
  dispatch,
  onSubmit,
}: {
  level: ChoiceLevel
  idx: number
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
}) {
  const item = level.items[idx]
  const isLast = idx === level.items.length - 1
  const canProceed = !!(answers[`${idx}`])
  const shuffledOptions = useMemo(() => shuffle(item.options), [item])

  function next() {
    if (isLast) {
      const result = scoreLevel(level, answers)
      onSubmit(result.score, result.total)
    } else {
      dispatch({ type: 'NEXT' })
    }
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>Pregunta {idx + 1} / {level.items.length}</span>
        <div className="mini-progress">
          <span style={{ width: `${((idx + 1) / level.items.length) * 100}%` }} />
        </div>
      </div>
      <span className="scene-label">{item.scene}</span>
      <div className="dialogue">
        {item.lines.map(([speaker, text], li) => (
          <div key={li} className="dialogue-line">
            <div className="speaker">{speaker}</div>
            <div><p>{text}</p></div>
          </div>
        ))}
      </div>
      <div className="options">
        {shuffledOptions.map((opt, oi) => (
          <button
            key={oi}
            className={`option${answers[`${idx}`] === opt ? ' is-selected' : ''}`}
            onClick={() => dispatch({ type: 'SET', key: `${idx}`, value: opt })}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canProceed} onClick={next}>
          {isLast ? 'Ver resultados →' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}

// ── Dual level ───────────────────────────────────────────────────────────────

function DualPractice({
  level,
  idx,
  answers,
  dispatch,
  onSubmit,
}: {
  level: DualLevel
  idx: number
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
}) {
  const item = level.items[idx]
  const isLast = idx === level.items.length - 1
  // Sólo se exige respuesta para los huecos que realmente se renderizan (aquellos
  // con un blank definido). Un [[n]] sin blank se muestra como texto y no bloquea.
  const requiredBi = gapIndices(dualItemText(item)).filter((bi) => item.blanks[bi])
  const canProceed = requiredBi.every((bi) => !!(answers[`${idx}-${bi}`]))
  const shuffledOptions = useMemo(
    () => item.blanks.map((b) => (b.options ? shuffle(b.options) : undefined)),
    [item],
  )

  function renderLine(line: [string, string]) {
    const [speaker, text] = line
    const parts = text.split(/\[\[(\d+)\]\]/)
    return (
      <div className="dialogue-line">
        <div className="speaker">{speaker}</div>
        <div>
          <p>
            {parts.map((part, pi) => {
              if (pi % 2 === 0) return <Fragment key={pi}>{part}</Fragment>
              const bi = parseInt(part)
              const blank = item.blanks[bi]
              if (!blank) return <span key={pi} className="blank-field">___</span>
              const key = `${idx}-${bi}`
              return (
                <select
                  key={pi}
                  className="blank-field"
                  value={answers[key] ?? ''}
                  onChange={(e) => dispatch({ type: 'SET', key, value: e.target.value })}
                >
                  <option value="">—</option>
                  {(shuffledOptions[bi] ?? []).map((o, oi) => <option key={oi} value={o}>{o}</option>)}
                </select>
              )
            })}
          </p>
        </div>
      </div>
    )
  }

  function next() {
    if (isLast) {
      const result = scoreLevel(level, answers)
      onSubmit(result.score, result.total)
    } else {
      dispatch({ type: 'NEXT' })
    }
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>Diálogo {idx + 1} / {level.items.length}</span>
        <div className="mini-progress">
          <span style={{ width: `${((idx + 1) / level.items.length) * 100}%` }} />
        </div>
      </div>
      <span className="scene-label">{item.scene}</span>
      <div className="dialogue">
        {item.lines.map((line, li) => (
          <Fragment key={li}>{renderLine(line)}</Fragment>
        ))}
      </div>
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canProceed} onClick={next}>
          {isLast ? 'Ver resultados →' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}

// ── Text level (guidedText / freeText) ───────────────────────────────────────

function TextPractice({
  level,
  answers,
  dispatch,
  onSubmit,
}: {
  level: GuidedTextLevel | FreeTextLevel
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
}) {
  // Sólo se exigen los huecos [[n]] presentes en el texto que tienen blank
  // definido; huecos extra son opcionales y blanks sin hueco se ignoran.
  const requiredIdx = gapIndices(level.text).filter((i) => level.blanks[i])
  const canSubmit = requiredIdx.every((i) => !!(answers[`${i}`]))

  function handleChange(key: string, value: string) {
    dispatch({ type: 'SET', key, value })
  }

  function handleSubmit() {
    const result = scoreLevel(level, answers)
    onSubmit(result.score, result.total)
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>{level.scene}</span>
      </div>
      <TextWithBlanks
        text={level.text}
        blanks={level.blanks}
        answers={answers}
        onChange={handleChange}
      />
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canSubmit} onClick={handleSubmit}>
          Enviar respuestas →
        </button>
      </div>
    </div>
  )
}

// ── Write level ──────────────────────────────────────────────────────────────

function WritePractice({
  level,
  idx,
  answers,
  dispatch,
  onSubmit,
}: {
  level: WriteLevel
  idx: number
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
}) {
  const item = level.items[idx]
  const isLast = idx === level.items.length - 1
  const canProceed = !!(answers[`${idx}`] ?? '').trim()

  function next() {
    if (isLast) {
      const result = scoreLevel(level, answers)
      onSubmit(result.score, result.total)
    } else {
      dispatch({ type: 'NEXT' })
    }
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>Ejercicio {idx + 1} / {level.items.length}</span>
        <div className="mini-progress">
          <span style={{ width: `${((idx + 1) / level.items.length) * 100}%` }} />
        </div>
      </div>
      <span className="scene-label">{item.scene}</span>
      <div className="write-card">
        <span className="write-card__label">Instrucción</span>
        <p className="write-card__text">{item.prompt}</p>
      </div>
      <textarea
        className="answer-field"
        value={answers[`${idx}`] ?? ''}
        onChange={(e) => dispatch({ type: 'SET', key: `${idx}`, value: e.target.value })}
        placeholder="Escribe tu respuesta aquí..."
        rows={2}
        style={{ resize: 'vertical', marginTop: '0.75rem' }}
      />
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canProceed} onClick={next}>
          {isLast ? 'Enviar respuestas →' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}

// ── Deferred review (shown after completing a level) ─────────────────────────

function DeferredReview({ level, answers }: { level: Level; answers: Record<string, string> }) {
  type ReviewItem = {
    label: string
    user: string
    correct: string
    explain: string
    isGood: boolean
  }

  const items: ReviewItem[] = []

  if (level.type === 'choice') {
    const l = level as ChoiceLevel
    l.items.forEach((item, i) => {
      const user = answers[`${i}`] ?? ''
      items.push({
        label: item.scene,
        user: user || '(sin respuesta)',
        correct: item.answer,
        explain: item.explain,
        isGood: user.toLowerCase() === item.answer.toLowerCase(),
      })
    })
  } else if (level.type === 'dual') {
    const l = level as DualLevel
    l.items.forEach((item, ii) => {
      gapIndices(dualItemText(item)).forEach((bi) => {
        const blank = item.blanks[bi]
        if (!blank) return
        const user = answers[`${ii}-${bi}`] ?? ''
        items.push({
          label: `${item.scene} — espacio ${bi + 1}`,
          user: user || '(sin respuesta)',
          correct: blank.answer,
          explain: blank.explain,
          isGood: user.toLowerCase() === blank.answer.toLowerCase(),
        })
      })
    })
  } else if (level.type === 'guidedText' || level.type === 'freeText') {
    const l = level as GuidedTextLevel | FreeTextLevel
    gapIndices(l.text).forEach((i) => {
      const blank = l.blanks[i]
      if (!blank) return
      const user = answers[`${i}`] ?? ''
      items.push({
        label: `Espacio ${i + 1}`,
        user: user || '(sin respuesta)',
        correct: blank.answer,
        explain: blank.explain,
        isGood: matchAnswer(user, blank.answer, blank.accepted),
      })
    })
  } else if (level.type === 'write') {
    const l = level as WriteLevel
    l.items.forEach((item, i) => {
      const user = answers[`${i}`] ?? ''
      items.push({
        label: item.scene,
        user: user || '(sin respuesta)',
        correct: item.answer,
        explain: item.explain,
        isGood: matchAnswer(user, item.answer, item.accepted),
      })
    })
  }

  const goodCount = items.filter((it) => it.isGood).length

  return (
    <div className="review-section">
      <div className="review-heading">
        <div>
          <h3>Revisión detallada</h3>
          <p>Cada respuesta con su corrección y explicación del porqué.</p>
        </div>
        <span className="review-summary">{goodCount}/{items.length} correctas</span>
      </div>
      <div className="review-grid">
        {items.map((it, i) => (
          <div key={i} className={`review-card ${it.isGood ? 'good' : 'bad'}`}>
            <div className="review-card__top">
              <span className="review-index">{i + 1}</span>
              <span className="review-status">{it.isGood ? '✓ Correcto' : '✗ Revisar'}</span>
            </div>
            <p className="review-prompt">{it.label}</p>
            <div className="review-answer-grid">
              <div className="review-answer">
                <span>Tu respuesta</span>
                <b>{it.user}</b>
              </div>
              <div className="review-answer">
                <span>Respuesta correcta</span>
                <b>{it.correct}</b>
              </div>
            </div>
            <p className="review-explain">{it.explain}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function GrammarTopicClient({
  topic,
  idioma,
  nivel,
}: {
  topic: GrammarTopic
  idioma: string
  nivel: string
}) {
  const { progress, mounted, recordLevel } = useGrammarProgress(idioma, nivel, topic.slug)
  const [state, dispatch] = useReducer(reducer, initialState)

  const activeLevel = topic.practice.levels[state.activeLevelIdx]

  function handleSubmit(score: number, total: number) {
    dispatch({ type: 'SUBMIT', score, total })
    recordLevel(
      activeLevel.id,
      score,
      total,
      state.activeLevelIdx,
      topic.practice.levels.length,
    )
  }

  function isUnlocked(i: number) {
    if (!mounted) return i === 0
    return i < progress.unlocked
  }

  const pct = state.total ? Math.round((state.score / state.total) * 100) : 0
  const passed = pct >= 65

  return (
    <>
      {/* ── Visual Brief ───────────────────────────────────────────────────── */}
      <div className="visual-brief">
        <div className="visual-brief__header">
          <div>
            <span className="section-label">— Laboratorio visual</span>
            <h3 className="gram-h3">{topic.visual.graphicPrompt}</h3>
          </div>
          <p>{topic.visual.teacherLens}</p>
        </div>

        {topic.visual.scene.length > 0 && (
          <div className="topic-lab">
            <div className="lab-stage">
              {topic.visual.scene.map(([original, pronoun], i) => (
                <div
                  key={i}
                  className="lab-token"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span>{original}</span>
                  <b>→ {pronoun}</b>
                </div>
              ))}
            </div>
            <div className="lab-coach">
              <span>📐</span>
              <strong>{topic.guide.model}</strong>
              <div className="sense-tags">
                {topic.visual.learnerModes.map((mode, i) => (
                  <em key={i}>{mode}</em>
                ))}
              </div>
            </div>
          </div>
        )}

        {topic.guide.decisions.length > 0 && (
          <div className="decision-flow">
            {topic.guide.decisions.map((d, i) => (
              <div
                key={i}
                className="flow-step"
                style={{ '--i': i } as React.CSSProperties}
              >
                <span>{i + 1}</span>
                <p>{d}</p>
              </div>
            ))}
          </div>
        )}

        <div className="pattern-map">
          {topic.guide.table.map(([col1, col2, col3], i) => (
            <div
              key={i}
              className="pattern-row"
              style={{ '--i': i } as React.CSSProperties}
            >
              <b>{col1}</b>
              <span>{col2}</span>
              <code>{col3}</code>
            </div>
          ))}
        </div>

        {topic.guide.mistakes.length > 0 && (
          <div className="visual-alerts">
            {topic.guide.mistakes.map((m, i) => (
              <p key={i}><span />{m}</p>
            ))}
          </div>
        )}
      </div>

      {/* ── Practice Journey overview ───────────────────────────────────────── */}
      <div id="practica" className="practice-journey">
        <div className="practice-journey__intro">
          <div>
            <span className="section-label">— Práctica progresiva</span>
            <h2 className="gram-h2">6 niveles de práctica</h2>
          </div>
          <p>
            Supera el 65 % en cada nivel para desbloquear el siguiente.
            Las correcciones aparecen al terminar el nivel completo, no pregunta por pregunta.
          </p>
        </div>
        <div className="journey-grid">
          {topic.practice.levels.map((level, i) => {
            const verb = topic.visual.practiceVerbs?.[i] ?? `Nivel ${i + 1}`
            return (
              <div
                key={level.id}
                className="journey-step"
                style={{ '--i': i } as React.CSSProperties}
              >
                <span>{i + 1}</span>
                <b>{verb}</b>
                <strong>{level.title}</strong>
                <p>{level.tag}{' · '}{level.intro.length > 55 ? level.intro.slice(0, 55) + '…' : level.intro}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Learning layout ─────────────────────────────────────────────────── */}
      <div className="learning-layout">
        {/* Main practice area */}
        <div className="practice-main">
          {/* Level strip — always visible */}
          <div className="level-strip">
            {topic.practice.levels.map((level, i) => {
              const unlocked = isUnlocked(i)
              const best = mounted ? progress.scores[level.id] : undefined
              const isActive = state.activeLevelIdx === i && state.phase !== 'idle'
              return (
                <button
                  key={level.id}
                  className={`level-card${isActive ? ' is-active' : ''}${!unlocked ? ' is-locked' : ''}`}
                  disabled={!unlocked}
                  onClick={() => dispatch({ type: 'START', levelIdx: i })}
                  title={!unlocked ? 'Supera el nivel anterior con ≥65% para desbloquear' : level.title}
                >
                  <span>{unlocked ? (i + 1) : '🔒'}</span>
                  <strong>{level.title}</strong>
                  <em>{level.tag}</em>
                  {best && (
                    <em style={{ color: 'var(--topic-color)', fontWeight: 800 }}>
                      {best.percent}%
                    </em>
                  )}
                </button>
              )
            })}
          </div>

          {/* Idle: show teacher note */}
          {state.phase === 'idle' && (
            <div className="teacher-note">
              <span className="section-label">— Nota del especialista</span>
              <h2 className="gram-h2">{topic.guide.goal}</h2>
              <p>{topic.guide.model}</p>
              <p style={{ marginTop: '0.65rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                Selecciona un nivel arriba para comenzar la práctica.
              </p>
            </div>
          )}

          {/* Practicing */}
          {state.phase === 'practicing' && (
            <div className="lesson-panel">
              <div className="lesson-panel__bar" />
              <div className="lesson-panel__inner">
                <div className="level-kicker">
                  <span className="pill active">Nivel {state.activeLevelIdx + 1}</span>
                  <span className="pill">{activeLevel.tag}</span>
                  <button
                    className="gram-btn secondary"
                    onClick={() => dispatch({ type: 'BACK' })}
                    style={{ padding: '0.28rem 0.65rem', minHeight: 28, fontSize: '0.78rem' }}
                  >
                    ← Salir
                  </button>
                </div>
                <h2 className="lesson-title">{activeLevel.title}</h2>
                <p className="lesson-intro">{activeLevel.intro}</p>

                {activeLevel.type === 'choice' && (
                  <ChoicePractice
                    level={activeLevel as ChoiceLevel}
                    idx={state.currentIdx}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                  />
                )}
                {activeLevel.type === 'dual' && (
                  <DualPractice
                    level={activeLevel as DualLevel}
                    idx={state.currentIdx}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                  />
                )}
                {(activeLevel.type === 'guidedText' || activeLevel.type === 'freeText') && (
                  <TextPractice
                    level={activeLevel as GuidedTextLevel | FreeTextLevel}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                  />
                )}
                {activeLevel.type === 'write' && (
                  <WritePractice
                    level={activeLevel as WriteLevel}
                    idx={state.currentIdx}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>
          )}

          {/* Reviewing */}
          {state.phase === 'reviewing' && (
            <>
              <div className="lesson-panel">
                <div
                  className="lesson-panel__bar"
                  style={{ background: passed ? 'var(--good)' : 'var(--bad)' }}
                />
                <div className="lesson-panel__inner">
                  <div className="result-box">
                    <div
                      className="score-ring"
                      style={{ '--pct': pct } as React.CSSProperties}
                    >
                      <span>{pct}%</span>
                    </div>
                    <div>
                      <h2
                        className="gram-h2"
                        style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', color: passed ? 'var(--good)' : 'var(--ink)' }}
                      >
                        {passed ? '¡Nivel superado!' : 'Puedes mejorar'}
                      </h2>
                      <p style={{ color: 'var(--muted)', margin: '0.4rem 0 0.9rem', fontSize: '0.94rem' }}>
                        {state.score} de {state.total} correctas · {pct}%
                        {passed && state.activeLevelIdx + 1 < topic.practice.levels.length
                          ? ' · Siguiente nivel desbloqueado'
                          : ''}
                        {!passed ? ' · Necesitas 65% para avanzar' : ''}
                      </p>
                      <div className="gram-actions">
                        <button
                          className="gram-btn secondary"
                          onClick={() => dispatch({ type: 'RETRY' })}
                        >
                          Reintentar
                        </button>
                        {state.activeLevelIdx + 1 < topic.practice.levels.length && (
                          <button
                            className="gram-btn accent"
                            disabled={!isUnlocked(state.activeLevelIdx + 1)}
                            onClick={() => dispatch({ type: 'START', levelIdx: state.activeLevelIdx + 1 })}
                          >
                            Nivel {state.activeLevelIdx + 2} →
                          </button>
                        )}
                        {state.activeLevelIdx === topic.practice.levels.length - 1 && passed && (
                          <button
                            className="gram-btn accent"
                            onClick={() => dispatch({ type: 'BACK' })}
                          >
                            ¡Tema completado! →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DeferredReview level={activeLevel} answers={state.answers} />
            </>
          )}
        </div>

        {/* Study Rail */}
        <aside className="study-rail">
          {/* Progress */}
          <div className="rail-card progress-card">
            <span className="rail-kicker">Tu progreso</span>
            <strong>{topic.shortTitle}</strong>
            <div className="rail-meter">
              <span
                style={{
                  width: mounted
                    ? `${(Math.min(progress.unlocked, topic.practice.levels.length) / topic.practice.levels.length) * 100}%`
                    : '0%',
                }}
              />
            </div>
            <p style={{ marginTop: '0.4rem', fontSize: '0.78rem' }}>
              {mounted
                ? `${Math.min(progress.unlocked, topic.practice.levels.length)} / ${topic.practice.levels.length} niveles desbloqueados`
                : `0 / ${topic.practice.levels.length} niveles`}
            </p>
          </div>

          {/* Objective */}
          <div className="rail-card">
            <span className="rail-kicker">Objetivo</span>
            <strong>{topic.guide.goal}</strong>
            <p style={{ marginTop: '0.35rem' }}>{topic.guide.formula}</p>
          </div>

          {/* Decisions */}
          <div className="rail-card">
            <span className="rail-kicker">Decisiones clave</span>
            <ul>
              {topic.guide.decisions.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          {/* Reference table */}
          <div className="rail-card">
            <span className="rail-kicker">Referencia rápida</span>
            <div className="grammar-table" style={{ marginTop: '0.5rem' }}>
              {topic.guide.table.map(([col1, col2, col3], i) => (
                <div key={i} className="grammar-table__row">
                  <span>
                    <b style={{ color: 'var(--topic-color)', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                      {col1}
                    </b>
                  </span>
                  <span>{col2}</span>
                  <span>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>{col3}</code>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Common mistakes */}
          <div className="rail-card">
            <span className="rail-kicker">Errores frecuentes</span>
            <ul>
              {topic.guide.mistakes.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}
