'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  ChevronDown,
  CircleDot,
  FileQuestion,
  Headphones,
  MessageCircleMore,
  Mic,
  NotebookPen,
  RotateCcw,
  ScanText,
  Sparkles,
} from 'lucide-react'
import type {
  GuidedAdvancedLesson,
  GuidedChoiceQuestion,
} from '@/data/practica/advanced-guided-topics'
import { GUIDED_ADVANCED_PHASES } from '@/data/practica/advanced-guided-topics'
import LocalVoiceRecorder from './LocalVoiceRecorder'
import styles from './GuidedAdvancedLesson.module.css'

interface GuidedSavedState {
  phase: number
  completed: number[]
  selectedStatements: string[]
  discussionIndex: number
  openedBlocks: string[]
  predictions: Record<string, string>
  paraphrases: Record<string, string>
  notes: Record<string, string>
  ieltsAnswers: Record<string, number>
  ieltsSubmitted: boolean
  listeningAnswers: Record<string, number>
  listeningSubmitted: boolean
  draft: string
  checks: boolean[]
}

const PHASE_ICONS = [
  CircleDot,
  MessageCircleMore,
  ScanText,
  BookOpenText,
  NotebookPen,
  Headphones,
  FileQuestion,
  Sparkles,
]

const NOTE_BUCKETS = [
  ['mainIdea', 'Main idea'],
  ['evidence', 'Evidence'],
  ['language', 'Language'],
  ['questions', 'Questions'],
] as const

const ROLE_LABELS = {
  definition: 'Definition',
  evidence: 'Evidence',
  example: 'Example',
  counterargument: 'Counterargument',
  application: 'Application',
  'scope-limit': 'Scope limit',
} as const

const VOCABULARY_CATEGORIES = ['Phrasal verbs', 'Useful language', 'Adjectives', 'Nouns'] as const

function GuidedQuestion({
  question,
  selected,
  submitted,
  onSelect,
}: {
  question: GuidedChoiceQuestion
  selected: number | undefined
  submitted: boolean
  onSelect: (option: number) => void
}) {
  const answered = selected !== undefined
  const correct = selected === question.answer

  return (
    <fieldset className={styles.question}>
      <legend>
        <span>{question.family}</span>
        {question.prompt}
      </legend>
      <div className={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selected === index
          const isCorrect = submitted && index === question.answer
          const isWrong = submitted && isSelected && !isCorrect
          return (
            <button
              className={`${styles.option} ${isSelected ? styles.optionSelected : ''} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.wrong : ''}`}
              disabled={submitted}
              key={option.text}
              onClick={() => onSelect(index)}
              type="button"
              aria-pressed={isSelected}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option.text}</strong>
              {isCorrect && <Check size={17} aria-label="Correct answer" />}
            </button>
          )
        })}
      </div>
      {submitted && answered && (
        <div className={correct ? styles.feedbackCorrect : styles.feedbackWrong} role="status">
          <strong>{correct ? 'Evidence matched.' : 'Inspect the reasoning.'}</strong>
          <p>{question.options[selected].feedback}</p>
          {!correct && <p><b>Best-supported answer:</b> {question.options[question.answer].text}</p>}
          <small>Evidence: {question.evidence}</small>
        </div>
      )}
    </fieldset>
  )
}

export default function GuidedAdvancedLessonClient({ lesson }: { lesson: GuidedAdvancedLesson }) {
  const storageKey = `wl-advanced-guided-${lesson.slug}-v4`
  const [phase, setPhase] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [selectedStatements, setSelectedStatements] = useState<string[]>([])
  const [discussionIndex, setDiscussionIndex] = useState(0)
  const [showTeacherNotes, setShowTeacherNotes] = useState(false)
  const [openedBlocks, setOpenedBlocks] = useState<string[]>([lesson.reading.blocks[0]?.id].filter(Boolean))
  const [predictions, setPredictions] = useState<Record<string, string>>({})
  const [paraphrases, setParaphrases] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [revealedWords, setRevealedWords] = useState<string[]>([])
  const [ieltsAnswers, setIeltsAnswers] = useState<Record<string, number>>({})
  const [ieltsSubmitted, setIeltsSubmitted] = useState(false)
  const [openTranscripts, setOpenTranscripts] = useState<string[]>([])
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, number>>({})
  const [listeningSubmitted, setListeningSubmitted] = useState(false)
  const [draft, setDraft] = useState('')
  const [checks, setChecks] = useState<boolean[]>(lesson.synthesis.checklist.map(() => false))
  const [hydrated, setHydrated] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw) {
        const saved = JSON.parse(raw) as Partial<GuidedSavedState>
        // Hydration is the one point where the external local draft becomes React state.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPhase(Math.min(Math.max(saved.phase ?? 0, 0), GUIDED_ADVANCED_PHASES.length - 1))
        setCompleted(saved.completed ?? [])
        setSelectedStatements(saved.selectedStatements ?? [])
        setDiscussionIndex(Math.min(saved.discussionIndex ?? 0, lesson.discussion.questions.length - 1))
        setOpenedBlocks(saved.openedBlocks?.length ? saved.openedBlocks : [lesson.reading.blocks[0]?.id].filter(Boolean))
        setPredictions(saved.predictions ?? {})
        setParaphrases(saved.paraphrases ?? {})
        setNotes(saved.notes ?? {})
        setIeltsAnswers(saved.ieltsAnswers ?? {})
        setIeltsSubmitted(saved.ieltsSubmitted ?? false)
        setListeningAnswers(saved.listeningAnswers ?? {})
        setListeningSubmitted(saved.listeningSubmitted ?? false)
        setDraft(saved.draft ?? '')
        if (saved.checks?.length === lesson.synthesis.checklist.length) setChecks(saved.checks)
      }
    } catch {
      // A damaged local draft should not block the guided lesson.
    }
    setHydrated(true)
  }, [lesson.discussion.questions.length, lesson.reading.blocks, lesson.synthesis.checklist.length, storageKey])

  useEffect(() => {
    if (!hydrated) return
    const saved: GuidedSavedState = {
      phase,
      completed,
      selectedStatements,
      discussionIndex,
      openedBlocks,
      predictions,
      paraphrases,
      notes,
      ieltsAnswers,
      ieltsSubmitted,
      listeningAnswers,
      listeningSubmitted,
      draft,
      checks,
    }
    window.localStorage.setItem(storageKey, JSON.stringify(saved))
  }, [checks, completed, discussionIndex, draft, hydrated, ieltsAnswers, ieltsSubmitted, listeningAnswers, listeningSubmitted, notes, openedBlocks, paraphrases, phase, predictions, selectedStatements, storageKey])

  const progress = Math.round((completed.length / GUIDED_ADVANCED_PHASES.length) * 100)
  const discussionQuestion = lesson.discussion.questions[discussionIndex]
  const allIeltsAnswered = lesson.ieltsPractice.questions.every((question) => ieltsAnswers[question.id] !== undefined)
  const ieltsScore = useMemo(
    () => lesson.ieltsPractice.questions.filter((question) => ieltsAnswers[question.id] === question.answer).length,
    [ieltsAnswers, lesson.ieltsPractice.questions],
  )
  const listeningQuestions = useMemo(
    () => lesson.listeningLab.tracks?.flatMap((track) => track.questions) ?? [],
    [lesson.listeningLab.tracks],
  )
  const allListeningAnswered = listeningQuestions.length > 0 && listeningQuestions.every((question) => listeningAnswers[question.id] !== undefined)
  const listeningScore = useMemo(
    () => listeningQuestions.filter((question) => listeningAnswers[question.id] === question.answer).length,
    [listeningAnswers, listeningQuestions],
  )
  const selectPhase = (nextPhase: number) => {
    setPhase(nextPhase)
    window.requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const completeAndContinue = () => {
    setCompleted((current) => current.includes(phase) ? current : [...current, phase].sort())
    if (phase < GUIDED_ADVANCED_PHASES.length - 1) selectPhase(phase + 1)
  }

  const resetLesson = () => {
    window.localStorage.removeItem(storageKey)
    setPhase(0)
    setCompleted([])
    setSelectedStatements([])
    setDiscussionIndex(0)
    setShowTeacherNotes(false)
    setOpenedBlocks([lesson.reading.blocks[0]?.id].filter(Boolean))
    setPredictions({})
    setParaphrases({})
    setNotes({})
    setRevealedWords([])
    setIeltsAnswers({})
    setIeltsSubmitted(false)
    setOpenTranscripts([])
    setListeningAnswers({})
    setListeningSubmitted(false)
    setDraft('')
    setChecks(lesson.synthesis.checklist.map(() => false))
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
            <p className="wlp-eyebrow">Guided pilot · {lesson.evidenceClass} · {lesson.level}</p>
            <h1>{lesson.title}</h1>
            <p className={styles.subtitle}>{lesson.subtitle}</p>
            <p className={styles.objective}>{lesson.objective}</p>
            <div className={styles.centralQuestion}>
              <CircleDot size={18} aria-hidden="true" />
              <span>{lesson.centralQuestion}</span>
            </div>
          </div>
          <aside className={styles.sessionCard} aria-label="Session status">
            <div className={styles.sessionTop}>
              <span>Guided class</span>
              <strong>{lesson.guidedMinutes} min</strong>
            </div>
            <div className={styles.progressTrack} role="progressbar" aria-label={`${progress}% complete`} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <p>{completed.length} of {GUIDED_ADVANCED_PHASES.length} phases · saved on this device</p>
            <div className={styles.sessionStatus}>
              <Mic size={15} />
              Every phase is open · recordings stay local
            </div>
            <button className={styles.reset} onClick={resetLesson} type="button">
              <RotateCcw size={14} /> Reset local work
            </button>
          </aside>
        </header>

        <nav className={styles.phaseNav} aria-label="Lesson phases">
          {GUIDED_ADVANCED_PHASES.map((item, index) => {
            const Icon = PHASE_ICONS[index]
            return (
              <button
                className={phase === index ? styles.phaseActive : ''}
                key={item.id}
                onClick={() => selectPhase(index)}
                type="button"
                aria-current={phase === index ? 'step' : undefined}
              >
                <span>{completed.includes(index) ? <Check size={15} /> : <Icon size={15} />}</span>
                <small>{String(index + 1).padStart(2, '0')} · {item.minutes} min</small>
                <strong>{item.shortLabel}</strong>
              </button>
            )
          })}
        </nav>

        <div className={styles.workspace} ref={contentRef}>
          <aside className={styles.phaseRail}>
            <span>{String(phase + 1).padStart(2, '0')}</span>
            <div aria-hidden="true" />
            <p>{GUIDED_ADVANCED_PHASES[phase].label}</p>
          </aside>

          <section className={styles.phaseContent} key={phase}>
            {phase === 0 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>Starting claims · optional selection</p>
                  <h2>Which statements sound most logical right now?</h2>
                  <span>Select any claims you want to defend, question or revisit. This records a starting position; it never blocks the lesson.</span>
                </div>

                {lesson.openingStatements && (
                  <section className={styles.statementLab} aria-labelledby="opening-statements-title">
                    <div className={styles.statementIntro}>
                      <div>
                        <p>Starting position · choose any number</p>
                        <h3 id="opening-statements-title">{lesson.openingStatements.title}</h3>
                        <span>{lesson.openingStatements.instruction}</span>
                      </div>
                      <strong>{selectedStatements.length}/{lesson.openingStatements.statements.length} selected</strong>
                    </div>
                    <div className={styles.statementGrid}>
                      {lesson.openingStatements.statements.map((statement) => {
                        const selected = selectedStatements.includes(statement.id)
                        return (
                          <button
                            className={selected ? styles.statementSelected : ''}
                            key={statement.id}
                            onClick={() => setSelectedStatements((current) => current.includes(statement.id)
                              ? current.filter((id) => id !== statement.id)
                              : [...current, statement.id])}
                            type="button"
                            aria-pressed={selected}
                          >
                            <span>{selected ? <Check size={16} /> : <CircleDot size={16} />}</span>
                            {statement.text}
                          </button>
                        )
                      })}
                    </div>
                    <p className={styles.statementRequirement}>Optional: continue with none selected, or return later and change your choices.</p>
                  </section>
                )}
                {!lesson.openingStatements && (
                  <section className={styles.statementFallback}>
                    <CircleDot size={22} />
                    <div><strong>No answer is required here.</strong><p>Continue to the discussion when you are ready to form a first explanation.</p></div>
                  </section>
                )}
              </>
            )}

            {phase === 1 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>Teacher-led discussion · {lesson.discussion.targetMinutes} minutes</p>
                  <h2>Build an explanation, then record it.</h2>
                  <span>Discuss the questions first. Once the group has a workable idea, record the initial explanation below. The recorder is always available.</span>
                </div>
                <div className={styles.discussionBoard}>
                  <div className={styles.discussionCounter}>
                    <span>{String(discussionIndex + 1).padStart(2, '0')}</span>
                    <small>of {lesson.discussion.questions.length} · {discussionQuestion.kind}</small>
                  </div>
                  <blockquote>{discussionQuestion.prompt}</blockquote>
                  <button className={styles.teacherNoteToggle} onClick={() => setShowTeacherNotes((value) => !value)} type="button" aria-expanded={showTeacherNotes}>
                    <NotebookPen size={16} /> {showTeacherNotes ? 'Hide teacher notes' : 'Show teacher notes'}
                  </button>
                  {showTeacherNotes && (
                    <div className={styles.teacherNotes}>
                      <strong>Teaching intention</strong>
                      <p>{discussionQuestion.teacherIntent}</p>
                      <strong>Follow-up</strong>
                      <ul>{discussionQuestion.followUps.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  )}
                  <div className={styles.discussionActions}>
                    <button disabled={discussionIndex === 0} onClick={() => setDiscussionIndex((value) => Math.max(0, value - 1))} type="button">
                      <ArrowLeft size={16} /> Previous question
                    </button>
                    <button disabled={discussionIndex === lesson.discussion.questions.length - 1} onClick={() => setDiscussionIndex((value) => Math.min(lesson.discussion.questions.length - 1, value + 1))} type="button">
                      Next question <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                <div className={styles.recorderLead}>
                  <span>Voice I · diagnostic, not graded</span>
                  <strong>Capture the explanation before the formal input.</strong>
                  <p>Pronunciation is not scored. The value of this recording is the comparison it makes possible later.</p>
                </div>
                <LocalVoiceRecorder prompt={lesson.recordings.baseline} />
              </>
            )}

            {phase === 3 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>Active reading · six evidence roles</p>
                  <h2>{lesson.reading.title}</h2>
                  <span>{lesson.reading.dek}</span>
                </div>
                <div className={styles.readingLayout}>
                  <article className={styles.reading} lang="en">
                    {lesson.reading.blocks.map((block, index) => {
                      const isOpen = openedBlocks.includes(block.id)
                      return (
                        <section className={isOpen ? styles.readingBlockOpen : ''} key={block.id}>
                          <button
                            className={styles.readingBlockHeader}
                            onClick={() => setOpenedBlocks((current) => current.includes(block.id) ? current.filter((id) => id !== block.id) : [...current, block.id])}
                            type="button"
                            aria-expanded={isOpen}
                          >
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <div><small>{ROLE_LABELS[block.role]}</small><strong>{block.heading}</strong></div>
                            <ChevronDown size={19} aria-hidden="true" />
                          </button>
                          {isOpen && (
                            <div className={styles.readingBlockBody}>
                              {block.prediction && (
                                <label className={styles.prediction}>
                                  <span>Predict before reading</span>
                                  {block.prediction}
                                  <textarea value={predictions[block.id] ?? ''} onChange={(event) => setPredictions((current) => ({ ...current, [block.id]: event.target.value }))} placeholder="Write one tentative sentence…" />
                                </label>
                              )}
                              {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                              <div className={styles.glossaryRow} aria-label="Terms used in this section">
                                {block.glossaryTerms.map((term) => <span key={term}>{term}</span>)}
                              </div>
                              {block.pausePrompt && <blockquote className={styles.pausePrompt}><span>Teacher pause</span>{block.pausePrompt}</blockquote>}
                              <label className={styles.paraphrase}>
                                <span>Close the section in one sentence</span>
                                <textarea value={paraphrases[block.id] ?? ''} onChange={(event) => setParaphrases((current) => ({ ...current, [block.id]: event.target.value }))} placeholder="The central move in this section is…" />
                              </label>
                            </div>
                          )}
                        </section>
                      )
                    })}
                    <footer>
                      Sources:{' '}
                      {lesson.reading.sources.map((source, index) => (
                        <span key={source.href}>{index > 0 && ' · '}<a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></span>
                      ))}. WeLearn’s text is an original educational synthesis.
                    </footer>
                  </article>

                  <aside className={styles.argumentMap} aria-label="Argument map">
                    <p>Argument trace</p>
                    {lesson.reading.argumentMap.map((item, index) => (
                      <div key={item.label}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{item.label}</strong>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </aside>
                </div>
              </>
            )}

            {phase === 4 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>Retrieval · voice and notes</p>
                  <h2>What did you understand without copying?</h2>
                  <span>Record first. Reopen the reading afterwards to repair your notes, not to replace retrieval.</span>
                </div>
                <LocalVoiceRecorder prompt={lesson.recordings.postReading} />
                <div className={styles.notesGrid}>
                  {NOTE_BUCKETS.map(([id, label]) => (
                    <label key={id}>
                      <span>{label}</span>
                      <textarea value={notes[id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [id]: event.target.value }))} placeholder={`Add ${label.toLowerCase()} notes…`} />
                    </label>
                  ))}
                </div>
              </>
            )}

            {phase === 2 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>Language preview · four practical families</p>
                  <h2>Learn the language that unlocks the text.</h2>
                  <span>Open the cards before reading. The same expressions will return in the text, listening comparison and final response.</span>
                </div>
                <div className={styles.vocabFamilies}>
                  {VOCABULARY_CATEGORIES.map((category) => {
                    const items = lesson.vocabulary.filter((item) => item.category === category)
                    if (!items.length) return null
                    return (
                      <section className={styles.vocabFamily} key={category}>
                        <div className={styles.vocabFamilyHeading}><span>{String(items.length).padStart(2, '0')}</span><h3>{category}</h3></div>
                        <div className={styles.vocabGrid}>
                          {items.map((item) => {
                            const isOpen = revealedWords.includes(item.term)
                            return (
                              <button
                                className={isOpen ? styles.vocabOpen : ''}
                                key={item.term}
                                onClick={() => setRevealedWords((current) => current.includes(item.term) ? current.filter((term) => term !== item.term) : [...current, item.term])}
                                type="button"
                                aria-expanded={isOpen}
                              >
                                <span>{item.partOfSpeech}</span>
                                <strong>{item.term}</strong>
                                {isOpen ? <div><p>{item.meaning}</p><b>{item.collocation}</b><em>{item.example}</em></div> : <small>Meaning · collocation · example</small>}
                              </button>
                            )
                          })}
                        </div>
                      </section>
                    )
                  })}
                </div>
              </>
            )}

            {phase === 6 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>IELTS-style challenge · feedback closed</p>
                  <h2>{lesson.ieltsPractice.title}</h2>
                  <span>{lesson.ieltsPractice.instruction}</span>
                </div>
                <div className={styles.assessmentStatus}>
                  <strong>{Object.keys(ieltsAnswers).length}/{lesson.ieltsPractice.questions.length}</strong>
                  <span>{ieltsSubmitted ? `${ieltsScore} evidence matches` : 'answered before submission'}</span>
                </div>
                <div className={styles.questionStack}>
                  {lesson.ieltsPractice.questions.map((question) => (
                    <GuidedQuestion
                      key={question.id}
                      question={question}
                      selected={ieltsAnswers[question.id]}
                      submitted={ieltsSubmitted}
                      onSelect={(option) => setIeltsAnswers((current) => ({ ...current, [question.id]: option }))}
                    />
                  ))}
                </div>
                <div className={styles.submitBar}>
                  <p>{ieltsSubmitted ? 'Feedback identifies the evidence and the reasoning error; this is not an IELTS band.' : 'Feedback stays closed until every answer is complete.'}</p>
                  {ieltsSubmitted ? (
                    <button onClick={() => { setIeltsAnswers({}); setIeltsSubmitted(false) }} type="button"><RotateCcw size={16} /> Try a clean set</button>
                  ) : (
                    <button disabled={!allIeltsAnswered} onClick={() => setIeltsSubmitted(true)} type="button">Open evidence feedback</button>
                  )}
                </div>
              </>
            )}

            {phase === 5 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>Dual listening lab · compare before judging</p>
                  <h2>{lesson.listeningLab.relationship === 'contrast + application'
                    ? 'Two voices, one disagreement worth locating precisely.'
                    : 'Two voices, one pattern viewed from different stages.'}</h2>
                  <span>{lesson.listeningLab.relationship === 'contrast + application'
                    ? 'Listen once for position, again for evidence, and only then open the transcript. The speakers disagree in emphasis without becoming caricatures.'
                    : 'Listen once for each source’s function, again for the connection, and only then open the transcript. The second source extends the first instead of repeating it.'}</span>
                </div>
                {lesson.listeningLab.status === 'produced' && lesson.listeningLab.tracks?.length ? (
                  <>
                    <div className={styles.audioTrackStack}>
                      {lesson.listeningLab.tracks.map((track) => {
                        const transcriptOpen = openTranscripts.includes(track.id)
                        return (
                          <article className={styles.audioTrack} key={track.id}>
                            <header>
                              <div className={styles.audioTrackIcon}><Headphones size={22} /></div>
                              <div>
                                <span>{track.eyebrow}</span>
                                <h3>{track.title}</h3>
                                <p>{track.speaker} · {track.duration}</p>
                              </div>
                            </header>
                            <p className={styles.audioFunction}>{track.function}</p>
                            <audio controls preload="metadata" src={track.audioSrc}>Your browser cannot play this audio.</audio>
                            <button
                              className={styles.transcriptButton}
                              onClick={() => setOpenTranscripts((current) => current.includes(track.id) ? current.filter((id) => id !== track.id) : [...current, track.id])}
                              type="button"
                              aria-expanded={transcriptOpen}
                            >
                              {transcriptOpen ? 'Hide transcript' : 'Open transcript after listening'}
                              <ChevronDown size={16} />
                            </button>
                            {transcriptOpen && <div className={styles.audioTranscript}>{track.transcript.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
                            <div className={styles.audioQuestions}>
                              {track.questions.map((question) => (
                                <GuidedQuestion
                                  key={question.id}
                                  question={question}
                                  selected={listeningAnswers[question.id]}
                                  submitted={listeningSubmitted}
                                  onSelect={(option) => setListeningAnswers((current) => ({ ...current, [question.id]: option }))}
                                />
                              ))}
                            </div>
                          </article>
                        )
                      })}
                    </div>
                    <div className={styles.submitBar}>
                      <p>{listeningSubmitted ? `${listeningScore}/${listeningQuestions.length} answers matched the evidence. Revisit the speakers’ exact point of disagreement.` : `${Object.keys(listeningAnswers).length}/${listeningQuestions.length} listening questions answered.`}</p>
                      {listeningSubmitted ? (
                        <button onClick={() => { setListeningAnswers({}); setListeningSubmitted(false) }} type="button"><RotateCcw size={16} /> Try both sets again</button>
                      ) : (
                        <button disabled={!allListeningAnswered} onClick={() => setListeningSubmitted(true)} type="button">Open listening evidence</button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.noAudioNotice}>
                      <Headphones size={28} />
                      <div><strong>Audio production is pending for this lesson</strong><p>The reading and practice remain available while the two-source listening pair is prepared.</p></div>
                    </div>
                    <div className={styles.listeningBlueprint}>
                      <article><span>Audio A · mechanism</span><h3>Research explanation</h3><p>{lesson.listeningLab.audioAFunction}</p></article>
                      <article><span>Audio B · situation</span><h3>Represented decision</h3><p>{lesson.listeningLab.audioBFunction}</p></article>
                    </div>
                  </>
                )}
                <div className={styles.integrationPrompt}><strong>Integration task</strong><p>{lesson.listeningLab.integrationPrompt}</p></div>
              </>
            )}

            {phase === 7 && (
              <>
                <div className={styles.phaseHeading}>
                  <p>Synthesis · return to the first explanation</p>
                  <h2>Precision matters more than changing your mind.</h2>
                  <span>Use the opening claims, reading evidence, practice feedback and both listening functions. Preserve uncertainty where the evidence remains unsettled.</span>
                </div>
                {lesson.openingStatements && selectedStatements.length > 0 && (
                  <section className={styles.statementReturn} aria-labelledby="selected-claims-title">
                    <p>Your recorded starting position</p>
                    <h3 id="selected-claims-title">The claims you selected before the evidence</h3>
                    <ul>
                      {lesson.openingStatements.statements
                        .filter((statement) => selectedStatements.includes(statement.id))
                        .map((statement) => <li key={statement.id}>{statement.text}</li>)}
                    </ul>
                    <button onClick={() => selectPhase(0)} type="button">Review all opening claims</button>
                  </section>
                )}
                <p className={styles.synthesisPrompt}>{lesson.synthesis.prompt}</p>
                <label className={styles.draftLabel}>
                  <span>Your synthesis in English</span>
                  <small>{draft.trim() ? draft.trim().split(/\s+/).length : 0} words</small>
                  <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="A feeling deserves attention, but it does not answer every question…" />
                </label>
                <div className={styles.checklist}>
                  {lesson.synthesis.checklist.map((item, index) => (
                    <label key={item}>
                      <input type="checkbox" checked={checks[index]} onChange={() => setChecks((current) => current.map((value, checkIndex) => checkIndex === index ? !value : value))} />
                      <span><Check size={14} /></span>{item}
                    </label>
                  ))}
                </div>
                <LocalVoiceRecorder prompt={lesson.recordings.final} />
              </>
            )}

            <footer className={styles.phaseFooter}>
              {phase > 0 ? <button className={styles.backButton} onClick={() => selectPhase(phase - 1)} type="button"><ArrowLeft size={17} /> Previous</button> : <span />}
              {phase < GUIDED_ADVANCED_PHASES.length - 1 ? (
                <button className={styles.nextButton} onClick={completeAndContinue} type="button">Mark phase and continue <ArrowRight size={17} /></button>
              ) : (
                <button className={styles.nextButton} onClick={() => setCompleted((current) => current.includes(phase) ? current : [...current, phase].sort())} type="button"><Check size={17} /> Complete pilot</button>
              )}
            </footer>
          </section>
        </div>
      </div>
    </main>
  )
}
