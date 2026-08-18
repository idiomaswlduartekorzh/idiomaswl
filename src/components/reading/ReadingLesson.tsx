'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, BookOpenCheck, Check, CheckCircle2, ChevronDown,
  ChevronUp, CircleHelp, Pause, RotateCcw, Sparkles, Target, Volume2,
} from 'lucide-react'
import { ReadingRecorder } from './ReadingRecorder'
import { getScriptCapabilities, normalizeReadingLookup, tokenizeReadingText } from '@/lib/reading/adapters'
import { readingExercisePath, readingHubPath } from '@/lib/reading/routes'
import { localized } from '@/lib/reading/validate'
import PdfDownloadButton from '@/components/practica/PdfDownloadButton'
import { canRenderPdf } from '@/lib/pdf/languages'
import type { ReadingExercise, ReadingQuestion, TutorLocale } from '@/lib/reading/types'
import styles from './reading.module.css'

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>> }
}

const COPY = {
  es: {
    back: 'Todas las lecturas', preview: 'Vista editorial · no indexable', words: 'palabras',
    catalog: 'Ruta de lectura', eyebrowLabel: 'Lectura · Inglés', textWord: 'Texto', of: 'de', progress: 'Progreso del ejercicio',
    stages: ['Preparar', 'Leer', 'Comprobar', 'Producir', 'Cierre'],
    goRead: 'Ya estoy listo para leer', goCheck: 'Comprobar lo que entendí', goProduce: 'Ahora escribo yo', goResult: 'Ver mi resultado',
    nextReading: 'Siguiente lectura',
    before: 'Antes de leer', mission: 'Tu misión', vocabulary: 'Vocabulario clave',
    read: 'Lee a tu ritmo', markRead: 'Marcar como leído', readDone: 'Texto leído', listen: 'Escuchar la lectura', pausePlayback: 'Pausar',
    check: 'Comprueba lo que entendiste', question: 'Pregunta', evidence: 'Evidencia', strategy: 'Estrategia', preparingQuestions: 'Preparando una versión distinta de las preguntas…',
    orderHelp: 'Usa los botones para cambiar el orden y luego comprueba tu respuesta.', submitOrder: 'Comprobar orden',
    use: 'Usa el idioma', unscored: 'Esta producción no cambia tu puntaje ni se envía a analítica.',
    result: 'Tu resultado', answered: 'preguntas respondidas', correct: 'correctas', retry: 'Reintentar', success: '¡Buen trabajo!', keepGoing: 'Sigue practicando',
    finishPrompt: 'Responde todas las preguntas para ver tu resultado completo.',
    practised: 'Lo que practicaste', commonError: 'Ayuda para hispanohablantes', cultural: 'Nota cultural', faq: 'Preguntas frecuentes',
    faqLevel: '¿Qué nivel tiene esta lectura?', faqHelp: '¿Las ayudas revelan la respuesta?',
    faqHelpAnswer: 'No. Las glosas explican vocabulario, pero las respuestas solo aparecen después de tu intento.',
    reviewRequired: 'Este borrador necesita revisión lingüística y pedagógica humana antes de publicarse.',
  },
  en: {
    back: 'All readings', preview: 'Editorial preview · not indexable', words: 'words',
    catalog: 'Reading path', eyebrowLabel: 'Reading · English', textWord: 'Text', of: 'of', progress: 'Exercise progress',
    stages: ['Prepare', 'Read', 'Check', 'Produce', 'Wrap-up'],
    goRead: "I'm ready to read", goCheck: 'Check what I understood', goProduce: 'Now I write', goResult: 'See my result',
    nextReading: 'Next reading',
    before: 'Before you read', mission: 'Your mission', vocabulary: 'Key vocabulary',
    read: 'Read at your pace', markRead: 'Mark as read', readDone: 'Text read', listen: 'Listen to the reading', pausePlayback: 'Pause',
    check: 'Check what you understood', question: 'Question', evidence: 'Evidence', strategy: 'Strategy', preparingQuestions: 'Preparing a fresh question order…',
    orderHelp: 'Use the buttons to change the order, then check your answer.', submitOrder: 'Check order',
    use: 'Use the language', unscored: 'This response does not affect your score and is not sent to analytics.',
    result: 'Your result', answered: 'questions answered', correct: 'correct', retry: 'Try again', success: 'Great work!', keepGoing: 'Keep practising',
    finishPrompt: 'Answer every question to see your full result.',
    practised: 'What you practised', commonError: 'Support for Spanish speakers', cultural: 'Cultural note', faq: 'Frequently asked questions',
    faqLevel: 'What level is this reading?', faqHelp: 'Do the support tools reveal the answer?',
    faqHelpAnswer: 'No. Glosses explain vocabulary, but answers only appear after your attempt.',
    reviewRequired: 'This draft needs human language and pedagogy review before publication.',
  },
} as const

type StoredAnswer = string | boolean | string[]

function currentTimeMs() {
  return Date.now()
}

function hashSeed(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function shuffled<T>(items: T[], seed: number) {
  const result = [...items]
  let state = seed || 1
  function random() {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

function track(event: string, exercise: ReadingExercise, sessionId: string, startedAt: number, extra: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event,
    reading_session_id: sessionId,
    reading_language: exercise.language,
    reading_level: exercise.level.cefr,
    reading_exercise_id: exercise.id,
    reading_content_status: exercise.status,
    reading_is_preview: exercise.status !== 'published',
    reading_elapsed_seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
    ...extra,
  })
}

function answersMatch(question: ReadingQuestion, value: StoredAnswer) {
  if (Array.isArray(question.answer) && Array.isArray(value)) return question.answer.join('|') === value.join('|')
  return question.answer === value
}

function ChoiceQuestion({
  question, locale, value, options, onAnswer,
}: {
  question: ReadingQuestion
  locale: TutorLocale
  value?: StoredAnswer
  options: NonNullable<ReadingQuestion['options']>
  onAnswer: (value: StoredAnswer) => void
}) {
  const answered = value !== undefined
  const correct = answered && answersMatch(question, value)
  return (
    <fieldset className={styles.questionCard}>
      <legend>{question.prompt}</legend>
      <div className={styles.optionList}>
        {options.map((option) => {
          const optionValue: StoredAnswer = question.type === 'true-false' ? option.id === 'true' : option.id
          const selected = value === optionValue
          const isAnswer = question.answer === optionValue
          return (
            <label
              key={option.id}
              className={`${styles.option} ${answered && selected ? (correct ? styles.optionCorrect : styles.optionWrong) : ''} ${answered && isAnswer ? styles.optionAnswer : ''}`}
            >
              <input
                type="radio"
                name={question.id}
                checked={selected}
                disabled={answered}
                onChange={() => undefined}
                onClick={() => onAnswer(optionValue)}
              />
              <span>{option.text}</span>
              {answered && isAnswer && <Check size={17} aria-label={locale === 'es' ? 'Respuesta correcta' : 'Correct answer'} />}
            </label>
          )
        })}
      </div>
      {answered && (
        <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status">
          <strong>{localized(correct ? question.feedback.correct : question.feedback.incorrect, locale)}</strong>
          <span><BookOpenCheck size={15} /> {COPY[locale].evidence}: {question.evidence}</span>
          <span><Sparkles size={15} /> {COPY[locale].strategy}: {localized(question.feedback.strategy, locale)}</span>
        </div>
      )}
    </fieldset>
  )
}

function OrderingQuestion({
  question, locale, value, options, onAnswer,
}: {
  question: ReadingQuestion
  locale: TutorLocale
  value?: StoredAnswer
  options: NonNullable<ReadingQuestion['options']>
  onAnswer: (value: StoredAnswer) => void
}) {
  const initial = options.map((option) => option.id)
  const [order, setOrder] = useState<string[]>(Array.isArray(value) ? value : initial)
  const answered = Array.isArray(value)
  const correct = answered && answersMatch(question, value)
  const labels = new Map(options.map((option) => [option.id, option.text]))

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    setOrder(next)
  }

  return (
    <fieldset className={styles.questionCard}>
      <legend>{question.prompt}</legend>
      <p className={styles.questionHelp}>{COPY[locale].orderHelp}</p>
      <ol className={styles.orderList}>
        {order.map((id, index) => (
          <li key={id}>
            <span className={styles.orderNumber}>{index + 1}</span>
            <span>{labels.get(id)}</span>
            <span className={styles.orderControls}>
              <button type="button" onClick={() => move(index, -1)} disabled={answered || index === 0} aria-label={`${locale === 'es' ? 'Subir' : 'Move up'} ${labels.get(id)}`}><ChevronUp size={16} /></button>
              <button type="button" onClick={() => move(index, 1)} disabled={answered || index === order.length - 1} aria-label={`${locale === 'es' ? 'Bajar' : 'Move down'} ${labels.get(id)}`}><ChevronDown size={16} /></button>
            </span>
          </li>
        ))}
      </ol>
      {!answered && <button type="button" className={styles.secondaryButton} onClick={() => onAnswer(order)}>{COPY[locale].submitOrder}</button>}
      {answered && (
        <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status">
          <strong>{localized(correct ? question.feedback.correct : question.feedback.incorrect, locale)}</strong>
          <span><BookOpenCheck size={15} /> {COPY[locale].evidence}: {question.evidence}</span>
          <span><Sparkles size={15} /> {COPY[locale].strategy}: {localized(question.feedback.strategy, locale)}</span>
        </div>
      )}
    </fieldset>
  )
}

// Los códigos del esquema de lectura ('en', 'pt'…) no son los slugs de las
// rutas ('ingles', 'portugues'), que es lo que entiende canRenderPdf.
const READING_LANG_SLUG: Record<string, string> = {
  en: 'ingles', fr: 'frances', it: 'italiano', de: 'aleman',
  ru: 'ruso', ja: 'japones', ko: 'coreano', pt: 'portugues',
}

export function ReadingLesson({ exercise, locale, siblings = [] }: { exercise: ReadingExercise; locale: TutorLocale; siblings?: ReadingExercise[] }) {
  const copy = COPY[locale]
  const [stage, setStage] = useState(0)
  const [answers, setAnswers] = useState<Record<string, StoredAnswer>>({})
  const [readComplete, setReadComplete] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activeGloss, setActiveGloss] = useState<string | null>(null)
  const [production, setProduction] = useState('')
  const [shuffleSeed, setShuffleSeed] = useState<number | null>(null)
  const sessionId = useRef('')
  const startedAt = useRef(0)
  const impressionTracked = useRef(false)
  const completionTracked = useRef(false)
  const glossOpenCount = useRef(0)
  const uniqueGlosses = useRef(new Set<string>())
  const capabilities = getScriptCapabilities(exercise)
  const glossarySurfaces = useMemo(() => exercise.content.vocabulary.map((item) => item.surface), [exercise])
  const tokens = useMemo(() => tokenizeReadingText(exercise.content.targetText, exercise.language, glossarySurfaces), [exercise, glossarySurfaces])
  const vocabulary = useMemo(() => new Map(exercise.content.vocabulary.map((item) => [normalizeReadingLookup(item.surface), item])), [exercise])
  const shuffledOptions = useMemo(() => {
    if (shuffleSeed === null) return new Map<string, NonNullable<ReadingQuestion['options']>>()
    return new Map(exercise.questions.map((question, questionIndex) => {
      let options = shuffled(question.options ?? [], shuffleSeed ^ hashSeed(question.id))
      if (question.type === 'ordering' && Array.isArray(question.answer) && options.length > 1) {
        const ids = options.map((option) => option.id)
        if (ids.join('|') === question.answer.join('|')) options = [...options.slice(1), options[0]]
      } else if (options.length > 1 && (typeof question.answer === 'string' || typeof question.answer === 'boolean')) {
        const answerId = typeof question.answer === 'boolean' ? String(question.answer) : question.answer
        const answerIndex = options.findIndex((option) => option.id === answerId)
        if (answerIndex >= 0) {
          const [answerOption] = options.splice(answerIndex, 1)
          const targetIndex = (shuffleSeed + questionIndex) % (options.length + 1)
          options.splice(targetIndex, 0, answerOption)
        }
      }
      return [question.id, options]
    }))
  }, [exercise.questions, shuffleSeed])
  const answeredCount = Object.keys(answers).length
  const score = exercise.questions.filter((question) => {
    const value = answers[question.id]
    return value !== undefined && answersMatch(question, value)
  }).length
  const complete = answeredCount === exercise.questions.length
  const wordCount = production.trim() ? production.trim().split(/\s+/u).length : 0

  useEffect(() => {
    if (impressionTracked.current) return
    impressionTracked.current = true
    startedAt.current = currentTimeMs()
    sessionId.current = globalThis.crypto?.randomUUID?.() ?? `${exercise.id}-${Date.now()}`
    setShuffleSeed(hashSeed(sessionId.current))
    track('reading_view', exercise, sessionId.current, startedAt.current, { tutor_locale: locale, reading_genre: exercise.classification.genre })
  }, [exercise, locale])

  function trackEvent(event: string, extra: Record<string, unknown> = {}) {
    track(event, exercise, sessionId.current || `${exercise.id}-pending`, startedAt.current, { tutor_locale: locale, ...extra })
  }

  function answerQuestion(question: ReadingQuestion, answer: StoredAnswer) {
    const correct = answersMatch(question, answer)
    const nextAnswers = { ...answers, [question.id]: answer }
    setAnswers(nextAnswers)
    trackEvent('reading_question_answer', { reading_question_id: question.id, reading_skill: question.skill, reading_is_correct: correct })
    if (!correct) trackEvent('reading_error', { reading_question_id: question.id, reading_skill: question.skill })

    const isNowComplete = Object.keys(nextAnswers).length === exercise.questions.length
    if (isNowComplete && !completionTracked.current) {
      completionTracked.current = true
      const finalScore = exercise.questions.filter((item) => {
        const value = nextAnswers[item.id]
        return value !== undefined && answersMatch(item, value)
      }).length
      trackEvent('reading_complete', {
        reading_score: finalScore,
        reading_score_percent: Math.round((finalScore / exercise.questions.length) * 100),
        reading_error_count: exercise.questions.length - finalScore,
        reading_question_count: exercise.questions.length,
        reading_gloss_open_count: glossOpenCount.current,
        reading_unique_gloss_count: uniqueGlosses.current.size,
        reading_text_marked_read: readComplete,
      })
    }
  }

  function toggleGloss(surface: string, lemma: string) {
    const isOpening = activeGloss !== surface
    setActiveGloss(isOpening ? surface : null)
    if (!isOpening) return
    glossOpenCount.current += 1
    uniqueGlosses.current.add(lemma)
    trackEvent('reading_gloss_open', {
      reading_gloss_lemma: lemma,
      reading_gloss_open_count: glossOpenCount.current,
      reading_unique_gloss_count: uniqueGlosses.current.size,
    })
  }

  function reset() {
    setAnswers({})
    setReadComplete(false)
    setActiveGloss(null)
    setProduction('')
    completionTracked.current = false
    glossOpenCount.current = 0
    uniqueGlosses.current.clear()
    startedAt.current = currentTimeMs()
    setStage(0)
    trackEvent('reading_retry')
  }

  const hubHref = readingHubPath(locale, exercise.language, exercise.level.cefr)
  const currentIndex = Math.max(0, siblings.findIndex((item) => item.id === exercise.id))
  const nextSibling = siblings[currentIndex + 1]

  return (
    <div className={`listen-shell ${styles.lessonShell}`}>
      <aside className="listen-catalog" aria-label={copy.back}>
        <div className="listen-catalog__head">
          <span>{copy.catalog} {exercise.level.cefr}</span>
          <strong>{currentIndex + 1}/{siblings.length || 1}</strong>
        </div>
        <section className="listen-block">
          {siblings.map((item, index) => (
            <Link
              key={item.id}
              href={readingExercisePath(locale, item.language, item.level.cefr, item.slug)}
              className={`listen-card${item.id === exercise.id ? ' is-active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <span>{index + 1}</span>
              <div><b>{localized(item.content.title, locale)}</b><small>{item.content.estimatedMinutes} min · {item.content.wordCount} {copy.words}</small></div>
            </Link>
          ))}
        </section>
      </aside>

      <article className={`listen-work ${styles.lessonWork}`}>
        <Link href={hubHref} className="listen-back"><ArrowLeft size={14} /> {copy.back}</Link>
        <p className="eyebrow"><span className="ink-line" />{copy.eyebrowLabel} · {exercise.level.cefr} · {copy.textWord} {currentIndex + 1} {copy.of} {siblings.length || 1}</p>
        <h1>📖 {localized(exercise.content.title, locale)}</h1>
        <p className="listen-objective">{localized(exercise.content.intro, locale)}</p>
        <div className="listen-tags">
          <span>{exercise.classification.topic}</span>
          <span>{exercise.content.wordCount} {copy.words}</span>
          <span>~{exercise.content.estimatedMinutes} min</span>
          {exercise.content.grammarFocus?.[0] && <span>{exercise.content.grammarFocus[0]}</span>}
          {exercise.status !== 'published' && <span>{copy.preview}</span>}
        </div>

        <ol className={`listen-steps ${styles.readingSteps}`} aria-label={copy.progress}>
          {copy.stages.map((label, index) => (
            <li key={label} className={index === stage ? 'is-current' : index < stage ? 'is-done' : ''}>
              <span>{index < stage ? '✓' : index + 1}</span><em>{label}</em>
            </li>
          ))}
        </ol>

      <div hidden={stage !== 0}>
      <section className="listen-panel" aria-labelledby="before-reading">
        <p className="listen-kicker">1 · {copy.stages[0]}</p>
        <h2 id="before-reading">{copy.before}</h2>
        <div className={styles.beforeGrid}>
          <div>
            <h3>{copy.mission}</h3>
            <div className={styles.missionBox}><Target aria-hidden="true" /><p>{localized(exercise.content.mission, locale)}</p></div>
          </div>
          <div>
            <h3>{copy.vocabulary}</h3>
            <div className={styles.vocabGrid}>
              {exercise.content.vocabulary.map((item) => (
                <button key={item.surface} type="button" className={styles.vocabChip} onClick={() => toggleGloss(item.surface, item.lemma)} aria-expanded={activeGloss === item.surface}>
                  <strong>{item.surface}</strong><span>{localized(item.glosses, locale)}</span>
                  {activeGloss === item.surface && item.reading && <em>{item.reading}</em>}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="button" className="listen-primary" onClick={() => setStage(1)}>{copy.goRead}</button>
      </section>
      </div>

      <div hidden={stage !== 1}>
      <section className="listen-panel" aria-labelledby="assisted-reading">
        <p className="listen-kicker">2 · {copy.stages[1]}</p>
        <h2 id="assisted-reading">{copy.read}</h2>
        <div className={`${styles.readingText} ${exercise.language === 'ko' ? styles.hangulText : ''}`} lang={exercise.variant}>
          {tokens.map((token, index) => {
            const entry = vocabulary.get(token.lookup)
            if (!entry) return <span key={`${token.raw}-${index}`}>{token.raw}</span>
            const open = activeGloss === entry.surface
            return (
              <span className={styles.glossWrap} key={`${token.raw}-${index}`}>
                <button type="button" className={styles.glossWord} aria-expanded={open} onClick={() => toggleGloss(entry.surface, entry.lemma)}>{token.raw}</button>
                {open && <span className={styles.glossPopover} role="tooltip"><strong>{localized(entry.glosses, locale)}</strong>{entry.reading && <em>{entry.reading}</em>}</span>}
              </span>
            )
          })}
        </div>
        {exercise.audio && (
          <>
            <audio ref={audioRef} src={exercise.audio.src} preload="none" onPlay={() => setAudioPlaying(true)} onPause={() => setAudioPlaying(false)} onEnded={() => setAudioPlaying(false)} />
            <button type="button" className={styles.secondaryButton} onClick={() => {
              const el = audioRef.current
              if (!el) return
              if (el.paused) { el.playbackRate = exercise.audio?.defaultRate ?? 1; void el.play(); trackEvent('reading_audio_played') } else { el.pause() }
            }}>
              {audioPlaying ? <Pause size={17} /> : <Volume2 size={17} />} {audioPlaying ? copy.pausePlayback : copy.listen}
            </button>
          </>
        )}
        <button type="button" className={readComplete ? styles.completedButton : styles.secondaryButton} onClick={() => { setReadComplete(true); trackEvent('reading_text_marked_read') }}>
          <CheckCircle2 size={17} /> {readComplete ? copy.readDone : copy.markRead}
        </button>
        <ReadingRecorder exerciseId={exercise.id} locale={locale} />
        <div><button type="button" className="listen-primary" onClick={() => setStage(2)}>{copy.goCheck}</button></div>
      </section>
      </div>

      <div hidden={stage !== 2}>
      <section className="listen-panel" aria-labelledby="comprehension-check">
        <p className="listen-kicker">3 · {copy.stages[2]}</p>
        <h2 id="comprehension-check">{copy.check}</h2>
        {shuffleSeed === null ? <p className={styles.questionLoading} aria-live="polite">{copy.preparingQuestions}</p> : (
        <div className={styles.questionGrid}>
          {exercise.questions.map((question, index) => {
            const options = shuffledOptions.get(question.id) ?? []
            return (
            <div key={question.id} className={styles.questionWrap}>
              <p className={styles.questionLabel}>{question.skill} · {copy.question} {index + 1}</p>
              {question.type === 'ordering' ? (
                <OrderingQuestion key={`${question.id}-${shuffleSeed}`} question={question} locale={locale} options={options} value={answers[question.id]} onAnswer={(value) => answerQuestion(question, value)} />
              ) : (
                <ChoiceQuestion question={question} locale={locale} options={options} value={answers[question.id]} onAnswer={(value) => answerQuestion(question, value)} />
              )}
            </div>
          )})}
        </div>
        )}
        <button type="button" className="listen-primary" onClick={() => setStage(3)}>{copy.goProduce}</button>
      </section>
      </div>

      <div hidden={stage !== 3}>
      <section className="listen-panel" aria-labelledby="production-task">
        <p className="listen-kicker">4 · {copy.stages[3]}</p>
        <h2 id="production-task">{copy.use}</h2>
        <label className={styles.productionLabel} htmlFor="reading-production">{localized(exercise.production.prompt, locale)}</label>
        <textarea id="reading-production" value={production} onChange={(event) => setProduction(event.target.value)} rows={5} placeholder={exercise.production.hints.join(' · ')} />
        <div className={styles.productionMeta}><span>{wordCount} / {exercise.production.maxWords} {copy.words}</span><span>{copy.unscored}</span></div>
        <button type="button" className="listen-primary" onClick={() => setStage(4)}>{copy.goResult}</button>
      </section>
      </div>

      <div hidden={stage !== 4}>
      <section className="listen-panel" aria-labelledby="reading-result">
        <p className="listen-kicker">5 · {copy.stages[4]}</p>
        <h2 id="reading-result">{copy.result}</h2>
        <div className={styles.resultGrid}>
          <div
            className={styles.scoreRing}
            aria-label={`${score} ${copy.correct}`}
            style={{ '--score-pct': `${exercise.questions.length ? Math.round((score / exercise.questions.length) * 100) : 0}%` } as CSSProperties}
          ><strong>{score}/{exercise.questions.length}</strong><span>{copy.correct}</span></div>
          <div className={styles.resultCopy}>
            <h3>{complete ? (score >= Math.ceil(exercise.questions.length * 0.8) ? copy.success : copy.keepGoing) : `${answeredCount}/${exercise.questions.length} ${copy.answered}`}</h3>
            <p>{complete ? localized(exercise.leveling.targetCanDo, locale) : copy.finishPrompt}</p>
            <button type="button" className={styles.secondaryButton} onClick={reset}><RotateCcw size={16} /> {copy.retry}</button>
          </div>
          <div className={styles.skillBars}>
            {(['global', 'detail', 'vocabulary', 'organization'] as const).map((skill) => {
              const skillQuestions = exercise.questions.filter((question) => question.skill === skill)
              if (!skillQuestions.length) return null
              const skillCorrect = skillQuestions.filter((question) => answers[question.id] !== undefined && answersMatch(question, answers[question.id])).length
              const percent = Math.round((skillCorrect / skillQuestions.length) * 100)
              return <div key={skill}><span>{skill}</span><div><i style={{ width: `${percent}%` }} /></div><strong>{percent}%</strong></div>
            })}
          </div>
        </div>
      </section>

      <section className={styles.supportContent}>
        <div><h2>{copy.practised}</h2><ul>{exercise.content.objectives.map((objective) => <li key={localized(objective, locale)}>{localized(objective, locale)}</li>)}</ul></div>
        {exercise.content.spanishSpeakerNote && <div><h2>{copy.commonError}</h2><p>{localized(exercise.content.spanishSpeakerNote, locale)}</p></div>}
        {exercise.content.culturalNote && <div><h2>{copy.cultural}</h2><p>{localized(exercise.content.culturalNote, locale)}</p></div>}
        <div>
          <h2>{copy.faq}</h2>
          <details><summary>{copy.faqLevel}</summary><p>{exercise.level.cefr}. {exercise.level.mappingDisclaimer && localized(exercise.level.mappingDisclaimer, locale)}</p></details>
          <details><summary>{copy.faqHelp}</summary><p>{copy.faqHelpAnswer}</p></details>
        </div>
      </section>

      {exercise.status !== 'published' && <aside className={styles.reviewNotice}><CircleHelp size={18} /><span>{copy.reviewRequired}</span></aside>}
      {canRenderPdf(READING_LANG_SLUG[exercise.language] ?? '') && (
        <div className="topic-download no-print">
          <PdfDownloadButton
            label="Descargar esta lectura en PDF"
            generate={async () => {
              const { generateReadingPdf } = await import('@/lib/pdf/generateReadingPdf')
              await generateReadingPdf(exercise, locale)
            }}
          />
          <span>El texto, el glosario, las preguntas y las soluciones con su evidencia.</span>
        </div>
      )}

      <div className={styles.lessonFooterLinks}>
        <Link className={styles.nextLink} href={hubHref}>{copy.back}<ArrowRight size={17} /></Link>
        {nextSibling && (
          <Link className={styles.nextLink} href={readingExercisePath(locale, nextSibling.language, nextSibling.level.cefr, nextSibling.slug)}>
            {copy.nextReading}<ArrowRight size={17} />
          </Link>
        )}
      </div>
      </div>
      </article>
    </div>
  )
}
