'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, BookOpenCheck, Check, CheckCircle2, ChevronDown,
  ChevronUp, CircleHelp, RotateCcw, Sparkles, Target, Volume2,
} from 'lucide-react'
import { getScriptCapabilities, tokenizeReadingText } from '@/lib/reading/adapters'
import { readingHubPath } from '@/lib/reading/routes'
import { localized } from '@/lib/reading/validate'
import type { ReadingExercise, ReadingQuestion, TutorLocale } from '@/lib/reading/types'
import styles from './reading.module.css'

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>> }
}

const COPY = {
  es: {
    back: 'Todas las lecturas', preview: 'Vista editorial · no indexable', words: 'palabras',
    before: 'Antes de leer', mission: 'Tu misión', vocabulary: 'Vocabulario clave',
    read: 'Lee a tu ritmo', markRead: 'Marcar como leído', readDone: 'Texto leído', audioPending: 'Audio pendiente de revisión',
    check: 'Comprueba lo que entendiste', question: 'Pregunta', evidence: 'Evidencia', strategy: 'Estrategia',
    orderHelp: 'Usa los botones para cambiar el orden y luego comprueba tu respuesta.', submitOrder: 'Comprobar orden',
    use: 'Usa el idioma', unscored: 'Esta producción no cambia tu puntaje ni se envía a analítica.',
    result: 'Tu resultado', answered: 'preguntas respondidas', correct: 'correctas', retry: 'Reintentar',
    finishPrompt: 'Responde todas las preguntas para ver tu resultado completo.',
    practised: 'Lo que practicaste', commonError: 'Ayuda para hispanohablantes', cultural: 'Nota cultural', faq: 'Preguntas frecuentes',
    faqLevel: '¿Qué nivel tiene esta lectura?', faqHelp: '¿Las ayudas revelan la respuesta?',
    faqHelpAnswer: 'No. Las glosas explican vocabulario, pero las respuestas solo aparecen después de tu intento.',
    reviewRequired: 'Este borrador necesita revisión lingüística y pedagógica humana antes de publicarse.',
  },
  en: {
    back: 'All readings', preview: 'Editorial preview · not indexable', words: 'words',
    before: 'Before you read', mission: 'Your mission', vocabulary: 'Key vocabulary',
    read: 'Read at your pace', markRead: 'Mark as read', readDone: 'Text read', audioPending: 'Audio pending review',
    check: 'Check what you understood', question: 'Question', evidence: 'Evidence', strategy: 'Strategy',
    orderHelp: 'Use the buttons to change the order, then check your answer.', submitOrder: 'Check order',
    use: 'Use the language', unscored: 'This response does not affect your score and is not sent to analytics.',
    result: 'Your result', answered: 'questions answered', correct: 'correct', retry: 'Try again',
    finishPrompt: 'Answer every question to see your full result.',
    practised: 'What you practised', commonError: 'Support for Spanish speakers', cultural: 'Cultural note', faq: 'Frequently asked questions',
    faqLevel: 'What level is this reading?', faqHelp: 'Do the support tools reveal the answer?',
    faqHelpAnswer: 'No. Glosses explain vocabulary, but answers only appear after your attempt.',
    reviewRequired: 'This draft needs human language and pedagogy review before publication.',
  },
} as const

type StoredAnswer = string | boolean | string[]

function track(event: string, exercise: ReadingExercise, extra: Record<string, unknown> = {}) {
  window.dataLayer?.push({
    event,
    reading_language: exercise.language,
    reading_level: exercise.level.cefr,
    reading_exercise_id: exercise.id,
    ...extra,
  })
}

function answersMatch(question: ReadingQuestion, value: StoredAnswer) {
  if (Array.isArray(question.answer) && Array.isArray(value)) return question.answer.join('|') === value.join('|')
  return question.answer === value
}

function ChoiceQuestion({
  question, locale, value, onAnswer,
}: {
  question: ReadingQuestion
  locale: TutorLocale
  value?: StoredAnswer
  onAnswer: (value: StoredAnswer) => void
}) {
  const answered = value !== undefined
  const correct = answered && answersMatch(question, value)
  const options = question.options ?? []
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
  question, locale, value, onAnswer,
}: {
  question: ReadingQuestion
  locale: TutorLocale
  value?: StoredAnswer
  onAnswer: (value: StoredAnswer) => void
}) {
  const initial = question.options?.map((option) => option.id) ?? []
  const [order, setOrder] = useState<string[]>(Array.isArray(value) ? value : initial)
  const answered = Array.isArray(value)
  const correct = answered && answersMatch(question, value)
  const labels = new Map(question.options?.map((option) => [option.id, option.text]))

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

export function ReadingLesson({ exercise, locale }: { exercise: ReadingExercise; locale: TutorLocale }) {
  const copy = COPY[locale]
  const [answers, setAnswers] = useState<Record<string, StoredAnswer>>({})
  const [readComplete, setReadComplete] = useState(false)
  const [activeGloss, setActiveGloss] = useState<string | null>(null)
  const [production, setProduction] = useState('')
  const capabilities = getScriptCapabilities(exercise)
  const tokens = useMemo(() => tokenizeReadingText(exercise.content.targetText, exercise.language), [exercise])
  const vocabulary = useMemo(() => new Map(exercise.content.vocabulary.map((item) => [item.surface.toLocaleLowerCase(), item])), [exercise])
  const answeredCount = Object.keys(answers).length
  const score = exercise.questions.filter((question) => {
    const value = answers[question.id]
    return value !== undefined && answersMatch(question, value)
  }).length
  const complete = answeredCount === exercise.questions.length
  const wordCount = production.trim() ? production.trim().split(/\s+/u).length : 0

  useEffect(() => {
    track('reading_impression', exercise, { tutor_locale: locale, genre: exercise.classification.genre })
  }, [exercise, locale])

  function answerQuestion(question: ReadingQuestion, answer: StoredAnswer) {
    setAnswers((current) => ({ ...current, [question.id]: answer }))
    track('question_answered', exercise, { question_id: question.id, skill: question.skill, correct: answersMatch(question, answer) })
  }

  function reset() {
    setAnswers({})
    setReadComplete(false)
    setActiveGloss(null)
    setProduction('')
    track('reading_retried', exercise)
  }

  return (
    <article className={styles.pageWidth}>
      <nav className={styles.lessonBack}>
        <Link href={readingHubPath(locale, exercise.language, exercise.level.cefr)}><ArrowLeft size={16} /> {copy.back}</Link>
        {exercise.status !== 'published' && <span className={styles.previewPill}>{copy.preview}</span>}
      </nav>

      <header className={styles.lessonHero}>
        <p className={styles.eyebrow}>{exercise.level.cefr} · {exercise.classification.topic} · {exercise.content.estimatedMinutes} min</p>
        <h1>{localized(exercise.content.title, locale)}</h1>
        <p className={styles.lead}>{localized(exercise.content.intro, locale)}</p>
        <div className={styles.lessonMeta}>
          <span>{exercise.level.cefr}</span><span>{exercise.content.wordCount} {copy.words}</span>
          <span>{exercise.content.grammarFocus?.[0]}</span>
          <span>{capabilities.tokenizationMode}</span>
        </div>
      </header>

      <section className={styles.station} aria-labelledby="before-reading">
        <h2 id="before-reading"><span>1</span>{copy.before}</h2>
        <div className={styles.beforeGrid}>
          <div>
            <h3>{copy.mission}</h3>
            <div className={styles.missionBox}><Target aria-hidden="true" /><p>{localized(exercise.content.mission, locale)}</p></div>
          </div>
          <div>
            <h3>{copy.vocabulary}</h3>
            <div className={styles.vocabGrid}>
              {exercise.content.vocabulary.map((item) => (
                <button key={item.surface} type="button" className={styles.vocabChip} onClick={() => setActiveGloss(activeGloss === item.surface ? null : item.surface)} aria-expanded={activeGloss === item.surface}>
                  <strong>{item.surface}</strong><span>{localized(item.glosses, locale)}</span>
                  {activeGloss === item.surface && item.reading && <em>{item.reading}</em>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.station} aria-labelledby="assisted-reading">
        <div className={styles.stationTitleRow}>
          <h2 id="assisted-reading"><span>2</span>{copy.read}</h2>
          <span className={styles.audioPending}><Volume2 size={16} /> {copy.audioPending}</span>
        </div>
        <div className={`${styles.readingText} ${exercise.language === 'ko' ? styles.hangulText : ''}`} lang={exercise.variant}>
          {tokens.map((token, index) => {
            const entry = vocabulary.get(token.lookup)
            if (!entry) return <span key={`${token.raw}-${index}`}>{token.raw}</span>
            const open = activeGloss === entry.surface
            return (
              <span className={styles.glossWrap} key={`${token.raw}-${index}`}>
                <button type="button" className={styles.glossWord} aria-expanded={open} onClick={() => { setActiveGloss(open ? null : entry.surface); track('gloss_opened', exercise, { lemma: entry.lemma }) }}>{token.raw}</button>
                {open && <span className={styles.glossPopover} role="tooltip"><strong>{localized(entry.glosses, locale)}</strong>{entry.reading && <em>{entry.reading}</em>}</span>}
              </span>
            )
          })}
        </div>
        <button type="button" className={readComplete ? styles.completedButton : styles.secondaryButton} onClick={() => { setReadComplete(true); track('reading_started', exercise) }}>
          <CheckCircle2 size={17} /> {readComplete ? copy.readDone : copy.markRead}
        </button>
      </section>

      <section className={styles.station} aria-labelledby="comprehension-check">
        <h2 id="comprehension-check"><span>3</span>{copy.check}</h2>
        <div className={styles.questionGrid}>
          {exercise.questions.map((question, index) => (
            <div key={question.id} className={styles.questionWrap}>
              <p className={styles.questionLabel}>{question.skill} · {copy.question} {index + 1}</p>
              {question.type === 'ordering' ? (
                <OrderingQuestion question={question} locale={locale} value={answers[question.id]} onAnswer={(value) => answerQuestion(question, value)} />
              ) : (
                <ChoiceQuestion question={question} locale={locale} value={answers[question.id]} onAnswer={(value) => answerQuestion(question, value)} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.station} aria-labelledby="production-task">
        <h2 id="production-task"><span>4</span>{copy.use}</h2>
        <label className={styles.productionLabel} htmlFor="reading-production">{localized(exercise.production.prompt, locale)}</label>
        <textarea id="reading-production" value={production} onChange={(event) => setProduction(event.target.value)} rows={5} placeholder={exercise.production.hints.join(' · ')} />
        <div className={styles.productionMeta}><span>{wordCount} / {exercise.production.maxWords} {copy.words}</span><span>{copy.unscored}</span></div>
      </section>

      <section className={styles.station} aria-labelledby="reading-result">
        <h2 id="reading-result"><span>5</span>{copy.result}</h2>
        <div className={styles.resultGrid}>
          <div className={styles.scoreRing} aria-label={`${score} ${copy.correct}`}><strong>{score}/{exercise.questions.length}</strong><span>{copy.correct}</span></div>
          <div className={styles.resultCopy}>
            <h3>{complete ? (score >= Math.ceil(exercise.questions.length * 0.8) ? '¡Buen trabajo!' : (locale === 'es' ? 'Sigue practicando' : 'Keep practising')) : `${answeredCount}/${exercise.questions.length} ${copy.answered}`}</h3>
            <p>{complete ? localized(exercise.leveling.targetCanDo ? { es: exercise.leveling.targetCanDo, en: `You practised: ${exercise.leveling.targetCanDo}` } : {}, locale) : copy.finishPrompt}</p>
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
        <div><h2>{copy.practised}</h2><ul>{exercise.content.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
        {exercise.content.spanishSpeakerNote && <div><h2>{copy.commonError}</h2><p>{exercise.content.spanishSpeakerNote}</p></div>}
        {exercise.content.culturalNote && <div><h2>{copy.cultural}</h2><p>{localized(exercise.content.culturalNote, locale)}</p></div>}
        <div>
          <h2>{copy.faq}</h2>
          <details><summary>{copy.faqLevel}</summary><p>{exercise.level.cefr}. {exercise.level.mappingDisclaimer}</p></details>
          <details><summary>{copy.faqHelp}</summary><p>{copy.faqHelpAnswer}</p></details>
        </div>
      </section>

      {exercise.status !== 'published' && <aside className={styles.reviewNotice}><CircleHelp size={18} /><span>{copy.reviewRequired}</span></aside>}
      <Link className={styles.nextLink} href={readingHubPath(locale, exercise.language, exercise.level.cefr)}>{copy.back}<ArrowRight size={17} /></Link>
    </article>
  )
}
