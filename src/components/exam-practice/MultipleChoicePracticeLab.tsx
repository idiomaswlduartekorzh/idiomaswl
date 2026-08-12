'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, LockKeyhole, RotateCcw, SearchCheck, XCircle } from 'lucide-react';
import {
  MULTIPLE_CHOICE_LEGACY_STORAGE_KEY,
  MULTIPLE_CHOICE_LEVELS,
  MULTIPLE_CHOICE_STORAGE_KEY,
  getMultipleChoiceOptions,
  getMultipleChoicePassage,
  type MultipleChoiceDecision,
  type MultipleChoiceErrorCode,
  type MultipleChoiceTrainingPassage,
} from '@/data/practica-exams/ielts-reading-multiple-choice-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type AttemptDraft = { answers: AnswerMap; elapsed: number; attemptSeed: number };
type StoredProgress = {
  version: 2;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<MultipleChoiceErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, AttemptDraft>;
};

const EMPTY_PROGRESS: StoredProgress = { version: 2, unlockedLevel: 0, activeLevelIndex: 0, levels: {}, errorCounts: {}, reviewQueue: [], drafts: {} };
const ERROR_LABELS: Record<MultipleChoiceErrorCode, string> = {
  'stem-misread': 'answered a different question from the one in the stem',
  'lexical-echo': 'followed repeated vocabulary instead of the relationship',
  'partial-truth': 'selected a true detail that does not answer the whole question',
  'scope-inflation': 'made the option wider or more certain than the evidence',
  'wrong-relationship': 'kept the topic but changed the writer’s purpose or logic',
  'unsupported-claim': 'accepted information the passage does not supply',
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
  const knownLevels = new Set(MULTIPLE_CHOICE_LEVELS.map((level) => level.id));
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
      return [[id, { answers, elapsed: nonNegativeInteger(draft.elapsed), attemptSeed: nonNegativeInteger(draft.attemptSeed) }]];
    })) : {};
  const unlockedLevel = Math.min(MULTIPLE_CHOICE_LEVELS.length - 1, nonNegativeInteger(parsed.unlockedLevel));
  return { version: 2, unlockedLevel, activeLevelIndex: Math.min(unlockedLevel, nonNegativeInteger(parsed.activeLevelIndex)), levels, errorCounts: parsed.errorCounts && typeof parsed.errorCounts === 'object' ? parsed.errorCounts : {}, reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [], drafts };
}

function readProgress() {
  try { return normalizeProgress(JSON.parse(window.localStorage.getItem(MULTIPLE_CHOICE_STORAGE_KEY) ?? window.localStorage.getItem(MULTIPLE_CHOICE_LEGACY_STORAGE_KEY) ?? 'null')); }
  catch { return EMPTY_PROGRESS; }
}
function writeProgress(progress: StoredProgress) { try { window.localStorage.setItem(MULTIPLE_CHOICE_STORAGE_KEY, JSON.stringify(progress)); } catch { /* The practice remains usable without storage. */ } }
function formatTime(seconds: number) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }

function ChoiceCards({ options, selected, disabled, label, onSelect }: { options: string[]; selected: string; disabled: boolean; label: string; onSelect: (value: string) => void }) {
  const group = `mc-${useId().replace(/:/g, '')}`;
  return <fieldset className={`${styles.headingOptions} ${styles.headingOptionsCompact}`}><legend className={styles.srOnly}>{label}</legend>{options.map((option, index) => <label key={option} className={selected === option ? styles.headingOptionSelected : ''}><input type="radio" name={group} value={option} checked={selected === option} disabled={disabled} onChange={() => onSelect(option)} /><span className={styles.headingOptionBody}><span aria-hidden="true">{String.fromCharCode(65 + index)}</span><strong>{option}</strong></span></label>)}</fieldset>;
}

function Passage({ passage }: { passage: MultipleChoiceTrainingPassage }) {
  return <article className={styles.passagePanel} lang="en"><p className={styles.panelLabel}>Passage</p><h3>{passage.title}</h3>{passage.paragraphs.map((paragraph) => <section key={paragraph.id}><h4>{paragraph.label}</h4><p>{paragraph.text}</p></section>)}</article>;
}
function SourceBoundary({ passage }: { passage: MultipleChoiceTrainingPassage }) {
  return <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote}{' '}<a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the primary source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>;
}
function DecisionCard({ decision, selected, disabled, attemptSeed, showInvariant = false, onSelect }: { decision: MultipleChoiceDecision; selected: string; disabled: boolean; attemptSeed: number; showInvariant?: boolean; onSelect: (value: string) => void }) {
  return <><ChoiceCards options={getMultipleChoiceOptions(decision, attemptSeed)} selected={selected} disabled={disabled} label={`Answer options for ${decision.question}`} onSelect={onSelect} />{showInvariant && <p className={styles.sourceNote}><strong>Comparison rule:</strong> answer the exact stem, then reject the closest option by scope, relationship and whole-answer coverage.</p>}</>;
}

export function MultipleChoiceGuidedPractice({ passage }: { passage: MultipleChoiceTrainingPassage }) {
  const decisions = passage.decisions.slice(0, 3);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const hasWork = Object.keys(answers).length > 0;
  function reset() { if (hasWork && !confirmReset) { setConfirmReset(true); return; } setAnswers({}); setChecked({}); setAttemptSeed((value) => value + 1); setConfirmReset(false); }
  return <section className={styles.lab} data-active-practice="true" aria-label="Guided multiple-choice practice"><div className={styles.labTopline}><div><span className={styles.modeTag}>Guided practice · three one-best decisions</span><h3>{passage.title}</h3><p>Read the exact stem, choose a clickable option, then check the evidence before moving on.</p></div><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset guided set'}</button></div><Passage passage={passage} /><div className={styles.engineQuestions}>{decisions.map((decision, index) => { const done = Boolean(checked[decision.id]); const correct = answers[decision.id] === decision.answer; return <article className={styles.engineQuestion} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{decision.skill} · stem → evidence → options</small></div><h3>{decision.question}</h3><DecisionCard decision={decision} selected={answers[decision.id] ?? ''} disabled={done} attemptSeed={attemptSeed} showInvariant onSelect={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{!done && <button type="button" className="btn btn-primary" disabled={!answers[decision.id]} onClick={() => setChecked((current) => ({ ...current, [decision.id]: true }))}>Check decision</button>}{done && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}<div><strong>{correct ? 'Best answer supported.' : `Best answer: ${decision.answer}`}</strong><p>{correct ? decision.explanation : decision.trap} <strong>Evidence:</strong> {decision.evidence}</p></div></div>}</article>; })}</div><SourceBoundary passage={passage} /></section>;
}

export function MultipleChoiceIndependentPractice({ passage }: { passage: MultipleChoiceTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const answered = passage.decisions.filter((decision) => answers[decision.id]).length;
  const score = passage.decisions.filter((decision) => answers[decision.id] === decision.answer).length;
  function reset() { if ((answered || submitted) && !confirmReset) { setConfirmReset(true); return; } setAnswers({}); setSubmitted(false); setAttemptSeed((value) => value + 1); setConfirmReset(false); }
  return <section className={styles.lab} data-active-practice="true" aria-label="Independent multiple-choice set"><div className={styles.labTopline}><div><span className={styles.modeTag}>Full passage · feedback closed</span><h3>{passage.title}</h3><p>Complete all five questions before feedback opens. Answer positions change on a clean retry.</p></div><span className={styles.counter} aria-live="polite">{answered}/5 answered</span></div><Passage passage={passage} /><div className={styles.independentGrid}>{passage.decisions.map((decision) => { const correct = answers[decision.id] === decision.answer; return <article className={styles.independentCard} key={decision.id}><p className={styles.panelLabel}>{decision.skill}</p><h3>{decision.question}</h3><DecisionCard decision={decision} selected={answers[decision.id] ?? ''} disabled={submitted} attemptSeed={attemptSeed} onSelect={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmReset(false); }} />{submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}<div><strong>{correct ? 'Best answer supported.' : `Best answer: ${decision.answer}`}</strong><p>{correct ? decision.explanation : decision.trap} <strong>Evidence:</strong> {decision.evidence}</p></div></div>}</article>; })}</div><div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/5 correct</strong><span>{score >= 4 ? 'Independent transfer target reached.' : 'Review the stem and closest distractor, then retry.'}</span></> : <><strong>One complete submission</strong><span>Feedback stays closed so every decision remains independent.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset set'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== 5} onClick={() => setSubmitted(true)}>Submit full set</button>}</div></div><SourceBoundary passage={passage} /></section>;
}

type EngineQuestion = { passage: MultipleChoiceTrainingPassage; decision: MultipleChoiceDecision };
function buildQuestions(levelIndex: number): EngineQuestion[] {
  const level = MULTIPLE_CHOICE_LEVELS[levelIndex];
  const passages = level.passageIds.map(getMultipleChoicePassage).filter((item): item is MultipleChoiceTrainingPassage => Boolean(item));
  if (!level.decisionIds) return passages.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));
  return level.decisionIds.flatMap((id) => { const passage = passages.find((item) => item.decisions.some((decision) => decision.id === id)); const decision = passage?.decisions.find((item) => item.id === id); return passage && decision ? [{ passage, decision }] : []; });
}

export function MultipleChoiceProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmAttemptReset, setConfirmAttemptReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);
  useEffect(() => { const task = window.setTimeout(() => { const stored = readProgress(); const index = Math.min(stored.activeLevelIndex, stored.unlockedLevel); const level = MULTIPLE_CHOICE_LEVELS[index]; const draft = stored.drafts[level.id]; setProgress(stored); setLevelIndex(index); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? stored.levels[level.id]?.attempts ?? 0); setHydrated(true); }, 0); return () => window.clearTimeout(task); }, []);
  useEffect(() => { if (!hydrated || submitted) return; const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [hydrated, levelIndex, submitted]);
  const level = MULTIPLE_CHOICE_LEVELS[levelIndex];
  const questions = useMemo(() => buildQuestions(levelIndex), [levelIndex]);
  const answered = questions.filter(({ decision }) => answers[decision.id]).length;
  const score = questions.filter(({ decision }) => answers[decision.id] === decision.answer).length;
  const mastered = score >= level.masteryScore;
  const completed = MULTIPLE_CHOICE_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const topErrors = Object.entries(progress.errorCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)).slice(0, 3) as Array<[MultipleChoiceErrorCode, number]>;
  useEffect(() => { if (!hydrated || submitted) return; const persisted = readProgress(); writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts: { ...persisted.drafts, [level.id]: { answers, elapsed, attemptSeed } } }); }, [answers, attemptSeed, elapsed, hydrated, level.id, levelIndex, progress, submitted]);
  function switchLevel(nextIndex: number) { if (nextIndex > progress.unlockedLevel) return; const persisted = readProgress(); const drafts = submitted ? persisted.drafts : { ...persisted.drafts, [level.id]: { answers, elapsed, attemptSeed } }; const target = MULTIPLE_CHOICE_LEVELS[nextIndex]; const draft = drafts[target.id]; const next = { ...progress, activeLevelIndex: nextIndex, drafts }; setProgress(next); writeProgress(next); setLevelIndex(nextIndex); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? progress.levels[target.id]?.attempts ?? 0); setSubmitted(false); setConfirmAttemptReset(false); setConfirmAllReset(false); }
  function submitLevel() { if (answered !== questions.length) return; const wrong = questions.filter(({ decision }) => answers[decision.id] !== decision.answer); const errors = { ...progress.errorCounts }; for (const { decision } of wrong) errors[decision.errorCode] = (errors[decision.errorCode] ?? 0) + 1; const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false }; const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next: StoredProgress = { version: 2, unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(5, levelIndex + 1)) : progress.unlockedLevel, activeLevelIndex: levelIndex, levels: { ...progress.levels, [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered } }, errorCounts: errors, reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ decision }) => decision.id)])).filter((id) => !questions.some(({ decision }) => decision.id === id && answers[id] === decision.answer)), drafts }; setSubmitted(true); setProgress(next); writeProgress(next); }
  function resetAttempt() { if ((answered || elapsed || submitted) && !confirmAttemptReset) { setConfirmAttemptReset(true); return; } const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next = { ...progress, activeLevelIndex: levelIndex, drafts }; setProgress(next); writeProgress(next); setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed((value) => value + 1); setConfirmAttemptReset(false); }
  function resetAll() { if (!confirmAllReset) { setConfirmAllReset(true); return; } setProgress(EMPTY_PROGRESS); writeProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed(0); setConfirmAttemptReset(false); setConfirmAllReset(false); }
  return <section className={styles.engine} data-active-practice="true" aria-labelledby="multiple-choice-progress-title"><div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h2 id="multiple-choice-progress-title">Choose the one best answer across six levels</h2><p>Two distractor drills lead into four full passage sets. Drafts, time, scores and multiple-choice patterns stay on this device.</p></div><div className={styles.engineScore}><strong>{completed}/6</strong><span>levels mastered</span></div></div><div className={styles.dashboard}><div><SearchCheck size={19} aria-hidden="true" /><span><strong>{progress.reviewQueue.length}</strong> questions in review</span></div><div><Clock3 size={19} aria-hidden="true" /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div><div><CheckCircle2 size={19} aria-hidden="true" /><span><strong>{hydrated ? 'Saved locally' : 'Loading…'}</strong> draft and progress</span></div></div><nav className={styles.levelRail} aria-label="Multiple Choice progress levels">{MULTIPLE_CHOICE_LEVELS.map((item, index) => { const locked = index > progress.unlockedLevel; const record = progress.levels[item.id]; return <button key={item.id} type="button" disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''} onClick={() => switchLevel(index)}><span>{locked ? <LockKeyhole size={14} aria-hidden="true" /> : index + 1}</span><b>{item.title}</b><small>{record ? `Best ${record.bestScore}/${index < 2 ? 4 : 5}` : locked ? 'Locked' : 'Ready'}</small></button>; })}</nav><div className={styles.enginePanel}><header className={styles.levelHeader}><div><span>Level {levelIndex + 1} of 6 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div></header><div className={styles.engineQuestions}>{questions.map(({ passage, decision }, index) => { const selected = answers[decision.id] ?? ''; const correct = selected === decision.answer; return <article className={styles.engineQuestion} key={decision.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title} · {decision.skill}</small></div><h3>{decision.question}</h3><DecisionCard decision={decision} selected={selected} disabled={submitted} attemptSeed={attemptSeed} onSelect={(value) => { setAnswers((current) => ({ ...current, [decision.id]: value })); setConfirmAttemptReset(false); }} />{submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}<div><strong>{correct ? 'Best answer supported.' : `Best answer: ${decision.answer}`}</strong><p>{correct ? decision.explanation : decision.trap}</p></div></div>}</article>; })}</div><footer className={styles.engineFooter} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} correct · {mastered ? 'Skill level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is available. This is a WeLearn micro-skill result, not an IELTS band.' : `Review ${questions.length - score} multiple-choice${questions.length - score === 1 ? '' : 's'}, then retry.`}</span></> : <><strong>{answered}/{questions.length} decisions complete</strong><span>Answers remain editable and saved locally until submission.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw size={16} aria-hidden="true" />{confirmAttemptReset ? 'Press again to reset' : 'Reset attempt'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== questions.length} onClick={submitLevel}>Submit level</button>}{submitted && mastered && levelIndex < 5 && <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Open next level</button>}</div></footer></div><aside className={styles.reviewPanel} aria-label="MultipleChoice review plan"><div><span className={styles.modeTag}>Review plan</span><h3>Repair the option-comparison error</h3><p>{topErrors.length ? 'Your most frequent multiple-choice errors appear below.' : 'Complete a level to build a personalised review queue.'}</p></div><ul>{topErrors.length ? topErrors.map(([code, count]) => <li key={code}><strong>{count}</strong><span>{ERROR_LABELS[code]}</span></li>) : <li><strong>0</strong><span>No recorded errors yet</span></li>}</ul><button type="button" className={styles.textButton} onClick={resetAll}><RotateCcw size={16} aria-hidden="true" />{confirmAllReset ? 'Press again to erase progress' : 'Reset all progress'}</button></aside>{questions[0] && <SourceBoundary passage={questions[0].passage} />}<p className={styles.securityNote}>Guided Learn mode delivers answers and explanations to this browser. It is not a secure Practice, Exam or proctored mode.</p></section>;
}
