'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, LockKeyhole, RotateCcw, Target, XCircle } from 'lucide-react';
import {
  SCANNING_LEGACY_STORAGE_KEY,
  SCANNING_LEVELS,
  SCANNING_STORAGE_KEY,
  getEvidenceOptions,
  getScanningPassage,
  getSignalOptions,
  type ScanningErrorCode,
  type ScanningTarget,
  type ScanningTrainingPassage,
} from '@/data/practica-exams/ielts-reading-scanning-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type AttemptDraft = { answers: AnswerMap; elapsed: number; attemptSeed: number };
type StoredProgress = {
  version: 2;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<ScanningErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, AttemptDraft>;
};

const EMPTY_PROGRESS: StoredProgress = { version: 2, unlockedLevel: 0, activeLevelIndex: 0, levels: {}, errorCounts: {}, reviewQueue: [], drafts: {} };
const ERROR_LABELS: Record<ScanningErrorCode, string> = {
  'signal-too-common': 'used a signal that appears everywhere',
  'wrong-entity': 'located the right sentence but selected the wrong entity',
  'wrong-number': 'selected a nearby number with a different role',
  'context-too-narrow': 'stopped before reading the complete answer relationship',
  'scope-or-polarity-missed': 'missed scope, contrast or polarity around the match',
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
  const knownLevels = new Set(SCANNING_LEVELS.map((level) => level.id));
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
  const unlockedLevel = Math.min(SCANNING_LEVELS.length - 1, nonNegativeInteger(parsed.unlockedLevel));
  return {
    version: 2,
    unlockedLevel,
    activeLevelIndex: Math.min(unlockedLevel, nonNegativeInteger(parsed.activeLevelIndex)),
    levels,
    errorCounts: parsed.errorCounts && typeof parsed.errorCounts === 'object' ? parsed.errorCounts : {},
    reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [],
    drafts,
  };
}

function readProgress() {
  try {
    return normalizeProgress(JSON.parse(window.localStorage.getItem(SCANNING_STORAGE_KEY) ?? window.localStorage.getItem(SCANNING_LEGACY_STORAGE_KEY) ?? 'null'));
  } catch { return EMPTY_PROGRESS; }
}

function writeProgress(progress: StoredProgress) {
  try { window.localStorage.setItem(SCANNING_STORAGE_KEY, JSON.stringify(progress)); } catch { /* Practice remains usable without storage. */ }
}

function formatTime(seconds: number) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }

function ChoiceCards({ options, selected, disabled, label, onSelect }: { options: string[]; selected: string; disabled: boolean; label: string; onSelect: (value: string) => void }) {
  const group = `scan-${useId().replace(/:/g, '')}`;
  return (
    <fieldset className={`${styles.headingOptions} ${styles.headingOptionsCompact}`}>
      <legend className={styles.srOnly}>{label}</legend>
      {options.map((option, index) => (
        <label key={option} className={selected === option ? styles.headingOptionSelected : ''}>
          <input type="radio" name={group} value={option} checked={selected === option} disabled={disabled} onChange={() => onSelect(option)} />
          <span className={styles.headingOptionBody}><span aria-hidden="true">{String.fromCharCode(65 + index)}</span><strong>{option}</strong></span>
        </label>
      ))}
    </fieldset>
  );
}

function Passage({ passage }: { passage: ScanningTrainingPassage }) {
  return (
    <article className={styles.passagePanel} lang="en">
      <p className={styles.panelLabel}>Passage</p><h3>{passage.title}</h3>
      {passage.paragraphs.map((paragraph) => <section key={paragraph.id}><h4>{paragraph.label}</h4><p>{paragraph.text}</p></section>)}
    </article>
  );
}

function SourceBoundary({ passage }: { passage: ScanningTrainingPassage }) {
  return <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote}{' '}<a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the primary source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>;
}

export function ScanningPracticeEngine({ passage }: { passage: ScanningTrainingPassage }) {
  const targets = passage.targets.slice(0, 3);
  const [signals, setSignals] = useState<AnswerMap>({});
  const [signalChecked, setSignalChecked] = useState<Record<string, boolean>>({});
  const [evidence, setEvidence] = useState<AnswerMap>({});
  const [evidenceChecked, setEvidenceChecked] = useState<Record<string, boolean>>({});
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const hasWork = Object.keys(signals).length + Object.keys(evidence).length > 0;

  function reset() {
    if (hasWork && !confirmReset) { setConfirmReset(true); return; }
    setSignals({}); setSignalChecked({}); setEvidence({}); setEvidenceChecked({}); setAttemptSeed((value) => value + 1); setConfirmReset(false);
  }

  return (
    <section className={styles.lab} data-active-practice="true" aria-label="Guided scanning practice">
      <div className={styles.labTopline}><div><span className={styles.modeTag}>Guided practice · three evidence decisions</span><h3>{passage.title}</h3><p>Plan the search first. The evidence decision stays locked until you have checked a distinctive signal.</p></div><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} />{confirmReset ? 'Press again to reset' : 'Reset guided set'}</button></div>
      <Passage passage={passage} />
      <div className={styles.engineQuestions}>
        {targets.map((target, index) => {
          const signalDone = Boolean(signalChecked[target.id]);
          const evidenceDone = Boolean(evidenceChecked[target.id]);
          const signalCorrect = signals[target.id] === target.bestSignal;
          const evidenceCorrect = evidence[target.id] === target.evidence;
          return (
            <article className={styles.engineQuestion} key={target.id}>
              <div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>Search plan → evidence</small></div>
              <h3>{target.question}</h3>
              <p className={styles.panelLabel}>1 · Choose the most distinctive signal</p>
              <ChoiceCards options={getSignalOptions(target, attemptSeed)} selected={signals[target.id] ?? ''} disabled={signalDone} label={`Search signal for ${target.question}`} onSelect={(value) => { setSignals((current) => ({ ...current, [target.id]: value })); setConfirmReset(false); }} />
              {!signalDone && <button type="button" className="btn btn-primary" disabled={!signals[target.id]} onClick={() => setSignalChecked((current) => ({ ...current, [target.id]: true }))}>Check search signal</button>}
              {signalDone && <div className={`${styles.feedback} ${signalCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{signalCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}<div><strong>{signalCorrect ? 'Useful search plan.' : `Use: ${target.bestSignal}`}</strong><p>{signalCorrect ? 'Now locate the relationship and read around it.' : 'The other signal is too common or points to a nearby detail.'}</p></div></div>}
              {signalDone && <><p className={styles.panelLabel}>2 · Select the exact evidence</p><ChoiceCards options={getEvidenceOptions(passage, target, attemptSeed)} selected={evidence[target.id] ?? ''} disabled={evidenceDone} label={`Exact evidence for ${target.question}`} onSelect={(value) => setEvidence((current) => ({ ...current, [target.id]: value }))} />{!evidenceDone && <button type="button" className="btn btn-primary" disabled={!evidence[target.id]} onClick={() => setEvidenceChecked((current) => ({ ...current, [target.id]: true }))}>Check evidence</button>}</>}
              {evidenceDone && <div className={`${styles.feedback} ${evidenceCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{evidenceCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}<div><strong>{evidenceCorrect ? `Answer: ${target.answer}` : `Exact evidence: “${target.evidence}”`}</strong><p>{evidenceCorrect ? target.evidenceExplanation : `${target.trap} ${target.evidenceExplanation}`}</p></div></div>}
            </article>
          );
        })}
      </div>
      <SourceBoundary passage={passage} />
    </section>
  );
}

export function ScanningIndependentPractice({ passage }: { passage: ScanningTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const answered = passage.targets.filter((target) => answers[target.id]).length;
  const score = passage.targets.filter((target) => answers[target.id] === target.evidence).length;
  function reset() {
    if ((answered || submitted) && !confirmReset) { setConfirmReset(true); return; }
    setAnswers({}); setSubmitted(false); setAttemptSeed((value) => value + 1); setConfirmReset(false);
  }
  return (
    <section className={styles.lab} data-active-practice="true" aria-label="Independent scanning set">
      <div className={styles.labTopline}><div><span className={styles.modeTag}>Full passage · feedback closed</span><h3>{passage.title}</h3><p>Locate all five evidence spans before submitting. Options are passage excerpts, not answer keys.</p></div><span className={styles.counter} aria-live="polite">{answered}/5 located</span></div>
      <Passage passage={passage} />
      <div className={styles.independentGrid}>{passage.targets.map((target) => {
        const correct = answers[target.id] === target.evidence;
        return <article className={styles.independentCard} key={target.id}><p className={styles.panelLabel}>Evidence decision</p><h3>{target.question}</h3><p><strong>Search plan:</strong> {target.bestSignal}</p><ChoiceCards options={getEvidenceOptions(passage, target, attemptSeed)} selected={answers[target.id] ?? ''} disabled={submitted} label={`Evidence for ${target.question}`} onSelect={(value) => { setAnswers((current) => ({ ...current, [target.id]: value })); setConfirmReset(false); }} />{submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}<div><strong>{correct ? `Answer: ${target.answer}` : `Exact evidence: “${target.evidence}”`}</strong><p>{correct ? target.evidenceExplanation : target.trap}</p></div></div>}</article>;
      })}</div>
      <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/5 correct</strong><span>{score >= 4 ? 'Independent transfer target reached.' : 'Review the evidence errors, then retry cleanly.'}</span></> : <><strong>One complete submission</strong><span>Read around every match; nearby true information can still answer a different question.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} />{confirmReset ? 'Press again to reset' : 'Reset set'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== 5} onClick={() => setSubmitted(true)}>Submit evidence set</button>}</div></div>
      <SourceBoundary passage={passage} />
    </section>
  );
}

type EngineQuestion = { passage: ScanningTrainingPassage; target: ScanningTarget };
function buildQuestions(levelIndex: number): EngineQuestion[] {
  const level = SCANNING_LEVELS[levelIndex];
  const passages = level.passageIds.map(getScanningPassage).filter((item): item is ScanningTrainingPassage => Boolean(item));
  if (!level.targetIds) return passages.flatMap((passage) => passage.targets.map((target) => ({ passage, target })));
  return level.targetIds.flatMap((id) => { const passage = passages.find((item) => item.targets.some((target) => target.id === id)); const target = passage?.targets.find((item) => item.id === id); return passage && target ? [{ passage, target }] : []; });
}

export function ScanningProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmAttemptReset, setConfirmAttemptReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);

  useEffect(() => { const task = window.setTimeout(() => { const stored = readProgress(); const index = Math.min(stored.activeLevelIndex, stored.unlockedLevel); const level = SCANNING_LEVELS[index]; const draft = stored.drafts[level.id]; setProgress(stored); setLevelIndex(index); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? stored.levels[level.id]?.attempts ?? 0); setHydrated(true); }, 0); return () => window.clearTimeout(task); }, []);
  useEffect(() => { if (!hydrated || submitted) return; const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [hydrated, levelIndex, submitted]);

  const level = SCANNING_LEVELS[levelIndex];
  const questions = useMemo(() => buildQuestions(levelIndex), [levelIndex]);
  const answerFor = (target: ScanningTarget) => level.mode === 'signal' ? target.bestSignal : target.evidence;
  const answered = questions.filter(({ target }) => answers[target.id]).length;
  const score = questions.filter(({ target }) => answers[target.id] === answerFor(target)).length;
  const mastered = score >= level.masteryScore;
  const completed = SCANNING_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const topErrors = Object.entries(progress.errorCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)).slice(0, 3) as Array<[ScanningErrorCode, number]>;

  useEffect(() => { if (!hydrated || submitted) return; const persisted = readProgress(); writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts: { ...persisted.drafts, [level.id]: { answers, elapsed, attemptSeed } } }); }, [answers, attemptSeed, elapsed, hydrated, level.id, levelIndex, progress, submitted]);

  function switchLevel(nextIndex: number) {
    if (nextIndex > progress.unlockedLevel) return;
    const persisted = readProgress(); const drafts = submitted ? persisted.drafts : { ...persisted.drafts, [level.id]: { answers, elapsed, attemptSeed } }; const target = SCANNING_LEVELS[nextIndex]; const draft = drafts[target.id]; const next = { ...progress, activeLevelIndex: nextIndex, drafts }; setProgress(next); writeProgress(next); setLevelIndex(nextIndex); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? progress.levels[target.id]?.attempts ?? 0); setSubmitted(false); setConfirmAttemptReset(false); setConfirmAllReset(false);
  }
  function submitLevel() {
    if (answered !== questions.length) return;
    const wrong = questions.filter(({ target }) => answers[target.id] !== answerFor(target)); const errors = { ...progress.errorCounts }; for (const { target } of wrong) errors[target.errorCode] = (errors[target.errorCode] ?? 0) + 1;
    const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false }; const drafts = { ...readProgress().drafts }; delete drafts[level.id];
    const next: StoredProgress = { version: 2, unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(5, levelIndex + 1)) : progress.unlockedLevel, activeLevelIndex: levelIndex, levels: { ...progress.levels, [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered } }, errorCounts: errors, reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ target }) => target.id)])).filter((id) => !questions.some(({ target }) => target.id === id && answers[id] === answerFor(target))), drafts };
    setSubmitted(true); setProgress(next); writeProgress(next);
  }
  function resetAttempt() {
    if ((answered || elapsed || submitted) && !confirmAttemptReset) { setConfirmAttemptReset(true); return; }
    const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next = { ...progress, activeLevelIndex: levelIndex, drafts }; setProgress(next); writeProgress(next); setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed((value) => value + 1); setConfirmAttemptReset(false);
  }
  function resetAll() { if (!confirmAllReset) { setConfirmAllReset(true); return; } setProgress(EMPTY_PROGRESS); writeProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed(0); setConfirmAttemptReset(false); setConfirmAllReset(false); }

  return (
    <section className={styles.engine} data-active-practice="true" aria-labelledby="scanning-progress-title">
      <div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h2 id="scanning-progress-title">Locate exact proof across six levels</h2><p>Two decision drills lead into four complete evidence sets. Drafts, time, scores and review targets stay on this device.</p></div><div className={styles.engineScore}><strong>{completed}/6</strong><span>levels mastered</span></div></div>
      <div className={styles.dashboard}><div><Target size={19} /><span><strong>{progress.reviewQueue.length}</strong> targets in review</span></div><div><Clock3 size={19} /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div><div><CheckCircle2 size={19} /><span><strong>{hydrated ? 'Saved locally' : 'Loading'}</strong> draft and progress</span></div></div>
      <nav className={styles.levelRail} aria-label="Scanning progress levels">{SCANNING_LEVELS.map((item, index) => { const locked = index > progress.unlockedLevel; const record = progress.levels[item.id]; return <button key={item.id} type="button" disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''} onClick={() => switchLevel(index)}><span>{locked ? <LockKeyhole size={14} /> : index + 1}</span><b>{item.title}</b><small>{record ? `Best ${record.bestScore}/${index < 2 ? 4 : 5}` : locked ? 'Locked' : 'Ready'}</small></button>; })}</nav>
      <div className={styles.enginePanel}><header className={styles.levelHeader}><div><span>Level {levelIndex + 1} of 6 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div></header>
        <div className={styles.engineQuestions}>{questions.map(({ passage, target }, index) => { const answer = answerFor(target); const selected = answers[target.id] ?? ''; const correct = selected === answer; const options = level.mode === 'signal' ? getSignalOptions(target, attemptSeed) : getEvidenceOptions(passage, target, attemptSeed); return <article className={styles.engineQuestion} key={target.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title} · {level.mode === 'signal' ? 'search signal' : 'exact evidence'}</small></div><h3>{target.question}</h3>{level.mode === 'evidence' && <p><strong>Search plan:</strong> {target.bestSignal}</p>}<ChoiceCards options={options} selected={selected} disabled={submitted} label={`${level.mode} decision for ${target.question}`} onSelect={(value) => { setAnswers((current) => ({ ...current, [target.id]: value })); setConfirmAttemptReset(false); }} />{submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}<div><strong>{correct ? `Answer: ${target.answer}` : `${level.mode === 'signal' ? 'Best signal' : 'Exact evidence'}: ${answer}`}</strong><p>{correct ? target.evidenceExplanation : target.trap}</p></div></div>}</article>; })}</div>
        <footer className={styles.engineFooter} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} correct · {mastered ? 'Skill level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is available. This is a WeLearn micro-skill result, not an IELTS band.' : `Review ${questions.length - score} evidence decision${questions.length - score === 1 ? '' : 's'}, then retry.`}</span></> : <><strong>{answered}/{questions.length} decisions complete</strong><span>Answers remain editable and saved locally until submission.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw size={16} />{confirmAttemptReset ? 'Press again to reset' : 'Reset attempt'}</button>{!submitted && <button type="button" className="btn btn-primary" disabled={answered !== questions.length} onClick={submitLevel}>Submit level</button>}{submitted && mastered && levelIndex < 5 && <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Open next level</button>}</div></footer>
      </div>
      <aside className={styles.reviewPanel} aria-label="Scanning review plan"><div><span className={styles.modeTag}>Review plan</span><h3>Fix the location error, not the option position</h3><p>{topErrors.length ? 'Your most frequent evidence errors appear below.' : 'Complete a level to build a personalised review queue.'}</p></div><ul>{topErrors.length ? topErrors.map(([code, count]) => <li key={code}><strong>{count}</strong><span>{ERROR_LABELS[code]}</span></li>) : <li><strong>0</strong><span>No recorded errors yet</span></li>}</ul><button type="button" className={styles.textButton} onClick={resetAll}><RotateCcw size={16} />{confirmAllReset ? 'Press again to erase progress' : 'Reset all progress'}</button></aside>
      {questions[0] && <SourceBoundary passage={questions[0].passage} />}
      <p className={styles.securityNote}>Guided Learn mode delivers evidence and explanations to this browser. It is not a secure Practice, Exam or proctored mode.</p>
    </section>
  );
}
