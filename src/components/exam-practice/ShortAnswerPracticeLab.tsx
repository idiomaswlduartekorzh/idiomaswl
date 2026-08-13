'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, FileCheck2, Lightbulb, LockKeyhole, RotateCcw, ScanSearch, XCircle } from 'lucide-react';
import styles from './MatchingHeadingsPracticeLab.module.css';
import {
  SHORT_ANSWER_LEVELS,
  SHORT_ANSWER_PASSAGES,
  SHORT_ANSWER_STORAGE_KEY,
  countShortAnswerWords,
  isShortAnswerCorrect,
  type ShortAnswerDecision,
  type ShortAnswerErrorCode,
  type ShortAnswerTrainingPassage,
} from '@/data/practica-exams/ielts-reading-short-answer-progress';

type Answers = Record<string, string>;
type LevelRecord = { bestScore: number; attempts: number; mastered: boolean };
type Progress = {
  version: 1;
  unlockedLevel: number;
  levels: Record<string, LevelRecord>;
  errors: Partial<Record<ShortAnswerErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, Answers>;
};

const EMPTY_PROGRESS: Progress = { version: 1, unlockedLevel: 0, levels: {}, errors: {}, reviewQueue: [], drafts: {} };
const ERROR_LABELS: Record<ShortAnswerErrorCode, string> = {
  'wrong-target': 'Answered a different who, what, where, when or quantity target',
  'wrong-evidence-zone': 'Scanned the wrong paragraph or broke question order',
  'nearby-detail': 'Selected a nearby true detail that answers another question',
  'copied-context': 'Copied extra context instead of the smallest exact span',
  'over-limit': 'Exceeded the displayed word limit',
  'outside-knowledge': 'Used plausible knowledge instead of words from the passage',
};

function readProgress(): Progress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SHORT_ANSWER_STORAGE_KEY) ?? 'null') as Partial<Progress> | null;
    if (!parsed || parsed.version !== 1) return EMPTY_PROGRESS;
    return {
      version: 1,
      unlockedLevel: Math.max(0, Math.min(SHORT_ANSWER_LEVELS.length - 1, parsed.unlockedLevel ?? 0)),
      levels: parsed.levels ?? {},
      errors: parsed.errors ?? {},
      reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [],
      drafts: parsed.drafts ?? {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeProgress(progress: Progress) {
  window.localStorage.setItem(SHORT_ANSWER_STORAGE_KEY, JSON.stringify(progress));
}

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function Passage({ passage }: { passage: ShortAnswerTrainingPassage }) {
  return <article className={styles.passagePanel} lang="en">
    <span className={styles.panelLabel}>Reading passage</span>
    <h3>{passage.title}</h3>
    {passage.passage.split(/\n\s*\n/u).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
  </article>;
}

function QuestionField({ decision, value, disabled, onChange }: { decision: ShortAnswerDecision; value: string; disabled?: boolean; onChange: (value: string) => void }) {
  const inputId = `short-answer-${decision.id}`;
  const count = countShortAnswerWords(value);
  const over = count > decision.maxWords;
  return <label className={styles.selectLabel} htmlFor={inputId}>
    <span>{decision.question}</span>
    <span className={styles.questionMeta}><small>Target: {decision.target}</small><small className={over ? styles.overLimit : undefined}>{count}/{decision.maxWords} words</small></span>
    <input id={inputId} name={decision.id} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} autoComplete="off" spellCheck={false} />
  </label>;
}

function Feedback({ decision, value }: { decision: ShortAnswerDecision; value: string }) {
  const correct = isShortAnswerCorrect(decision, value);
  return <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
    {correct ? <CheckCircle2 aria-hidden="true" /> : <XCircle aria-hidden="true" />}
    <div><strong>{correct ? 'Correct factual detail.' : `Repair this response. Expected: ${decision.answer}.`}</strong><p>{decision.explanation}</p><blockquote>{decision.evidenceQuote}</blockquote>{!correct && <small>{decision.trap}</small>}</div>
  </div>;
}

function SourceBoundary({ passage }: { passage: ShortAnswerTrainingPassage }) {
  return <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl} target="_blank" rel="noreferrer">Review the candidate source.</a></p>;
}

export function ShortAnswerGuidedPractice({ passage }: { passage: ShortAnswerTrainingPassage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const active = passage.decisions[activeIndex];
  const value = answers[active.id] ?? '';
  const isChecked = Boolean(checked[active.id]);
  const correct = isChecked && isShortAnswerCorrect(active, value);

  function select(index: number) { setActiveIndex(index); setShowHint(false); }
  function reset() { setActiveIndex(0); setAnswers({}); setChecked({}); setShowHint(false); }

  return <section className={styles.lab} data-active-practice="true" aria-label="Guided Short Answer practice">
    <div className={styles.labTopline}><div><span className={styles.modeTag}>Guided example · repair enabled</span><h3>Predict the answer shape before scanning</h3><p>Use the question word to name the target, scan in order, then copy the smallest exact span.</p></div><button type="button" className={styles.textButton} onClick={reset}><RotateCcw aria-hidden="true" />Reset example</button></div>
    <nav className={styles.levelRail} aria-label="Guided Short Answer questions">{passage.decisions.map((decision, index) => <button type="button" key={decision.id} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => select(index)}><span>{index + 1}</span><strong>{decision.target}</strong><small>{checked[decision.id] ? isShortAnswerCorrect(decision, answers[decision.id] ?? '') ? 'correct' : 'repair' : index === activeIndex ? 'active' : 'open'}</small></button>)}</nav>
    <div className={styles.guidedLayout}><Passage passage={passage} /><article className={styles.decisionPanel}>
      <div className={styles.labTopline}><div><span className={styles.panelLabel}>Question {activeIndex + 1} of {passage.decisions.length}</span><h3>Find one factual detail</h3><p>{passage.instruction}</p></div><span className={styles.counter}>{active.target}</span></div>
      <article className={styles.workedDecision}><div className={styles.questionMeta}><span>{activeIndex + 1}</span><small>Question order narrows the next evidence zone.</small></div><QuestionField decision={active} value={value} onChange={(next) => { setAnswers((current) => ({ ...current, [active.id]: next })); setChecked((current) => ({ ...current, [active.id]: false })); }} />
        <div className={styles.actions}><button type="button" className="btn btn-ghost" aria-expanded={showHint} onClick={() => setShowHint((current) => !current)}><Lightbulb aria-hidden="true" />{showHint ? 'Hide hint' : 'Show hint'}</button><button type="button" className="btn btn-primary" disabled={!value.trim()} onClick={() => setChecked((current) => ({ ...current, [active.id]: true }))}>Check answer</button></div>
        {showHint && <p className={styles.methodPrompt}>{active.hint}</p>}{isChecked && <Feedback decision={active} value={value} />}{correct && activeIndex < passage.decisions.length - 1 && <button type="button" className="btn btn-primary" onClick={() => select(activeIndex + 1)}>Open question {activeIndex + 2}</button>}
      </article>
    </article></div><SourceBoundary passage={passage} />
  </section>;
}

function FullSet({ passage, answers, submitted, onChange }: { passage: ShortAnswerTrainingPassage; answers: Answers; submitted: boolean; onChange: (id: string, value: string) => void }) {
  return <div className={styles.independentLayout}><Passage passage={passage} /><div className={styles.independentGrid}>{passage.decisions.map((decision, index) => <article className={styles.independentCard} key={decision.id}><div className={styles.questionMeta}><span>{index + 1}</span><small>{decision.target}</small></div><QuestionField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => onChange(decision.id, value)} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div></div>;
}

export function ShortAnswerIndependentPractice({ passage }: { passage: ShortAnswerTrainingPassage }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('Feedback stays closed until all six answers are complete.');
  const score = passage.decisions.filter((decision) => isShortAnswerCorrect(decision, answers[decision.id] ?? '')).length;

  function submit() {
    const missing = passage.decisions.find((decision) => !answers[decision.id]?.trim());
    if (missing) {
      setMessage(`Complete question ${passage.decisions.indexOf(missing) + 1} before submitting the full set.`);
      document.getElementById(`short-answer-${missing.id}`)?.focus();
      return;
    }
    setSubmitted(true);
  }

  return <section className={styles.lab} data-active-practice="true" aria-label="Independent Short Answer practice">
    <div className={styles.labTopline}><div><span className={styles.modeTag}>Independent transfer · no hints</span><h3>{passage.title}</h3><p>Complete every ordered question before any key or explanation opens.</p></div><span className={styles.counter}>{passage.decisions.length} questions</span></div>
    <FullSet passage={passage} answers={answers} submitted={submitted} onChange={(id, value) => { setAnswers((current) => ({ ...current, [id]: value })); setMessage('Feedback stays closed until all six answers are complete.'); }} />
    <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{passage.decisions.length} correct</strong><span>{score === passage.decisions.length ? 'Every response targets the exact ordered detail.' : 'Repair only the responses with the wrong target, zone or span.'}</span></> : <><strong>One complete submission</strong><span>{message}</span></>}</div><div className={styles.actions}>{submitted && score < passage.decisions.length && <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>Repair this set</button>}{!submitted && <button type="button" className="btn btn-primary" onClick={submit}>Submit all answers</button>}</div></div>
    <SourceBoundary passage={passage} /><p className={styles.securityNote}>Independent feedback is delayed, but answer keys still reach this browser. This is guided Learn practice, not a secure Exam or proctored mode.</p>
  </section>;
}

export function ShortAnswerProgressEngine() {
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);
  const [submissionPrompt, setSubmissionPrompt] = useState('');
  const level = SHORT_ANSWER_LEVELS[levelIndex];
  const questions = useMemo(() => level.passageIds.flatMap((passageId) => {
    const passage = SHORT_ANSWER_PASSAGES.find((item) => item.id === passageId);
    if (!passage) return [];
    const decisions = level.decisionIds ? passage.decisions.filter((decision) => level.decisionIds!.includes(decision.id)) : passage.decisions;
    return decisions.map((decision) => ({ passage, decision }));
  }), [level]);
  const answered = questions.filter(({ decision }) => answers[decision.id]?.trim()).length;
  const score = questions.filter(({ decision }) => isShortAnswerCorrect(decision, answers[decision.id] ?? '')).length;
  const mastered = submitted && score >= level.masteryScore;

  useEffect(() => {
    const task = window.setTimeout(() => {
      const saved = readProgress();
      const savedLevel = Math.min(saved.unlockedLevel, SHORT_ANSWER_LEVELS.length - 1);
      setProgress(saved);
      setLevelIndex(savedLevel);
      setAnswers(saved.drafts[SHORT_ANSWER_LEVELS[savedLevel].id] ?? {});
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  function openLevel(index: number) {
    setLevelIndex(index);
    setAnswers(progress.drafts[SHORT_ANSWER_LEVELS[index].id] ?? {});
    setSubmitted(false);
    setElapsed(0);
    setSubmissionPrompt('');
  }

  useEffect(() => {
    if (!hydrated || submitted) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [hydrated, submitted, levelIndex]);

  function persistDraft(nextAnswers: Answers) {
    setAnswers(nextAnswers);
    setProgress((current) => {
      const next = { ...current, drafts: { ...current.drafts, [level.id]: nextAnswers } };
      writeProgress(next);
      return next;
    });
  }

  function submit() {
    if (answered < questions.length) {
      setSubmissionPrompt(`Complete ${questions.length - answered} more ${questions.length - answered === 1 ? 'answer' : 'answers'} before submitting.`);
      const missing = questions.find(({ decision }) => !answers[decision.id]?.trim());
      if (missing) document.getElementById(`short-answer-${missing.decision.id}`)?.focus();
      return;
    }
    setSubmitted(true);
    setSubmissionPrompt('');
    setProgress((current) => {
      const previous = current.levels[level.id] ?? { bestScore: 0, attempts: 0, mastered: false };
      const failed = questions.filter(({ decision }) => !isShortAnswerCorrect(decision, answers[decision.id] ?? ''));
      const errors = { ...current.errors };
      for (const { decision } of failed) errors[decision.errorCode] = (errors[decision.errorCode] ?? 0) + 1;
      const nextUnlocked = score >= level.masteryScore ? Math.max(current.unlockedLevel, Math.min(levelIndex + 1, SHORT_ANSWER_LEVELS.length - 1)) : current.unlockedLevel;
      const next: Progress = {
        ...current,
        unlockedLevel: nextUnlocked,
        levels: { ...current.levels, [level.id]: { bestScore: Math.max(previous.bestScore, score), attempts: previous.attempts + 1, mastered: previous.mastered || score >= level.masteryScore } },
        errors,
        reviewQueue: [...new Set([...current.reviewQueue, ...failed.map(({ decision }) => decision.id)])],
        drafts: { ...current.drafts, [level.id]: answers },
      };
      writeProgress(next);
      return next;
    });
  }

  function clearCurrent() {
    setConfirmReset(false);
    persistDraft({});
    setSubmitted(false);
    setElapsed(0);
  }

  function clearAll() {
    setConfirmAllReset(false);
    setProgress(EMPTY_PROGRESS);
    setLevelIndex(0);
    setAnswers({});
    setSubmitted(false);
    setElapsed(0);
    writeProgress(EMPTY_PROGRESS);
  }

  if (!hydrated) return <section className={styles.engine} aria-label="Loading Short Answer Progress Engine"><p>Loading saved practice…</p></section>;

  const passages = [...new Map(questions.map(({ passage }) => [passage.id, passage])).values()];
  return <section className={styles.engine} data-active-practice="true" aria-label="Short Answer Progress Engine">
    <div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h3>Short Answer control room</h3><p>Six levels move from target prediction to complete ordered passage sets.</p></div><div className={styles.engineScore}><span><Clock3 aria-hidden="true" />{formatTime(elapsed)}</span><strong>{answered}/{questions.length} answered</strong></div></div>
    <div className={styles.dashboard}><div><small>Unlocked</small><strong>{progress.unlockedLevel + 1}/{SHORT_ANSWER_LEVELS.length}</strong></div><div><small>Best here</small><strong>{progress.levels[level.id]?.bestScore ?? 0}/{questions.length}</strong></div><div><small>Review queue</small><strong>{progress.reviewQueue.length}</strong></div><div><small>Saved locally</small><strong>{Object.keys(progress.drafts).length} levels</strong></div></div>
    <nav className={styles.levelRail} aria-label="Short Answer levels">{SHORT_ANSWER_LEVELS.map((item, index) => { const locked = index > progress.unlockedLevel; return <button type="button" key={item.id} disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} onClick={() => openLevel(index)}><span>{locked ? <LockKeyhole aria-hidden="true" /> : index + 1}</span><strong>{item.title}</strong><small>{progress.levels[item.id]?.mastered ? 'mastered' : locked ? 'locked' : index === levelIndex ? 'active' : 'open'}</small></button>; })}</nav>
    <div className={styles.levelHeader}><div><span className={styles.panelLabel}>Level {levelIndex + 1}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div className={styles.levelTarget}><small>Mastery target</small><strong>{level.masteryScore}/{questions.length}</strong><span>{level.focus}</span></div></div>
    <div className={styles.mixedPassages}>{passages.map((passage) => { const passageQuestions = questions.filter((item) => item.passage.id === passage.id); return <article className={styles.mixedPassage} key={passage.id}><Passage passage={passage} /><div className={styles.mixedFlow}>{passageQuestions.map(({ decision }, index) => <article className={styles.independentCard} key={decision.id}><div className={styles.questionMeta}><span>{index + 1}</span><small>{decision.target}</small></div><QuestionField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => persistDraft({ ...answers, [decision.id]: value })} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div><SourceBoundary passage={passage} /></article>; })}</div>
    <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} correct</strong><span>{mastered ? 'Level mastered. The next level is now open.' : 'Repair the target type, evidence zone or copied span, then retry.'}</span></> : <><strong>Drafts save in this browser</strong><span>{submissionPrompt || 'Keys and explanations remain closed until one complete submission.'}</span></>}</div><div className={styles.actions}>{submitted && score < questions.length && <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>Repair this level</button>}{!submitted && <button type="button" className="btn btn-primary" onClick={submit}><FileCheck2 aria-hidden="true" />Submit level</button>}<button type="button" className="btn btn-ghost" onClick={() => setConfirmReset(true)}><RotateCcw aria-hidden="true" />Reset level</button></div></div>
    <aside className={styles.errorLedger}><div><ScanSearch aria-hidden="true" /><div><span className={styles.panelLabel}>Diagnostic ledger</span><h3>What is costing you marks?</h3></div></div><ul>{Object.entries(ERROR_LABELS).map(([code, label]) => <li key={code}><span>{label}</span><strong>{progress.errors[code as ShortAnswerErrorCode] ?? 0}</strong></li>)}</ul><button type="button" className={styles.textButton} onClick={() => setConfirmAllReset(true)}>Reset all Short Answer progress</button></aside>
    {(confirmReset || confirmAllReset) && <div className={styles.confirmBar} role="alertdialog" aria-modal="true" aria-label={confirmAllReset ? 'Confirm all progress reset' : 'Confirm level reset'}><p>{confirmAllReset ? 'Delete every saved Short Answer level, error count and draft on this browser?' : `Clear every draft answer in ${level.title}?`}</p><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={() => { setConfirmReset(false); setConfirmAllReset(false); }}>Cancel</button><button type="button" className="btn btn-primary" onClick={confirmAllReset ? clearAll : clearCurrent}>Confirm reset</button></div></div>}
    <p className={styles.securityNote}><LockKeyhole aria-hidden="true" />This engine stores progress locally and exposes answer data to the browser. It is a guided Learn system, not secure Practice, Exam or proctored delivery.</p>
  </section>;
}
