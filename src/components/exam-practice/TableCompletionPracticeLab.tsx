'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, FileCheck2, LockKeyhole, RotateCcw, XCircle } from 'lucide-react';
import styles from './MatchingHeadingsPracticeLab.module.css';
import {
  TABLE_COMPLETION_LEVELS,
  TABLE_COMPLETION_STORAGE_KEY,
  countTableCompletionWords,
  getTableCompletionPassage,
  isTableCompletionCorrect,
  type TableCompletionDecision,
  type TableCompletionErrorCode,
  type TableCompletionTrainingPassage,
} from '@/data/practica-exams/ielts-reading-table-completion-progress';

type AnswerMap = Record<string, string>;
type LevelResult = { attempts: number; bestScore: number; mastered: boolean };
type StoredProgress = {
  version: 1;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelResult>;
  errorCounts: Partial<Record<TableCompletionErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, { answers: AnswerMap; elapsed: number }>;
};

const EMPTY_PROGRESS: StoredProgress = { version: 1, unlockedLevel: 0, activeLevelIndex: 0, levels: {}, errorCounts: {}, reviewQueue: [], drafts: {} };
const ERROR_LABELS: Record<TableCompletionErrorCode, string> = {
  'headers-ignored': 'Used the blank without both headers',
  'wrong-row': 'Selected evidence from the wrong row topic',
  'wrong-column': 'Selected the wrong information category',
  'grammar-mismatch': 'The span does not rebuild the cell naturally',
  'over-limit': 'The response exceeds the displayed limit',
  'copied-context': 'Copied more passage context than the cell needs',
};

function formatTime(seconds: number) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
function readProgress(): StoredProgress {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(TABLE_COMPLETION_STORAGE_KEY) ?? 'null') as Partial<StoredProgress> | null;
    if (!parsed || parsed.version !== 1) return EMPTY_PROGRESS;
    return {
      version: 1,
      unlockedLevel: Math.max(0, Math.min(TABLE_COMPLETION_LEVELS.length - 1, Number(parsed.unlockedLevel) || 0)),
      activeLevelIndex: Math.max(0, Math.min(TABLE_COMPLETION_LEVELS.length - 1, Number(parsed.activeLevelIndex) || 0)),
      levels: parsed.levels && typeof parsed.levels === 'object' ? parsed.levels : {},
      errorCounts: parsed.errorCounts && typeof parsed.errorCounts === 'object' ? parsed.errorCounts : {},
      reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [],
      drafts: parsed.drafts && typeof parsed.drafts === 'object' ? parsed.drafts : {},
    };
  } catch { return EMPTY_PROGRESS; }
}
function writeProgress(progress: StoredProgress) { window.localStorage.setItem(TABLE_COMPLETION_STORAGE_KEY, JSON.stringify(progress)); }

function Passage({ passage }: { passage: TableCompletionTrainingPassage }) {
  return <article className={styles.passagePanel} lang="en"><p className={styles.panelLabel}>Reading passage</p><h3>{passage.title}</h3>{passage.passage.split(/\n\s*\n/u).map((paragraph, index) => <p key={`${passage.id}-${index}`}>{paragraph}</p>)}</article>;
}
function SourceBoundary({ passage }: { passage: TableCompletionTrainingPassage }) {
  return <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote}{' '}<a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the candidate source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>;
}
function CoordinateMap({ passage, active }: { passage: TableCompletionTrainingPassage; active?: TableCompletionDecision }) {
  const rows = Array.from(new Set(passage.decisions.map((decision) => decision.rowHeading)));
  return <nav className={styles.mapRail} aria-label="Table row map">{rows.map((row, index) => <span key={row} className={row === active?.rowHeading ? styles.mapActive : ''}><b>{index + 1}</b><small>{row}</small></span>)}</nav>;
}
function AnswerField({ decision, value, disabled, onChange }: { decision: TableCompletionDecision; value: string; disabled: boolean; onChange: (value: string) => void }) {
  const id = useId(); const count = countTableCompletionWords(value); const over = count > decision.maxWords;
  return <div className={styles.quoteBlock}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}><strong style={{ color: 'var(--mh-accent)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>{decision.instruction}</strong><small aria-live="polite" style={{ color: over ? '#b91c1c' : 'var(--muted)', fontFamily: 'var(--mono)' }}>{count}/{decision.maxWords} words</small></div>
    <p className={styles.panelLabel} style={{ margin: 0 }}>{decision.rowHeading} · {decision.columnHeading}</p>
    <label className={styles.srOnly} htmlFor={id}>Answer for {decision.rowHeading}, {decision.columnHeading}</label>
    <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem', lineHeight: 1.75 }}><span>{decision.before}</span><input id={id} name={decision.id} value={value} disabled={disabled} autoComplete="off" spellCheck={false} onChange={(event) => onChange(event.currentTarget.value)} style={{ minWidth: 190, maxWidth: '100%', minHeight: 46, border: `2px solid ${over ? '#dc2626' : 'var(--line-soft)'}`, borderRadius: 8, padding: '0.55rem 0.7rem', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit' }} /><span>{decision.after}</span></span>
  </div>;
}
function Feedback({ decision, value }: { decision: TableCompletionDecision; value: string }) {
  const correct = isTableCompletionCorrect(decision, value);
  return <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}<div><strong>{correct ? 'Exact, grammatical and inside the right coordinate.' : `Answer: ${decision.answer}`}</strong><p>{correct ? decision.explanation : decision.trap}</p><p><strong>Evidence:</strong> “{decision.evidenceQuote}”</p></div></div>;
}

export function TableCompletionGuidedPractice({ passage }: { passage: TableCompletionTrainingPassage }) {
  const [index, setIndex] = useState(0); const [answer, setAnswer] = useState(''); const [checked, setChecked] = useState(false); const [completed, setCompleted] = useState<string[]>([]); const [confirmReset, setConfirmReset] = useState(false);
  const decision = passage.decisions[index]; const correct = isTableCompletionCorrect(decision, answer); const finished = completed.length === passage.decisions.length;
  function reset() { if ((answer || completed.length) && !confirmReset) { setConfirmReset(true); return; } setIndex(0); setAnswer(''); setChecked(false); setCompleted([]); setConfirmReset(false); }
  function continuePractice() { if (!correct) { setAnswer(''); setChecked(false); return; } const next = completed.includes(decision.id) ? completed : [...completed, decision.id]; setCompleted(next); if (index < passage.decisions.length - 1) { setIndex((value) => value + 1); setAnswer(''); setChecked(false); } }
  return <section className={styles.lab} data-active-practice="true" aria-label="Guided Table Completion practice">
    <div className={styles.labTopline}><div><span className={styles.modeTag}>Watch one · complete six</span><h3>{passage.title}</h3></div><button type="button" className={styles.textButton} onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to restart' : 'Restart'}</button></div>
    <aside className={styles.workedDecision} aria-labelledby="table-worked-example"><div><span className={styles.modeTag}>Worked decision</span><h4 id="table-worked-example">Treat the headers as coordinates</h4><p>The row narrows the topic; the column names the missing information category.</p></div><ol><li><strong>Name both headers</strong><span>State the row purpose and column category.</span></li><li><strong>Predict the form</strong><span>Use the complete cell to expect a noun, action, condition or short phrase.</span></li><li><strong>Copy and rebuild</strong><span>Insert the smallest exact span and reread the complete cell.</span></li></ol></aside>
    <CoordinateMap passage={passage} active={decision} />
    {finished ? <div className={styles.completionCard} role="status"><CheckCircle2 aria-hidden="true" /><div><strong>Guided table complete</strong><p>You used both coordinates to control evidence, grammar and answer boundaries.</p></div></div> : <div className={styles.guidedLayout}><Passage passage={passage} /><article className={styles.decisionPanel}><p className={styles.panelLabel}>Cell {index + 1} of {passage.decisions.length}</p><h3>Complete the cell at this row-column intersection</h3><AnswerField decision={decision} value={answer} disabled={checked} onChange={(value) => { setAnswer(value); setConfirmReset(false); }} />{!checked ? <button type="button" className="btn btn-primary" disabled={!answer.trim()} onClick={() => setChecked(true)}>Check answer</button> : <><Feedback decision={decision} value={answer} /><button type="button" className="btn btn-primary" onClick={continuePractice}>{correct ? 'Open next cell' : 'Retry this cell'}</button></>}</article></div>}
    <SourceBoundary passage={passage} />
  </section>;
}

export function TableCompletionIndependentPractice({ passage }: { passage: TableCompletionTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({}); const [submitted, setSubmitted] = useState(false); const [confirmReset, setConfirmReset] = useState(false);
  const answered = passage.decisions.filter((decision) => answers[decision.id]?.trim()).length; const score = passage.decisions.filter((decision) => isTableCompletionCorrect(decision, answers[decision.id] ?? '')).length;
  function reset() { if ((answered || submitted) && !confirmReset) { setConfirmReset(true); return; } setAnswers({}); setSubmitted(false); setConfirmReset(false); }
  return <section className={styles.lab} data-active-practice="true" aria-label="Independent Table Completion set">
    <div className={styles.labTopline}><div><span className={styles.modeTag}>Independent table · feedback closed</span><h3>{passage.title}</h3><p>Read all row and column headers, then complete all six cells before any key opens.</p></div><span className={styles.counter} aria-live="polite">{answered}/{passage.decisions.length} complete</span></div><CoordinateMap passage={passage} />
    <div className={styles.independentLayout}><Passage passage={passage} /><div className={styles.independentGrid}>{passage.decisions.map((decision, index) => <article className={styles.independentCard} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{decision.rowHeading} · {decision.columnHeading}</small></div><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div></div>
    <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{passage.decisions.length} exact answers</strong><span>{score >= passage.decisions.length - 1 ? 'Independent transfer target reached.' : 'Repair the coordinate-to-evidence map before another attempt.'}</span></> : <><strong>One complete submission</strong><span>Every answer remains editable until you submit the full table.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset table'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== passage.decisions.length} onClick={() => setSubmitted(true)}>Submit full table</button>}</div></div><SourceBoundary passage={passage} />
  </section>;
}

type EngineQuestion = { passage: TableCompletionTrainingPassage; decision: TableCompletionDecision };
function buildQuestions(levelIndex: number): EngineQuestion[] {
  const level = TABLE_COMPLETION_LEVELS[levelIndex]; const passages = level.passageIds.map(getTableCompletionPassage).filter((item): item is TableCompletionTrainingPassage => Boolean(item));
  if (!level.decisionIds) return passages.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));
  return level.decisionIds.flatMap((id) => { const passage = passages.find((item) => item.decisions.some((decision) => decision.id === id)); const decision = passage?.decisions.find((item) => item.id === id); return passage && decision ? [{ passage, decision }] : []; });
}

export function TableCompletionProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS); const [hydrated, setHydrated] = useState(false); const [levelIndex, setLevelIndex] = useState(0); const [answers, setAnswers] = useState<AnswerMap>({}); const [submitted, setSubmitted] = useState(false); const [elapsed, setElapsed] = useState(0); const [confirmReset, setConfirmReset] = useState(false); const [confirmAllReset, setConfirmAllReset] = useState(false);
  useEffect(() => { const task = window.setTimeout(() => { const stored = readProgress(); const index = Math.min(stored.activeLevelIndex, stored.unlockedLevel); const draft = stored.drafts[TABLE_COMPLETION_LEVELS[index].id]; setProgress(stored); setLevelIndex(index); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setHydrated(true); }, 0); return () => window.clearTimeout(task); }, []);
  useEffect(() => { if (!hydrated || submitted) return; const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [hydrated, levelIndex, submitted]);
  const level = TABLE_COMPLETION_LEVELS[levelIndex]; const questions = useMemo(() => buildQuestions(levelIndex), [levelIndex]); const answered = questions.filter(({ decision }) => answers[decision.id]?.trim()).length; const score = questions.filter(({ decision }) => isTableCompletionCorrect(decision, answers[decision.id] ?? '')).length; const mastered = score >= level.masteryScore; const completed = TABLE_COMPLETION_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length; const topErrors = Object.entries(progress.errorCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)).slice(0, 3) as Array<[TableCompletionErrorCode, number]>;
  useEffect(() => { if (!hydrated || submitted) return; const persisted = readProgress(); writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts: { ...persisted.drafts, [level.id]: { answers, elapsed } } }); }, [answers, elapsed, hydrated, level.id, levelIndex, progress, submitted]);
  function switchLevel(nextIndex: number) { if (nextIndex > progress.unlockedLevel) return; const persisted = readProgress(); const drafts = submitted ? persisted.drafts : { ...persisted.drafts, [level.id]: { answers, elapsed } }; const draft = drafts[TABLE_COMPLETION_LEVELS[nextIndex].id]; const next = { ...progress, activeLevelIndex: nextIndex, drafts }; setProgress(next); writeProgress(next); setLevelIndex(nextIndex); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setSubmitted(false); setConfirmReset(false); setConfirmAllReset(false); }
  function submitLevel() { if (answered !== questions.length) return; const wrong = questions.filter(({ decision }) => !isTableCompletionCorrect(decision, answers[decision.id] ?? '')); const errors = { ...progress.errorCounts }; for (const { decision } of wrong) errors[decision.errorCode] = (errors[decision.errorCode] ?? 0) + 1; const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false }; const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next: StoredProgress = { version: 1, unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(TABLE_COMPLETION_LEVELS.length - 1, levelIndex + 1)) : progress.unlockedLevel, activeLevelIndex: levelIndex, levels: { ...progress.levels, [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered } }, errorCounts: errors, reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ decision }) => decision.id)])), drafts }; setSubmitted(true); setProgress(next); writeProgress(next); }
  function resetAttempt() { if ((answered || elapsed) && !confirmReset) { setConfirmReset(true); return; } const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next = { ...progress, drafts }; setProgress(next); writeProgress(next); setAnswers({}); setElapsed(0); setSubmitted(false); setConfirmReset(false); }
  function resetAll() { if (!confirmAllReset) { setConfirmAllReset(true); return; } window.localStorage.removeItem(TABLE_COMPLETION_STORAGE_KEY); setProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setElapsed(0); setSubmitted(false); setConfirmAllReset(false); }
  if (!hydrated) return <section className={styles.lab} data-active-practice="true" aria-label="Table Completion Progress Engine"><p>Loading saved Table Completion progress…</p></section>;
  const distinctPassages = Array.from(new Map(questions.map(({ passage }) => [passage.id, passage])).values());
  return <section className={styles.lab} data-active-practice="true" aria-label="WeLearn Table Completion Progress Engine">
    <div className={styles.engineHeader}><div><span className={styles.modeTag}>WeLearn Progress Engine · local progress</span><h3>Table Completion control room</h3><p>Six levels move from coordinate drills to complete evidence tables.</p></div><div className={styles.engineStats}><span><FileCheck2 aria-hidden="true" />{completed}/{TABLE_COMPLETION_LEVELS.length} mastered</span><span><Clock3 aria-hidden="true" />{formatTime(elapsed)}</span><span><LockKeyhole aria-hidden="true" />Level {progress.unlockedLevel + 1} open</span></div></div>
    <nav className={styles.levelRail} aria-label="Table Completion levels">{TABLE_COMPLETION_LEVELS.map((item, index) => <button type="button" key={item.id} disabled={index > progress.unlockedLevel} aria-current={index === levelIndex ? 'step' : undefined} onClick={() => switchLevel(index)}><span>{index + 1}</span><strong>{item.title}</strong><small>{progress.levels[item.id]?.mastered ? 'mastered' : index > progress.unlockedLevel ? 'locked' : index === levelIndex ? 'active' : 'open'}</small></button>)}</nav>
    <div className={styles.labTopline}><div><span className={styles.modeTag}>{level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><span className={styles.counter} aria-live="polite">{answered}/{questions.length} complete</span></div>
    <div className={styles.independentLayout}><div>{distinctPassages.map((passage) => <div key={passage.id}><CoordinateMap passage={passage} /><Passage passage={passage} /></div>)}</div><div className={styles.independentGrid}>{questions.map(({ decision }, index) => <article className={styles.independentCard} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{decision.rowHeading} · {decision.columnHeading}</small></div><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div></div>
    <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} · {mastered ? 'level mastered' : 'repair required'}</strong><span>{mastered ? 'The next level is now open.' : `Reach ${level.masteryScore}/${questions.length} to unlock the next level.`}</span></> : <><strong>Feedback stays closed</strong><span>Complete every cell before submitting this level.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset attempt'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== questions.length} onClick={submitLevel}>Submit level</button>}{submitted && mastered && levelIndex < TABLE_COMPLETION_LEVELS.length - 1 && <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Open next level</button>}</div></div>
    <aside className={styles.errorPanel}><div><span className={styles.modeTag}>Error ledger</span><h4>What to repair next</h4><p>{topErrors.length ? 'Your most frequent Table Completion errors appear below.' : 'Complete a level to build a personalised review queue.'}</p></div><ul>{topErrors.length ? topErrors.map(([code, count]) => <li key={code}><strong>{count}</strong><span>{ERROR_LABELS[code]}</span></li>) : <li><strong>0</strong><span>No recorded errors yet</span></li>}</ul><button type="button" className={styles.textButton} onClick={resetAll}><RotateCcw size={16} aria-hidden="true" />{confirmAllReset ? 'Press again to erase progress' : 'Reset all progress'}</button></aside>
    {distinctPassages.map((passage) => <SourceBoundary key={passage.id} passage={passage} />)}<p className={styles.securityNote}>Guided Learn mode delivers answer keys and explanations to this browser. It is not a secure Practice, Exam or proctored mode.</p>
  </section>;
}
