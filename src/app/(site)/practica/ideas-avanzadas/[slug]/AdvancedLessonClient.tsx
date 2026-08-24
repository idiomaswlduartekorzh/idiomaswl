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
import type { AdvancedQuestion } from '@/data/practica/advanced-topics'
import { ADVANCED_CYCLE, FRAMING_LESSON } from '@/data/practica/advanced-topics'
import styles from './AdvancedLesson.module.css'

const STORAGE_KEY = 'wl-advanced-framing-v1'

interface SavedLessonState {
  stage: number
  completed: number[]
  openingChoice: number | null
  draft: string
  checks: boolean[]
}

const STAGE_ICONS = [Lightbulb, Headphones, BookOpenText, Languages, Sparkles, PenLine]

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

export default function AdvancedLessonClient() {
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
  const [checks, setChecks] = useState<boolean[]>(FRAMING_LESSON.production.checklist.map(() => false))
  const [showModel, setShowModel] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSpeechSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as SavedLessonState
        setStage(Math.min(Math.max(saved.stage ?? 0, 0), ADVANCED_CYCLE.length - 1))
        setCompleted(saved.completed ?? [])
        setOpeningChoice(saved.openingChoice ?? null)
        setDraft(saved.draft ?? '')
        setChecks(saved.checks?.length === FRAMING_LESSON.production.checklist.length ? saved.checks : checks)
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [checks, completed, draft, hydrated, openingChoice, stage])

  const progress = Math.round((completed.length / ADVANCED_CYCLE.length) * 100)
  const allPracticeAnswered = FRAMING_LESSON.practice.every((question) => practiceAnswers[question.id] !== undefined)
  const practiceScore = useMemo(
    () => FRAMING_LESSON.practice.filter((question) => practiceAnswers[question.id] === question.answer).length,
    [practiceAnswers],
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
    const utterance = new SpeechSynthesisUtterance(FRAMING_LESSON.listening.script)
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
    window.localStorage.removeItem(STORAGE_KEY)
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
    setChecks(FRAMING_LESSON.production.checklist.map(() => false))
    setShowModel(false)
  }

  return (
    <main className={`wlp-page ${styles.page}`}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/ideas-avanzadas">Ideas avanzadas</Link>
          <span aria-hidden="true">/</span>
          <span>Efecto de encuadre</span>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className="wlp-eyebrow">Ciclo 01 · sesgos · {FRAMING_LESSON.level}</p>
            <h1>{FRAMING_LESSON.title}</h1>
            <p className={styles.subtitle}>{FRAMING_LESSON.subtitle}</p>
            <p className={styles.objective}>{FRAMING_LESSON.objective}</p>
          </div>
          <div className={styles.progressCard}>
            <div className={styles.progressTop}>
              <span>Tu órbita</span>
              <strong>{progress}%</strong>
            </div>
            <div className={styles.progressTrack} aria-label={`${progress}% completado`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <small>{completed.length} de {ADVANCED_CYCLE.length} movimientos · se guarda en este dispositivo</small>
            <button className={styles.reset} onClick={resetLesson} type="button">
              <RotateCcw size={13} /> Reiniciar
            </button>
          </div>
        </header>

        <nav className={styles.stageNav} aria-label="Etapas de la lección">
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
            <p>de 06</p>
            <div aria-hidden="true" />
            <small>{FRAMING_LESSON.minutes} min en total</small>
          </aside>

          <section className={styles.stageContent} key={stage}>
            {stage === 0 && (
              <>
                <p className={styles.stageEyebrow}>Orientar · responde antes de estudiar</p>
                <h2>¿Qué versión te inspira más confianza?</h2>
                <p className={styles.instruction}>No calcules demasiado. Registra tu primera reacción.</p>
                <div className={styles.frameChoice}>
                  {FRAMING_LESSON.opening.options.map((option, index) => (
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
                      <span>Frame {index === 0 ? 'A' : 'B'}</span>
                      <strong>{option}</strong>
                    </button>
                  ))}
                </div>
                {openingChoice !== null && (
                  <button className={styles.revealButton} onClick={() => setShowOpeningReveal(true)} type="button">
                    Comprobar qué cambió <ArrowRight size={16} />
                  </button>
                )}
                {showOpeningReveal && (
                  <div className={styles.insight} role="status">
                    <Lightbulb size={22} />
                    <div>
                      <strong>El número no cambió.</strong>
                      <p>{FRAMING_LESSON.opening.reveal}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {stage === 1 && (
              <>
                <p className={styles.stageEyebrow}>Escuchar · idea principal y detalle</p>
                <h2>{FRAMING_LESSON.listening.title}</h2>
                <p className={styles.instruction}>
                  Escucha una vez sin transcripción. En la segunda escucha, toma dos notas: <em>how frames work</em> y <em>one defense</em>.
                </p>
                <div className={styles.audioPanel}>
                  <div className={styles.audioIcon}><Volume2 size={24} /></div>
                  <div>
                    <strong>Audio en inglés · 1:25 aprox.</strong>
                    <small>Voz del navegador · velocidad 0.88×</small>
                  </div>
                  {speechSupported ? (
                    <button onClick={isSpeaking ? stopSpeaking : speak} type="button">
                      {isSpeaking ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                      {isSpeaking ? 'Pausar' : 'Reproducir'}
                    </button>
                  ) : (
                    <span className={styles.noAudio}>Audio no disponible</span>
                  )}
                </div>
                <button className={styles.transcriptToggle} onClick={() => setShowTranscript((value) => !value)} type="button" aria-expanded={showTranscript}>
                  {showTranscript ? 'Ocultar transcripción' : 'Mostrar transcripción'}
                  <ChevronDown className={showTranscript ? styles.chevronOpen : ''} size={17} />
                </button>
                {showTranscript && <p className={styles.transcript}>{FRAMING_LESSON.listening.script}</p>}
                <div className={styles.questionStack}>
                  {FRAMING_LESSON.listening.questions.map((question) => (
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

            {stage === 2 && (
              <>
                <p className={styles.stageEyebrow}>Leer · evidencia, lenguaje y límites</p>
                <h2>{FRAMING_LESSON.reading.title}</h2>
                <p className={styles.readingDek}>{FRAMING_LESSON.reading.dek}</p>
                <article className={styles.reading} lang="en">
                  {FRAMING_LESSON.reading.sections.map((section, index) => (
                    <section key={section.heading}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <h3>{section.heading}</h3>
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </section>
                  ))}
                  <footer>
                    Fuente conceptual:{' '}
                    <a href={FRAMING_LESSON.reading.source.href} target="_blank" rel="noreferrer">
                      {FRAMING_LESSON.reading.source.label}
                    </a>. El texto pedagógico es una síntesis original de WeLearn.
                  </footer>
                </article>
              </>
            )}

            {stage === 3 && (
              <>
                <p className={styles.stageEyebrow}>Vocabulario · precisión antes que decoración</p>
                <h2>Ocho palabras para desmontar un encuadre.</h2>
                <p className={styles.instruction}>Abre cada ficha, di el ejemplo en voz alta y crea un segundo ejemplo mental.</p>
                <div className={styles.vocabGrid}>
                  {FRAMING_LESSON.vocabulary.map((item) => {
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
                        ) : <small>Ver significado + ejemplo</small>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {stage === 4 && (
              <>
                <p className={styles.stageEyebrow}>Practicar · equivalencia, agencia y matiz</p>
                <h2>Que no te baste con reconocer la definición.</h2>
                <p className={styles.instruction}>Responde las cuatro. Cada explicación señala qué debes inspeccionar.</p>
                <div className={styles.questionStack}>
                  {FRAMING_LESSON.practice.map((question) => (
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
                    <strong>{practiceScore}/{FRAMING_LESSON.practice.length}</strong>
                    <p>{practiceScore === FRAMING_LESSON.practice.length ? 'Distingues el número, el agente y el matiz.' : 'Revisa las explicaciones y vuelve a formular cada error con tus palabras.'}</p>
                  </div>
                )}
              </>
            )}

            {stage === 5 && (
              <>
                <p className={styles.stageEyebrow}>Producir · cerrar la órbita</p>
                <h2>Ahora tú controlas el encuadre.</h2>
                <p className={styles.productionPrompt}>{FRAMING_LESSON.production.prompt}</p>
                <label className={styles.draftLabel} htmlFor="framing-draft">
                  Tu reformulación en inglés
                  <span>{draft.trim() ? draft.trim().split(/\s+/).length : 0} palabras</span>
                </label>
                <textarea
                  id="framing-draft"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="The policy keeps 96 out of every 100 users safe..."
                />
                <div className={styles.checklist}>
                  {FRAMING_LESSON.production.checklist.map((item, index) => (
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
                  {showModel ? 'Ocultar modelo' : 'Comparar con un modelo'}
                </button>
                {showModel && <p className={styles.model}>{FRAMING_LESSON.production.model}</p>}

                <div className={styles.loopBack}>
                  <RotateCcw size={22} />
                  <div>
                    <span>Vuelve al comienzo</span>
                    <h3>¿Cuál frame elegirías ahora?</h3>
                    <p>No buscamos que cambies de opción. Buscamos que puedas explicar por qué ambas son equivalentes y qué información falta.</p>
                  </div>
                  <div className={styles.returnOptions}>
                    {FRAMING_LESSON.opening.options.map((option, index) => (
                      <button className={returnChoice === index ? styles.returnSelected : ''} key={option} onClick={() => setReturnChoice(index)} type="button">
                        <span>{index === 0 ? 'A' : 'B'}</span>{option}
                      </button>
                    ))}
                  </div>
                  {returnChoice !== null && (
                    <p className={styles.loopConclusion}>
                      Al inicio elegiste <strong>{openingChoice === null ? 'sin registrar' : openingChoice === 0 ? 'A' : 'B'}</strong>; ahora elegiste <strong>{returnChoice === 0 ? 'A' : 'B'}</strong>. El aprendizaje está en la explicación: 90 de 100 sobreviven y 10 de 100 no.
                    </p>
                  )}
                </div>
              </>
            )}

            <footer className={styles.stageFooter}>
              {stage > 0 ? (
                <button className={styles.backButton} onClick={() => selectStage(stage - 1)} type="button">
                  <ArrowLeft size={17} /> Anterior
                </button>
              ) : <span />}
              {stage < ADVANCED_CYCLE.length - 1 ? (
                <button className={styles.nextButton} onClick={completeAndContinue} type="button">
                  Marcar y continuar <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  className={styles.nextButton}
                  disabled={returnChoice === null}
                  onClick={() => setCompleted((current) => current.includes(stage) ? current : [...current, stage].sort())}
                  type="button"
                >
                  <Check size={17} /> Completar ciclo
                </button>
              )}
            </footer>
          </section>
        </div>
      </div>
    </main>
  )
}
