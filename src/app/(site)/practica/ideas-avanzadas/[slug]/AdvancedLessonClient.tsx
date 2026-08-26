'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  ChevronDown,
  Headphones,
  Languages,
  Lightbulb,
  Pause,
  PenLine,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react'
import type { AdvancedLesson, AdvancedQuestion } from '@/data/practica/advanced-topics'
import { ADVANCED_CYCLE } from '@/data/practica/advanced-topics'
import styles from './AdvancedLesson.module.css'

interface SavedLessonState {
  stage: number
  completed: number[]
  openingChoice: number | null
  draft: string
  checks: boolean[]
}

const STAGE_ICONS = [Lightbulb, BookOpenText, Headphones, Languages, Sparkles, PenLine]

function QuestionBlock({
  question,
  selected,
  onSelect,
}: {
  question: AdvancedQuestion
  selected: number | undefined
  onSelect: (option: number) => void
}) {
  const answered = selected !== undefined

  return (
    <fieldset className={styles.question}>
      <legend>{question.prompt}</legend>
      <div className={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selected === index
          const isCorrect = answered && index === question.answer
          const isWrong = answered && isSelected && index !== question.answer

          return (
            <button
              className={`${styles.option} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.wrong : ''}`}
              key={option}
              onClick={() => onSelect(index)}
              type="button"
              aria-pressed={isSelected}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
              {isCorrect && <Check size={17} aria-label="Respuesta correcta" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <p className={selected === question.answer ? styles.feedbackCorrect : styles.feedbackWrong} role="status">
          <strong>{selected === question.answer ? 'Exacto.' : 'Mira el contraste.'}</strong>{' '}
          {question.explanation}
        </p>
      )}
    </fieldset>
  )
}

export default function AdvancedLessonClient({ lesson }: { lesson: AdvancedLesson }) {
  const storageKey = `wl-advanced-${lesson.slug}-v1`
  const [stage, setStage] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [openingChoice, setOpeningChoice] = useState<number | null>(null)
  const [returnChoice, setReturnChoice] = useState<number | null>(null)
  const [showOpeningReveal, setShowOpeningReveal] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, number>>({})
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({})
  const [revealedWords, setRevealedWords] = useState<string[]>([])
  const [draft, setDraft] = useState('')
  const [checks, setChecks] = useState<boolean[]>(lesson.production.checklist.map(() => false))
  const [showModel, setShowModel] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Browser capability and the saved draft are external state hydrated once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpeechSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw) {
        const saved = JSON.parse(raw) as SavedLessonState
        setStage(Math.min(Math.max(saved.stage ?? 0, 0), ADVANCED_CYCLE.length - 1))
        setCompleted(saved.completed ?? [])
        setOpeningChoice(saved.openingChoice ?? null)
        setDraft(saved.draft ?? '')
        setChecks(saved.checks?.length === lesson.production.checklist.length ? saved.checks : checks)
      }
    } catch {
      // A damaged local draft should never block the lesson.
    }
    setHydrated(true)
    return () => window.speechSynthesis?.cancel()
    // The initial checklist is deliberately read once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const state: SavedLessonState = { stage, completed, openingChoice, draft, checks }
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [checks, completed, draft, hydrated, openingChoice, stage, storageKey])

  const progress = Math.round((completed.length / ADVANCED_CYCLE.length) * 100)
  const allPracticeAnswered = lesson.practice.questions.every((question) => practiceAnswers[question.id] !== undefined)
  const practiceScore = useMemo(
    () => lesson.practice.questions.filter((question) => practiceAnswers[question.id] === question.answer).length,
    [lesson.practice.questions, practiceAnswers],
  )

  const selectStage = (nextStage: number) => {
    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
    setStage(nextStage)
    window.requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const completeAndContinue = () => {
    setCompleted((current) => (current.includes(stage) ? current : [...current, stage].sort()))
    if (stage < ADVANCED_CYCLE.length - 1) selectStage(stage + 1)
  }

  const speak = () => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(lesson.listening.script)
    utterance.lang = 'en-US'
    utterance.rate = 0.88
    const voices = window.speechSynthesis.getVoices()
    utterance.voice = voices.find((voice) => voice.lang.startsWith('en')) ?? null
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
  }

  const resetLesson = () => {
    window.speechSynthesis?.cancel()
    window.localStorage.removeItem(storageKey)
    setStage(0)
    setCompleted([])
    setOpeningChoice(null)
    setReturnChoice(null)
    setShowOpeningReveal(false)
    setShowTranscript(false)
    setIsSpeaking(false)
    setListeningAnswers({})
    setPracticeAnswers({})
    setRevealedWords([])
    setDraft('')
    setChecks(lesson.production.checklist.map(() => false))
    setShowModel(false)
  }

  return (
    <main className={`wlp-page ${styles.page}`}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/practica">Practice</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/ideas-avanzadas">Advanced ideas</Link>
          <span aria-hidden="true">/</span>
          <span>{lesson.breadcrumbTitle}</span>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className="wlp-eyebrow">Ciclo {String(lesson.sequence).padStart(2, '0')} · {lesson.category.toLowerCase()} · {lesson.level}</p>
            <h1>{lesson.title}</h1>
            <p className={styles.subtitle}>{lesson.subtitle}</p>
            <p className={styles.objective}>{lesson.objective}</p>
          </div>
          <div className={styles.progressCard}>
            <div className={styles.progressTop}>
              <span>Your cycle</span>
              <strong>{progress}%</strong>
            </div>
            <div className={styles.progressTrack} aria-label={`${progress}% complete`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <small>{completed.length} of {ADVANCED_CYCLE.length} moves · saved on this device</small>
            <button className={styles.reset} onClick={resetLesson} type="button">
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </header>

        <nav className={styles.stageNav} aria-label="Lesson stages">
          {ADVANCED_CYCLE.map((item, index) => {
            const Icon = STAGE_ICONS[index]
            const isCompleted = completed.includes(index)
            return (
              <button
                className={stage === index ? styles.stageActive : ''}
                key={item.id}
                onClick={() => selectStage(index)}
                type="button"
                aria-current={stage === index ? 'step' : undefined}
              >
                <span>{isCompleted ? <Check size={15} /> : <Icon size={15} />}</span>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <strong>{item.label}</strong>
              </button>
            )
          })}
        </nav>

        <div className={styles.lesson} ref={contentRef}>
          <aside className={styles.stageAside}>
            <span>{String(stage + 1).padStart(2, '0')}</span>
            <p>of 06</p>
            <div aria-hidden="true" />
            <small>{lesson.minutes} min total</small>
          </aside>

          <section className={styles.stageContent} key={stage}>
            {stage === 0 && (
              <>
                <p className={styles.stageEyebrow}>Orient · respond before studying</p>
                <h2>{lesson.opening.title}</h2>
                <p className={styles.instruction}>{lesson.opening.instruction}</p>
                <div className={styles.frameChoice}>
                  {lesson.opening.options.map((option, index) => (
                    <button
                      className={openingChoice === index ? styles.frameSelected : ''}
                      key={option}
                      onClick={() => {
                        setOpeningChoice(index)
                        setShowOpeningReveal(false)
                      }}
                      type="button"
                      aria-pressed={openingChoice === index}
                    >
                      <span>Option {String.fromCharCode(65 + index)}</span>
                      <strong>{option}</strong>
                    </button>
                  ))}
                </div>
                {openingChoice !== null && (
                  <button className={styles.revealButton} onClick={() => setShowOpeningReveal(true)} type="button">
                    Inspect the framing <ArrowRight size={16} />
                  </button>
                )}
                {showOpeningReveal && (
                  <div className={styles.insight} role="status">
                    <Lightbulb size={22} />
                    <div>
                      <strong>{lesson.opening.revealTitle}</strong>
                      <p>{lesson.opening.reveal}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {stage === 2 && (
              <>
                <p className={styles.stageEyebrow}>Listen · main idea and detail</p>
                <h2>{lesson.listening.title}</h2>
                <p className={styles.instruction}>{lesson.listening.instruction}</p>
                <div className={styles.audioPanel}>
                  <div className={styles.audioIcon}><Volume2 size={24} /></div>
                  <div>
                    <strong>English audio · {lesson.listening.duration}</strong>
                    <small>Browser voice · 0.88× speed</small>
                  </div>
                  {speechSupported ? (
                    <button onClick={isSpeaking ? stopSpeaking : speak} type="button">
                      {isSpeaking ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                      {isSpeaking ? 'Pause' : 'Play'}
                    </button>
                  ) : (
                    <span className={styles.noAudio}>Audio unavailable</span>
                  )}
                </div>
                <button className={styles.transcriptToggle} onClick={() => setShowTranscript((value) => !value)} type="button" aria-expanded={showTranscript}>
                  {showTranscript ? 'Hide transcript' : 'Show transcript'}
                  <ChevronDown className={showTranscript ? styles.chevronOpen : ''} size={17} />
                </button>
                {showTranscript && <p className={styles.transcript}>{lesson.listening.script}</p>}
                <div className={styles.questionStack}>
                  {lesson.listening.questions.map((question) => (
                    <QuestionBlock
                      key={question.id}
                      question={question}
                      selected={listeningAnswers[question.id]}
                      onSelect={(option) => setListeningAnswers((current) => ({ ...current, [question.id]: option }))}
                    />
                  ))}
                </div>
              </>
            )}

            {stage === 1 && (
              <>
                <p className={styles.stageEyebrow}>Read · evidence, language and limits</p>
                <h2>{lesson.reading.title}</h2>
                <p className={styles.readingDek}>{lesson.reading.dek}</p>
                <article className={styles.reading} lang="en">
                  {lesson.reading.sections.map((section, index) => (
                    <section key={section.heading}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <h3>{section.heading}</h3>
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </section>
                  ))}
                  <footer>
                    Conceptual sources:{' '}
                    {lesson.reading.sources.map((source, index) => (
                      <span key={source.href}>
                        {index > 0 && ' · '}
                        <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
                      </span>
                    ))}. The educational text is an original WeLearn synthesis.
                  </footer>
                </article>
              </>
            )}

            {stage === 3 && (
              <>
                <p className={styles.stageEyebrow}>Vocabulary · precision before decoration</p>
                <h2>{lesson.vocabularyTitle}</h2>
                <p className={styles.instruction}>Open each card, say the example aloud and create a second example of your own.</p>
                <div className={styles.vocabGrid}>
                  {lesson.vocabulary.map((item) => {
                    const isRevealed = revealedWords.includes(item.term)
                    return (
                      <button
                        className={isRevealed ? styles.vocabRevealed : ''}
                        key={item.term}
                        onClick={() => setRevealedWords((current) => current.includes(item.term) ? current.filter((term) => term !== item.term) : [...current, item.term])}
                        type="button"
                        aria-expanded={isRevealed}
                      >
                        <span>{item.partOfSpeech}</span>
                        <strong>{item.term}</strong>
                        {isRevealed ? (
                          <div>
                            <p>{item.meaning}</p>
                            <em>{item.example}</em>
                          </div>
                        ) : <small>Open meaning + example</small>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {stage === 4 && (
              <>
                <p className={styles.stageEyebrow}>{lesson.practice.eyebrow}</p>
                <h2>{lesson.practice.title}</h2>
                <p className={styles.instruction}>{lesson.practice.instruction}</p>
                <div className={styles.questionStack}>
                  {lesson.practice.questions.map((question) => (
                    <QuestionBlock
                      key={question.id}
                      question={question}
                      selected={practiceAnswers[question.id]}
                      onSelect={(option) => setPracticeAnswers((current) => ({ ...current, [question.id]: option }))}
                    />
                  ))}
                </div>
                {allPracticeAnswered && (
                  <div className={styles.score} role="status">
                    <strong>{practiceScore}/{lesson.practice.questions.length}</strong>
                    <p>{practiceScore === lesson.practice.questions.length ? lesson.practice.success : 'Review the explanations and reformulate each error in your own words.'}</p>
                  </div>
                )}
              </>
            )}

            {stage === 5 && (
              <>
                <p className={styles.stageEyebrow}>Produce · close the cycle</p>
                <h2>{lesson.production.title}</h2>
                <p className={styles.productionPrompt}>{lesson.production.prompt}</p>
                <label className={styles.draftLabel} htmlFor={`${lesson.slug}-draft`}>
                  {lesson.production.draftLabel}
                  <span>{draft.trim() ? draft.trim().split(/\s+/).length : 0} words</span>
                </label>
                <textarea
                  id={`${lesson.slug}-draft`}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={lesson.production.placeholder}
                />
                <div className={styles.checklist}>
                  {lesson.production.checklist.map((item, index) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        checked={checks[index]}
                        onChange={() => setChecks((current) => current.map((value, checkIndex) => checkIndex === index ? !value : value))}
                      />
                      <span><Check size={14} /></span>
                      {item}
                    </label>
                  ))}
                </div>
                <button className={styles.modelButton} onClick={() => setShowModel((value) => !value)} type="button">
                  {showModel ? 'Hide model' : 'Compare with a model'}
                </button>
                {showModel && <p className={styles.model}>{lesson.production.model}</p>}

                <div className={styles.loopBack}>
                  <RotateCcw size={22} />
                  <div>
                    <span>Return to the beginning</span>
                    <h3>{lesson.opening.returnTitle}</h3>
                    <p>{lesson.opening.returnPrompt}</p>
                  </div>
                  <div className={styles.returnOptions}>
                    {lesson.opening.options.map((option, index) => (
                      <button className={returnChoice === index ? styles.returnSelected : ''} key={option} onClick={() => setReturnChoice(index)} type="button">
                        <span>{index === 0 ? 'A' : 'B'}</span>{option}
                      </button>
                    ))}
                  </div>
                  {returnChoice !== null && (
                    <p className={styles.loopConclusion}>
                      Your opening choice was <strong>{openingChoice === null ? 'not recorded' : String.fromCharCode(65 + openingChoice)}</strong>; your return choice is <strong>{String.fromCharCode(65 + returnChoice)}</strong>. {lesson.opening.returnConclusion}
                    </p>
                  )}
                </div>
              </>
            )}

            <footer className={styles.stageFooter}>
              {stage > 0 ? (
                <button className={styles.backButton} onClick={() => selectStage(stage - 1)} type="button">
                  <ArrowLeft size={17} /> Previous
                </button>
              ) : <span />}
              {stage < ADVANCED_CYCLE.length - 1 ? (
                <button className={styles.nextButton} onClick={completeAndContinue} type="button">
                  Mark stage and continue <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  className={styles.nextButton}
                  disabled={returnChoice === null}
                  onClick={() => setCompleted((current) => current.includes(stage) ? current : [...current, stage].sort())}
                  type="button"
                >
                  <Check size={17} /> Complete cycle
                </button>
              )}
            </footer>
          </section>
        </div>
      </div>
    </main>
  )
}
