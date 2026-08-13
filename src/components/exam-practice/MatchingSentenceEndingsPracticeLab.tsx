'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, Link2, LockKeyhole, RotateCcw, Target, XCircle } from 'lucide-react';
import {
  SENTENCE_ENDINGS_LEGACY_STORAGE_KEY,
  SENTENCE_ENDINGS_LEVELS,
  SENTENCE_ENDINGS_STORAGE_KEY,
  getSentenceEndingDrillIds,
  getSentenceEndingPassage,
  type SentenceEndingErrorCode,
  type SentenceEndingTrainingPassage,
  type SentenceEndingTrainingQuestion,
} from '@/data/practica-exams/ielts-reading-matching-sentence-endings-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type AttemptDraft = { answers: AnswerMap; elapsed: number; attemptSeed: number };
type StoredProgress = {
  version: 2;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<SentenceEndingErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, AttemptDraft>;
};
type RawStoredProgress = Omit<Partial<StoredProgress>, 'version'> & { version?: 1 | 2 };

const EMPTY_PROGRESS: StoredProgress = { version: 2, unlockedLevel: 0, activeLevelIndex: 0, levels: {}, errorCounts: {}, reviewQueue: [], drafts: {} };

const ERROR_LABELS: Record<SentenceEndingErrorCode, string> = {
  'grammar-only': 'grammatical fit without passage proof',
  'wrong-relation': 'cause, timing or relationship changed',
  'scope-inflation': 'scope or certainty made too strong',
  'polarity-reversal': 'positive or negative direction reversed',
  'lexical-echo': 'repeated vocabulary used as proof',
  'wrong-evidence-zone': 'ending taken from the wrong passage section',
};

function nonNegativeInteger(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.trunc(parsed)) : fallback;
}

function readProgress(): StoredProgress {
  try {
    const raw = window.localStorage.getItem(SENTENCE_ENDINGS_STORAGE_KEY)
      ?? window.localStorage.getItem(SENTENCE_ENDINGS_LEGACY_STORAGE_KEY);
    const parsed = JSON.parse(raw ?? 'null') as RawStoredProgress | null;
    if (!parsed || (parsed.version !== 1 && parsed.version !== 2)) return EMPTY_PROGRESS;
    const knownLevels = new Set(SENTENCE_ENDINGS_LEVELS.map((level) => level.id));
    const levels = parsed.levels && typeof parsed.levels === 'object' && !Array.isArray(parsed.levels)
      ? Object.fromEntries(Object.entries(parsed.levels).filter(([id, value]) => knownLevels.has(id) && value && typeof value === 'object')) as Record<string, LevelRecord>
      : {};
    const drafts = parsed.version === 2 && parsed.drafts && typeof parsed.drafts === 'object' && !Array.isArray(parsed.drafts)
      ? Object.fromEntries(Object.entries(parsed.drafts).filter(([id, value]) => knownLevels.has(id) && value && typeof value === 'object')) as Record<string, AttemptDraft>
      : {};
    const unlockedLevel = Math.min(SENTENCE_ENDINGS_LEVELS.length - 1, nonNegativeInteger(parsed.unlockedLevel));
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
  try { window.localStorage.setItem(SENTENCE_ENDINGS_STORAGE_KEY, JSON.stringify(progress)); } catch { /* Storage is optional. */ }
}

function formatTime(totalSeconds: number) {
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
}

function getEnding(passage: SentenceEndingTrainingPassage, endingId: string) {
  return passage.endingOptions.find((ending) => ending.id === endingId);
}

function EndingBank({ passage }: { passage: SentenceEndingTrainingPassage }) {
  return (
    <aside className={styles.headingBank} aria-label={`Ending bank for ${passage.title}`}>
      <div className={styles.headingBankHeader}><span>Ending bank</span><small>{passage.endingOptions.length - passage.questions.length} will not be used</small></div>
      <ol>{passage.endingOptions.map((ending) => <li key={ending.id}><strong>{ending.id}</strong><span>{ending.text}</span></li>)}</ol>
    </aside>
  );
}

function ReadingPanel({ passage }: { passage: SentenceEndingTrainingPassage }) {
  return (
    <div className={styles.headingBank} aria-label={`Reading passage: ${passage.passageTitle}`}>
      <div className={styles.headingBankHeader}><span>{passage.passageTitle}</span><small>Read for exact relationships</small></div>
      <div style={{ padding: '1rem 1.1rem', whiteSpace: 'pre-line', lineHeight: 1.78, color: 'var(--ink-2)' }}>{passage.passage}</div>
    </div>
  );
}

function EndingOptionButtons({
  passage, question, selected, disabled = false, optionIds, onSelect, compact = false,
}: {
  passage: SentenceEndingTrainingPassage;
  question: SentenceEndingTrainingQuestion;
  selected: string;
  disabled?: boolean;
  optionIds?: string[];
  onSelect: (endingId: string) => void;
  compact?: boolean;
}) {
  const groupId = `sentence-endings-${useId().replace(/:/g, '')}`;
  const endings = (optionIds ?? passage.endingOptions.map((ending) => ending.id))
    .map((id) => getEnding(passage, id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  return (
    <fieldset className={`${styles.headingOptions} ${compact ? styles.headingOptionsCompact : ''}`}>
      <legend className={styles.srOnly}>Ending for: {question.sentenceStart}</legend>
      {endings.map((ending) => (
        <label key={ending.id} className={selected === ending.id ? styles.headingOptionSelected : ''}>
          <input type="radio" name={groupId} value={ending.id} checked={selected === ending.id} disabled={disabled} onChange={() => onSelect(ending.id)} />
          <span className={styles.headingOptionBody}><span>{ending.id}</span><strong>{ending.text}</strong></span>
        </label>
      ))}
    </fieldset>
  );
}

export function MatchingSentenceEndingsGuidedPractice({ passage }: { passage: SentenceEndingTrainingPassage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const question = passage.questions[activeIndex];
  const isCorrect = selected === question.answer;
  const finished = completed.length === passage.questions.length;

  function reset() {
    if ((selected || completed.length) && !confirmRestart) { setConfirmRestart(true); return; }
    setActiveIndex(0); setSelected(''); setChecked(false); setCompleted([]); setConfirmRestart(false);
  }

  function continuePractice() {
    if (!isCorrect) { setSelected(''); setChecked(false); setConfirmRestart(false); return; }
    const next = completed.includes(question.id) ? completed : [...completed, question.id];
    setCompleted(next);
    if (activeIndex < passage.questions.length - 1) { setActiveIndex((index) => index + 1); setSelected(''); setChecked(false); }
  }

  return (
    <section className={styles.lab} aria-label="Guided matching sentence endings practice" data-active-practice="true">
      <div className={styles.labTopline}><div><span className={styles.modeTag}>Watch one · complete six</span><h3>{passage.passageTitle}</h3></div><button type="button" className={styles.textButton} onClick={reset}><RotateCcw aria-hidden="true" size={16} /> {confirmRestart ? 'Press again to restart' : 'Restart'}</button></div>
      <aside className={styles.workedDecision} aria-labelledby="sentence-endings-worked-decision">
        <div><span className={styles.modeTag}>Worked decision</span><h4 id="sentence-endings-worked-decision">Use two filters, in order</h4><p>Start: “Pale road coatings and reflective roof materials may help …”</p></div>
        <ol>
          <li><strong>Predict the relationship</strong><span>The ending should state a limited cooling mechanism, not a total solution.</span></li>
          <li><strong>Filter the grammar</strong><span>The start needs a method phrase beginning with “by”.</span></li>
          <li><strong>Prove the meaning</strong><span>The passage says these surfaces lower stored heat in particular materials.</span></li>
        </ol>
      </aside>
      <div className={styles.mapRail} role="progressbar" aria-label="Guided sentence-ending progress" aria-valuemin={0} aria-valuemax={passage.questions.length} aria-valuenow={completed.length}>
        {passage.questions.map((item, index) => <span key={item.id} className={completed.includes(item.id) ? styles.mapDone : index === activeIndex ? styles.mapActive : ''}><b>{index + 1}</b><small>{completed.includes(item.id) ? 'proved' : index === activeIndex ? 'active' : 'next'}</small></span>)}
      </div>
      {finished ? <div className={styles.completionCard} role="status"><CheckCircle2 aria-hidden="true" size={28} /><div><h3>Relationship map complete</h3><p>You completed every sentence with grammar and evidence. Continue to the held-back passage.</p></div></div> : (
        <div className={styles.practiceSplit}>
          <div className={styles.passagePanel}><ReadingPanel passage={passage} /></div>
          <div className={styles.decisionPanel}>
            <EndingBank passage={passage} />
            <p className={styles.panelLabel}>Sentence start {activeIndex + 1}</p>
            <div className={styles.quoteBlock}><p>{question.sentenceStart} …</p></div>
            <div className={styles.methodPrompt}><strong>Decision rule</strong><span>Grammar removes impossibilities.</span><span>Passage evidence decides the one best ending.</span></div>
            <EndingOptionButtons passage={passage} question={question} selected={selected} disabled={checked} onSelect={(id) => { setSelected(id); setConfirmRestart(false); }} />
            {checked && <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{isCorrect ? <CheckCircle2 aria-hidden="true" size={20} /> : <XCircle aria-hidden="true" size={20} />}<div><strong>{isCorrect ? `${question.answer}. Complete relationship` : 'Not yet — this ending does not preserve the passage relationship.'}</strong><p>{isCorrect ? question.evidence : question.distractorFailure}</p></div></div>}
            <div className={styles.actions}><button type="button" className="btn btn-primary" disabled={!selected} onClick={() => checked ? continuePractice() : setChecked(true)}>{checked ? (isCorrect ? <>Add to relationship map <ArrowRight aria-hidden="true" size={16} /></> : 'Try this sentence again') : 'Check the completed sentence'}</button></div>
          </div>
        </div>
      )}
      <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the candidate source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>
    </section>
  );
}

export function MatchingSentenceEndingsIndependentPractice({ passage }: { passage: SentenceEndingTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const answered = passage.questions.filter((question) => answers[question.id]).length;
  const score = passage.questions.filter((question) => answers[question.id] === question.answer).length;
  return (
    <section className={styles.lab} aria-label="Independent matching sentence endings practice" data-active-practice="true">
      <div className={styles.labTopline}><div><span className={styles.modeTag}>Now you complete the full set</span><h3>{passage.passageTitle}</h3><p>Feedback remains closed until all {passage.questions.length} sentences are submitted.</p></div><span className={styles.counter} aria-live="polite">{answered}/{passage.questions.length} completed</span></div>
      <div className={styles.practiceSplit}><div className={styles.passagePanel}><ReadingPanel passage={passage} /></div><div className={styles.decisionPanel}><EndingBank passage={passage} /></div></div>
      <div className={styles.engineQuestions}>
        {passage.questions.map((question, index) => {
          const selected = answers[question.id] ?? '';
          const correct = selected === question.answer;
          return <article className={styles.engineQuestion} key={question.id}>
            <div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>Complete one exact proposition</small></div><p>{question.sentenceStart} …</p>
            <div className={styles.engineChoiceControl}><label className={styles.selectLabel} htmlFor={`independent-${question.id}`}>Ending for sentence {index + 1}</label><select id={`independent-${question.id}`} name={`independent-${question.id}`} value={selected} disabled={submitted} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}><option value="">Choose an ending</option>{passage.endingOptions.map((ending) => <option key={ending.id} value={ending.id}>{ending.id}. {ending.text}</option>)}</select></div>
            {submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 aria-hidden="true" size={18} /> : <XCircle aria-hidden="true" size={18} />}<div><strong>{correct ? 'Correct' : `${question.answer}. ${getEnding(passage, question.answer)?.text}`}</strong><p>{correct ? question.evidence : question.distractorFailure}</p></div></div>}
          </article>;
        })}
      </div>
      <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{passage.questions.length} correct</strong><span>{score >= passage.questions.length - 1 ? 'Independent target reached.' : 'Review the relationship errors, then retry.'}</span></> : <><strong>One full-set submission</strong><span>Grammar is a filter; evidence is the final decision.</span></>}</div><button type="button" className="btn btn-primary" disabled={!submitted && answered !== passage.questions.length} onClick={() => { if (submitted) { setAnswers({}); setSubmitted(false); } else setSubmitted(true); }}>{submitted ? 'Try a clean set' : 'Submit all sentences'}</button></div>
      <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the candidate source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>
    </section>
  );
}

type EngineQuestion = { passage: SentenceEndingTrainingPassage; question: SentenceEndingTrainingQuestion };

function buildLevelQuestions(levelIndex: number): EngineQuestion[] {
  const level = SENTENCE_ENDINGS_LEVELS[levelIndex];
  const passages = level.passageIds.map(getSentenceEndingPassage).filter((item): item is SentenceEndingTrainingPassage => Boolean(item));
  if (!level.questionIds) return passages.flatMap((passage) => passage.questions.map((question) => ({ passage, question })));
  return level.questionIds.map((questionId) => {
    const passage = passages.find((item) => item.questions.some((question) => question.id === questionId));
    const question = passage?.questions.find((item) => item.id === questionId);
    return passage && question ? { passage, question } : null;
  }).filter((item): item is EngineQuestion => Boolean(item));
}

export function MatchingSentenceEndingsProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmAttemptReset, setConfirmAttemptReset] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const task = window.setTimeout(() => {
      const stored = readProgress();
      const restoredIndex = Math.min(stored.activeLevelIndex, stored.unlockedLevel, SENTENCE_ENDINGS_LEVELS.length - 1);
      const level = SENTENCE_ENDINGS_LEVELS[restoredIndex];
      const draft = stored.drafts[level.id];
      setProgress(stored); setLevelIndex(restoredIndex); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? stored.levels[level.id]?.attempts ?? 0); setHydrated(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    const timer = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, [hydrated, levelIndex, submitted]);

  const level = SENTENCE_ENDINGS_LEVELS[levelIndex];
  const questions = useMemo(() => buildLevelQuestions(levelIndex), [levelIndex]);
  const isFullPassage = !level.questionIds;
  const answered = questions.filter(({ question }) => answers[question.id]).length;
  const score = questions.filter(({ question }) => answers[question.id] === question.answer).length;
  const mastered = score >= level.masteryScore;
  const completedCount = SENTENCE_ENDINGS_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const topErrors = Object.entries(progress.errorCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)).slice(0, 3) as Array<[SentenceEndingErrorCode, number]>;

  useEffect(() => {
    if (!hydrated || submitted) return;
    const drafts = { ...readProgress().drafts, [level.id]: { answers, elapsed, attemptSeed } };
    writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts });
    // Draft persistence intentionally tracks the active attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, attemptSeed, elapsed, hydrated, level.id, levelIndex, submitted]);

  function switchLevel(nextIndex: number) {
    if (nextIndex > progress.unlockedLevel) return;
    const drafts = submitted ? readProgress().drafts : { ...readProgress().drafts, [level.id]: { answers, elapsed, attemptSeed } };
    const target = SENTENCE_ENDINGS_LEVELS[nextIndex];
    const draft = drafts[target.id];
    const next = { ...progress, activeLevelIndex: nextIndex, drafts };
    setProgress(next); writeProgress(next); setLevelIndex(nextIndex); setAnswers(draft?.answers ?? {}); setSubmitted(false); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? progress.levels[target.id]?.attempts ?? 0); setConfirmAttemptReset(false); setConfirmReset(false);
  }

  function submitLevel() {
    if (answered !== questions.length) return;
    setSubmitted(true);
    const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false };
    const wrong = questions.filter(({ question }) => answers[question.id] !== question.answer);
    const errorCounts = { ...progress.errorCounts };
    for (const { question } of wrong) errorCounts[question.errorCode] = (errorCounts[question.errorCode] ?? 0) + 1;
    const drafts = { ...readProgress().drafts }; delete drafts[level.id];
    const next: StoredProgress = {
      version: 2,
      unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(SENTENCE_ENDINGS_LEVELS.length - 1, levelIndex + 1)) : progress.unlockedLevel,
      activeLevelIndex: levelIndex,
      levels: { ...progress.levels, [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered } },
      errorCounts,
      reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ question }) => question.id)])).filter((id) => !questions.some(({ question }) => question.id === id && answers[id] === question.answer)),
      drafts,
    };
    setProgress(next); writeProgress(next);
  }

  function resetAttempt() {
    if ((answered || elapsed || submitted) && !confirmAttemptReset) { setConfirmAttemptReset(true); return; }
    const drafts = { ...readProgress().drafts }; delete drafts[level.id];
    setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed((seed) => seed + 1); setConfirmAttemptReset(false); writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts });
  }

  function resetAllProgress() {
    if (!confirmReset) { setConfirmReset(true); return; }
    setProgress(EMPTY_PROGRESS); writeProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed(0); setConfirmAttemptReset(false); setConfirmReset(false);
  }

  return (
    <section className={styles.engine} aria-labelledby="sentence-endings-engine-title" data-active-practice="true">
      <div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h2 id="sentence-endings-engine-title">Build relationship control across six levels</h2><p>Two focused drills lead into four complete passage sets. Drafts, time, errors and unlocked levels stay on this device.</p></div><div className={styles.engineScore}><strong>{completedCount}/6</strong><span>levels mastered</span></div></div>
      <div className={styles.dashboard}><div><Target aria-hidden="true" size={19} /><span><strong>{progress.reviewQueue.length}</strong> sentences in review</span></div><div><Clock3 aria-hidden="true" size={19} /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div><div><CheckCircle2 aria-hidden="true" size={19} /><span><strong>{hydrated ? 'Saved locally' : 'Loading…'}</strong> attempt and progress</span></div></div>
      <nav className={styles.levelRail} aria-label="Matching Sentence Endings progress levels">{SENTENCE_ENDINGS_LEVELS.map((item, index) => { const locked = index > progress.unlockedLevel; const record = progress.levels[item.id]; const count = buildLevelQuestions(index).length; return <button key={item.id} type="button" disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''} onClick={() => switchLevel(index)}><span>{locked ? <LockKeyhole aria-hidden="true" size={14} /> : index + 1}</span><b>{item.title}</b><small>{record ? `Best ${record.bestScore}/${count}` : locked ? 'Locked' : 'Ready'}</small></button>; })}</nav>
      <div className={styles.enginePanel}>
        <header className={styles.levelHeader}><div><span>Level {levelIndex + 1} of 6 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div></header>
        {isFullPassage && questions[0] && <div className={styles.practiceSplit}><div className={styles.passagePanel}><ReadingPanel passage={questions[0].passage} /></div><div className={styles.decisionPanel}><EndingBank passage={questions[0].passage} /></div></div>}
        <div className={styles.engineQuestions}>{questions.map(({ passage, question }, index) => { const selected = answers[question.id] ?? ''; const correct = selected === question.answer; const options = getSentenceEndingDrillIds(passage, question, attemptSeed); return <article className={styles.engineQuestion} key={question.id}><div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title}</small></div><p>{question.sentenceStart} …</p>{!isFullPassage && <details className={styles.engineChoiceControl}><summary className={styles.textButton}>Open passage and ending bank</summary><ReadingPanel passage={passage} /><EndingBank passage={passage} /></details>}{isFullPassage ? <div className={styles.engineChoiceControl}><label className={styles.selectLabel} htmlFor={`engine-${level.id}-${question.id}`}>Ending for this sentence</label><select id={`engine-${level.id}-${question.id}`} name={`engine-${level.id}-${question.id}`} value={selected} disabled={submitted} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}><option value="">Choose an ending</option>{passage.endingOptions.map((ending) => <option key={ending.id} value={ending.id}>{ending.id}. {ending.text}</option>)}</select></div> : <EndingOptionButtons passage={passage} question={question} selected={selected} disabled={submitted} optionIds={options} onSelect={(id) => { setAnswers((current) => ({ ...current, [question.id]: id })); setConfirmAttemptReset(false); }} compact />}{submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 aria-hidden="true" size={18} /> : <XCircle aria-hidden="true" size={18} />}<div><strong>{correct ? `${question.answer}. Relationship proved` : `${question.answer}. ${getEnding(passage, question.answer)?.text}`}</strong><p>{correct ? question.evidence : question.distractorFailure}</p></div></div>}</article>; })}</div>
        <footer className={styles.engineFooter} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} correct · {mastered ? 'Skill level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is available. This is not an IELTS band or exam-readiness score.' : `Review ${questions.length - score} relationship${questions.length - score === 1 ? '' : 's'} and try again.`}</span></> : <><strong>{answered}/{questions.length} sentences complete</strong><span>Choices remain editable and saved locally until submission.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw aria-hidden="true" size={16} /> {confirmAttemptReset ? 'Press again to reset' : 'Reset attempt'}</button>{submitted && mastered && levelIndex < SENTENCE_ENDINGS_LEVELS.length - 1 ? <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Next level <ArrowRight aria-hidden="true" size={16} /></button> : <button type="button" className="btn btn-primary" disabled={submitted || answered !== questions.length} onClick={submitLevel}>Submit level</button>}</div></footer>
      </div>
      <div className={styles.reviewPanel}><div><span className={styles.modeTag}>Error profile</span><h3>{topErrors.length ? 'Your most frequent sentence-ending traps' : 'Your error profile starts after the first attempt'}</h3>{topErrors.length ? <ul>{topErrors.map(([code, count]) => <li key={code}><span>{ERROR_LABELS[code]}</span><strong>{count}</strong></li>)}</ul> : <p>The engine records why a completion failed, so review has a specific target.</p>}</div><button type="button" className={styles.textButton} onClick={resetAllProgress}>{confirmReset ? 'Press again to erase all saved progress' : 'Reset saved progress'}</button></div>
      <p className={styles.securityNote}><Link2 aria-hidden="true" size={15} /> Training mode only: answer keys and explanations are delivered to the browser for feedback. This is not a secure Exam or proctored mode.</p>
    </section>
  );
}
