'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, FileCheck2, LockKeyhole, RotateCcw, XCircle } from 'lucide-react';
import {
  WORD_LIMIT_LEGACY_STORAGE_KEY,
  WORD_LIMIT_LEVELS,
  WORD_LIMIT_STORAGE_KEY,
  countWordLimitWords,
  getWordLimitPassage,
  normalizeWordLimitAnswer,
  type WordLimitDecision,
  type WordLimitErrorCode,
  type WordLimitTrainingPassage,
} from '@/data/practica-exams/ielts-reading-word-limit-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type AttemptDraft = { answers: AnswerMap; elapsed: number };
type StoredProgress = {
  version: 2;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<WordLimitErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, AttemptDraft>;
};

const EMPTY_PROGRESS: StoredProgress = { version: 2, unlockedLevel: 0, activeLevelIndex: 0, levels: {}, errorCounts: {}, reviewQueue: [], drafts: {} };
const ERROR_LABELS: Record<WordLimitErrorCode, string> = {
  'over-limit': 'submitted more words than the instruction allows',
  'duplicate-frame-word': 'repeated a word already supplied by the frame',
  'incomplete-span': 'copied a span that was too short to preserve the meaning',
  'grammar-mismatch': 'used a form that does not complete the sentence naturally',
  'wrong-evidence': 'copied a plausible phrase from the wrong evidence relationship',
  'instruction-misread': 'applied the wrong instruction or counting rule',
};

function nonNegativeInteger(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.trunc(parsed)) : fallback;
}

function normalizeProgress(value: unknown): StoredProgress {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return EMPTY_PROGRESS;
  const parsed = value as Partial<StoredProgress>;
  const version = Number((value as { version?: unknown }).version);
  if (version !== 1 && version !== 2) return EMPTY_PROGRESS;
  const knownLevels = new Set(WORD_LIMIT_LEVELS.map((level) => level.id));
  const levels = Object.fromEntries(Object.entries(parsed.levels ?? {}).flatMap(([id, raw]) => {
    if (!knownLevels.has(id) || !raw || typeof raw !== 'object' || Array.isArray(raw)) return [];
    const record = raw as Partial<LevelRecord>;
    return [[id, { attempts: nonNegativeInteger(record.attempts), bestScore: Math.min(5, nonNegativeInteger(record.bestScore)), mastered: record.mastered === true }]];
  }));
  const drafts = version === 2 && parsed.drafts && typeof parsed.drafts === 'object' && !Array.isArray(parsed.drafts)
    ? Object.fromEntries(Object.entries(parsed.drafts).flatMap(([id, raw]) => {
      if (!knownLevels.has(id) || !raw || typeof raw !== 'object' || Array.isArray(raw)) return [];
      const draft = raw as Partial<AttemptDraft>;
      const answers = draft.answers && typeof draft.answers === 'object' && !Array.isArray(draft.answers)
        ? Object.fromEntries(Object.entries(draft.answers).filter((row): row is [string, string] => typeof row[1] === 'string')) : {};
      return [[id, { answers, elapsed: nonNegativeInteger(draft.elapsed) }]];
    })) : {};
  const unlockedLevel = Math.min(WORD_LIMIT_LEVELS.length - 1, nonNegativeInteger(parsed.unlockedLevel));
  return { version: 2, unlockedLevel, activeLevelIndex: Math.min(unlockedLevel, nonNegativeInteger(parsed.activeLevelIndex)), levels, errorCounts: parsed.errorCounts && typeof parsed.errorCounts === 'object' ? parsed.errorCounts : {}, reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [], drafts };
}

function readProgress() {
  try { return normalizeProgress(JSON.parse(window.localStorage.getItem(WORD_LIMIT_STORAGE_KEY) ?? window.localStorage.getItem(WORD_LIMIT_LEGACY_STORAGE_KEY) ?? 'null')); }
  catch { return EMPTY_PROGRESS; }
}
function writeProgress(progress: StoredProgress) { try { window.localStorage.setItem(WORD_LIMIT_STORAGE_KEY, JSON.stringify(progress)); } catch { /* Practice remains usable without storage. */ } }
function formatTime(seconds: number) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }
function isCorrect(decision: WordLimitDecision, value: string) { return normalizeWordLimitAnswer(value) === normalizeWordLimitAnswer(decision.answer) && countWordLimitWords(value) <= decision.maxWords; }

function Passage({ passage }: { passage: WordLimitTrainingPassage }) {
  return <article className={styles.passagePanel} lang="en"><p className={styles.panelLabel}>Passage</p><h3>{passage.title}</h3>{passage.paragraphs.map((paragraph) => <section key={paragraph.id}><h4>{paragraph.label}</h4><p>{paragraph.text}</p></section>)}</article>;
}
function SourceBoundary({ passage }: { passage: WordLimitTrainingPassage }) {
  return <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote}{' '}<a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the primary source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>;
}

function AnswerField({ decision, value, disabled, showEvidence, onChange }: { decision: WordLimitDecision; value: string; disabled: boolean; showEvidence?: boolean; onChange: (value: string) => void }) {
  const count = countWordLimitWords(value);
  const over = count > decision.maxWords;
  return <div className={styles.quoteBlock}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}><strong style={{ color: 'var(--mh-accent)', fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.04em' }}>{decision.instruction}</strong><small style={{ color: over ? '#b91c1c' : 'var(--muted)', fontFamily: 'var(--mono)' }}>{count}/{decision.maxWords} words</small></div>
    <label>
      <span className={styles.srOnly}>Answer for: {decision.before} blank {decision.after}</span>
      <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem', lineHeight: 1.7 }}>
        <span>{decision.before}</span>
        <input
          name={decision.id}
          value={value}
          disabled={disabled}
          autoComplete="off"
          onChange={(event) => onChange(event.currentTarget.value)}
          style={{ minWidth: 190, maxWidth: '100%', minHeight: 46, border: `2px solid ${over ? '#dc2626' : 'var(--line-soft)'}`, borderRadius: 8, padding: '0.55rem 0.7rem', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit' }}
        />
        <span>{decision.after}</span>
      </span>
    </label>
    {showEvidence && <p><strong>Evidence:</strong> “{decision.evidenceQuote}”</p>}
  </div>;
}

function Feedback({ decision, value }: { decision: WordLimitDecision; value: string }) {
  const correct = isCorrect(decision, value);
  return <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}<div><strong>{correct ? 'Exact and within the limit.' : `Answer: ${decision.answer}`}</strong><p>{correct ? decision.explanation : decision.trap}</p></div></div>;
}

export function WordLimitGuidedPractice({ passage }: { passage: WordLimitTrainingPassage }) {
  const decisions = passage.decisions.slice(0, 3);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [confirmReset, setConfirmReset] = useState(false);
  const hasWork = Object.values(answers).some(Boolean);
  function reset() { if (hasWork && !confirmReset) { setConfirmReset(true); return; } setAnswers({}); setChecked({}); setConfirmReset(false); }
  return <section className={styles.lab} data-active-practice="true" aria-label="Guided word-limit practice"><div className={styles.labTopline}><div><span className={styles.modeTag}>Guided practice · three answer boundaries</span><h3>{passage.title}</h3><p>Read the instruction, predict the grammar and copy only the missing passage words.</p></div><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset guided set'}</button></div><Passage passage={passage} /><div className={styles.engineQuestions}>{decisions.map((decision, index) => { const done = Boolean(checked[decision.id]); return <article className={styles.engineQuestion} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>Limit → grammar → span → count</small></div><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={done} showEvidence onChange={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{!done && <button type="button" className="btn btn-primary" disabled={!answers[decision.id]?.trim()} onClick={() => setChecked((current) => ({ ...current, [decision.id]: true }))}>Check answer</button>}{done && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>; })}</div><SourceBoundary passage={passage} /></section>;
}

export function WordLimitIndependentPractice({ passage }: { passage: WordLimitTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const answered = passage.decisions.filter((decision) => answers[decision.id]?.trim()).length;
  const score = passage.decisions.filter((decision) => isCorrect(decision, answers[decision.id] ?? '')).length;
  function reset() { if ((answered || submitted) && !confirmReset) { setConfirmReset(true); return; } setAnswers({}); setSubmitted(false); setConfirmReset(false); }
  return <section className={styles.lab} data-active-practice="true" aria-label="Independent word-limit set"><div className={styles.labTopline}><div><span className={styles.modeTag}>Full passage · feedback closed</span><h3>{passage.title}</h3><p>Complete all five gaps before answers or explanations appear.</p></div><span className={styles.counter} aria-live="polite">{answered}/5 complete</span></div><Passage passage={passage} /><div className={styles.independentGrid}>{passage.decisions.map((decision) => <article className={styles.independentCard} key={decision.id}><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div><div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/5 exact answers</strong><span>{score >= 4 ? 'Independent transfer target reached.' : 'Review the answer boundary and instruction for each miss.'}</span></> : <><strong>One complete submission</strong><span>Feedback stays closed so every response remains independent.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset set'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== 5} onClick={() => setSubmitted(true)}>Submit full set</button>}</div></div><SourceBoundary passage={passage} /></section>;
}

type EngineQuestion = { passage: WordLimitTrainingPassage; decision: WordLimitDecision };
function buildQuestions(levelIndex: number): EngineQuestion[] {
  const level = WORD_LIMIT_LEVELS[levelIndex];
  const passages = level.passageIds.map(getWordLimitPassage).filter((item): item is WordLimitTrainingPassage => Boolean(item));
  if (!level.decisionIds) return passages.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));
  return level.decisionIds.flatMap((id) => { const passage = passages.find((item) => item.decisions.some((decision) => decision.id === id)); const decision = passage?.decisions.find((item) => item.id === id); return passage && decision ? [{ passage, decision }] : []; });
}

export function WordLimitProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [confirmAttemptReset, setConfirmAttemptReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);
  useEffect(() => { const task = window.setTimeout(() => { const stored = readProgress(); const index = Math.min(stored.activeLevelIndex, stored.unlockedLevel); const level = WORD_LIMIT_LEVELS[index]; const draft = stored.drafts[level.id]; setProgress(stored); setLevelIndex(index); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setHydrated(true); }, 0); return () => window.clearTimeout(task); }, []);
  useEffect(() => { if (!hydrated || submitted) return; const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [hydrated, levelIndex, submitted]);
  const level = WORD_LIMIT_LEVELS[levelIndex];
  const questions = useMemo(() => buildQuestions(levelIndex), [levelIndex]);
  const answered = questions.filter(({ decision }) => answers[decision.id]?.trim()).length;
  const score = questions.filter(({ decision }) => isCorrect(decision, answers[decision.id] ?? '')).length;
  const singlePassage = new Set(questions.map(({ passage }) => passage.id)).size === 1;
  const mastered = score >= level.masteryScore;
  const completed = WORD_LIMIT_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const topErrors = Object.entries(progress.errorCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)).slice(0, 3) as Array<[WordLimitErrorCode, number]>;
  useEffect(() => { if (!hydrated || submitted) return; const persisted = readProgress(); writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts: { ...persisted.drafts, [level.id]: { answers, elapsed } } }); }, [answers, elapsed, hydrated, level.id, levelIndex, progress, submitted]);
  function switchLevel(nextIndex: number) { if (nextIndex > progress.unlockedLevel) return; const persisted = readProgress(); const drafts = submitted ? persisted.drafts : { ...persisted.drafts, [level.id]: { answers, elapsed } }; const target = WORD_LIMIT_LEVELS[nextIndex]; const draft = drafts[target.id]; const next = { ...progress, activeLevelIndex: nextIndex, drafts }; setProgress(next); writeProgress(next); setLevelIndex(nextIndex); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setSubmitted(false); setConfirmAttemptReset(false); setConfirmAllReset(false); }
  function submitLevel() { if (answered !== questions.length) return; const wrong = questions.filter(({ decision }) => !isCorrect(decision, answers[decision.id] ?? '')); const errors = { ...progress.errorCounts }; for (const { decision } of wrong) errors[decision.errorCode] = (errors[decision.errorCode] ?? 0) + 1; const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false }; const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next: StoredProgress = { version: 2, unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(5, levelIndex + 1)) : progress.unlockedLevel, activeLevelIndex: levelIndex, levels: { ...progress.levels, [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered } }, errorCounts: errors, reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ decision }) => decision.id)])).filter((id) => !questions.some(({ decision }) => decision.id === id && isCorrect(decision, answers[id] ?? ''))), drafts }; setSubmitted(true); setProgress(next); writeProgress(next); }
  function resetAttempt() { if ((answered || elapsed || submitted) && !confirmAttemptReset) { setConfirmAttemptReset(true); return; } const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next = { ...progress, activeLevelIndex: levelIndex, drafts }; setProgress(next); writeProgress(next); setAnswers({}); setSubmitted(false); setElapsed(0); setConfirmAttemptReset(false); }
  function resetAll() { if (!confirmAllReset) { setConfirmAllReset(true); return; } setProgress(EMPTY_PROGRESS); writeProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setSubmitted(false); setElapsed(0); setConfirmAttemptReset(false); setConfirmAllReset(false); }
  return <section className={styles.engine} data-active-practice="true" aria-labelledby="word-limit-progress-title"><div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h2 id="word-limit-progress-title">Control answer boundaries across six levels</h2><p>Two focused drills lead into four full passage sets. Drafts, time, scores and error patterns stay on this device.</p></div><div className={styles.engineScore}><strong>{completed}/6</strong><span>levels mastered</span></div></div><div className={styles.dashboard}><div><FileCheck2 size={19} aria-hidden="true" /><span><strong>{progress.reviewQueue.length}</strong> answers in review</span></div><div><Clock3 size={19} aria-hidden="true" /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div><div><CheckCircle2 size={19} aria-hidden="true" /><span><strong>{hydrated ? 'Saved locally' : 'Loading…'}</strong> draft and progress</span></div></div><nav className={styles.levelRail} aria-label="Word-limit progress levels">{WORD_LIMIT_LEVELS.map((item, index) => { const locked = index > progress.unlockedLevel; const record = progress.levels[item.id]; return <button key={item.id} type="button" disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''} onClick={() => switchLevel(index)}><span>{locked ? <LockKeyhole size={14} aria-hidden="true" /> : index + 1}</span><b>{item.title}</b><small>{record ? `Best ${record.bestScore}/${index < 2 ? 4 : 5}` : locked ? 'Locked' : 'Ready'}</small></button>; })}</nav><div className={styles.enginePanel}><header className={styles.levelHeader}><div><span>Level {levelIndex + 1} of 6 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div></header>{singlePassage && questions[0] && <Passage passage={questions[0].passage} />}<div className={styles.engineQuestions}>{questions.map(({ passage, decision }, index) => { const paragraph = passage.paragraphs.find((item) => item.id === decision.paragraphId); return <article className={styles.engineQuestion} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title}</small></div>{!singlePassage && paragraph && <div className={styles.quoteBlock}><p className={styles.panelLabel}>Passage extract</p><p>{paragraph.text}</p></div>}<AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmAttemptReset(false); }} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>; })}</div><footer className={styles.engineFooter} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} exact · {mastered ? 'Skill level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is available. This is a WeLearn micro-skill result, not an IELTS band.' : `Review ${questions.length - score} answer${questions.length - score === 1 ? '' : 's'}, then retry.`}</span></> : <><strong>{answered}/{questions.length} answers complete</strong><span>Responses remain editable and saved locally until submission.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw size={16} aria-hidden="true" />{confirmAttemptReset ? 'Press again to reset' : 'Reset attempt'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== questions.length} onClick={submitLevel}>Submit level</button>}{submitted && mastered && levelIndex < 5 && <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Open next level</button>}</div></footer></div><aside className={styles.reviewPanel} aria-label="Word-limit review plan"><div><span className={styles.modeTag}>Review plan</span><h3>Repair the answer boundary</h3><p>{topErrors.length ? 'Your most frequent word-limit errors appear below.' : 'Complete a level to build a personalised review queue.'}</p></div><ul>{topErrors.length ? topErrors.map(([code, count]) => <li key={code}><strong>{count}</strong><span>{ERROR_LABELS[code]}</span></li>) : <li><strong>0</strong><span>No recorded errors yet</span></li>}</ul><button type="button" className={styles.textButton} onClick={resetAll}><RotateCcw size={16} aria-hidden="true" />{confirmAllReset ? 'Press again to erase progress' : 'Reset all progress'}</button></aside>{Array.from(new Map(questions.map(({ passage }) => [passage.id, passage])).values()).map((passage) => <SourceBoundary key={passage.id} passage={passage} />)}<p className={styles.securityNote}>Guided Learn mode delivers answers and explanations to this browser. It is not a secure Practice, Exam or proctored mode.</p></section>;
}
