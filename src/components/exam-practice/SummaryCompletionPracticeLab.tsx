'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, FileCheck2, LockKeyhole, RotateCcw, XCircle } from 'lucide-react';
import {
  SUMMARY_COMPLETION_LEGACY_STORAGE_KEY,
  SUMMARY_COMPLETION_LEVELS,
  SUMMARY_COMPLETION_STORAGE_KEY,
  countSummaryCompletionWords,
  getSummaryCompletionPassage,
  isSummaryCompletionCorrect,
  type SummaryCompletionDecision,
  type SummaryCompletionErrorCode,
  type SummaryCompletionTrainingPassage,
} from '@/data/practica-exams/ielts-reading-summary-completion-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type AttemptDraft = { answers: AnswerMap; elapsed: number };
type StoredProgress = {
  version: 2;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<SummaryCompletionErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, AttemptDraft>;
};
type RawStoredProgress = Omit<Partial<StoredProgress>, 'version'> & { version?: 1 | 2 };

const EMPTY_PROGRESS: StoredProgress = {
  version: 2,
  unlockedLevel: 0,
  activeLevelIndex: 0,
  levels: {},
  errorCounts: {},
  reviewQueue: [],
  drafts: {},
};

const ERROR_LABELS: Record<SummaryCompletionErrorCode, string> = {
  'over-limit': 'response exceeds the displayed word limit',
  'duplicate-frame-word': 'response repeats a word already in the frame',
  'incomplete-span': 'response drops a necessary part of the evidence span',
  'grammar-mismatch': 'passage wording does not fit the rebuilt sentence',
  'isolated-gap': 'gap was solved without the surrounding summary logic',
  'wrong-summary-zone': 'answer came from the wrong part of the connected summary',
};

function nonNegativeInteger(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.trunc(parsed)) : fallback;
}

function readProgress(): StoredProgress {
  try {
    const raw = window.localStorage.getItem(SUMMARY_COMPLETION_STORAGE_KEY)
      ?? window.localStorage.getItem(SUMMARY_COMPLETION_LEGACY_STORAGE_KEY);
    const parsed = JSON.parse(raw ?? 'null') as RawStoredProgress | null;
    if (!parsed || (parsed.version !== 1 && parsed.version !== 2)) return EMPTY_PROGRESS;
    const knownLevels = new Set(SUMMARY_COMPLETION_LEVELS.map((level) => level.id));
    const levels = parsed.levels && typeof parsed.levels === 'object' && !Array.isArray(parsed.levels)
      ? Object.fromEntries(Object.entries(parsed.levels).filter(([id, value]) => knownLevels.has(id) && value && typeof value === 'object')) as Record<string, LevelRecord>
      : {};
    const drafts = parsed.version === 2 && parsed.drafts && typeof parsed.drafts === 'object' && !Array.isArray(parsed.drafts)
      ? Object.fromEntries(Object.entries(parsed.drafts).filter(([id, value]) => knownLevels.has(id) && value && typeof value === 'object')) as Record<string, AttemptDraft>
      : {};
    const unlockedLevel = Math.min(SUMMARY_COMPLETION_LEVELS.length - 1, nonNegativeInteger(parsed.unlockedLevel));
    return {
      version: 2,
      unlockedLevel,
      activeLevelIndex: Math.min(unlockedLevel, nonNegativeInteger(parsed.activeLevelIndex)),
      levels,
      errorCounts: parsed.errorCounts && typeof parsed.errorCounts === 'object' && !Array.isArray(parsed.errorCounts) ? parsed.errorCounts : {},
      reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((id): id is string => typeof id === 'string') : [],
      drafts,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeProgress(progress: StoredProgress) {
  try { window.localStorage.setItem(SUMMARY_COMPLETION_STORAGE_KEY, JSON.stringify(progress)); } catch { /* Local persistence is optional. */ }
}

function formatTime(totalSeconds: number) {
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
}

function Passage({ passage }: { passage: SummaryCompletionTrainingPassage }) {
  return (
    <article className={styles.passagePanel} lang="en">
      <p className={styles.panelLabel}>Reading passage</p>
      <h3>{passage.title}</h3>
      {passage.passage.split(/\n\s*\n/u).map((paragraph, index) => <p key={`${passage.id}-${index}`}>{paragraph}</p>)}
    </article>
  );
}

function SourceBoundary({ passage }: { passage: SummaryCompletionTrainingPassage }) {
  return (
    <p className={styles.sourceNote}>
      <strong>Source boundary:</strong> {passage.sourceNote}{' '}
      <a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">
        Review the candidate source <span className={styles.srOnly}>(opens in a new tab)</span>
      </a>.
    </p>
  );
}

function AnswerField({ decision, value, disabled, onChange }: {
  decision: SummaryCompletionDecision;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const fieldId = useId();
  const count = countSummaryCompletionWords(value);
  const over = count > decision.maxWords;
  return (
    <div className={styles.quoteBlock}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        <strong style={{ color: 'var(--mh-accent)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>{decision.instruction}</strong>
        <small aria-live="polite" style={{ color: over ? '#b91c1c' : 'var(--muted)', fontFamily: 'var(--mono)' }}>{count}/{decision.maxWords} words</small>
      </div>
      <div>
        <label className={styles.srOnly} htmlFor={fieldId}>Answer for: {decision.before} blank {decision.after}</label>
        <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem', lineHeight: 1.75 }}>
          <span>{decision.before}</span>
          <input
            id={fieldId}
            name={decision.id}
            value={value}
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => onChange(event.currentTarget.value)}
            style={{ minWidth: 190, maxWidth: '100%', minHeight: 46, border: `2px solid ${over ? '#dc2626' : 'var(--line-soft)'}`, borderRadius: 8, padding: '0.55rem 0.7rem', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit' }}
          />
          <span>{decision.after}</span>
        </span>
      </div>
    </div>
  );
}

function Feedback({ decision, value }: { decision: SummaryCompletionDecision; value: string }) {
  const correct = isSummaryCompletionCorrect(decision, value);
  return (
    <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
      {correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}
      <div>
        <strong>{correct ? 'Exact, grammatical and within the limit.' : `Answer: ${decision.answer}`}</strong>
        <p>{correct ? decision.explanation : decision.trap}</p>
        <p><strong>Evidence:</strong> “{decision.evidenceQuote}”</p>
      </div>
    </div>
  );
}

export function SummaryCompletionGuidedPractice({ passage }: { passage: SummaryCompletionTrainingPassage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [confirmReset, setConfirmReset] = useState(false);
  const decision = passage.decisions[activeIndex];
  const correct = isSummaryCompletionCorrect(decision, answer);
  const finished = completed.length === passage.decisions.length;

  function reset() {
    if ((answer || completed.length) && !confirmReset) { setConfirmReset(true); return; }
    setActiveIndex(0); setAnswer(''); setChecked(false); setCompleted([]); setConfirmReset(false);
  }

  function continuePractice() {
    if (!correct) { setAnswer(''); setChecked(false); return; }
    const next = completed.includes(decision.id) ? completed : [...completed, decision.id];
    setCompleted(next);
    if (activeIndex < passage.decisions.length - 1) { setActiveIndex((index) => index + 1); setAnswer(''); setChecked(false); }
  }

  return (
    <section className={styles.lab} data-active-practice="true" aria-label="Guided Summary Completion practice">
      <div className={styles.labTopline}>
        <div><span className={styles.modeTag}>Watch one · complete six</span><h3>{passage.title}</h3></div>
        <button type="button" className={styles.textButton} onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to restart' : 'Restart'}</button>
      </div>
      <aside className={styles.workedDecision} aria-labelledby="summary-completion-worked-example">
        <div><span className={styles.modeTag}>Worked decision</span><h4 id="summary-completion-worked-example">Read the whole summary before one gap</h4><p>Sequence: cause → design response → result. The blank belongs to the design response.</p></div>
        <ol>
          <li><strong>Map cohesion</strong><span>Use the sentences before and after the blank to predict its role.</span></li>
          <li><strong>Locate the passage zone</strong><span>Follow the same idea sequence instead of scanning one keyword.</span></li>
          <li><strong>Rebuild the summary</strong><span>Insert the smallest exact span and reread the connected meaning.</span></li>
        </ol>
      </aside>
      <div className={styles.mapRail} role="progressbar" aria-label="Guided Summary Completion progress" aria-valuemin={0} aria-valuemax={passage.decisions.length} aria-valuenow={completed.length}>
        {passage.decisions.map((item, index) => <span key={item.id} className={completed.includes(item.id) ? styles.mapDone : index === activeIndex ? styles.mapActive : ''}><b>{index + 1}</b><small>{completed.includes(item.id) ? 'proved' : index === activeIndex ? 'active' : 'next'}</small></span>)}
      </div>
      {finished ? (
        <div className={styles.completionCard} role="status"><CheckCircle2 aria-hidden="true" /><div><strong>Guided set complete</strong><p>You controlled evidence, grammar and the answer boundary across all six frames.</p></div></div>
      ) : (
        <div className={styles.guidedLayout}>
          <Passage passage={passage} />
          <article className={styles.decisionPanel}>
            <p className={styles.panelLabel}>Gap {activeIndex + 1} of {passage.decisions.length}</p>
            <h3>Complete the connected summary from passage evidence</h3>
            <AnswerField decision={decision} value={answer} disabled={checked} onChange={(value) => { setAnswer(value); setConfirmReset(false); }} />
            {!checked && <button type="button" className="btn btn-primary" disabled={!answer.trim()} onClick={() => setChecked(true)}>Check answer</button>}
            {checked && <><Feedback decision={decision} value={answer} /><button type="button" className="btn btn-primary" onClick={continuePractice}>{correct ? 'Open next gap' : 'Retry this gap'}</button></>}
          </article>
        </div>
      )}
      <SourceBoundary passage={passage} />
    </section>
  );
}

export function SummaryCompletionIndependentPractice({ passage }: { passage: SummaryCompletionTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const answered = passage.decisions.filter((decision) => answers[decision.id]?.trim()).length;
  const score = passage.decisions.filter((decision) => isSummaryCompletionCorrect(decision, answers[decision.id] ?? '')).length;
  function reset() {
    if ((answered || submitted) && !confirmReset) { setConfirmReset(true); return; }
    setAnswers({}); setSubmitted(false); setConfirmReset(false);
  }
  return (
    <section className={styles.lab} data-active-practice="true" aria-label="Independent Summary Completion set">
      <div className={styles.labTopline}><div><span className={styles.modeTag}>Independent full summary · feedback closed</span><h3>{passage.title}</h3><p>Read the connected overview and complete all six gaps before any key or explanation opens.</p></div><span className={styles.counter} aria-live="polite">{answered}/{passage.decisions.length} complete</span></div>
      <div className={styles.independentLayout}>
        <Passage passage={passage} />
        <div className={styles.independentGrid}>{passage.decisions.map((decision, index) => <article className={styles.independentCard} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>Evidence · grammar · limit</small></div><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div>
      </div>
      <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{passage.decisions.length} exact answers</strong><span>{score >= passage.decisions.length - 1 ? 'Independent transfer target reached.' : 'Repair each evidence span before another attempt.'}</span></> : <><strong>One complete submission</strong><span>Every answer remains editable until you submit the full set.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset set'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== passage.decisions.length} onClick={() => setSubmitted(true)}>Submit full set</button>}</div></div>
      <SourceBoundary passage={passage} />
    </section>
  );
}

type EngineQuestion = { passage: SummaryCompletionTrainingPassage; decision: SummaryCompletionDecision };
function buildQuestions(levelIndex: number): EngineQuestion[] {
  const level = SUMMARY_COMPLETION_LEVELS[levelIndex];
  const passages = level.passageIds.map(getSummaryCompletionPassage).filter((item): item is SummaryCompletionTrainingPassage => Boolean(item));
  if (!level.decisionIds) return passages.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));
  return level.decisionIds.flatMap((id) => {
    const passage = passages.find((item) => item.decisions.some((decision) => decision.id === id));
    const decision = passage?.decisions.find((item) => item.id === id);
    return passage && decision ? [{ passage, decision }] : [];
  });
}

export function SummaryCompletionProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);

  useEffect(() => {
    const task = window.setTimeout(() => {
      const stored = readProgress();
      const index = Math.min(stored.activeLevelIndex, stored.unlockedLevel);
      const level = SUMMARY_COMPLETION_LEVELS[index];
      const draft = stored.drafts[level.id];
      setProgress(stored); setLevelIndex(index); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setHydrated(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);
  useEffect(() => { if (!hydrated || submitted) return; const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [hydrated, levelIndex, submitted]);

  const level = SUMMARY_COMPLETION_LEVELS[levelIndex];
  const questions = useMemo(() => buildQuestions(levelIndex), [levelIndex]);
  const answered = questions.filter(({ decision }) => answers[decision.id]?.trim()).length;
  const score = questions.filter(({ decision }) => isSummaryCompletionCorrect(decision, answers[decision.id] ?? '')).length;
  const mastered = score >= level.masteryScore;
  const completed = SUMMARY_COMPLETION_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const singlePassage = new Set(questions.map(({ passage }) => passage.id)).size === 1;
  const topErrors = Object.entries(progress.errorCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)).slice(0, 3) as Array<[SummaryCompletionErrorCode, number]>;

  useEffect(() => {
    if (!hydrated || submitted) return;
    const persisted = readProgress();
    writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts: { ...persisted.drafts, [level.id]: { answers, elapsed } } });
  }, [answers, elapsed, hydrated, level.id, levelIndex, progress, submitted]);

  function switchLevel(nextIndex: number) {
    if (nextIndex > progress.unlockedLevel) return;
    const persisted = readProgress();
    const drafts = submitted ? persisted.drafts : { ...persisted.drafts, [level.id]: { answers, elapsed } };
    const target = SUMMARY_COMPLETION_LEVELS[nextIndex];
    const draft = drafts[target.id];
    const next = { ...progress, activeLevelIndex: nextIndex, drafts };
    setProgress(next); writeProgress(next); setLevelIndex(nextIndex); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setSubmitted(false); setConfirmReset(false); setConfirmAllReset(false);
  }

  function submitLevel() {
    if (answered !== questions.length) return;
    const wrong = questions.filter(({ decision }) => !isSummaryCompletionCorrect(decision, answers[decision.id] ?? ''));
    const errors = { ...progress.errorCounts };
    for (const { decision } of wrong) errors[decision.errorCode] = (errors[decision.errorCode] ?? 0) + 1;
    const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false };
    const drafts = { ...readProgress().drafts }; delete drafts[level.id];
    const next: StoredProgress = {
      version: 2,
      unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(SUMMARY_COMPLETION_LEVELS.length - 1, levelIndex + 1)) : progress.unlockedLevel,
      activeLevelIndex: levelIndex,
      levels: { ...progress.levels, [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered } },
      errorCounts: errors,
      reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ decision }) => decision.id)])).filter((id) => !questions.some(({ decision }) => decision.id === id && isSummaryCompletionCorrect(decision, answers[id] ?? ''))),
      drafts,
    };
    setSubmitted(true); setProgress(next); writeProgress(next);
  }

  function resetAttempt() {
    if ((answered || elapsed || submitted) && !confirmReset) { setConfirmReset(true); return; }
    const drafts = { ...readProgress().drafts }; delete drafts[level.id];
    const next = { ...progress, activeLevelIndex: levelIndex, drafts };
    setProgress(next); writeProgress(next); setAnswers({}); setSubmitted(false); setElapsed(0); setConfirmReset(false);
  }

  function resetAll() {
    if (!confirmAllReset) { setConfirmAllReset(true); return; }
    setProgress(EMPTY_PROGRESS); writeProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setSubmitted(false); setElapsed(0); setConfirmReset(false); setConfirmAllReset(false);
  }

  return (
    <section className={styles.engine} data-active-practice="true" aria-labelledby="summary-completion-progress-title">
      <div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h2 id="summary-completion-progress-title">Rebuild connected meaning across six levels</h2><p>Two cohesion drills lead into four full summaries. Drafts, time, scores and error patterns stay on this device.</p></div><div className={styles.engineScore}><strong>{completed}/6</strong><span>levels mastered</span></div></div>
      <div className={styles.dashboard}><div><FileCheck2 size={19} aria-hidden="true" /><span><strong>{progress.reviewQueue.length}</strong> answers in review</span></div><div><Clock3 size={19} aria-hidden="true" /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div><div><CheckCircle2 size={19} aria-hidden="true" /><span><strong>{hydrated ? 'Saved locally' : 'Loading…'}</strong> draft and progress</span></div></div>
      <nav className={styles.levelRail} aria-label="Summary Completion progress levels">{SUMMARY_COMPLETION_LEVELS.map((item, index) => { const locked = index > progress.unlockedLevel; const record = progress.levels[item.id]; const total = buildQuestions(index).length; return <button key={item.id} type="button" disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''} onClick={() => switchLevel(index)}><span>{locked ? <LockKeyhole size={14} aria-hidden="true" /> : index + 1}</span><b>{item.title}</b><small>{record ? `Best ${record.bestScore}/${total}` : locked ? 'Locked' : 'Ready'}</small></button>; })}</nav>
      <div className={styles.enginePanel}>
        <header className={styles.levelHeader}><div><span>Level {levelIndex + 1} of 6 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div></header>
        {singlePassage && questions[0] && <Passage passage={questions[0].passage} />}
        <div className={styles.engineQuestions}>{questions.map(({ passage, decision }, index) => <article className={styles.engineQuestion} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title}</small></div>{!singlePassage && <div className={styles.quoteBlock}><p className={styles.panelLabel}>Passage extract</p><p>{decision.evidenceQuote}</p></div>}<AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div>
        <footer className={styles.engineFooter} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} exact · {mastered ? 'Skill level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is available. This is a WeLearn micro-skill result, not an IELTS band.' : `Review ${questions.length - score} answer${questions.length - score === 1 ? '' : 's'}, then retry.`}</span></> : <><strong>{answered}/{questions.length} answers complete</strong><span>Responses remain editable and saved locally until submission.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset attempt'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== questions.length} onClick={submitLevel}>Submit level</button>}{submitted && mastered && levelIndex < SUMMARY_COMPLETION_LEVELS.length - 1 && <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Open next level</button>}</div></footer>
      </div>
      <aside className={styles.reviewPanel} aria-label="Summary Completion review plan"><div><span className={styles.modeTag}>Review plan</span><h3>Repair the evidence-to-answer chain</h3><p>{topErrors.length ? 'Your most frequent Summary Completion errors appear below.' : 'Complete a level to build a personalised review queue.'}</p></div><ul>{topErrors.length ? topErrors.map(([code, count]) => <li key={code}><strong>{count}</strong><span>{ERROR_LABELS[code]}</span></li>) : <li><strong>0</strong><span>No recorded errors yet</span></li>}</ul><button type="button" className={styles.textButton} onClick={resetAll}><RotateCcw size={16} aria-hidden="true" />{confirmAllReset ? 'Press again to erase progress' : 'Reset all progress'}</button></aside>
      {Array.from(new Map(questions.map(({ passage }) => [passage.id, passage])).values()).map((passage) => <SourceBoundary key={passage.id} passage={passage} />)}
      <p className={styles.securityNote}>Guided Learn mode delivers answer keys and explanations to this browser. It is not a secure Practice, Exam or proctored mode.</p>
    </section>
  );
}
